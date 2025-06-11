import { ImageBackground } from "expo-image";
import { View ,StyleSheet,Text,TextInput,TouchableOpacity} from "react-native";
import { Link } from "expo-router";
import Icon from 'react-native-vector-icons/FontAwesome';
import { openURL } from "expo-linking";

export default function Login() {
  return (
    <View style={styles.container}>
    <ImageBackground source={require('../assets/images/loginimg.png')}
    style={styles.background}>
        <View style={styles.card}>
            <Text style={styles.title}>Login</Text>
            <TextInput placeholder="Username" style={styles.input} />
            <TextInput placeholder="Password" style={styles.input} />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity>
          <Text style={styles.text}>
            Forgot Password?
          </Text>
          </TouchableOpacity>
          <Text style={styles.text}>
          Don't have an account?{" "}
          <Link href={"/signup"} style={styles.link}>
            register now
          </Link>
        </Text>
        <View style={styles.line} />
        <View style={{flexDirection: "row", gap:30,justifyContent:'center'}}>
            <TouchableOpacity onPress={()=>openURL('https://www.facebook.com')}>
                <Icon name="facebook" size={30} color={'white'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>openURL('https://www.instagram.com')}>
                <Icon name="instagram" size={30} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>openURL('https://www.google.com')}>
                <Icon name="google" size={30} color={'white'}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon name="phone" size={30} color={'white'} />
            </TouchableOpacity>
        </View>
        
      

        </View>
        </ImageBackground>
    
    </View>
  )


}

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    },

    card: {
    padding: 20,
    borderRadius: 14,
    justifyContent: "center",
  },
   title: {
    textAlign: "center",
    fontSize: 30,
    color:'white',
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
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    justifyContent: "center",
    backgroundColor: "gray",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    height: 55,
  },
  text: {
    textAlign: "center",
    padding: 10,
    color:'white',
    fontWeight:'bold',
    
  },
  background: {
    height:'auto',
    width:'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link:{
    color: "#D2B48C",
    fontWeight:'bold',

  },
  line: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  
})
