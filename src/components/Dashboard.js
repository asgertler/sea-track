import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./Dashboard.css"

export const Dashboard = () => (
    <>
        <Route
            render={() => {
                if (localStorage.getItem("seaTrack_user")) {
                    return (
                        <>
                            <div className="dashboardView">
                                <NavBar />
                                <ApplicationViews />
                            </div>
                        </>
                    )
                } else {
                    return <Redirect to="/login" />
                }
            }}
        />

        <Route path="/login">
            <Login />
        </Route>

        <Route path="/register">
            <Register />
        </Route>

    </>
)