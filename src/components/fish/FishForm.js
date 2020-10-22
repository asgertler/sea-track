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
                pHHigh: parseInt(fish.pHHigh),
                pHLow: parseInt(fish.pHLow)
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
                pHHigh: parseInt(fish.pHHigh),
                pHLow: parseInt(fish.pHLow)
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
                    <label>Birthday</label>
                    <input type="date" required id="fishBirthday" name="birthday"
                        defaultValue={fish.birthday} onChange={handleControlledInputChange} />

                    <Form.Field
                        required
                        label="Diet"
                        control="select"
                        placeholder="e.g. Algae"
                        id="fishDiet"
                        name="diet"
                        defaultValue={fish.diet}
                        onChange={handleControlledInputChange}
                    >
                        <option value="Algae">Algae</option>
                        <option value="Pellets">Pellets</option>
                        <option value="Frozen">Frozen</option>
                        <option value="Live">Live</option>
                    </Form.Field>
                </Form.Group>
            </Form>
        </Container >
    )
}

/*

<Form.Field className="fishInputs">


                    <Form.Select
                        required
                        label="Diet"
                        placeholder="What type of food do they eat?"
                        id="fishDiet"
                        name="diet"
                        defaultValue={fish.diet}
                        onChange={handleControlledInputChange}
                    >
                        <option value="Pellets">Pellets</option>
                        <option value="Frozen">Frozen</option>
                        <option value="Live">Live</option>
                    </Form.Select>
                </Form.Field>
            </Form>

            */