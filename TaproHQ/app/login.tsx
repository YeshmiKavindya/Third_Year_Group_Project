import { View ,StyleSheet,Text,TextInput} from "react-native";
export default function Login() {
  return (
    <View style={styles.container}>
        <View style={styles.card}>
            <Text style={styles.title}>Login</Text>
            <TextInput placeholder="Username" style={styles.input} />
            <TextInput placeholder="Password" style={styles.input} />

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
