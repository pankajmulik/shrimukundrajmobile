
require('dotenv').config();

const UserAdmin = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const moment = require('moment');
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = require('twilio')(accountSid, authToken);


const secretKey = 'dil chahata hai hum na rahe kabhi yaaro ke bin';

// Generate a JWT token
const generateToken = (user) => {
    const payload = {
        sub: user._id,
        name: user.name,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(1, 'hour').unix() // Token expires in 1 hour
    };
    return jwt.encode(payload, secretKey);
};

// Get all users
const getUser = async (req, res) => {
    try {
        const users = await UserAdmin.find({}).sort({ createdAt: -1 });

        if (!users || users.length === 0) {
            return res.status(400).json({ error: "No users found" });
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Add user
const addUser = async (req, res) => {
    const { email, password, name, mobilenumber } = req.body;

    if (!email || !password || !name || !mobilenumber) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const existingUser = await UserAdmin.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new UserAdmin({ email, password, name, mobilenumber });
        await newUser.save();
        const token = generateToken(newUser);
        res.status(201).json({ success: true, token, user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Server error', message: error.message });
    }
};

// Verify user
const verifyUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await UserAdmin.findOne({ email });
        if (user && user.password === password) {
            const token = generateToken(user);
            return res.status(200).json({ success: true, token, user });
        } else {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
    } catch (error) {
        res.status(500).json({message: error.message });
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ObjectId' });
    }

    try {
        const updatedUser = await UserAdmin.findByIdAndUpdate(
            id,
            {
                email: req.body.email,
                mobilenumber: req.body.mobilenumber,
                name: req.body.name,
                password: req.body.password
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Server error", message: error.message });
    }
};

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        try {
            const decoded = jwt.decode(token, secretKey);
            if (decoded.exp <= moment().unix()) {
                return res.status(401).json({ message: 'Token has expired' });
            }
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }
};


const sendverificationcode = async (req, res) => {
    const { phoneNumber } = req.body;

    client.verify.v2.services(accountSid)
        .verifications
        .create({ to: phoneNumber, channel: 'sms' })
        .then(verification => res.status(200).json({ success: true, verification }))
        .catch(error => res.status(500).json({ success: false, error: error.message }));
}


const verifycode = async (req, res) => {
    const { phoneNumber, code } = req.body;

    client.verify.v2.services(accountSid)
        .verificationChecks
        .create({ to: phoneNumber, code })
        .then(verification_check => {
            if (verification_check.status === 'approved') {
                res.status(200).json({ success: true });
            } else {
                res.status(400).json({ success: false, error: 'Invalid code' });
            }
        })
        .catch(error => res.status(500).json({ success: false, error: error.message }));
}



module.exports = { updateUser, getUser, addUser, verifyUser,authenticateJWT , verifycode,sendverificationcode};
