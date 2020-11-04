import React from 'react';
import { useHistory } from 'react-router-dom';

const ErrorAuthScreen=()=>{
    const history= useHistory();

    const onSignUp=()=>{
        history.push('/');
    }

    return(
        <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center'}}>
            <h1>{"Please, Sign In first"}</h1>
            <button style={{minWidth:250,minHeight:30,background:'cyan', border:'none'}} onClick={onSignUp}>Sign In</button>
        </div>
    );
}

export default(ErrorAuthScreen)