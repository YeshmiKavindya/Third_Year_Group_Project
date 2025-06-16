import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router"; // Import `router` from expo-router
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Login() {
  const handleLogin = () => {
    // Redirect to Home page after login
    router.replace('/Home'); // Replace current screen with Home
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
      
      {/* Username Field */}
      <TextInput
        style={styles.input}
        placeholder="Username"
      />
      
      {/* Password Field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />
      
      {/* Login Button */}
      <TouchableOpacity 
        style={styles.loginButton} 
        onPress={handleLogin} // Call handleLogin on press
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      
      {/* Forgot Password Link */}
      <Link href="/ForgotPassword" style={styles.link}>
        Forgot Password?
      </Link>
      
      {/* Register Link */}
      <View style={styles.registerContainer}>
        <Text>Don't have an account? </Text>
        <Link href="/Register" style={styles.link}>
          Register now
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  link: {
    color: '#3498db',
    marginTop: 15,
    textAlign: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});