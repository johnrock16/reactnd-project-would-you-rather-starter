import React, { useContext } from 'react';
import ProgressBar from '../components/ProgressBar';
import { UserContext } from '../context/UserContext';

const PolScreen=()=>{
    const userContext = useContext(UserContext);
    const {author,optionOne,optionTwo,avatarURL} = userContext.selectedQuestion;
    const totalAnswers=optionOne.votes.length + optionTwo.votes.length;

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
                            <h1>Result:</h1>
                            <AnswerResults isAnswerSelected={optionOne.votes.indexOf(userContext.user.id)>-1} text={optionOne.text} partial={optionOne.votes.length} total={totalAnswers}/>
                            <AnswerResults isAnswerSelected={optionTwo.votes.indexOf(userContext.user.id)>-1} text={optionTwo.text} partial={optionTwo.votes.length} total={totalAnswers}/>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    )
}
export default PolScreen;


const AnswerResults=({text,partial,total,isAnswerSelected})=>(
    <div style={{border:'solid',borderWidth:1,backgroundColor:isAnswerSelected?'#59DBEB':'white'}}>
        <h3>{text}</h3>
        <ProgressBar fillerColor={'#00695c'} progress={partial>0?(100/(total/partial)):0} />
    </div>
)