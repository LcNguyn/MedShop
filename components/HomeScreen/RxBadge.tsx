import React from "react";
import { StyleSheet, Text, View } from "react-native";

const RxBadge = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Rx</Text>
    </View>
  );
};

export default RxBadge;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  text: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "800",
  },
});
