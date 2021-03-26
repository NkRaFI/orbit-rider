import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { LoggedInUserContext } from '../../App';

const PrivateRoute = ({children, ...rest}) => {
    const [loggedInUser, setLoggedInUser] = useContext(LoggedInUserContext);
    console.log(setLoggedInUser);
    return (
        <div>
            <Route
                {...rest}
                render={({ location }) =>
                    loggedInUser.name || loggedInUser.email ? (
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