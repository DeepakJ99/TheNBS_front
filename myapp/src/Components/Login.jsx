import '../landing.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope, faLockl, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { useState,  useEffect } from 'react'
import {useNavigate, useLocation } from 'react-router-dom'
import  axios  from '../api/api'
import useAuth from '../hooks/useAuth'

const LOGIN_URL = "auth/login"
export default function Login(){
    const {setAuthenticated, persist, setPersist} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";


    const Popup = ({ message, bgColor, color}) => (
      <div className="popup" style={{
          backgroundColor:bgColor,
          border:"solid 1px "+color
      }}>
        <p>{message}</p>
      </div>
    );

  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')

  const [showPwd, setShowPwd] = useState(false)

  const [errMsg, setErrMsg] = useState('')


  
  const handleSubmit = async (e) =>{
      e.preventDefault();
      try{
          
          
          const response = await axios.post(LOGIN_URL,
            JSON.stringify({email, password:pwd, role:"ADMIN"}),
            {
              headers: {'Content-Type' : 'application/json'}
            })
          console.log(response.data)
          if(response.data.statusCodeValue !== 200){
              if(response.data.statusCodeValue === 401){
                 setErrMsg("Username not registered.")
              }
            
              else {
                setErrMsg("Internal server error.")
              }
          }
          else {
              console.log(response.data)
              
              const access_token = response?.data?.body?.access_token
              const refresh_token = response?.data?.body?.refresh_token
              const role = response?.data?.body?.role
              setAuthenticated({
                email,
                role:[role], 
                access_token})
              setEmail('')
              setPwd('')
              // localStorage.setItem("access_token",response.data.body.access_token)
              // localStorage.setItem("refresh_token",response.data.body.refresh_token)
              console.log("Here");
              navigate(from, {replace:true})
          }
      }catch(error){
         setErrMsg("An unexpected error occurred.")
      }
  }
    const togglePersist = () => {
    setPersist(prev => !prev);
    }
    useEffect(() => {
      if (errMsg !== '') {
        const timerId = setTimeout(() => {
          setErrMsg('');
        }, 2000);
  
        // Clear the timeout if the component unmounts or errMsg changes
        return () => clearTimeout(timerId);
      }
    }, [errMsg]);
    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])
    return(
    <div className="landing-container">
        <div className="landing-landing">
          <img
            alt="bg-image"
            src="/bg-image-landing.jpg"
            className="bg-image"
          />
          <div
            className="bg-overlay-black"
          />
          <div className='logo-container'>
            <img src = "/logo.jpg"/>
          </div>
          <div className="content-container">
            <div className="content-container-child">
              <span className="sign-in-text">Welcome back</span>
                <form className='register-form'>
                  <div className="form-input">
                    <FontAwesomeIcon icon={faEnvelope} color='white'/>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      autoComplete='false'
                      value={email}
                      onChange={(e)=> setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-input">
                    <button onClick={(e)=>{e.preventDefault(); setShowPwd(!showPwd)}}>
                    {showPwd ? <FontAwesomeIcon icon={faEye} color='white'/> :
                       <FontAwesomeIcon icon={faEyeSlash} color='white'/>}</button>
                    <input
                      type={showPwd?"text":"password"}
                      placeholder="Enter your password"
                      autoComplete='false'
                      name="password"
                      value={pwd}
                      onChange={(e)=> setPwd(e.target.value)}
                    />
                  </div>
                  {(errMsg!='') && (
                    <Popup 
                    message={errMsg} 
                    color = "red" 
                    bgColor="rgba(255,0,0,0.3)"
                    />
                  )}
                  <button onClick={handleSubmit} className="sign-in-google-button">
                    Sign in
                  </button >
                  <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor="persist">Trust This Device</label>
                </div>
                </form>
                {/* <span className="forgot-password"><span>Forgot password?</span></span> */}
                
                <button className="link-to-register-button" onClick={()=>{
                  navigate("/register")}
                  }> 
                  <span>Not a member yet? Sign up.</span>
                </button>
               
              
            </div>
          </div>
          
        </div>
      </div>)
}