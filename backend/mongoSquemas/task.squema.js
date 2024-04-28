import mongoose from 'mongoose';

export const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: false
    },
    content: {
        type: String,
        required: true,
    },
    type: { 
        type: String,
        default: 'text' 
    }
});

export const completableTaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: false
    },
    subTasks: [
        {
            content: {
                type: String,
                required: true,
                default: ""
            },
            complete: {
                type: Boolean,
                default: false
            }
        }
    ],

    type: { 
        type: String,
        default: 'completable'
    }
});

export const folderSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: false
    },
    tasks: [mongoose.Schema.Types.Mixed]
});

export const Task = mongoose.model('Task', taskSchema);
export const Completable = mongoose.model('Complete', completableTaskSchema);
export const Folder = mongoose.model('Folder', folderSchema);
