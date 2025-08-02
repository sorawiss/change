import { Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from "../style-sheet";



export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerShadowVisible: false,
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: colors.background,
      },
      tabBarStyle: {
        backgroundColor: colors.background,
        shadowOpacity: 0,
        borderTopWidth: 0,
      },
      tabBarActiveTintColor: colors.primary,
    }} >

      {/* Today */}
      <Tabs.Screen name="index" options={{
        title: "Today",
        tabBarIcon: ({ color, focused }) => {
          return focused ? <AntDesign name="heart" size={18} color={color} /> : <AntDesign name="hearto" size={18} color={color} />
        }
      }} />

      {/* Streak */}
      <Tabs.Screen name="streak"
        options={{
          title: "Streak",
          tabBarIcon: ({ color }) => {
            return <FontAwesome5 name="fire" size={18} color={color} />
          }

        }}
      />

      {/* Add */}
      <Tabs.Screen
        name="add"
        options={{
          title: "Add",
          tabBarIcon: ({ focused, color }) => {
            return focused ? <Ionicons name="add-circle" size={24} color={color} /> :
              <Ionicons name="add-circle-outline" size={24} color={color} />
          }
        }}
      />


    </Tabs>
  )
}
