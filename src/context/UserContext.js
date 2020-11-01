import React, { createContext,useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { UserReducer, userReducerDefaultValue } from '../reducer/UserReducer';

export const UserContext = createContext(userReducerDefaultValue);

export const UserContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(UserReducer,userReducerDefaultValue);
    const history= useHistory();
    const {user,selectedQuestion} = state;

    const userSignIn=(newUserData)=>{
        dispatch({type: 'setUser', payload: {...newUserData,isLogged:true}})
    }

    const addAnswer=(key,answer)=>{
        dispatch({type: 'addAnswer', payload: {key,answer}})
    }

    const clearUser=()=>{
        history.push('/')
        dispatch({type: 'clearuser'})
    }

    const setQuestion=(newQuestion)=>{
        dispatch({type: 'setQuestion', payload: newQuestion})
    }

    return(
        <UserContext.Provider value={{user,userSignIn,clearUser,selectedQuestion,setQuestion,addAnswer}}>
            {children}
        </UserContext.Provider>
    )
}