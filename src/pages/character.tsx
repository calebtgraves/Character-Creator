import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { auth, rtdb } from "../lib/firebase"
import { child, get, onValue, ref, set } from "firebase/database"




export const Character = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    const characterRef = ref(rtdb,"characters/"+location.state.characterId)
    const [characterMenu,setCharacterMenu] = useState(false);
    
    const [characterName, setCharacterName] = useState("")
    const [classNLevel,setClassNLevel] = useState("")
    const [background,setBackground] = useState("")
    const [race,setRace] = useState("")
    const [alignment,setAlignment] = useState("")
    const [xp,setXp] = useState(0)
    
    const [strength,setStrength] = useState(10)
    const [dexterity,setDexterity] = useState(10)
    const [constitution,setConstitution] = useState(10)
    const [intelligence,setIntelligence] = useState(10)
    const [wisdom,setWisdom] = useState(10)
    const [charisma,setCharisma] = useState(10)
    
    function toggleCharacterMenu(){
        setCharacterMenu(!characterMenu)
    }
    
    async function setCharacter(){
        const character = get(child(ref(rtdb),'characters/'+location.state.characterId)).then((data)=>data.val())
        await character.then((data)=>{
            setCharacterName(data.characterName)
            setClassNLevel(data.classNLevel)
            setBackground(data.background)
            setRace(data.race)
            setAlignment(data.alignment)
            setXp(data.xp)
        })
    }
    useEffect(()=>{
        setCharacter()
    },[])

    useEffect(()=>{
        set(ref(rtdb,"characters/"+location.state.characterId),{
            userId: auth.currentUser?.uid,
            playerName: auth.currentUser?.displayName,
            characterName,
            classNLevel,
            background,
            race,
            alignment,
            xp
        });
    })

    return(
        <div className="container">
            <div className="folder full">
                <div className="bookmark">
                    <div className="bookmark-top">
                        <button className="character-image" onClick={toggleCharacterMenu}></button>
                        <div className="stats-container">
                            <div className="stat">
                                <p>Strength</p>
                                <input value={strength} onChange={(e)=>setStrength(Number(e.target.value))} type="number" className="stat-input" min="3" max="30"></input>
                                <div className="stat-modifier">
                                    {Math.floor((strength-10)/2)>=0? "+"+Math.floor((strength-10)/2):Math.floor((strength-10)/2)}
                                </div>
                            </div>
                            <div className="stat">
                                <p>Dexterity</p>
                                <input value={dexterity} onChange={(e)=>setDexterity(Number(e.target.value))} type="number" className="stat-input" min="3" max="30"></input>
                                <div className="stat-modifier">
                                    {Math.floor((dexterity-10)/2)>=0? "+"+Math.floor((dexterity-10)/2):Math.floor((dexterity-10)/2)}
                                </div>
                            </div>
                            <div className="stat">
                                <p>Constitution</p>
                                <input value={constitution} onChange={(e)=>setConstitution(Number(e.target.value))} type="number" className="stat-input" min="3" max="30"></input>
                                <div className="stat-modifier">
                                    {Math.floor((constitution-10)/2)>=0? "+"+Math.floor((constitution-10)/2):Math.floor((constitution-10)/2)}
                                </div>
                            </div>
                            <div className="stat">
                                <p>Intelligence</p>
                                <input value={intelligence} onChange={(e)=>setIntelligence(Number(e.target.value))} type="number" className="stat-input" min="3" max="30"></input>
                                <div className="stat-modifier">
                                    {Math.floor((intelligence-10)/2)>=0? "+"+Math.floor((intelligence-10)/2):Math.floor((intelligence-10)/2)}
                                </div>
                            </div>
                            <div className="stat">
                                <p>Wisdom</p>
                                <input value={wisdom} onChange={(e)=>setWisdom(Number(e.target.value))} type="number" className="stat-input" min="3" max="30"></input>
                                <div className="stat-modifier">
                                    {Math.floor((wisdom-10)/2)>=0? "+"+Math.floor((wisdom-10)/2):Math.floor((wisdom-10)/2)}
                                </div>
                            </div>
                            <div className="stat">
                                <p>Charisma</p>
                                <input value={charisma} onChange={(e)=>setCharisma(Number(e.target.value))} type="number" className="stat-input" min="3" max="30"></input>
                                <div className="stat-modifier">
                                    {Math.floor((charisma-10)/2)>=0? "+"+Math.floor((charisma-10)/2):Math.floor((charisma-10)/2)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bookmark-bottom">
                        <button className="login-input" onClick={()=>navigate("/characters")}>back</button>

                    </div>
                </div>
                <div className="character-info">
                    <div className="top-bar">
                        <label className="character-name-label">
                            Character Name
                            <input type="text" value={characterName} onChange={(e)=>setCharacterName(e.target.value)} className="character-name-input"></input>
                        </label>
                        <div className="top-info">
                            <div className="top-info-bar"> 
                                <label className="top-info-bar-input">
                                    Class and Level
                                    <input type="text" value={classNLevel} onChange={(e)=>setClassNLevel(e.target.value)}></input>
                                </label>
                                <label className="top-info-bar-input">
                                    Background
                                    <input type="text" value={background} onChange={(e)=>setBackground(e.target.value)}></input>
                                </label>
                                <label className="top-info-bar-input">
                                    Player Name
                                    <input type="text" readOnly defaultValue={auth.currentUser?.displayName || ""}></input>
                                </label>
                            </div>
                            <div className="top-info-bar"> 
                                <label className="top-info-bar-input">
                                    Race
                                    <input type="text" value={race} onChange={(e)=>setRace(e.target.value)}></input>
                                </label>
                                <label className="top-info-bar-input">
                                    Alignment
                                    <input type="text" value={alignment} onChange={(e)=>setAlignment(e.target.value)}></input>
                                </label>
                                <label className="top-info-bar-input">
                                    XP
                                    <input type="number" value={xp} onChange={(e)=>setXp(Number(e.target.value))} step={100} min={0}></input>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                characterMenu ? <>
                <div className="user-menu-container" onClick={toggleCharacterMenu}>
                    <div className="user-menu-box" onClick={(e) => e.stopPropagation()}>
                        <div className="decor-top">
                            <div className="decor-top-left"></div>
                            <div className="decor-top-right"></div>
                        </div>
                        <div className="user-middle">
                            <div className="decor-mid-left"></div>
                            <div className="user-menu-form">
                                <h1>{characterName}</h1>
                                <input type="file"></input>
                                <div className="login-button-container">
                                    <button className="login-input" onClick={toggleCharacterMenu}>Back</button>
                                    <div className="login-spacer"></div>
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
        </div>
    )
}