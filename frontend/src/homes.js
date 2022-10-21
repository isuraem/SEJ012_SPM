import React from 'react';
import AddEmployee from "./components/employeeManagement/AddEmployee";
import AllEmployee from "./components/employeeManagement/AllEmployee";
import UpdateEmployee from "./components/employeeManagement/UpdateEmployee";
import RemovedEmployee from "./components/employeeManagement/RemovedEmployee";
import {BrowserRouter as Router,Route} from "react-router-dom"
import Footer from "./Footer";

function Homes() {
    return( 
        <div className="App">
      <Router>
        
          <Route path="/addEmp" exact component={AddEmployee} />
          <Route path="/allEmp" exact component={AllEmployee}/>
          <Route path="/updateEmp" exact component={UpdateEmployee}/>
          <Route path="/REmp" exact component={RemovedEmployee}/>
        
        <Footer/>
      </Router>
      </div>
    );
  }
  
  export default Homes;