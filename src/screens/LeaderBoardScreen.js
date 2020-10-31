import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { _getUsers } from '../_DATA';

const initialState={
    users:{},
    mapusers:[],
}

const LeaderBoardScreen=()=>{

    const [state,setState] = useState(initialState);
    const userContext = useContext(UserContext);
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
                    <UserLeaderBoard key={users[item].id} name={users[item].name} questionNumber={users[item].questions.length} answerNumber={Object.keys(users[item].answers).length}/>
                )))
           }
        </div>
    )
}

const UserLeaderBoard=({name,answerNumber,questionNumber})=>(
    <div style={{display:'flex', border:'solid',borderWidth:1,flexDirection:'row'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{display:'flex',height:150,width:150,borderRadius:120,backgroundImage:'URL("https://cdn.vox-cdn.com/thumbor/PEJ0cEDEGZRndtWvPb334IUEkBc=/0x0:1920x1080/1200x675/filters:focal(761x281:1067x587)/cdn.vox-cdn.com/uploads/chorus_image/image/53744541/Zelda_Switch_21.0.jpg")'}}/>
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