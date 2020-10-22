import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { FishContext } from "./FishProvider"
import { Container, Form } from "semantic-ui-react"
import "./Fish.css"

export const FishForm = () => {
    const { getFish, addFish, getFishById, editFish } = useContext(FishContext)

    const [fish, setFish] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const { fishId } = useParams()

    const aquariumId = parseInt(window.location.pathname.split("/").pop())

    const handleControlledInputChange = (evt) => {
        const newFish = { ...fish }
        newFish[evt.target.name] = evt.target.value
        setFish(newFish)
    }

    useEffect(() => {
        getFish().then(() => {
            if (fishId) {
                getFishById(fishId)
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

        if (fishId) {
            editFish({
                id: fish.id,
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
        <Container>
            <Form className="fishForm" onSubmit={evt => {
                evt.preventDefault()
                constructNewFish()
            }}>
                <h3 className="fishForm_title">{fishId ? "Edit Fish" : "Add Fish"}</h3>

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
                </Form.Group>

                <Form.Group>
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

                    <Form.Field
                        required
                        label="Diet"
                        control="select"
                        id="fishDiet"
                        name="diet"
                        defaultValue={fish.diet}
                        onChange={handleControlledInputChange}
                    >
                        <option value="0" disabled selected>Choose a food...</option>
                        <option value="Algae">Algae</option>
                        <option value="Pellets">Pellets</option>
                        <option value="Frozen">Frozen</option>
                        <option value="Live">Live</option>
                    </Form.Field>

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
                        width={2}
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
                        width={2}
                    />

                    <div className="birthdayGroup">
                        <label id="birthdayLabel"><strong>Birthday</strong></label><br />

                        <input type="date" required id="fishBirthday" name="birthday"
                            defaultValue={fish.birthday} onChange={handleControlledInputChange} />
                    </div>
                </Form.Group>

                <Form.Button primary className="button__submit" type="submit" disabled={isLoading}>
                    Save
                </Form.Button>
            </Form>
        </Container >
    )
}