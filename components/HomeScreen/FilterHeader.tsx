import { Ionicons } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SeedData } from "../../constants/SeedData";

const FilterHeader = ({
  searchText,
  setSearchText,
  selectedCategory,
  setSelectedCategory,
}: {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
}) => {
  const CATEGORIES = ["All", ...new Set(SeedData.map((p) => p.category))];

  return (
    <View style={styles.headerContainer}>
      <View style={styles.searchBarContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={{ marginRight: 8 }}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText("")}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingHorizontal: 16 }}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.chip, selectedCategory === cat && styles.chipActive]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.chipText,
                selectedCategory === cat && styles.chipTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default FilterHeader;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#F5F7FA",
    marginBottom: 16,
  },
  searchBarContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: "#E1E4E8",
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#E1E4E8",
    borderRadius: 20,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: "#007AFF",
  },
  chipText: {
    color: "#555",
    fontWeight: "600",
  },
  chipTextActive: {
    color: "#fff",
  },
});
