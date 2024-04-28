import { BrowserRouter, Routes, Route} from "react-router-dom"
import { createContext, useEffect, useState } from "react"
import { getUser } from "./api.js"
import { Home } from "./components/sesion/Home.jsx"
import { Login } from "./components/sesion/Login.jsx"
import { Singin } from "./components/sesion/Singin.jsx"
import { Profile } from "./components/folder/Profile.jsx"
import { Folder } from "./components/task/Folder.jsx"
import { Confirm } from "./components/Confirm.jsx"

export const userData = createContext()

export const App = () => {
  
  const [user, setUser] = useState()

  async function readUser () {
    const existingUser = await getUser()
    setUser(existingUser)
    return existingUser
  }

  useEffect(() => {
    setUser(readUser())
  }, [])

  return (
    <>
    <userData.Provider value={{user, setUser}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/singin" element={<Singin />}/>
        <Route path="/confirmEmail" element={<Confirm />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/profile/folder/:id" element={<Folder />}/>
      </Routes>
    </BrowserRouter>
    </userData.Provider>
    </>
  )
}
