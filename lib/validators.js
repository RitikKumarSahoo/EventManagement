import joi from "joi"

const authSchema = joi.object({

    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .lowercase()
        .required()
        .messages({
            "any.required": "Email is required",
            "string.email":"Invalid email format",
            "string.empty": "Email is not allowed to be empty"
        }),

    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    confirmPassword: joi.string().valid(joi.ref('password')).required().messages({
            'any.only': 'Passwords must match',
            'any.required': 'confirmPassword is required'

            
          }),

    repeat_password: joi.ref('password'),

    access_token: [
        joi.string(),
        joi.number()
    ],

    status: joi.string()
        .valid("active")
        .valid("inactive")
        .optional()
})

export default authSchema


