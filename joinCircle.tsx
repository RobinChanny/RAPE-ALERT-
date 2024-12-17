import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

const JoinPage = () => {
  const router = useRouter();
  const [code, setCode] = useState("");

  const validateCode = () => {
    if (!code || code.length < 6) {
      Alert.alert("Validation Error", "Please enter a valid code.");
      return false;
    }
    return true;
  };

  const handleJoin = () => {
    if (validateCode()) {
      Alert.alert("Success", "You have successfully joined!");
      // Navigate to another page after successful join
      router.push("/dashboard/(tabs)/home"); // Redirect to a dashboard or a different page
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Code to Join</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your code"
        autoCapitalize="none"
        value={code}
        onChangeText={setCode}
      />

      <TouchableOpacity style={styles.button} onPress={handleJoin}>
        <Text style={styles.buttonText}>Join</Text>
      </TouchableOpacity>

      <Text style={styles.infoText}>Make sure the code is at least 6 characters long.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F7", // Light grey background
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#5C6BC0", // Dark text color
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#6366F1", // Modern soft blue border
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#FFFFFF", // White background for input
    fontSize: 16,
    shadowColor: "#6366F1",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  button: {
    backgroundColor: "#6366F1", // Primary modern button color
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    shadowColor: "#6366F1",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF", // White text color
    fontWeight: "bold",
    fontSize: 16,
  },
  infoText: {
    color: "#7D7D7D", // Grey text for additional information
    fontSize: 14,
    marginTop: 10,
  },
});

export default JoinPage;
