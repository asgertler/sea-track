import React from "react"
import { Link } from "react-router-dom"
import image from "../../img/aquariumProfile_1.png"
import "./Aquarium.css"

export const AquariumCard = ({ aquarium }) => (
    <Link to={`/aquarium/details/${aquarium.id}`}>
        <div className="aquarium__card">
            <img src={image} alt="Aquarium Photo" />
        </div>
    </Link>
)