import express from 'express'
import {register, login, logout, profile, deleteUser} from './controllers/user.controllers.js'
import { createTask, deleteTask, updateTask, createFolder, getFolder, updateFolder, deleteFolder, createCompletable, updateCompletable } from './controllers/tasks.controllers.js'
import { registerSquema, loginSquema } from './midlewares/authInfo.js'
import { confirmRegister } from './controllers/confirmRegister.js'
import { validateSquema } from './midlewares/validateSquema.js'
import { authenticateUserToken, authenticateEmailToken } from './midlewares/validToken.js'
import { conectDB } from './db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
conectDB()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true 
}));

app.use(express.json());
app.use(cookieParser())

app.post('/api/register',validateSquema(registerSquema), authenticateEmailToken, register);
app.post('/api/login',validateSquema(loginSquema), login);
app.post('/api/logout', logout);
app.get('/api/profile', authenticateUserToken, profile);
app.delete('/api/delete', authenticateUserToken, deleteUser);


app.get('/api/confirmRegister/:id',confirmRegister)

app.post('/api/folders/create', authenticateUserToken, createFolder)
app.get('/api/folders/tasks', authenticateUserToken, getFolder)
app.patch('/api/folders/update', authenticateUserToken, updateFolder)
app.delete('/api/folders/delete', authenticateUserToken, deleteFolder)

app.post('/api/folders/tasks/create', authenticateUserToken, createTask)
app.patch('/api/folders/tasks/update', authenticateUserToken, updateTask)
app.delete('/api/folders/tasks/delete', authenticateUserToken, deleteTask)

app.post('/api/folders/completable/create', authenticateUserToken, createCompletable)
app.patch('/api/folders/completable/update', authenticateUserToken, updateCompletable)

app.listen(3000, () => {
    console.log('escuchando en el puerto 3000')
})