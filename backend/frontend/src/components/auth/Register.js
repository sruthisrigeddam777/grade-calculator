import { useState, useContext } from "react";
import human from "../images/human.jpeg";
import { config } from "./../../config";
import axios from 'axios';
import { stateContext } from '../contextAPI/Context1';
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Import the CSS file for custom styles

export default function Register() {
    const navigate = useNavigate();
    const state1 = useContext(stateContext);
    const [userData, setUserData] = useState({ name: "", email: "", password: "", admin_password: "" });

    function onChangeHandler(e) {
        setUserData((userData) => ({ ...userData, [e.target.name]: e.target.value }));
    }

    async function onSubmitHandler(e) {
        e.preventDefault();
        window.alert("Submitted");
        let headers = { 'Content-Type': 'application/json' };
        let body = userData;

        let response = await axios.post(config + "/auth/register", body, { headers: headers });
        console.log("Response:", response);
        window.alert(response.statusText);
        navigate("/");
    }

    return (
        <div className='bg-cover bg-center' style={{ 
            backgroundImage: `url(https://img.jagranjosh.com/images/2023/January/212023/Universities.jpg)`,
            paddingTop: '5rem'  // Adjust padding to create space from the navbar
        }}>
            <div className="container mx-auto px-4">
                <form className='glass max-w-md mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4'
                      onSubmit={(e) => onSubmitHandler(e)}>
                    <div className="flex justify-center mb-4">
                        <img src={human} alt="human logo" className="rounded-full w-24 h-24" />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-white text-sm font-bold mb-2' htmlFor='name'>
                            Name
                        </label>
                        <input type='text' value={userData.name} name="name" onChange={(e) => onChangeHandler(e)}
                               className='border-4 border-light-blue-500 border-opacity-100 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-white text-sm font-bold mb-2' htmlFor='email'>
                            Email
                        </label>
                        <input type='email' value={userData.email} name="email" onChange={(e) => onChangeHandler(e)}
                               className='border-4 border-light-blue-500 border-opacity-100 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-white text-sm font-bold mb-2' htmlFor='password'>
                            Company New Password
                        </label>
                        <input type='password' value={userData.password} name="password" onChange={(e) => onChangeHandler(e)}
                               className='border-4 border-light-blue-500 border-opacity-100 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                    </div>
                    <div className='mb-6'>
                        <label className='block text-white text-sm font-bold mb-2' htmlFor='admin_password'>
                            Admin Password
                        </label>
                        <input type='password' value={userData.admin_password} name="admin_password" onChange={(e) => onChangeHandler(e)}
                               className='border-4 border-light-blue-500 border-opacity-100 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                    </div>
                    <div className='flex items-center justify-center'>
                        <button className='bg-dark-gray hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
