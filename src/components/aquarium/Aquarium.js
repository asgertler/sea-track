import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { AquariumContext } from "./AquariumProvider"
import { Container } from "semantic-ui-react"
import "./Aquarium.css"

export const Aquarium = (props) => {
    const { getAquariumById } = useContext(AquariumContext)

    const [aquarium, setAquarium] = useState({})

    const { aquariumId } = useParams()

    const history = useHistory()

    console.log("test", aquarium)

    useEffect(() => {
        console.log("ran")
        getAquariumById(aquariumId)
            .then((res) => {
                setAquarium(res)
            })
    }, [aquariumId])

    return (
        <Container>
            <section className="aquarium">
                <h3 className="aquarium__name">{aquarium.name}</h3>
                <p className="aquarium__size">{aquarium.gal}</p>
            </section>
        </Container>
    )
}