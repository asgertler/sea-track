import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { AquariumContext } from "./AquariumProvider"
import { Container } from "semantic-ui-react"
import "./Aquarium.css"

export const Aquarium = () => {
    const { getAquariumById } = useContext(AquariumContext)

    const [aquarium, setAquarium] = useState({})

    const { aquariumId } = useParams()

    const history = useHistory()

    useEffect(() => {
        getAquariumById(aquariumId)
            .then((res) => {
                setAquarium(res)
            })
    }, [])

    return (
        <Container>
            <section className="aquarium">
                <h3 className="aquarium__name">{aquarium.name}</h3>
            </section>
        </Container>
    )
}