const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(express.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});




const connection = mongoose.connection;
//connect database
connection.once("open", () => {
  console.log("mongodb Connection Sucess !");
});

//Event_Routes
const eventRouter = require("./routes/events.js");
app.use("/event", eventRouter);
//Event_Routes_removed
// const vehicleRouter = require("./routes/vehicleController");
// app.use("/vehicle", vehicleRouter);

const removedEventRouter = require("./routes/removedReservation");
app.use("/removedEvent", removedEventRouter);


 
 app.listen(PORT, () => {
    console.log(`server is up and running on porT: ${PORT}`);
})

const removedEventRouter = require("./routes/removedReservation");
app.use("/removedEvent", removedEventRouter);

//Vehicle_Routes
const vehicleRouter = require("./routes/vehicles.js");
app.use("/vehicle", vehicleRouter);

const vehicleRemoveRouter = require("./routes/removeVehicleController.js");
app.use("/vehicleRemove", vehicleRemoveRouter);
