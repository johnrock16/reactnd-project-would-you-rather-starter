import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { _saveQuestion } from '../_DATA'

const initialState={
    firstRather:'',
    secondRather:''
}

const NewQuestionsScreen=()=>{
    const [state,setState] = useState(initialState);
    const userContext = useContext(UserContext);
    const {firstRather,secondRather} = state;
    
    const onFirstRatherHandlerChange=(event)=>{
        const firstRather=event.target.value;
        setState((pv)=>({...pv,firstRather}))
    }

    const onSecondRatherHandlerChange=(event)=>{
        const secondRather=event.target.value;
        setState((pv)=>({...pv,secondRather}))
    }

    const handleNewQuestion=async ()=>{
        await _saveQuestion({author:userContext.user.id,optionOneText:firstRather,optionTwoText:secondRather})
    }

    return(
        <div style={{display:'flex',flex:1,justifyContent:'center'}}>
            <div style={{ border:'solid',borderWidth:1,}}>
                <div style={{display:'flex',flex:1,borderWidth:1, borderBottom:'solid',flexDirection:'column',backgroundColor:'lightgray',justifyContent:'center'}}>
                    <h3 style={{textAlign:'center'}}> Create new Question!</h3>
                </div>
                <div style={{display:'flex',flex:1,flexDirection:'column',backgroundColor:'white',justifyContent:'center'}}>
                    <h4>Complete the question:</h4>
                    <h3>Would you Rather?</h3>
                    <input onChange={onFirstRatherHandlerChange}/>
                    <h4>Or</h4>
                    <input onChange={onSecondRatherHandlerChange}/>
                    <button style={{minWidth:250,minHeight:30,background:'cyan', border:'none'}} onClick={handleNewQuestion}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default NewQuestionsScreen;