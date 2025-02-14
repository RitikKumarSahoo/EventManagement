import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import joi from "joi"
import authSchema from '../lib/validators.js'

const auth = {
    async login(req, res) {
        try {
            const { email, password } = req.body

            // if (email === undefined) {
            //     return res.status(400).json({ error: true, reason: "Field 'email' is required" })
            // }

            // if (password === undefined) {
            //     return res.status(400).json({ error: true, reason: "Field 'password' is required" })
            // }

            // const unsupportedDomains = ['yahoo.com', 'outlook.com'];
            // const emailDomain = email.split('@')[1];
            // if (unsupportedDomains.includes(emailDomain)) {
            //     return res.status(400).json({
            //         error: true,
            //         reason: `Emails from ${emailDomain} are not supported. Please use a different email provider.`,
            //     });
            // }

            const { error, value } = await authSchema.validateAsync(req.body)



            const user = await User.findOne({ email: email })

            if (user === null) {
                return res.status(400).json({ error: false, reason: "user not found" })
            }
            await user.comparePassword(password)

            const payload = {
                _id: user._id,
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                isAdmin: user.isAdmin === true
            }


            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 * 24 * 30 })

            return res.status(200).json({ error: false, token })
        } catch (error) {
            return res.status(500).json({
                error: true,
                reason: error.message,
            })
        }
    }
}

export default auth