import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { FishContext } from "./FishProvider"
import { Button, Container, Icon, Modal } from "semantic-ui-react"
import { FishForm } from "./FishForm"
import "./Fish.css"

export const FishCard = ({ fish }) => {
    const { getFishById, deleteFish } = useContext(FishContext)

    const [open, setOpen] = React.useState(false)

    const { fishId } = useParams()

    const history = useHistory()

    const today = Date.now()
    const birthday = fish.birthday

    const millisecBirthday = Date.parse(birthday)
    const millisecAge = today - millisecBirthday

    const months = Math.floor(((((millisecAge / 1000) / 3600) / 24) / 30.436875) % 12)
    const years = Math.floor((((millisecAge / 1000) / 3600) / 24) / 365)

    return (
        <Container className="fish__card">
            <h4 className="fish__name">{fish.name}</h4>
            <p className="fish__type"><strong>Type: </strong>{fish.type}</p>
            <p className="fish__age"><strong>Age: </strong>{years} years, {months} months</p>
            <p className="fish__length"><strong>Max Length: </strong>{fish.length}"</p>
            <p className="fish__diest"><strong>Diet: </strong>{fish.diet}</p>
            <p className="fish__pH"><strong>pH Range: </strong>{fish.pHLow} - {fish.pHHigh}</p>

            <Button icon circular onClick={() => {
                deleteFish(fish.id)
                    .then(() => {
                        history.push(`/aquarium/details/${fish.aquariumId}`)
                    })
            }
            }>
                <Icon name="delete" />
            </Button>
        </Container>
    )
}