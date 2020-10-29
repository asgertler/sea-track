import React, { useState, createContext } from "react"

export const AquariumTasksContext = createContext()

export const AquariumTasksProvider = (props) => {
    const [aquariumTasks, setAquariumTasks] = useState([])

    const getAquariumTasks = () => {
        return fetch("http://localhost:8088/aquariumTasks")
            .then(res => res.json())
            .then(setAquariumTasks)
    }
}