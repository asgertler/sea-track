import React, { useState, createContext } from "react"
import "./Chat.css"

export const ChatContext = createContext()

export const ChatProvider = (props) => {
    const [messages, setMessages] = useState([])

    const getMessages = () => {
        return fetch("https://sea-track.herokuapp.com/messages?_expand=user")
            .then(res => res.json())
            .then(setMessages)
    }

    const addMessage = messageObj => {
        return fetch("https://sea-track.herokuapp.com/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageObj)
        })
            .then(getMessages)
    }

    const editMessage = messageObj => {
        return fetch(`https://sea-track.herokuapp.com/messages/${messageObj.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageObj)
        })
            .then(getMessages)
    }

    const deleteMessage = messageId => {
        return fetch(`https://sea-track.herokuapp.com/messages/${messageId}`, {
            method: "DELETE"
        })
            .then(getMessages)
    }

    const getMessageById = id => {
        return fetch(`https://sea-track.herokuapp.com/messages/${id}`)
            .then(res => res.json())
    }

    return (
        <ChatContext.Provider value={{
            messages, getMessages, addMessage, editMessage, deleteMessage, getMessageById
        }}>
            {props.children}
        </ChatContext.Provider>
    )
}