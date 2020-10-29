import React, { useState, createContext } from "react"

export const AquariumTasksContext = createContext()

export const AquariumTasksProvider = (props) => {
    const [aquariumTasks, setAquariumTasks] = useState([])

    const getAquariumTasks = () => {
        return fetch("http://localhost:8088/aquariumTasks")
            .then(res => res.json())
            .then(setAquariumTasks)
    }

    const addAquariumTask = obj => {
        return fetch("http://localhost:8088/aquariumTasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(getAquariumTasks)
    }

    const editAquariumTask = obj => {
        return fetch(`http://localhost:8088/aquariumTasks/${obj.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(getAquariumTasks)
    }

    const deleteAquariumTask = id => {
        return fetch(`http://localhost:8088/aquariumTasks/${id}`, {
            method: "DELETE"
        })
            .then(getAquariumTasks)
    }

    const getAquariumTaskById = id => {
        return fetch(`http://localhost:8088/aquariumTasks/${id}`)
            .then(res => res.json())
    }

    const completeAquariumTask = task => {
        return fetch(`http://localhost:8088/aquariumTasks/${task.id}`, {
            method: "PATCH",
            headers: {
                "ContentType": "application/json"
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