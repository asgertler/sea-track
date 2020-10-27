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

    const testDate = aquariumHistory.testDate
    const [fullYear, month, day] = testDate.split("-")
    const year = fullYear.substr(-2)
    const usableDate = month + "." + day + "." + year

    return (
        <Container className="aquariumHistory__card" id={aquariumHistory.id}>
            <h3 className="aquariumHistory__title">Water Quality History</h3>
            <p><strong>Test Date: </strong>{usableDate}</p>
            <p><strong>pH: </strong>{aquariumHistory.pH}</p>
            <p><strong>Ammonia: </strong>{aquariumHistory.ammonia}</p>
            <p><strong>Nitrite: </strong>{aquariumHistory.nitrite}</p>
            <p><strong>Nitrate: </strong>{aquariumHistory.nitrate}</p>
        </Container>
    )
}