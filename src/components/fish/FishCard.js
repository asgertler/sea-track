import React from "react"
import "./Fish.css"

export const FishCard = ({ fish }) => (
    <section className="fish__card">
        <h4 className="fish__name">{fish.name}</h4>
    </section>
)