import axios from 'axios'
import human from "../images/human.jpeg"
import { useEffect, useState } from 'react'
import { config} from "../../config.js";
export default function Profile() {
    let [userData, setUserData] = useState({ "te": "tee" })
    let [hasProfile, setHasProfile] = useState(false)
    useEffect(() => {
        async function fetchData() {
            let headers = { 'Content-Type': 'application/json' }
            let body = { "givenToken": localStorage.getItem("user") }
            let res = await axios.post(config+"/profile", body = body, headers = headers)
            // console.log("ress of profiee,",res.data)
            setUserData(res.data)
            // console.log("the state",userData)
            setHasProfile(true)
        }
        fetchData()
    }, [])

    return (
    hasProfile ? <div className='h-screen flex flex-col items-center justify-center'>
        <img src={human} alt="human logo" className="rounded-full w-24 h-24 p-2" />
        <div className='container' style={{"marginLeft":"20vh"}}>
            <div >
                  {/* name:   {userData.name} <br /> */}
            
                   email:    {userData.email}
            </div>
        </div>
    </div> : <>hi</>
    )
}