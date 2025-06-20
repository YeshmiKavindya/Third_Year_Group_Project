import { View, StyleSheet, Text, TextInput, TouchableOpacity,ImageBackground } from "react-native";
import { Link, router } from "expo-router"; 
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { openURL } from "expo-linking";
import { useNavigation } from '@react-navigation/native';
import Signup from "./Sign";


export default function Login() {
  const handleLogin = () => {
    // Redirect to Home page after login
    router.replace('/Sign'); // Replace current screen with Home
  };
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/loginimg.png')} style={styles.backGround} resizeMode="cover">
      <View style={styles.card}>
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