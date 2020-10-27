import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { AquariumHistoryContext } from "./AquariumHistoryProvider"
import { Button, Container, Icon, Modal } from "semantic-ui-react"

import "./AquariumHistory.css"

export const AquariumHistoryCard = ({ aquariumHistory }) => {
    const { deleteAquariumHistory } = useContext(AquariumHistoryContext)

    const [open, setOpen] = useState(false)

    const history = useHistory()

    const aquariumHistoryId = aquariumHistory.id

    return (
        <Container className="aquariumHistory__card" id={aquariumHistory.id}>
            Aquarium history info goes here.
        </Container>
    )
}