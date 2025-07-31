import { View, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput, Text, Button, useTheme } from 'react-native-paper'
import styles from "./style-sheet";
import { useState } from "react";


function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const theme = useTheme();


  function handleSignUp() {
    setIsSignUp((prev) => !prev)
  }


  function handleSubmit() {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");

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
        keyboardType="visible-password"
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