import { useForm } from 'react-hook-form'
import { useState } from 'react';
import { logUser, getUser } from '../../api.js'
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { userData } from '../../App.jsx';
import passwordIcon from '../../img/lock-alt-regular-24.png' 
import emailIcon from '../../img/envelope-regular.png' 

export const Login = () => {

  const { register, handleSubmit} = useForm();
  const { setUser } = useContext(userData)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function readUser () {
    return await getUser()
  }

  useEffect(() => {
    readUser().then((response) => {
      if(response !== null) {
        navigate('/profile')
      }
    })
  }, [])

  const onSubmit = (data) => { 
    logUser(data)
      .then((response) => {
        setUser(response)
        navigate('/profile')
      })
      .catch((err) => {
        setError(err.response.data.message)
      })
  }


  return (
    <>

    <button className=' text-[40px] font-semibold absolute right-[20px] top-[10px]' onClick={()=>{navigate('/')}}>x</button>
    <div className='z-[-1] fixed w-[100%] h-[100%] bg-[#26282b]'></div>

    <h1 className='text-center text-[30px] translate-y-[70px] font-semibold'>Log in your account</h1>

    <div className="bg-transparent p-[20px] flex flex-col w-[390px] rounded-md absolute left-[50%] translate-x-[-50%] mt-[100px]">

      <form className="flex mb-[10px] flex-col justify-between h-[100px]" onSubmit={handleSubmit(onSubmit)}>
        <div className='flex border-b pb-[10px] mb-[10px]'>
          <img className='w-[30px] mx-[10px] h-[30px]' src={emailIcon} alt="" />
          <input
                  className='w-[350px] pb-[2px] bg-transparent focus:outline-none'
                  placeholder='email'
                  onChange={()=>setError(null)}
                  type="email"
                  name="email"
                  {...register('email', {
                      required: true,
                      pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                  })}
              />
        </div>
        
        <div className='flex border-b pb-[10px] mb-[10px]'>
          <img className='w-[30px] mx-[10px] h-[30px]' src={passwordIcon} alt="" />        
          <input
                  className='w-[350px] pb-[2px] bg-transparent focus:outline-none'
                  placeholder='password'
                  onChange={()=>setError(null)}
                  type="password"
                  name="password"
                  {...register('password', { required: true })}
              />
        </div>

        <button className='block text-[17px] rounded-[10px] w-[100%] m-auto mt-[10px] py-[5px] bg-white text-black font-semibold' type='submit'>Log in</button>
      </form>

      {error && (<div className='text-white bg-red-500 text-center'>{error}</div>)}

      <div className=" flex justify-between mt-[55px]">
        <p className=''>you don't have an account</p>
        <Link to="/singin">Singin</Link>
      </div>
    </div>
    </>
  )
}
