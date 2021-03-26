import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NotFound from './components/NotFound/NotFound';
import Destination from './components/Destination/Destination';
import { createContext, useState } from 'react';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const VehicleTypeContext = createContext();
export const LoggedInUserContext = createContext();

function App() {
  const [vehicleType, setVehicleType] = useState('car');
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <VehicleTypeContext.Provider value={[vehicleType, setVehicleType]}>
      <LoggedInUserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <Switch>
            <Route path="/home">
              <Home></Home>
            </Route>
            <PrivateRoute path='/destination'>
              <Destination></Destination>
            </PrivateRoute>
            <Route path='/login'>
              <Login></Login>
            </Route>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </LoggedInUserContext.Provider>
    </VehicleTypeContext.Provider>
  );
}

export default App;
