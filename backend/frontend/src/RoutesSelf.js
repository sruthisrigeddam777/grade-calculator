import Home from "./components/Home"
import Viewer from "./components/Viewer"
import Student from "./components/Student"
import Register from "./components/auth/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from  "./components/auth/Login"
import Profile from "./components/personalized/Profile"
import ProtectedComponent from "./components/protectedComponent/ProtectedComponent"
export default function RoutesSelf(){
    return(
        
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/Student" element={<Student/>}></Route>
      <Route path="/Viewer" element={<ProtectedComponent><Viewer/></ProtectedComponent>}></Route>
      <Route path="/Register" element={<Register/>}></Route>
      <Route path="/Login" element={<Login/>}></Route>

      <Route path="/Profile" element={
        <ProtectedComponent><Profile/></ProtectedComponent>}></Route>
    </Routes>
    
    )
}