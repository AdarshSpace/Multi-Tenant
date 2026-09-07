import { Plus, } from "lucide-react";

 export function Input({ label, value, onChange,}: { label?: string; value: string; onChange: (value: string) => void; }) {
    return (
      <div>
        {label && (
          <label className="mb-2 block text-xs font-medium text-slate-600">
            {label}
          </label>
        )}
  
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10"
        />
      </div>
    );
  }
  
export function Textarea({ label, value, onChange, }: { label: string; value: string; onChange: (value: string) => void;}) {
    return (
      <div>
        <label className="mb-2 block text-xs font-medium text-slate-600">
          {label}
        </label>
  
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#635bff]"
        />
      </div>
    );
  }
  
export function Toggle({ checked, onChange, }: { checked: boolean; onChange: (value: boolean) => void; }) {
    return (
      <button
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full ${
          checked ? "bg-[#635bff]" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
            checked ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    );
  }
  
export function EditorGroup({
    title,
    onAdd,
    children,
  }: {
    title: string;
    onAdd: () => void;
    children: React.ReactNode;
  }) {
    return (
      <div className="mt-8 border-t border-slate-100 pt-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">
            {title}
          </h3>
  
          <button
            onClick={onAdd}
            className="flex items-center gap-1 text-xs font-medium text-[#635bff]"
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
  
        <div className="space-y-3">{children}</div>
      </div>
    );
  }
  
export function SimpleSection({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) {
    return (
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          {title}
        </h2>
  
        <p className="mt-1 text-sm text-slate-500">{description}</p>
  
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-28 rounded-lg border-2 border-slate-200 bg-slate-50 p-3"
            >
              <div className="h-3 w-1/2 rounded bg-slate-200" />
              <div className="mt-4 h-12 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }