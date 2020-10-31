import React from 'react';
import { Link } from 'react-router-dom';

const Header= ()=>(
    <div style={styles.headerContainer}>
        <div style={{display:'flex', paddingRight:40,justifyContent:'flex-start'}}>
            <Link to={'/home'}><h4 style={styles.headerText}>Home</h4></Link>
            <Link to={'/newQuestions'}><h4 style={styles.headerText}>New Questions</h4></Link>
            <Link to={'/leaderBoard'}><h4 style={styles.headerText}>Leader Board</h4></Link>
        </div>
        {
          (true)&& <div style={{display:'flex',}}>
                <Link to={'/profile'}><h4 style={styles.headerText}>Hi John</h4></Link>
                <h4 style={styles.headerText}>Log Out</h4>
            </div>
        }
    </div>
)

export default Header;

const styles={
    headerContainer:{display:'flex',flex:1,backgroundColor:'white',justifyContent:'center',border:'solid'},
    headerText:{padding:20}
}