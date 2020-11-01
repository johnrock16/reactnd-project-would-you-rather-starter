import React, { useContext, useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import { UserContext } from '../context/UserContext';
import { _saveQuestion, _saveQuestionAnswer } from '../_DATA'

const initialState={
    selectedAnswer:'',
}

const AnswerScreen=()=>{
    const [state,setState] = useState(initialState);
    const {selectedAnswer} = state;
    const userContext = useContext(UserContext);
    const {author,id,optionOne,optionTwo, toAnswer} = userContext.selectedQuestion;
    const totalAnswers=optionOne.votes.length + optionTwo.votes.length;

    const onHandleChange=(event)=> {
        const value=event.target.value;
        setState((pv)=>({...pv,selectedAnswer: value}));
    };

    const onHandleSubmit=()=>{
        _saveQuestionAnswer({authedUser:userContext.user.id,qid:id,answer:selectedAnswer})
        userContext.addAnswer(id,selectedAnswer);
    }

    return(
        <div style={{display:'flex',flex:1,justifyContent:'center'}}>
            <div style={{display:'flex',flexDirection:'column', border:'solid',borderWidth:1,justifyContent:'center',alignItems:'center',maxWidth:500}}>
                <h1>{author}</h1>
                <div style={{display:'flex'}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center', border:'solid',borderWidth:1}}>
                        <div style={{display:'flex',height:150,width:150,borderRadius:120,backgroundImage:'URL("https://cdn.vox-cdn.com/thumbor/PEJ0cEDEGZRndtWvPb334IUEkBc=/0x0:1920x1080/1200x675/filters:focal(761x281:1067x587)/cdn.vox-cdn.com/uploads/chorus_image/image/53744541/Zelda_Switch_21.0.jpg")'}}/>
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
                                <AnswerResults text={optionOne.text} partial={optionOne.votes.length} total={totalAnswers}/>
                                <AnswerResults text={optionTwo.text} partial={optionTwo.votes.length} total={totalAnswers}/>
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

const AnswerResults=({text,partial,total})=>(
    <div style={{border:'solid',borderWidth:1}}>
        <h3>{text}</h3>
        <ProgressBar bgcolor={'#00695c'} completed={partial>0?(100/(total/partial)):0} />
    </div>
)