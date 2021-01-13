import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { AquariumForm } from "./aquarium/AquariumForm"
import { Aquarium } from "./aquarium/Aquarium"

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/sea-track/">
                <Home />
            </Route>

            <Route exact path="/sea-track/aquarium/details/:aquariumId(\d+)">
                <Aquarium />
            </Route>

            <Route exact path="/sea-track/aquarium/form">
                <AquariumForm />
            </Route>

            <Route exact path="/sea-track/aquarium/edit/:aquariumId(\d+)">
                <AquariumForm />
            </Route>
        </>
    )
}