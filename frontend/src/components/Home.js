import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import RentalPlacement from "./rentalManagement/rentalPlacement"
import rentalList from "./rentalManagement/rentalList"
import Footer from "./Footer";



function Home() {
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

export default Home;
