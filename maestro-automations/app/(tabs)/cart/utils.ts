// Constants
import { Colors } from "@/constants/theme";

// Types
import type { FormData, FormErrors } from "./types";

// Styles
import { styles } from "./styles";

export function validate(formData: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!formData.address.trim()) {
    errors.address = "Address is required";
  } else if (formData.address.trim().length < 10) {
    errors.address = "Please enter a complete address";
  }

  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(formData.phone.trim())) {
    errors.phone = "Enter a valid 10-digit phone number";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = "Enter a valid email address";
  }

  return errors;
}

export function getVegDotStyle(isVeg: boolean) {
  return [styles.vegDot, { borderColor: isVeg ? Colors.veg : Colors.nonVeg }];
}

export function getVegDotInnerStyle(isVeg: boolean) {
  return [
    styles.vegDotInner,
    { backgroundColor: isVeg ? Colors.veg : Colors.nonVeg },
  ];
}
