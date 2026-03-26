// React / Built-in
import { StyleSheet } from "react-native";

// Constants
import { BorderRadius, Colors, FontSize, Spacing } from "@/constants/theme";
import { GRID_GAP, GRID_PADDING, ITEM_WIDTH } from "./constants";

export const styles = StyleSheet.create({
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
  cuisineImage: {
    width: "75%",
    aspectRatio: 1,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xs,
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
  emptyText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
});
