// React / Built-in
import { StyleSheet } from "react-native";

// Constants
import { BorderRadius, Colors, FontSize, Spacing } from "@/constants/theme";

export const styles = StyleSheet.create({
  formField: {
    marginBottom: Spacing.lg,
  },
  formLabel: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  formInput: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.text,
  },
  formTextArea: {
    minHeight: 80,
  },
  inputError: {
    borderColor: Colors.error,
    backgroundColor: "#FFF5F5",
  },
  errorText: {
    fontSize: FontSize.xs,
    color: Colors.error,
    marginTop: 4,
  },
});
