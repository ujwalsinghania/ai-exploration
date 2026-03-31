// React / Built-in
import { Dimensions } from "react-native";

// Constants
import { Spacing } from "@/constants/theme";

const { width } = Dimensions.get("window");

export const GRID_GAP = Spacing.md;
export const GRID_PADDING = Spacing.lg;
export const ITEM_WIDTH = (width - GRID_PADDING * 2 - GRID_GAP * 3) / 4;

export const HERO_IMAGE_URL = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=1000&h=400&fit=crop";
export const HERO_IMAGE_SOURCE = { uri: HERO_IMAGE_URL };
