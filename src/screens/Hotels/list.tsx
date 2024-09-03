import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HotelCard from "../../components/HotelCard";
import { hotels } from "../../components/data/HotelList";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  HotelListScreen: undefined;
  FoodItemsScreen: {
    name: string;
    foodItems: { id: number; name: string; price: number }[];
  };
};

type HotelListScreenProp = StackNavigationProp<
  RootStackParamList,
  "HotelListScreen"
>;
const HotelListScreen = () => {
  const navigation = useNavigation<HotelListScreenProp>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {hotels.map((hotel, index) => (
        <HotelCard
          key={index}
          name={hotel.name}
          image={hotel.image}
          location={hotel.location}
          onPress={() =>
            navigation.navigate("FoodItemsScreen", {
              name: hotel.name,
              foodItems: hotel.foodItems,
            })
          }
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default HotelListScreen;
