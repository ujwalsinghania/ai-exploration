// React / Built-in
import { FlatList, Text, TouchableOpacity, View } from "react-native";

// Expo / Third-party
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Constants
import { Colors } from "@/constants/theme";
import { cuisines, restaurantsByCuisine } from "@/constants/data";

// Types
import type { Restaurant } from "@/constants/data";

// Utils
import { getListContainerStyle } from "./utils";

// Styles
import { styles } from "./styles";

export default function RestaurantListScreen() {
  const { cuisine } = useLocalSearchParams<{ cuisine: string }>();
  const insets = useSafeAreaInsets();

  const cuisineData = cuisines.find((c) => c.id === cuisine);
  const restaurants = restaurantsByCuisine[cuisine ?? ""] ?? [];

  const renderRestaurantCard = ({ item }: { item: Restaurant }) => (
    <TouchableOpacity
      testID={`restaurant-card-${item.id}`}
      style={styles.restaurantCard}
      activeOpacity={0.8}
      onPress={() => router.push(`/restaurants/${cuisine}/${item.id}`)}
    >
      {/* Banner */}
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.cardBanner}
        contentFit="cover"
      />

      <View style={styles.cardContent}>
        <Text
          testID={`restaurant-name-${item.id}`}
          style={styles.cardTitle}
          numberOfLines={1}
        >
          {item.name}
        </Text>

        <View style={styles.cardMeta}>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={12} color={Colors.white} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.deliveryTime}>{item.deliveryTime}</Text>
        </View>

        <Text style={styles.cardTags} numberOfLines={1}>
          {item.tags.join(" • ")}
        </Text>

        <Text style={styles.cardCost}>₹{item.costForTwo} for two</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen options={{ title: cuisineData?.name ?? "Restaurants" }} />

      <FlatList
        testID="restaurant-list"
        data={restaurants}
        renderItem={renderRestaurantCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={getListContainerStyle(insets.bottom)}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View testID="restaurant-list-header" style={styles.listHeader}>
            {cuisineData && (
              <Image
                source={{ uri: cuisineData.imageUrl }}
                style={styles.listHeaderImage}
                contentFit="cover"
              />
            )}
            <Text style={styles.listHeaderTitle}>
              {cuisineData?.name ?? "All"} Restaurants
            </Text>
            <Text style={styles.listHeaderCount}>
              {restaurants.length} restaurant
              {restaurants.length !== 1 ? "s" : ""} near you
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="storefront-outline" size={48} color={Colors.textLight} />
            <Text style={styles.emptyText}>No restaurants found</Text>
          </View>
        }
      />
    </>
  );
}
