import { z } from "zod";

const MAX_PDF_BYTES = 20 * 1024 * 1024; // ~20MB inline PDF limit for Gemini
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// ─────────────────────────────────────────────
// ZOD SCHEMAS (source of truth for validation)
// ─────────────────────────────────────────────

const quizQuestionSchema = z
  .object({
    id: z.string().min(1),
    question: z.string().min(1),
    options: z.array(z.string().min(1)).length(4),
    correctOption: z.string().min(1),
    correctOptionIndex: z.number().int().min(0).max(3),
    explanation: z.string().min(1),
  })
  .refine((data) => data.options[data.correctOptionIndex] === data.correctOption, {
    message: "correctOption must exactly match the option at correctOptionIndex",
    path: ["correctOptionIndex"],
  })
  .refine((data) => new Set(data.options).size === 4, {
    message: "Options must be unique",
    path: ["options"],
  });

export const quizSchema = z
  .object({
    title: z.string().min(1),
    totalQuestions: z.number().int().min(4).max(10),
    questions: z.array(quizQuestionSchema).min(4).max(10),
  })
  .refine((data) => data.totalQuestions === data.questions.length, {
    message: "totalQuestions must equal questions.length",
  })
  .refine((data) => new Set(data.questions.map((q) => q.id)).size === data.questions.length, {
    message: "Quiz question ids must be unique",
    path: ["questions"],
  });

const assignmentQuestionSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
});

export const assignmentSchema = z
  .object({
    title: z.string().min(1),
    totalQuestions: z.number().int().min(5).max(10),
    questions: z.array(assignmentQuestionSchema).min(5).max(10),
  })
  .refine((data) => data.totalQuestions === data.questions.length, {
    message: "totalQuestions must equal questions.length",
  })
  .refine((data) => new Set(data.questions.map((q) => q.id)).size === data.questions.length, {
    message: "Assignment question ids must be unique",
    path: ["questions"],
  });

export const assessmentSchema = z.object({
  quiz: quizSchema,
  assignment: assignmentSchema,
});

export type AssessmentResponse = z.infer<typeof assessmentSchema>;

// ─────────────────────────────────────────────
// GEMINI-COMPATIBLE JSON SCHEMA (no refinements —
// Gemini's responseSchema can't express those)
// ─────────────────────────────────────────────

const geminiResponseSchema = {
  type: "object",
  properties: {
    quiz: {
      type: "object",
      properties: {
        title: { type: "string" },
        totalQuestions: { type: "number" },
        questions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              question: { type: "string" },
              options: {
                type: "array",
                items: { type: "string" },
              },
              correctOption: { type: "string" },
              correctOptionIndex: { type: "number" },
              explanation: { type: "string" },
            },
            required: [
              "id",
              "question",
              "options",
              "correctOption",
              "correctOptionIndex",
              "explanation",
            ],
          },
        },
      },
      required: ["title", "totalQuestions", "questions"],
    },
    assignment: {
      type: "object",
      properties: {
        title: { type: "string" },
        totalQuestions: { type: "number" },
        questions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              question: { type: "string" },
            },
            required: ["id", "question"],
          },
        },
      },
      required: ["title", "totalQuestions", "questions"],
    },
  },
  required: ["quiz", "assignment"],
};

// ─────────────────────────────────────────────
// PDF FETCHING
// ─────────────────────────────────────────────

