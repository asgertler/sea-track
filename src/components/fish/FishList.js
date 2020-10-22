import React, { useContext, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { FishContext } from "./FishProvider"
import { AquariumContext } from "../aquarium/AquariumProvider"
import { FishCard } from "./FishCard"
import { Button, Icon } from "semantic-ui-react"
import "./Fish.css"

export const FishList = () => {
    const { fish, getFish } = useContext(FishContext)
    const { aquariums, getAquariums } = useContext(AquariumContext)

    const { fishId } = useParams()

    useEffect(() => {
        getFish()
            .then(getAquariums)
    }, [])

    const history = useHistory()

    const aquariumFish = fish.filter(fish => fish.aquariumId === aquariums.id)

    return (
        <>
            <div className="aquariumFish">
                {
                    fish.map(fish => {
                        return <FishCard key={fish.id} fish={fish} />
                    })
                }
            </div>
        </>
    )
}