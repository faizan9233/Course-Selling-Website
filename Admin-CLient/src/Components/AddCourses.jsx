import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Base_URL } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userContext } from '../Context/UserContext';

const AddCourses = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(null);
    const [image, setImage] = useState("");
    const {setUsername} = useContext(userContext);
    const toastOptions = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    };

    const handleAddCourse = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setUsername(null); 
                return;
            }
            const res = await axios.post(`${Base_URL}/admin/addcourses`, {
                title,
                description,
                price,
                image
            },{
                headers: {
                    "Auth": token
                }
            });
            if (res.status === 200) {
                toast.success("Course Added", toastOptions);
                setTitle("");
                setDescription("");
                setPrice("");
                setImage("");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to add course", toastOptions);
        }
    };

    return (
        <div className='flex justify-center items-center mx-auto h-[600px]'>
            <div className="container flex flex-col justify-center items-center w-full sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] h-auto p-5 bg-[#FAFAFA] rounded-lg gap-6">
                <p className='text-[#041B15]'>Add Course Here</p>
                <div className='w-full flex flex-col gap-3'>
                    <input type="text" placeholder='Enter title' className='p-3 rounded-lg outline-none text-black w-full'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                    <input type="text" placeholder='Enter description' className='p-3 rounded-lg outline-none text-black w-full'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                    <input type="number" placeholder='Enter price' className='p-3 rounded-lg outline-none text-black w-full'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)} />
                    <input type="text" placeholder='Enter image link' className='p-3 rounded-lg outline-none text-black w-full'
                        value={image}
                        onChange={(e) => setImage(e.target.value)} />
                </div>
                <button className='p-3 w-full bg-[#F3DECA] rounded-lg text-black hover:bg-[#FFF1E6] hover:text-black'
                    onClick={handleAddCourse}>Add Course</button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddCourses;
