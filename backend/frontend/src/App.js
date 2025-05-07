// import { BrowserRouter, Routes, Route } from "react-router-dom"
// import RoutesSelf from './RoutesSelf';
// import Navbar from "./components/Navbar"
// function App() {
//   return (
//     <div>
   
//         <BrowserRouter>
//         <Navbar/>
//         <RoutesSelf/>
//         </BrowserRouter>
//     </div>
//   );
// }

// export default App;


import './App.css';
import { useReducer } from 'react';
import RoutesSelf from './RoutesSelf'
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reducer1 from './components/reducers/Reducer1';
import { stateContext,stateDispatchContext } from './components/contextAPI/Context1';
let initialState1={"user":null,"authorized":false,"Reload":false}

function App() {
  const [state1, dispatch] = useReducer(
    Reducer1,
    initialState1
  );
  console.log("env value is",process.env.REACT_APP_test_var)
  return (
    <div className="App h-screen font-mono">
        <BrowserRouter>
        <stateContext.Provider value={state1}>
          <stateDispatchContext.Provider value={dispatch}>

          
        <Navbar/>
        {/* <Logout/> */}
        <RoutesSelf />
      
        </stateDispatchContext.Provider>

        </stateContext.Provider> 
     </BrowserRouter>
    </div>
  );
}

export default App;