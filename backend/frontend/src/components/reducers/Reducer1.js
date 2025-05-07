
export default function Reducer1(theState,action){
    switch (action.type) {
        case 'LoginSuccess': {

        let user = action.text;
            localStorage.setItem("user",user)
            // console.log("in reducer/reducer1.js login sucess console")
          return {authorized:true,user:action.text}
        }
        case 'Logout':
          {
            // console.log("logout from reducer")
         
          localStorage.removeItem("user")
          return {authorized:false,user:null}
          }
        case "LoginFail":{
          // console.log("logout from reducer")
          // window.alert("incorrect login try again")
          localStorage.removeItem("user")
          return {authorized:false,user:null}
        }
        

       
        default: {
          throw Error('Unknown action: ' + action.type);
        }
      }

}
