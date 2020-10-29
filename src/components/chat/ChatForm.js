import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { ChatContext } from "./ChatProvider"
import { Button, Container, Header, Icon, Form } from "semantic-ui-react"

export const ChatForm = props => {
    const { addMessage, getMessageById, editMessage } = useContext(ChatContext)

    const [message, setMessage] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (evt) => {
        const newMessage = { ...message }
        newMessage[evt.target.name] = evt.target.value
        setMessage(newMessage)
    }

    useEffect(() => {
        if (props.messageId) {
            getMessageById(props.messageId)
                .then(message => {
                    setMessage(message)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    const constructNewMessage = () => {
        setIsLoading(true)

        if (props.messageId) {
            editMessage({
                id: props.messageId,
                userId: parseInt(localStorage.getItem("seaTrack_user")),
                message: message.content,
                date: "edited: " + new Date().toLocaleString("en-US")
            })
        } else {
            addMessage({
                userId: parseInt(localStorage.getItem("seaTrack_user")),
                message: message.content,
                date: new Date().toLocaleString("en-US")
            })
        }
    }

    return (
        <>
            <Container>
                <Form className="messageForm" onSubmit={evt => {
                    evt.preventDefault()
                    constructNewMessage()
                }}>
                    <Header as='h2' className="messageForm--title">
                        {props.messageId ? "Edit Message" : "New Message"}
                    </Header>

                    <Form.Input
                        required
                        type="text"
                        placeholder='Send a message..'
                        id='messageContent'
                        name='content'
                        onChange={handleInputChange}
                        defaultValue={message.message}
                    />

                    <Button.Group>
                        <Button animated="vertical">
                            <Button.Content visible>Cancel</Button.Content>
                            <Button.Content hidden>
                                <Icon name="cancel" />
                            </Button.Content>
                        </Button>

                        <Button.Or />

                        <Button positive animated="vertical">
                            <Button.Content visible>
                                {props.messageId ? "Edit" : "Send"}
                            </Button.Content>
                            <Button.Content type="submit" hidden
                                className="btn btn-primary"
                                disabled={isLoading}>
                                {props.messageId ? <Icon name="edit" /> : <Icon name="send" />}
                            </Button.Content>
                        </Button>
                    </Button.Group>
                </Form >
            </Container>
        </>
    )
}