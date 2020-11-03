import Header from "./components/Header";
import {BrowserRouter} from 'react-router-dom';
import {AppRoutes} from "./navigation/RoutesNavigation";

const App=()=>{
  return (
    <BrowserRouter>
      <div className="App">
          <Header/>
          <AppRoutes/>
      </div>
    </BrowserRouter>
  );
}

export default App;
