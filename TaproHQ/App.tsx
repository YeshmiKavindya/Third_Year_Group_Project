import { View, Text,StatusBar } from 'react-native';
import Login from './screens/Login';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from './screens/Sign';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar 
        backgroundColor="orange"
        barStyle={"dark-content"}
        hidden={false}
      />

      <Stack.Navigator initialRouteName="Sign">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Sign" 
          component={Signup} 
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