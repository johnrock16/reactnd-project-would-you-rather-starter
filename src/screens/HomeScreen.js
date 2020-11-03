import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { actionsUsers } from '../reducer/actions/actionsUsers';
import { _getQuestions, _getUsers} from '../_DATA';

const initialState={
    answeredQuestions:[],
    unAnsweredQuestions:[],
    users:[],
    toogleQuestions:true,
}

const HomeScreen=()=>{
    const [state,setState] = useState(initialState);
    const stateUser = useSelector(state=>state.UsersReducer);
    const dispatchUser = useDispatch(state.UsersReducer);
    const userContext = useContext(UserContext);
    const history= useHistory();
    
    const {answeredQuestions,unAnsweredQuestions,toogleQuestions} = state;
    const {users} = stateUser;

    const handleOnQuestion=(item,toAnswer,avatarURL)=>{
        userContext.setQuestion({...item,toAnswer,avatarURL});
        const goTo=(toogleQuestions)?'/answer':`/questions/${item.id}`
        history.push(goTo)
    }

    const onHandleToogle=(v)=>{
        setState((pv)=>({...pv,toogleQuestions:v}))
    }

    React.useEffect(()=>{
        _getQuestions().then((questions)=>{
            const keysAnswers=Object.keys(userContext.user.answers)
            const keysQuestions=Object.keys(questions)

            const unAnsweredQuestions=keysQuestions.filter((item)=>(keysAnswers.indexOf(item)===-1))
            .map((item)=>(questions[item]))
            .sort((a,b)=>(a.timestamp<b.timestamp?1:-1))
            const answeredQuestions=keysAnswers.map((item)=>(questions[item]))
            .sort((a,b)=>(a.timestamp<b.timestamp?1:-1))
            
            setState((pv)=>({...pv,unAnsweredQuestions,answeredQuestions}));
        })
        _getUsers().then((users)=>{
            dispatchUser(actionsUsers.getUpdatedUsers(users))
        })
    },[dispatchUser,userContext.user.answers]);

    return(
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>      
            <div style={{display:'flex',flexDirection:'column',margin:20}}>
                <div style={{display:'flex'}}>
                    <button style={{minWidth:250,minHeight:30,background:(toogleQuestions)?'cyan':'gray', border:'none'}} onClick={()=>{onHandleToogle(true)}}>UnAnswered Questions</button>
                    <button style={{minWidth:250,minHeight:30,background:(!toogleQuestions)?'cyan':'gray', border:'none'}} onClick={()=>{onHandleToogle(false)}}>Answered Questions</button>
                </div>
                {
                    (toogleQuestions)?
                    (Object.keys(users).length>0 && typeof unAnsweredQuestions!=='undefined' && unAnsweredQuestions.length>0) &&(
                        unAnsweredQuestions.map((item,index)=>(
                            <CardHome key={`UnAnsweredQuestions${index}`} author={item.author} image={users[item.author].avatarURL} option={item.optionOne.text} onGo={()=>handleOnQuestion(item,true,users[item.author].avatarURL)}/>
                        ))
                    )
                    :
                    (Object.keys(users).length>0 && typeof answeredQuestions!=='undefined' && answeredQuestions.length>0) &&(
                        answeredQuestions.map((item,index)=>(
                            <CardHome key={`AnsweredQuestions${index}`} author={item.author} image={users[item.author].avatarURL} option={item.optionOne.text} onGo={()=>handleOnQuestion(item,false,users[item.author].avatarURL)}/>
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