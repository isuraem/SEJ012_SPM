import "./App.css";
import AddEmployee from "./components/employeeManagement/AddEmployee";
import AllEmployee from "./components/employeeManagement/AllEmployee";
import {BrowserRouter as Router,Route} from "react-router-dom"
import Footer from "./Footer";

function App() {
  return( 
    <Router>
      <div className="App">
        <Route path="/addEmp" exact component={AddEmployee} />
        <Route path="/allEmp" exact component={AllEmployee}/>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
