
import {gql} from 'graphql-request';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useQuery } from "@tanstack/react-query";
import ExerciseList from "../components/ExerciseList";
import client from "../components/graphqlClient";

const exercisesQuery = gql`
query exercises($muscle: String, $name: String) {
  exercises(muscle: $muscle, name: $name) {
    equipment
    muscle
    name
  }
}
`

export default function App() {
  
  const {data, isLoading,error} = useQuery({
    queryKey:['exercises'],
    queryFn: async ()=> client.request(exercisesQuery)
 });
  
  if(isLoading) return <ActivityIndicator/>
  if(error) return <Text>Problem in fetching data</Text>


  return (
    <View style={styles.container}>
    <FlatList
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{gap:5}}
    data={data?.exercises}
    keyExtractor={(item,index) => item.name + index}
    renderItem={({item}) => (
    <ExerciseList item={item}/>
  )}
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
  
