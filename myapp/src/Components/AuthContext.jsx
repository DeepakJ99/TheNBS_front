// AuthContext.js
import { createContext, useContext,useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

const AuthContext = createContext({authenticated:false, setAuthenticated: ()=>{}})

export const AuthProvider = ({ children }) => {
  const {authenticated, setAuthenticated} = useContext(AuthContext)
  const {setItem, getItem} = useLocalStorage()
  useEffect(() => {
    // Check for the existence of an access token in local storage or any other storage mechanism
    const accessToken = getItem('access_token'); 
    if (accessToken) {
      setAuthenticated(true);
    }
    else console.log("no access token")
  }, []);

  useEffect(()=>{
    console.log(authenticated)
  },[authenticated])

  return (
    <AuthContext.Provider value={{authenticated, setAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
