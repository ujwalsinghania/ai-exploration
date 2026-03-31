// React / Built-in
import { StyleSheet, Text, View } from "react-native";

// Expo / Third-party
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

// Internal
import { useCart } from "@/context/CartContext";

// Constants
import { BorderRadius, Colors } from "@/constants/theme";
import { TAB_BAR_LABEL_STYLE, TAB_BAR_STYLE } from "./constants";

function HomeTabIcon({ color, focused }: { color: string; focused: boolean }) {
  return (
    <View testID="home-tab-icon">
      <Ionicons
        name={focused ? "home" : "home-outline"}
        size={24}
        color={color}
      />
    </View>
  );
}

function CartTabIcon({ color, focused }: { color: string; focused: boolean }) {
  const { getItemCount } = useCart();
  const count = getItemCount();

  return (
    <View testID="cart-tab-icon">
      <Ionicons
        name={focused ? "cart" : "cart-outline"}
        size={26}
        color={color}
      />
      {count > 0 && (
        <View testID="cart-badge" style={styles.badge}>
          <Text style={styles.badgeText}>{count > 9 ? "9+" : count}</Text>
        </View>
      )}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        headerShown: false,
        tabBarStyle: TAB_BAR_STYLE,
        tabBarLabelStyle: TAB_BAR_LABEL_STYLE,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <HomeTabIcon color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <CartTabIcon color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -4,
    right: -10,
    backgroundColor: Colors.error,
    borderRadius: BorderRadius.full,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: "700",
  },
});
