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
  const { details } = route.params;
  const [addedItems, setAddedItems] = useState<{ [key: number]: number }>({});

  const handleAddItem = (item: { id: number; name: string; price: number }) => {
    setAddedItems((prevItems) => {
      const currentQuantity = prevItems[item.id] || 0;
      return { ...prevItems, [item.id]: currentQuantity + 1 };
    });
  };

  const handleRemoveItem = (item: { id: number }) => {
    setAddedItems((prevItems) => {
      const currentQuantity = prevItems[item.id];
      if (currentQuantity === 1) {
        const newItems = { ...prevItems };
        delete newItems[item.id];
        return newItems;
      }
      return { ...prevItems, [item.id]: currentQuantity - 1 };
    });
  };

  const totalQuantity = Object.values(addedItems).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{details.name}</Text>
      <Text style={styles.location}>{details.location}</Text>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {details.foodItems.map((item: any) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.foodImage} />
            <View style={styles.textContainer}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodPrice}>₹ {item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.buttonContainer}>
              {addedItems[item.id] ? (
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => handleRemoveItem(item)}
                  >
                    <Text style={styles.iconButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{addedItems[item.id]}</Text>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => handleAddItem(item)}
                  >
                    <Text style={styles.iconButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.singleButton}
                  onPress={() => handleAddItem(item)}
                >
                  <Text style={styles.singleButtonText}>Add</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.addedItemsContainer}>
        {totalQuantity > 0 && (
          <TouchableOpacity
            style={styles.totalContainer}
            onPress={() => console.log("card navigate", addedItems)}
          >
            <Text style={styles.totalText}>
              {totalQuantity} items added to cart
            </Text>
          </TouchableOpacity>
        )}
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
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  singleButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  singleButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  iconButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  iconButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    color: "#fff",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 10,
  },
  addedItemsContainer: {
    marginTop: 20,
  },
  totalContainer: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  location: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default FoodItemsScreen;
