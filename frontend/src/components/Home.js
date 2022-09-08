import React from 'react'
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";


import { vehicleAdd } from './vehicleManagement/vehicleAdd';

export const Home = () => {
  return (
    <div>
        <Router>
            <Switch>
            <Route path="/vehicle/addVehicle" exact component={vehicleAdd} />
            </Switch>
        </Router>
       


    </div>
  )
}
