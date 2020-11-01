import React, { useContext, useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import { UserContext } from '../context/UserContext';
import { _saveQuestionAnswer } from '../_DATA'

const initialState={
    selectedAnswer:'',
}

const AnswerScreen=()=>{
    const [state,setState] = useState(initialState);
    const {selectedAnswer} = state;
    const userContext = useContext(UserContext);
    const {author,id,optionOne,optionTwo, toAnswer,avatarURL} = userContext.selectedQuestion;
    const totalAnswers=optionOne.votes.length + optionTwo.votes.length;

    const onHandleChange=(event)=> {
        const value=event.target.value;
        setState((pv)=>({...pv,selectedAnswer: value}));
    };

    const onHandleSubmit=()=>{
        if(selectedAnswer!==''){
            _saveQuestionAnswer({authedUser:userContext.user.id,qid:id,answer:selectedAnswer})
            userContext.addAnswer(id,selectedAnswer);
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
                    {
                        (toAnswer) ?(
                            <div>
                                <h1 style={{textAlign:'center'}}>{'Would you rather?'}</h1>
                                <div style={{display:'flex',flexDirection:'column'}}>
                                    <RadioButton text={optionOne.text} value={'optionOne'} selected={selectedAnswer} onChange={onHandleChange}/>
                                    <RadioButton text={optionTwo.text} value={'optionTwo'} selected={selectedAnswer} onChange={onHandleChange}/>
                                </div>
                                <button style={{minWidth:250,minHeight:30,background:'cyan', border:'none'}} onClick={onHandleSubmit}>Submit</button>
                           </div>
                        ):(
                            <div>
                                <h1>Result:</h1>
                                <AnswerResults isAnswerSelected={optionOne.votes.indexOf(userContext.user.id)>-1} text={optionOne.text} partial={optionOne.votes.length} total={totalAnswers}/>
                                <AnswerResults isAnswerSelected={optionTwo.votes.indexOf(userContext.user.id)>-1} text={optionTwo.text} partial={optionTwo.votes.length} total={totalAnswers}/>
                            </div>
                        )
                    }
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
)

const AnswerResults=({text,partial,total,isAnswerSelected})=>(
    <div style={{border:'solid',borderWidth:1,backgroundColor:isAnswerSelected?'blue':'white'}}>
        <h3>{text}</h3>
        <ProgressBar bgcolor={'#00695c'} completed={partial>0?(100/(total/partial)):0} />
    </div>
)