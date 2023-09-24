import {Head} from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import Pagination from "@/Components/Paginations.jsx";
import {BiMessageSquareEdit} from "react-icons/bi";
import ProjectTitle from "@/Pages/Projects/Partials/ProjectTitle.jsx";
import {useEffect, useRef, useState} from "react";
import TaskModal from "@/Pages/Projects/Partials/TaskModal.jsx";
import TaskLabel from "@/Pages/Projects/Partials/TaskLabel.jsx";
import DeleteTaskDialog from "@/Pages/Projects/Partials/DeleteTaskDialog.jsx";
import Sortable from 'sortablejs'

export default function Project({auth, project}) {
    const [taskModal, setTaskModal] = useState({
        project, task: null, show: false
    })

    const [deleteDialog, setDeleteDialog] = useState({
        task: null, show: false
    })

    //Referencing could be better
    const cols = [useRef(), useRef(), useRef(), useRef(), useRef()]
    const sortables = []

    useEffect(() => {
        cols.forEach((col) => {
            if (col.current) {
                const sort = new Sortable(col.current, {
                    group: "shared",
                    animation: 150,
                    onEnd: (evt) => {
                        const newPriorityLevel = evt.to.getAttribute('data-level')
                        const taskID = evt.item.getAttribute('data-id')
                        const currentPriority = evt.item.getAttribute('data-priority')

                        updatePriority(newPriorityLevel, currentPriority, taskID)
                    },
                })
                sortables.push(sort)
            }
        })

        return () => {
            sortables.forEach((sortable) => {
                sortable.destroy()
            })
        }
    }, [])

    const updatePriority = (newPriorityLevel, currentPriority, taskID) => {
        if(newPriorityLevel !== currentPriority){
            window.axios.patch(route('task.update'), {task_id: taskID, priority: newPriorityLevel})
        }
    }

    const levels = project.tasks.data?.reduce((ac, c) => {
        switch (c.priority) {
            case 1:
                ac.level1.push(c)
                break
            case 2:
                ac.level2.push(c)
                break
            case 3:
                ac.level3.push(c)
                break
            case 4:
                ac.level4.push(c)
                break
            case 5:
                ac.level5.push(c)
                break
        }
        return ac
    }, {level1: [], level2: [], level3: [], level4: [], level5: []})

    const openTaskModalFor = (intendedTask) => {
        setTaskModal({
            project, task: intendedTask, show: true
        })
    }

    const openDeleteDialogFor = (intendedTask) => {
        setDeleteDialog({
            task: intendedTask, show: true
        })
    }

    return (<AuthenticatedLayout
        user={auth.user}
        header={<ProjectTitle project={project}/>}>

        <Head title="Project"/>

        <div className="py-12">
            <SecondaryButton className="mb-5 ms-3 md:ms-12"
                             onClick={() => setTaskModal({project, task: null, show: true})}>
                <BiMessageSquareEdit size={15} className="me-2"/>
                Create a new task
            </SecondaryButton>
            <div className="w-full grid grid-cols-1 sm:grid-cols-5 px-3 tasks">
                <div className="flex flex-col col-span-1 border-l border-blue-500 px-3">
                        <span className="bg-blue-100 border border-blue-500 rounded p-2 w-full text-center mb-6">
                            Importance level 1
                        </span>
                    <div className="space-y-4 flex flex-col items-center flex-1 level1" ref={cols[0]} data-level={1}>
                        {levels.level1?.map((task, i) => {
                            return <TaskLabel openModal={openTaskModalFor}
                                              deleteDialog={openDeleteDialogFor} task={task} key={i}/>
                        })}
                    </div>
                </div>
                <div className="flex flex-col col-span-1 border-l border-blue-500 px-3">
                        <span className="bg-blue-100 border border-blue-500 rounded p-2 w-full text-center mb-6">
                            Importance level 2
                        </span>
                    <div className="space-y-4 flex flex-col items-center flex-1 level2" ref={cols[1]} data-level={2}>
                        {levels.level2?.map((task, i) => {
                            return <TaskLabel openModal={openTaskModalFor}
                                              deleteDialog={openDeleteDialogFor} task={task} key={i}/>
                        })}
                    </div>
                </div>
                <div className="flex flex-col col-span-1 border-l border-blue-500 px-3">
                        <span className="bg-blue-100 border border-blue-500 rounded p-2 w-full text-center mb-6">
                            Importance level 3
                        </span>
                    <div className="space-y-4 flex flex-col items-center flex-1 level3" ref={cols[2]} data-level={3}>
                        {levels.level3?.map((task, i) => {
                            return <TaskLabel openModal={openTaskModalFor}
                                              deleteDialog={openDeleteDialogFor} task={task} key={i}/>
                        })}
                    </div>
                </div>
                <div className="flex flex-col col-span-1 border-l border-blue-500 px-3">
                        <span className="bg-blue-100 border border-blue-500 rounded p-2 w-full text-center mb-6">
                            Importance level 4
                        </span>
                    <div className="space-y-4 flex flex-col items-center flex-1 level4" ref={cols[3]} data-level={4}>
                        {levels.level4?.map((task, i) => {
                            return <TaskLabel openModal={openTaskModalFor}
                                              deleteDialog={openDeleteDialogFor} task={task} key={i}/>
                        })}
                    </div>
                </div>
                <div className="flex flex-col col-span-1 border-l border-blue-500 px-3">
                        <span className="bg-blue-100 border border-blue-500 rounded p-2 w-full text-center mb-6">
                            Importance level 5
                        </span>
                    <div className="space-y-4 flex flex-col items-center flex-1 level5" ref={cols[4]} data-level={5}>
                        {levels.level5?.map((task, i) => {
                            return <TaskLabel openModal={openTaskModalFor}
                                              deleteDialog={openDeleteDialogFor} task={task} key={i}/>
                        })}
                    </div>
                </div>
            </div>
            <Pagination links={project.tasks.links}/>
        </div>
        <TaskModal taskModal={taskModal} setTaskModal={setTaskModal}/>
        <DeleteTaskDialog deleteDialog={deleteDialog} setDeleteDialog={setDeleteDialog}/>
    </AuthenticatedLayout>)
}
