import { ActivityIndicator,StyleSheet, Text, View } from "react-native"
import { useLocalSearchParams, Stack } from "expo-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import client from "../components/graphqlClient";
import NewSetInput from "../components/NewSetInput";
import SetList from "../components/SetList";
import ProgressGraph from "../components/ProgressGraph";
const exerciseQuery = gql`
query exercises( $name: String) {
exercises( name: $name) {
  equipment
  muscle
  name
  instructions
}
}
`


function exerciseDetails() {
  const {name} = useLocalSearchParams();
  const [isExpanded,setIsExpanded] = useState(false);


 const {data, isLoading, error} = useQuery({
    queryKey:['exercises', name],
    queryFn:async () => client.request(exerciseQuery, {name})
  })


  if(isLoading) return <ActivityIndicator/>;
  if(error) return <Text>Failed to load to data</Text>;

  const exercise = data?.exercises[0];
  
  return (
    <View style={styles.container}>
    <Stack.Screen options={{title: exercise.name}}/>
    
    <SetList 
     exerciseName={exercise.name}
     ListHeaderComponent={()=>(
      <View style={{gap:5}}>
      <View style={styles.panel}>
      <Text>
      exercise Details: {name}
      </Text>
      <Text style={styles.exerciseSubTitle}>
      {exercise.muscle} {' '} {exercise.equipment}</Text>
      </View>
      <View style={styles.panel}>
      <Text style={styles.instuction}numberOfLines={isExpanded ? 0 : 3} >
      {exercise.instructions}
      </Text>
      <Text onPress={()=>setIsExpanded(isExpanded=>!isExpanded)} style={styles.seeMore}>
      {isExpanded ? 'See Less' : 'See More'}
      </Text>
      </View>
      <ProgressGraph/>
      <NewSetInput exerciseName={exercise.name}/>
      </View>
      )}/>
   
      </View>
      )
    }
    
      
      

export default exerciseDetails;

const styles = StyleSheet.create({

  container: {
    padding:10,
    gap: 10
  },
  panel:{
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: '500'
  },
  exerciseSubTitle: {
    color: 'dimgray',
    textTransform: 'uppercase'
  },
  instuction: {
    fontSize: 16,
    lineHeight: 22
   },
  seeMore: {
    alignSelf:'center',
    padding: 5,
    fontWeight:'500'

  }
});