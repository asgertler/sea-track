import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { FishContext } from "./FishProvider"
import { FishCard } from "./FishCard"
import { Button, Container, Icon } from "semantic-ui-react"
import "./Fish.css"

export const FishList = () => {
    const aquariumId = parseInt(window.location.pathname.split("/").pop())

    const { fish, getFish } = useContext(FishContext)

    const { fishId } = useParams()

    useEffect(() => {
        getFish()
    }, [fishId])

    const aquariumFish = fish.filter(fish => fish.aquariumId === aquariumId)

    const history = useHistory()

    return (
        <>
            <Container className="aquariumFish">
                {
                    aquariumFish.map(fish => {
                        return <FishCard key={fish.id} fish={fish} />
                    })
                }
            </Container>
        </>
    )
}