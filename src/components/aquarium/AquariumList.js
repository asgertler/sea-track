import React, { useContext, useEffect } from "react"
import { AquariumContext } from "./AquariumProvider"
import { AquariumCard } from "./AquariumCard"
import { Button, Icon } from "semantic-ui-react"
import "./Aquarium.css"

export const AquariumList = () => {
    const { aquariums, getAquariums } = useContext(AquariumContext)

    const currentUser = parseInt(localStorage.getItem("seaTrack_user"))

    useEffect(() => {
        getAquariums()
    }, [])

    const userAquariums = aquariums.filter(aquarium => aquarium.userId === currentUser)

    return (
        <>
            <Button inverted circular basic icon className="addAquarium">
                <Icon name="plus" />
            </Button>

            <div className="userAquariums">
                <AquariumCard key={userAquariums.id} aquarium={userAquariums} />
            </div>
        </>
    )
}