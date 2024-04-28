import {loginKey, emailConfirmKey} from '../config.js'
import jwt from 'jsonwebtoken'

export function authenticateUserToken (req, res, next) {
    const {token} = req.cookies

    if (!token) {
        return res.status(401).json({ message: "no token, authorization"})
    }

    jwt.verify(token, loginKey, (err, user) => {
        if (err) {
            return res.status(401).json({message: 'ivalid token'})
        }

        req.user = user
    })
    next()
}

export function authenticateEmailToken (req, res, next) {
    const {emailToken} = req.cookies

    if (!emailToken) {
        req.email = false
        next()
        return; 
    }

    jwt.verify(emailToken, emailConfirmKey, (err, user) => {
        if (err) {
            console.log(err);
            req.email = false
            next()
            return; 
        }

        req.email = true
        req.user = user
    })
    next()
}