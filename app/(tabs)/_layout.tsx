import { Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';


export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'coral' }} >
      <Tabs.Screen name="index" options={{
        title: "Home", tabBarIcon: ({ color, size }) =>
          <AntDesign name="home" size={size} color={color} />
      }} />
      <Tabs.Screen name="login" options={{ title: "Login" }} />
    </Tabs>
  )
}
