import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
import AuthContextProvider from "../providers/AuthContext";

export default function RootLayout(){
    const client = new QueryClient();
    return (
        <GestureHandlerRootView style={{flex:1}}>
        <AuthContextProvider>
        <QueryClientProvider client={client}>
        <Stack>
        <Stack.Screen
        name="index" options={{title: 'Exercises'}}
        />
        </Stack>
        </QueryClientProvider>
        </AuthContextProvider>
        </GestureHandlerRootView>
        )

}

        