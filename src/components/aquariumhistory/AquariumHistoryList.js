import React, { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { AquariumHistoryContext } from "./AquariumHistoryProvider"
import { AquariumHistoryCard } from "./AquariumHistoryCard"
import { AquariumHistoryForm } from "./AquariumHistoryForm"
import { Card, Container } from "semantic-ui-react"
import "./AquariumHistory.css"

export const AquariumHistoryList = () => {
    const aquariumId = parseInt(window.location.pathname.split("/").pop())

    const { aquariumHistory, getAquariumHistory } = useContext(AquariumHistoryContext)

    const { aquariumHistoryId } = useParams()

    useEffect(() => {
        getAquariumHistory()
    }, [aquariumHistoryId])

    const currentAquariumHistory = aquariumHistory.filter(obj => obj.aquariumId === aquariumId)
    const reversedAquariumHistory = currentAquariumHistory.reverse()

    const today = Date.now()
    const mostRecentObj = reversedAquariumHistory[0]

    console.log(mostRecentObj)

    return (
        <>
            <Container className="aquariumHistory">
                <AquariumHistoryForm />

                {currentAquariumHistory.length > 0 ? <h3>Water Quality History</h3> : ""}
                <Card.Group>
                    {
                        reversedAquariumHistory.map(aquariumHistory => {
                            return <AquariumHistoryCard key={aquariumHistory.id} aquariumHistory={aquariumHistory} />
                        })
                    }
                </Card.Group>
            </Container>
        </>
    )
}