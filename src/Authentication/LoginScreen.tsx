import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackIcon from "../../assets/svgIcons/BackIcon";
import EyeClosed from "../../assets/svgIcons/EyeClosed";
import EyeOpen from "../../assets/svgIcons/EyeOpen";
import Facebook from "../../assets/svgIcons/Facebook";
import Google from "../../assets/svgIcons/Google";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { LoginUser, RegisterUser } from "../Redux/Reducers/LginReducer";
import PrimaryButton from "../CustomComponents/PrimaryButton";
interface Props {
}
const LoginScreen: React.FC<Props> = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state.LOGIN_REDUCER);
  
  const validateInputs = () => {
    let emailError = "";
    let passwordError = "";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError = "Enter a valid email";
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      passwordError =
        "Password must contain 1 uppercase, 1 number, 1 special char, min 8 chars";
    }

    setErrors({ email: emailError, password: passwordError });
    if (!emailError && !passwordError) {
      handleLogin()
    }
  };
  const handleLogin = () => {
    const payload = {
      email: email,
      password: password
    }
    dispatch(LoginUser(payload))
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Welcome text */}
      <Text style={styles.welcomeText}>
        LOGIN
      </Text>
      <Text style={styles.subText}>
        If you don’t have an account{' '}
        <Text style={styles.signUp} onPress={() => console.log('Sign Up')}>
          Sign up here
        </Text>
      </Text>
      {/* Email */}
      <Text style={styles.label}>Email address</Text>
      <TextInput
        style={styles.input}
        placeholder="user@gmail.com"
        placeholderTextColor="#B0B0B0"
        value={email}
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

      {/* Forgot password */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password ?</Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <PrimaryButton title={"SIGN UP"} onPress={() => validateInputs()} />

      {/* Or */}
      <Text style={styles.orText}>Or</Text>

      {/* Facebook */}
      <TouchableOpacity style={styles.socialButton}>
        <Facebook width={"20"} height={"20"} style={{ paddingHorizontal: 10 }} />
        <Text style={styles.socialText}>Connect with Facebook</Text>
      </TouchableOpacity>

      {/* Google */}
      <TouchableOpacity style={styles.socialButton}>
        <Google width={"20"} height={"20"} style={{ paddingHorizontal: 10 }} />
        <Text style={styles.socialText}>Connect with Google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  welcomeText: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: "#E53935",
  },
  highlight: {
    color: "#E53935",
  },
  subText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#808080",
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  signUp: {
    color: "#007AFF",
    fontFamily: "Poppins-Medium",
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    marginTop: 20,
    marginBottom: 6,
    color: "#000000",
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 48,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 48,
  },
  passwordInput: {
    flex: 1,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  forgotPassword: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#007AFF",
    marginTop: 12,
    alignSelf: "flex-end",
  },
  signInButton: {
    backgroundColor: "#5B3415",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 24,
    alignItems: "center",
  },
  signInText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Poppins-Bold",
  },
  orText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#808080",
    textAlign: "center",
    marginVertical: 20,
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
  // socialIcon: {
  //   width: 20,
  //   height: 20,
  //   marginRight: 12,
  // },
  socialText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#000000",
  },
});
