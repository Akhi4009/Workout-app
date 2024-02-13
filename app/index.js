
import {gql} from 'graphql-request';
import { useState } from 'react';
import {useDebounce} from "@uidotdev/usehooks";
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator,FlatList, StyleSheet, Text, View } from 'react-native';
import { useInfiniteQuery, } from "@tanstack/react-query";
import ExerciseList from "../components/ExerciseList";
import client from "../components/graphqlClient";
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../providers/AuthContext';

const exercisesQuery = gql`
query exercises($muscle: String, $name: String, $offset: Int) {
  exercises(muscle: $muscle, name: $name, offset: $offset) {
    equipment
    muscle
    name
  }
}
`

export default function App() {
  const {username} = useAuth()
  const [search,setSearch] = useState('');
  const debouncedSearchTerm = useDebounce(search, 1000);
  
  const {data, isLoading,error,fetchNextPage, isFetchingNextPage} = useInfiniteQuery({
    queryKey:['exercises', debouncedSearchTerm],
    queryFn: async ({pageParam})=> client.request(exercisesQuery, { offset:pageParam ,name:debouncedSearchTerm}),
    initialPageParam: 0,
    getNextPageParam:(lastPage, pages) => pages.length * 10,
 });
  
 // fetching next page
 function loadMore(){
  if(isFetchingNextPage) return;

  fetchNextPage();
 }

  if(isLoading) return <ActivityIndicator/>
 
  if(error) return <Text>Problem in fetching data</Text>
  
  if(!username) return <Redirect href={'/auth'}/>;

  const exercises = data?.pages.flatMap((page) => page.exercises);
 
  if(exercises.length === 0) return <Text> No exercise found for this.</Text>
 
  return (
    <View style={styles.container}>
    <Stack.Screen
      options={{
      headerSearchBarOptions: {
        placeholder: 'Search...',
        onChangeText: (event) => setSearch(event.nativeEvent.text),
      },
    }}
    />
    <FlatList
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{gap:5}}
    data={exercises}
    keyExtractor={(item,index) => item.name + index}
    renderItem={({item}) => (
    <ExerciseList item={item}/>
  )}
    
    onEndReachedThreshold={1}
    onEndReached={loadMore}
    />
    <StatusBar style='auto'/>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  }
});
  
