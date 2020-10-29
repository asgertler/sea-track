import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { AquariumTasksContext } from "./AquariumTasksProvider"
import { Checkbox } from "semantic-ui-react"
import "./AquariumTasks.css"

export const AquariumTask = ({ task }) => {
    const { deleteAquariumTask } = useContext(AquariumTasksContext)

    return (
        <div className="aquariumTask">
            <Checkbox label={task.task} />
        </div>
    )
}