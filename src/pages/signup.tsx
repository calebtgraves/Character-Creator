import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { useState } from "react";

export const Signup  = () => {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    function signUp() {
        createUserWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
            updateProfile(user,{displayName:username})
            console.log(user);
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
                            Username
                            <input value={username} onChange={(e) => setUsername(e.target.value)} className="login-input"></input>
                        </label>
                        <label className="login-label">
                            Email
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className="login-input"></input>
                        </label>
                        <label className="login-label">
                            Password
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input"></input>
                        </label>
                        <div className="login-button-container">
                            <button onClick={()=>navigate("/login")} className="login-input">Back</button>
                            <div className="login-spacer"></div>
                            <button onClick={()=>{signUp()}} className="login-input">Signup</button>
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