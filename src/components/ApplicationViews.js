import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { AquariumProvider } from "./aquarium/AquariumProvider"
import { AquariumForm } from "./aquarium/AquariumForm"
import { Aquarium } from "./aquarium/Aquarium"

export const ApplicationViews = (props) => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>

            <AquariumProvider>
                <Route exact path="/aquarium/details/:aquariumId(\d+)">
                    <Aquarium />
                </Route>

                <Route exact path="/aquarium/form">
                    <AquariumForm />
                </Route>
            </AquariumProvider>
        </>
    )
}