const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RemovedEmployeeSchema = new Schema({
    Name : {
        type : String
    },
    Address : {
        type : String
    },
    NIC : {
        type : String
    },
    DOB : {
        type : String
    },
    Phone : {
        type : String
    },
    Email : {
        type : String
    },
    Gender : {
        type : String
    },
    JoiningDate : {
        type : String
    },
    Designation : {
        type : String
    },
    // Photo : {
    //     type : File
    // },
    // CV : {
    //     type : File
    // }
})

const RemovedEmployee = mongoose.model("RemovedEmployee" , RemovedEmployeeSchema);

module.exports = RemovedEmployee;