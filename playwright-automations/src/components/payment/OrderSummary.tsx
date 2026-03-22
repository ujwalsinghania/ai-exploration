import type { Course } from "../../data/courses";

interface OrderSummaryProps {
  course: Course;
}

export function OrderSummary({ course }: OrderSummaryProps) {
  return (
    <div
      className="sticky top-20 rounded-xl p-5 bg-white shadow-sm"
      style={{ border: "1px solid rgba(0,0,0,0.08)" }}
      data-testid="order-summary"
    >
      <h2 className="font-heading text-lg text-slate-primary mb-4">
        Order Summary
      </h2>

      <div className="flex gap-3 mb-4">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-20 h-14 object-cover rounded-lg shrink-0"
        />
        <div>
          <p className="text-sm font-medium text-slate-primary leading-snug line-clamp-2">
            {course.title}
          </p>
          <p className="text-xs text-slate-muted mt-1">{course.instructor}</p>
        </div>
      </div>

      <div
        className="space-y-2 py-3"
        style={{
          borderTop: "1px solid rgba(0,0,0,0.06)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex justify-between text-sm text-slate-secondary">
          <span>Original price</span>
          <span className="line-through text-slate-muted">
            ${course.originalPrice}
          </span>
        </div>
        <div className="flex justify-between text-sm text-green-600">
          <span>Discount</span>
          <span>−${(course.originalPrice - course.price).toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between font-bold text-slate-primary pt-3 mb-4">
        <span>Total</span>
        <span>${course.price}</span>
      </div>

      <p className="text-xs text-slate-muted text-center flex items-center justify-center gap-1.5">
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
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        Secure checkout · 30-day guarantee
      </p>
    </div>
  );
}
