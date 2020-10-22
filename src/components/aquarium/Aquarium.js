import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { AquariumContext } from "./AquariumProvider"
import { Button, Container, Icon } from "semantic-ui-react"
import "./Aquarium.css"

export const Aquarium = (props) => {
    const { getAquariumById, deleteAquarium } = useContext(AquariumContext)

    const [aquarium, setAquarium] = useState({})

    const { aquariumId } = useParams()

    const history = useHistory()

    useEffect(() => {
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

                <Button icon circular onClick={
                    () => {
                        deleteAquarium(aquarium.id)
                            .then(() => {
                                history.push("/")
                            })
                    }
                }>
                    <Icon name="delete" />
                </Button>
            </section>
        </Container>
    )
}