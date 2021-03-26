import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { LoggedInUserContext } from '../../App';

const PrivateRoute = ({children, ...rest}) => {
    const loggedInUser = useContext(LoggedInUserContext)[0];
    return (
        <div>
            <Route
                {...rest}
                render={({ location }) =>
                    loggedInUser.email ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        </div>
    );
};

export default PrivateRoute;