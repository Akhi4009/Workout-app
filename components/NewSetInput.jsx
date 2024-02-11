import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { gql } from "graphql-request";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import client from './graphqlClient';

const mutationDocument = gql`
mutation MyMutation($NewSet: NewSet!) {
  InsertSet(
    collection: "sets"
    database: "Workout"
    dataSource: "Cluster0"
    document: $NewSet
  ) {
    insertedId
  }
}
`

const NewSetInput = ({exerciseName}) => {

    const [reps ,setReps] = useState('');
    const [weight,setWeight] = useState('');
    const queryClient = useQueryClient();

    const {mutate, isPending,isError} = useMutation({
      mutationKey:['sets'],
      mutationFn:(NewSet)=>client.request(mutationDocument,{NewSet}),
      onSuccess:()=> queryClient.invalidateQueries({queryKey:['sets']})
      })

    function addSet(){
        console.warn('Add Set:', reps, weight);
        mutate({
          exercise: exerciseName, 
          reps:Number.parseInt(reps),
          weight:Number.parseFloat(weight)
      })
        setReps('');
        setWeight('');
    }
  return (
    <View style={styles.container}>
    <View style={styles.row}>
    <TextInput
    editable={!isPending}
    value={reps}
    onChangeText={setReps}
    style={styles.input}
    placeholder='Reps'
    keyboardType='numeric'
    
    />
    <TextInput
    editable={!isPending} 
    value={weight}
    onChangeText={setWeight}
    style={styles.input}
    placeholder='Weight'
    keyboardType='numeric'
    />
    <Button title={isPending ? 'Adding....' : 'Add'} onPress={addSet}/>
    </View>
    {isError && <Text style={{color:'red'}}>Failed to Add the set</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    row:{
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