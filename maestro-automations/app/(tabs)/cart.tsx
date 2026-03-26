// React / Built-in
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Expo / Third-party
import { Ionicons } from "@expo/vector-icons";

// Internal
import { CustomTextInput } from "@/components/CustomTextInput";
import { useCart } from "@/context/CartContext";

// Constants
import { Colors } from "@/constants/theme";
import {
  DELIVERY_FEE,
  INITIAL_FORM_DATA,
  KEYBOARD_BEHAVIOR,
  PHONE_SANITIZE_REGEX,
} from "./cart/constants";

// Types
import type { FormData, FormErrors } from "./cart/types";

// Utils
import { getVegDotInnerStyle, getVegDotStyle, validate } from "./cart/utils";

// Styles
import { styles } from "./cart/styles";

export default function CartScreen() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    getTotal,
    clearCart,
    getItemCount,
  } = useCart();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (key: keyof FormData, text: string) => {
    setFormData((prev) => ({ ...prev, [key]: text }));
    if (formErrors[key]) {
      setFormErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      Alert.alert(
        "Empty Cart",
        "Please add items to your cart before placing an order.",
      );
      return;
    }
    const errors = validate(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setShowSuccess(true);
    }
  };

  const handleAddressChange = (text: string) => {
    handleChange("address", text);
  };

  const handlePhoneChange = (text: string) => {
    handleChange("phone", text.replace(PHONE_SANITIZE_REGEX, ""));
  };

  const handleEmailChange = (text: string) => {
    handleChange("email", text);
  };

  const handleDecreaseQuantity = (id: string, quantity: number) => {
    if (quantity <= 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, quantity - 1);
    }
  };

  const handleIncreaseQuantity = (id: string, quantity: number) => {
    updateQuantity(id, quantity + 1);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    clearCart();
    setFormData(INITIAL_FORM_DATA);
    setFormErrors({});
  };

  const subtotal = getTotal();
  const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={KEYBOARD_BEHAVIOR}>
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
                    <View style={getVegDotStyle(item.isVeg)}>
                      <View style={getVegDotInnerStyle(item.isVeg)} />
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
                      onPress={() =>
                        handleDecreaseQuantity(item.id, item.quantity)
                      }
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
                      onPress={() =>
                        handleIncreaseQuantity(item.id, item.quantity)
                      }
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

              <CustomTextInput
                label="Delivery Address"
                testID="address-input"
                placeholder="Enter your full delivery address"
                value={formData.address}
                onChangeText={handleAddressChange}
                error={formErrors.address}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />

              <CustomTextInput
                label="Phone Number"
                testID="phone-input"
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChangeText={handlePhoneChange}
                error={formErrors.phone}
                keyboardType="phone-pad"
                maxLength={10}
              />

              <CustomTextInput
                label="Email Address"
                testID="email-input"
                placeholder="your@email.com"
                value={formData.email}
                onChangeText={handleEmailChange}
                error={formErrors.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
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
