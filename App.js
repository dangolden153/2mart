import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider } from "native-base";
import HomeScreen from "./Screens/HomeScreen";

// import CustomNavigation from "./Screens/CustomNavigation";
import CardDetailsScreen from "./Screens/CardDetailsScreen";
import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import ChatScreen from "./Screens/ChatScreen";
import MyTabs from "./Screens/CustomBottomNav";
import { auth } from "./config";
//  import CustomNavigation from "./Screens/CustomNavigation";

const Stack = createStackNavigator();

export default function App() {
  const [loggedin, setIsloggedIn] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        setIsloggedIn(true);
        console.warn("authenticated user", user);
      } else {
        console.warn("unauthenticated user!!!");
      }
    });
  }, [loggedin]);
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{ headerTitleAlign: "center" }}
        >
          {loggedin ? (
            <>
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignupScreen"
                component={SignupScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Tabs" component={MyTabs} />

              <Stack.Screen
                name="CardDetailsScreen"
                component={CardDetailsScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignupScreen"
                component={SignupScreen}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

// note : customNsvigation with a route name directory
//  has been changed from Navigator folder, so therefore the subsequent component
//  path must be redefine to aviod conflicts of paths
///// export default withNavigation(Dashboard); => checj what it means letter

/// need to install another asynStorage /

// install rn elements
// install Modal and uncomment out the modal in the chat bubble component
/// comfirm the CustomNavigation screen if it was the replacement for Tab screen before deleting
