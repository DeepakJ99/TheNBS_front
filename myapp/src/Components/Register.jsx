import '../landing.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons'
import useAuth from '../hooks/useAuth'
import { useState,useEffect } from 'react'
import { register } from './api'
import { useNavigate,useLocation } from 'react-router-dom'

export default function Register(){
    const {authenticated, setAuthenticated } = useAuth()
    const Popup = ({ message, bgColor, color}) => (
        <div className="popup" style={{
            backgroundColor:bgColor,
            border:"solid 1px "+color
        }}>
          <p>{message}</p>
        </div>
      );

    const [form, setForm] = useState({
        name:"",
        email:"",
        password:"",
        cpassword:""
    })
    const [popUp,setPopup] = useState({message:null, color:"", bgColor : ""})
    const handleChange = (e) => {
        console.log(e)
        const { name, value } = e.target;
        setForm({
          ...form,
          [name]: value,
        });
      };
      const navigate = useNavigate()
      const location = useLocation()
      const from = location.state?.from?.pathname || "/";
    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log("hey")
        const access_token = "Aaa"
        setAuthenticated({access_token})
        navigate(from, { replace: true });
      }
      useEffect(()=>{
        console.log(authenticated)
      }, [authenticated])

      
    //     try{
    //         setForm( {...form, role:"ADMIN"})
    //         const response = await register(form)
    //         console.log(response.data.statusCodeValue)
    //         if(response.data.statusCodeValue !== 200){
    //             if(response.data.statusCodeValue === 409){
    //                 setPopup({message:"Username is already registered.", color:"red",bgColor:"rgba(255,0,0,0.1)"})
    //             }
    //             else setPopup({message:"Internal server error.", color:"red",bgColor:"rgba(255,0,0,0.1)"})
    //         }
    //         else {
    //             console.log(response.data)
    //             setPopup({message:"Successfully registered.", color:"green",bgColor:"rgba(0,255,0,0.1)"})
    //             // localStorage.setItem("access_token",response.data.body.access_token)
    //             // localStorage.setItem("refresh_token",response.data.body.refresh_token)
    //             setAuthenticated(response.data.body.access_token)
    //         }
            
    //     }catch(error){
    //         setPopup(
    //             {message:"An unexpected error occured.",color:"red",bgColor:"rgba(255,0,0,0.3)"}
    //         )
    //         setTimeout(() => {
    //             setPopup({message:"", color:"",bgColor:""});
    //           }, 2000);
    //     }
    // }
    // useEffect(() => {
    //     if (popUp) {
    //       const timerId = setTimeout(() => {
    //         setPopup({message:"",color:"",bgColor:""});
    //       }, 2000);
    
    //       // Cleanup the timer when the component unmounts or when a new error occurs
    //       return () => clearTimeout(timerId);
    //     }
    //   }, [popUp]);
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
          
          <div className="content-container-register">
            <div className="content-container-child">
              <span className="sign-in-text">Welcome to thenakedbookstore</span>
              <form>
              <div className="form-input">
                <FontAwesomeIcon icon={faEnvelope} color='white'/>
                <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                />
                  </div>
                  <div className="form-input">
                    <FontAwesomeIcon icon={faEnvelope} color='white'/>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-input">
                    <FontAwesomeIcon icon={faLock} color='white'/>
                    <input
                      type="password"
                      name="password"
                      placeholder="Your password"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-input">
                    <FontAwesomeIcon icon={faLock} color='white'/>
                    <input
                      type="password"
                      name="cpassword"
                      placeholder="Confirm password"
                      value={form.cpassword}
                      onChange={handleChange}
                    />
                  </div>
                </form>
               
                {popUp.message && (
                    <Popup 
                    message={popUp.message} 
                    color = {popUp.color} 
                    bgColor={popUp.bgColor} 
                    />
                )}
                <button 
                        onClick = {handleSubmit} 
                        className="sign-in-google-button">
                    <span>Sign up</span>
                </button>
                
                
                  <button type="submit" className="link-to-register-button">
                    <span>Already a member? Sign in.</span>
                  </button>
               
              
            </div>
          </div>
          
        </div>
      </div>)
}