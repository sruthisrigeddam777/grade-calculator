
import { stateContext,stateDispatchContext } from '../contextAPI/Context1';
import { useContext } from "react";
import { Navigate } from "react-router-dom";
export default function ProtectedComponent({children}){
    const state1=useContext(stateContext);
    // console.log("stae1 is from protected componetes",state1)
    if(!state1.authorized){
        return <Navigate to="/Login" replace={true} />
    }
    else{
        return <>
        {children}
        </>
    }
}
    