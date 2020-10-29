import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { ChatContext } from "./ChatProvider"
import { ChatCard } from "./ChatCard"
import { ChatForm } from "./ChatForm"
import { Button, Container, Icon, Modal } from "semantic-ui-react"

export const ChatList = () => {
    const { messages, getMessages } = useContext(ChatContext)
    const [open, setOpen] = React.useState(false)
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        getMessages()
    }, [])

    return (
        <Container>
            <div className="chatWindow">
                {
                    messages.map(message => {
                        return <ChatCard key={message.id} message={message} />
                    })
                }
            </div>

            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                size="small"
                trigger={
                    <Button primary>
                        <Icon name="plus" circular /> New Message
            </Button>
                }>
                <ChatForm />
            </Modal>
        </Container>
    )
}