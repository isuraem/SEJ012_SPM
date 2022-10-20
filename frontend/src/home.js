import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Event from "./components/eventReservationManagement/Event";
import ViewEvent from "./components/eventReservationManagement/viewEvent";
import EventReport from "./components/eventReservationManagement/EventReport";
import Footer from "./Footer";

function Home() {
  return (
    <Router>
      <Switch>
        <Route path="/addEvent" exact>
          <Event />
        </Route>
        <Route path="/viewEvent" exact>
          <ViewEvent />
        </Route>
        <Route path="/reservation/report">
          <EventReport />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default Home;
