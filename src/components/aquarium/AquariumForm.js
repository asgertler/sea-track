import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { AquariumContext } from "./AquariumProvider"
import { Container, Form } from "semantic-ui-react"
import "./Aquarium.css"

export const AquariumForm = () => {
    const { addAquarium, getAquariumById, editAquarium } = useContext(AquariumContext)

    const [aquarium, setAquarium] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const { aquariumId } = useParams()

    const history = useHistory()

    const handleControlledInputChange = (evt) => {
        const newAquarium = { ...aquarium }
        newAquarium[evt.target.name] = evt.target.value
        setAquarium(newAquarium)
    }

    const constructNewAquarium = () => {
        addAquarium({
            userId: parseInt(localStorage.getItem("seaTrack_user")),
            name: aquarium.name,
            gal: aquarium.size
        })
    }

    return (
        <Container>
            <Form className="aquariumForm" onSubmit={evt => {
                evt.preventDefault()
                constructNewAquarium()
            }}>
                <h2 className="aquariumForm_title">{aquariumId ? "Edit Aquarium" : "Add Aquarium"}</h2>

                <Form.Field>
                    <label>Aquarium Name</label>
                    <Form.Input
                        required
                        type="text"
                        placeholder="e.g. Living Room Reef"
                        id="aquariumName"
                        name="name"
                        onChange={handleControlledInputChange}
                    />

                    <label>Tank Size (gal)</label>
                    <Form.Input
                        required
                        type="number"
                        placeholder="e.g. 150"
                        id="aquariumSize"
                        name="size"
                        onChange={handleControlledInputChange}
                    />

                    <Form.Button primary className="button--submit" type="submit">
                        Save
                    </Form.Button>
                </Form.Field>
            </Form>
        </Container>
    )
}