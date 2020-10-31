import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

const defaultValue={
    user:{
        id:'',
        name:'',
        avatarURL:'',
        questions:[],
        answers:{},
    },
    selectedQuestion:{},
    setUser:()=>{},
    setQuestion:()=>{},
    clearUser:()=>{},
    addAnswer:()=>{},
}

export const UserContext = createContext(defaultValue);

export const UserContextProvider = ({children})=>{
    const [state,setState] = useState(defaultValue);
    const history= useHistory();
    const {user,selectedQuestion} = state;

    const setUser=(newUserData)=>{
        setState((pv)=>({...pv,user:{...pv.user,...newUserData}}))
    }

    const addAnswer=(key,answer)=>{
        setState((pv)=>({...pv,user:{...pv.user,answers:{...pv.user.answers,[key]:answer}},selectedQuestion:{...pv.selectedQuestion,[answer]:{...pv.selectedQuestion[answer],votes:[...pv.selectedQuestion[answer].votes,user.id]},toAnswer:false}}))
    }

    const clearUser=()=>{
        history.push('/')
        setState((pv)=>({...pv,user:defaultValue.user}))
    }

    const setQuestion=(newQuestion)=>{
        setState((pv)=>({...pv,selectedQuestion:newQuestion}))
    }

    return(
        <UserContext.Provider value={{user,setUser,clearUser,selectedQuestion,setQuestion,addAnswer}}>
            {children}
        </UserContext.Provider>
    )
}