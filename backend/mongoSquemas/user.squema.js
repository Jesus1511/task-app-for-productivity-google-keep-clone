import mongoose from 'mongoose'
import { folderSchema } from './task.squema.js'

const userSquema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    emailConfirm: {
        type: Boolean,
        default: false
    },

    folders: [folderSchema]
    
})

export default mongoose.model('User', userSquema)