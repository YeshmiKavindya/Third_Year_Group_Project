import { View, StyleSheet, Text, TextInput, TouchableOpacity,ImageBackground,Alert } from "react-native";
import { Link, router } from "expo-router"; 
import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { openURL } from "expo-linking";
import { useNavigation } from '@react-navigation/native';
import Signup from "./SignupScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl, API_CONFIG } from '../constants/api';

export default function Login() {

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('authorization');
      if(token){
        navigation.replace('Home');
      }
    }
    checkAuth();
      }, []);


  const navigation = useNavigation() as any;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    console.log("Email:",email,"password:",password);

    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.LOGIN), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        await AsyncStorage.setItem("authorization", data.token);
        console.log("token:",data.token);
        await AsyncStorage.setItem("x-user-email", email);
        console.log("user_type:",data.user.user_type);
        await AsyncStorage.setItem("x-user-type", data.user.user_type);
        await AsyncStorage.setItem("x-username", data.user.user_name);
        Alert.alert('Success', 'Login successful!');
        navigation.replace('Home'); // Navigate to Home screen
      } else {
        // Login failed
        Alert.alert('Error', data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Network error. Please check your connection and try again.');
    }
  };

  

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/loginimg.png')} style={styles.backGround} resizeMode="cover">
      <View style={styles.card}>
      <Text style={styles.headerText}>Login</Text>
      
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={email}
        onChangeText={setEmail}
        keyboardType="emall-address"
        autoCapitalize="none"
      />
      
   
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
         value={password}
        onChangeText={setPassword}
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
        <Text style={styles.text}>Don't have an account? 
        <Text style={styles.link} 
         onPress={() => navigation.navigate('Sign')}
        >{' '}Register now</Text> </Text>
      </View>

      <View style={styles.line} />
             <View style={{flexDirection: "row", gap:30,justifyContent:'center'}}>
                  <TouchableOpacity onPress={()=>openURL('https://www.facebook.com')}>
                      <FontAwesome name="facebook" size={30} color={'white'}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>openURL('https://www.instagram.com')}>
                      <FontAwesome name="instagram" size={30} color={'white'} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>openURL('https://www.google.com')}>
                      <FontAwesome name="google" size={30} color={'white'}/>
                  </TouchableOpacity>
                  <TouchableOpacity>
                      <FontAwesome name="phone" size={30} color={'white'} />
                  </TouchableOpacity>
              </View>


      </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: "row",
  },
  card: {
    padding: 20,
    borderRadius: 14,
    justifyContent: "center",
  },
  headerText: {
    color:'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
    height: 55,
    borderRadius: 14,
    borderWidth: 2,
    paddingHorizontal: 10,
    backgroundColor: "white",
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
  backGround:{
    height:'auto',
    width:'auto',
    padding:40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: "center",
    padding: 10,
    color:"white",
    fontWeight:'bold',
  },
   line: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
