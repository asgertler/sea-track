import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { ChatContext } from "./ChatProvider"
import { Button, Icon, Message } from "semantic-ui-react"

export const ChatCard = ({ message }) => {
    const { deleteMessage } = useContext(ChatContext)

    const currentUser = parseInt(localStorage.getItem("seaTrack_user"))

    if (message.userId === currentUser) {
        return (
            <Message className="message" floating style={{ backgroundColor: "lightgrey" }}>
                <p className="message--content">{message.mmessage}</p>
                <p className="message--userInfo">{message.user.name} on {message.date}</p>
            </Message>
        )
    } else {
        return (
            <Message className="message" floating style={{ backgroundColor: "lightblue" }}>
                <p className="message--content">{message.mmessage}</p>
                <p className="message--userInfo">{message.user.name} on {message.date}</p>
            </Message>
        )
    }
}