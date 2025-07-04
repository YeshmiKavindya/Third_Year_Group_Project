import { View, Text,StatusBar } from 'react-native';
import Login from './screens/Login';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar 
        backgroundColor="orange"
        barStyle={"dark-content"}
        hidden={false}
      />

      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*


    
    <NavigationContainer>
      <StatusBar 
        backgroundColor="orange"
        barStyle={"dark-content"}
        hidden={false}
      />

      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Sign" 
          component={Sign}
          options={{ headerShown: true, title: 'Login' }} 
        />


      </Stack.Navigator>
    </NavigationContainer>

*/