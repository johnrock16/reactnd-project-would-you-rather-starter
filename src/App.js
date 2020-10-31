import Header from "./components/Header";
import { UserContextProvider } from "./context/UserContext";
import LeaderBoardScreen from "./screens/LeaderBoardScreen";
import NewQuestionsScreen from "./screens/NewQuestionsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SignInScreen from "./screens/SignInScreen";
import {BrowserRouter,Route} from 'react-router-dom';
import HomeScreen from "./screens/HomeScreen";
import AnswerScreen from "./screens/AnswerScreen";

const App=()=>{
  return (
    <BrowserRouter>
      <div className="App">
        <UserContextProvider>
          <Header/>
            <Route exact path={'/'} component={SignInScreen}/>
            <Route path={'/profile'} component={ProfileScreen}/>
            <Route path={'/newQuestions'} component={NewQuestionsScreen}/>
            <Route path={'/leaderBoard'} component={LeaderBoardScreen}/>
            <Route path={'/home'} component={HomeScreen}/>
            <Route path={'/answer'} component={AnswerScreen}/>
        </UserContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
