import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { AquariumProvider } from "../aquarium/AquariumProvider"
import { AquariumList } from "../aquarium/AquariumList"
import "./NavBar.css"

export const NavBar = (props) => {

    const currentUser = parseInt(localStorage.getItem("seaTrack_user"))

    return (
        <>
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/">Sea Track</Link>
                </li>
            </ul>

            <AquariumProvider>
                <AquariumList />
            </AquariumProvider>
        </>
    )
}