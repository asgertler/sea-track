import React, { useContext, useState } from "react"
import { AquariumTasksContext } from "./AquariumTasksProvider"
import { Button, Checkbox, Icon, Modal } from "semantic-ui-react"
import { AquariumTasksForm } from "./AquariumTasksForm"
import "./AquariumTasks.css"

export const AquariumTask = ({ task }) => {
    const { deleteAquariumTask, completeAquariumTask } = useContext(AquariumTasksContext)

    const [open, setOpen] = useState(false)

    return (
        <div className="aquariumTask">
            {task.complete === false ?
                <Checkbox label={task.task} onChange={() => {
                    task.complete = true
                    completeAquariumTask(task)
                }} />
                :
                <Checkbox label={task.task} defaultChecked disabled />
            }

            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                size="small"
                trigger={
                    <Button icon circular size="mini">
                        <Icon name="edit" />
                    </Button>
                }>
                <AquariumTasksForm taskId={task.id} />
            </Modal>

            <Button icon circular color="red" size="mini" onClick={() => {
                deleteAquariumTask(task.id)
            }}>
                <Icon name="trash" />
            </Button>
        </div>
    )
}