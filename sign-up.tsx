import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "./AuthContext"; // Adjust the path as necessary

const SignUp = () => {
  const router = useRouter();
  const { setUser } = useAuth(); // Access the setUser function from context
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState(""); // Ensure correct type
  const [age, setAge] = useState(""); // Ensure correct type
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateInputs = () => {
    if (!name || !email || !password || !confirmPassword || !contactNumber || !age || !address) {
      Alert.alert("Validation Error", "Please fill all fields.");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Validation Error", "Please enter a valid email.");
      return false;
    }
    if (password.length < 8) {
      Alert.alert("Validation Error", "Password must be at least 8 characters.");
      return false;
    }
    if (isNaN(Number(contactNumber)) || contactNumber.length < 10) {
      Alert.alert("Validation Error", "Please enter a valid contact number.");
      return false;
    }
    if (isNaN(Number(age)) || Number(age) <= 0) {
      Alert.alert("Validation Error", "Please enter a valid age.");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (validateInputs()) {
      const placeholderImageUri = "https://via.placeholder.com/150"; // Placeholder image URL
  
      try {
        const response = await fetch("http://localhost:5000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            image: placeholderImageUri,
          }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          Alert.alert("Sign Up Success", result.message);
          router.push("/set-up-page"); // Navigate to the next page
        } else {
          Alert.alert("Error", result.message);
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    }
  };
  return (
    <View style={styles.container}>
      <FontAwesome
        name="user-plus"
        size={80}
        color="#6366F1"
        style={styles.icon}
      />
      <Text style={styles.title}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        autoCapitalize="words"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        keyboardType="phone-pad"
        value={contactNumber}
        onChangeText={setContactNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        autoCapitalize="none"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F6FA",
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#6366F1", // Modern blue color
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#6366F1", // Soft blue border
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  button: {
    backgroundColor: "#6366F1", // Modern blue button background
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#6366F1",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  linkText: {
    color: "#6366F1", // Modern blue link text
    fontWeight: "600",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});

export default SignUp;
