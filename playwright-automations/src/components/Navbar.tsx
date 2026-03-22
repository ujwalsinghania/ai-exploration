import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
      }}
      data-testid="navbar"
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="font-heading text-xl tracking-tight text-amber-glow font-bold">
            LearnHub
          </span>
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-lg">
          <div className="relative w-full">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-muted pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search for anything"
              className="w-full pl-9 pr-4 py-[7px] rounded-lg text-sm text-slate-primary placeholder:text-slate-muted transition-all bg-light-elevated border border-black/5 outline-none focus:border-amber-glow/45 focus:ring-4 focus:ring-amber-glow/10"
              data-testid="search-input"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 text-sm shrink-0">
          <Link
            to="/"
            className="hidden md:block px-3 py-1.5 text-slate-secondary hover:text-slate-primary transition-colors font-medium"
          >
            Explore
          </Link>
          <button className="btn-secondary px-4 py-[7px] text-sm text-slate-secondary">
            Log in
          </button>
          <button className="btn-primary px-4 py-[7px] text-sm">Sign up</button>
        </div>
      </div>
    </nav>
  );
}
