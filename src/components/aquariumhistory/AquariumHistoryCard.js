import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { AquariumHistoryContext } from "./AquariumHistoryProvider"
import { Button, Card, Icon } from "semantic-ui-react"

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
        <Card className="aquariumHistory__card" id={aquariumHistory.id}>
            <Card.Content>
                <h4>{usableDate}</h4>
                <p><strong>pH: </strong>{aquariumHistory.pH}</p>
                <p><strong>Ammonia: </strong>{aquariumHistory.ammonia}</p>
                <p><strong>Nitrite: </strong>{aquariumHistory.nitrite}</p>
                <p><strong>Nitrate: </strong>{aquariumHistory.nitrate}</p>
            </Card.Content>

            <Card.Content>
                <div className="ui two buttons">
                    <Button icon color="red" onClick={() => {
                        deleteAquariumHistory(aquariumHistory.id)
                            .then(() => {
                                history.push(`/aquarium/details/${aquariumHistory.aquariumId}`)
                            })
                    }}>
                        <Icon name="delete" />
                    </Button>
                </div>
            </Card.Content>
        </Card>
    )
}