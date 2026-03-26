// React / Built-in
import { useMemo, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Expo / Third-party
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

// Constants
import { cuisines } from "@/constants/data";
import { Colors } from "@/constants/theme";
import { HERO_IMAGE_SOURCE } from "./home/constants";

// Utils
import { getCuisineItemStyle } from "./home/utils";

// Styles
import { styles } from "./home/styles";

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCuisines = useMemo(() => {
    if (searchQuery) {
      return cuisines.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    return cuisines;
  }, [searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleCuisinePress = (id: string) => {
    router.push(`/restaurants/${id}`);
  };

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
          <TouchableOpacity testID="search-clear" onPress={handleClearSearch}>
            <Ionicons name="close-circle" size={20} color={Colors.textLight} />
          </TouchableOpacity>
        )}
      </View>

      {/* ── Hero Banner ── */}
      <View testID="hero-banner" style={styles.heroBanner}>
        <Image
          source={HERO_IMAGE_SOURCE}
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
          {"What's on your mind?"}
        </Text>
      </View>

      <View testID="cuisine-grid" style={styles.cuisineGrid}>
        {filteredCuisines.map((cuisine) => (
          <TouchableOpacity
            key={cuisine.id}
            testID={`cuisine-item-${cuisine.id}`}
            style={getCuisineItemStyle(cuisine.color)}
            activeOpacity={0.7}
            onPress={() => handleCuisinePress(cuisine.id)}
          >
            <Image
              source={{ uri: cuisine.imageUrl }}
              style={styles.cuisineImage}
              contentFit="cover"
            />
            <Text style={styles.cuisineName} numberOfLines={1}>
              {cuisine.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredCuisines.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="search" size={48} color={Colors.textLight} />
          <Text style={styles.emptyText}>
            {`No cuisines found for "${searchQuery}"`}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
