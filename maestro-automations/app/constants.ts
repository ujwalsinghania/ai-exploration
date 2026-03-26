// Expo / Third-party
import { DefaultTheme } from "@react-navigation/native";

// Constants
import { Colors, FontSize } from "@/constants/theme";

export const SwiggyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    background: Colors.background,
    card: Colors.white,
    text: Colors.text,
    border: Colors.border,
  },
};

export const RESTAURANT_SCREEN_OPTIONS = {
  headerStyle: { backgroundColor: Colors.white },
  headerTintColor: Colors.text,
  headerShadowVisible: false,
  headerTitleStyle: {
    fontWeight: "700" as const,
    fontSize: FontSize.lg,
  },
};
