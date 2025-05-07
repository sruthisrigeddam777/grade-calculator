import { useState } from "react";
import axios from "axios";
import { config } from "../config";
import "./Viewer.css"; // Import the CSS file for custom styles

export default function Viewer() {
  let [studentId, setStudentId] = useState("");
  let [havePoints, setHasPoints] = useState(false);
  let [answer, setAnswer] = useState(0);

  async function onSubmitHandler(e) {
    e.preventDefault();
    window.alert("Fetching... please wait");
    let headers = { "Content-Type": "application/json" };
    let body = { "IdNumber": studentId };

    try {
      let response = await axios.post(config + "/route1/getData", body, { headers: headers });
      if (response.status === 200) {
        setAnswer(response.data.points);
        setHasPoints(true);
      }
    } catch (e) {
      window.alert("Contact admin");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(https://img.jagranjosh.com/images/2023/January/212023/Universities.jpg)` }}>
      <div className="container mx-auto px-4">
        {!havePoints ? (
          <form className='glass max-w-md mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={(e) => onSubmitHandler(e)}>
            <div className='mb-4'>
              <label className='block text-white text-sm font-bold mb-2' htmlFor='studentId'>
                ID
              </label>
              <input type='text' value={studentId} onChange={(e) => setStudentId(e.target.value)} className='border-4 border-light-blue-500 border-opacity-100 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
            </div>
            <div className='flex items-center justify-center'>
              <button className='bg-dark-gray hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
                Submit
              </button>
            </div>
          </form>
        ) : (
          <div className='glass max-w-md mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <p className='text-center text-3xl font-bold text-gray-800'>{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
