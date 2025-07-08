import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = ({component: Component, ...rest}) => {
  localStorage.clear();
    return (
        <Route
            {...rest}
            // render={props => {
            //     return !getToken() ? <Component {...props} />
            //     : <Redirect to={{ pathname: "/Home/Home"}} />
            // }}
            render={props => {
              return <Redirect to={{ pathname: "/Executive/Index"}} />
          }}
        />
    )
}

export default PublicRoute;
