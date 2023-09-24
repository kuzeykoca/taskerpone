import {Button, Dialog, DialogBody, DialogFooter, DialogHeader} from "@material-tailwind/react";
import {router} from "@inertiajs/react";


export default function DeleteProjectDialog({deleteDialog, setDeleteDialog}){
    const closeDialog = () => setDeleteDialog({...deleteDialog, show: false})

    const submit = (e) => {
        e.preventDefault()
        closeDialog()
        router.delete(route('projects.destroy', {project_id: deleteDialog.project.id}))
    }

    return (
        <Dialog open={deleteDialog.show}
                onClose={closeDialog}
                size="sm" handler={closeDialog}>
            <DialogHeader>Delete Project</DialogHeader>
            <DialogBody divider>
                <div className="flex flex-col items-center">
                    <p className="font-bold">
                        "{deleteDialog.project?.name}" will be deleted
                    </p>
                    <p>Are you sure you want to delete this project?</p>
                    <p>This action cannot be undone.</p>
                    <p className="text-center text-sm mt-2">Note: If you delete this project
                        all the tasks attached to this project will be deleted as well.</p>
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
