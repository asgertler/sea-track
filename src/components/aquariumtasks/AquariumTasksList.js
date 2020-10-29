import React, { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { AquariumTasksContext } from "./AquariumTasksProvider"
import { AquariumTask } from "./AquariumTask"
import "./AquariumTasks.css"

export const AquariumTasksList = () => {
    const aquariumId = parseInt(window.location.pathname.split("/").pop())

    const { aquariumTasks, getAquariumTasks } = useContext(AquariumTasksContext)

    const { taskId } = useParams()

    useEffect(() => {
        getAquariumTasks()
    }, [taskId])

    const thisAquariumTasks = aquariumTasks.filter(task => task.aquariumId === aquariumId)

    return (
        <>
            <div>
                <h3>Weekly Tasks</h3>
                {
                    thisAquariumTasks.map(task => {
                        return <AquariumTask key={task.id} task={task} />
                    })
                }
            </div>
        </>
    )
}