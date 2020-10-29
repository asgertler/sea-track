import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { ChatContext } from "./ChatProvider"
import { ChatCard } from "./ChatCard"
import { Button, Checkbox, Container, Header, Icon } from "semantic-ui-react"

export const ChatList = () => {
    const { messages, getMessages } = useContext(ChatContext)
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

            <Button primary>
                <Icon name="plus" circular /> New Message
            </Button>
        </Container>
    )
}