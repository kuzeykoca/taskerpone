import moment from "moment"
import {FaEllipsisV} from "react-icons/fa"
import {Menu, MenuHandler, MenuItem, MenuList} from "@material-tailwind/react";

export default function TaskLabel({task, openModal, deleteDialog}) {
    const modified = moment(task.updated_at).format('D MMM yyyy hh:mm a')

    return (
        <div data-id={task.id} data-priority={task.priority}
             className="w-full relative flex flex-col bg-blue-100 pt-5 px-5 rounded-2xl shadow-xl cursor-grab task">
            <Menu placement="bottom-end">
                <MenuHandler>
                    <button className="bg-none absolute right-2 top-3 text-gray-700">
                        <FaEllipsisV/>
                    </button>
                </MenuHandler>
                <MenuList>
                    <MenuItem onClick={() => openModal(task)}>See/Update</MenuItem>
                    <MenuItem onClick={() => deleteDialog(task)}>Delete</MenuItem>
                </MenuList>
            </Menu>
            <p className="text-lg text-gray-900">
                {task.name}
            </p>
            <p className="py-2 overflow-hidden text-ellipsis whitespace-nowrap">
                {task.info}
            </p>
            <span className="text-xs pb-4 block text-gray-800">Last modified {modified}</span>
        </div>
    )
}
