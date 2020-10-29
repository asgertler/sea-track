import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AquariumTasksContext } from "./AquariumTasksProvider"
import { AquariumTask } from "./AquariumTask"
import { AquariumTasksForm } from "./AquariumTasksForm"
import { Button, Icon, Modal } from "semantic-ui-react"
import "./AquariumTasks.css"

export const AquariumTasksList = () => {
    const aquariumId = parseInt(window.location.pathname.split("/").pop())

    const { aquariumTasks, getAquariumTasks } = useContext(AquariumTasksContext)

    const [open, setOpen] = useState(false)

    const { taskId } = useParams()

    useEffect(() => {
        getAquariumTasks()
    }, [taskId])

    const thisAquariumTasks = aquariumTasks.filter(task => task.aquariumId === aquariumId)

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