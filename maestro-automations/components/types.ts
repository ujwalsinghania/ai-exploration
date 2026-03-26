// React / Built-in
import type { TextInputProps } from "react-native";

export interface CustomTextInputProps extends TextInputProps {
  label: string;
  error?: string;
  testID?: string;
}
