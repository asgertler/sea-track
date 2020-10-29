import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { ChatContext } from "./ChatProvider"
import { ChatForm } from "./ChatForm"
import { Button, Icon, Message, Modal } from "semantic-ui-react"

export const ChatCard = ({ message }) => {
    const { deleteMessage } = useContext(ChatContext)
    const [open, setOpen] = React.useState(false)

    const currentUser = parseInt(localStorage.getItem("seaTrack_user"))

    if (message.userId === currentUser) {
        return (
            <Message className="message" floating style={{ backgroundColor: "lightgrey" }}>
                <p className="message--content">{message.message}</p>
                <p className="message--userInfo">{message.user.name} on {message.date}</p>

                <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    size="small"
                    trigger={
                        <Button circular icon size="mini">
                            <Icon name="edit" />
                        </Button>
                    }>
                    <ChatForm messageId={message.id} />
                </Modal>


                <Button circular icon size="mini" color="red" onClick={() => deleteMessage(message.id)}>
                    <Icon name="trash" />
                </Button>
            </Message>
        )
    } else {
        return (
            <Message className="message" floating style={{ backgroundColor: "lightblue" }}>
                <p className="message--content">{message.message}</p>
                <p className="message--userInfo">{message.user.name} on {message.date}</p>
            </Message>
        )
    }
}