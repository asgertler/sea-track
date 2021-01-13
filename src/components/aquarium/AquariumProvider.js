import React, { useState, createContext } from "react"

export const AquariumContext = createContext()

export const AquariumProvider = (props) => {
    const [aquariums, setAquariums] = useState([])

    const getAquariums = () => {
        return fetch("https://sea-track.herokuapp.com/aquariums?_expand=user")
            .then(res => res.json())
            .then(setAquariums)
    }

    const addAquarium = obj => {
        return fetch("https://sea-track.herokuapp.com/aquariums", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(getAquariums)
    }

    const editAquarium = obj => {
        return fetch(`https://sea-track.herokuapp.com/aquariums/${obj.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(getAquariums)
    }

    const deleteAquarium = id => {
        return fetch(`https://sea-track.herokuapp.com/aquariums/${id}`, {
            method: "DELETE"
        })
            .then(getAquariums)
    }

    const getAquariumById = id => {
        return fetch(`https://sea-track.herokuapp.com/aquariums/${id}`)
            .then(res => res.json())
    }

    return (
        <AquariumContext.Provider value={{
            aquariums, getAquariums, addAquarium, editAquarium, deleteAquarium, getAquariumById
        }}>
            {props.children}
        </AquariumContext.Provider>
    )
}