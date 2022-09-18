const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    Name : {
        type : String,
        required : true 
    },
    Address : {
        type : String,
        required : true
    },
    NIC : {
        type : String,
        required : true 
    },
    DOB : {
        type : String,
        required : true 
    },
    Phone : {
        type : String,
        required : true 
    },
    Email : {
        type : String,
        required : true 
    },
    Gender : {
        type : String,
        required : true 
    },
    JoiningDate : {
        type : String,
        required : true 
    },
    Designation : {
        type : String,
        required : true 
    },
    // Photo : {
    //     type : File,
    //     required : true 
    // },
    // CV : {
    //     type : File,
    //     required : true 
    // }
})

const Employee = mongoose.model( "Employee",EmployeeSchema);

module.exports = Employee;