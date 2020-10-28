import React, { useState, createContext } from "react"

export const AquariumHistoryContext = createContext()

export const AquariumHistoryProvider = (props) => {
    const [aquariumHistory, setAquariumHistory] = useState([])

    const getAquariumHistory = () => {
        return fetch("http://localhost:8088/aquariumHistory?_expand=aquarium")
            .then(res => res.json())
            .then(setAquariumHistory)
    }

    const addAquariumHistory = obj => {
        return fetch("http://localhost:8088/aquariumHistory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(getAquariumHistory)
    }

    const editAquariumHistory = obj => {
        return fetch(`http://localhost:8088/aquariumHistory/${obj.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(getAquariumHistory)
    }

    const deleteAquariumHistory = id => {
        return fetch(`http://localhost:8088/aquariumHistory/${id}`, {
            method: "DELETE"
        })
            .then(getAquariumHistory)
    }

    const getAquariumHistoryById = id => {
        return fetch(`http://localhost:8088/aquariumHistory/${id}`)
            .then(res => res.json())
    }

    return (
        <AquariumHistoryContext.Provider value={{
            aquariumHistory, getAquariumHistory, addAquariumHistory, editAquariumHistory, deleteAquariumHistory, getAquariumHistoryById
        }}>
            {props.children}
        </AquariumHistoryContext.Provider>
    )
}