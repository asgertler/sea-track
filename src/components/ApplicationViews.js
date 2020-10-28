import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { AquariumForm } from "./aquarium/AquariumForm"
import { Aquarium } from "./aquarium/Aquarium"

export const ApplicationViews = (props) => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>

            <Route exact path="/aquarium/details/:aquariumId(\d+)">
                <Aquarium />
            </Route>

            <Route exact path="/aquarium/form">
                <AquariumForm />
            </Route>

            <Route exact path="/aquarium/edit/:aquariumId(\d+)">
                <AquariumForm />
            </Route>
        </>
    )
}