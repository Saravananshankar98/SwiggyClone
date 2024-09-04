import { useRoute, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

interface ItemDetails {
  name: string;
  price: number;
  image: string;
}

interface CartItem {
  details: ItemDetails;
  quantity: number;
}

type CartItems = Record<number, CartItem>;

interface CartScreenProps {
  route: {
    params: {
      addedItems: CartItems;
    };
  };
}

const CartScreen = ({ route }: CartScreenProps) => {
  const { addedItems } = route.params;
  const [cartItems, setCartItems] = useState<CartItems>(addedItems);
  const navigation = useNavigation<any>();

  const handleRemoveItem = (itemId: number) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      if (updatedItems[itemId].quantity === 1) {
        delete updatedItems[itemId];
      } else {
        updatedItems[itemId].quantity -= 1;
      }
      return updatedItems;
    });
  };

  const handleAddItem = (itemId: number) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      if (updatedItems[itemId]) {
        updatedItems[itemId].quantity += 1;
      }
      return updatedItems;
    });
  };

  const handlePlaceOrder = () => {
    Alert.alert("Order Placed", "Your order has been placed successfully!", [
      {
        text: "OK",
        onPress: () => {
          navigation.navigate("HotelListScreen");
        },
      },
    ]);
  };

  const itemsArray = Object.entries(cartItems).map(
    ([id, { details, quantity }]) => ({
      id: Number(id),
      details,
      quantity,
    })
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {itemsArray.length > 0 ? (
        <>
          <FlatList
            data={itemsArray}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Image
                  source={{ uri: item.details.image }}
                  style={styles.itemImage}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.details.name}</Text>
                  <Text style={styles.itemPrice}>
                    ₹ {item.details.price.toFixed(2)}
                  </Text>
                  <Text style={styles.itemQuantity}>
                    Quantity: {item.quantity}
                  </Text>
                </View>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => handleRemoveItem(item.id)}
                  >
                    <Text style={styles.iconButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => handleAddItem(item.id)}
                  >
                    <Text style={styles.iconButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.placeOrderButton}
            onPress={handlePlaceOrder}
          >
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.emptyText}>No items in the cart</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
    color: "#666",
  },
  itemQuantity: {
    fontSize: 16,
    marginTop: 5,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 10,
  },
  placeOrderButton: {
    backgroundColor: "#28a745",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  placeOrderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CartScreen;
