import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { AquariumProvider } from "../aquarium/AquariumProvider"
import { AquariumList } from "../aquarium/AquariumList"
import "./NavBar.css"

export const NavBar = (props) => {

    const currentUser = parseInt(localStorage.getItem("seaTrack_user"))

    return (
        <>
            <section className="navbar">
                <Link className="navbar__logo" to="/">Sea Track</Link>

                <AquariumProvider>
                    <AquariumList />
                </AquariumProvider>
            </section>
        </>
    )
}