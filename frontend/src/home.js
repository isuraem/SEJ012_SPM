import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Event from "./components/eventReservationManagement/Event";
import ViewEvent from "./components/eventReservationManagement/viewEvent";
import EventReport from "./components/eventReservationManagement/EventReport";
import RemovedEvent from "./components/eventReservationManagement/DeleteRecord"
import Footer from "./Footer";

function Home() {
  return (
    <Router>
      <Switch>
        <Route path="/addEvent" >
          <Event />
        </Route>
        <Route path="/viewEvent">
          <ViewEvent />
        </Route>
        <Route path="/reservation/report">
          <EventReport />
        </Route>
        <Route path="/diplay/RemoveEventlist">
          <RemovedEvent />
        </Route>

      </Switch>
      <Footer />
    </Router>
  );
}

export default Home;
