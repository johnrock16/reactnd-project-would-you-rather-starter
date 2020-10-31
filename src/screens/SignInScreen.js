import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { _getUsers } from '../_DATA';
import { useHistory } from "react-router-dom";

const initialState={
    users:{},
    mapusers:[],
    selectedUser:''
}

const SignInScreen= ()=>{
    const [state,setState] = useState(initialState);
    const userContext = useContext(UserContext);
    const history = useHistory();
    const {users,mapusers,selectedUser} = state;

    const getUsers= async()=>{
        const users=await _getUsers();
        const mapusers=Object.keys(users);
        setState((pv)=>({...pv,users,mapusers}))
    }

    const onSelect=(event)=>{
        const selectedUser=event.target.value;
        setState((pv)=>({...pv,selectedUser}))
    }

    const onSignUp=()=>{
        if(mapusers.indexOf(selectedUser)>-1){
            userContext.setUser(users[selectedUser])
            history.push('/home');
        }
    }

    React.useEffect(()=>{
        getUsers()
    },[])
    // React.useEffect(()=>{
    //     console.log(state)
    // },[state])
    React.useEffect(()=>{
        console.log('context',userContext)
    },[userContext])
    return(
        <div style={{display:'flex',flex:1,justifyContent:'center'}}>
            <div style={{ border:'solid',borderWidth:1,}}>
                <div style={{display:'flex',flex:1,borderWidth:1, borderBottom:'solid',flexDirection:'column',backgroundColor:'lightgray',justifyContent:'center'}}>
                    <h3 style={{textAlign:'center'}}> Welcome in the would or rather project!</h3>
                    <span style={{textAlign:'center'}}> Welcome</span>
                </div>
                <div style={{display:'flex',flex:1,flexDirection:'column',backgroundColor:'white',justifyContent:'center'}}>
                    <h3 style={{textAlign:'center',color:'cyan'}}> Sign In</h3>
                    <select onChange={onSelect}>
                        <option value="move" disabled>Move to...</option>
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

const styles={
}