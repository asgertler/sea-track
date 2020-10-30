import React, { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { FishContext } from "./FishProvider"
import { FishCard } from "./FishCard"
import { Card, Divider } from "semantic-ui-react"
import "./Fish.css"

export const FishList = () => {
    const aquariumId = parseInt(window.location.pathname.split("/").pop())

    const { fish, getFish } = useContext(FishContext)

    const { fishId } = useParams()

    useEffect(() => {
        getFish()
    }, [fishId])

    const aquariumFish = fish.filter(fish => fish.aquariumId === aquariumId)

    return (
        <>
            <Card.Group className="aquariumFish">
                {
                    aquariumFish.map(fish => {
                        return <FishCard key={fish.id} fish={fish} />
                    })
                }
            </Card.Group>

            <Divider className="globalDivide" />
        </>
    )
}