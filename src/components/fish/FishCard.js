import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { FishContext } from "./FishProvider"
import { Button, Card, Icon, Modal } from "semantic-ui-react"
import { FishForm } from "./FishForm"
import "./Fish.css"

export const FishCard = ({ fish }) => {
    const { deleteFish } = useContext(FishContext)

    const [open, setOpen] = useState(false)

    const history = useHistory()

    const today = Date.now()
    const birthday = fish.birthday

    const millisecBirthday = Date.parse(birthday)
    const millisecAge = today - millisecBirthday

    const months = Math.floor(((((millisecAge / 1000) / 3600) / 24) / 30.436875) % 12)
    const years = Math.floor((((millisecAge / 1000) / 3600) / 24) / 365)

    const fishId = fish.id

    return (
        <Card className="fish__card" id={fish.id}>
            <Card.Content>
                <h4 className="fish__name">{fish.name}</h4>
                <p className="fish__type"><strong>Type: </strong>{fish.type}</p>
                <p className="fish__age"><strong>Age: </strong>{years} years, {months} months</p>
                <p className="fish__length"><strong>Max Length: </strong>{fish.length}"</p>
                <p className="fish__diest"><strong>Diet: </strong>{fish.diet}</p>
                <p className="fish__pH"><strong>pH Range: </strong>{fish.pHLow} - {fish.pHHigh}</p>
            </Card.Content>

            <Card.Content>
                <div className="ui two buttons">
                    <Modal
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        size="small"
                        trigger={
                            <Button icon>
                                <Icon name="edit" /> Edit
                            </Button>
                        }>
                        <FishForm fishId={fishId} />
                    </Modal >

                    <Button icon color="red" onClick={() => {
                        deleteFish(fish.id)
                            .then(() => {
                                history.push(`/aquarium/details/${fish.aquariumId}`)
                            })
                    }}>
                        <Icon name="delete" /> Delete
                    </Button>
                </div>
            </Card.Content>
        </Card >
    )
}