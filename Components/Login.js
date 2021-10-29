// const LoginScreen = () => {
//   const [email, setEmail] = useState("");
//   const [pass, setPass] = useState("");
//   const [isDialogVisible, setIsDialogVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   // constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     email: "",
//   //     pass: "",
//   //     isDialogVisible: false,
//   //     loading: false,
//   //   };
//   // console.disableYellowBox = true;
//   // }

//   const loginUser = () => {
//     // useNavigation().navigate("")
//     if (!email || !pass) {
//       Alert.alert("Error", "Incorrect email or password, please try again.");
//       return;
//     }
//     if (loading) {
//       return;
//     }
//     setLoading(true);

//     auth
//       .signInWithEmailAndPassword(email, pass)
//       .then((res) => {
//         console.log(res);
//         // const resetAction = StackActions.reset({
//         //     index: 0,
//         //     actions: [NavigationActions.navigate({ routeName: 'CustomNav' })],
//         // });
//         // this.props.navigation.dispatch(resetAction);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         Alert.alert("Error", "Incorrect email or password, please try again.");
//         setLoading(false);
//       });
//   };

//   const showDialog = (status) => {
//     setIsDialogVisible(status);
//   };

//   const recoverPass = (input) => {
//     let emailRegex =
//       /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if (!emailRegex.test(input)) {
//       Alert.alert("Error", "Please enter a valid email");
//       return;
//     }
//     showDialog(false);

//     auth
//       .sendPasswordResetEmail(input)
//       .then(() => {
//         Alert.alert(
//           "Password Recovery",
//           "Password Recovery Email has been sent successfully."
//         );
//       })
//       .catch((err) => {
//         Alert.alert("Error", "There was an error recovering password");
//       });
//     console.warn(input);
//   };
//   // render() {
//   return (
//     <ImageBackground
//       style={{
//         width: "100%",
//         flex: 1,
//         justifyContent: "center",
//         backgroundColor: "white",
//         paddingBottom: RFValue(55),
//       }}
//       source={require("./../assets/bg.png")}
//       resizeMode="cover"
//     >
//       <View style={{ paddingHorizontal: RFValue(25), paddingTop: RFValue(65) }}>
//         <Image
//           source={require("./../assets/logo.png")}
//           style={{
//             width: "65%",
//             height: RFValue(45),
//             justifyContent: "flex-start",
//             alignItems: "flex-start",
//           }}
//           resizeMode="contain"
//         />
//         <Text
//           style={{
//             fontWeight: "100",
//             fontSize: RFValue(25),
//             paddingTop: RFValue(40),
//           }}
//         >
//           Proceed with your
//         </Text>
//         <Text
//           style={{
//             fontWeight: "bold",
//             fontSize: RFValue(32),
//             paddingTop: RFValue(5),
//           }}
//         >
//           LOGIN
//         </Text>
//       </View>

//       <View
//         style={{
//           paddingHorizontal: RFValue(20),
//           paddingBottom: RFValue(35),
//           marginTop: RFValue(55),
//         }}
//       >
//         <View>
//           {/* <Label>Email Address</Label> */}
//           <Input
//           // onChangeText={(val) => {
//           //   this.setState({ email: val });
//           // }}
//           />
//           <Icon name="person-outline" type="MaterialIcons" />
//         </View>
//         <View style={{ marginTop: RFValue(15) }}>
//           {/* <Label>Password</Label> */}
//           <Input
//             secureTextEntry={true}
//             // onChangeText={(val) => {
//             //   this.setState({ pass: val });
//             // }}
//           />
//           <Icon name="lock-open" type="MaterialIcons" />
//         </View>

//         <Button
//           block
//           style={{
//             marginTop: RFValue(45),
//             backgroundColor: "rgb(236,161,58)",
//           }}
//           onPress={() => {
//             loginUser();
//           }}
//         >
//           {loading ? (
//             <ActivityIndicator size="small" color="white" />
//           ) : (
//             <Text style={{ color: "white", fontWeight: "bold" }}>SIGNIN</Text>
//           )}
//         </Button>

//         <Button
//           block
//           transparent
//           onPress={() => {
//             showDialog(true);
//           }}
//         >
//           <Text style={{}}>Forgot Password?</Text>
//         </Button>

//         <Button
//           block
//           transparent
//           onPress={() => {
//             navigation.navigate("Signup");
//           }}
//         >
//           <Text style={{}}>Don't have an account?</Text>
//         </Button>
//       </View>

//       <DialogInput
//         isDialogVisible={isDialogVisible}
//         title={"Recover Password"}
//         message={"Please enter your email address"}
//         hintInput={""}
//         submitInput={(inputText) => {
//           recoverPass(inputText);
//           console.log("recoverpass");
//         }}
//         closeDialog={() => {
//           showDialog(false);
//         }}
//       ></DialogInput>
//     </ImageBackground>
//   );
// };

// export default LoginScreen;
