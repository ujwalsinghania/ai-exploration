// React / Built-in
import { StyleSheet } from "react-native";

// Constants
import { BorderRadius, Colors, FontSize, Spacing } from "@/constants/theme";

export const styles = StyleSheet.create({
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
  listHeaderImage: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.sm,
  },
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
  emptyText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
});
