import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { AquariumHistoryContext } from "./AquariumHistoryProvider"
import { AquariumHistoryForm } from "./AquariumHistoryForm"
import { Button, Card, Icon, Modal } from "semantic-ui-react"
import "./AquariumHistory.css"

export const AquariumHistoryCard = ({ aquariumHistory }) => {
    const { deleteAquariumHistory } = useContext(AquariumHistoryContext)

    const [open, setOpen] = useState(false)

    const history = useHistory()

    const testDate = aquariumHistory.testDate
    const [fullYear, month, day] = testDate.split("-")
    const year = fullYear.substr(-2)
    const usableDate = month + "." + day + "." + year

    return (
        <Card className="aquariumHistory__card" id={aquariumHistory.id}>
            <Card.Content>
                <h4>{usableDate}</h4>
                <p><strong>pH: </strong>{aquariumHistory.pH}</p>
                <p><strong>Ammonia: </strong>{aquariumHistory.ammonia} ppm</p>
                <p><strong>Nitrite: </strong>{aquariumHistory.nitrite} ppm</p>
                <p><strong>Nitrate: </strong>{aquariumHistory.nitrate} ppm</p>
            </Card.Content>

            <Card.Content>
                <div className="ui two buttons">
                    <Modal className="editModal"
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        size="tiny"
                        trigger={
                            <Button icon>
                                <Icon name="edit" /> Edit
                             </Button>
                        }>
                        <AquariumHistoryForm aquariumHistoryId={aquariumHistory.id} />
                    </Modal>

                    <Button icon color="red" onClick={() => {
                        deleteAquariumHistory(aquariumHistory.id)
                            .then(() => {
                                history.push(`/aquarium/details/${aquariumHistory.aquariumId}`)
                            })
                    }}>
                        <Icon name="trash" /> Delete
                    </Button>
                </div>
            </Card.Content>
        </Card >
    )
}