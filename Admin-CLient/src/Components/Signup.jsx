import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {Base_URL} from '../config'
import { userContext } from '../Context/UserContext';
const Signup = () => {
    const {setUsername} = useContext(userContext);
    const [username,setUser] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const toastOptions = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    }
    const handleSignUp = async () => {
        try {
            const response = await axios.post(`${Base_URL}/admin/signup`, { username, password });
            const token = response.data.token;
            if (token) {
                localStorage.setItem("token", token);
                toast.success('Signed up Successfully', toastOptions);
                navigate('/login');
                setUsername(username);
            }
        } catch (error) {
            if (error) {
                toast.error('Incorrect username or password', toastOptions);
            } else {
                toast.error('An error occurred. Please try again later', toastOptions);
            }
        }
    };
  return (
    <div className='flex justify-center items-center mx-auto h-[600px]'>
    <div className="container flex flex-col justify-center items-center w-full sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] h-auto p-5 bg-[#FAFAFA] rounded-lg gap-6">
      <p className='text-[#041B15]'>Signup Here</p>
      <div className='w-full flex flex-col gap-3'>
        <input type="text" placeholder='Enter username' className='p-3 rounded-lg outline-none text-black w-full'
        onChange={(e)=>{
            setUser(e.target.value);
        }} />
        <input type="password" placeholder='Enter Password' className='p-3 rounded-lg outline-none text-black w-full'
        onClick={(e)=>{
            setPassword(e.target.value);
        }}/>
      </div>
      <button className='p-3 w-full bg-[#F3DECA] rounded-lg text-black hover:bg-[#FFF1E6] hover:text-black ' 
      onClick={handleSignUp}>Signup</button>
    </div>
    <ToastContainer/>
  </div>
  )
}

export default Signup
