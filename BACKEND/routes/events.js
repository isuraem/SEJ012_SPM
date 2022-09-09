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


module.exports = router;