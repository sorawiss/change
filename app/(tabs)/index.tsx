import { Text, View } from "react-native";
import { useAuth } from "../AuthContext";
import { Button } from "react-native-paper";
import { colors } from "../style-sheet";


export default function Index() {
  const { signOut } = useAuth();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
      }}
    >
      <Text>Home</Text>
      <Button onPress={signOut} icon="logout" >Sign Out</Button>
    </View>
  );
}
