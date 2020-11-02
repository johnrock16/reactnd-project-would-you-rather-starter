import { useContext } from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import { UserContext } from "../context/UserContext";
import AnswerScreen from "../screens/AnswerScreen";
import HomeScreen from "../screens/HomeScreen";
import LeaderBoardScreen from "../screens/LeaderBoardScreen";
import NewQuestionsScreen from "../screens/NewQuestionsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SignInScreen from "../screens/SignInScreen";

export const PublicRoutes=()=>(
  <Route exact path={'/'} component={SignInScreen}/>
)

export const PrivateRoutes=()=>{
    const userContext=useContext(UserContext);
    const authed=userContext.user.isLogged
    return(
      <div>
        <PrivateRoute path={'/home'} component={HomeScreen} authed={authed}/>
        <PrivateRoute path={'/profile'} component={ProfileScreen} authed={authed}/>
        <PrivateRoute path={'/add'} component={NewQuestionsScreen} authed={authed}/>
        <PrivateRoute path={'/leaderboard'} component={LeaderBoardScreen} authed={authed}/>
        <PrivateRoute path={'/answer'} component={AnswerScreen} authed={authed}/>
      </div>
    )
}