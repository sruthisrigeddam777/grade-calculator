import axios from 'axios';
import { useState } from 'react';
import { config } from "../config";
import { useNavigate } from 'react-router-dom';
import "./Student.css"; // Import the CSS file for custom styles
import student1 from "../components/images/student1.png"

export default function Student() {
    const navigate = useNavigate();
    let [studentId, setStudentId] = useState("");
    let [studentpass, setStudentpass] = useState("");
    let [havePoints, setHasPoints] = useState(false);
    let [answer, setAnswer] = useState(0);

    async function submitHandler(e) {
        e.preventDefault();
        window.alert("Calculating... Please wait.");
        let headers = { 'Content-Type': 'application/json' };
        let body = { "studentId": studentId, "studentpass": studentpass };

        try {
            console.log("Headers:", headers, "Body:", body, "Config:", config);
            let response = await axios.post(config + "/route1", body, { headers: headers });

            if (response.status === 200) {
                window.alert("Successfully retrieved data from /route1");
                console.log("Response Data:", response.data);
                setHasPoints(true);
                setAnswer(response.data.points);
            } else {
                window.alert("Failed to retrieve data from /route1. Please try again later.");
                console.log("Response from /route1 in frontend:", response);
            }
        } catch (e) {
            window.alert("Please contact the admin.");
        }
    }

    return (
        <div className='h-screen flex items-center justify-center bg-cover bg-center' style={{ backgroundImage: `url(https://img.jagranjosh.com/images/2023/January/212023/Universities.jpg)` }}>
            <div className="container mx-auto px-4">
                {!havePoints ? (
                    <form className='glass max-w-md mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4'
                          onSubmit={(e) => submitHandler(e)}>
                        <div className="flex justify-center mb-4">
                            <img src={student1} alt="human logo" className="rounded-full w-24 h-24" />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-white text-sm font-bold mb-2' htmlFor='studentId'>
                                ID
                            </label>
                            <input type='text' value={studentId} onChange={(e) => setStudentId(e.target.value)}
                                   className='border-4 border-light-blue-500 border-opacity-100 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                        </div>
                        <div className='mb-6'>
                            <label className='block text-white text-sm font-bold mb-2' htmlFor='studentpass'>
                                Student Password
                            </label>
                            <input type='password' value={studentpass} onChange={(e) => setStudentpass(e.target.value)}
                                   className='border-4 border-light-blue-500 border-opacity-100 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                        </div>
                        <div className='flex items-center justify-center'>
                            <button className='bg-dark-gray hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                    type='submit'>
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
