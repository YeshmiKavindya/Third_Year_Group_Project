import { Text, View,Stylesheet ,ImageBackground} from "react-native";
import { Link } from "expo-router";


export default function Index() {
  return (
    <View style ={StyleSheet.container}>
      <ImageBackground source={require('../assets/images/loginimg.png')}
      style={styles.background}>
        <View style={styles.card}>

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

})