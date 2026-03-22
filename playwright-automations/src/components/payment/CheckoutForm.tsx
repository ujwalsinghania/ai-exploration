import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Course } from "../../data/courses";
import type { FormData as PaymentFormData } from "../../types/payment";
import { FormField } from "../widgets/FormField";
import { SectionCard } from "../widgets/SectionCard";
import { PAYMENT_SCHEMA, COUNTRIES } from "../../utils/constants";

interface CheckoutFormProps {
  course: Course;
  onSuccess: () => void;
}

export function CheckoutForm({ course, onSuccess }: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: yupResolver(PAYMENT_SCHEMA),
  });

  const onSubmit = () => {
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="lg:col-span-2 space-y-4"
      data-testid="checkout-form"
      noValidate
    >
      {/* Personal Info */}
      <SectionCard
        title="Personal Information"
        icon={
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="First Name"
            required
            error={errors.firstName?.message}
            errorTestId="error-first-name"
          >
            <input
              {...register("firstName")}
              type="text"
              placeholder="John"
              className={`input-standard ${errors.firstName ? "error" : ""}`}
              data-testid="input-first-name"
            />
          </FormField>

          <FormField
            label="Last Name"
            required
            error={errors.lastName?.message}
            errorTestId="error-last-name"
          >
            <input
              {...register("lastName")}
              type="text"
              placeholder="Doe"
              className={`input-standard ${errors.lastName ? "error" : ""}`}
              data-testid="input-last-name"
            />
          </FormField>

          <div className="sm:col-span-2">
            <FormField
              label="Email Address"
              required
              error={errors.email?.message}
              errorTestId="error-email"
            >
              <input
                {...register("email")}
                type="email"
                placeholder="john@example.com"
                className={`input-standard ${errors.email ? "error" : ""}`}
                data-testid="input-email"
              />
            </FormField>
          </div>
        </div>
      </SectionCard>

      {/* Payment Details */}
      <SectionCard
        title="Payment Details"
        icon={
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
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        }
      >
        <div className="space-y-4">
          <FormField
            label="Card Number"
            required
            error={errors.cardNumber?.message}
            errorTestId="error-card-number"
          >
            <input
              {...register("cardNumber")}
              type="text"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={`input-standard font-mono ${errors.cardNumber ? "error" : ""}`}
              data-testid="input-card-number"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Expiry Date"
              required
              error={errors.expiryDate?.message}
              errorTestId="error-expiry"
            >
              <input
                {...register("expiryDate")}
                type="text"
                placeholder="MM/YY"
                maxLength={5}
                className={`input-standard ${errors.expiryDate ? "error" : ""}`}
                data-testid="input-expiry"
              />
            </FormField>

            <FormField
              label="CVV"
              required
              error={errors.cvv?.message}
              errorTestId="error-cvv"
            >
              <input
                {...register("cvv")}
                type="text"
                placeholder="123"
                maxLength={4}
                className={`input-standard ${errors.cvv ? "error" : ""}`}
                data-testid="input-cvv"
              />
            </FormField>
          </div>
        </div>
      </SectionCard>

      {/* Billing Address */}
      <SectionCard
        title="Billing Address"
        icon={
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
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        }
      >
        <div className="space-y-4">
          <FormField
            label="Street Address"
            required
            error={errors.address?.message}
            errorTestId="error-address"
          >
            <input
              {...register("address")}
              type="text"
              placeholder="123 Main St"
              className={`input-standard ${errors.address ? "error" : ""}`}
              data-testid="input-address"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="City"
              required
              error={errors.city?.message}
              errorTestId="error-city"
            >
              <input
                {...register("city")}
                type="text"
                placeholder="New York"
                className={`input-standard ${errors.city ? "error" : ""}`}
                data-testid="input-city"
              />
            </FormField>

            <FormField
              label="ZIP Code"
              required
              error={errors.zip?.message}
              errorTestId="error-zip"
            >
              <input
                {...register("zip")}
                type="text"
                placeholder="10001"
                className={`input-standard ${errors.zip ? "error" : ""}`}
                data-testid="input-zip"
              />
            </FormField>
          </div>

          <FormField
            label="Country"
            required
            error={errors.country?.message}
            errorTestId="error-country"
          >
            <select
              {...register("country")}
              className={`select-standard ${errors.country ? "error" : ""}`}
              data-testid="input-country"
            >
              <option value="">Select a country</option>
              {COUNTRIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </FormField>
        </div>
      </SectionCard>

      <button
        type="submit"
        className="btn-primary w-full py-3.5 text-base font-semibold"
        data-testid="submit-btn"
      >
        Complete Purchase — ${course.price}
      </button>
    </form>
  );
}
