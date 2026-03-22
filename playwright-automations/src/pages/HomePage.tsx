import CourseCard from "../components/CourseCard";
import { courses } from "../data/courses";
import { CATEGORIES, TRUST_BAR_STATS } from "../utils/constants";

export default function HomePage() {
  return (
    <div className="bg-light-base min-h-screen">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="hero-mesh relative overflow-hidden px-6 py-20">
        {/* Decorative ambient orb */}
        <div className="hero-ambient-orb" />

        <div className="max-w-5xl mx-auto relative">
          <div
            className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full text-xs font-medium text-amber-glow"
            style={{
              background: "rgba(245,166,35,0.08)",
              border: "1px solid rgba(245,166,35,0.15)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-glow animate-pulse-glow" />
            3+ million learners worldwide
          </div>

          <h1 className="font-heading text-5xl md:text-6xl leading-tight mb-4 text-slate-primary animate-fade-up">
            Learn Without
            <br />
            <span className="gradient-text">Limits</span>
          </h1>

          <p className="text-slate-secondary text-lg mb-8 max-w-xl leading-relaxed animate-fade-up anim-delay-100">
            Start, switch, or advance your career with thousands of courses from
            expert instructors.
          </p>

          <div className="flex items-center gap-3 animate-fade-up anim-delay-200">
            <button className="btn-primary px-6 py-3 text-sm font-semibold">
              Explore Courses
            </button>
            <button className="btn-secondary px-6 py-3 text-sm font-medium">
              View curriculum
            </button>
          </div>
        </div>
      </section>

      {/* ── Category Pills ────────────────────────────────── */}
      <section className="px-6 py-3 overflow-x-auto border-b border-black/5">
        <div className="max-w-5xl mx-auto flex gap-2 text-sm whitespace-nowrap">
          {CATEGORIES.map((cat) => (
            <button key={cat} className="category-pill">
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Courses Grid ──────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <h2 className="font-heading text-3xl text-slate-primary mb-1">
              Featured Courses
            </h2>
            <p className="text-slate-secondary text-sm">
              Click on the first course to view details. More courses coming
              soon.
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          data-testid="courses-grid"
        >
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </section>

      {/* ── Trust Bar ─────────────────────────────────────── */}
      <section className="px-6 py-10 border-t border-black/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-10 text-slate-muted text-sm">
            {TRUST_BAR_STATS.map(({ label, sub }) => (
              <div key={label} className="text-center">
                <div className="text-slate-primary font-heading text-2xl mb-0.5">
                  {label}
                </div>
                <div className="text-xs">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
