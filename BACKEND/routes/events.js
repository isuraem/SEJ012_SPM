const router = require("express").Router();
let Event = require("../models/event");
const { v4: uuidv4 } = require("uuid");
const { Router } = require("express");
const isMoment = require("moment");

router.route("/addEvent").post((req, res)=> {

    const eventid = uuidv4();
    const customername = req.body.customername;
    const contactnumber = Number(req.body.contactnumber);
    const nic = req.body.nic;
    const customernic = req.body.customernic;
    const customeraddress = req.body.customeraddress;
    const packagename = req.body.packagename;
    const eventtype = req.body.eventtype;
    const from = isMoment(req.body.from).format('YYYY-MMMM-DD');
    const to = isMoment(req.body.to).format('YYYY-MMMM-DD');
    const discount = Number(req.body.discount);
    const advancedpayment = Number(req.body.advancedpayment);
    const totalreservation = Number(req.body.totalreservation);
    const status = req.body.status;

    const newEvent = new Event({
        eventid,
        customername,
        contactnumber,
        nic,
        customernic,
        customeraddress,
        packagename,
        eventtype,
        from,
        to,
        discount,
        advancedpayment,
        totalreservation,
        status
    })
    console.log(newEvent);

    newEvent.save().then(()=>
    {
        res.status(200).send({ message: "Event Added Sucsessfully"})
    }).catch((err) => {
        res.status(200).send({ message: "Error Event added", error: err.message});
    })
}
)
router.route("/displayEvent").get((req, res) => {
    Event.find().then((Event) => {
        res.json(Event)
    }).catch((err) => {
        console.log(err);
    })
})



//To retrieve the reservation details of a specific reservation id 
router.route("/getEvent/:RID").get(async (req, res) => {

    let RID = req.params.RID;

    const events = await Event.findOne({ eventid: RID })
        .then((events) => {
            if (events != null) {
                res.status(200).send({ status: "Event fetched", events: events })

            } else {
                res.status(500).send({ status: "Error with get Event", error: err.message });

            }
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get Event", error: err.message });
        })

})

//to delete a specific reservation from database
router.route("/deleteEvent").post(async (req, res) => {
    let RID = req.body.eventid; //Reservation ID taken from frontend

    await Event.findOneAndDelete({ eventid: RID })
        .then(() => {
            res.status(200).send({ status: "Event Record deleted" });
        }).catch(() => {
            console.log(err);
            res.status(500).send({ status: "Error with deleting Event record", error: err.message });
        })
})

//to update the Event details
router.route("/updateEvent/:RID").put(async (req, res) => {

    let RID = req.params.RID;

    //we have to fetch the new updating details coming from the front end here-new feature called d structure

    const {
        eventid,
        customername,
        contactnumber,
        nic,
        customernic,
        customeraddress,
        packagename,
        eventtype,
        from,
        to,
        discount,
        advancedpayment,
        totalreservation,
        status,
        penaltyDay,
        penaltyCharge,
        returnDay

    } = req.body;//we call this as dStructure

    const updateEvent = {
        //eventid,
        RID,
        customername,
        contactnumber,
        nic,
        customernic,
        customeraddress,
        packagename,
        eventtype,
        from,
        to,
        discount,
        advancedpayment,
        totalreservation,
        status,
        penaltyDay,
        penaltyCharge,
        returnDay
    }//create a object containing the data that needs to be updated

    //we have to pass the primary key and then value to be passed
    const updateEven = await Event.findOneAndUpdate({ eventid: RID }, updateEvent)
        .then(() => {
            res.status(200).send({ status: "Event Record updated" })//sending details of the updated data back to front end
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Server error Error with updating data", error: err.message });
        })
})

//this route is used to find the latest three Event to display on dashboard
router.route("/getLatestEventOnly").get(async (req, res) => {

    const Event = await Event.find().sort({ _id: -1 }).limit(3)
        .then((Event) => {
            res.json(Event);
        }).catch(() => {
            console.log(err.message);
            res.status(500).send({ status: "Server error with retrieving Event Record", error: err.message });
        })

})

