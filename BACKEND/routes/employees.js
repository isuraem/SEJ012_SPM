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

//update employee
router.route("/updateEmp/:id").put(async(req,res)=>{
    let empId = req.params.id;
    const{Name,Address,NIC,DOB,Phone,Email,Gender,JoiningDate,Designation} = req.body;

    const updateEmployee = {
        Name,
        Address,
        NIC,
        DOB,
        Phone,
        Email,
        Gender,
        JoiningDate,
        Designation
    }

    await Employee.findByIdAndUpdate(empId,updateEmployee).then((employee)=>{
        res.json(employee)
    }).catch((err)=>{
        console.log(err)
    })
})

//delete employee
router.route("/deleteEmp").post(async(req,res)=>{
    let empId = req.body._id;

    await Employee.findByIdAndDelete(empId).then((employee)=>{
        res.json(employee)
    }).catch((err)=>{
        console.log(err)
    })
})


//employee report
router.route("/empReport/:JoiningDate").get(async (req, res) => {

    console.log("employee report",req);
    let JoiningDate = isMoment(req.params.JoiningDate.trim()).format('YYYY-MM-DD');

    // const dateFrom = moment(req.params.dateFrom.trim()).format('YYYY-MM-DD');
    // const dateTo = moment(req.params.dateTo.trim()).format('YYYY-MM-DD');
    
    console.log("report function", JoiningDate);

    Employee.find({
        $and: [{

            JoiningDate: { $gte: JoiningDate },
           
        }]

    }).then((employee) => {
        res.json(employee);
    }).catch((err) => {
        console.log(err);
    })

})


module.exports = router;