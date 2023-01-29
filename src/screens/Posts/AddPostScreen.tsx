import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../../router/AppRouter'

import { useMutation } from '@tanstack/react-query'
import { Post } from '../../components/Posts/CustomItem'

type Props = NativeStackScreenProps<RootStackParams, 'AddPost'>

const AddPostScreen = ({ navigation }: Props) => {
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')

  const mutation = useMutation({
    mutationFn: async (post: {
      userId: number
      title: string
      body: string
    }) => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      return await res.json()
    },
    onSuccess: async (post: Post) => {
      navigation.push('Post', { postId: post.id })
    },
  })

  const handleSubmit = async () => {
    mutation.mutate({ title, body, userId: 1 })
  }

  return (
    <View style={styles.container}>
      <Text>AddPostScreen</Text>

      <Text>Title</Text>
      <TextInput style={styles.input} onChangeText={setTitle} value={title} />
      <Text>Body</Text>
      <TextInput style={styles.input} onChangeText={setBody} value={body} />
      <Button title="Ajouter" onPress={handleSubmit} />
    </View>
  )
}

export default AddPostScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
