
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../Context/UserContext';

const Navbar = () => {
    const {username,setUsername} = useContext(userContext);
    const navigate = useNavigate();
    const Handlelogout =  ()=>{
        localStorage.removeItem("token");
        setUsername(null);
        // navigate('/');

    }
    
       if(username){
          return  <div className='flex justify-between items-center bg-[#FAFAFA] h-[60px] shadow-lg'>
            <Link to={'/'}>
            <div className='ml-2 text-lg'>
                TechCourses
            </div>
            </Link>
            <div className='flex gap-6 mr-3'>
                   <Link to={'/addcourses'} className='text-center  p-3 w-full rounded-lg text-black '>
                     Addcources
                    </Link> 
                    <Link to={'/courses'} className='text-center p-3 w-full rounded-lg text-black '>
                     Courses
                    </Link>
                    <button onClick={Handlelogout}  className='p-3 w-full bg-[#F3DECA] rounded-lg text-black hover:bg-[#FFF1E6] hover:text-black '>
                        logout
                    </button>
                </div>
          
        </div>
        
    }
    else{
        return (
            <div className='flex justify-between items-center bg-[#FAFAFA] h-[60px] shadow-lg'>
                <Link to={'/'}>
                <div className='ml-2 text-lg'>
                    TechCourses
                </div>
                </Link>
                <div className='flex gap-6 mr-3'>
                       <Link to={'/login'} className='text-center  p-3 w-full bg-[#F3DECA] rounded-lg text-black hover:bg-[#FFF1E6] hover:text-black'>
                         Login
                        </Link> 
                        <Link to={'/signup'} className='text-center p-3 w-full bg-[#F3DECA] rounded-lg text-black hover:bg-[#FFF1E6] hover:text-black'>
                         Signup
                        </Link>
                    </div>
              
            </div>
          )
    }

    }

export default Navbar
