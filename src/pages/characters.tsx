import { getAuth, signOut } from "firebase/auth";
import { SetStateAction, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Login } from "./login";
import { auth, db, rtdb } from "../lib/firebase";
import { child, get, ref, set } from "firebase/database";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";


type Character ={
    id:string
    characterName: string
}

export const Characters  = () => {
    const navigate = useNavigate();
    const [characters,setCharacters] = useState<Character[]>([]);
    const user = auth.currentUser || {displayName: "",uid:""};
    const [userMenu,setUserMenu] = useState(false);

    var myCharacters = characters.map((character) =>(
        <div key={character.id} className="character-container">
            <button className="character-button" onClick={()=>navigate("/character",{state:{characterId:character.id}})}>
                <div className="character-button-image"></div>
                <div className="character-button-info">
                    <div>
                        <p>{character.characterName}</p>
                    </div>
                </div>
            </button>
        </div>
    ))

    if (!user) {
        navigate("/login",{replace:true});
    }

    function toggleUserMenu(){
        setUserMenu(!userMenu)
    }
    async function getCharacters(){
        const myCharactersQuery = await getDocs(collection(db,"characters"))
        var myCharactersList: Character[] = []
        myCharactersQuery.forEach(async (doc) =>{
            const characterDoc = doc.data()
            if(characterDoc.userId == auth.currentUser?.uid){
                myCharactersList.push({id:doc.id, characterName:characterDoc.characterName})
            }
        })
        myCharactersList.forEach(async (character)=>{
            const characterInfo = await get(child(ref(rtdb),'characters/'+character.id)).then((data)=>data.val())
            updateDoc(doc(db,"characters",character.id),{
                characterName: characterInfo.characterName
            })
        })
        console.log("Hola")
        setCharacters(myCharactersList)
    };
    useEffect(()=>{
        getCharacters()
    },[])

    async function createNewCharacter(){
        try {
            const docRef = await addDoc(collection(db, "characters"), {
                userId: auth.currentUser?.uid,
                playerName: auth.currentUser?.displayName,
                characterName: "",
                classNLevel:"",
                background:"",
                race:"",
                alignment:"",
                xp:0                
            });
            console.log("Document written with ID: ", docRef.id);
            set(ref(rtdb,"characters/"+docRef.id),{
                userId: auth.currentUser?.uid,
                playerName: auth.currentUser?.displayName,
                characterName: "",
                classNLevel:"",
                background:"",
                race:"",
                alignment:"",
                xp:0
            });
            navigate("/character",{state:{characterId:docRef.id}})
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div className="container">
            <header>
                <div className="tabs">
                    <div>
                        <button className="tab open">Characters</button>
                        <button className="tab closed" onClick={()=>navigate("/campaigns", {replace:true})}>Campaigns</button>
                    </div>
                </div>
                <div className="header-content">
                    <h1>{user.displayName}</h1>
                    <button className="userButton" onClick={toggleUserMenu}></button>
                </div>
            </header>
            <div className="folder">
                <div className="page">
                    {
                        myCharacters.length? myCharacters : <p className="none-yet">No Characters Yet!</p>
                    }
                </div>
            </div>
            {
            userMenu ? <>
                    <div className="user-menu-container" onClick={toggleUserMenu}>
                        <div className="user-menu-box" onClick={(e) => e.stopPropagation()}>
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

            <button className="new" onClick={createNewCharacter}></button>
        </div>
    )
}