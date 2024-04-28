import { Task, Folder, Completable } from '../mongoSquemas/task.squema.js'
import User from '../mongoSquemas/user.squema.js'
import mongoose from 'mongoose'

export const createFolder = async (req, res) => {
    const { title } = req.body

    try { 
        const newFolder = new Folder({ 
            title,
            tasks: []
        })

        const userFound = await User.findById(req.user.id)

        userFound.folders.push(newFolder)

        await userFound.save()

        console.log("Carpeta añadida correctamente")

        res.status(200).send(newFolder)

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error al crear carpeta" })
    }
}
export const getFolder = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if(!userFound) { 
        return res.status(400).json({message: 'user not found'})
    }

    res.send(userFound.folders)
}
export const updateFolder = async (req, res) => {
    try {
        const { title, tasks } = req.body;

        const userFound = await User.findById(req.user.id);

        const folderId = new mongoose.Types.ObjectId(req.body.folder);

        const folderIndex = userFound.folders.findIndex(folder => folder._id.equals(folderId));

        if (folderIndex === -1) {
            return res.status(404).json({ message: "folder not found" });
        }
        
        userFound.folders[folderIndex].title = title;
        userFound.folders[folderIndex].tasks = tasks

        const userSaved = await userFound.save();

        res.status(200).send(userSaved.folders);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error editing folder" });
    }
}
export const deleteFolder = async (req, res) => {
    try {
        const userFound = await User.findById(req.user.id);

        if(!userFound){
            return res.status(404).json({message: "user not found"})
        }

        const folderId = new mongoose.Types.ObjectId(req.body.folder);

        userFound.folders = userFound.folders.filter(folder => !folder._id.equals(folderId));
        const userSaved = await userFound.save();


        res.status(200).json(userSaved.folders);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const createTask = async (req, res) => {
    const { content, title } = req.body

    try { 
        const newTask = new Task({
            content,
            title,
            complete: false,
        })

        const userFound = await User.findById(req.user.id)
        const folderId = new mongoose.Types.ObjectId(req.body.folder);
        const folderIndex = userFound.folders.findIndex(folder => folder._id.equals(folderId));

        userFound.folders[folderIndex].tasks.push(newTask)

        const userSaved = await userFound.save()

        console.log("Tarea completable añadida correctamente")

        res.send(userSaved.folders[folderIndex].tasks)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error al crear tarea" })
    }
}
export const updateTask = async (req, res) => {
    
    try {
        const { title, content } = req.body;

        const userFound = await User.findById(req.user.id);

        const folderId = new mongoose.Types.ObjectId(req.body.folder);
        const taskId = new mongoose.Types.ObjectId(req.body.task);

        const folderIndex = userFound.folders.findIndex(folder => folder._id.equals(folderId));

        if (folderIndex === -1) {
            return res.status(404).json({ message: "Folder not found" });
        }

        const taskIndex = userFound.folders[folderIndex].tasks.findIndex(task => task._id.equals(taskId));

        if (taskIndex === -1) {
            return res.status(404).json({ message: "Task not found" });
        }

        userFound.folders[folderIndex].tasks[taskIndex].title = title;
        userFound.folders[folderIndex].tasks[taskIndex].content = content;

        userFound.markModified('folders');

        const userSaved = await userFound.save();
        console.log(userSaved.folders[folderIndex].tasks)

        res.status(200).send(userFound.folders[folderIndex].tasks);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error editing task" });
    }
}
export const deleteTask = async (req, res) => {
    try {
        const userFound = await User.findById(req.user.id);

        if(!userFound){
            return res.status(404).json({message: "user not found"})
        }

        const taskId = new mongoose.Types.ObjectId(req.body.task);
        const folderId = new mongoose.Types.ObjectId(req.body.folder)

        for(let i = 0; i < userFound.folders.length; i++) {
            if(userFound.folders[i]._id.equals(folderId)) {
                userFound.folders[i].tasks = userFound.folders[i].tasks.filter(task => !task._id.equals(taskId));
                res.status(200).send(userFound.folders[i].tasks);
            }}

        const userSaved = await userFound.save();


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const createCompletable = async (req,res) => {
    const { subTasks, title } = req.body

    console.log(subTasks)

    try { 
        const newCompletable = new Completable({
            title,
            complete: false, 
            subTasks: subTasks
        })

        const userFound = await User.findById(req.user.id)
        const folderId = new mongoose.Types.ObjectId(req.body.folder);
        const folderIndex = userFound.folders.findIndex(folder => folder._id.equals(folderId));

        userFound.folders[folderIndex].tasks.push(newCompletable)

        const userSaved = await userFound.save()

        res.send(userSaved.folders[folderIndex].tasks)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error al crear tarea" })
    }
} 
export const updateCompletable = async (req, res) => {
    
    try {
        const { title, subTasks } = req.body;

        const userFound = await User.findById(req.user.id);

        const folderId = new mongoose.Types.ObjectId(req.body.folder);
        const taskId = new mongoose.Types.ObjectId(req.body.task);

        const folderIndex = userFound.folders.findIndex(folder => folder._id.equals(folderId));

        if (folderIndex === -1) {
            return res.status(404).json({ message: "Folder not found" });
        }

        const taskIndex = userFound.folders[folderIndex].tasks.findIndex(task => task._id.equals(taskId));

        if (taskIndex === -1) {
            return res.status(404).json({ message: "Task not found" });
        }

        userFound.folders[folderIndex].tasks[taskIndex].title = title;
        userFound.folders[folderIndex].tasks[taskIndex].subTasks = subTasks;
    
        userFound.markModified('folders');

        const userSaved = await userFound.save();
        console.log(userSaved.folders[folderIndex].tasks)

        res.status(200).send(userFound.folders[folderIndex].tasks);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error editing task" });
    }
}
