import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerTitle: "TaproHQ" }} /> 
      <Stack.Screen name="index" options={{ headerTitle: "TaproHQ" }} />       
    </Stack>
  );
}