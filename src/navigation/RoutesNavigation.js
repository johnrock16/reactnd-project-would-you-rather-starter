import { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import { UserContext } from "../context/UserContext";
import AnswerScreen from "../screens/AnswerScreen";
import HomeScreen from "../screens/HomeScreen";
import LeaderBoardScreen from "../screens/LeaderBoardScreen";
import NewQuestionsScreen from "../screens/NewQuestionsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SignInScreen from "../screens/SignInScreen";
import PolScreen from "../screens/PolScreen";

export const AppRoutes=()=>{
    const userContext=useContext(UserContext);
    const isAuth=userContext.user.isLogged
    return(
      <Switch>
        <Route exact path={'/'} component={SignInScreen}/>
        <PrivateRoute path={'/home'} component={HomeScreen} isAuth={isAuth}/>
        <PrivateRoute path={'/profile'} component={ProfileScreen} isAuth={isAuth}/>
        <PrivateRoute path={'/add'} component={NewQuestionsScreen} isAuth={isAuth}/>
        <PrivateRoute path={'/questions/:question_id'} component={PolScreen} isAuth={isAuth}/>
        <PrivateRoute path={'/leaderboard'} component={LeaderBoardScreen} isAuth={isAuth}/>
        <PrivateRoute path={'/answer'} component={AnswerScreen} isAuth={isAuth}/>
        <Route exact path={'*'} component={goToHome}/>
      </Switch>
    )
}

const goToHome=()=>(<Redirect to="/home"/>)