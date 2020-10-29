import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AquariumTasksContext } from "./AquariumTasksProvider"
import { Form } from "semantic-ui-react"
import "./AquariumTasks.css"

export const AquariumTasksForm = () => {
    const { getAquariumTasks, addAquariumTask, getAquariumTaskById, editAquariumTask } = useContext(AquariumTasksContext)

    const [aquariumTask, setAquariumTask] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const { aquariumTaskId } = useParams()

    const aquariumId = parseInt(window.location.pathname.split("/").pop())

    const handleControlledInputChange = (evt) => {
        const newAquariumTask = { ...aquariumTask }
        newAquariumTask[evt.target.name] = evt.target.value
        setAquariumTask(newAquariumTask)
    }

    useEffect(() => {
        getAquariumTasks().then(() => {
            if (aquariumTaskId) {
                getAquariumTaskById(aquariumTaskId)
                    .then(aquariumTask => {
                        setAquariumTask(aquariumTask)
                        setIsLoading(false)
                    })
            } else {
                setIsLoading(false)
            }
        })
    }, [])

    const constructNewAquariumTask = () => {
        setIsLoading(true)

        addAquariumTask({
            aquariumId: aquariumId,
            task: aquariumTask.task,
            targetDate: aquariumTask.targetDate,
            complete: false
        })
    }

    return (
        <div className="aquariumTasksFormContainer">
            <Form className="aquariumTasksForm" onSubmit={evt => {
                evt.preventDefault()
                constructNewAquariumTask()
            }}>
                <Form.Group>
                    <Form.Input
                        required
                        placeholder="New Task"
                        id="task"
                        name="task"
                        defaultValue={aquariumTask.task}
                        onChange={handleControlledInputChange}
                    />

                    <Form.Input
                        required
                    >
                        <input type="date" required id="targetDate" name="targetDate"
                            defaultValue={aquariumTask.targetDate} onChange={handleControlledInputChange} />
                    </Form.Input>

                    <Form.Button primary className="button__submit" type="submit" disabled={isLoading}>
                        Save
                </Form.Button>
                </Form.Group>
            </Form>
        </div>
    )
}