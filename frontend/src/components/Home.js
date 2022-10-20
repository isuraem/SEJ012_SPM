import React from 'react'
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";


import AddVehicle from './vehicleManagement/vehicleAdd';
import vehicleList from './vehicleManagement/vehicleList';
import DeletedList from './vehicleManagement/deletedList';
import VehicleReport from './vehicleManagement/VehicleReport';
import Footer from '../Footer';

export const Home = () => {
  return (
    <div>
        <Router>
            <Switch>
            <Route path="/vehicle/addVehicle" exact component={AddVehicle} />
            <Route path = "/vehicle/viewVehicle" exact component={vehicleList}/>
            <Route path = "/vehicle/view" exact component={DeletedList}/>
            <Route path = "/vehicle/viewVehicleReport" exact component={VehicleReport}/>
            </Switch>
            <Footer></Footer>
        </Router>
       


    </div>
  )
}
