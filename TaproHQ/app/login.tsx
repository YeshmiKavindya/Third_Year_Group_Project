import { View ,StyleSheet,Text} from "react-native";
export default function Login() {
  return (
    <View style={styles.container}>
        <View style={styles.card}>
            <Text style={styles.title}>Login</Text>

        </View>
    
    </View>
  )


}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange",
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
})
