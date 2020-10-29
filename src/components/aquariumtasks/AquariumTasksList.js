import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AquariumTasksContext } from "./AquariumTasksProvider"
import { AquariumTask } from "./AquariumTask"
import { AquariumTasksForm } from "./AquariumTasksForm"
import { Button, Icon, Modal } from "semantic-ui-react"
import "./AquariumTasks.css"

export const AquariumTasksList = () => {
    const aquariumId = parseInt(window.location.pathname.split("/").pop())

    const { aquariumTasks, getAquariumTasks, completeAquariumTask } = useContext(AquariumTasksContext)

    const [open, setOpen] = useState(false)

    const { taskId } = useParams()

    useEffect(() => {
        getAquariumTasks()
    }, [taskId])

    const thisAquariumTasks = aquariumTasks.filter(task => task.aquariumId === aquariumId)

    const resetTasks = (task) => {
        thisAquariumTasks.forEach(task => {
            if (task.complete === true) {
                task.complete = false
                completeAquariumTask(task)
            }
        })
    }

    return (
        <>
            <div>
                <div className="aquariumTasksHeader">
                    <h3>Weekly Tasks</h3>

                    <Modal
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        size="tiny"
                        trigger={
                            <Button icon circular size="mini">
                                <Icon name="plus" />
                            </Button>
                        }>
                        <AquariumTasksForm />
                    </Modal>

                    <Button icon circular size="mini" onClick={() => resetTasks()}>
                        <Icon name="refresh" />
                    </Button>
                </div>

                {
                    thisAquariumTasks.map(task => {
                        return <AquariumTask key={task.id} task={task} />
                    })
                }
            </div>
        </>
    )
}