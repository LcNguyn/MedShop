import React, { useMemo, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import FilterHeader from "./components/HomeScreen/FilterHeader";
import OrderSummaryPanel from "./components/HomeScreen/OrderSummaryPanel";
import ProductCard from "./components/HomeScreen/ProductCard";
import { CartSKU, SeedData, SKU } from "./constants/SeedData";

export const PRODUCTS: SKU[] = SeedData;
export default function App() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartState, setCartState] = useState<Record<SKU["id"], number>>({});

  const filteredData: SKU[] = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchText, selectedCategory]);

  const handleQuantityChange = (id: number, change: number) => {
    setCartState((prevState) => {
      const currentQty = prevState[id] || 0;
      let newQty = currentQty + change;
      newQty = Math.max(0, Math.min(99, newQty));

      const newState = { ...prevState };
      if (newQty <= 0) {
        delete newState[id];
      } else {
        newState[id] = newQty;
      }
      return newState;
    });
  };

  const cartItemsList: { items: CartSKU[]; grandTotal: number } =
    useMemo(() => {
      const items = [];
      let grandTotal = 0;

      for (const [id, qty] of Object.entries(cartState)) {
        const product = PRODUCTS.find((p) => p.id === parseInt(id));
        if (product) {
          const subtotal = product.price * qty;
          grandTotal += subtotal;
          items.push({ ...product, qty, subtotal });
        }
      }
      return { items, grandTotal };
    }, [cartState]);

  const ProductFeed = (
    <View>
      <FilterHeader
        searchText={searchText}
        setSearchText={setSearchText}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <FlatList<SKU>
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            quantity={cartState[item.id]}
            handleQuantityChange={handleQuantityChange}
          />
        )}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );

  return (
    <SafeAreaProvider>
      <View style={styles.rootContainer}>
        <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
          <StatusBar barStyle="dark-content" backgroundColor="#F5F7FA" />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
          >
            {isDesktop ? (
              // --- DESKTOP SPLIT LAYOUT ---
              <View style={styles.desktopContainer}>
                <View style={styles.desktopLeftPane}>{ProductFeed}</View>
                <View style={styles.desktopRightPane}>
                  <OrderSummaryPanel
                    compactMode={false}
                    cartItemsList={cartItemsList}
                    handleQuantityChange={handleQuantityChange}
                  />
                </View>
              </View>
            ) : (
              // --- MOBILE STACK LAYOUT ---
              <View style={styles.mobileContainer}>
                <View style={styles.mobileFeedContainer}>{ProductFeed}</View>
                <OrderSummaryPanel
                  compactMode={true}
                  cartItemsList={cartItemsList}
                  handleQuantityChange={handleQuantityChange}
                />
              </View>
            )}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  safeArea: {
    flex: 1,
  },
  bottomSafeArea: {
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
  },
  desktopContainer: {
    flex: 1,
    flexDirection: "row",
    maxWidth: 1200,
    alignSelf: "center",
    width: "100%",
  },
  desktopLeftPane: {
    flex: 2,
    borderRightWidth: 1,
    borderRightColor: "#E1E4E8",
  },
  desktopRightPane: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  mobileContainer: {
    flex: 1,
    flexDirection: "column",
  },
  mobileFeedContainer: {
    flex: 1,
  },

  listContent: {
    paddingBottom: 20,
  },
});
