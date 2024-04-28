import {  useEffect, useState } from "react"
import { useForm } from "react-hook-form"

export const EditTask = ({setCreating, task, folderId}) => {

  const {handleSubmit} = useForm()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(()=> {
   setTitle(task.title)
   setContent(task.content)

},[])

  const onSubmit = (data) => { 
      setCreating({title: title, content: content, folder: folderId, task: task._id})
    }

return (
  <>
      <div onClick={handleSubmit(onSubmit)} className="bg-[#252528ad] w-[100%] h-[100%] fixed top-0 left-0 cursor-pointer z-[1]"></div>
      <form 
          className="fixed min-h-[450px] flex flex-col border-[1px] border-gray-400 rounded-lg justify-between w-[80%] pt-[15px] pb-[20px] max-w-[650px] left-[50%] translate-x-[-50%] top-[60px] z-[2] bg-[#2a2c2f]"
          onSubmit={handleSubmit(onSubmit)}>

        <div className="h-[230px]">
          <input 
              className="w-[90%] bg-transparent m-auto mb-[20px] block focus:outline-none border-none text-[25px]"
              type="text"
              onChange={(e)=>{setTitle(e.target.value)}}
              placeholder="Titulo"
              value={title}/>

          <textarea 
            rows="4" cols="50" 
            className="w-[90%] scrol min-h-[340px] h-auto bg-transparent m-auto mb-[20px] block focus:outline-none border-none overscroll-y-auto"
            type="text"
            onChange={(e)=>{setContent(e.target.value)}}
            placeholder="content"
            value={content}/>
        </div>
        
          <div className="pr-[10%] flex justify-end">
              <button type="submit">Actualizar</button>
          </div>
      </form>
  </>
)
}
