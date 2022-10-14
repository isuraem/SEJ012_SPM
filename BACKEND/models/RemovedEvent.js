const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const removedeventSchema = new Schema({

    eventid : {
        type : String
    },
    
    customername : {
        type : String
    },

    contactnumber : {
        type : Number
    },


    customernic : {
        type : String
    },

    customeraddress : {
        type : String
    },

    packagename : {
        type : String
    },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

    eventtype :{
        type : String
    },
    
    from : {
        type : String
    },

    to : {
        type : String
    },

    discount : {
        type : Number
    },
    advancedpayment : {
        type : Number
    },

    totalreservation : {
        type : Number
    },

    status : {
        type : String
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

const RemovedEvent = mongoose.model("RemovedEvent", removedeventSchema);

module.exports = RemovedEvent;