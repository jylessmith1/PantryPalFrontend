import { NavLink } from "react-router-dom";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faKitchenSet } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faListCheck } from '@fortawesome/free-solid-svg-icons'



import "../components/css/BottomNavBar.css";

let BottomNavBar = () => {

    let copyrightStyle = {
        width: "100%",
        textAlign: "left",
        paddingLeft: "10px",
        fontWeight: "bolder",
        fontSize: "16px",
        color: "black",
    }

    return (
        <footer className="navWrapper">
            <a href="https://ip240z.github.io/Anything-Is-Possible/" target={"_blank"} style={copyrightStyle}>© CannonFrog Studios</a>
            <nav className="navBtnWrapper">
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'NavLink')} to={"/"}><FontAwesomeIcon className="icon" icon={faHouse} /></NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'NavLink')} to={"/inventory"}><FontAwesomeIcon className="icon" icon={faKitchenSet} /></NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'NavLink')} to={"/itemsearch"}><FontAwesomeIcon className="icon" icon={faMagnifyingGlass} /></NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'NavLink')} to={"/shoppinglist"}><FontAwesomeIcon className="icon" icon={faListCheck} /></NavLink>
            </nav>
        </footer>
    )
}

export default BottomNavBar;