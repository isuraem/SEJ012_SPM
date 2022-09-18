const router = require("express").Router();
let Employee = require("../models/Employee");

//insert employee
router.route("/addEmp").post(async(req,res)=>{

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

   const newEmployee = await new Employee({
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

   newEmployee.save().then(()=>{
        res.json("Employee Added")
   }).catch((err)=>{
        console.log(err);
   })

})


//get employees
router.route("/allEmp").get((req,res)=>{
    Employee.find().then((employees)=>{
        res.json(employees)
    }).catch((err)=>{
        console.log(err)
    })
})


//get one employee
router.route("/getEmp/:id").get(async(req,res)=>{
    let empId = req.params.id;

    await Employee.findById(empId).then((employee)=>{
        res.json(employee)
    }).catch((err)=>{
        console.log(err)
    })
})


module.exports = router;