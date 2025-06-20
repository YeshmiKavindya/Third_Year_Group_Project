import { Text, View, StyleSheet,ImageBackground,TextInput,TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import Login from './Login';
import React from "react";
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';



export default function Signup() {
  const navigation = useNavigation();
  return (
    <View style ={styles.container}>
      <ImageBackground source={require('../assets/loginimg.png')}
      style={styles.background}>
        <View style={styles.card}>
          <Text style={styles.title}>Sign Up</Text>
          <TextInput placeholder="Username" style={styles.input} />
          <TextInput placeholder="Email" style={styles.input} />
          
          <Picker style={styles.picker} >
            <Picker.Item label="Customer" value="customer" />
            <Picker.Item label="Store Owner" value="storeOwner" />
          </Picker>
                
          <TextInput placeholder="New -Password" style={styles.input} />
          <TextInput placeholder="Confirm-Password" style={styles.input} />
          <TouchableOpacity 
                  style={styles.loginButton} 
                  // onPress={handleLogin} // Call handleLogin on press
                >
                  <Text style={styles.loginButtonText}>Signup</Text>
          </TouchableOpacity>
          <View style={styles.line} />

        </View>

        
      </ImageBackground>
    </View>
  );
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:"row",
    justifyContent:"center",
  },
  background: {
    height:'auto',
    width:'auto',
    padding:40,
    justifyContent: 'center',
    alignItems: 'center',
  },
   card: {
    padding: 20,
    borderRadius: 14,
    justifyContent: "center",
  },
   title: {
    textAlign: "center",
    color:'white',
    fontSize: 30,
    padding: 10,
    fontWeight: "bold",
  },
   input: {
    marginBottom: 15,
    height: 50,
    width: 280,
    borderRadius: 14,
    borderWidth: 2,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
    picker:{
    marginBottom: 15,
    height: 50,
    width: 280,
    backgroundColor: "white",
    borderRadius:14,
    borderWidth: 2,
  },
   line: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginVertical: 10,
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

})