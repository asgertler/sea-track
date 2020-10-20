import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { AquariumContext } from "./AquariumProvider"
import { Button, Form } from "semantic-ui-react"
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



    return (
        <Container>
            <Form className="aquariumForm" onSubmit={evt => {
                evt.preventDefault()
            }}>
                <h2 className="aquariumForm_title">{aquariumId ? "Edit Aquarium" : "Add Aquarium"}</h2>

                <Form.Field>
                    <label>Aquarium Name</label>
                    <input required placeholder="e.g. Living Room Reef" />

                    <label>Tank Size (gal)</label>
                    <input required type="number" placeholder="e.g. 150" />
                </Form.Field>
            </Form>
        </Container>
    )
}