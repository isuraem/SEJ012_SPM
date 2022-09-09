import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Event from "./components/eventReservationManagement/Event";
import ViewEvent from "./components/eventReservationManagement/viewEvent";

function Home() {
  return (
    <Router>
      <Switch>
        <Route path="/addEvent" exact component={Event} />
        <Route path="/viewEvent" exact component={ViewEvent}   />
      
      </Switch>
    </Router>
  );
}

export default Home;
