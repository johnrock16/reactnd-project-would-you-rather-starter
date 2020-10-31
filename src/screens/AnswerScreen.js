import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { _saveQuestion } from '../_DATA'

const initialState={
    selectedAnswer:'',
}

const AnswerScreen=()=>{
    const [state,setState] = useState(initialState);
    const {selectedAnswer} = state;
    const userContext = useContext(UserContext);
    console.log('aqui')

    const onHandleChange=(event)=> {
        const value=event.target.value;
        setState((pv)=>({...pv,selectedAnswer: value}));
    };

    const onHandleSubmit=()=>{
        // _saveQuestionAnswer(userContext.user.id,answer.id,selectedAnswer)
    }


    return(
        <div style={{display:'flex',flex:1,justifyContent:'center'}}>
            <div style={{display:'flex',flexDirection:'column', border:'solid',borderWidth:1,justifyContent:'center',alignItems:'center',maxWidth:500}}>
                <h1>{'author'}</h1>
                <div style={{display:'flex'}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center', border:'solid',borderWidth:1}}>
                        <div style={{display:'flex',height:150,width:150,borderRadius:120,backgroundImage:'URL("https://cdn.vox-cdn.com/thumbor/PEJ0cEDEGZRndtWvPb334IUEkBc=/0x0:1920x1080/1200x675/filters:focal(761x281:1067x587)/cdn.vox-cdn.com/uploads/chorus_image/image/53744541/Zelda_Switch_21.0.jpg")'}}/>
                    </div>
                    <div style={{border:'solid',borderWidth:1}}>
                        <h1 style={{textAlign:'center'}}>{'Would you rather?'}</h1>
                        <div>
                            <input type="radio" value="optionOne" checked={selectedAnswer==='optionOne'} onChange={onHandleChange}/>
                            <label className="k-radio-label">RadioButton 1</label>

                            <input type="radio" value="optionTwo" checked={selectedAnswer==='optionTwo'}  onChange={onHandleChange}/>
                            <label className="k-radio-label">RadioButton 2</label>
                        </div>
                        <button style={{minWidth:250,minHeight:30,background:'cyan', border:'none'}} onClick={onHandleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AnswerScreen;