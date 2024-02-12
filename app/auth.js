import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../providers/AuthContext';

 function AuthScreen() {

    const [localUsername,setLocalUsername] = useState('');
    const {username,setUsername} = useAuth();
    
    const onSignIn =() =>{
        setUsername(localUsername)
    }   

    if(username) {
        return <Redirect href={'/'}/>
    }
  return (
    <View style={styles.page}>
    <Stack.Screen options={{title: 'Sign in'}}/>
      <Text style={styles.label}>Username</Text>
      <TextInput
      style={styles.input}
      value= {localUsername}
      onChangeText={setLocalUsername}
      placeholder='Username'
      />
      <Button title='Sign in' onPress={onSignIn}/>
    </View>
  )
}

const styles = StyleSheet.create({
    page: {
        flex:1,
        justifyContent: 'center',
        padding:10,
        gap:10,
        backgroundColor:'white'
    },
    label: {
        fontWeight:'600',
        fontSize:20,
        color:'dimgray',
        textAlign:'center',
        textTransform:'uppercase'
    },
    input: {
        borderWidth:1,
        borderColor: 'gainsboro',
        padding:10,
        borderRadius:5
    }
})

export default AuthScreen;