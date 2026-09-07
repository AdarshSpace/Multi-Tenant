"use client";

import { useRef, useState } from "react";
import { Check, Globe2, ImagePlus, Loader2, Plus, ShieldCheck, X,} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { registerTenant, uploadTenantLogo,} from "./tenant-api";

import { RegisterTenantResponse, TenantFormData,} from "./types";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated: (
    tenant: RegisterTenantResponse
  ) => void;
  showToast: (
    type: "success" | "error",
    message: string
  ) => void;
};

type Errors = {
  name?: string;
  customDomain?: string;
  email?: string;
  logo?: string;
};

const initialForm: TenantFormData = {
  name: "",
  customDomain: "",
  email: "",
  phone: "",
  logo: "",
};

export default function CreateTenant({
  open,
  onClose,
  onCreated,
  showToast,
}: Props) {
  const [form, setForm] = useState<TenantFormData>(initialForm);

  const [errors, setErrors] = useState<Errors>({});

  const [submitting, setSubmitting] = useState(false);

  const [uploading, setUploading] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  function updateField( field: keyof TenantFormData, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  }

  function validate() {
    const nextErrors: Errors = {};

    if (form.name.trim().length < 2) {
      nextErrors.name =
        "Name must contain at least 2 characters.";
    }

    if (!form.customDomain.trim()) {
      nextErrors.customDomain =
        "Custom domain is required.";
    }

    if (form.email.trim()) {
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(form.email.trim())) {
        nextErrors.email =
          "Enter a valid email address.";
      }
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  async function handleLogoChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const logoUrl =
        await uploadTenantLogo(file);

      updateField("logo", logoUrl);

      showToast(
        "success",
        "Logo uploaded successfully."
      );
    } catch (error) {
      setErrors({
        logo:
          error instanceof Error
            ? error.message
            : "Logo upload failed.",
      });
    } finally {
      setUploading(false);

      if (fileRef.current) {
        fileRef.current.value = "";
      }
    }
  }

  function removeLogo() {
    updateField("logo", "");
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!validate()) return;

    if (uploading) {
      showToast(
        "error",
        "Please wait for the logo upload."
      );

      return;
    }

    try {
      setSubmitting(true);

      const result =
        await registerTenant(form);

      onCreated(result);

      setForm(initialForm);
      setErrors({});
    } catch (error) {
      showToast(
        "error",
        error instanceof Error
          ? error.message
          : "Tenant registration failed."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-900 flex items-center justify-center">
                <Globe2 className="h-5 w-5 text-white" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Create Tenant
                </h2>

                <p className="text-xs text-slate-500">
                  Register a new LMS tenant
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >
          <Field
            label="Institute / Brand Name"
            error={errors.name}
          >
            <Input
              placeholder="Motion Kart Academy"
              value={form.name}
              onChange={(e) =>
                updateField(
                  "name",
                  e.target.value
                )
              }
              className="h-11 rounded-lg"
            />
          </Field>

          <Field
            label="Custom Domain"
            error={errors.customDomain}
          >
            <Input
              placeholder="motionkart.com"
              value={form.customDomain}
              onChange={(e) =>
                updateField(
                  "customDomain",
                  e.target.value
                )
              }
              className="h-11 rounded-lg"
            />

            <p className="text-xs text-slate-400 mt-1.5">
              Enter without https:// or www.
            </p>
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Email"
              error={errors.email}
            >
              <Input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  updateField(
                    "email",
                    e.target.value
                  )
                }
                className="h-11 rounded-lg"
              />
            </Field>

            <Field label="Phone">
              <Input
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) =>
                  updateField(
                    "phone",
                    e.target.value
                  )
                }
                className="h-11 rounded-lg"
              />
            </Field>
          </div>

          <LogoUploader
            logo={form.logo}
            uploading={uploading}
            error={errors.logo}
            fileRef={fileRef}
            onChange={handleLogoChange}
            onRemove={removeLogo}
          />

          <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
            <div className="flex gap-3">
              <ShieldCheck className="h-5 w-5 text-blue-700 shrink-0" />

              <div>
                <p className="text-sm font-semibold text-blue-900">
                  Domain verification
                </p>

                <p className="text-xs text-blue-700 mt-1">
                  After registration, you can verify
                  the domain directly from the tenant
                  list.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={submitting}
              onClick={onClose}
              className="flex-1 h-11"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                submitting || uploading
              }
              className="flex-1 h-11 bg-blue-900 hover:bg-blue-800"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Tenant
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-800 mb-2">
        {label}
      </label>

      {children}

      {error && (
        <p className="text-sm text-red-600 mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
}

function LogoUploader({
  logo,
  uploading,
  error,
  fileRef,
  onChange,
  onRemove,
}: {
  logo: string;
  uploading: boolean;
  error?: string;
  fileRef: React.RefObject<HTMLInputElement | null>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onRemove: () => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-800 mb-2">
        Institute Logo{" "}
        <span className="text-slate-400 font-normal">
          (optional)
        </span>
      </label>

      {!logo ? (
        <button
          type="button"
          disabled={uploading}
          onClick={() =>
            fileRef.current?.click()
          }
          className="w-full border-2 border-dashed border-slate-200 hover:border-blue-300 rounded-xl p-6"
        >
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
              {uploading ? (
                <Loader2 className="h-6 w-6 text-blue-700 animate-spin" />
              ) : (
                <ImagePlus className="h-6 w-6 text-slate-400" />
              )}
            </div>

            <p className="text-sm font-semibold text-slate-700">
              {uploading
                ? "Uploading logo..."
                : "Upload your logo"}
            </p>

            <p className="text-xs text-slate-400 mt-1">
              PNG, JPG or WEBP up to 5 MB
            </p>
          </div>
        </button>
      ) : (
        <div className="rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="Tenant logo"
              className="h-16 w-16 rounded-xl object-cover border"
            />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800">
                Logo uploaded
              </p>

              <p className="text-xs text-slate-400 truncate mt-1">
                {logo}
              </p>

              <div className="flex items-center gap-1 text-green-600 mt-2">
                <Check className="h-3.5 w-3.5" />
                <span className="text-xs">
                  Ready to use
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onRemove}
              className="h-8 w-8 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600"
            >
              <X className="h-4 w-4 mx-auto" />
            </button>
          </div>
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={onChange}
        className="hidden"
      />

      {error && (
        <p className="text-sm text-red-600 mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
}