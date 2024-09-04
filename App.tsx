import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import FoodItemsScreen from "./src/screens/FoodItems/list";
import HotelListScreen from "./src/screens/Hotels/list";
import CartScreen from "./src/screens/Cart/list";

type RootStackParamList = {
  HotelListScreen: undefined;
  FoodItemsScreen: {
    details: any;
  };
  cartScreen: {
    addedItems: {
      [key: number]: { details: any; quantity: number };
    };
  };
};

const Stack = createStackNavigator<RootStackParamList>();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HotelListScreen">
        <Stack.Screen
          name="HotelListScreen"
          component={HotelListScreen}
          options={{ title: "Hotels" }}
        />
        <Stack.Screen
          name="FoodItemsScreen"
          component={FoodItemsScreen}
          options={{ title: "Food Items" }}
        />
        <Stack.Screen
          name="cartScreen"
          component={CartScreen}
          options={{ title: "Cart" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
