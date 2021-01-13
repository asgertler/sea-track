import React from "react"
import { HashRouter, Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { AquariumProvider } from "./aquarium/AquariumProvider"
import { FishProvider } from "./fish/FishProvider"
import { AquariumHistoryProvider } from "./aquariumhistory/AquariumHistoryProvider"
import { AquariumTasksProvider } from "./aquariumtasks/AquariumTasksProvider"
import { ChatProvider } from "./chat/ChatProvider"
import { ChatList } from "./chat/ChatList"
import "./Dashboard.css"

export const Dashboard = () => (
    <>
        <HashRouter basename='/'>
            <Route
                render={() => {
                    if (localStorage.getItem("seaTrack_user")) {
                        return (
                            <>
                                <div className="dashboardView">
                                    <AquariumProvider>
                                        <FishProvider>
                                            <AquariumHistoryProvider>
                                                <AquariumTasksProvider>
                                                    <ChatProvider>
                                                        <NavBar />
                                                        <div className="userView">
                                                            <ApplicationViews />
                                                            <ChatList />
                                                        </div>
                                                    </ChatProvider>
                                                </AquariumTasksProvider>
                                            </AquariumHistoryProvider>
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
        </HashRouter>
    </>
)