import {Button, Dialog, DialogBody, DialogFooter, DialogHeader} from "@material-tailwind/react";
import {router} from "@inertiajs/react";


export default function DeleteTaskDialog({deleteDialog, setDeleteDialog}){
    const closeDialog = () => setDeleteDialog({...deleteDialog, show: false})

    const submit = (e) => {
        e.preventDefault()
        closeDialog()
        router.delete(route('task.destroy', {task_id: deleteDialog.task.id}))
    }

    return (
        <Dialog open={deleteDialog.show}
                onClose={closeDialog}
                size="sm" handler={closeDialog}>
            <DialogHeader>Delete Task</DialogHeader>
            <DialogBody divider>
                <div className="flex flex-col items-center">
                    <p className="font-bold">
                        "{deleteDialog.task?.name}" will be deleted
                    </p>
                    <p>Are you sure you want to delete this task?</p>
                    <p>This action cannot be undone.</p>
                </div>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={closeDialog}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <form onSubmit={submit}>
                    <Button variant="gradient" color="green" type="submit">
                        <span>Confirm</span>
                    </Button>
                </form>
            </DialogFooter>
        </Dialog>
    )
}
