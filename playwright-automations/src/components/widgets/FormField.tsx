import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  errorTestId?: string;
  children: ReactNode;
}

export function FormField({
  label,
  required,
  error,
  errorTestId,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-secondary mb-1.5">
        {label}
        {required && <span className="text-amber-glow ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs mt-1.5 text-red-500" data-testid={errorTestId}>
          {error}
        </p>
      )}
    </div>
  );
}
