import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react'

const NewSetInput = () => {

    const [reps ,setReps] = useState('');
    const [weight,setWeight] = useState('');

    function addSet(){
        console.warn('Add Set:', reps, weight);

        setReps('');
        setWeight('');
    }
  return (
    <View style={styles.container}>
      <TextInput
        value={reps}
        onChangeText={setReps}
        style={styles.input}
        placeholder='Reps'
        keyboardType='numeric'
         />
      <TextInput 
        value={weight}
        onChangeText={setWeight}
        style={styles.input}
        placeholder='Weight'
        keyboardType='numeric'
         />
      <Button title='Add' onPress={addSet}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        flexDirection:'row'
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        padding: 10,
         flex: 1,
         borderRadius: 5,
         borderColor:'gainsboro'
    }
})

export default NewSetInput