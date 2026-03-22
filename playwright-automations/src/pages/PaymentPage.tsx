import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { courses } from "../data/courses";
import { CheckoutForm } from "../components/payment/CheckoutForm";
import { OrderSummary } from "../components/payment/OrderSummary";
import { PaymentSuccess } from "../components/payment/PaymentSuccess";

export default function PaymentPage() {
  const { id } = useParams<{ id: string }>();
  const course = courses.find((c) => c.id === Number(id));

  const [submitted, setSubmitted] = useState(false);

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

  if (submitted) {
    return <PaymentSuccess course={course} />;
  }

  return (
    <div className="bg-light-base min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            to={`/course/${course.id}`}
            className="text-slate-secondary hover:text-slate-primary text-sm transition-colors flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to course
          </Link>
          <h1 className="font-heading text-3xl text-slate-primary mt-3">
            Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CheckoutForm course={course} onSuccess={() => setSubmitted(true)} />

          <div className="lg:col-span-1">
            <OrderSummary course={course} />
          </div>
        </div>
      </div>
    </div>
  );
}
