import React from 'react'
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";


import AddVehicle from './vehicleManagement/vehicleAdd';
import vehicleList from './vehicleManagement/vehicleList';
export const Home = () => {
  return (
    <div>
        <Router>
            <Switch>
            <Route path="/vehicle/addVehicle" exact component={AddVehicle} />
            <Route path = "/vehicle/viewVehicle" exact component={vehicleList}/>
            </Switch>
        </Router>
       


    </div>
  )
}
