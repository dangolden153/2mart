import React, { useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import { useNavigation } from "@react-navigation/native";
import pics from "../assets/logo.png";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

import ProfileScreen from "./ProfileScreen";
import Dashboard from "./Dashboard";
import ChatMain from "./ChatMain";
import TransactionScreen from "./TransactionScreen";

const Tab = createBottomTabNavigator();

function MyTabs() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Image
          source={pics}
          style={{ height: 130, width: 130, resizeMode: "contain" }}
        />
      ),
    });
  }, [navigation]);

  return (
    //
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
      }}
      screenOptions={{
        tabBarStyle: {
          // position: "absolute",
          // bottom: 25,
          // right: 20,
          // left: 20,
          // elevation: 0,
          // borderRadius: 15,
          // height: 90,
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 30,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused ? styles.transactionIcon_textfocused : styles.icon_text
              }
            >
              <MaterialIcons
                name="dashboard"
                size={20}
                style={focused ? styles.iconFocused : styles.icon}
              />
              {focused && (
                <Text style={focused ? styles.textFocused : styles.text}>
                  Dashboard
                </Text>
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="ChatMain"
        component={ChatMain}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.icon_textfocused : styles.icon_text}>
              <FontAwesome
                name="comments"
                size={20}
                style={focused ? styles.iconFocused : styles.icon}
              />
              {focused && (
                <Text style={focused ? styles.textFocused : styles.text}>
                  Chat
                </Text>
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.icon_textfocused : styles.icon_text}>
              <FontAwesome
                name="user"
                size={20}
                style={focused ? styles.iconFocused : styles.icon}
              />
              {focused && (
                <Text style={focused ? styles.textFocused : styles.text}>
                  Profile
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={TransactionScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused ? styles.transactionIcon_textfocused : styles.icon_text
              }
            >
              <Ionicons
                name="cash"
                size={20}
                style={focused ? styles.iconFocused : styles.icon}
              />
              {focused && (
                <Text style={focused ? styles.textFocused : styles.text}>
                  Transactions
                </Text>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;

const styles = StyleSheet.create({
  icon_text: {
    marginHorizontal: 10,
  },
  icon_textfocused: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "pink",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  transactionIcon_textfocused: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "pink",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    width: 130,
  },
  iconFocused: { color: "#F4511E" },
  icon: { color: "black" },
  textFocused: { color: "#F4511E", marginLeft: 5 },
  text: { fontSize: 16 },
});
