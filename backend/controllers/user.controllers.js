import User from '../mongoSquemas/user.squema.js'
import bcrypt from 'bcrypt'
import { sendConfirmerEmail } from '../midlewares/mailer.js'
import {createAccesToken} from '../jwt.js'
import { loginKey } from '../config.js'


export const register = async (req, res) => {
    const {username, email, password} = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const userFound = await User.find({email: email})
        if (userFound.length > 0) {
            if(!userFound.emailConfirm) {
                return res.status(500).json({message: 'email alredy used, check your gmail to confirm'})
            }
            return res.status(500).json({message: 'email is already used'})
        }

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            folders: []
        })

        const userSaved = await newUser.save()
        res.json(userSaved)

        sendConfirmerEmail(email, userSaved._id)

    } catch (err) {
        res.status(505).json({message: "error al registrar usuario"})
        console.log(err)
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body

    try {
        const userFound = await User.findOne({email: email })

        if(!userFound){
            return res.status(400).json({message: "usuario no encontrado"})
        }

        if(!userFound.emailConfirm) {
            return res.send("email no confirmado")
        }

        const isMatch = await bcrypt.compare(password, userFound.password)


        if (!isMatch){
            return res.status(400).json({message: 'la contraseña o el usuario es incorrecto'})
        }

        const token = await createAccesToken({id: userFound._id}, loginKey)
        res.cookie('token', token)
        res.json(userFound)
    }

    catch (err) {
        res.status(505).json({message: "error al realizar al logear usuario"})
        console.log(err)
    }
}

export const logout = async (req, res) => {
    res.cookie('token',"",{expires: new Date(0)})
    res.sendStatus(200)
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if(!userFound) {
        return res.status(400).json({message: 'user not found'})
    }

    res.send(userFound)
}

export const deleteUser = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if(!userFound) {
        return res.status(400).json({message: 'user not found'})
    }

    await User.deleteOne({_id: req.user.id});
    res.status(200).json({message:"User deleted successfully"})
}