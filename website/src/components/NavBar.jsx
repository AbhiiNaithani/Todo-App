import { useState } from "react"
import { FaHome, FaListUl, FaCheck, FaClipboard, FaSignOutAlt} from "react-icons/fa";


export default function NavBar({activeMode,setActiveMode}){
    const [username,setUsername] = useState("User");
    const [mode,setMode] = useState(activeMode);

    const activeStyle = {
        backgroundColor: "hsl(0, 0%, 10%)",
        color: "hsl(120, 100%, 40%)",
        bordeRight: "2px solid hsl(120, 100%, 40%)",
    }
    
    

    return (
        <div className="navBar-container">
            <h3>Hii, {username}</h3>
            <div className="navs">
                <button className={mode == "AllTodos"? "active-navButton" :"navButtons"} onClick={() => {
                    setActiveMode("AllTodos");
                    setMode("AllTodos");
                }} >
                    <FaHome size={15}/>
                <h5>All Todos</h5>
                </button>
                <button className={mode == "Important"? "active-navButton" :"navButtons"} onClick={() => {
                    setActiveMode("Important");
                    setMode("Important");
                }} >
                <FaListUl size={15}/>
                <h5>Important</h5>
                </button>
                <button className={mode == "Completed"? "active-navButton" :"navButtons"} onClick={() => {
                    setActiveMode("Completed");
                    setMode("Completed");
                }} >
                <FaCheck size={15}/>
                <h5>Completed</h5>
                </button>
                <button className={mode == "DoItNow"? "active-navButton" :"navButtons"} onClick={() => {
                    setActiveMode("DoItNow");
                    setMode("DoItNow");
                }}>
                <FaClipboard size={15}/>
                <h5>Do It Now</h5>
                </button>
            </div>
            <button className="navButtons">
            <FaSignOutAlt size={20}/>
                <h4>Sign Out</h4>
                </button>
        </div>
    )
}