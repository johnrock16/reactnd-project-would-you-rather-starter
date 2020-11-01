import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { _getQuestions, _getUsers} from '../_DATA';

const initialState={
    answeredQuestions:[],
    unAnsweredQuestions:[],
    users:[],
}

const HomeScreen=()=>{
    const [state,setState] = useState(initialState);
    const userContext = useContext(UserContext);
    const history= useHistory();
    
    const {answeredQuestions,unAnsweredQuestions,users} = state;

    const handleOnQuestion=(item,toAnswer,avatarURL)=>{
        userContext.setQuestion({...item,toAnswer,avatarURL});
        history.push('/answer')
    }

    React.useEffect(()=>{
        _getQuestions().then((questions)=>{
            const keysAnswers=Object.keys(userContext.user.answers)
            const keysQuestions=Object.keys(questions)

            let unAnsweredQuestions=keysQuestions.filter((item)=>(
                keysAnswers.indexOf(item)===-1
            ));
            unAnsweredQuestions=unAnsweredQuestions.map((item)=>(
                questions[item]
            ));

            let answeredQuestions=keysAnswers.map((item)=>(
                questions[item]
            ));

            setState((pv)=>({...pv,unAnsweredQuestions:unAnsweredQuestions,answeredQuestions:answeredQuestions}));
        })
        _getUsers().then((users)=>{
            setState((pv)=>({...pv,users}));
        })
    },[userContext.user.answers]);

    return(
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
            <div style={{display:'flex',flexDirection:'column',margin:20}}>
                <h1>UnAnswered Questions</h1>
                {
                    (Object.keys(users).length>0 && typeof unAnsweredQuestions!=='undefined' && unAnsweredQuestions.length>0) &&(
                        unAnsweredQuestions.map((item)=>(
                            <CardHome author={item.author} image={users[item.author].avatarURL} option={item.optionOne.text} onGo={()=>handleOnQuestion(item,true,users[item.author].avatarURL)}/>
                        ))
                    )
                }
            </div>
            <div style={{display:'flex',flexDirection:'column',margin:20}}>
                <h1>Answered Questions</h1>
                {
                    (Object.keys(users).length>0 && typeof answeredQuestions!=='undefined' && answeredQuestions.length>0) &&(
                        answeredQuestions.map((item)=>(
                            <CardHome author={item.author} image={users[item.author].avatarURL} option={item.optionOne.text} onGo={()=>handleOnQuestion(item,false,users[item.author].avatarURL)}/>
                        ))
                    )
                }
            </div>
        </div>
    )
}

const CardHome=({author,option,onGo,image})=>{
    return(
        <div style={{display:'flex',flexDirection:'column', border:'solid',borderWidth:1,justifyContent:'center',alignItems:'center',maxWidth:500,marginBottom:40}}>
            <h1>{author}</h1>
            <div style={{display:'flex'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center', border:'solid',borderWidth:1}}>
                    <div style={{display:'flex',height:150,width:150,borderRadius:120,backgroundPosition:'center center',backgroundColor:'black',backgroundSize:'cover',backgroundImage:`url(${image})`}}/>
                </div>
                <div style={{border:'solid',borderWidth:1}}>
                    <h1 style={{textAlign:'center'}}>{'Would you rather?'}</h1>
                    <h4 style={{textAlign:'center'}}>{option}</h4>
                    <button style={{minWidth:250,minHeight:30,background:'cyan', border:'none'}} onClick={onGo}>View Pol</button>
                </div>
            </div>
        </div>
    )
}

export default HomeScreen;