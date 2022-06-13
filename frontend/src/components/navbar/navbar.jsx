import "./navbar.css";
import menu from "../images/icons8-menu.svg";
import { Link } from "react-router-dom";
import {useContext, useState} from "react";
import { userContext, useUserContext } from "../../context/useContext";


export const Navbar = () => {

    const [btnClick, setBtnClick] = useState(false);
    const {user} = useContext(userContext);
   // console.log('userNav', user)

    
    


    const handleMenu = () => {
        

        if(btnClick === false){
            setBtnClick(true)
        } else {
            setBtnClick(false)
        }
        
    }

    return (
        <>
            <nav>
                <img src={menu} onClick={handleMenu} alt="menu" />
                <p className={user? "username" : "none"}>Welcome {user}</p>
                <div className="logo">Food Corner</div>
            </nav>
            <div className={ btnClick===false? "none" : "sideDiv"}>
                <div>
                    <Link to="/signup">Create Account</Link>
                </div>
                <div>
                    <Link to="/">Login</Link>
                </div>
                <div>
                    <Link to="/cart">Cart</Link>
                </div>
                <div>
                    <Link to="/products">Dishes</Link>
                </div>
            </div>
        </>
    )
}