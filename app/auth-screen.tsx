import { View, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput, Text, Button, useTheme } from 'react-native-paper'
import { styles }  from "./style-sheet";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "expo-router";


function AuthScreen() {
  // State
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const theme = useTheme();
  const { signIn, signUp } = useAuth();
  const router = useRouter();


  // Handlers
  function handleSignUp() {
    setIsSignUp((prev) => !prev)
  }

  // Submit Handler
  async function handleSubmit() {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (isSignUp) {
      const result = await signUp(email, password)
      if (result) {
        setError(result)
        return;
      }
    } else {
      const result = await signIn(email, password)
      if (result) {
        setError(result)
        return;
      }
    }

    router.replace("/");

  }



  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} >
      <View>
        <Text style={styles.title}>เข้าสู่ระบบ</Text>
      </View>

      <TextInput
        label="อีเมล"
        placeholder="อีเมล"
        autoCapitalize="none"
        keyboardType="email-address"
        mode="outlined"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        label="รหัสผ่าน"
        placeholder="รหัสผ่าน"
        autoCapitalize="none"
        secureTextEntry
        mode="outlined"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}

      <Button mode="contained" style={styles.input} onPress={handleSubmit} >{isSignUp ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}</Button>
      <Button style={styles.input} onPress={handleSignUp} >{isSignUp ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}</Button>



    </KeyboardAvoidingView>
  )
}
export default AuthScreen;