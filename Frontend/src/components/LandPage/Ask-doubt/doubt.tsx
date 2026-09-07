
import {Tag, ArrowRight, Check} from "lucide-react";


//  Brand tokens
const ORANGE = "#f4613b";
const TEAL   = "#12b373";
const NAVY   = "#0a2463";
const BLUE   = "#1a3a8f";
const CREAM  = "#fdf8f3";


//  Feature screenshot placeholders
const FeatureScreenshot = ({ accent, children }: { accent: string; children: React.ReactNode }) => (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        border: "1px solid #e5e7eb",
        boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
        background: "#fff",
      }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-100" style={{ background: "#f8f9fa" }}>
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]"/>
        <div className="w-3 h-3 rounded-full bg-[#febc2e]"/>
        <div className="w-3 h-3 rounded-full bg-[#28c840]"/>
        <div className="ml-3 flex-1 h-6 rounded-md bg-slate-200 max-w-[200px] flex items-center px-2">
          <span className="text-[10px] text-slate-400">motionkart.online</span>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );


// Doubt chat mock
const DoubtChatMock = () => (
    <FeatureScreenshot accent={ORANGE}>
      <div className="flex flex-col gap-3 max-w-sm mx-auto">
        {[
          { msg: "Why are my normals flipped after applying modifiers?", me: false },
          { msg: "Go to Edit Mode → Select All → Mesh → Normals → Recalculate Outside. That fixes it!", me: true },
          { msg: "It worked! Thank you 🎉", me: false },
        ].map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.me ? "flex-row-reverse" : ""}`}>
            <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white ${m.me ? "bg-[#0039a6]" : "bg-slate-300 text-slate-600"}`}>
              {m.me ? "AI" : "Y"}
            </div>
            <div className={`rounded-2xl px-3 py-2 text-xs max-w-[78%] ${m.me ? "bg-[#0039a6] text-white rounded-tr-sm" : "bg-slate-100 text-slate-700 rounded-tl-sm"}`}>
              {m.msg}
            </div>
          </div>
        ))}
        <div className="flex items-center gap-2 border border-slate-200 rounded-full px-3 py-2 mt-1">
          <span className="text-slate-400 text-xs flex-1">Ask your doubt…</span>
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: TEAL }}>
            <ArrowRight className="w-3 h-3 text-white"/>
          </div>
        </div>
      </div>
    </FeatureScreenshot>
  );

  const CheckItem = ({ children, color = TEAL }: { children: React.ReactNode; color?: string }) => (
    <li className="flex items-start gap-3 text-slate-600 text-[15px]">
      <div
        style={{ background: color + "18", flexShrink: 0 }}
        className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
      >
        <Check style={{ color }} className="w-3 h-3" />
      </div>
      {children}
    </li>
  );

export function Doubt () {

    return(
        <div>
            {/* 2 — Ask Doubts */}
      <section className="py-24 px-6" style={{ background: CREAM }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <DoubtChatMock/>
          <div className="flex flex-col gap-5">
            <Tag color={ORANGE}>Support</Tag>
            <h2 className="text-4xl font-black text-slate-800 leading-tight">
              Ask doubts<br/>
              <span style={{ color: ORANGE }}>anytime.</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Stuck on a keyframe? Confused about nodes? Our AI Doubt assistant responds instantly — around the clock, every day.
            </p>
            <ul className="flex flex-col gap-3 mt-1">
              {["Ask doubts anytime","AI Assistant will respond shortly","Community of 5,000+ fellow artists","Powered by RAG"].map(item => (
                <CheckItem key={item} color={ORANGE}>{item}</CheckItem>
              ))}
            </ul>
          </div>
        </div>
      </section>
        </div>
    )
}