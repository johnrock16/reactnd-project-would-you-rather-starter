import Header from "./components/Header";
import {UserContextProvider } from "./context/UserContext";
import {BrowserRouter} from 'react-router-dom';
import {PrivateRoutes, PublicRoutes} from "./navigation/RoutesNavigation";

const App=()=>{
  return (
    <BrowserRouter>
      <div className="App">
        <UserContextProvider>
          <Header/>
          <PublicRoutes/>
          <PrivateRoutes/>
        </UserContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
