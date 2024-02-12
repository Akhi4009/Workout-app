import {  Text, ActivityIndicator, FlatList } from 'react-native'
import {  gql } from "graphql-request";
import { useQuery } from '@tanstack/react-query';
import client from './graphqlClient';
import { useAuth } from '../providers/AuthContext';

const setsQuery = gql`
query MyQuery($exercise: String, $username: String!){
    sets(exercise: $exercise, username: $username) {
      documents {
        _id
        exercise
        reps
        weight
      }
    }
  }
`
const SetList = ({ListHeaderComponent, exerciseName}) => {
  const {username} = useAuth();

 const { data,isLoading,error} = useQuery({
        queryKey:['sets',exerciseName],
        queryFn:async ()=> client.request(setsQuery,{exercise: exerciseName, username:username})

    })

  if(isLoading) return <ActivityIndicator/>
  
   
  return (
    <FlatList
    showsVerticalScrollIndicator={false}
    ListHeaderComponent={ListHeaderComponent}
    data={data?.sets?.documents}
    renderItem={({item}) => (
        <Text style={{
            backgroundColor:'white',
            padding: 10,
            borderRadius: 5,
            overflow: 'hidden'
            }}>
        {item.reps} * {item.weight} {' '}
        </Text>
    )}
    />
  )
}



export default SetList