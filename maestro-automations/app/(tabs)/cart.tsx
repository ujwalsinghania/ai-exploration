import { BorderRadius, Colors, FontSize, Spacing } from "@/constants/theme";
import { useCart } from "@/context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface FormData {
  address: string;
  phone: string;
  email: string;
}

interface FormErrors {
  address?: string;
  phone?: string;
  email?: string;
}

export default function CartScreen() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    getTotal,
    clearCart,
    getItemCount,
  } = useCart();
  const [formData, setFormData] = useState<FormData>({
    address: "",
    phone: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.address.trim()) {
      errors.address = "Address is required";
    } else if (formData.address.trim().length < 10) {
      errors.address = "Please enter a complete address";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      errors.phone = "Enter a valid 10-digit phone number";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Enter a valid email address";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      Alert.alert(
        "Empty Cart",
        "Please add items to your cart before placing an order.",
      );
      return;
    }
    if (validate()) {
      setShowSuccess(true);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    clearCart();
    setFormData({ address: "", phone: "", email: "" });
    setFormErrors({});
  };

  const deliveryFee = items.length > 0 ? 40 : 0;
  const subtotal = getTotal();
  const total = subtotal + deliveryFee;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        testID="cart-screen"
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cart</Text>
          {items.length > 0 && (
            <Text style={styles.headerCount}>{getItemCount()} items</Text>
          )}
        </View>

        {items.length === 0 ? (
          /* ── Empty Cart ── */
          <View testID="empty-cart" style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🛒</Text>
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySubtitle}>
              Add items from a restaurant to get started
            </Text>
          </View>
        ) : (
          <>
            {/* ── Cart Items ── */}
            <View testID="cart-items" style={styles.section}>
              {items.map((item) => (
                <View
                  key={item.id}
                  testID={`cart-item-${item.id}`}
                  style={styles.cartItem}
                >
                  <View style={styles.cartItemLeft}>
                    <View
                      style={[
                        styles.vegDot,
                        {
                          borderColor: item.isVeg ? Colors.veg : Colors.nonVeg,
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
                    <View style={styles.cartItemInfo}>
                      <Text style={styles.cartItemName} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text style={styles.cartItemPrice}>₹{item.price}</Text>
                    </View>
                  </View>
                  <View style={styles.quantityControl}>
                    <TouchableOpacity
                      testID={`decrease-${item.id}`}
                      style={styles.qtyButton}
                      onPress={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Ionicons
                        name="remove"
                        size={16}
                        color={Colors.primary}
                      />
                    </TouchableOpacity>
                    <Text testID={`quantity-${item.id}`} style={styles.qtyText}>
                      {item.quantity}
                    </Text>
                    <TouchableOpacity
                      testID={`increase-${item.id}`}
                      style={styles.qtyButton}
                      onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Ionicons name="add" size={16} color={Colors.primary} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.cartItemTotal}>
                    ₹{item.price * item.quantity}
                  </Text>
                </View>
              ))}
            </View>

            {/* ── Order Summary ── */}
            <View testID="order-summary" style={styles.section}>
              <Text style={styles.sectionTitle}>Bill Details</Text>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Item Total</Text>
                <Text style={styles.billValue}>₹{subtotal}</Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Delivery Fee</Text>
                <Text style={styles.billValue}>₹{deliveryFee}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.billRow}>
                <Text style={styles.totalLabel}>To Pay</Text>
                <Text testID="cart-total" style={styles.totalValue}>
                  ₹{total}
                </Text>
              </View>
            </View>

            {/* ── Checkout Form ── */}
            <View testID="checkout-form" style={styles.section}>
              <Text style={styles.sectionTitle}>Delivery Details</Text>

              <View style={styles.formField}>
                <Text style={styles.formLabel}>Delivery Address</Text>
                <TextInput
                  testID="address-input"
                  style={[
                    styles.formInput,
                    styles.formTextArea,
                    formErrors.address && styles.inputError,
                  ]}
                  placeholder="Enter your full delivery address"
                  placeholderTextColor={Colors.textLight}
                  value={formData.address}
                  onChangeText={(text) => {
                    setFormData((prev) => ({ ...prev, address: text }));
                    if (formErrors.address)
                      setFormErrors((prev) => ({
                        ...prev,
                        address: undefined,
                      }));
                  }}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
                {formErrors.address && (
                  <Text testID="address-error" style={styles.errorText}>
                    {formErrors.address}
                  </Text>
                )}
              </View>

              <View style={styles.formField}>
                <Text style={styles.formLabel}>Phone Number</Text>
                <TextInput
                  testID="phone-input"
                  style={[
                    styles.formInput,
                    formErrors.phone && styles.inputError,
                  ]}
                  placeholder="10-digit mobile number"
                  placeholderTextColor={Colors.textLight}
                  value={formData.phone}
                  onChangeText={(text) => {
                    setFormData((prev) => ({
                      ...prev,
                      phone: text.replace(/[^0-9]/g, ""),
                    }));
                    if (formErrors.phone)
                      setFormErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
                {formErrors.phone && (
                  <Text testID="phone-error" style={styles.errorText}>
                    {formErrors.phone}
                  </Text>
                )}
              </View>

              <View style={styles.formField}>
                <Text style={styles.formLabel}>Email Address</Text>
                <TextInput
                  testID="email-input"
                  style={[
                    styles.formInput,
                    formErrors.email && styles.inputError,
                  ]}
                  placeholder="your@email.com"
                  placeholderTextColor={Colors.textLight}
                  value={formData.email}
                  onChangeText={(text) => {
                    setFormData((prev) => ({ ...prev, email: text }));
                    if (formErrors.email)
                      setFormErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {formErrors.email && (
                  <Text testID="email-error" style={styles.errorText}>
                    {formErrors.email}
                  </Text>
                )}
              </View>
            </View>

            {/* ── Place Order ── */}
            <TouchableOpacity
              testID="place-order-button"
              style={styles.placeOrderButton}
              activeOpacity={0.85}
              onPress={handlePlaceOrder}
            >
              <Text style={styles.placeOrderText}>Place Order • ₹{total}</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      {/* ── Success Modal ── */}
      <Modal
        testID="success-modal"
        visible={showSuccess}
        transparent
        animationType="fade"
        onRequestClose={handleSuccessClose}
      >
        <View style={styles.modalOverlay}>
          <View testID="success-modal-content" style={styles.modalContent}>
            <View style={styles.successIcon}>
              <Ionicons
                name="checkmark-circle"
                size={72}
                color={Colors.success}
              />
            </View>
            <Text style={styles.successTitle}>Order Placed!</Text>
            <Text style={styles.successSubtitle}>
              Your order has been placed successfully. You will receive a
              confirmation shortly.
            </Text>
            <View style={styles.successDetails}>
              <View style={styles.successRow}>
                <Text style={styles.successLabel}>Order Total</Text>
                <Text style={styles.successValue}>₹{total}</Text>
              </View>
              <View style={styles.successRow}>
                <Text style={styles.successLabel}>Delivery to</Text>
                <Text style={styles.successValue} numberOfLines={1}>
                  {formData.address}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              testID="success-modal-close"
              style={styles.successButton}
              onPress={handleSuccessClose}
            >
              <Text style={styles.successButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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

  /* Form */
  formField: {
    marginBottom: Spacing.lg,
  },
  formLabel: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  formInput: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.text,
  },
  formTextArea: {
    minHeight: 80,
  },
  inputError: {
    borderColor: Colors.error,
    backgroundColor: "#FFF5F5",
  },
  errorText: {
    fontSize: FontSize.xs,
    color: Colors.error,
    marginTop: 4,
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
