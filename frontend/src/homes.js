import React from 'react'
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";


import AddVehicle from './components/vehicleManagement/vehicleAdd';
import vehicleList from './components/vehicleManagement/vehicleList';
import DeletedList from './components/vehicleManagement/deletedList';
import VehicleReport from './components/vehicleManagement/VehicleReport';

import Event from "./components/eventReservationManagement/Event";

import ViewEvent from "./components/eventReservationManagement/viewEvent";

import EventReport from "./components/eventReservationManagement/EventReport";
import login from './components/login'
import Footer from './Footer';

export const Homes = () => {
  return (
    <div>
        <Router>
            <Switch>
            {/* Mew */}
            <Route path="/vehicle/addVehicle" exact component={AddVehicle} />
            <Route path = "/vehicle/viewVehicle" exact component={vehicleList}/>
            <Route path = "/vehicle/view" exact component={DeletedList}/>
            <Route path = "/vehicle/viewVehicleReport" exact component={VehicleReport}/>
            <Route path = "/" exact component={login}/>

            <Route path="/addEvent" exact>

            <Event />

            </Route>

            <Route path="/viewEvent">

            <ViewEvent />

            </Route>

            <Route path="/reservation/report">

            <EventReport />

            </Route>
            
            </Switch>
            <Footer></Footer>
        </Router>
       


    </div>
  )
}
