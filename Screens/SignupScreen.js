import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Item, Label, Input, Button, Icon } from "native-base";
import { db, auth } from "./../config";
import { MaterialIcons } from "@expo/vector-icons";

// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { StackActions, NavigationActions } from "react-navigation";

export default class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      number: "",
      email: "",
      pass: "",
      pass2: "",
      referral: "",
      loading: false,
    };
  }

  registerAccount = () => {
    const { name, number, email, pass, pass2, referral } = this.state;

    let refId = parseInt(Date.now() + Math.random()).toString();
    refId = refId.substring(refId.length - 5, refId.length - 1);
    refId = refId.trim();
    let nameWithoutSpace = name.replace(/\s/g, "");
    refId = nameWithoutSpace + refId;
    console.warn(refId);

    if (this.state.loading) {
      return;
    }

    let emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (name.length < 2) {
      Alert.alert("Error", "Please enter a valid name");
      return;
    } else if (number.length < 2) {
      Alert.alert("Error", "Please enter a valid number");
      return;
    } else if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    } else if (pass.length < 6 || pass2.length < 6) {
      Alert.alert("Error", "Password should be of minimum 6 character");
      return;
    } else if (pass !== pass2) {
      Alert.alert("Error", "The entered passwords don't match");
      return;
    }

    this.setState({
      loading: true,
    });

    auth
      .createUserWithEmailAndPassword(email, pass)
      .then((res) => {
        // res.user.sendEmailVerification();
        // console.log("res", res);
        // console.log("user uid", res.user.uid);
        this.props.navigation.navigate("Tabs");
        db.ref("users/" + res.user.uid)
          .update({
            //set
            referralid: refId.toLowerCase(),
            name: name,
            number: number,
            email: email,
          })
          .then(() => {
            //CHECK IF THIS USER WAS REFERRED BY SOMEONE
            if (referral) {
              //find user with referral code
              db.ref("referralCodes/" + referral.toLowerCase())
                .once("value")
                .then((snap) => {
                  if (snap.exists()) {
                    console.warn("ReferralExists");
                    var ref1 = db.ref("users/" + snap.val() + "/rewardTokens");
                    ref1.transaction(function (currentClicks) {
                      return (currentClicks || 0) + 10;
                    });

                    db.ref("users/" + res.user.uid).update({
                      //set
                      rewardTokens: 10,
                    });
                  }
                });
            }

            db.ref("referralCodes")
              .update({
                //set
                [refId.toLowerCase()]: res.user.uid,
              })
              .then(() => {
                Alert.alert(
                  "Account Created",
                  "Your account has been created succsessfully."
                );

                this.setState({
                  loading: false,
                });
                this.props.navigation.navigate("Tabs");

                // const resetAction = StackActions.reset({
                //   index: 0,
                //   actions: [
                //     NavigationActions.navigate({ routeName: "CustomNav" }),
                //   ],
                // });
                // this.props.navigation.dispatch(resetAction);
              })
              .catch((err) => {
                Alert.alert(
                  "Account Created",
                  "Your account has been created succsessfully."
                );
                // this.props.navigation.navigate("Tabs");

                // const resetAction = StackActions.reset({
                //   index: 0,
                //   actions: [
                //     NavigationActions.navigate({ routeName: "CustomNav" }),
                //   ],
                // });
                // this.props.navigation.dispatch(resetAction);
                this.setState({
                  loading: false,
                });
              });
          })
          .catch((err) => {
            console.log("sign up error", err);
            Alert.alert(
              "Error",
              "Failed to create a new account, please try again later."
            );
            this.setState({
              loading: false,
            });
          });
      })
      .catch((err) => {
        Alert.alert(err.message);
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    return (
      <ImageBackground
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "center",
          backgroundColor: "white",
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
          {/* <Text style={{ fontWeight: '100', fontSize: RFValue(25), paddingTop: RFValue(30) }}>Proceed with your</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: RFValue(32), paddingTop: RFValue(5) }}>SIGNUP</Text> */}
        </View>

        <KeyboardAvoidingView
          style={{
            paddingHorizontal: RFValue(20),
            paddingBottom: RFValue(35),
            marginTop: RFValue(30),
          }}
        >
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={(val) => {
                this.setState({ name: val });
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
              keyboardType="number-pad"
              style={styles.input}
              placeholder="Contact Number"
              onChangeText={(val) => {
                this.setState({ number: val });
              }}
            />
            <MaterialIcons
              color="black"
              name="smartphone"
              as={MaterialIcons}
              size={30}
            />
          </View>

          <View style={styles.inputBox}>
            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              placeholder="Referral Code"
              onChangeText={(val) => {
                this.setState({ referral: val });
              }}
            />
            <MaterialIcons
              color="black"
              name="fingerprint"
              as={MaterialIcons}
              size={30}
            />
          </View>

          <View style={styles.inputBox}>
            <TextInput
              keyboardType="email-address"
              style={styles.input}
              placeholder="Email Address"
              onChangeText={(val) => {
                this.setState({ email: val });
              }}
            />
            <MaterialIcons
              color="black"
              name="email"
              as={MaterialIcons}
              size={30}
            />
          </View>

          <View style={styles.inputBox}>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder="Password"
              onChangeText={(val) => {
                this.setState({ pass: val });
              }}
            />
            <MaterialIcons
              color="black"
              name="lock-open"
              as={MaterialIcons}
              size={30}
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder="Password"
              onChangeText={(val) => {
                this.setState({ pass2: val });
              }}
            />
            <MaterialIcons
              color="black"
              name="lock-open"
              as={MaterialIcons}
              size={30}
            />
          </View>

          <Button
            onPress={() => {
              this.registerAccount();
            }}
            style={{
              marginTop: RFValue(35),
              backgroundColor: "rgb(236,161,58)",
            }}
          >
            {this.state.loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={{ color: "white", fontWeight: "bold" }}>SIGNUP</Text>
            )}
          </Button>
          <Button
            variant="ghost"
            onPress={() => {
              this.props.navigation.navigate("LoginScreen");
            }}
          >
            <Text>Already have an account?</Text>
          </Button>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    // marginHorizontal:
  },
  input: {
    width: "90%",
    borderBottomWidth: 1,
    fontSize: 17,
  },
});
