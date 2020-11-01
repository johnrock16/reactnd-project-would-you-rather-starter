import React, { useState } from 'react';
import { _getUsers } from '../_DATA';

const initialState={
    users:{},
    mapusers:[],
}

const LeaderBoardScreen=()=>{

    const [state,setState] = useState(initialState);
    const {users,mapusers} = state;

    const getUsers= async()=>{
        const users=await _getUsers();
        const mapusers=Object.keys(users)
        setState((pv)=>({...pv,users,mapusers}))
    }

    React.useEffect(()=>{
        getUsers();
    },[])

    return(
        <div style={{display:'flex', flexDirection:'column',flex:1,justifyContent:'center',alignItems:'center'}}>
           {
               (typeof mapusers!=='undefined' && mapusers.length>0) && (mapusers.map((item)=>(  
                    <UserLeaderBoard key={users[item].id} name={users[item].name} image={users[item].avatarURL} questionNumber={users[item].questions.length} answerNumber={Object.keys(users[item].answers).length}/>
                )).sort((a, b) => (Object.keys(users[a.key].answers).length +users[a.key].questions.length> Object.keys(users[b.key].answers).length)+users[b.key].questions.length ? -1 : 1))
           }
        </div>
    )
}

const UserLeaderBoard=({name,answerNumber,questionNumber,image})=>(
    <div style={{display:'flex', border:'solid',borderWidth:1,flexDirection:'row'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            
        <div style={{display:'flex',height:150,width:150,borderRadius:120,backgroundPosition:'center center',backgroundColor:'black',backgroundSize:'cover',backgroundImage:`url(${image})`}}/>
        </div>
        <div style={{border:'solid',borderWidth:1,minWidth:300}}>
            <h1 style={{textAlign:'center'}}>{name}</h1>
            <div>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <h4>Answered Questions </h4>
                    <h4>{answerNumber}</h4>
                </div>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <h4>Created Questions </h4>
                    <h4>{questionNumber}</h4>
                </div>
            </div>
        </div>
        <div>
            <h2>Score</h2>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <h2>{answerNumber+questionNumber}</h2>
            </div>
        </div>
    </div>
)

export default LeaderBoardScreen;