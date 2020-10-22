import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { AquariumContext } from "./AquariumProvider"
import { Button, Container, Icon } from "semantic-ui-react"
import { FishList } from "../fish/FishList"
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
                <h2 className="aquarium__name">{aquarium.name}</h2>
                <p className="aquarium__size">{aquarium.gal}</p>

                <section className="aquarium__fish">
                    <FishList />
                </section>

                <Button icon circular onClick={() => {
                    history.push(`/aquarium/edit/${aquarium.id}`)
                }}>
                    <Icon name="edit" />
                </Button>

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