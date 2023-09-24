import moment from "moment";
import {Link} from "@inertiajs/react";
import {MdOpenInNew} from "react-icons/md";
import {BsTrash} from "react-icons/bs";


export default function ProjectLabel({project, deleteDialog}){
    const modified = moment(project.updated_at).format('D MMM yyyy hh:mm a')

    return (
        <div className="flex flex-col pt-5 px-5 rounded-2xl bg-white shadow-xl relative">
            <p className="text-lg text-blue-gray-500">
                {project.name}
            </p>
            <div className="actions flex flex-row items-center space-x-3 mb-2 mt-1 ">
                <button onClick={()=>deleteDialog(project)}
                        className="text-red-400 text-sm flex flex-row items-center">
                    <BsTrash size={15} className="me-1"/>
                    Delete
                </button>
                <Link href={route('project', {project_id: project.id})}
                      className="text-sm text-blue-500 flex flex-row items-center">
                    <MdOpenInNew size={15} className="me-1"/>
                    Open
                </Link>
            </div>
            <span className="text-xs pb-4 block text-gray-500">Last modified {modified}</span>
        </div>
    )
}
