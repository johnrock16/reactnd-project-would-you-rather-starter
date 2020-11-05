import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { actionsUser } from '../reducer/actions/actionsUser';
import { questionsThunks } from '../reducer/thunk/questions';
import { _saveQuestionAnswer } from '../_DATA';

const initialState={
   selectedAnswer:'',
}

const PolScreen = (props) => {
   const [state,setState] = useState(initialState);

   const stateUser = useSelector(state => state.UserReducer);
   const dispatchUser = useDispatch(stateUser.UserReducer);

   const stateQuestions = useSelector(state=>state.QuestionsReducer);
   const dispatchQuestions = useDispatch(stateQuestions.QuestionsReducer);

   const stateUsers = useSelector(state=>state.UsersReducer);
   const history = useHistory();

   const {selectedAnswer} = state;
   const { author, id, optionOne, optionTwo, avatarURL, toAnswer } = stateUser.selectedQuestion;
   const existvotes=(optionOne?.votes && optionTwo.votes)
   const totalAnswers =(existvotes)? optionOne.votes.length + optionTwo.votes.length:0;

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

   React.useEffect(()=>{
      if(!existvotes){
         dispatchQuestions(questionsThunks.getAllQuestions(stateUser.user.answers))
      }
   },[dispatchQuestions,existvotes,stateUser]);

   React.useEffect(()=>{
      if(!existvotes && stateQuestions?.answeredQuestions && stateQuestions.answeredQuestions.length>0){
         const pathId=props.location.pathname.split('/')[2]
         let toAnswer=false;

         let result=stateQuestions.answeredQuestions.find(({id})=>(id===pathId))

         if(!result){
            result=stateQuestions.unAnsweredQuestions.find(({id})=>(id===pathId))
            toAnswer=true;
         }

         if(result?.author){
            const authorUser=stateUsers.users[result.author]
            dispatchUser(actionsUser.setQuestion({...result,avatarURL:authorUser.avatarURL,toAnswer})); 
         }
         else{
            history.push('/error404')
         }
      }
   },[stateQuestions,dispatchUser,existvotes,stateUsers,props.location.pathname,history])

   return (
      <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
         {
            (optionOne && optionTwo) && (
               <div style={{ display: 'flex', flexDirection: 'column', border: 'solid', borderWidth: 1, justifyContent: 'center', alignItems: 'center', maxWidth: 500 }}>
                  <h1>{author}</h1>
                  <div style={{ display: 'flex' }}>
                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'solid', borderWidth: 1 }}>
                        <div style={{ display: 'flex', height: 150, width: 150, borderRadius: 120, backgroundPosition: 'center center', backgroundColor: 'black', backgroundSize: 'cover', backgroundImage: `url(${avatarURL})` }} />
                     </div>

                     <div style={{ border: 'solid', borderWidth: 1 }}>
                        <div>
                           {
                           (toAnswer)?
                              <div>
                                 <h1 style={{textAlign:'center'}}>{'Would you rather?'}</h1>
                                 <div style={{display:'flex',flexDirection:'column'}}>
                                    <RadioButton text={optionOne.text} value={'optionOne'} selected={selectedAnswer} onChange={onHandleChange}/>
                                    <RadioButton text={optionTwo.text} value={'optionTwo'} selected={selectedAnswer} onChange={onHandleChange}/>
                                 </div>
                                 <button style={{minWidth:250,minHeight:30,background:'cyan', border:'none'}} onClick={onHandleSubmit}>Submit</button>
                              </div>
                              :
                              <div>
                                 <h1>Result:</h1>
                                    <AnswerResults isAnswerSelected={optionOne.votes.indexOf(stateUser.user.id) > -1} text={optionOne.text} partial={optionOne.votes.length} total={totalAnswers} />
                                    <AnswerResults isAnswerSelected={optionTwo.votes.indexOf(stateUser.user.id) > -1} text={optionTwo.text} partial={optionTwo.votes.length} total={totalAnswers} />
                              </div>
                           }
                        </div>
                     </div>
                  </div>
               </div>
            )
         }
      </div>
   )
}
export default PolScreen;


const AnswerResults = ({ text, partial, total, isAnswerSelected }) => (
   <div style={{ border: 'solid', borderWidth: 1, backgroundColor: isAnswerSelected ? '#59DBEB' : 'white' }}>
      <h3>{text}</h3>
      <h4>votes: {partial}</h4>
      <ProgressBar fillerColor={'#00695c'} progress={partial > 0 ? (100 / (total / partial)) : 0} />
   </div>
)
const RadioButton=({value,text,selected,onChange})=>(
   <div style={{display:'flex',flexDirection:'row'}}>
       <input type="radio" value={value} checked={selected===value} onChange={onChange}/>
       <label className="k-radio-label">{text}</label>
   </div>
);