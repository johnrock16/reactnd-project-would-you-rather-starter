import { Redirect, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AnswerScreen from "../screens/AnswerScreen";
import HomeScreen from "../screens/HomeScreen";
import LeaderBoardScreen from "../screens/LeaderBoardScreen";
import NewQuestionsScreen from "../screens/NewQuestionsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SignInScreen from "../screens/SignInScreen";
import PolScreen from "../screens/PolScreen";
import { useSelector } from "react-redux";
import Error404Screen from "../screens/Error404Screen";
import ErrorAuthScreen from "../screens/ErrorAuthScreen";

export const AppRoutes=()=>{
    const stateUser = useSelector(state=>state.UserReducer);
    const {isLogged} = stateUser.user;
    return(
      <div>
        <Route exact path={'/'} component={SignInScreen}/>
        <PrivateRoute path={'/home'} component={HomeScreen} isAuth={isLogged}/>
        <PrivateRoute path={'/profile'} component={ProfileScreen} isAuth={isLogged}/>
        <PrivateRoute path={'/add'} component={NewQuestionsScreen} isAuth={isLogged}/>
        <PrivateRoute path={'/questions/:question_id'} component={PolScreen} isAuth={isLogged}/>
        <PrivateRoute path={'/leaderboard'} component={LeaderBoardScreen} isAuth={isLogged}/>
        <PrivateRoute path={'/answer'} component={AnswerScreen} isAuth={isLogged}/>
        <Route exact path={'/errorauth'} component={ErrorAuthScreen}/>
        <Route exact path={'/error404'} component={Error404Screen}/>
          <Route exact path={'*'} component={notFound}/>
      </div>
    )
}

const notFound=()=>(<Redirect to="/error404"/>)