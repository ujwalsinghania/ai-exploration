// React / Built-in
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

// Expo / Third-party
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";

// Internal
import { useCart } from "@/context/CartContext";

// Constants
import { Colors } from "@/constants/theme";
import { ADDED_ITEM_TIMEOUT } from "../constants";
import { cuisines, restaurantsByCuisine } from "@/constants/data";

// Types
import type { MenuItem } from "@/constants/data";

// Utils
import {
  getScrollContentStyle,
  getVegDotInnerStyle,
  getVegDotStyle,
} from "./utils";

// Styles
import { styles } from "./styles";

export default function RestaurantDetailScreen() {
  const { cuisine, id } = useLocalSearchParams<{
    cuisine: string;
    id: string;
  }>();
  const { addToCart } = useCart();
  const insets = useSafeAreaInsets();

  const cuisineData = cuisines.find((c) => c.id === cuisine);
  const restaurant = (restaurantsByCuisine[cuisine ?? ""] ?? []).find(
    (r) => r.id === id,
  );

  const [addedItemId, setAddedItemId] = useState<string | null>(null);

  const handleAddToCart = (item: MenuItem) => {
    if (!restaurant) return;
    addToCart(item, restaurant.name);
    setAddedItemId(item.id);
    setTimeout(() => setAddedItemId(null), ADDED_ITEM_TIMEOUT);
  };

  if (!restaurant) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Restaurant not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: restaurant.name }} />

      <ScrollView
        testID="restaurant-detail"
        style={styles.container}
        contentContainerStyle={getScrollContentStyle(insets.bottom)}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner */}
        <Image
          source={{ uri: restaurant.imageUrl ?? cuisineData?.imageUrl }}
          style={styles.banner}
          contentFit="cover"
        />

        {/* Restaurant Info */}
        <View style={styles.infoContainer}>
          <Text testID="restaurant-detail-title" style={styles.title}>
            {restaurant.name}
          </Text>

          <View style={styles.metaRow}>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={12} color={Colors.white} />
              <Text style={styles.ratingText}>{restaurant.rating}</Text>
            </View>
            <Text style={styles.metaText}>{restaurant.deliveryTime}</Text>
            <Text style={styles.metaText}>
              ₹{restaurant.costForTwo} for two
            </Text>
          </View>

          <Text style={styles.tags}>{restaurant.tags.join(" • ")}</Text>
        </View>

        <View style={styles.sectionDivider} />

        <Text style={styles.menuTitle}>Menu</Text>

        {/* Menu Items */}
        {restaurant.menuItems.slice(0, 1).map((item) => (
          <View
            key={item.id}
            testID={`menu-item-${item.id}`}
            style={styles.menuItem}
          >
            <View style={styles.menuItemLeft}>
              <View style={getVegDotStyle(item.isVeg)}>
                <View style={getVegDotInnerStyle(item.isVeg)} />
              </View>
              <View style={styles.menuItemInfo}>
                <Text
                  testID={`menu-item-name-${item.id}`}
                  style={styles.menuItemName}
                >
                  {item.name}
                </Text>
                <Text
                  testID={`menu-item-price-${item.id}`}
                  style={styles.menuItemPrice}
                >
                  ₹{item.price}
                </Text>
                <Text
                  testID={`menu-item-desc-${item.id}`}
                  style={styles.menuItemDesc}
                  numberOfLines={2}
                >
                  {item.description}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              testID={`add-to-cart-${item.id}`}
              style={[
                styles.addButton,
                addedItemId === item.id && styles.addButtonSuccess,
              ]}
              onPress={() => handleAddToCart(item)}
            >
              <Text
                style={[
                  styles.addButtonText,
                  addedItemId === item.id && styles.addButtonTextSuccess,
                ]}
              >
                {addedItemId === item.id ? "✓ Added" : "ADD"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </>
  );
}
