
import { useRecoilValue } from "recoil"
import pic from "../Assets/1.png"
import { Link } from 'react-router-dom'
import { userEmailState } from "../Store/Selectors/UserEmail"
const Landing = () => {
    const userEmail = useRecoilValue(userEmailState);
  return (
    <div className='py-40 px-20 flex justify-center space-x-20 items-center '>
        <div className='btns flex flex-col gap-6'>
            <h1 className='text-xl'>Welcome to our Website. Signin or Signup to get out courses</h1>
            {!userEmail && <div className='flex gap-6'>
               <Link to={'/login'} className='text-center  p-3 w-full bg-[#F3DECA] rounded-lg text-black hover:bg-[#FFF1E6] hover:text-black'>
                 Login
                </Link> 
                <Link to={'/signup'} className='text-center p-3 w-full bg-[#F3DECA] rounded-lg text-black hover:bg-[#FFF1E6] hover:text-black'>
                 Signup
                </Link>
            </div>}

        </div>
        <div className='img w-[300px]'>
           <img src={pic} alt="" className='w-full' />
        </div>
      
    </div>
  )
}

export default Landing
