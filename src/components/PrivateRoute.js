import { Route } from "react-router-dom";
import SignInScreen from "../screens/SignInScreen";

const PrivateRoute= ({component: Component, isAuth, ...others})=>{
    return (
      <Route
        {...others}
        render={(props) => isAuth
          ? <Component {...props}/>
          : <SignInScreen redirectTo={others.location.pathname}/>}
      />
    );
}

export default PrivateRoute;