import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/SplashScreen'
import PostsScreen from '../screens/Posts/PostsScreen'
import PostScreen from '../screens/Posts/PostScreen'
import AddPostScreen from '../screens/Posts/AddPostScreen'

export type RootStackParams = {
  Posts: undefined
  Post: {
    postId: number
  }
  Splash: undefined
  Login: undefined
  AddPost: undefined
}

const Stack = createNativeStackNavigator<RootStackParams>()

const AppRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Posts"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Posts" component={PostsScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
        <Stack.Screen name="AddPost" component={AddPostScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppRouter
