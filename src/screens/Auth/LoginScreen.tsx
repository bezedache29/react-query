import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    if (email.trim() !== '' && password.trim() !== '') {
      // Fetch API
    }
  }

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput style={styles.input} onChangeText={setEmail} value={email} />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button onPress={handleSubmit} title="Connexion" color="#841584" />
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})
