// React / Built-in
import { Dimensions } from "react-native";

// Constants
import { Spacing } from "@/constants/theme";

const { width } = Dimensions.get("window");

export const GRID_GAP = Spacing.md;
export const GRID_PADDING = Spacing.lg;
export const ITEM_WIDTH = (width - GRID_PADDING * 2 - GRID_GAP * 3) / 4;

export const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop";
export const HERO_IMAGE_SOURCE = { uri: HERO_IMAGE_URL };
