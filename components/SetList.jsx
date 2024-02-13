import { ActivityIndicator, FlatList } from 'react-native'
import {  gql } from "graphql-request";
import { useQuery } from '@tanstack/react-query';
import client from './graphqlClient';
import { useAuth } from '../providers/AuthContext';
import SetListItem from './SetListItem';
import ProgressGraph from "./ProgressGraph"
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
  
   const sets = data?.sets?.documents
  return (
    <FlatList
    showsVerticalScrollIndicator={false}
    data={sets}
    ListHeaderComponent={() => (
      <>
      <ListHeaderComponent/>
      <ProgressGraph sets={sets}/>
      </>
    )}
    renderItem={({item}) => (
      <SetListItem item={item} />
      )}
    />
  )
}
  
      



export default SetList