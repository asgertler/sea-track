import React, { useContext, useEffect, useState } from "react"
import { AquariumHistoryContext } from "./AquariumHistoryProvider"
import { Container, Form } from "semantic-ui-react"
import { Icon } from "semantic-ui-react"
import "./AquariumHistory.css"

export const AquariumHistoryForm = props => {
    const { getAquariumHistory, addAquariumHistory, getAquariumHistoryById, editAquariumHistory } = useContext(AquariumHistoryContext)

    const [aquariumHistory, setAquariumHistory] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const aquariumId = parseInt(window.location.pathname.split("/").pop())

    const handleControlledInputChange = (evt) => {
        const newAquariumHistory = { ...aquariumHistory }
        newAquariumHistory[evt.target.name] = evt.target.value
        setAquariumHistory(newAquariumHistory)
    }

    useEffect(() => {
        getAquariumHistory().then(() => {
            if (props.aquariumHistoryId) {
                getAquariumHistoryById(props.aquariumHistoryId)
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

        if (props.aquariumHistoryId) {
            editAquariumHistory({
                id: props.aquariumHistoryId,
                pH: aquariumHistory.pH,
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
            <h3 className="fishForm_title">{props.aquariumHistoryId ? "Edit Water Change" : "Log Water Change"}</h3>

            { props.warningTime === true ?
                <span><Icon name="warning sign" color="red" /><strong style={{ color: "red" }}>
                    You're {props.overdueDays} days overdue for a water change.</strong></span>
                : ""}

            { props.warningPhLow === true ?
                <span><Icon name="warning sign" color="red" /><strong style={{ color: "red" }}>
                    pH is currently {props.currentPh} but needs to be above {props.phLowMax}.</strong></span>
                : ""}

            { props.warningPhHigh === true ?
                <span><Icon name="warning sign" color="red" /><strong style={{ color: "red" }}>
                    pH is currently {props.currentPh} but needs to be above {props.phHighMin}</strong></span>
                : ""}

            { props.warningAmmonia === true ?
                <span><Icon name="warning sign" color="red" /><strong style={{ color: "red" }}>
                    Ammonia levels are too high.</strong></span>
                : ""}

            { props.warningNitrite === true ?
                <span><Icon name="warning sign" color="red" /><strong style={{ color: "red" }}>
                    Nitrite levels are too high.</strong></span>
                : ""}

            { props.warningNitrate === true ?
                <span><Icon name="warning sign" color="red" /><strong style={{ color: "red" }}>
                    Nitrate levels are too high.</strong></span>
                : ""}

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
                        width={props.aquariumHistoryId ? 4 : 2}
                    />

                    <Form.Input
                        required
                        type="number"
                        step="0.01"
                        label="Ammonia (ppm)"
                        placeholder="e.g. .01"
                        id="testAmmonia"
                        name="ammonia"
                        defaultValue={aquariumHistory.ammonia}
                        onChange={handleControlledInputChange}
                        width={props.aquariumHistoryId ? 4 : 2}
                    />

                    <Form.Input
                        required
                        type="number"
                        step="0.01"
                        label="Nitrite (ppm)"
                        placeholder="e.g. .02"
                        id="testNitrite"
                        name="nitrite"
                        defaultValue={aquariumHistory.nitrite}
                        onChange={handleControlledInputChange}
                        width={props.aquariumHistoryId ? 4 : 2}
                    />

                    <Form.Input
                        required
                        type="number"
                        step="0.01"
                        label="Nitrate (ppm)"
                        placeholder="e.g. .03"
                        id="testNitrate"
                        name="nitrate"
                        defaultValue={aquariumHistory.nitrate}
                        onChange={handleControlledInputChange}
                        width={props.aquariumHistoryId ? 4 : 2}
                    />
                </Form.Group>

                {props.aquariumHistoryId ? "" :
                    <Form.Group>
                        <Form.Input
                            required
                            label="Vacuum Substrate"
                            inline
                        >
                            <input type="checkbox" id="vacuumSubstrate" name="vacuumSubstrate" required />
                        </Form.Input>

                        <Form.Input
                            required
                            label="Clean Filters"
                            inline
                        >
                            <input type="checkbox" id="cleanFilters" name="cleanFilters" required />
                        </Form.Input>

                        <Form.Input
                            required
                            label="Add Conditioner"
                            inline
                        >
                            <input type="checkbox" id="addConditioner" name="addConditioner" required />
                        </Form.Input>
                    </Form.Group>
                }

                <Form.Button primary className="button__submit" type="submit" disabled={isLoading}>
                    Save
                </Form.Button>
            </Form>
        </Container >
    )
}