import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Regular from "../CustomComponents/Regular";
import Bold from "../CustomComponents/Bold";
import Facebook from "../../assets/svgIcons/Facebook";
import Google from "../../assets/svgIcons/Google";
import PrimaryButton from "../CustomComponents/PrimaryButton";
import { RegisterUser } from "../Redux/Reducers/LginReducer";
import EyeOpen from "../../assets/svgIcons/EyeOpen";
import EyeClosed from "../../assets/svgIcons/EyeClosed";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
interface Props {

}
const RegisterScreen: React.FC<Props> = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({name:"", email: "", password: "" });
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state.LOGIN_REDUCER);

  const validateInputs = () => {
    // let nameError = "";
    // let emailError = "";
    // let passwordError = "";
    // const nameRegex = /^[A-Za-z]{4,}$/;
    // // Name validation
    // if (nameRegex.test(name)) {
    //   nameError = "Name must be at least 4 letters, no spaces or special chars";
    // }
    // // Email validation
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   emailError = "Enter a valid email";
    // }

    // // Password validation
    // const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    // if (!passwordRegex.test(password)) {
    //   passwordError =
    //     "Password must contain 1 uppercase, 1 number, 1 special char, min 8 chars";
    // }

    //   setErrors({ name: nameError, email: emailError, password: passwordError });
    // if (!emailError && !passwordError) {
    //   handleRegister()
    // }
  };
  const handleRegister = () => {
    const payload = {
      name: "John Doe",
      email: email,
      password: password
    }
    dispatch(RegisterUser(payload))
  }
  console.log(errors,"errors");
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <Bold style={styles.title}>Let’s </Bold>
        <Bold style={[styles.title, styles.highlight]}>Sign you up,</Bold>
      </View>


      {/* Full Name */}
      <Regular style={styles.label}>Full name</Regular>
      <TextInput
        placeholder="Septa"
        style={styles.input}
        placeholderTextColor="#999"
        onChangeText={setName}
      />

      {/* Email */}
      <Text style={styles.label}>Email address</Text>
      <TextInput
        placeholder="septa.git@gmail.com"
        style={styles.input}
        placeholderTextColor="#999"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="***************"
          placeholderTextColor="#B0B0B0"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          {
            passwordVisible ?
              <EyeOpen width={'20'} height={'20'} />
              :
              <EyeClosed width={'20'} height={'20'} />
          }
        </TouchableOpacity>
      </View>

      {/* Sign In Button */}
      <PrimaryButton title={"SIGN UP"} onPress={() => validateInputs()} />

      {/* Terms */}
      <Text style={styles.termsText}>
        By signing up, you have agreed to our{" "}
        <Text style={styles.link}>Terms and conditions</Text> &
        <Text style={styles.link}> Privacy policy</Text>
      </Text>

      {/* Divider */}
      <Regular style={styles.orText}>Or connect with</Regular>

      {/* Social Buttons */}
      <TouchableOpacity style={styles.socialButton}>
        <Facebook width={"20"} height={"20"} style={{ paddingHorizontal: 10 }} />
        <Text style={styles.socialText}>Connect with Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Google width={"20"} height={"20"} style={{ paddingHorizontal: 10 }} />
        <Text style={styles.socialText}>Connect with Google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: "#000", // black by default
  },
  highlight: {
    color: "#E53935",
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: "#333",
    fontFamily: "Poppins-Medium"
  },
  input: {
    fontFamily: "Poppins-Medium",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 14,
    backgroundColor: "#F7F7F7",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 20
  },
  passwordInput: {
    flex: 1,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  eyeIcon: {
    paddingHorizontal: 12,
  },
  signInButton: {
    backgroundColor: "#3B1E0A", // dark brown like in design
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  signInText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-Bold"
  },
  termsText: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
    marginTop: 16,
    lineHeight: 18,
    fontFamily: "Poppins-Light"
  },
  link: {
    color: "#007AFF",
  },
  orText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 13,
    color: "#666",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  socialText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
});