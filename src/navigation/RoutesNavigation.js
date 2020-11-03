import { Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AnswerScreen from "../screens/AnswerScreen";
import HomeScreen from "../screens/HomeScreen";
import LeaderBoardScreen from "../screens/LeaderBoardScreen";
import NewQuestionsScreen from "../screens/NewQuestionsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SignInScreen from "../screens/SignInScreen";
import PolScreen from "../screens/PolScreen";
import { useSelector } from "react-redux";

export const AppRoutes=()=>{
    const stateUser = useSelector(state=>state.UserReducer);
    const {isLogged} = stateUser.user;
    return(
      <Switch>
        <Route exact path={'/'} component={SignInScreen}/>
        <PrivateRoute path={'/home'} component={HomeScreen} isAuth={isLogged}/>
        <PrivateRoute path={'/profile'} component={ProfileScreen} isAuth={isLogged}/>
        <PrivateRoute path={'/add'} component={NewQuestionsScreen} isAuth={isLogged}/>
        <PrivateRoute path={'/questions/:question_id'} component={PolScreen} isAuth={isLogged}/>
        <PrivateRoute path={'/leaderboard'} component={LeaderBoardScreen} isAuth={isLogged}/>
        <PrivateRoute path={'/answer'} component={AnswerScreen} isAuth={isLogged}/>
        <Route exact path={'*'} component={goToHome}/>
      </Switch>
    )
}

const goToHome=()=>(<Redirect to="/home"/>)