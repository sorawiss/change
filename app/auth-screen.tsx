import { View, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput, Text, Button, useTheme } from 'react-native-paper'
import styles from "./style-sheet";
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
        <Text style={styles.title}>AuthScreen</Text>
      </View>

      <TextInput
        label="Email"
        placeholder="Barev@gmail.com"
        autoCapitalize="none"
        keyboardType="email-address"
        mode="outlined"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        label="Password"
        placeholder="123456"
        autoCapitalize="none"
        secureTextEntry
        mode="outlined"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}

      <Button mode="contained" style={styles.input} onPress={handleSubmit} >{isSignUp ? "Sign up" : "Sign in"}</Button>
      <Button style={styles.input} onPress={handleSignUp} >{isSignUp ? "Sign in" : "Sign up"}</Button>



    </KeyboardAvoidingView>
  )
}
export default AuthScreen;