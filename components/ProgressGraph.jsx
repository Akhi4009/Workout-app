import { StyleSheet, Text, View } from 'react-native'
import {LineGraph} from "react-native-graph";

const idToDate = (id) => {
    const timestamp = parseInt(id.substr(0, 8), 16) * 1000;
    return new Date(timestamp);
  };

  
function ProgressGraph ({sets = []}) {
    const points = sets.map((set) => ({
        date: idToDate(set._id),
        value: set.reps * set.weight,
      }));
  

 
    return (
      <View style={styles.container}>
        <Text>ProgressGraph</Text>
        <LineGraph
        points={points}
        animated={false}
        color='#448482'
        style={styles.graph}
        />
      </View>
    )
  }


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        gap: 5,
    },
    graph: {
        width:'100%',
        height:200,
    }
})

export default ProgressGraph