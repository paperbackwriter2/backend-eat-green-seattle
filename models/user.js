const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// possibility for nested schemas
const addressSchema = new mongoose.Schema({
    street: String,
    city: String
})
// Define a schema

// const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 6
        // lowercase: true
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    firebase_id: {
        type: String,
        // required: true
    },
    zipcode: {
        type: Number,
    },
    is_farm: {
        type: Boolean,
        // required: true
    },
    phone: Number,
    csa_id: Number,
    // farm_id: Number,
    // auth_uid: String,
    created_at: {
        type: Date,
        // this would only run once, basically static
        // default: new Date()
        default: () => Date.now(),
    },
    farm: {
        type: Schema.Types.ObjectId,
        ref: "Farm"
    }
    // address: addressSchema
})

// Compile model from schema
// 
module.exports = mongoose.model('User', UserSchema) 

