const mongoose = require('mongoose')
const express = require('express')
const dotenv = require('dotenv')
const app = express()
const PORT = 5000
const Customer = require('./models/customer')
const Farm = require('./models/farm')
const User = require('./models/user')
const { runMain } = require('module')
const cors = require('cors')

app.use(cors({
    origin: 'http://localhost:3000',
}));

// make sure I understand this
// app.use(express.urlencoded({ extended: false }))
app.use(express.json())


dotenv.config()


const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bvhiw.mongodb.net/eat-green-seattle?retryWrites=true&w=majority`;


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })


async function createAccount(accountInfo) {
    try{
        // check to see if these required fields are present
        // otherwise abort
        const user = await User.create({
            email: accountInfo.email,
            first_name: accountInfo.firstName,
            last_name: accountInfo.lastName,
            firebase_id: accountInfo.firebase_id,
            zipcode: accountInfo.zipcode,
            is_farm: accountInfo.is_farm,
            phone: accountInfo.phone,
            csa_id: accountInfo.csa_id
        })
        console.log(user)
    } catch (e) {
        console.log(e.message)
    }
}

async function createFarm(info) {
    try{
        const farm = await Farm.create({

            farm_name: info.farmName,
            first_name: info.firstName,
            last_name: info.lastName,
            email: info.email,
            // firebase_id: 
            address_1: info.address_1,
            address_2: info.address_2,
            city: info.city,
            state: info.state, 
            zipcode: info.zipcode,
            phone: info.phone,
            farm_bio: info.farm_bio,
            organic: info.organic,
            // csa_id: Number,
            // auth_uid: String,
            // email: accountInfo.email,
            // first_name: accountInfo.firstName,
            // last_name: accountInfo.lastName,
            // firebase_id: accountInfo.firebase_id

            // REACT definitions
            // farmName: '',
            // firstName: '', 
            // lastName: '', 
            // email: '', 
            // password: '',
            // address_1: '',
            // address_2: '',
            // city: '',
            // // HOW CAN I MAKE THIS A STATE DROPDOWN
            // state: '',
            // zipcode: '',
            // phone: '',
            // farm_bio: '',
            // organic: '',
            // firebase_id: '',
        })
        console.log(farm)
    } catch (e) {
        console.log(e.message)
    }
}

async function printName(body) {
    console.log(body.name)
}


async function getInfo(userEmail) {
    try {
        console.log(`inside route func: ${userEmail}`)
        const customer = await User.findOne({ email: userEmail}).exec();
        return customer
    } catch (e) {
        console.log(e.message)
        console.log('there has been an error')
    }
}

async function getFarmInfo(farm_id) {
    try {
        console.log(`inside getFarm route func: ${farm_id}`)
        const farm = await Farm.findOne({ _id: farm_id}).exec();
        // console.log(customer)
        // // return customer
        // return `I'm returning the email:${email}`
        return farm
    } catch (e) {
        console.log(e.message)
        console.log('there has been an error')
    }
}

async function getFarmByEmail(farm_email) {
    try {
        console.log(`inside getFarm route func: ${farm_email}`)
        const farm = await Farm.findOne({ email: farm_email}).exec();
        // console.log(customer)
        // // return customer
        // return `I'm returning the email:${email}`
        return farm
    } catch (e) {
        console.log(e.message)
        console.log('there has been an error')
    }
}

async function getAllFarms() {
    try {
        console.log(`inside getAllFarms route`)
        const farmArray = await Farm.find().exec();
        // console.log(customer)
        // // return customer
        // return `I'm returning the email:${email}`
        return farmArray
    } catch (e) {
        console.log(e.message)
        console.log('there has been an error')
    }
}

async function subscribeUser(farm_id, user_id) {
    try {
        console.log(`inside subscribeUser route func: ${farm_id}`)
        const updatedFarm = await Farm.updateOne({ _id: farm_id }, {
            // customers: user_id
            $push: { customers: [user_id] }
        })

        const updatedUser = await User.updateOne({ _id: user_id}, {
            farm: farm_id
        })
        return updatedFarm, updatedUser
    } catch (e) {
        console.log(e.message)
        console.log('there has been an error')
    }
    // console.log(updatedUser)
}

// getInfo()


app.get('/', (req, res) => {
    res.send('Eat Green Seattle!')
})

app.post('/', (req, res) => {
    console.log(req.body);
    res.status(201).send('Created user')
})

app.post('/create-account', (req, res) => {
    const body = req.body;
    createAccount(body)
    res.status(201).send('Account created!')
})

app.post('/new-farm', (req, res) => {
    const body = req.body;
    createFarm(body);
    res.status(201).send('Farm account created!')
})


app.post('/hi', (req, res) => {

    // const body = req.body;
    // const name = body.name;
    // res.status(200).send(`hello to ${name} from this GET route`)
    res.status(200).send(`hello from this GET route`)
})

app.post('/get-profile', async function(req, res) {
    const userEmail = req.body.email
    try {
        const userInfo = await getInfo(userEmail);
        console.log(userInfo)
        res.status(200).send(userInfo)
    } catch(err) {
        console.log(err)
        res.status(404).send(err)
    }
    
    // res.status(200).send('fun fun fun')

})

app.post('/get-farm', async function(req, res) {
    const id = req.body.id
    console.log(`req.body is ${req.body.id}`)
    try {
        const userInfo = await getFarmInfo(id);
        console.log(userInfo)
        res.status(200).send(userInfo)
    } catch(err) {
        console.log(err)
        res.status(404).send(err)
    }
    
    // res.status(200).send('fun fun fun')

})

app.get('/get-farm', async function(req, res) {
    // const id = req.body.id
    try {
        // const userInfo = await getFarmInfo(id);
        // console.log(userInfo)
        console.log('getting your farm!')
        res.status(200).send('one farm profile on its way!')
    } catch(err) {
        console.log(err)
        res.status(404).send(err)
    }
    
    // res.status(200).send('fun fun fun')

})

app.post('/get-farm-email', async function(req, res) {
    const email = req.body.email
    try {
        // const userInfo = await getFarmInfo(id);
        // console.log(userInfo)
        const farmInfo = await getFarmByEmail(email);
        console.log('getting your farm!')
        res.status(200).send(farmInfo)
    } catch(err) {
        console.log(err)
        res.status(404).send(err)
    }
    
    // res.status(200).send('fun fun fun')

})


app.get('/get-all-farms', async function(req, res) {
    try {
        const farmsArray = await getAllFarms();
        // console.log(farmsArray) 
        res.status(200).send(farmsArray)
    } catch (err){
        console.log(err)
        res.status(404).send(err)
    }
})

app.post('/subscribe', async function(req, res) {
    try {
        const farm_id = req.body.farm
        const user_id = req.body.user
        // add customer to Farm's customers array
        const updates = await subscribeUser(farm_id, user_id);
        res.status(200).send(updates)
    } catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

 
app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
})