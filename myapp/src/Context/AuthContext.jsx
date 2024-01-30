// AuthContext.js
import { createContext,  useState } from 'react';


const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState({})

  

  const [persist, setPersist] = useState(JSON.parse(
                                              localStorage.getItem("persist")) || false)
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
        <AuthContext.Provider value={{ authenticated, setAuthenticated, persist, setPersist }}>
          {children}
        </AuthContext.Provider>
      );
};


export default AuthContext