const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({

    name: {
        type: 'string',
        required: true
    },
    phone:{
        type: 'string',
        required: true
    },
    
    tokens:[{
        token:{
            type: String,
            required:true,
        }
    }]
})

const Employee=mongoose.model("Employee",employeeSchema);
module.exports = Employee;