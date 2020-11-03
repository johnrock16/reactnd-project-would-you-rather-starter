import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actionsUser } from '../reducer/actions/actionsUser';
import { _saveQuestionAnswer } from '../_DATA'

const initialState={
    selectedAnswer:'',
}

const AnswerScreen=()=>{
    const [state,setState] = useState(initialState);
    const stateUser = useSelector(state=>state.UserReducer);
    const dispatchUser = useDispatch(stateUser.UserReducer);
    const {selectedAnswer} = state;
    const {author,id,optionOne,optionTwo,avatarURL} = stateUser.selectedQuestion;
    const history= useHistory();

    const onHandleChange=(event)=> {
        const value=event.target.value;
        setState((pv)=>({...pv,selectedAnswer: value}));
    };

    const onHandleSubmit=()=>{
        if(selectedAnswer!==''){
            _saveQuestionAnswer({authedUser:stateUser.user.id,qid:id,answer:selectedAnswer})
            dispatchUser(actionsUser.addAnswer(id,selectedAnswer))
            history.push(`questions/${id}`)
            return;
        }
        alert('Please select one option before submit your answer');
    }

    return(
        <div style={{display:'flex',flex:1,justifyContent:'center'}}>
            <div style={{display:'flex',flexDirection:'column', border:'solid',borderWidth:1,justifyContent:'center',alignItems:'center',maxWidth:500}}>
                <h1>{author}</h1>
                <div style={{display:'flex'}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center', border:'solid',borderWidth:1}}>  
                        <div style={{display:'flex',height:150,width:150,borderRadius:120,backgroundPosition:'center center',backgroundColor:'black',backgroundSize:'cover',backgroundImage:`url(${avatarURL})`}}/>
                    </div>
                    <div style={{border:'solid',borderWidth:1}}>
                        <div>
                            <h1 style={{textAlign:'center'}}>{'Would you rather?'}</h1>
                            <div style={{display:'flex',flexDirection:'column'}}>
                                <RadioButton text={optionOne.text} value={'optionOne'} selected={selectedAnswer} onChange={onHandleChange}/>
                                <RadioButton text={optionTwo.text} value={'optionTwo'} selected={selectedAnswer} onChange={onHandleChange}/>
                            </div>
                            <button style={{minWidth:250,minHeight:30,background:'cyan', border:'none'}} onClick={onHandleSubmit}>Submit</button>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    )
}
export default AnswerScreen;

const RadioButton=({value,text,selected,onChange})=>(
    <div style={{display:'flex',flexDirection:'row'}}>
        <input type="radio" value={value} checked={selected===value} onChange={onChange}/>
        <label className="k-radio-label">{text}</label>
    </div>
);