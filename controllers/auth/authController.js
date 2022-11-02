const AuthModel = require('../../Models/Auth/AuthModel')
const { JWT_SECRET, JWT_EXPIRE } = require('../../config')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { unHashingPassword } = require('../../helpers/Password')

// REGISTER REQUEST
// URL /api/auth/register
const authRegister = async (req, res) => {
    try {
        const newAuth = await AuthModel.create(req.body)
        res.status(201).json(newAuth)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// LOGIN REQUEST
// URL /api/auth/login
const authLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({ message: errors.errors[0].msg })
    }
    try {
        const auth = await AuthModel.findOne({ email: req.body.email })
        if (!auth) {
            return res.status(401).json({ message: "InValid Email" })
        }

        const hashedPassword = unHashingPassword(auth.password)
        if (req.body.password != hashedPassword) {
            return res.status(401).json({ message: 'Wrong Password' })
        }

        const TOKEN = jwt.sign({ id: auth._id, role: auth.role }, JWT_SECRET, { expiresIn: JWT_EXPIRE })
        const { password, ...others } = auth._doc;
        res.status(200).json({ ...others, TOKEN })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { authRegister, authLogin }

