import React, { useState, createContext } from "react"

export const AquariumContext = createContext()

export const AquariumProvider = (props) => {
    const [aquariums, setAquariums] = useState()

    const getAquariums = () => {
        return fetch("http://localhost:8088/aquariums?_expand=user")
            .then(res => res.json)
            .then(setAquariums)
    }

    const addAquarium = obj => {
        return fetch("http://localhost:8088/aquariums", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
    }

    const editAquarium = obj => {
        return fetch(`http://localhost:8088/aquariums/${obj.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animal)
        })
            .then(getAquariums)
    }

    const deleteAquarium = obj => {
        return fetch(`http://localhost:8088/aquariums/${obj.id}`, {
            method: "DELETE"
        })
    }

    return (
        <AquariumContext.Provider value={{
            aquariums, getAquariums, addAquarium, editAquarium, deleteAquarium
        }}>
            {props.children}
        </AquariumContext.Provider>
    )
}