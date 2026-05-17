import type { ReactNode } from "react";

interface FieldProps {
  label: ReactNode;
  error?: string;
  colSpan?: "full" | "half";
  children: ReactNode;
}

export default function Field({
  label,
  error,
  colSpan = "half",
  children,
}: FieldProps) {
  return (
    <div className={colSpan === "full" ? "sm:col-span-2" : undefined}>
      <label className="block text-sm font-medium text-black mb-1">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
// Shared className for all input/select within function
export const fieldInputClass =
  "w-full px-3 py-2 border rounded-lg bg-bg-soft focus:outline-none focus:ring-2 focus:ring-primary-blue transition-colors";
