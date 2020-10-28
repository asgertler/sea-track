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

    const mostRecentObj = reversedAquariumHistory[0] // focus on the most recent water change

    let mostRecentDate // date to handle math
    let warningTime = false // default state of no overdue time warning
    let overdueDays = ""

    // setting up date test to see if last water change was more than two weeks ago
    if (mostRecentObj !== undefined) {
        const today = Date.now()
        mostRecentDate = mostRecentObj.testDate // date from most recent water change
        const mostRecentParse = Date.parse(mostRecentDate) // parsing that date

        const timeGap = today - mostRecentParse // time gap in milliseconds
        const twoWeeks = 1209600000 // two weeks in milliseconds

        if (timeGap > twoWeeks) {
            warningTime = true // tell form to display warning
            overdueDays = Math.floor((timeGap - twoWeeks) / (86400 * 1000)) // overdue days
            console.log(overdueDays)
        }
    }

    return (
        <>
            <Container className="aquariumHistory">
                <AquariumHistoryForm warningTime={warningTime} overdueDays={overdueDays} />

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