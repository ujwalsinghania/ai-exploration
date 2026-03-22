import { Colors } from "@/constants/theme";
import { CartProvider } from "@/context/CartContext";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const SwiggyTheme = {
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

export default function RootLayout() {
  return (
    <CartProvider>
      <ThemeProvider value={SwiggyTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="restaurants/[cuisine]"
            options={{
              headerStyle: { backgroundColor: Colors.white },
              headerTintColor: Colors.text,
              headerShadowVisible: false,
            }}
          />
        </Stack>
        <StatusBar style="dark" />
      </ThemeProvider>
    </CartProvider>
  );
}
