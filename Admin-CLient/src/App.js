import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Landing from './Components/Landing';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Navbar from './Components/Navbar';
import { Base_URL } from './config';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { userContext } from './Context/UserContext';
import AddCourses from './Components/AddCourses';
import Courses from './Components/Courses';
function App() {
  const [username,setUsername] = useState("");
  useEffect(() => {
    const init = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setUsername(null); 
                return;
            }

            const res = await axios.get(`${Base_URL}/admin/me`, {
                headers: {
                    "Auth": token
                }
            });
            
            if (res.data.username) {
                setUsername(res.data.username);
            }
        } catch (error) {
            console.error('Error fetching user information:', error);
            setUsername(null); 
        }
    };
    init();
}, []);
console.log(username);

  return (
    <userContext.Provider value={{username,setUsername}}>
    <Router>
      <Navbar/>
      <Routes>
        <Route path={'/'} element = {<Landing />} />
        <Route path={'/login'} element = {<Login />}   />
        <Route path={'/signup'} element = {<Signup/>} />
        <Route path={'/addcourses'} element = {<AddCourses/>} />
        <Route path={'/courses'} element = {<Courses/>} />
      </Routes>
    </Router>
    </userContext.Provider>
  );
}

export default App;
