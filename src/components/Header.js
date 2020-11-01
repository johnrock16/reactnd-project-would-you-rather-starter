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
                <Link to={'/home'}><h4 style={styles.headerText}>Home</h4></Link>
                <Link to={'/newQuestions'}><h4 style={styles.headerText}>New Questions</h4></Link>
                <Link to={'/leaderBoard'}><h4 style={styles.headerText}>Leader Board</h4></Link>
            </div>
            {
            (true)&& <div style={{display:'flex',}}>
                    <Link to={'/'}><h4 style={styles.headerText}>{user.name!==''?`Hi, ${user.name}`:'Sign In'}</h4></Link>
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