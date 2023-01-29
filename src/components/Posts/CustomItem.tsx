import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '../../router/AppRouter'

export type Post = {
  userId: number
  id: number
  title: string
  body: string
}

type ItemProps = {
  post: Post
}

const CustomItem = ({ post }: ItemProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()

  const goToDetailsPost = (postId: number) => {
    navigation.push('Post', { postId })
  }

  return (
    <TouchableOpacity onPress={() => goToDetailsPost(post.id)}>
      <Text style={styles.text}>{post.title}</Text>
    </TouchableOpacity>
  )
}

export default CustomItem

const styles = StyleSheet.create({
  text: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 10,
  },
})
