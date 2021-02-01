import React from "react"
import { Link } from "react-router-dom"
import image from "../../img/aquariumProfile_1.png"
import "./Aquarium.css"

export const AquariumCard = ({ aquarium }) => (
    <section className="aquarium__card">
        <Link to={`/aquarium/details/${aquarium.id}`}>
            <div className="aquarium__image">
                <img src={image} alt="Aquarium Icon" />
            </div>
        </Link>
    </section>
)