import React, { useState, createContext } from "react"

export const AquariumTasksContext = createContext()

export const AquariumTasksProvider = (props) => {
    const [aquariumTasks, setAquariumTasks] = useState([])

    const getAquariumTasks = () => {
        return fetch("https://sea-track.herokuapp.com/aquariumTasks")
            .then(res => res.json())
            .then(setAquariumTasks)
    }

    const addAquariumTask = obj => {
        return fetch("https://sea-track.herokuapp.com/aquariumTasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(getAquariumTasks)
    }

    const editAquariumTask = obj => {
        return fetch(`https://sea-track.herokuapp.com/aquariumTasks/${obj.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(getAquariumTasks)
    }

    const deleteAquariumTask = id => {
        return fetch(`https://sea-track.herokuapp.com/aquariumTasks/${id}`, {
            method: "DELETE"
        })
            .then(getAquariumTasks)
    }

    const getAquariumTaskById = id => {
        return fetch(`https://sea-track.herokuapp.com/aquariumTasks/${id}`)
            .then(res => res.json())
    }

    const completeAquariumTask = task => {
        return fetch(`https://sea-track.herokuapp.com/aquariumTasks/${task.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })
            .then(getAquariumTasks)
    }

    return (
        <AquariumTasksContext.Provider value={{
            aquariumTasks, getAquariumTasks, addAquariumTask, editAquariumTask,
            deleteAquariumTask, getAquariumTaskById, completeAquariumTask
        }}>
            {props.children}
        </AquariumTasksContext.Provider>
    )
}