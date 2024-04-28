import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { updateBox, createBox, createTask, deleteTask, getUser, updateTask } from '../../api'
import { Nav } from '../Nav'
import { useNavigate } from 'react-router-dom'
import { CreateTask } from './CreateTask'
import { EditTask } from './EditTask.jsx'
import optionsMenu from "../../img/show-more-button-with-three-dots_icon-icons.com_72547.png"
import deleteIcon from '../../img/trash-regular-24.png'
import { EditBox } from './EditBox.jsx'

export const Folder = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creating, setCreating] = useState(false)
  const [editing, setEditing] = useState(null)
  const [options, setOptions] = useState("")
  const [firts, setFirts] = useState(0)
  const [tasks, setTasks] = useState([])

  async function readUser () {
    const existingUser = await getUser()
    return existingUser
  }

  useEffect(() => {
    readUser().then((response) => {
      if(!response) {
        navigate('/login')

      }

    if(firts == 0) {
      response.folders.map((folder) => {
        if (folder._id == id) {
          setTasks(folder.tasks)
        }
      })
      setFirts(firts+ 1)
    }
    })
  }, [tasks])

  async function handleCreate (data) {
    setCreating(false)
    const response = await createTask({...data, folder: id})
    setTasks([...tasks, response[response.length - 1]])
  }

  async function handleDelete (data) {
    const response = await deleteTask({task: data, folder: id})
    setTasks(response)
  }

  async function handleUpdate (data) {
    setEditing(null)
    console.log(data)
    const response = await updateTask(data)
    setTasks(response)
  }
  
  async function handleCreateBox (data) {
    setCreating(false)
    const response = await createBox({...data, folder: id})
    setTasks([...tasks, response[response.length - 1]])
  }

  async function handleUpdateBox (data) {
    setEditing(null)
    const response = await updateBox(data)
    setTasks(response)
  }

  function createContent (text, num) {
    if (text.length > num) {
      return text.substring(0, num) + "...";
  } else {
      return text;
  }
  }

  return (
    <>
      {creating && (<CreateTask setBoxCreating={handleCreateBox} setOut={()=>setCreating(false)} setCreating={(handleCreate)}/>)}
      {editing !== null && editing.type == "text" && (<EditTask task={editing} folderId={id} setCreating={(handleUpdate)} />)}
      {editing !== null && editing.type == "completable" && (<EditBox task={editing} folderId={id} setCreating={(handleUpdateBox)}/>)}

      <Nav task={true} setCreating={()=>{setCreating(true)}}/>

      { tasks.length == 0 && (
          <>
            <div className="text-center text-[25px] text-[#d5d5d5] mt-[30px]">there is no taks</div>
            <div className="text-center text-[20px] text-[#d5d5d5]">create one</div>
          </>
        )}

      <div className='container p-[20px] pl-[15px]'>
      { tasks.map((task) => (
            <div
            className="mansory-item overflow-hidden border-solid hover:shadow-xl hover:transition transition border-[1px] border-gray-400 w-[280px] min-h-[180px] flex flex-col justify-between rounded-md m-auto mb-[20px] p-[10px] "
            key={task._id}>

            <div className='cursor-pointer min-h-[135px]' onClick={()=>{setEditing(task)}}>
              <p className='text-[20px] min-h-[30px] mb-[5px]'>{task.title}</p>
              {task.type == "text"?(
                <p className='max-h-[500px] pp'>{createContent(task.content, 400)}</p>
              ):(
                <>
                  {task.subTasks.map((tarea) => {
                    return (
                      <div key={tarea._id} className='flex'>
                        <input disabled checked={tarea.complete} className='cursor-pointer z-[-1] checkbox bg-black w-[10px] h-[10px] mt-[5px] mr-[10px]' type="checkbox" />
                        <p className='pp'>{tarea.content}</p>
                      </div>
                    )
                  })}
                </>
              )}
              
            </div>

            <div className="flex justify-end ">

              <button onClick={()=>{options !== task._id?setOptions(task._id):setOptions("")}}>
                <img className="w-[20px] z-[3842038423]" src={optionsMenu} alt="" />
              </button>

              {options == task._id && (
              <>
              <div className="absolute translate-x-[45px] w-[40px] h-[40px] hover:bg-[#37393d] rounded-md border-solid border-[0px] bg-[#303336] ">
                <div onClick={()=>handleDelete(task._id)} className="flex justify-center items-center cursor-pointer">
                  <img className='w-[25px] mt-[7px]' src={deleteIcon} alt="" />
                </div>
              </div>
              </>
            )}
            </div>

          </div>
          )
      )}
      </div>
    </>
  )
}
