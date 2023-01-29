import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import CustomItem from '../../components/Posts/CustomItem'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../../router/AppRouter'

type Props = NativeStackScreenProps<RootStackParams, 'Posts'>

function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      return await response.json()
    },
  })
}

const PostsScreen = ({ navigation }: Props) => {
  const { data } = usePosts()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des postes</Text>

      <Button title="Ajouter" onPress={() => navigation.push('AddPost')} />

      <FlatList
        data={data}
        renderItem={({ item }) => <CustomItem post={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default PostsScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginVertical: 10,
  },
})
