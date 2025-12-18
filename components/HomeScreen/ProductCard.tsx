import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RxBadge from "./RxBadge";
import { SKU } from "../../constants/SeedData";

const ProductCard = ({
  item,
  quantity,
  handleQuantityChange,
}: {
  item: SKU;
  quantity: number;
  handleQuantityChange: (id: number, change: number) => void;
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.cardTopRow}>
          <Text style={styles.productName}>{item.name}</Text>
          {item.isPrescription && <RxBadge />}
        </View>
        <Text style={styles.categoryName}>{item.category}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.addToCartButton,
          quantity >= 99 && styles.addToCartButtonDisabled,
        ]}
        onPress={() => handleQuantityChange(item.id, 1)}
      >
        <Text style={styles.addToCart}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
    marginRight: 12,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginRight: 8,
  },
  categoryName: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#007AFF",
  },
  addToCart: {
    color: "#007AFF",
    fontWeight: "600",
  },
  addToCartButton: {
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 1,
  },
  addToCartButtonDisabled: {
    backgroundColor: "#F9FAFB",
    shadowOpacity: 0,
    elevation: 0,
  },
});
