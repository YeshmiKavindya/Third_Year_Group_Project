import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router"; // Import `router` from expo-router
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';

export default function Login() {
  const handleLogin = () => {
    // Redirect to Home page after login
    router.replace('/Home'); // Replace current screen with Home
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
      
      
      <TextInput
        style={styles.input}
        placeholder="Username"
      />
      
   
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry

      />
      
     
      <TouchableOpacity 
        style={styles.loginButton} 
        onPress={handleLogin} // Call handleLogin on press
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      
      <Text></Text>
      <Link href="/ForgotPassword" style={styles.link}>
        Forgot Password?
      </Link>
      
     
      <View style={styles.registerContainer}>
        <Text>Don't have an account?  <Link href="/Register" style={styles.link}>Register now</Link> </Text>
        
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  loginButton: {
    justifyContent: "center",
    backgroundColor: "gray",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    height: 55,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign:'center',
  },
  link: {
    color: "#D2B48C",
    fontWeight:'bold',
    textAlign:'center',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});