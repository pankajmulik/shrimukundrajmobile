const mongoose = require('mongoose');

const accesscodeSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },

    created_at: { type: Date, default: Date.now }

})

const AccessCode = mongoose.model('AccessCode', accesscodeSchema)
module.exports = AccessCode