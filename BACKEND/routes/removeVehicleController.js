const router = require("express").Router();
let RemoveVehicle = require("../models/removeVehicleModel");


//add Removed vehicle

router.route("/addRemoveVehicle").post((req, res) => {

    console.log("incoming dataaaaaa", req.body)

    const VehicleID = req.body.data.VehicleID;
    const OwnerName = req.body.data.OwnerName;
    const OwnerNIC = req.body.data.OwnerNIC;
    const TeleNo = req.body.data.TeleNo;
    const Address = req.body.data.Address;
    const Email = req.body.data.Email;
    const Date = req.body.data.Date;
    const VehicleRegNo = req.body.data.VehicleRegNo;
    const VehicleModel = req.body.data.VehicleModel;
    const VehicleType = req.body.data.VehicleType;
    const VehicleBrand = req.body.data.VehicleBrand;
    const Mileage = req.body.data.Mileage;
    const InsType = req.body.data.InsType;
    const InsComName = req.body.data.InsComName;
    const Transmission = req.body.data.Transmission;
    const AirC = req.body.data.AirC;
    const NoOfSeats = req.body.data.NoOfSeats;
    const RatePDay = req.body.data.RatePDay;
    const YearsRent = req.body.data.YearsRent;
    const vehPic = req.body.data.vehPic;


    const newRemoveVehicle = new RemoveVehicle({

        VehicleID,
        OwnerName,
        OwnerNIC,
        TeleNo,
        Address,
        Email,
        Date,
        VehicleRegNo,
        VehicleModel,
        VehicleType,
        VehicleBrand,
        Mileage,
        InsType,
        InsComName,
        Transmission,
        AirC,
        NoOfSeats,
        RatePDay,
        YearsRent,
        vehPic

    })



    newRemoveVehicle.save().then(() => {
        console.log("dalete dataaaaaaaa", req);
        res.json("Vehicle added");

    }).catch((err) => {
        console.log("removed vehicle err", err);
    })

})

//view data vehicle
router.route("/viewRemove").get((req, res) => {
    console.log("view all Remove");
    RemoveVehicle.find().then((Vehicles) => {
        console.log("vehicles....",Vehicles);
        //send data as json object
        res.json(Vehicles)
    }).catch((err) => {
        console.log("ghfgghgvhkgfvchgd", err)
    })
})


module.exports = router;