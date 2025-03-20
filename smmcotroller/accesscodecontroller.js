
const mongoose = require('mongoose')
const AccessCode = require('../models/accesscode')

const getaccesscode = async (req, res) => {
    const accesscode = await AccessCode.find({}).sort({ createdAt: -1 })

    res.status(200).json(accesscode)
}

const addaccesscode = async (req, res) => {
    const { code } = req.body

    try {
        const accesscode = await AccessCode.create({ code })
        res.status(200).json(accesscode)

    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }

}


const deleteaccesscode = async (req, res) => {

    const id = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid ObjectId');
    }
    try {
        const accesscode = await AccessCode.findByIdAndDelete({ _id: id })
        res.status(200).json(accesscode)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }

}

module.exports = { getaccesscode, addaccesscode, deleteaccesscode }