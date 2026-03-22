import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export function SectionCard({ title, icon, children }: SectionCardProps) {
  return (
    <div className="content-section">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-amber-glow/10 text-amber-glow">
          {icon}
        </div>
        <h2 className="font-heading text-lg text-slate-primary">{title}</h2>
      </div>
      {children}
    </div>
  );
}
