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
        <Form className="aquariumForm">
            <h2 className="aquariumForm_title">{aquariumId ? "Update Aquarium" : "Add Aquarium"}</h2>

            <Form.Field>
                <label>Aquarium Name</label>
                <input placeholder="e.g. Living Room Reef" />
            </Form.Field>
        </Form>
    )
}