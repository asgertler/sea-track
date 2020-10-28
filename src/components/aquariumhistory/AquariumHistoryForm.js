import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AquariumHistoryContext } from "./AquariumHistoryProvider"
import { Container, Form } from "semantic-ui-react"
import "./AquariumHistory.css"

export const AquariumHistoryForm = () => {
    const { getAquariumHistory, addAquariumHistory, getAquariumHistoryById, editAquariumHistory } = useContext(AquariumHistoryContext)

    const [aquariumHistory, setAquariumHistory] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const aquariumId = parseInt(window.location.pathname.split("/").pop())

    const { aquariumHistoryId } = useParams()

    const handleControlledInputChange = (evt) => {
        const newAquariumHistory = { ...aquariumHistory }
        newAquariumHistory[evt.target.name] = evt.target.value
        setAquariumHistory(newAquariumHistory)
    }

    useEffect(() => {
        getAquariumHistory().then(() => {
            if (aquariumHistoryId) {
                getAquariumHistoryById(aquariumHistoryId)
                    .then(aquariumHistory => {
                        setAquariumHistory(aquariumHistory)
                        setIsLoading(false)
                    })
            } else {
                setIsLoading(false)
            }
        })
    }, [])

    const constructNewAquariumHistory = () => {
        setIsLoading(true)

        if (aquariumHistoryId) {
            editAquariumHistory({
                pH: aquariumHistory.ph,
                ammonia: aquariumHistory.ammonia,
                nitrite: aquariumHistory.nitrite,
                nitrate: aquariumHistory.nitrate
            })
        } else {
            addAquariumHistory({
                aquariumId: aquariumId,
                pH: aquariumHistory.pH,
                ammonia: aquariumHistory.ammonia,
                nitrite: aquariumHistory.nitrite,
                nitrate: aquariumHistory.nitrate,
                testDate: new Date().toISOString().split("T")[0]
            })
        }
    }

    return (
        <Container className="aquariumHistoryFormContainer">
            <Form className="aquariumHistoryForm" onSubmit={evt => {
                evt.preventDefault()
                constructNewAquariumHistory()
            }}>
                <Form.Group>
                    <Form.Input
                        required
                        type="number"
                        step="0.1"
                        label="pH"
                        placeholder="e.g. 8.1"
                        id="testpH"
                        name="pH"
                        defaultValue={aquariumHistory.pH}
                        onChange={handleControlledInputChange}
                        width={2}
                    />

                    <Form.Input
                        required
                        type="number"
                        step="0.01"
                        label="Ammonia"
                        placeholder="e.g. .01"
                        id="testAmmonia"
                        name="ammonia"
                        defaultValue={aquariumHistory.ammonia}
                        onChange={handleControlledInputChange}
                        width={2}
                    />

                    <Form.Input
                        required
                        type="number"
                        step="0.01"
                        label="Nitrite"
                        placeholder="e.g. .04"
                        id="testNitrite"
                        name="nitrite"
                        defaultValue={aquariumHistory.nitrite}
                        onChange={handleControlledInputChange}
                        width={2}
                    />

                    <Form.Input
                        required
                        type="number"
                        step="0.01"
                        label="Nitrate"
                        placeholder="e.g. .03"
                        id="testNitrate"
                        name="nitrate"
                        defaultValue={aquariumHistory.nitrate}
                        onChange={handleControlledInputChange}
                        width={2}
                    />
                </Form.Group>

                <Form.Checkbox
                    required
                    label="Vacuum Substrate"
                    inline
                />

                <Form.Checkbox
                    required
                    label="Clean Filters"
                    inline
                />

                <Form.Checkbox
                    required
                    label="Add Conditioner"
                    inline
                />

                <Form.Button primary className="button__submit" type="submit" disabled={isLoading}>
                    Save
                </Form.Button>
            </Form>
        </Container>
    )
}