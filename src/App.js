import Header from "./components/Header";
import {UserContextProvider } from "./context/UserContext";
import {BrowserRouter} from 'react-router-dom';
import {AppRoutes} from "./navigation/RoutesNavigation";

const App=()=>{
  return (
    <BrowserRouter>
      <div className="App">
        <UserContextProvider>
          <Header/>
          <AppRoutes/>
        </UserContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
