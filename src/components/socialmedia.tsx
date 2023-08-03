// imports
import '../static/login.css'
import { FaGoogle } from "react-icons/fa";

// social media login component
export function SocialLogin(){
    return(
        <div className="social-media">
            <p className="social-text">Or Sign up using Google</p>
                      <a href="#" className="social-icon">
                      <FaGoogle/>
                      </a>
                    </div>
    );
}