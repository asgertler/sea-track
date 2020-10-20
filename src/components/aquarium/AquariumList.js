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

    const userAquariums = aquariums.filter(aquarium => aquarium.userId === currentUser)

    return (
        <>
            <div className="userAquariums">
                {
                    userAquariums.map(aquariums => {
                        return <AquariumCard key={aquariums.id} aquarium={aquariums} />
                    })
                }
            </div>

            <Button inverted circular basic icon className="addAquarium"
                onClick={() => { history.push("/aquarium/form") }}>
                <Icon name="plus" />
            </Button>
        </>
    )
}