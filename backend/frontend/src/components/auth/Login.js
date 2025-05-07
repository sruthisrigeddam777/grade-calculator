import { useEffect, useState, useContext } from "react";
import human from "../images/human.jpeg";
import axios from 'axios';
import { config } from "./../../config";
import { stateContext, stateDispatchContext } from '../contextAPI/Context1';
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file for custom styles

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useContext(stateDispatchContext);
  const state1 = useContext(stateContext);
  const [userData, setUserData] = useState({ email: "", password: "" });

  function onChangeHandler(e) {
    setUserData((userData) => ({ ...userData, [e.target.name]: e.target.value }));
  }

  useEffect(() => {
    if (state1.authorized) {
      navigate("/profile");
    }
  }, [state1, navigate]);

  async function onSubmitHandler(e) {
    e.preventDefault();
    window.alert("Checking your credentials...");
    let headers = { 'Content-Type': 'application/json' };
    let body = userData;

    try {
      let response = await axios.post(config + "/auth/login", body, { headers: headers });
      if (response.status === 200 && response.data.token) {
        navigate("/profile");
        dispatch({
          type: 'LoginSuccess',
          text: response.data.token,
        });
      } else {
        window.alert("Incorrect login, try again.");
        dispatch({
          type: "LoginFail"
        });
      }
    } catch (e) {
      window.alert("Contact admin");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(https://img.jagranjosh.com/images/2023/January/212023/Universities.jpg)` }}>
      <div className="container mx-auto px-4">
        <form className="glass max-w-md mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center" onSubmit={(e) => onSubmitHandler(e)}>
          <img src={human} alt="human logo" className="rounded-full w-24 h-24 mb-4" />
          <div className="mb-4 w-full">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input type="email" value={userData.email} name="email" onChange={(e) => onChangeHandler(e)} className="border-4 border-light-blue-500 border-opacity-100 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-6 w-full">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input type="password" value={userData.password} name="password" onChange={(e) => onChangeHandler(e)} className="border-4 border-light-blue-500 border-opacity-100 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="flex items-center justify-center">
            <button className="bg-dark-gray hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
