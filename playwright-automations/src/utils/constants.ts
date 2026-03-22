import * as yup from "yup";

export const SECTION_NAMES = [
  "Introduction & Setup",
  "Core Concepts",
  "Advanced Topics",
  "Real World Projects",
  "Testing & Deployment",
];

export const SECTION_COUNTS = [6, 9, 11, 7, 5];

export const COURSE_FEATURES = [
  "Full lifetime access",
  "Access on mobile and desktop",
  "Certificate of completion",
];

export const CATEGORIES = [
  "Web Development",
  "Data Science",
  "Cloud Computing",
  "Machine Learning",
  "Mobile Development",
  "Cybersecurity",
];

export const TRUST_BAR_STATS = [
  { label: "3M+", sub: "active learners" },
  { label: "1,800+", sub: "expert instructors" },
  { label: "12,000+", sub: "courses available" },
  { label: "4.8★", sub: "average rating" },
];

export const COUNTRIES = [
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "AU", label: "Australia" },
  { value: "IN", label: "India" },
];

export const PAYMENT_SCHEMA = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    cardNumber: yup
      .string()
      .required("Card number is required")
      .matches(
        /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
        "Card number must be XXXX XXXX XXXX XXXX",
      ),
    expiryDate: yup
      .string()
      .required("Expiry date is required")
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be MM/YY"),
    cvv: yup
      .string()
      .required("CVV is required")
      .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
    address: yup.string().required("Street address is required"),
    city: yup.string().required("City is required"),
    zip: yup.string().required("ZIP code is required"),
    country: yup.string().required("Country is required"),
  })
  .required();
