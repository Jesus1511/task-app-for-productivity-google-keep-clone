import { useForm } from 'react-hook-form'
import { singUser } from '../../api.js'
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { userData } from '../../App.jsx';
import passwordIcon from '../../img/lock-alt-regular-24.png' 
import emailIcon from '../../img/envelope-regular.png' 
import userIcon from '../../img/user-regular-24.png'

export const Singin = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { setUser } = useContext(userData)
  const [error, setError] = useState()
  const navigate = useNavigate()

  const onSubmit = (data) => { 
    singUser(data)
      .then((response) => {
        setUser(response)
        console.log(response)
        navigate('/confirmEmail')
      })
      .catch((err) => {
        setError(err.response.data.message)
      })
  }

  return (
    <>

    <button className='text-black text-[40px] font-semibold absolute right-[20px] top-[10px]' onClick={()=>{navigate('/')}}>x</button>
    <button className=' text-[40px] font-semibold absolute right-[20px] top-[10px]' onClick={()=>{navigate('/')}}>x</button>

    <div className='z-[-1] fixed w-[100%] h-[100%] bg-[#26282b]'></div>

    <h1 className='text-center text-[30px] translate-y-[70px] font-semibold'>Sing in an account</h1>

    <div className="bg-transparent p-[20px] flex flex-col w-[390px] rounded-md absolute left-[50%] translate-x-[-50%] mt-[100px]">
      <form className="flex mb-[10px] flex-col justify-between h-[100px]"  onSubmit={handleSubmit(onSubmit)}>

        <div className='flex border-b pb-[10px] mb-[10px]'>
          <img className='w-[30px] mx-[10px] h-[30px]' src={userIcon} alt="" />    
          <input
                  className='w-[350px] pb-[2px] bg-transparent focus:outline-none'
                  placeholder='username'
                  type="username"
                  name="username"
                  {...register('username', {
                      required: true,
                })}
            />
        </div>

        <div className='flex border-b pb-[10px] mb-[10px]'>
          <img className='w-[30px] mx-[10px] h-[30px]' src={emailIcon} alt="" />
          <input
                  className='w-[350px] pb-[2px] bg-transparent focus:outline-none'
                  placeholder='email'
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
                  type="password"
                  name="password"
                  {...register('password', { required: true })}
              />
        </div>

        <div className='flex border-b pb-[10px] mb-[10px]'>
          <img className='w-[30px] mx-[10px] h-[30px]' src={passwordIcon} alt="" />
          <input
                  className='w-[350px] pb-[2px] bg-transparent focus:outline-none'
                  placeholder='repeat your password'
                  type="password"
                  name="confirmPassword"
                  {...register("password_repeat", {
                    validate: value =>
                      value === watch('password') || "Las contraseñas no coinciden"
                  })}
              />
        </div>
        {errors.password_repeat && <div className='bg-[red] text-center'>{errors.password_repeat.message}</div>}
        <button className='block text-[17px] rounded-[10px] w-[100%] m-auto mt-[15px] py-[5px] bg-white text-black font-semibold' type='submit'>Sing in</button>
      </form>

      {error && (<div className='text-white bg-red-500 text-center'>{error}</div>)}

      <div className="flex justify-between mt-[165px]">
        <p>you already have an account</p>
        <Link to="/login">Login</Link>
      </div>
    </div>
    </>
  )
}
