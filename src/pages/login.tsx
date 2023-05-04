import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const Login  = () => {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    function login() {
        signInWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
            console.log(user)
        })
    }


    return (
        <div className="loginContainer">
            <div className="login-box">
                <div className="decor-top">
                    <div className="decor-top-left"></div>
                    <div className="decor-top-right"></div>
                </div>
                <div className="login-middle">
                    <div className="decor-mid-left"></div>
                    <div className="login-form">
                        <h1>Log In</h1>
                        <label className="login-label">
                            Email
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className="login-input"></input>
                        </label>
                        <label className="login-label">
                            Password
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input"></input>
                        </label>
                        <div className="login-button-container">
                            <button onClick={()=>navigate("/signup")} className="login-input">Signup</button>
                            <div className="login-spacer"></div>
                            <button onClick={() =>{login()}} className="login-input">Login</button>
                        </div>
                    </div>
                    <div className="decor-mid-right"></div>
                </div>
                <div className="decor-bottom">
                    <div className="decor-bottom-left"></div>
                    <div className="decor-bottom-right"></div>
                </div>
            </div>
        </div>
    )
}