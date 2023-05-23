import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen/SplashScreen";
import LoginScreen from "../screens/Accounts/LoginScreen";
import SignupScreen from "../screens/Accounts/SignupScreen";
import ChangePasswordScreen from "../screens/Accounts/ChangePassword";
import TabbarAdmin from "./TabbarAdmin";
import TabbarUser from './TabbarUser';
import HomeScreen from "../screens/Homes/HomeScreen";
import DetailNewsScreen from "../screens/News/DetailNewsScreen";


const Stack = createNativeStackNavigator();


const ManagerScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}}/>
        <Stack.Screen name="ChangePW" component={ChangePasswordScreen} options={{headerShown: false}}/>
        <Stack.Screen name="DetailNews" component={DetailNewsScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="TabbarAdmin" component={TabbarAdmin} options={{ headerShown: false }}/>
        <Stack.Screen name="TabbarUser" component={TabbarUser} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default ManagerScreen;