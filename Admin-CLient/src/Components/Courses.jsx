import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Base_URL } from '../config';
import { userContext } from '../Context/UserContext';

const Courses = () => {
    const { setUsername } = useContext(userContext);
    const [courses, setCourses] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setUsername(null); 
            return;
        }
        
        const fetchData = async () => {
            try {
                const res = await axios.get(`${Base_URL}/admin/allcourses`, {
                    headers: {
                        "Auth": token
                    }
                });
                if (res.data.courses) {
                    setCourses(res.data.courses)
                }
            } catch (error) {
                console.log(error);
            }
        };
        
        fetchData();
    }, []);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-screen-xl mx-auto p-10'>
            {courses.map((course, index) => (
                <div key={index} className='bg-[#FFF1E6] rounded-lg shadow-xl duration-500 hover:scale-105'>
                    <div className="img w-full h-[60%] rounded-lg">
                        <img src={course.image} alt="" className='w-full h-full object-cover rounded-t-lg' />
                    </div>
                    <div className="txt p-4">
                        <h1 className='font-bold text-xl mb-2'>{course.title}</h1>
                        <p className='mb-2'>{course.price}PKR</p>
                        <p>{course.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Courses;
