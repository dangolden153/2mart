import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  Alert,
  ActivityIndicator,
  TextInput,
  StyleSheet,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Item, List, Center, Input, Button, Icon } from "native-base";
import { auth, firebase } from "./../config";
import DialogInput from "react-native-dialog-input";
import { StackActions, NavigationActions } from "react-navigation";
import { MaterialIcons } from "@expo/vector-icons";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      isDialogVisible: false,
      loading: false,
    };
    console.disableYellowBox = true;
  }

  loginUser = () => {
    const { email, pass } = this.state;
    if (!email || !pass) {
      Alert.alert("Error", "Incorrect email or password, please try again.");
      return;
    }
    if (this.state.loading) {
      return;
    }
    this.setState({
      loading: true,
    });
    //

    auth
      .signInWithEmailAndPassword(email, pass)
      .then((res) => {
        console.log(res);
        this.props.navigation.navigate("Tabs");
        this.setState({
          loading: false,
        });
        // const resetAction = StackActions.reset({
        //   index: 0,
        //   actions: [NavigationActions.navigate({ routeName: "CustomNav" })],
        // });
        // this.props.navigation.dispatch(resetAction);
      })
      .catch((err) => {
        console.log("login error", err);
        Alert.alert(err.message);
        this.setState({
          loading: false,
        });
      });
  };

  showDialog = (status) => {
    this.setState({
      isDialogVisible: status,
    });
  };

  recoverPass = (input) => {
    let emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(input)) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    }
    this.showDialog(false);

    auth
      .sendPasswordResetEmail(input)
      .then(() => {
        Alert.alert(
          "Password Recovery",
          "Password Recovery Email has been sent successfully."
        );
      })
      .catch((err) => {
        Alert.alert("Error", "There was an error recovering password");
      });
    console.warn(input);
  };
  render() {
    return (
      <ImageBackground
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "center",
          backgroundColor: "white",
          paddingBottom: RFValue(55),
        }}
        source={require("./../assets/bg.png")}
        resizeMode="cover"
      >
        <View
          style={{ paddingHorizontal: RFValue(25), paddingTop: RFValue(65) }}
        >
          <Image
            source={require("./../assets/logo.png")}
            style={{
              width: "65%",
              height: RFValue(45),
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
            resizeMode="contain"
          />
          <Text
            style={{
              fontWeight: "100",
              fontSize: RFValue(25),
              paddingTop: RFValue(40),
            }}
          >
            Proceed with your
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: RFValue(32),
              paddingTop: RFValue(5),
            }}
          >
            LOGIN
          </Text>
        </View>

        <View
          style={{
            paddingHorizontal: RFValue(20),
            paddingBottom: RFValue(35),
            marginTop: RFValue(55),
          }}
        >
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              onChangeText={(val) => {
                this.setState({ email: val });
              }}
            />
            <MaterialIcons
              color="black"
              name="person-outline"
              as={MaterialIcons}
              size={30}
            />
          </View>

          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(val) => {
                this.setState({ pass: val });
              }}
            />
            <MaterialIcons name="lock-open" color="black" size={30} />
          </View>

          <Button
            block
            style={{
              marginTop: RFValue(45),
              backgroundColor: "rgb(236,161,58)",
            }}
            onPress={() => {
              this.loginUser();
            }}
          >
            {this.state.loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={{ color: "white", fontWeight: "bold" }}>SIGNIN</Text>
            )}
          </Button>
        </View>

        <Button
          variant="ghost"
          onPress={() => {
            this.showDialog(true);
          }}
        >
          <Text style={{}}>Forgot Password?</Text>
        </Button>

        <Button
          variant="ghost"
          onPress={() => {
            this.props.navigation.navigate("SignupScreen");
          }}
        >
          <Text style={{}}>Don't have an account?</Text>
        </Button>
        <DialogInput
          isDialogVisible={this.state.isDialogVisible}
          title={"Recover Password"}
          message={"Please enter your email address"}
          hintInput={""}
          submitInput={(inputText) => {
            this.recoverPass(inputText);
          }}
          closeDialog={() => {
            this.showDialog(false);
          }}
        ></DialogInput>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  input: {
    width: "90%",
    borderBottomWidth: 1,
    fontSize: 17,
  },
});
