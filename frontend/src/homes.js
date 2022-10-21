import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import RentalPlacement from "./components/rentalManagement/rentalPlacement"
import rentalList from "./components/rentalManagement/rentalList"
import Footer from "./Footer";



function Homes() {
    return (
        <Router>
            <Switch>
                
                <Route path="/addRental" exact component={RentalPlacement} />
                <Route path="/rentalList" exact component={rentalList} />
                
            </Switch>
            <Footer/>
        </Router>
    );
}

export default Homes;
