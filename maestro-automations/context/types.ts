import type { CartItem, MenuItem } from "@/constants/data";

export interface CartContextType {
  items: CartItem[];
  addToCart: (item: MenuItem, restaurantName: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}
