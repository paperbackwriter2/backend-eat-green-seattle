const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// possibility for nested schemas
const addressSchema = new mongoose.Schema({
    street: String,
    city: String
})
// Define a schema

// const Schema = mongoose.Schema;

const FarmSchema = new mongoose.Schema({
    farm_name: {
        type: String,
        required: true,
        // minlength: 6
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
    email: {
        type: String,
        required: true,
        // minlength: 6
        // lowercase: true
    },
    firebase_id: {
        type: String,
        // required: true
    },
    address_1: {
        type: String,
        required: true,
        // minlength: 6
        // lowercase: true
    },
    address_2: {
        type: String,
        // required: true,
        // minlength: 6
        // lowercase: true
    },
    city: String,
    state: String, 
    zipcode: {
        type: Number,
    },
    phone: Number,
    farm_bio: {
        type: String,
        // minLength: 15
    },
    organic: {
        type: Boolean,
        required: false
    },
    // csa_id: Number,
    auth_uid: String,
    created_at: {
        type: Date,
        // this would only run once, basically static
        // default: new Date()
        default: () => Date.now()
    },
    customer_id: [],
    max_shares: Number,
    user_id: String,
    products: [],
    season_start: String,
    season_end: String,
    customers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
    // address: addressSchema
})

// Compile model from schema
// 
module.exports = mongoose.model('Farm', FarmSchema) 

