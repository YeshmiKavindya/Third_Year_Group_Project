import { Text, View,Stylesheet ,ImageBackground} from "react-native";
import { Link } from "expo-router";


export default function Index() {
  return (
    <View style ={StyleSheet.container}>
      <ImageBackground source={require('../assets/images/loginimg.png')}
      style={styles.background}>
        <View style={styles.card}>
          <Text style={styles.title}>Sign Up</Text>
          <TextInput placeholder="Username" style={styles.input} />


        </View>
      </ImageBackground>
    </View>
  );
}



const styles = Stylesheet.create({
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

})