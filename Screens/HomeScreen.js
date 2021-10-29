import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [state, setState] = useState(false);
  const navigation = useNavigation();

  const toggleState = () => setState(!state);

  return (
    <View style={{ flex: 1 }}>
      <Text style={state ? styles.focusedText : styles.text}>
        this is the home screen!!!!!! screen
      </Text>
      <Button title="login" onPress={toggleState} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  focusedText: {
    color: "red",
    marginTop: 40,
  },
  text: {
    color: "black",
  },
});
