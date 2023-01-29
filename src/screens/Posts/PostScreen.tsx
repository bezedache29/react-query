import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../../router/AppRouter'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Post } from '../../components/Posts/CustomItem'

type Props = NativeStackScreenProps<RootStackParams, 'Post'>

function usePost(postId: number) {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
      )
      return await res.json()
    },
    enabled: !!postId,
  })
}

const PostScreen = ({ route }: Props) => {
  const queryClient = useQueryClient()
  const { postId } = route.params
  const { data } = usePost(postId)

  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')

  useEffect(() => {
    if (data) {
      setTitle(data.title)
      setBody(data.body)
    }
  }, [data])

  const mutation = useMutation({
    mutationFn: async (post: Post) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${post.id}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            id: post.id,
            title: post.title,
            body: post.body,
            userId: post.userId,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )

      return await response.json()
    },
    onSuccess: async (post: Post) => {
      queryClient.invalidateQueries({ queryKey: ['post', post.id] })
      setShowEdit(false)
    },
  })

  const handleSubmit = async () => {
    mutation.mutate({
      id: data.id,
      title,
      body,
      userId: data.userId,
    })
  }

  return (
    <View style={styles.container}>
      {showEdit ? (
        <>
          <Text>Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={setTitle}
            value={title}
          />
          <Text>Body</Text>
          <TextInput style={styles.input} onChangeText={setBody} value={body} />
          <Button title="Valider" onPress={handleSubmit} />
        </>
      ) : (
        <>
          <Text>{title}</Text>
          <Button title="Modifier" onPress={() => setShowEdit(true)} />
        </>
      )}
    </View>
  )
}

export default PostScreen

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
