import { useParams, Link, useNavigate } from "react-router-dom";
import { courses } from "../data/courses";
import {
  SECTION_NAMES,
  SECTION_COUNTS,
  COURSE_FEATURES,
} from "../utils/constants";

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === Number(id));

  if (!course) {
    return (
      <div className="min-h-screen bg-light-base flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-2xl text-slate-primary mb-3">
            Course not found
          </h2>
          <Link
            to="/"
            className="text-amber-glow hover:text-amber-deep transition-colors text-sm"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  const discountPct = Math.round(
    (1 - course.price / course.originalPrice) * 100,
  );

  return (
    <div className="bg-light-base min-h-screen">
      {/* ── Top Banner ────────────────────────────────────── */}
      <section className="px-6 py-10 course-detail-banner">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <p className="text-xs text-slate-muted mb-4 flex items-center gap-1.5">
            <Link
              to="/"
              className="hover:text-slate-secondary transition-colors"
            >
              Home
            </Link>
            <span className="text-slate-muted/40">/</span>
            <span className="text-amber-glow">{course.category}</span>
          </p>

          <h1 className="font-heading text-3xl md:text-4xl leading-tight text-slate-primary mb-3 max-w-[700px]">
            {course.title}
          </h1>

          <p className="text-slate-secondary text-sm leading-relaxed mb-5 max-w-[600px]">
            {course.description}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
            <span className="badge-amber">Bestseller</span>
            <div className="flex items-center gap-1">
              <span className="text-amber-glow font-semibold">
                {course.rating.toFixed(1)} ★
              </span>
              <span className="text-slate-muted text-xs">
                ({course.reviews.toLocaleString()} ratings)
              </span>
            </div>
            <span className="text-slate-muted text-xs border-l border-black/10 pl-3">
              {course.students.toLocaleString()} students
            </span>
          </div>

          <p className="text-xs text-slate-muted mb-4">
            Created by{" "}
            <span className="text-amber-glow cursor-pointer hover:text-amber-deep transition-colors">
              {course.instructor}
            </span>
          </p>

          <div className="flex flex-wrap gap-4 text-xs text-slate-muted">
            <span className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {course.duration} total
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              {course.level}
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              English
            </span>
          </div>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* What you'll learn */}
          <div className="content-section">
            <h2 className="font-heading text-xl text-slate-primary mb-4">
              What you'll learn
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {course.whatYouLearn.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-slate-secondary leading-snug"
                >
                  <svg
                    className="w-4 h-4 shrink-0 mt-0.5 text-amber-glow"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div>
            <h2 className="font-heading text-xl text-slate-primary mb-3">
              Requirements
            </h2>
            <ul className="space-y-2">
              {course.requirements.map((req, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-slate-secondary"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-muted shrink-0 mt-2" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Course Content */}
          <div>
            <h2 className="font-heading text-xl text-slate-primary mb-3">
              Course Content
            </h2>
            <div className="space-y-2">
              {SECTION_NAMES.map((section, i) => (
                <div key={i} className="section-row">
                  <div className="flex items-center gap-3 text-sm text-slate-secondary">
                    <svg
                      className="w-4 h-4 text-slate-muted shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                    <span>
                      <span className="text-slate-muted text-xs">
                        Section {i + 1}:&nbsp;
                      </span>
                      {section}
                    </span>
                  </div>
                  <span className="text-slate-muted text-xs shrink-0 ml-4">
                    {SECTION_COUNTS[i]} lectures
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Sidebar ─────────────────────────────────────── */}
        <div className="lg:col-span-1">
          <div className="sticky top-20" data-testid="course-sidebar">
            <div className="course-sidebar-card">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full object-cover h-[170px]"
              />

              <div className="p-5">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-slate-primary font-bold text-3xl">
                    ${course.price}
                  </span>
                  <span className="text-slate-muted line-through text-base">
                    ${course.originalPrice}
                  </span>
                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-green-500/10 text-green-600">
                    {discountPct}% off
                  </span>
                </div>

                <p className="text-xs mb-4 flex items-center gap-1 text-red-500">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  2 days left at this price!
                </p>

                <button
                  onClick={() => navigate(`/payment/${course.id}`)}
                  className="btn-primary w-full py-3 text-sm font-semibold mb-2"
                  data-testid="buy-now-btn"
                >
                  Buy Now
                </button>
                <button className="btn-secondary w-full py-3 text-sm font-medium mb-4">
                  Add to Cart
                </button>

                <p className="text-center text-xs text-slate-muted mb-4">
                  30-Day Money-Back Guarantee
                </p>

                <div className="space-y-2 pt-4 border-t border-black/5">
                  {[
                    ...COURSE_FEATURES,
                    `${course.duration} on-demand video`,
                  ].map((item) => (
                    <p
                      key={item}
                      className="flex items-center gap-2 text-xs text-slate-secondary"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-amber-glow shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
