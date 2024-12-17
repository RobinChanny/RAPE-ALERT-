import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("rapealert@gmail.com");
  const [password, setPassword] = useState("12345678");

  const validateInputs = () => {
    if (!email) {
      Alert.alert("Validation Error", "Please enter your email.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Validation Error", "Please enter a valid email.");
      return false;
    }
    if (!password) {
      Alert.alert("Validation Error", "Please enter your password.");
      return false;
    }
    if (password.length < 8) {
      Alert.alert(
        "Validation Error",
        "Password must be at least 8 characters long."
      );
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    if (validateInputs()) {
      if (email !== "rapealert@gmail.com" || password !== "12345678") {
        Alert.alert("Login Failed", "Incorrect email or password. Please try again.");
        return;
      }
      Alert.alert("Login Success", "You have logged in successfully.");
      // Proceed with actual authentication
      router.push("/dashboard/(tabs)/home");
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <FontAwesome name="user-circle" size={80} color="#FFFFFF" style={styles.icon} />
        <Text style={styles.title}>RAPE ALERT</Text>

        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={24} color="#6366F1" style={styles.iconInput} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#B0BEC5"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={24} color="#6366F1" style={styles.iconInput} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#B0BEC5"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={() => router.push("/forgot-password")}>
            <Text style={styles.link}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/sign-up")}>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#C5CAE9",
  },
  container: {
    padding: 25,
    borderRadius: 15,
    backgroundColor: "#6366F1",
    marginHorizontal: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  icon: {
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#FFFFFF",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#6366F1",
    borderRadius: 10,
    backgroundColor: "#E8EAF6",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  iconInput: {
    marginRight: 8,
    color: "#6366F1",
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#6366F1",
  },
  button: {
    backgroundColor: "#6366F1",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  link: {
    color: "#FFFFFF",
    marginVertical: 5,
    textDecorationLine: "underline",
  },
});

export default LoginPage;