//To get the count of the pending reservation records
router.route("/pendingEventCount").get((req, res) => {

    Event.find({ status: /pending/ }).count().then((result) => {
        res.json(result);

    }).catch((err) => {
        console.log(err);
    })

})

//search by customer nic given on search box
router.route("/searchEventRecs/:customernic").get((req, res) => {

    let val = req.params.customernic.trim();

    Event.find({ customernic: { $regex: "^" + val + ".*", $options: 'i' } }).then((Event) => {
        res.json(Event);

    })
        .catch((err) => {
            console.log(err);

        })
})

//to search for an Event record based on package name
router.route("/searchEventRecordsX/:rVal").get((req, res) => {

    let val = req.params.rVal.trim();

    Event.find({ packagename: { $regex: ".*" + val + ".*", $options: 'i' } }).then((Event) => {
        res.json(Event)

    }).catch((err) => {
        console.log(err);
    })

})


//seach completed rental records to delete from lest
router.route("/searchCompletedEventRecords").get((req, res) => {

    let val = "completed";

    Event.find({ status: { $regex: ".*" + val + ".*", $options: 'i' } }).then((Event) => {
        res.json(Event)

    }).catch((err) => {
        console.log(err);
    })

})

//to search for the list of Event records on the current
router.route("/VehiclesEventToday").get((req, res) => {

    let val = isMoment().format('YYYY-MMMM-DD');

    let status = "Pending"

    Event.count({ $and: [{ from: { $regex: "^" + val + ".*" }, status: { $regex: "^" + status + ".*" } }] }).then((Event) => {
        res.json(Event);

    })
        .catch((err) => {
            console.log(err);
        })
})

/******functions to be used within the report handling*******/
router.route("/generateReport/:rFrom/:rTo/:rPackageType/:rEventType").get((req, res) => {

    let rFrom = isMoment(req.params.rFrom.trim()).format('YYYY-MMMM-DD');
    let rTo = isMoment(req.params.rTo.trim()).format('YYYY-MMMM-DD');
    let rPackageType = req.params.rPackageType;
    let rEventType = req.params.rEventType;
    let status = "Pending";

    console.log("resuest", req.params);
    console.log("dates", rFrom)

    if (rPackageType == "null" && rEventType == "null") {
        Event.find({
            $and: [{
                from: { $gte: rFrom },
                to: { $lte: rTo },
                status: { $regex: "^" + status + ".*" },
            }]
        })
            .then((Event) => {
                res.json(Event);
            })
            .catch((err) => {
                console.log(err);
            })
    } else if (rPackageType == "null") {
        Event.find({
            $and: [{
                from: { $gte: rFrom },
                to: { $lte: rTo },
                eventtype: { $regex: ".*" + rEventType + ".*" },
                status: { $regex: "^" + status + ".*" },
            }]
        })
            .then((Event) => {
                res.json(Event);
            })
            .catch((err) => {
                console.log(err);
            })

    } else if (rEventType == "null") {
        Event.find({
            $and: [{
                from: { $gte: rFrom },
                to: { $lte: rTo },
                packagename: { $regex: "^" + rPackageType + ".*" },
                status: { $regex: "^" + status + ".*" },
            }]
        })
            .then((Event) => {
                res.json(Event);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    else {

        Event.find({
            $and: [{
                from: { $gte: rFrom },
                to: { $lte: rTo },
                packagename: { $regex: "^" + rPackageType + ".*" },
                eventtype: { $regex: ".*" + rEventType + ".*" },
                status: { $regex: "^" + status + ".*" },
            }]
        })
            .then((Event) => {
                res.json(Event);
            })
            .catch((err) => {
                console.log(err);
            })
    }
})


module.exports = router;