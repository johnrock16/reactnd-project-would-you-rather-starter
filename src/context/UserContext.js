import React, { createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { userReducerDefaultValue } from '../reducer/reducers/UserReducer';
import {useSelector,useDispatch} from 'react-redux';
import { actionsUser } from '../reducer/actions/actionsUser';

export const UserContext = createContext(userReducerDefaultValue);

const UserContextProvider = ({children})=>{
    const state = useSelector(state=>state.UserReducer);
    const dispatch = useDispatch(state.UserReducer);
    const history= useHistory();
    const {user,selectedQuestion} = state;

    const userSignIn=(newUserData)=>{
        dispatch(actionsUser.setUser({...newUserData,isLogged:true}))
    }

    const addAnswer=(key,answer)=>{
        dispatch(actionsUser.addAnswer({key,answer}))
    }

    const clearUser=()=>{
        history.push('/')
        dispatch(actionsUser.clearUser())
    }

    const setQuestion=(newQuestion)=>{
        dispatch(actionsUser.setQuestion(newQuestion))
    }

    return(
        <UserContext.Provider value={{user,userSignIn,clearUser,selectedQuestion,setQuestion,addAnswer}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider;