const router = require("express").Router();
let RemovedEmployee = require("../models/RemovedEmployee");

//Removed employee adding
router.route("/addRemovedEmp").post(async(req,res) => {
    console.log("removed Employee", req.body)

    const Name = req.body.Name;
    const Address = req.body.Address;
    const NIC = req.body.NIC;
    const DOB = req.body.DOB;
    const Phone = req.body.Phone;
    const Email = req.body.Email;
    const Gender = req.body.Gender;
    const JoiningDate = req.body.JoiningDate;
    const Designation = req.body.Designation;
    // const Photo = req.body.Photo;
    // const CV = req.body.CV;

    const newRemovedEmployee = await new RemovedEmployee({
        Name,
        Address,
        NIC,
        DOB,
        Phone,
        Email,
        Gender,
        JoiningDate,
        Designation,
        // Photo,
        // CV
    })

    newRemovedEmployee.save().then(() => {
        res.json("Removed Employee Addeed")
    }).catch((err)=>{
        console.log("Removed Emp Err", err);
    })
})

//get removed employees
router.route("/allREmp").get((req,res)=>{
    RemovedEmployee.find().then((removedEmployees)=>{
        res.json(removedEmployees)
    }).catch((err)=>{
        console.log("REmp getting err",err)
    })
})

module.exports = router;