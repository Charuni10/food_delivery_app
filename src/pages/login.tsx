// imports
import  { useState } from "react";
import '../static/login.css';
import login from '../images/login.svg';
import signup from '../images/signup.svg';
import { useNavigate } from "react-router";
// importing icons
import { SocialLogin } from "../components/socialmedia";
import { AiOutlineUser } from "react-icons/ai";
import{ RiLockPasswordLine } from "react-icons/ri";
import{ AiOutlineMail} from "react-icons/ai";




export function Login(){
// declare states
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const Username = "admin";
    const Password = "password";
    const [isSignUp,setIsSignUP] = useState<boolean>(false);

    // function to change the login to signup and vise versa
    const clickSignUp = () =>{
        setIsSignUP(true)
    };
    const clickSignIn = () =>{
        setIsSignUP(false)
    };

    // authentication of login credentials
    const handleLogin = () => {
        if (username === Username && password === Password) {
          
          navigate("/home");
        } else {
          alert("Invalid Password and username")
        }
      };
    

    return(
// login and signup 
        <div className={`container ${isSignUp ? "sign-up-mode" : ""}`}>
            
        <div className="forms-container">
            <div className="signin-signup">
                <form className="sign-in-form">
                    <h2 className="title">Sign In</h2>
                    <div className="input-field">
                        <AiOutlineUser className="icons"/>
                        <input type="text"  value={username}
          onChange={(e) => setUsername(e.target.value)}
                                 placeholder="username"/>
                    </div>
                    <div className="input-field">
                        <RiLockPasswordLine className="icons"/>
                        <input type="password" value={password}
          onChange={(e) => setPassword(e.target.value)}
                          placeholder="password"/>
                    </div>
                    <input type="button"  onClick={handleLogin} value="Login" className="btn"/>
                    <SocialLogin/>
                </form>

                <form className="sign-up-form">
                    <h2 className="title">Sign Up</h2>
                    <div className="input-field">
                        <AiOutlineMail className="icons"/>
                        <input type="text" placeholder="email"/>
                    </div>
                    <div className="input-field">
                        <RiLockPasswordLine className="icons"/>
                        <input type="password"  placeholder="password"/>
                    </div>
                    <input type="button"value="Signup" className="btn"/>
                  <SocialLogin/>
                </form>
            </div>
        </div>
        <div className="panels-container">
             <div className="panel left-panel">
                <div className="content">
                    <h3>New here?</h3>
                    <p>Join here to enjoy delicious foods all around the city!</p>
                    <button className="btn transparent" id="sign-up-btn" onClick={clickSignUp}>Sign Up</button>
                </div>
                <img className="image" src={signup} alt=""/>
             </div>
             <div className="panel right-panel">
                <div className="content">
                    <h3>Not a new face here?</h3>
                    <p>Enjoy the delicious foods which are in your city!</p>
                    <button className="btn transparent" id="sign-in-btn" onClick={clickSignIn}>Sign In</button>
                </div>
                <img className="image" src={login} alt=""/>
             </div>
        </div>
    </div>
    );
}

