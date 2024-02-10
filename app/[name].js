import { ScrollView, StyleSheet, Text, View } from "react-native"
import { useLocalSearchParams, Stack } from "expo-router";
import exercises from "../assets/data/exercises.json";
import { useState } from "react";

function exerciseDetails() {
  const params = useLocalSearchParams();
  const [isExpanded,setIsExpanded] = useState(false);

  const exercise = exercises.find(item=>item.name===params.name);
  
  if(!exercise) return <Text> Exercise not found</Text>;
  return (
    <ScrollView contentContainerStyle={styles.container}>
    <Stack.Screen options={{title: exercise.name}}/>
    <View style={styles.panel}>
    <Text>
    exercise Details: {params.name}
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
    </ScrollView>
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