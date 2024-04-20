import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Base_URL } from '../config';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { courseState } from '../Store/Atoms/course';
import { courseDetails } from '../Store/Selectors/course';

const Courses = () => {
    const setCourses = useSetRecoilState(courseState);
    const courses = useRecoilValue(courseDetails);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        
        const fetchData = async () => {
            try {
                const res = await axios.get(`${Base_URL}/admin/allcourses`, {
                    headers: {
                        "Auth": token
                    }
                });
                if (res.data.courses) {
                    setCourses({
                        course: res.data.courses
                    })
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

const EditCourse = ()=>{
    return <div>
        
    </div>
}

export default Courses;
