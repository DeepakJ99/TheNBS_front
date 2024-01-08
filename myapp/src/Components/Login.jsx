import '../landing.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
export default function Login(){
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
              <form>
                
                  <div className="form-input">
                    <FontAwesomeIcon icon={faEnvelope} color='white'/>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      // value={email}
                      // onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-input">
                    <FontAwesomeIcon icon={faLock} color='white'/>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      // value={password}
                      // onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </form>
                <span className="forgot-password"><span>Forgot password?</span></span>
                
                <div className="sign-in-google-button">
                  
                  
                    <span>Sign in</span>
                  
                </div>
                
                
                  <button type="submit" className="link-to-register-button">
                    <span>Not a member yet? Sign up.</span>
                  </button>
               
              
            </div>
          </div>
          
        </div>
      </div>)
}