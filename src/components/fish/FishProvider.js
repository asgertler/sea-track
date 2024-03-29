import React, { useState, createContext } from "react"

export const FishContext = createContext()

export const FishProvider = (props) => {
    const [fish, setFish] = useState([])

    const getFish = () => {
        return fetch("https://sea-track.herokuapp.com/fish?_expand=user&_expand=aquarium")
            .then(res => res.json())
            .then(setFish)
    }

    const addFish = obj => {
        return fetch("https://sea-track.herokuapp.com/fish", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(getFish)
    }

    const editFish = obj => {
        return fetch(`https://sea-track.herokuapp.com/fish/${obj.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(getFish)
    }

    const deleteFish = id => {
        return fetch(`https://sea-track.herokuapp.com/fish/${id}`, {
            method: "DELETE"
        })
            .then(getFish)
    }

    const getFishById = id => {
        return fetch(`https://sea-track.herokuapp.com/fish/${id}`)
            .then(res => res.json())
    }

    return (
        <FishContext.Provider value={{
            fish, getFish, addFish, editFish, deleteFish, getFishById
        }}>
            {props.children}
        </FishContext.Provider>
    )
}