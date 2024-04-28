import emailIcon from '../img/icon.svg'

export const Confirm = () => {
  return (
    <div>
        <img className='w-[200px] block m-auto mt-[100px]' src={emailIcon} alt="" />
        <p className='text-center text-[33px]'>confirm user from your email to continue.</p>
    </div>
  )
}
