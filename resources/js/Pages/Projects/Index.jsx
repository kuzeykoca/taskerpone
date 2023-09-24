import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {Head} from '@inertiajs/react'
import Pagination from "@/Components/Paginations.jsx"
import SecondaryButton from "@/Components/SecondaryButton.jsx"
import {BiMessageSquareEdit} from "react-icons/bi"
import ProjectLabel from "@/Pages/Projects/Partials/ProjectLabel.jsx"
import {useState} from "react"
import NewProjectModal from "@/Pages/Projects/Partials/NewProjectModal.jsx";
import DeleteProjectDialog from "@/Pages/Projects/Partials/DeleteProjectDialog.jsx";

export default function Index({auth, projects}) {
    const [show, setShow] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState({
        project: null,
        show: false
    })

    const openDeleteDialogFor = (intendedProject) => {
        setDeleteDialog({
            project: intendedProject,
            show: true
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Projects</h2>}
        >
            <Head title="Projects"/>

            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <SecondaryButton className="mb-5 ms-3 md:ms-12" onClick={() => setShow(true)}>
                        <BiMessageSquareEdit size={15} className="me-2"/>
                        Create a new project
                    </SecondaryButton>
                    <div className=" px-3 md:p-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                        {
                            projects.data?.map((project, i) => {
                                return <ProjectLabel project={project} deleteDialog={openDeleteDialogFor} key={i}/>
                            })
                        }
                    </div>
                    <Pagination links={projects.links}/>
                </div>
            </div>
            <NewProjectModal show={show} setShow={setShow}/>
            <DeleteProjectDialog deleteDialog={deleteDialog} setDeleteDialog={setDeleteDialog}/>
        </AuthenticatedLayout>
    )
}
