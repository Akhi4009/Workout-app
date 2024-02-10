
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import exercises from "../assets/data/exercises.json";
import ExerciseList from "../components/ExerciseList";



export default function App() {

  return (
    <View style={styles.container}>
    <FlatList
     contentContainerStyle={{gap:5}}
    data={exercises}
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
    backgroundColor: 'ghostwhite',
    justifyContent: 'center',
    padding: 10,
  
  }
});
