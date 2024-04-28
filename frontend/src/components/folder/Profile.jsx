import { useContext, useEffect, useState } from "react"
import { userData } from "../../App"
import { createFolder, deleteFolder, getUser, updateFolder } from "../../api"
import { useNavigate} from 'react-router-dom'
import { CreateFolder } from "./CreateFolder"
import optionsMenu from "../../img/show-more-button-with-three-dots_icon-icons.com_72547.png"
import { Nav } from "../Nav"
import { EditFolder } from "./EditFolder"


export const Profile = () => {

    const {user, setUser} = useContext(userData)
    const navigate = useNavigate()
    const [creating, setCreating] = useState(false)
    const [editing, setEditing] = useState(false)
    const [options, setOptions] = useState("")
    const [folders, setFolders] = useState([])
    const [firts, setFirts] = useState(0)

    async function readUser () {
      const existingUser = await getUser()
      return existingUser
    }

    useEffect(() => {
      readUser().then((response) => {
        if(!response) {
          navigate('/login')
        }
        setUser(response)
        if(firts == 0) {
          setFolders(response.folders)
          setFirts(firts+ 1)
        }
      })
    }, [folders])

    async function handleDelete (id) {
      const response = await deleteFolder({folder:id})
      setFolders(response)
    }

    async function handleCreate (data) {
      setCreating(false);
      const response = await createFolder(data)
      setFolders([...folders, response])

    }

    async function handleUpdate (data) {
      setEditing(false)
      const folder = folders.filter(folder => folder._id === options)[0];
      const response = await updateFolder({...data, tasks: folder.tasks})
      setOptions("")
      setFolders(response)
    }

  return (
    <>
      {
        creating && ( <CreateFolder setCreating={handleCreate} setOut={()=>setCreating(false)} /> )
      }
      {
        editing && ( <EditFolder setCreating={handleUpdate} setOut={()=>setEditing(false)} folderId={options} /> )
      }

      <Nav setCreating={()=>{setCreating(true)}} />

      {user && (
        <>

          { folders.length == 0 && (
            <>
              <div className="text-center text-[25px] text-[#dedede] mt-[30px]">there is no folders</div>
              <div className="text-center text-[20px] text-[#dedede]">create one</div>
            </>
           )}

          <div className="container p-[20px]">
          {folders && folders.map((folder) => (
            <div
              className="m-auto mb-[20px] overflow-hidden border-solid hover:shadow-xl hover:transition transition border-[1px] w-[200px] min-h-[130px] flex flex-col justify-between rounded-md pb-[10px] px-[10px]"
              key={folder._id}>

            <div className="cursor-pointer h-[100px]" onClick={()=>{navigate('/profile/folder/' + folder._id)}}>
              <p  className="inline">{folder.title}</p>

              <div className="w-[100%] text-gray-500 h-[100%]">
               (  {folder.tasks.length} )
              </div>
            </div>

              <div className="flex justify-end ">
                <button onClick={()=>{options !== folder._id?setOptions(folder._id):setOptions("")}}>
                  <img className="w-[15px]" src={optionsMenu} alt="" />
                </button>
              </div>

              {options == folder._id && (
                <>
                <div className="absolute translate-x-[170px] translate-y-[120px]  h-[60px] w-[100px] bg-[#2C2E31]">
                  <div onClick={()=>{setEditing(true)}} className="hover:bg-[#37393d] text-center h-[30px] cursor-pointer">edit</div>
                  <div onClick={()=>handleDelete(folder._id)} className="hover:bg-[#37393d] text-center h-[30px] cursor-pointer">delete</div>
                </div>
                </>
              )}

            </div>
        ))}
        </div>
        </>)}
    </>
  )
}
