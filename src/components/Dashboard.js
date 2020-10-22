import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { AquariumProvider } from "./aquarium/AquariumProvider"
import { FishProvider } from "./fish/FishProvider"
import "./Dashboard.css"

export const Dashboard = () => (
    <>
        <Route
            render={() => {
                if (localStorage.getItem("seaTrack_user")) {
                    return (
                        <>
                            <div className="dashboardView">
                                <AquariumProvider>
                                    <FishProvider>
                                        <NavBar />
                                        <ApplicationViews />
                                    </FishProvider>
                                </AquariumProvider>
                            </div>
                        </>
                    )
                } else {
                    return <Redirect to="/login" />
                }
            }}
        />

        <Route exact path="/login">
            <Login />
        </Route>

        <Route exact path="/register">
            <Register />
        </Route>
    </>
)