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
                <Button icon labelPosition="left" className="individualTasks" basic onClick={() => {
                    task.complete = true
                    completeAquariumTask(task)
                }}>
                    <Icon name="check" />
                    {task.task}
                </Button>
                :
                <Button icon labelPosition="left" className="individualTasks" disabled>
                    <Icon name="check" />
                    {task.task}
                </Button>
            }

            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                size="small"
                trigger={
                    <Icon name="edit" style={{ cursor: "pointer" }} />
                }>
                <AquariumTasksForm taskId={task.id} />
            </Modal>

            <Icon name="trash" color="red" style={{ cursor: "pointer" }} onClick={() => {
                deleteAquariumTask(task.id)
            }} />
        </div>
    )
}