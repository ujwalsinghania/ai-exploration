import { cuisines } from "@/constants/data";
import { BorderRadius, Colors, FontSize, Spacing } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const GRID_GAP = Spacing.md;
const GRID_PADDING = Spacing.lg;
const ITEM_WIDTH = (width - GRID_PADDING * 2 - GRID_GAP * 3) / 4;

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCuisines = searchQuery
    ? cuisines.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : cuisines;

  return (
    <ScrollView
      testID="home-screen"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Header ── */}
      <View testID="home-header" style={styles.header}>
        <View>
          <Text style={styles.headerSubtitle}>DELIVERY TO</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={18} color={Colors.primary} />
            <Text style={styles.headerTitle}>Home</Text>
            <Ionicons name="chevron-down" size={16} color={Colors.primary} />
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity testID="offers-button" style={styles.headerIcon}>
            <Ionicons name="pricetag-outline" size={22} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Search Bar ── */}
      <View testID="search-bar" style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={Colors.textLight}
          style={styles.searchIcon}
        />
        <TextInput
          testID="search-input"
          style={styles.searchInput}
          placeholder="Search for restaurants, cuisines..."
          placeholderTextColor={Colors.textLight}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            testID="search-clear"
            onPress={() => setSearchQuery("")}
          >
            <Ionicons name="close-circle" size={20} color={Colors.textLight} />
          </TouchableOpacity>
        )}
      </View>

      {/* ── Hero Banner ── */}
      <View testID="hero-banner" style={styles.heroBanner}>
        <Image
          source={require("@/assets/images/hero-banner.png")}
          style={styles.heroImage}
          contentFit="cover"
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Hungry?</Text>
          <Text style={styles.heroSubtitle}>Order your favourite food now</Text>
        </View>
      </View>

      {/* ── Cuisine Grid ── */}
      <View style={styles.sectionHeader}>
        <Text testID="cuisine-section-title" style={styles.sectionTitle}>
          What's on your mind?
        </Text>
      </View>

      <View testID="cuisine-grid" style={styles.cuisineGrid}>
        {filteredCuisines.map((cuisine) => (
          <TouchableOpacity
            key={cuisine.id}
            testID={`cuisine-item-${cuisine.id}`}
            style={[styles.cuisineItem, { backgroundColor: cuisine.color }]}
            activeOpacity={0.7}
            onPress={() => router.push(`/restaurants/${cuisine.id}`)}
          >
            <Text style={styles.cuisineEmoji}>{cuisine.emoji}</Text>
            <Text style={styles.cuisineName} numberOfLines={1}>
              {cuisine.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredCuisines.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🔍</Text>
          <Text style={styles.emptyText}>
            No cuisines found for "{searchQuery}"
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    paddingBottom: Spacing.xxxl,
  },

  /* Header */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: GRID_PADDING,
    paddingTop: 56,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.white,
  },
  headerSubtitle: {
    fontSize: FontSize.xs,
    fontWeight: "600",
    color: Colors.textLight,
    letterSpacing: 1,
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.text,
  },
  headerRight: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },

  /* Search */
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    marginHorizontal: GRID_PADDING,
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    height: 48,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.text,
  },

  /* Hero Banner */
  heroBanner: {
    marginHorizontal: GRID_PADDING,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    height: 180,
    marginBottom: Spacing.xxl,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  heroTitle: {
    fontSize: FontSize.xxl,
    fontWeight: "800",
    color: Colors.white,
  },
  heroSubtitle: {
    fontSize: FontSize.md,
    color: "rgba(255,255,255,0.9)",
    marginTop: 2,
  },

  /* Section */
  sectionHeader: {
    paddingHorizontal: GRID_PADDING,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: "700",
    color: Colors.text,
  },

  /* Cuisine Grid */
  cuisineGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: GRID_PADDING,
    gap: GRID_GAP,
  },
  cuisineItem: {
    width: ITEM_WIDTH,
    aspectRatio: 0.85,
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spacing.md,
  },
  cuisineEmoji: {
    fontSize: 36,
    marginBottom: Spacing.sm,
  },
  cuisineName: {
    fontSize: FontSize.xs,
    fontWeight: "600",
    color: Colors.text,
    textAlign: "center",
  },

  /* Empty State */
  emptyState: {
    alignItems: "center",
    paddingVertical: Spacing.xxxl,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  emptyText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
});
