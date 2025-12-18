import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CartSKU } from "../../constants/SeedData";
import { addSpacesToPrice } from "../../helpers/product";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OrderSummaryPanel = ({
  compactMode = false,
  cartItemsList,
  handleQuantityChange,
}: {
  compactMode?: boolean;
  cartItemsList: {
    items: CartSKU[];
    grandTotal: number;
  };
  handleQuantityChange: (id: number, change: number) => void;
}) => {
  const insets = useSafeAreaInsets();
  const { items = [], grandTotal = 0 } = cartItemsList || {};
  const itemCount = items.reduce((sum, item) => sum + (item.qty || 0), 0);
  const [isExpanded, setIsExpanded] = useState(!compactMode);

  return (
    <View
      style={[
        styles.summaryContainer,
        compactMode && styles.summaryCompact,
        !compactMode && { flex: 1 },
        { paddingBottom: 20 + insets.bottom },
      ]}
    >
      <TouchableOpacity
        onPress={() => setIsExpanded(!isExpanded)}
        style={styles.headerContainer}
        activeOpacity={0.7}
      >
        <Text style={styles.summaryTitle}>Order Summary ({itemCount})</Text>
        {compactMode && (
          <Feather
            color={"#007AFF"}
            name={isExpanded ? "chevron-down" : "chevron-up"}
            size={26}
          />
        )}
      </TouchableOpacity>

      {isExpanded && (
        <View style={(compactMode && { height: 250 }) || { flex: 1 }}>
          {items.length > 0 ? (
            <ScrollView
              style={styles.summaryList}
              showsVerticalScrollIndicator={false}
            >
              {items.map((item, index) => (
                <View key={item.id || index} style={styles.summaryRow}>
                  <View style={styles.itemDetails}>
                    <Text style={styles.summaryItemName} numberOfLines={2}>
                      {item.name}
                    </Text>
                    <Text style={styles.itemQtyPrice}>
                      {item.qty} x {addSpacesToPrice(item.price)}
                    </Text>
                  </View>
                  <Text style={styles.summaryItemPrice}>
                    {addSpacesToPrice(item.subtotal) || "0"}
                  </Text>
                  <View style={styles.qtyControlContainer}>
                    <TouchableOpacity
                      style={[
                        styles.qtyButton,
                        item.qty >= 99 && styles.qtyButtonDisabled,
                      ]}
                      onPress={() => {
                        if (item.qty < 99) {
                          handleQuantityChange(item.id, 1);
                        } else {
                          Alert.alert("Maximum quantity reached");
                        }
                      }}
                    >
                      <MaterialIcons
                        name="add"
                        size={20}
                        color={item.qty >= 99 ? "#ccc" : "#007AFF"}
                      />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.qty}</Text>

                    <TouchableOpacity
                      style={[
                        styles.qtyButton,
                        item.qty === 0 && styles.qtyButtonDisabled,
                      ]}
                      onPress={() => handleQuantityChange(item.id, -1)}
                      disabled={item.qty === 0}
                    >
                      <MaterialIcons
                        name="remove"
                        size={20}
                        color={item.qty === 0 ? "#ccc" : "#007AFF"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.noItemsContainer}>
              <Text style={styles.noItemsText}>No items in cart</Text>
            </View>
          )}
        </View>
      )}

      <View style={styles.divider} />
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Grand Total:</Text>
        <Text style={styles.totalValue}>
          {addSpacesToPrice(grandTotal) || "0"}
        </Text>
      </View>
    </View>
  );
};
export default OrderSummaryPanel;

const styles = StyleSheet.create({
  summaryContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E1E4E8",
  },
  summaryCompact: {
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    elevation: 10,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
  },
  expandIcon: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
    marginLeft: 8,
  },
  summaryList: {
    flex: 1,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  itemDetails: {
    marginRight: 12,
    flex: 1,
  },
  summaryItemName: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
    marginBottom: 4,
  },
  itemQtyPrice: {
    fontSize: 13,
    color: "#666",
    fontWeight: "400",
  },
  summaryItemPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: "#007AFF",
    marginHorizontal: 24,
  },
  noItemsText: {
    textAlign: "center",
    color: "#999",
    fontSize: 14,
    fontStyle: "italic",
    paddingVertical: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#E1E4E8",
    marginVertical: 16,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#007AFF",
  },
  emptyCartText: {
    textAlign: "center",
    color: "#999",
    fontSize: 16,
  },
  qtyControlContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F2F5",
    borderRadius: 24,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  qtyButton: {
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 1,
  },
  qtyButtonDisabled: {
    backgroundColor: "#F9FAFB",
    shadowOpacity: 0,
    elevation: 0,
  },
  qtyText: {
    fontSize: 14,
    fontWeight: "600",
    marginVertical: 8,
    minWidth: 24,
    textAlign: "center",
  },
  noItemsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
