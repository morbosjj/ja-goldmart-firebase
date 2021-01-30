import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDataContext } from '../Context';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useDataContext();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to='/admin/login' />
        );
      }}
    ></Route>
  );
};

export default PrivateRoute;
