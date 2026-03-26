// React / Built-in
import React from "react";
import { Text, TextInput, View } from "react-native";

// Constants
import { Colors } from "@/constants/theme";

// Types
import type { CustomTextInputProps } from "./types";

// Styles
import { styles } from "./styles";

export function CustomTextInput({
  label,
  error,
  testID,
  style,
  ...props
}: CustomTextInputProps) {
  return (
    <View style={styles.formField}>
      <Text style={styles.formLabel}>{label}</Text>
      <TextInput
        testID={testID}
        style={[
          styles.formInput,
          props.multiline && styles.formTextArea,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={Colors.textLight}
        {...props}
      />
      {error && (
        <Text
          testID={testID ? `${testID.replace("-input", "")}-error` : undefined}
          style={styles.errorText}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
