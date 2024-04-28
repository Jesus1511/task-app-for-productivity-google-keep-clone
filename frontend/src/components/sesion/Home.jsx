import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { getUser } from "../../api"

export const Home = () => {

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

  return (
    <>
        <nav className="bg-[#2a2c2f] shadow-lg text-white flex justify-around p-[15px]">
            <Link to="/login">log in</Link>
            <Link to="/singin">sing in</Link>
        </nav>
        <h1 className="text-[40px] m-auto font-bold text-center mt-[50px] w-[700px]">welcome to the best tasks aplications in the workd</h1>
    </>
  )
}
