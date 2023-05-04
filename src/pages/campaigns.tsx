import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { auth } from "../lib/firebase";
import { useState } from "react";

export const Campaigns  = () => {
    const navigate = useNavigate(); 
    const [userMenu, setUserMenu] = useState(false);
    const user = auth.currentUser || {displayName: ""};

    function toggleUserMenu(){
        setUserMenu(!userMenu)
    }

    return (
        <div className="container">
            <header>
                <div className="tabs">
                    <div>
                        <button className="tab closed" onClick={()=>navigate("/characters", {replace:true})}>Characters</button>
                        <button className="tab open">Campaigns</button>
                    </div>
                </div>
                <div className="header-content">
                    <h1>D&d Character Creator</h1>
                    <button className="userButton" onClick={toggleUserMenu}></button>
                </div>
            </header>
            <div className="folder">
                <div className="page">
                    
                </div>
            </div>
            {
            userMenu ? <>
                    <div className="user-menu-container">
                        <div className="user-menu-box">
                            <div className="decor-top">
                                <div className="decor-top-left"></div>
                                <div className="decor-top-right"></div>
                            </div>
                            <div className="user-middle">
                                <div className="decor-mid-left"></div>
                                <div className="user-menu-form">
                                    <h1>{user.displayName}</h1>
                                    <div className="login-button-container">
                                        <button className="login-input" onClick={toggleUserMenu}>Back</button>
                                        <div className="login-spacer"></div>
                                        <button className="login-input" onClick={()=>{signOut(auth)}}>Log out</button>
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
                </> : <></>
            }
            <button className="new"></button>
        </div>
    )
}