import { useState, useEffect, useRef } from "react";

export const EditBox = ({setCreating, setOut, task, folderId}) => {
    const [title, setTitle] = useState("")
    const [boxes, setBoxes] = useState([]);
    const [refInput, setRefInput] = useState()
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            setRefInput(null)
        }
    }, [boxes]);

    const onSubmit = () => {
        const data = {title: title, subTasks: boxes, folder: folderId, task: task._id}
        setCreating(data)
    }

    useEffect(()=> {
        setTitle(task.title)
        setBoxes(task.subTasks)
     },[])

     function handleChange(event, index) {
        const newBoxes = [...boxes];
        if (event.target.value.includes('\n')) {
            return
          }
        newBoxes[index].content = event.target.value;
        setBoxes(newBoxes);
    }

    function handleChecked (index) {
        const newBoxes = [...boxes]
        newBoxes[index].complete = !newBoxes[index].complete
        setBoxes(newBoxes)
    }

    function deleteLine(index) {
        const newBoxes = boxes.filter((_, i) => i !== index);
        setBoxes(newBoxes);
    }

    function handleKeyDown (event, index) {
        if (event.key === 'Enter') {
            const newBoxes = []
            boxes.map((box, boxIndex) => {
                console.log(box)
                newBoxes.push(box)
                if(boxIndex === index) {
                    newBoxes.push({content:"", complete:false})
                }
            })
            setBoxes(newBoxes);
            setRefInput(index + 1)
        }

        if(event.key === 'ArrowUp' ){
            setRefInput(index - 1)
            setBoxes([...boxes])
        }

        if(event.key === 'ArrowDown'){
            setRefInput(index + 1)
            setBoxes([...boxes])
        }

        if(event.key === 'Backspace'){
            if(boxes[index].content == ""){
                deleteLine(index)
                setRefInput(index - 1)      
            }
        }
    }

  return (
    <>
    <div onClick={onSubmit} className="bg-[#252528ad] w-[100%] h-[100%] fixed top-0 left-0 cursor-pointer z-[1]"></div>
    <form 
        className="fixed min-h-[450px] flex flex-col border-[1px] border-gray-400 rounded-lg justify-between w-[80%] pt-[15px] pb-[20px] max-w-[650px] left-[50%] translate-x-[-50%] top-[60px] z-[2] bg-[#2a2c2f]"
        onSubmit={onSubmit}>
        
        <div className="h-auto">
            <input 
                className="w-[90%] bg-transparent m-auto mb-[20px] block focus:outline-none border-none text-[25px]"
                type="text"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                placeholder="Titulo"
            />

            <div className="m-auto w-[90%] overflow-y-auto scrol h-[340px] mb-[20px]">
                {boxes.map((box, index) => (
                    <div className="ml-[5px] my-[15px]" key={index}>
                        <input onChange={()=>handleChecked(index)} checked={box.complete} className="cursor-pointer checkbox bg-black w-[10px] h-[10px] mr-[20px]" type="checkbox" />
                        <textarea
                            ref={index === refInput ? inputRef : null}
                            onKeyDown={(e)=>handleKeyDown(e, index)}
                            onChange={(e)=>handleChange(e, index)} 
                            value={box.content} 
                            className={`focus:outline-none bg-transparent overflow-y-hidden resize-none w-[80%]`} 
                            placeholder="contenido del elemento" 
                            cols="30" 
                            rows="1"
                        />
                        <div onClick={()=>deleteLine(index)} className="inline cursor-pointer text-[20px] text-[#ffffffb0]">x</div>
                    </div>
                ))}
                <div onClick={()=>{
                    setBoxes([...boxes, {content:"", complete:false}]);
                }} className="cursor-pointer p-[10px] border-[.5px] border-transparent hover:border-[#ffffff58] flex w-[100%]">
                    <p className="mr-[10px]">+</p>
                    <p>Nuevo elemento</p>
                </div>
            </div>
        </div>
            
          <div className="pr-[10%] flex justify-end">
              <button type="submit">Actualizar</button>
          </div>
    </form>

</>
  )
}
