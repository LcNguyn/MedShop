import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CategoryChip = ({ category }: { category: string }) => {
  return (
    <View style={styles.container}>
      <Text>{category}</Text>
    </View>
  );
};

export default CategoryChip;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#76c7f0",
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#5aaedc",
  },
});
