import React, { createContext, useState } from 'react';

const defaultValue={
    user:{
        id:'',
        name:'',
        avatarURL:'',
        questions:[],
        answers:{},
    },
    setUser:()=>{}
}

export const UserContext = createContext(defaultValue);

export const UserContextProvider = ({children})=>{
    const [state,setState] = useState(defaultValue);
    const {user} = state;

    const setUser=(newUserData)=>{
        setState((pv)=>({...pv,user:{...pv.user,...newUserData}}))
    }

    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}