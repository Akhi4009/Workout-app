import { StyleSheet, Text, View } from 'react-native'

import {LineGraph} from "react-native-graph";

function ProgressGraph () {
    const points =[
        {
            date: new Date('2024-01-01'),
            value:10,
        },
        {
            date: new Date('2024-01-02'),
            value:15,
        },
        {
            date: new Date('2024-01-03'),
            value:50,
        }
];
 
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