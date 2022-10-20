const router = require("express").Router();
let Vehicle = require("../models/vehicleModel");
const moment = require('moment');
const { v4: uuidv4 } = require("uuid");


//add vehicle
router.route("/addVehicle").post((req, res) => {

    console.log("  file ", req.body)

    const VehicleID = uuidv4();
    const OwnerName = req.body.OwnerName;
    const OwnerNIC = req.body.OwnerNIC;
    const TeleNo = req.body.TeleNo;
    const Address = req.body.Address;
    const Email = req.body.Email;
    const Date = moment(req.body.Date).format('YYYY-MM-DD');
    const VehicleRegNo = req.body.VehicleRegNo;
    const VehicleModel = req.body.VehicleModel;
    const VehicleType = req.body.VehicleType;
    const VehicleBrand = req.body.VehicleBrand;
    const Mileage = req.body.Mileage;
    const InsType = req.body.InsType;
    const InsComName = req.body.InsComName;
    const Transmission = req.body.Transmission;
    const AirC = req.body.AirC;
    const NoOfSeats = req.body.NoOfSeats;
    const RatePDay = req.body.RatePDay;
    const YearsRent = req.body.YearsRent;
    // const vehPic = req.body.imgPath;
    // const vehDoc = req.body.vehDoc;

    const newVehicle = new Vehicle({

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
        // vehPic,
        // vehDoc
    })


    newVehicle.save().then(() => {
        console.log(req);
        res.json("Vehicle added");

    }).catch((err) => {
        console.log(err);
        return res.status(400).send({ status: "Vehicle already exist!" });
    })

})


//view vehicle details

router.route("/viewVehicle").get((req,res)=>{
    Vehicle.find().then((Vehicle)=>{
        res.json(Vehicle)
    }).catch((err)=>{
        console.log(err)
    })
})



//router for delete an Vehicle record
router.post("/deleteV", async (req, res) => {
    const VehID = req.body.VehicleID;
 console.log("hkugeiyagig",req.body);

    if (VehID) {
        const response = await Vehicle.findOneAndDelete({ VehicleID: VehID }).then(() => {
            return res.status(200).send({ status: "Success" });
        }).catch((err) => {
            console.log(err);
            return res.status(500).send({ status: "Internal Server Error" });
        })
    }else{
    return res.status(400).send({ status: "Invalid Request" });
    }

});


//update vehicle
router.route("/updateV/:id").put(async (req, res) => {


    let userId = req.params.id;
    console.log(userId);
    // console.log("upt data", req.body);
    const {
        VehicleID,
        VehicleRegNo,
        VehicleModel,
        VehicleType,
        VehicleBrand,
        InsType,
        InsComName,
        Transmission,
        AirC,
        NoOfSeats,
        RatePDay,
        YearsRent } = req.body;

    //const data = req.body;
    //D structure
    const updateVehicle = {
        VehicleID,
        VehicleRegNo,
        VehicleModel,
        VehicleType,
        VehicleBrand,
        InsType,
        InsComName,
        Transmission,
        AirC,
        NoOfSeats,
        RatePDay,
        YearsRent
    }

        console.log(">>>>>>>>>>>>>>>>>>>>;",updateVehicle);

    const update = await Vehicle.findByIdAndUpdate(userId, updateVehicle).then((response) => {
        console.log("llllllllllll",response);
        res.status(200).send({ status: "Vehicle Updated" })

    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Errror with updating data" })
    })
    console.log("update unoo...",update);

})


//vehile report router

router.route("/reportV/:dateFrom/:dateTo").get(async (req, res) => {

    console.log("report -----",req);

    const dateFrom = moment(req.params.dateFrom.trim()).format('YYYY-MM-DD');
    const dateTo = moment(req.params.dateTo.trim()).format('YYYY-MM-DD');
    

    console.log("report function", dateFrom, dateTo);



    Vehicle.find({
        $and: [{

            Date: { $gte: dateFrom, $lte: dateTo },
           


        }]

    }).then((vehicles) => {
        res.json(vehicles);
    }).catch((err) => {
        console.log(err);
    })



})


//searh records
router.route("/searchV").post(async (req, res) => {
    console.log("search data",req.body);
    let val = req.body.data.trim();
    let search = req.body.data;

    if (!isNaN(search)) {
        if (search < 11) {

            try {
                const response = await Vehicle.find({ YearsRent: { $regex: val + '$', $options: 'i' } });
                // console.log("search results", response);
                return res.status(200).send({ status: "Success", data: response });
            } catch (error) { 

                console.log("something went wrong!!");
                return { ok: flase };

            }


        }
        try {
            const response = await Vehicle.find({ VehicleRegNo: { $regex: '.*' + val + '.*', $options: 'i' } });
            // console.log("search results", response);
            return res.status(200).send({ status: "Success", data: response });
        } catch (error) {

            console.log("something went wrong!!");
            return { ok: flase };

        }

    } else if (isNaN(search)) {
        try {
            const response = await Vehicle.find({ VehicleRegNo: { $regex: '.*' + val + '.*', $options: 'i' } });

            if (response.length > 0) {
                return res.status(200).send({ status: "Success", data: response });
            }

        } catch (error) {

            console.log("something went wrong!!");
            return { ok: flase };

        }

    }

    try {
        const response = await Vehicle.find({ VehicleType: { $regex: '.*' + val + '.*', $options: 'i' } });
        if (response.length > 0) {
            return res.status(200).send({ status: "Success", data: response });
        }
        else {
            try {
                const response = await Vehicle.find({ VehicleModel: { $regex: '.*' + val + '.*', $options: 'i' } });
                if (response.length > 0) {
                    return res.status(200).send({ status: "Success", data: response });
                } else {
                    try {
                        const response = await Vehicle.find({ VehicleBrand: { $regex: '.*' + val + '.*', $options: 'i' } });
                        return res.status(200).send({ status: "Success", data: response });

                    } catch (err) {
                        console.log("something went wrong!!");
                        return { ok: flase };


                    }
                }

            } catch (err) {
                console.log("something went wrong!!");
                return { ok: flase };


            }
        }

    } catch (error) {

        console.log("something went wrong!!");
        return { ok: flase };

    }




})

router.route("/searchPerDayRentalPrice/:vehicle/:model").get((req, res) => {

    let val = req.params.vehicle.trim();
    let val1 = req.params.model.trim();


    //{$regex: "^" + val + ".*"}this will get to the value starting at the begining of list 
    Vehicle.find({ VehicleType: { $regex: ".*" + val + ".*", $options: 'i' } }).then((vehicles) => {
        //res.json(rentals)
        if (vehicles != null) {
            Vehicle.findOne({ VehicleModel: { $regex: "^" + val1 + ".*", $options: 'i' } }).then((vehicles) => {
                res.json(vehicles.RatePDay);

            })
                .catch((err) => {
                    console.log(err);

                })
        }

    }).catch((err) => {
        console.log(err);
    })


})


module.exports=router;