// React / Built-in
import { Platform } from "react-native";

// Types
import type { FormData } from "./types";

export const DELIVERY_FEE = 40;

export const INITIAL_FORM_DATA: FormData = {
  address: "",
  phone: "",
  email: "",
};

export const PHONE_SANITIZE_REGEX = /[^0-9]/g;

export const KEYBOARD_BEHAVIOR =
  Platform.OS === "ios" ? ("padding" as const) : undefined;
