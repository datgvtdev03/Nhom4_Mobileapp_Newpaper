import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "react-native-vector-icons";
import ProfileScreen from "../screens/Profiles/Profilescreen";
import HomeScreen from "../screens/Homes/HomeScreen";

const Tab = createBottomTabNavigator();

const TabbarUser = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#225254",
        tabBarInactiveTintColor: "gray",
        // Các tùy chọn khác...
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default TabbarUser;
