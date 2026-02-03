import { Route, Routes, Navigate, useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import UserLayout from "./components/UserLayout";
import AppLayout from "./components/AppLayout";
import Reset from "./pages/Reset";

import { useEffect, useState } from "react";

function App() {
  const [userDetails, setUserDetails] = useState(null);
 const isUserLoggedIn = async () => {
 try {
const response = await axios.post('http://localhost:5001/auth/is-user-logged-in',
 {}, { withCredentials: true });

 setUserDetails(response.data.user);
 } catch (error) {
 console.log(error);
 }
 };

 useEffect(() => {
 isUserLoggedIn();
 }, []);

 return (
    <Routes>
      <Route path="/" element={userDetails ?
        (<Navigate to="/dashboard" />) :
        (<AppLayout><Home /></AppLayout>)}/>
      <Route path="/signup" element={(userDetails ?
        (<Navigate to="/dashboard" />) :
        (<AppLayout><Signup/></AppLayout>))}/>
      <Route path="/login" element={(userDetails ?
        (<Navigate to="/dashboard" />) :
        (<AppLayout><Login setUser={setUserDetails} /></AppLayout>))}/>
      <Route path="/dashboard" element={userDetails ? 
        (<UserLayout><Dashboard user={userDetails} /></UserLayout>) : 
        (<Navigate to="/login" />)}/>
      <Route path="/logout" element={userDetails ? 
        (<Logout setUser={setUserDetails}/>) :
        (<Navigate to="/login" />)}/>
      <Route path="/reset" element={(userDetails ?
        (<Navigate to="/dashboard" />) :
      (<AppLayout><Reset/></AppLayout>))}/>
    </Routes>
  );
}

export default App;