import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { AquariumContext } from "./AquariumProvider"
import { Button, Container, Icon, Modal } from "semantic-ui-react"
import { FishList } from "../fish/FishList"
import { FishForm } from "../fish/FishForm"
import { AquariumHistoryList } from "../aquariumhistory/AquariumHistoryList"
import { AquariumTasksList } from "../aquariumtasks/AquariumTasksList"
import "./Aquarium.css"

export const Aquarium = () => {
    const { getAquariumById, deleteAquarium } = useContext(AquariumContext)

    const [aquarium, setAquarium] = useState({})
    const [open, setOpen] = React.useState(false)

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
                <div className="aquarium__header">
                    <div className="aquarium__intro">
                        <h2 className="aquarium__name"><strong>{aquarium.name}</strong> / {aquarium.gal} gal</h2>

                        <Modal
                            onClose={() => setOpen(false)}
                            onOpen={() => setOpen(true)}
                            open={open}
                            size="small"
                            trigger={
                                <Button>
                                    <Icon name="plus" /> Fish
                            </Button>
                            }>
                            <FishForm />
                        </Modal>
                    </div>
                    <div className="aquarium__buttons">
                        <Button icon circular onClick={() => {
                            history.push(`/aquarium/edit/${aquarium.id}`)
                        }}>
                            <Icon name="edit" />
                        </Button>

                        <Button icon circular color="red" style={{ marginLeft: "5px" }} onClick={() => {
                            deleteAquarium(aquarium.id)
                                .then(() => {
                                    history.push("/")
                                })
                        }
                        }>
                            <Icon name="trash" />
                        </Button>
                    </div>
                </div>

                <section className="aquarium__fish">
                    <FishList />
                    <AquariumHistoryList />
                    <AquariumTasksList />
                </section>
            </section>
        </Container>
    )
}