import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { FishContext } from "./FishProvider"
import { Container, Form } from "semantic-ui-react"
import "./Fish.css"

export const FishForm = props => {
    const { getFish, addFish, getFishById, editFish } = useContext(FishContext)

    const [fish, setFish] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const aquariumId = parseInt(window.location.pathname.split("/").pop())

    const handleControlledInputChange = (evt) => {
        const newFish = { ...fish }
        newFish[evt.target.name] = evt.target.value
        setFish(newFish)
    }

    useEffect(() => {
        getFish().then(() => {
            if (props.fishId) {
                getFishById(props.fishId)
                    .then(fish => {
                        setFish(fish)
                        setIsLoading(false)
                    })
            } else {
                setIsLoading(false)
            }
        })
    }, [])

    const history = useHistory()

    const constructNewFish = () => {
        setIsLoading(true)

        if (props.fishId) {
            editFish({
                id: props.fishId,
                aquariumId: fish.aquariumId,
                name: fish.name,
                type: fish.type,
                length: parseInt(fish.length),
                birthday: fish.birthday,
                diet: fish.diet,
                pHHigh: fish.pHHigh,
                pHLow: fish.pHLow
            })
                .then(() => history.push(`/aquarium/details/${fish.aquariumId}`))

        } else {
            addFish({
                userId: parseInt(localStorage.getItem("seaTrack_user")),
                aquariumId: aquariumId,
                name: fish.name,
                type: fish.type,
                length: parseInt(fish.length),
                birthday: fish.birthday,
                diet: fish.diet,
                pHHigh: fish.pHHigh,
                pHLow: fish.pHLow
            })
                .then(history.push((`/aquarium/details/${aquariumId}`)))
        }
    }

    return (
        <Container className="fishFormContainer">
            <Form className="fishForm" onSubmit={evt => {
                evt.preventDefault()
                constructNewFish()
            }}>
                <h3 className="fishForm_title">{props.fishId ? "Edit Fish" : "Add Fish"}</h3>

                <Form.Group>
                    <Form.Input
                        required
                        label="Name"
                        placeholder="e.g. Dory"
                        id="fishName"
                        name="name"
                        defaultValue={fish.name}
                        onChange={handleControlledInputChange}
                        width={6}
                        autoFocus
                    />

                    <Form.Input
                        required
                        label="Type"
                        placeholder="e.g. Blue tang"
                        id="fishType"
                        name="type"
                        defaultValue={fish.type}
                        onChange={handleControlledInputChange}
                        width={6}
                    />

                    <Form.Input
                        required
                        label="Max Length (in)"
                        placeholder="e.g. 12"
                        id="fishLength"
                        name="length"
                        defaultValue={fish.length}
                        onChange={handleControlledInputChange}
                        width={3}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Input
                        required
                        label="Diet"
                    >
                        <select name="diet" id="fishDiet" value={fish.diet} defaultValue={""}
                            onChange={handleControlledInputChange} required>
                            <option value="" disabled>Choose a food...</option>
                            <option value="Algae">Algae</option>
                            <option value="Pellets">Pellets</option>
                            <option value="Frozen">Frozen</option>
                            <option value="Live">Live</option>
                        </select>
                    </Form.Input>


                    <Form.Input
                        required
                        type="number"
                        step="0.1"
                        label="Min pH"
                        placeholder="e.g. 8.1"
                        id="fishpHLow"
                        name="pHLow"
                        defaultValue={fish.pHLow}
                        onChange={handleControlledInputChange}
                        width={3}
                    />

                    <Form.Input
                        required
                        type="number"
                        step="0.1"
                        label="Max pH"
                        placeholder="e.g. 8.4"
                        id="fishpHHigh"
                        name="pHHigh"
                        defaultValue={fish.pHHigh}
                        onChange={handleControlledInputChange}
                        width={3}
                    />

                    <Form.Input
                        required
                        label="Birthday"
                    >
                        <input type="date" required id="fishBirthday" name="birthday"
                            defaultValue={fish.birthday} onChange={handleControlledInputChange} />
                    </Form.Input>
                </Form.Group>

                <Form.Button primary className="button__submit" type="submit" disabled={isLoading}>
                    Save
                </Form.Button>
            </Form>
        </Container>
    )
}