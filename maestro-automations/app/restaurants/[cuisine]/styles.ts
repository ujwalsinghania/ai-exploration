// React / Built-in
import { StyleSheet } from "react-native";

// Constants
import { BorderRadius, Colors, FontSize, Spacing } from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  /* Banner */
  banner: {
    width: "100%",
    height: 220,
  },
  /* Info */
  infoContainer: {
    padding: Spacing.xl,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: "800",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
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
  metaText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  tags: {
    fontSize: FontSize.sm,
    color: Colors.textLight,
  },

  /* Section divider */
  sectionDivider: {
    height: 8,
    backgroundColor: Colors.background,
    marginTop: Spacing.xl,
  },
  menuTitle: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.text,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
  },

  /* Veg indicator */
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

  /* Menu item */
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
  menuItemInfo: {
    flex: 1,
  },
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

  /* Add button */
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

  /* Scroll content */
  scrollContent: {},

  /* Not found */
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notFoundText: {
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
  },
});
