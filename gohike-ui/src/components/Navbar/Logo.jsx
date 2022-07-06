import * as React from "react"
import logo from "../Images/Logo.png"
import { Link } from "react-router-dom";

export default function Logo(props) {
    return (
        <div className="logo">
            <img className="logo-img" src={logo}/>
        </div>
    )
}
