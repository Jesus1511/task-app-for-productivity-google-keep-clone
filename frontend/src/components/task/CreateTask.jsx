import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";

export const CreateTask = ({setCreating, setBoxCreating, setOut}) => {
    const { register, handleSubmit } = useForm();
    const [type, setType] = useState(true);
    const [boxes, setBoxes] = useState([]);
    const [refInput, setRefInput] = useState()
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            setRefInput(null)
        }
    }, [boxes]);

    const onSubmit = (data) => { 
        setCreating(data);
    }

    const onBoxSubmit = (data) => {
        const finalBoxes = []
        if ((boxes.length <= 1 && boxes[0] == "")||boxes.length == 0) {
            return
        }
        boxes.map((box) => {
            finalBoxes.push(box)
        })
        const boxData = {title: data.title , subTasks: finalBoxes}
        setBoxCreating(boxData);
    }

    function deleteLine(index) {
        const newBoxes = boxes.filter((_, i) => i !== index);
        setBoxes(newBoxes);
    }

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
            <div onClick={setOut} className="bg-[#252528ad] w-[100%] h-[100%] fixed top-0 left-0 cursor-pointer z-[1]"></div>
            <form 
                className="fixed h-[480px] flex flex-col border-[1px] border-gray-400 rounded-lg justify-between w-[80%] pt-[15px] pb-[20px] max-w-[650px] left-[50%] translate-x-[-50%] top-[60px] z-[2] bg-[#2a2c2f]"
                onSubmit={type? handleSubmit(onSubmit): handleSubmit(onBoxSubmit)}>
                
                <div className="h-auto">
                    <input 
                        className="w-[90%] bg-transparent m-auto mb-[20px] block focus:outline-none border-none text-[25px]"
                        type="text"
                        placeholder="Titulo"
                        {...register('title', {
                            required: true,
                        })}
                    />

                    {type ? (
                        // Texts
                        <textarea
                            rows="4" cols="50" 
                            className="w-[90%] scrol min-h-[340px] h-auto bg-transparent m-auto mb-[20px] block focus:outline-none border-none overscroll-y-auto"
                            placeholder="contenido"
                            {...register('content', {
                                required: true,
                            })}
                        />
                    ) : (
                        // Boxes
                        <div className="m-auto w-[90%] overflow-y-auto scrol h-[340px] mb-[20px]">
                            {boxes.map((box, index) => (
                                <div className="ml-[5px] my-[15px]" key={index}>
                                    <input checked={box.complete} onChange={()=>handleChecked(index)} className="cursor-pointer checkbox bg-black w-[10px] h-[10px] mr-[20px]" type="checkbox" />
                                    <textarea
                                        ref={index === refInput ? inputRef : null}
                                        onKeyDown={(e)=>handleKeyDown(e, index)}
                                        onChange={(e)=>handleChange(e, index)} 
                                        value={box.content} 
                                        className={`focus:outline-none bg-transparent  overflow-y-hidden resize-none w-[80%]`} 
                                        placeholder="contenido del elemento" 
                                        cols="30" 
                                        rows="1"
                                    />
                                    <div onClick={()=>deleteLine(index)} className="inline cursor-pointer text-[20px] text-[#ffffffb0]">x</div>
                                </div>
                            ))}

                            <div onClick={()=>{
                                setBoxes([...boxes, {title:"", complete:false}]);
                            }} className="cursor-pointer p-[10px] border-[.5px] border-transparent hover:border-[#ffffff58] flex w-[100%]">
                                <p className="mr-[10px]">+</p>
                                <p>Nuevo elemento</p>
                            </div>
                        </div>
                    )}
                    </div>

                <div className="pr-[10%] pl-[5%] flex justify-between">
                    <div className="flex w-[100px] justify-between ">
                        <div className={`pb-[2px] cursor-pointer ${type ? "border-b-[1.5px] border-b-white" : ""}`} onClick={()=>setType(true)}>Text</div>
                        <div className={`pb-[2px] cursor-pointer ${!type ? "border-b-[1.5px] border-b-white" : ""}`} onClick={()=>setType(false)}>Boxes</div>
                    </div>
                    <button type="submit">Crear</button>
                </div>
             </form>

        </>
    );
};
