// React / Built-in
import { StyleSheet } from "react-native";

// Constants
import { BorderRadius, Colors, FontSize, Spacing } from "@/constants/theme";

export const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    paddingBottom: 40,
  },

  /* Header */
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingTop: 56,
    paddingBottom: Spacing.lg,
    flexDirection: "row",
    alignItems: "baseline",
    gap: Spacing.sm,
  },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: "800",
    color: Colors.text,
  },
  headerCount: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },

  /* Empty State */
  emptyState: {
    alignItems: "center",
    paddingVertical: 80,
  },
  emptyEmoji: { fontSize: 64, marginBottom: Spacing.lg },
  emptyTitle: {
    fontSize: FontSize.xl,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: "center",
    paddingHorizontal: Spacing.xxxl,
  },

  /* Section */
  section: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.lg,
  },

  /* Cart Item */
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  cartItemLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  vegDot: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  vegDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  cartItemInfo: { flex: 1 },
  cartItemName: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.text,
  },
  cartItemPrice: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  /* Quantity */
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginHorizontal: Spacing.md,
  },
  qtyButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  qtyText: {
    fontSize: FontSize.sm,
    fontWeight: "700",
    color: Colors.primary,
    minWidth: 20,
    textAlign: "center",
  },
  cartItemTotal: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.text,
    minWidth: 50,
    textAlign: "right",
  },

  /* Bill */
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.sm,
  },
  billLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  billValue: {
    fontSize: FontSize.sm,
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: Spacing.sm,
  },
  totalLabel: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.text,
  },
  totalValue: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.text,
  },

  /* Place Order */
  placeOrderButton: {
    backgroundColor: Colors.primary,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.lg,
    alignItems: "center",
  },
  placeOrderText: {
    color: Colors.white,
    fontSize: FontSize.lg,
    fontWeight: "700",
  },

  /* Success Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xxl,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xxl,
    width: "100%",
    alignItems: "center",
  },
  successIcon: {
    marginBottom: Spacing.lg,
  },
  successTitle: {
    fontSize: FontSize.xxl,
    fontWeight: "800",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  successSubtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },
  successDetails: {
    width: "100%",
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.sm,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  successRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.sm,
  },
  successLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  successValue: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.text,
    flex: 1,
    textAlign: "right",
    marginLeft: Spacing.md,
  },
  successButton: {
    backgroundColor: Colors.success,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xxxl,
    width: "100%",
    alignItems: "center",
  },
  successButtonText: {
    color: Colors.white,
    fontSize: FontSize.lg,
    fontWeight: "700",
  },
});
