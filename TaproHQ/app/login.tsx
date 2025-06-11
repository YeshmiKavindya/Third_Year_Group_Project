import { ImageBackground } from "expo-image";
import { View ,StyleSheet,Text,TextInput,TouchableOpacity} from "react-native";
import { Link } from "expo-router";
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
