import '../landing.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye, faEyeSlash, faEnvelope, faCircleXmark, faCheck, faLock, faCircleCheck, faTimes, faInfoCircle, faUser} from '@fortawesome/free-solid-svg-icons'
import useAuth from '../hooks/useAuth'
import { useState,useEffect, useRef } from 'react'
import { useNavigate,useLocation, Navigate } from 'react-router-dom'
import axios from '../api/api'
const REGISTER_URL = "auth/register"
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const NAME_REGEX = /^[a-zA-Z]+(?: [a-zA-Z]+){0,2}$/
export default function Register(){

    const userRef = useRef()
    const errRef = useRef()

    const [name, setName] = useState('')
    const [validName, setValidName] = useState(false)
    const [nameFocus, setNameFocus] = useState(false)

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate()

    const [showPassword,setShowPassword]= useState(false)

    
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(()=>{
      setValidName(NAME_REGEX.test(name))
    },[name])
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(PWD_REGEX.test(matchPwd) && pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd, matchPwd, name])
  
    const Popup = ({ message, bgColor, color}) => (
      <div className="popup" style={{
          backgroundColor:bgColor,
          border:"solid 1px "+color
      }}>
        <p>{message}</p>
      </div>
    );
      
      
      
    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log("clicked")
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry.");
            return;
        }

        try{
            const response = await axios.post(REGISTER_URL,
              JSON.stringify({
                name,
                email:email,
                password:pwd,
                cpassword:matchPwd,
                role : "ADMIN"}),
              {
                headers: {'Content-Type' : 'application/json'}
              })
            console.log(response.data.statusCodeValue)

            
            if(response.data.statusCodeValue !== 200){
                if(response.data.statusCodeValue === 409){
                    setErrMsg('Username is already registered.')
                    
                }
                else {setErrMsg('Internal server error.')}
               
            }
            else {
                console.log(response.data)
                setSuccess(true)
                setEmail('')
                setName('')
                setPwd('')
                setMatchPwd('')
            }
        }catch(error){
            setErrMsg('An unexpected error occurred.')
       
        }
      }
    
    return (
    <>
       {success ? (
          <section>
            <h1>Success!</h1>
            
            <div className="landing-container">
              <div className="landing-landing">
                <img
                  alt="bg-image"
                  src="/bg-image-landing.jpg"
                  className="bg-image"
                />
                <div className="bg-overlay-black"></div>    
                <div className="content-container-register">
                  <div className="content-container-child">
                    <span style={{
                      color:"white",
                      fontSize:"13px"
                    }}>Registration Successful.</span>
                    <button className="take-to-login" onClick={()=>{navigate("/login")}}>
                      Take me to login.
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
       ) : (
        <section>
          <div className="landing-container">
            <div className="landing-landing">
              <img
                alt="bg-image"
                src="/bg-image-landing.jpg"
                className="bg-image"
              />
              <div className="bg-overlay-black"></div>    
              <div className="content-container-register">
                <div className="content-container-child">
                  <span className="sign-in-text">Welcome to thenakedbookstore</span>
                  <form className='register-form'>
                    <div className='form-input-group'>
                      <div className="form-input" >
                        <FontAwesomeIcon icon={faUser} color='white'/>
                        <input
                            type="text"
                            name="name"
                            id = "name"
                            autoComplete='off'
                            placeholder="Your name..."
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            required
                            aria-invalid = {validName?"false":"true"}
                            aria-describedby='NameNote'
                            onFocus={()=>setNameFocus(true)}
                            onBlur={()=>setNameFocus(false)}
                        />
                        <label className="input-label" htmlFor='name'>
                          
                          <FontAwesomeIcon icon={faCircleCheck} className={validName ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faCircleXmark} className={validName || !name ? "hide" : "invalid"} />
                  
                        </label>
                      </div>
                      <p id="NameNote" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                              <FontAwesomeIcon icon={faInfoCircle} />
                               Name can include 1 to 3 words
                              and no leading or trailing spaces<br/>
                      </p>
                    </div>
                    
                    <div className='form-input-group'>
                      <div className="form-input">
                      <FontAwesomeIcon icon={faEnvelope} color='white'/>
                        <input
                            type="email"
                            name="email"
                            id = "email"
                            autoComplete='off'
                            placeholder="Your email id.."
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                            aria-invalid = {validEmail?"false":"true"}
                            aria-describedby='EmailNote'
                            onFocus={()=>setEmailFocus(true)}
                            onBlur={()=>setEmailFocus(false)}
                        />
                        <label htmlFor='email'>
                          <FontAwesomeIcon icon={faCircleCheck} className={validEmail ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faCircleXmark} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                      </div>
                      <p id="EmailNote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                              <FontAwesomeIcon icon={faInfoCircle} />
                              Must be a valid email.<br/>
                      </p>
                    </div>
                    <div className='form-input-group'>
                      <div className="form-input">
                        <button onClick={
                          (e)=>{
                            e.preventDefault()
                            setShowPassword(!showPassword)
                          }
                        }>
                      {showPassword ? <FontAwesomeIcon icon={faEye} color='white' />: <FontAwesomeIcon icon={faEyeSlash} color='white'/>}
                        </button>
                        <input
                          type={showPassword?"text":"password"}
                          name="password"
                          id = "password"
                          autoComplete='off'
                          placeholder="Your password.."
                          value={pwd}
                          onChange={(e)=>setPwd(e.target.value)}
                          required
                          aria-invalid = {validPwd?"false":"true"}
                          aria-describedby='PwdNote'
                          onFocus={()=>setPwdFocus(true)}
                          onBlur={()=>setPwdFocus(false)}
                        />
                        <label htmlFor='password'>
                        <FontAwesomeIcon icon={faCircleCheck} className={validPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faCircleXmark} className={validPwd || !pwd ? "hide" : "invalid"} />
                      </label>
                      </div>
                      <p id="PwdNote" className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}>
                              <FontAwesomeIcon icon={faInfoCircle} />
                              8 to 24 characters.<br />
                              Must include uppercase and lowercase letters, a number and a special character.<br />
                              Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                      </p>
                    </div>
                    <div className='form-input-group'>
                      <div className="form-input">
                        <FontAwesomeIcon icon={faLock} color='white'/>
                        <input
                          type={showPassword?"text":"password"}
                          name="cpassword"
                          id = "cpassword"
                          autoComplete='off'
                          placeholder="Confirm your password.."
                          value={matchPwd}
                          onChange={(e)=>setMatchPwd(e.target.value)}
                          required
                          aria-invalid = {validPwd?"false":"true"}
                          aria-describedby='CPwdNote'
                          onFocus={()=>setMatchFocus(true)}
                          onBlur={()=>setMatchFocus(false)}
                        />
                        <label htmlFor='cpassword'>
                          <FontAwesomeIcon icon={faCircleCheck} className={validMatch ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faCircleXmark} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                      </div>
                      <p id="CPwdNote" className={matchPwd && matchFocus && !validMatch ? "instructions" : "offscreen"}>
                              <FontAwesomeIcon icon={faInfoCircle} />
                              Must match the above password.
                      </p>
                    </div>
                  </form>
                
                {errMsg && <Popup ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg} </Popup>}
                  <button 
                  disabled = {!validName || !validPwd || !validMatch ? true:false}
                          onClick = {handleSubmit} 
                          className="sign-in-google-button">
                      <span>Sign up</span>
                  </button>
                  <button 
                    
                    onClick={()=>{
                      navigate("/login")
                    }} className="link-to-register-button">
                      <span>Already a member? Sign in.</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        )}
    </>
    )
}