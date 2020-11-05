import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { actionsUser } from '../reducer/actions/actionsUser';
import { questionsThunks } from '../reducer/thunk/questions';

const PolScreen = (props) => {

   const stateUser = useSelector(state => state.UserReducer);
   const dispatchUser = useDispatch(stateUser.UserReducer);

   const stateQuestions = useSelector(state=>state.QuestionsReducer);
   const dispatchQuestions = useDispatch(stateQuestions.QuestionsReducer);

   const stateUsers = useSelector(state=>state.UsersReducer);
   const history = useHistory();

   const { author, optionOne, optionTwo, avatarURL } = stateUser.selectedQuestion;
   const existvotes=(optionOne?.votes && optionTwo.votes)
   const totalAnswers =(existvotes)? optionOne.votes.length + optionTwo.votes.length:0;

   React.useEffect(()=>{
      if(!existvotes){
         dispatchQuestions(questionsThunks.getAllQuestions(stateUser.user.answers))
      }
   },[dispatchQuestions,existvotes,stateUser]);

   React.useEffect(()=>{
      if(!existvotes && stateQuestions?.answeredQuestions && stateQuestions.answeredQuestions.length>0){
         const pathId=props.location.pathname.split('/')[2]
         const result=stateQuestions.answeredQuestions.find(({id})=>(id===pathId))
         if(result?.author){
            const authorUser=stateUsers.users[result.author]
            dispatchUser(actionsUser.setQuestion({...result,avatarURL:authorUser.avatarURL})); 
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
                           <h1>Result:</h1>
                           <AnswerResults isAnswerSelected={optionOne.votes.indexOf(stateUser.user.id) > -1} text={optionOne.text} partial={optionOne.votes.length} total={totalAnswers} />
                           <AnswerResults isAnswerSelected={optionTwo.votes.indexOf(stateUser.user.id) > -1} text={optionTwo.text} partial={optionTwo.votes.length} total={totalAnswers} />
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