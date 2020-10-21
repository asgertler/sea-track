import React from "react"
import { Link } from "react-router-dom"
import { AquariumProvider } from "../aquarium/AquariumProvider"
import { AquariumList } from "../aquarium/AquariumList"
import logo from "../../img/seaTrack_icon_wht.png"
import "./NavBar.css"

export const NavBar = (props) => {

    return (
        <>
            <section className="navbar">
                <Link className="navbar__logo__container" to="/">
                    <img src={logo} alt="seaTrack Icon" className="navbar__logo" />
                </Link>

                <AquariumProvider>
                    <AquariumList />
                </AquariumProvider>
            </section>
        </>
    )
}