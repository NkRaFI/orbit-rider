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

export const VehicleTypeContext = createContext();

function App() {
  const [vehicleType, setVehicleType] = useState('car');
  return (
    <VehicleTypeContext.Provider value={[vehicleType, setVehicleType]}>
      <Router>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path='/destination'>
            <Destination></Destination>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </VehicleTypeContext.Provider>
  );
}

export default App;
