import React from 'react'
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";

import AddVehicle from './components/vehicleManagement/vehicleAdd';
import vehicleList from './components/vehicleManagement/vehicleList';
import DeletedList from './components/vehicleManagement/deletedList';
import VehicleReport from './components/vehicleManagement/VehicleReport';

// Adding event
import Event from "./components/eventReservationManagement/Event";
import ViewEvent from "./components/eventReservationManagement/viewEvent";
import EventReport from "./components/eventReservationManagement/EventReport";
import DeleteRecord from "./components/eventReservationManagement/DeleteRecord"

import RentalPlacement from "./components/rentalManagement/rentalPlacement"
import rentalList from "./components/rentalManagement/rentalList"

//employee management
import AddEmployee from "./components/employeeManagement/AddEmployee";
import AllEmployee from "./components/employeeManagement/AllEmployee";
import UpdateEmployee from "./components/employeeManagement/UpdateEmployee";
import RemovedEmployee from "./components/employeeManagement/RemovedEmployee";

import Footer from './Footer';
import login from './components/login'
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

            <Route path="/addRental" exact component={RentalPlacement} />
            <Route path="/rentalList" exact component={rentalList} />
            
            {/*  */}
            <Route path="/addEvent" exact>
            <Event />
            </Route>
            <Route path="/viewEvent">
            <ViewEvent />
            </Route>
            <Route path="/reservation/report">
            <EventReport />
            </Route>
            <Route path="/display/RemoveEventlist">
            <DeleteRecord />
            </Route>
            
            <Route path="/addEmp" exact component={AddEmployee} />
            <Route path="/allEmp" exact component={AllEmployee}/>
            <Route path="/updateEmp" exact component={UpdateEmployee}/>
            <Route path="/REmp" exact component={RemovedEmployee}/>

            </Switch>
            <Footer></Footer>
        </Router>
       


    </div>
  )
}
