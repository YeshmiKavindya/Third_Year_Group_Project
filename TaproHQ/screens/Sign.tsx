import { Text, View, StyleSheet,ImageBackground,TextInput} from "react-native";
import { Link } from "expo-router";
import Login from './Login';
import React from "react";
import { Picker } from '@react-native-picker/picker';



export default function Signup() {
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
    height: 55,
    width: 280,
    borderRadius: 14,
    borderWidth: 2,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
    picker:{
    marginBottom: 15,
    height: 55,
    width: 280,
    backgroundColor: "white",
    borderRadius:14,
    

  },

})