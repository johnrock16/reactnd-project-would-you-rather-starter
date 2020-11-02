import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Header= ()=>{
    
    const userContext= useContext(UserContext);
    const {user} = userContext;

    const onHandleLogOut=()=>{
        userContext.clearUser();
    }
    
    return(
        <div style={styles.headerContainer}>
            <div style={{display:'flex', paddingRight:40,justifyContent:'flex-start'}}>
                <Link style={{textDecoration:'none',color:'black'}} to={'/home'}><h4 style={styles.headerText}>Home</h4></Link>
                <Link style={{textDecoration:'none',color:'black'}} to={'/add'}><h4 style={styles.headerText}>New Questions</h4></Link>
                <Link style={{textDecoration:'none',color:'black'}} to={'/leaderboard'}><h4 style={styles.headerText}>Leader Board</h4></Link>
            </div>
            {
            (true)&& <div style={{display:'flex',}}>
                    {
                        (user.isLogged)?
                        <div style={{display:'flex',alignItems:'center'}}>
                            <div style={{display:'flex',height:50,width:50,borderRadius:120,backgroundPosition:'center center',backgroundColor:'black',backgroundSize:'cover',backgroundImage:`url(${user.avatarURL})`}}/>
                            <h3>{`Hi, ${user.name}`}</h3>
                        </div>
                        :<Link style={{textDecoration:'none',color:'black'}} to={'/'}><h4 style={styles.headerText}>{'Sign In'}</h4></Link>
                    }
                    
                    <h4 style={styles.headerText} onClick={onHandleLogOut}>Log Out</h4>
                </div>
            }
        </div>
    )
}

export default Header;

const styles={
    headerContainer:{display:'flex',flex:1,backgroundColor:'white',justifyContent:'center',border:'solid'},
    headerText:{padding:20}
}