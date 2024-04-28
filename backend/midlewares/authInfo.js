import {z} from 'zod'

export const registerSquema = z.object({
    email: z.string({
        required_error: 'Email is required'
    }).email ({
        message: 'invalid email'
    }),
    password: z.string({
        required_error: 'password is required'
    })
});


export const loginSquema = z.object({
    email: z.string({
        required_error: 'Email is required'
    }).email ({
        message: 'invalid email'
    }),
    password: z.string({
        required_error: 'password is required'
    })
}) 