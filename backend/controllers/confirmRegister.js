import { createAccesToken } from "../jwt.js"
import User from "../mongoSquemas/user.squema.js"
import { loginKey } from '../config.js'

export const confirmRegister = async (req, res) => { 
    try {
        const id = req.params.id;

        const userFound = await User.findOne({_id: id})
        if (!userFound) {
            return res.status(404).json({message: "Usuario no encontrado"});
        }
        userFound.emailConfirm = true;
        await userFound.save();

        const token = await createAccesToken({id: userFound._id}, loginKey)
    
        res.cookie('token', token)
        res.redirect('http://localhost:5173/profile');


    } catch (err) {
        console.log(err)
        return res.status(400).json({message: "error al verificar email"})
    }


};