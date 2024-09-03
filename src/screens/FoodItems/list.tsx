import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const FoodItemsScreen = ({ route }: any) => {
  const { name, foodItems } = route.params;
  const [addedItems, setAddedItems] = useState<{ [key: number]: number }>({});

  const handleAddItem = (item: { id: number; name: string; price: number }) => {
    setAddedItems((prevItems) => {
      const currentQuantity = prevItems[item.id] || 0;
      return { ...prevItems, [item.id]: currentQuantity + 1 };
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {foodItems.map((item: any) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.foodImage} />
            <View style={styles.textContainer}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodPrice}>₹ {item.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddItem(item)}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.addedItemsContainer}>
        {Object.entries(addedItems).length > 0 && (
          <Text style={styles.addedItemsTitle}>Added Items:</Text>
        )}
        {Object.entries(addedItems).map(([id, quantity]) => {
          const item = foodItems.find((item: any) => item.id.toString() === id);
          return (
            item && (
              <View key={item.id} style={styles.addedItemCard}>
                <Text style={styles.addedItemName}>{item.name}</Text>
                <Text style={styles.addedItemQuantity}>
                  Quantity: {quantity}
                </Text>
                <Text style={styles.addedItemPrice}>
                  ₹ {(item.price * quantity).toFixed(2)}
                </Text>
              </View>
            )
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    elevation: 3, // Adds shadow for Android
    shadowColor: "#000", // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: "100%",
  },
  foodImage: {
    width: 160,
    height: 160,
    borderRadius: 8,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  foodName: {
    fontSize: 18,
    fontWeight: "600",
  },
  foodPrice: {
    fontSize: 16,
    color: "#666",
  },
  addButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  addedItemsContainer: {
    marginTop: 20,
  },
  addedItemsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addedItemCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  addedItemName: {
    fontSize: 16,
    fontWeight: "600",
  },
  addedItemQuantity: {
    fontSize: 14,
    color: "#666",
  },
  addedItemPrice: {
    fontSize: 14,
    color: "#666",
  },
});

export default FoodItemsScreen;
