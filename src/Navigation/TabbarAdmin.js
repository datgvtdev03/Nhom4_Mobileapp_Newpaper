import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "react-native-vector-icons";
import ProfileScreen from "../screens/Profiles/Profilescreen";
import AddNewsScreen from "../screens/News/AddNewsScreen";

import HomeScreen from "../screens/Homes/HomeScreen";

const Tab = createBottomTabNavigator();

const TabbarAdmin = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#225254",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "HomeTab",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddNews"
        component={AddNewsScreen}
        options={{
          tabBarLabel: 'Add',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add" color={color} size={size} />
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
export default TabbarAdmin;