async function fetchPdf(pdfUrl: string): Promise<Buffer> {
  if (!pdfUrl?.trim()) {
    throw new Error("pdfUrl is required");
  }

  const response = await fetch(pdfUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (buffer.length === 0) {
    throw new Error("PDF file is empty");
  }

  if (buffer.length > MAX_PDF_BYTES) {
    throw new Error(`PDF exceeds maximum size of ${MAX_PDF_BYTES / (1024 * 1024)}MB`);
  }

  const header = buffer.subarray(0, 4).toString("utf8");

  if (header !== "%PDF") {
    const contentType = response.headers.get("content-type");
    throw new Error(`URL does not point to a valid PDF (content-type: ${contentType ?? "unknown"})`);
  }

  return buffer;
}

// ─────────────────────────────────────────────
// PROMPT
// ─────────────────────────────────────────────

const BASE_PROMPT = `
You are an expert educational assessment creator.

Analyze the attached PDF and generate TWO assessments based ONLY on its content:

1. Quiz (MCQs)
2. Assignment (Descriptive Questions)

General Rules:
- Use ONLY information from the attached PDF.
- Never hallucinate or invent facts.
- Prefer quality over quantity.
- Cover important concepts from the PDF.
- Avoid duplicate or repetitive questions.

Quiz Rules:
- Generate 4-10 multiple-choice questions.
- Every question must have exactly 4 unique options.
- Only one option should be correct.
- correctOption must exactly match one of the strings in options.
- correctOptionIndex must be the zero-based index of correctOption within options.
- Incorrect options should be plausible.
- Include a short explanation (1-2 sentences) for the correct answer.
- Test understanding, not only memorization.
- ids must be q1, q2, q3, ... in order, and unique.
- totalQuestions must equal the number of items in questions.

Assignment Rules:
- Generate 5-10 descriptive questions.
- Questions should require explanation, reasoning, comparison, analysis, or implementation thinking.
- Do not generate MCQs, True/False, or fill-in-the-blank questions.
- Do not provide answers.
- ids must be a1, a2, a3, ... in order, and unique.
- totalQuestions must equal the number of items in questions.
`.trim();

// ─────────────────────────────────────────────
// RAW REST CALL TO GEMINI (no SDK)
// ─────────────────────────────────────────────

interface GeminiPart {
  text?: string;
  inlineData?: { mimeType: string; data: string };
}

async function callGemini(parts: GeminiPart[]): Promise<unknown> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GOOGLE_API_KEY");
  }

  const body = {
    contents: [
      {
        role: "user",
        parts,
      },
    ],
    generationConfig: {
      temperature: 0,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
      responseSchema: geminiResponseSchema,
    },
  };

  const res = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error: ${res.status} ${res.statusText} — ${errText.slice(0, 500)}`);
  }

  const data = await res.json();

  const candidate = data.candidates?.[0];

  if (!candidate) {
    throw new Error("Gemini returned no candidates: " + JSON.stringify(data).slice(0, 500));
  }

  if (candidate.finishReason && candidate.finishReason !== "STOP") {
    throw new Error(`Gemini stopped early with finishReason=${candidate.finishReason}`);
  }

  const raw: string = candidate.content?.parts?.map((p: any) => p.text ?? "").join("") ?? "";

  try {
    return JSON.parse(raw);
  } catch {
    throw new Error("Gemini did not return valid JSON: " + raw.slice(0, 300));
  }
}

// ─────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────

export async function generateAssessment(pdfUrl: string): Promise<AssessmentResponse> {
  const pdfBuffer = await fetchPdf(pdfUrl);
  const pdfBase64 = pdfBuffer.toString("base64");

  let parsedJson = await callGemini([
    { inlineData: { mimeType: "application/pdf", data: pdfBase64 } },
    { text: BASE_PROMPT },
  ]);

  let check = assessmentSchema.safeParse(parsedJson);

  if (!check.success) {
    console.error("First attempt failed validation:", check.error.flatten());

    const repairPrompt = `
Your previous JSON output failed validation with these errors:
${JSON.stringify(check.error.flatten(), null, 2)}

Here was your previous output:
${JSON.stringify(parsedJson)}

Return a corrected JSON object that fixes ONLY these issues, keeping everything else the same.
Follow the same rules and schema as before. Return ONLY JSON.
`.trim();

    parsedJson = await callGemini([{ text: repairPrompt }]);
    check = assessmentSchema.safeParse(parsedJson);
  }

  if (!check.success) {
    throw new Error(
      "Assessment failed schema validation after repair attempt: " +
        JSON.stringify(check.error.flatten())
    );
  }

  return check.data;
}