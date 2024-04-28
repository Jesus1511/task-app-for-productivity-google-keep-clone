import { logout } from "../api";
import { useNavigate } from "react-router-dom";
import userIcon from '../img/user-regular-24.png'
import logoutIcon from '../img/log-out-regular-24.png'
import backIcon from '../img/arrow-back-regular-24.png'
import { useState } from "react";

export const Nav = ({setCreating, task}) => {

    const [openMenu, setOpenMenu] = useState(false)
    const navigate = useNavigate()

  return (
    <nav className="bg-[#2a2c2f] shadow-lg text-white flex justify-between p-[15px]">
        <div>
          {task && (<button onClick={()=>{navigate('/profile')}}>
            <img className="h-[28px]" src={backIcon} alt="" />
          </button>)}
        </div>

        <div className="flex justify-between w-[100px]">
          <button className="text-[20px] trasition hover:trasition hover:text-white text-[#c8c8c8]" onClick={()=>{setCreating()}}>+</button>
          <button onClick={()=>setOpenMenu(!openMenu)} className="bg-[#313131] hover:transition transition hover:bg-[#373737] p-[5px] rounded-[50%]">
            <img className="h-[23px]" src={userIcon} alt="" />
          </button>
        </div>

        {openMenu && (
          <div className="absolute w-[120px] z-10 bg-[#313337] right-0 top-[60px] ">
            <div onClick={()=>{logout(); navigate('/')}} className="flex cursor-pointer px-[15px] py-[10px] hover:bg-[#34363a] justify-between items-center">
              <img className="h-[20px]" src={logoutIcon} alt="" />
              <p>log out</p>
            </div>
          </div>
        )}
    </nav>
  )
}
