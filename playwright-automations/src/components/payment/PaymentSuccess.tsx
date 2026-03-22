import { useNavigate } from "react-router-dom";
import type { Course } from "../../data/courses";

interface PaymentSuccessProps {
  course: Course;
}

export function PaymentSuccess({ course }: PaymentSuccessProps) {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-light-base flex items-center justify-center px-6"
      data-testid="success-page"
    >
      <div
        className="rounded-2xl p-10 max-w-md w-full text-center bg-white"
        style={{
          border: "1px solid rgba(245,166,35,0.2)",
          boxShadow: "0 10px 40px rgba(245,166,35,0.1)",
        }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: "rgba(245,166,35,0.12)" }}
        >
          <svg
            className="w-8 h-8 text-amber-glow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="font-heading text-2xl text-slate-primary mb-2">
          Payment Successful!
        </h2>
        <p className="text-slate-secondary text-sm mb-1">
          You are now enrolled in
        </p>
        <p className="font-medium text-slate-primary mb-6 leading-snug">
          {course.title}
        </p>
        <button
          onClick={() => navigate("/")}
          className="btn-primary px-6 py-2.5 text-sm"
        >
          Browse More Courses
        </button>
      </div>
    </div>
  );
}
