import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    })
  })
  return (
    <View style={styles.container}>
      <Text>SplashScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default SplashScreen
