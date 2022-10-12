import React from 'react'
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";


import AddVehicle from './vehicleManagement/vehicleAdd';
import vehicleList from './vehicleManagement/vehicleList';
import DeletedList from './vehicleManagement/deletedList';
import Footer from '../Footer';

export const Home = () => {
  return (
    <div>
        <Router>
            <Switch>
            <Route path="/vehicle/addVehicle" exact component={AddVehicle} />
            <Route path = "/vehicle/viewVehicle" exact component={vehicleList}/>
            <Route path = "/vehicle/view" exact component={DeletedList}/>
            </Switch>
            <Footer></Footer>
        </Router>
       


    </div>
  )
}
