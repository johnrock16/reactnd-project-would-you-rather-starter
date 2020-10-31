import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { _getQuestions, _getUsers } from '../_DATA';

const initialState={
    answeredQuestions:[],
    unAnsweredQuestions:[],
}

const HomeScreen=()=>{
    const [state,setState] = useState(initialState);
    const userContext = useContext(UserContext);
    const history= useHistory();
    
    const {answeredQuestions,unAnsweredQuestions} = state;

    const getUsers= async()=>{
        const users=await _getUsers();

        const questions=await _getQuestions();
        const mapusers=Object.keys(users)
        const keysAnswers=Object.keys(userContext.user.answers)
        const keysQuestions=Object.keys(questions)

        let unAnsweredQuestions=keysQuestions.filter((item)=>(
            keysAnswers.indexOf(item)==-1
        ));
        unAnsweredQuestions=unAnsweredQuestions.map((item)=>(
            questions[item]
        ));

        let answeredQuestions=keysAnswers.map((item)=>(
            questions[item]
        ));

        setState((pv)=>({...pv,unAnsweredQuestions:unAnsweredQuestions,answeredQuestions:answeredQuestions}))
        // userContext.setUser(users[mapusers[0]]);
    }

    const handleOnQuestion=()=>{
        history.push('/answer')
    }

    React.useEffect(()=>{
        getUsers();
    },[])

    React.useEffect(()=>{
        console.log(userContext)
    },[userContext])

    return(
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',flex:1}}>
            <h1>UnAnswered Questions</h1>
            <div>
                {
                    (typeof unAnsweredQuestions!=='undefined' && unAnsweredQuestions.length>0) &&(
                        unAnsweredQuestions.map((item)=>(
                            <CardHome author={item.author} option={item.optionOne.text} onGo={handleOnQuestion}/>
                        ))
                    )
                }
            </div>
            <h1>Answered Questions</h1>
            <div>
                {
                    (typeof answeredQuestions!=='undefined' && answeredQuestions.length>0) &&(
                        answeredQuestions.map((item)=>(
                            <CardHome author={item.author} option={item.optionOne.text}/>
                        ))
                    )
                }
            </div>
        </div>
    )
}

const CardHome=({author,option,onGo})=>{
    return(
        <div style={{display:'flex',flexDirection:'column', border:'solid',borderWidth:1,justifyContent:'center',alignItems:'center',maxWidth:500}}>
            <h1>{author}</h1>
            <div style={{display:'flex'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center', border:'solid',borderWidth:1}}>
                    <div style={{display:'flex',height:150,width:150,borderRadius:120,backgroundImage:'URL("https://cdn.vox-cdn.com/thumbor/PEJ0cEDEGZRndtWvPb334IUEkBc=/0x0:1920x1080/1200x675/filters:focal(761x281:1067x587)/cdn.vox-cdn.com/uploads/chorus_image/image/53744541/Zelda_Switch_21.0.jpg")'}}/>
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