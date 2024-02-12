import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

const AuthContextProvider=({children})=>{

    const [username,setUsername] = useState('');
    return(
        <AuthContext.Provider value={{username,setUsername}}>
        {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext);
    if(!context) throw new Error("Context is used outside of the provider");

    return context
}

export default AuthContextProvider;