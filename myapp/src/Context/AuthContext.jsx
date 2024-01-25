// AuthContext.js
import { createContext,  useState } from 'react';


const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState({})
  console.log(authenticated)
  // const {getItem} = useLocalStorage()

  // useEffect(()=>{
  //   const fn =  () =>{
  //     if(getItem("access_token") !== null){
  //           console.log("exists")
  //           setAuthenticated(true)
  //         }
  //     else{
  //       console.log("doesnt exist")
  //     }}
  //   fn()
  // })
  
 return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
          {children}
        </AuthContext.Provider>
      );
};


export default AuthContext