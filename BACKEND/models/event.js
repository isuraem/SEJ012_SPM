const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
 
    eventid : {
        type : String,
        required : true,
        unique: true
    },
    
    customername : {
        type : String,
        maxlength: 100,
        required : true,
        
    },

    contactnumber : {
        type : Number,
        maxlength : 10 ,
        
    },

    nic : {
        type : String,
        required : true
    },

    customernic : {
        type : String,
        required : true
    },

    customeraddress : {
        type : String,
        maxlength : 200
    },

    packagename : {
        type : String,
        required : true
    },

    eventtype :{
        type : String,
        require : true
    },
    
    from : {
        type : String,
        required : true
    },

    to : {
        type : String,
        required : true
    },

    discount : {
        type : Number,
        required : true
    },
    advancedpayment : {
        type : Number,
        required : true
    },

    totalreservation : {
        type : Number,
        required : true
    },

    status : {
        type : String,
        enum: ['Pending', 'Completed'],
        required : true
    },

    penaltyDay: {
        type: Number

    },

    penaltyCharge: {
        type: Number
    },

    returnDay: {
        type: String
    }
    
     


    
})

const Event = mongoose.model("Event",eventSchema);

module.exports= Event;