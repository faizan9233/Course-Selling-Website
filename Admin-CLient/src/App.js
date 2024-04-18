import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Landing from './Components/Landing';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Navbar from './Components/Navbar';
import { Base_URL } from './config';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddCourses from './Components/AddCourses';
import Courses from './Components/Courses';
import {
  RecoilRoot,
  useSetRecoilState
} from 'recoil';
import { userState } from './Store/Atoms/user';
function App() {
  return (
    <RecoilRoot>
    <Router>
      <InitUser/>
      <Navbar/>
      <Routes>
        <Route path={'/'} element = {<Landing />} />
        <Route path={'/login'} element = {<Login />}   />
        <Route path={'/signup'} element = {<Signup/>} />
        <Route path={'/addcourses'} element = {<AddCourses/>} />
        <Route path={'/courses'} element = {<Courses/>} />
      </Routes>
    </Router>
    </RecoilRoot>
    
  );
}

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async() => {
      try {
          const response = await axios.get(`${Base_URL}/admin/me`, {
              headers: {
                  "auth":localStorage.getItem("token")
              }
          })

          if (response.data.username) {
              setUser({
                  isLoading: false,
                  userEmail: response.data.username
              })
          } else {
              setUser({
                  isLoading: false,
                  userEmail: null
              })
          }
      } catch (e) {

          setUser({
              isLoading: false,
              userEmail: null
          })
      }
  };

  useEffect(() => {
      init();
  }, []);

  return <></>
}

export default App;
