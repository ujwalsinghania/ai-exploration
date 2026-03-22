import {
  cuisines,
  restaurantsByCuisine,
  type MenuItem,
  type Restaurant,
} from "@/constants/data";
import { BorderRadius, Colors, FontSize, Spacing } from "@/constants/theme";
import { useCart } from "@/context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RestaurantListScreen() {
  const { cuisine } = useLocalSearchParams<{ cuisine: string }>();
  const { addToCart } = useCart();

  const cuisineData = cuisines.find((c) => c.id === cuisine);
  const restaurants = restaurantsByCuisine[cuisine ?? ""] ?? [];

  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [addedItemId, setAddedItemId] = useState<string | null>(null);

  const handleAddToCart = (item: MenuItem, restaurantName: string) => {
    addToCart(item, restaurantName);
    setAddedItemId(item.id);
    setTimeout(() => setAddedItemId(null), 1200);
  };

  const renderRestaurantCard = ({
    item,
    index,
  }: {
    item: Restaurant;
    index: number;
  }) => (
    <TouchableOpacity
      testID={`restaurant-card-${item.id}`}
      style={styles.restaurantCard}
      activeOpacity={0.8}
      onPress={() => setSelectedRestaurant(item)}
    >
      {/* Color banner */}
      <View style={[styles.cardBanner, { backgroundColor: item.color }]}>
        <Text style={styles.cardBannerEmoji}>{cuisineData?.emoji ?? "🍽️"}</Text>
      </View>

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
      <Stack.Screen
        options={{
          title: cuisineData?.name ?? "Restaurants",
          headerTitleStyle: { fontWeight: "700", fontSize: FontSize.lg },
        }}
      />

      <FlatList
        testID="restaurant-list"
        data={restaurants}
        renderItem={renderRestaurantCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View testID="restaurant-list-header" style={styles.listHeader}>
            <Text style={styles.listHeaderEmoji}>
              {cuisineData?.emoji ?? "🍽️"}
            </Text>
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
            <Text style={styles.emptyEmoji}>😕</Text>
            <Text style={styles.emptyText}>No restaurants found</Text>
          </View>
        }
      />

      {/* ── Restaurant Detail Popup ── */}
      <Modal
        testID="restaurant-popup"
        visible={selectedRestaurant !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedRestaurant(null)}
      >
        <View style={styles.modalOverlay}>
          <View testID="restaurant-popup-content" style={styles.modalContent}>
            {/* Close */}
            <TouchableOpacity
              testID="close-popup-button"
              style={styles.closeButton}
              onPress={() => setSelectedRestaurant(null)}
            >
              <Ionicons name="close" size={24} color={Colors.textSecondary} />
            </TouchableOpacity>

            {selectedRestaurant && (
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Restaurant header */}
                <View
                  style={[
                    styles.popupBanner,
                    { backgroundColor: selectedRestaurant.color },
                  ]}
                >
                  <Text style={styles.popupBannerEmoji}>
                    {cuisineData?.emoji ?? "🍽️"}
                  </Text>
                </View>

                <Text testID="restaurant-popup-title" style={styles.popupTitle}>
                  {selectedRestaurant.name}
                </Text>

                <View style={styles.popupMeta}>
                  <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={12} color={Colors.white} />
                    <Text style={styles.ratingText}>
                      {selectedRestaurant.rating}
                    </Text>
                  </View>
                  <Text style={styles.popupMetaText}>
                    {selectedRestaurant.deliveryTime}
                  </Text>
                  <Text style={styles.popupMetaText}>
                    ₹{selectedRestaurant.costForTwo} for two
                  </Text>
                </View>

                <Text style={styles.popupTags}>
                  {selectedRestaurant.tags.join(" • ")}
                </Text>

                <View style={styles.menuDivider} />

                <Text style={styles.menuSectionTitle}>Menu</Text>

                {/* Menu Items */}
                {selectedRestaurant.menuItems.map((item) => (
                  <View
                    key={item.id}
                    testID={`menu-item-${item.id}`}
                    style={styles.menuItem}
                  >
                    <View style={styles.menuItemLeft}>
                      <View
                        style={[
                          styles.vegDot,
                          {
                            borderColor: item.isVeg
                              ? Colors.veg
                              : Colors.nonVeg,
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles.vegDotInner,
                            {
                              backgroundColor: item.isVeg
                                ? Colors.veg
                                : Colors.nonVeg,
                            },
                          ]}
                        />
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
                      onPress={() =>
                        handleAddToCart(item, selectedRestaurant.name)
                      }
                    >
                      <Text
                        style={[
                          styles.addButtonText,
                          addedItemId === item.id &&
                            styles.addButtonTextSuccess,
                        ]}
                      >
                        {addedItemId === item.id ? "✓ Added" : "ADD"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: Spacing.lg,
    paddingBottom: 40,
  },

  /* List Header */
  listHeader: {
    alignItems: "center",
    paddingVertical: Spacing.xl,
    marginBottom: Spacing.md,
  },
  listHeaderEmoji: { fontSize: 48, marginBottom: Spacing.sm },
  listHeaderTitle: {
    fontSize: FontSize.xl,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 4,
  },
  listHeaderCount: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },

  /* Restaurant Card */
  restaurantCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardBanner: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  cardBannerEmoji: { fontSize: 48, opacity: 0.7 },
  cardContent: {
    padding: Spacing.lg,
  },
  cardTitle: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.success,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
    gap: 3,
  },
  ratingText: {
    fontSize: FontSize.xs,
    fontWeight: "700",
    color: Colors.white,
  },
  deliveryTime: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  cardTags: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  cardCost: {
    fontSize: FontSize.xs,
    color: Colors.textLight,
  },

  /* Empty */
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyEmoji: { fontSize: 48, marginBottom: Spacing.md },
  emptyText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    maxHeight: "85%",
    paddingBottom: 40,
  },
  closeButton: {
    position: "absolute",
    top: Spacing.lg,
    right: Spacing.lg,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },

  /* Popup Banner */
  popupBanner: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
  },
  popupBannerEmoji: { fontSize: 56, opacity: 0.6 },

  popupTitle: {
    fontSize: FontSize.xxl,
    fontWeight: "800",
    color: Colors.text,
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.lg,
  },
  popupMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.sm,
  },
  popupMetaText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  popupTags: {
    fontSize: FontSize.sm,
    color: Colors.textLight,
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.sm,
  },

  /* Menu */
  menuDivider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginHorizontal: Spacing.xl,
    marginVertical: Spacing.lg,
  },
  menuSectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.text,
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  menuItemLeft: {
    flex: 1,
    flexDirection: "row",
    gap: Spacing.sm,
    marginRight: Spacing.md,
  },
  vegDot: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 3,
  },
  vegDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  menuItemInfo: { flex: 1 },
  menuItemName: {
    fontSize: FontSize.md,
    fontWeight: "600",
    color: Colors.text,
  },
  menuItemPrice: {
    fontSize: FontSize.md,
    fontWeight: "500",
    color: Colors.text,
    marginTop: 2,
  },
  menuItemDesc: {
    fontSize: FontSize.xs,
    color: Colors.textLight,
    marginTop: 4,
    lineHeight: 16,
  },

  /* Add Button */
  addButton: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.primaryLight,
    minWidth: 80,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: FontSize.sm,
    fontWeight: "700",
    color: Colors.primary,
  },
  addButtonSuccess: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  addButtonTextSuccess: {
    color: Colors.white,
  },
});
