import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
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

    const history = useHistory()

    return (
        <>
            <Button inverted circular basic icon className="addAquarium">
                <Icon name="plus" />
            </Button>

            <div className="userAquariums">
                {
                    aquariums.map(aquarium => {
                        return <AquariumCard key={aquarium.id} aquarium={aquarium} />
                    })
                }
            </div>
        </>
    )
}