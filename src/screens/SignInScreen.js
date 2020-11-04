import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { actionsUsers } from '../reducer/actions/actionsUsers';
import { actionsUser } from '../reducer/actions/actionsUser';
import { userThunks } from '../reducer/thunk/users';

const SignInScreen= ()=>{
    const state = useSelector(state=>state.UsersReducer);
    const dispatch = useDispatch(state.UsersReducer);
    const dispatchUser = useDispatch(state.UserReducer);
    const history = useHistory();
    const {users,mapusers,selectedUser} = state;

    const onSelect=(event)=>{
        const selectedUser=event.target.value;
        dispatch(actionsUsers.setSelectedUser(selectedUser))
    }

    const onSignUp=()=>{
        if(mapusers.indexOf(selectedUser)>-1){
            dispatchUser(actionsUser.setUser({...users[selectedUser],isLogged:true}))
            // userContext.userSignIn(users[selectedUser])
            history.push('/home');
        }
    }

    React.useEffect(()=>{
        dispatch(userThunks.getAllUsers())
        // _getUsers().then((users)=>{
        //     dispatch(actionsUsers.getUpdatedUsers(users))
        // })
    },[dispatch])
    return(
        <div style={{display:'flex',flex:1,justifyContent:'center'}}>
            <div style={{ border:'solid',borderWidth:1,}}>
                <div style={{display:'flex',flex:1,borderWidth:1, borderBottom:'solid',flexDirection:'column',backgroundColor:'lightgray',justifyContent:'center'}}>
                    <h3 style={{textAlign:'center'}}> Welcome in the would or rather project!</h3>
                    <span style={{textAlign:'center'}}> Welcome</span>
                </div>
                <div style={{display:'flex',flex:1,flexDirection:'column',backgroundColor:'white',justifyContent:'center'}}>
                    <h3 style={{textAlign:'center',color:'cyan'}}> Sign In</h3>
                    <select value={selectedUser?selectedUser:'select'} onChange={onSelect}>
                        <option value="select" disabled>Select a user...</option>
                        {
                            (typeof mapusers!=='undefined' && mapusers.length>0) && (mapusers.map((item)=>(  
                                <option key={users[item].id} value={users[item].id}>{users[item].name}</option>
                            )))
                        }
                    </select>
                    <button style={{minWidth:250,minHeight:30,background:'cyan', border:'none'}} onClick={onSignUp}>Sign In</button>
                </div>
            </div>
        </div>
    )
}

export default SignInScreen;