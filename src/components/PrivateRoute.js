import { Redirect, Route } from "react-router-dom";

const PrivateRoute= ({component: Component, isAuth, ...others})=>{
    return (
      <Route
        {...others}
        render={(props) => isAuth
          ? <Component {...props}/>
          : <Redirect to={{pathname:'/errorauth', state:{from: props.location}}}/>}
      />
    );
}

export default PrivateRoute;