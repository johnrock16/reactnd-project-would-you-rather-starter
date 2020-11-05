import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import HomeScreen from "../screens/HomeScreen";
import LeaderBoardScreen from "../screens/LeaderBoardScreen";
import NewQuestionsScreen from "../screens/NewQuestionsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SignInScreen from "../screens/SignInScreen";
import PolScreen from "../screens/PolScreen";
import { useSelector } from "react-redux";
import Error404Screen from "../screens/Error404Screen";

export const AppRoutes=()=>{
    const stateUser = useSelector(state=>state.UserReducer);
    const {isLogged} = stateUser.user;
    return(
      <Switch>
        <PrivateRoute path={'/home'} component={HomeScreen} isAuth={isLogged}/>
        <PrivateRoute path={'/profile'} component={ProfileScreen} isAuth={isLogged}/>
        <PrivateRoute path={'/add'} component={NewQuestionsScreen} isAuth={isLogged}/>
        <PrivateRoute path={'/questions/:question_id'} component={PolScreen} isAuth={isLogged}/>
        <PrivateRoute path={'/leaderboard'} component={LeaderBoardScreen} isAuth={isLogged}/>
        <Route exact path={'/error404'} component={Error404Screen}/>
        <Route path={'/'} component={SignInScreen}/>
      </Switch>
    )
}