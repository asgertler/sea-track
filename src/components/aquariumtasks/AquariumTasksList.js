import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AquariumTasksContext } from "./AquariumTasksProvider"
import { AquariumTask } from "./AquariumTask"
import { AquariumTasksForm } from "./AquariumTasksForm"
import { Button, Divider, Icon, Modal } from "semantic-ui-react"
import "./AquariumTasks.css"

export const AquariumTasksList = () => {
    const aquariumId = parseInt(window.location.href.split("/").pop())

    const { aquariumTasks, getAquariumTasks, completeAquariumTask } = useContext(AquariumTasksContext)

    const [open, setOpen] = useState(false)

    const { taskId } = useParams()

    useEffect(() => {
        getAquariumTasks()
    }, [taskId])

    const thisAquariumTasks = aquariumTasks.filter(task => task.aquariumId === aquariumId)

    const resetTasks = () => {
        thisAquariumTasks.forEach(task => {
            if (task.complete === true) {
                task.complete = false
                completeAquariumTask(task)
            }
        })
    }

    const incompleteTasks = thisAquariumTasks.filter(task => task.complete === false)

    return (
        <>
            <Divider className="globalDivide" />

            <div className="aquariumTasksContainer">
                <div className="aquariumTasksHeader">
                    <h3>Weekly Tasks</h3>

                    <Modal
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        size="tiny"
                        trigger={
                            <Button className="tasksBtns" icon circular size="mini">
                                <Icon name="plus" />
                            </Button>
                        }>
                        <AquariumTasksForm />
                    </Modal>

                    <Button className="tasksBtns" icon circular size="mini" onClick={() => resetTasks()}>
                        <Icon name="refresh" />
                    </Button>
                </div>

                {incompleteTasks.length > 0 ?
                    <div>
                        {
                            thisAquariumTasks.map(task => {
                                return <AquariumTask key={task.id} task={task} />
                            })
                        }
                    </div>
                    :
                    <span>
                        <Icon name="thumbs up outline" />All Tasks Completed!
                    </span>
                }
            </div>

            <Divider className="globalDivide" />
        </>
    )
}