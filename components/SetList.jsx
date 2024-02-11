import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import { gql } from "graphql-request";
import { useQuery } from '@tanstack/react-query';
import client from './graphqlClient';

const setsQuery = gql`
query sets{
    sets{
        documents{
            _id
            exercise
            reps
            weight
        }
    }
}
`
const SetList = ({ListHeaderComponent}) => {

 const { data,isLoading,error} = useQuery({
        queryKey:['sets'],
        queryFn:async ()=> client.request(setsQuery)
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