import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { Aquarium } from "./aquarium/Aquarium"

export const ApplicationViews = (props) => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>

            <Route path="/aquarium">
                <Aquarium />
            </Route>
        </>
    )
}