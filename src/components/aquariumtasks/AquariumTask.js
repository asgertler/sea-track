import React, { useContext, useState } from "react"
import { AquariumTasksContext } from "./AquariumTasksProvider"
import { Button, Checkbox, Icon, Modal } from "semantic-ui-react"
import { AquariumTasksForm } from "./AquariumTasksForm"
import "./AquariumTasks.css"

export const AquariumTask = ({ task }) => {
    const { deleteAquariumTask } = useContext(AquariumTasksContext)

    const [open, setOpen] = useState(false)

    return (
        <div className="aquariumTask">
            <Checkbox label={task.task} />

            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                size="small"
                trigger={
                    <Button icon circular>
                        <Icon name="edit" />
                    </Button>
                }>
                <AquariumTasksForm taskId={task.id} />
            </Modal>

            <Button icon circular color="red" onClick={() => {
                deleteAquariumTask(task.id)
            }}>
                <Icon name="delete" />
            </Button>
        </div>
    )
}