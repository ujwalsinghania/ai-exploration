// React / Built-in
import { Platform, StyleSheet, View } from "react-native";

// Expo / Third-party
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Internal
import { CartProvider } from "@/context/CartContext";

// Constants
import { Colors } from "@/constants/theme";
import { RESTAURANT_SCREEN_OPTIONS, SwiggyTheme } from "./constants";

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  const insetPadding =
    Platform.OS === "ios"
      ? { paddingTop: insets.top }
      : {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        };

  return (
    <View style={[styles.container, insetPadding]}>
      <CartProvider>
        <ThemeProvider value={SwiggyTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="restaurants/[cuisine]"
              options={RESTAURANT_SCREEN_OPTIONS}
            />
            <Stack.Screen
              name="restaurants/[cuisine]/[id]"
              options={RESTAURANT_SCREEN_OPTIONS}
            />
          </Stack>
          <StatusBar style="dark" />
        </ThemeProvider>
      </CartProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    overflow: "hidden",
  },
});
