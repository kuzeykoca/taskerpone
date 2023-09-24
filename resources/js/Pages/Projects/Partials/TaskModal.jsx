import Modal from "@/Components/Modal.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Transition} from "@headlessui/react";
import {router, useForm} from "@inertiajs/react";
import {useEffect} from "react";


export default function TaskModal({taskModal, setTaskModal}){
    const {data, setData, reset, errors, setError, processing, recentlySuccessful} = useForm({
        project_id: taskModal.project.id,
        name: taskModal.task?.name ?? "" ,
        info: taskModal.task?.info ?? "" ,
        task_id: taskModal.task?.id ?? null ,
        priority: taskModal.task?.priority ?? 1 ,
    })

    useEffect(() => {
        setData({
            project_id: taskModal.project.id,
            name: taskModal.task?.name ?? "" ,
            info: taskModal.task?.info ?? "" ,
            task_id: taskModal.task?.id ?? null ,
            priority: taskModal.task?.priority ?? 1 ,
        })
    }, [taskModal]);

    const submit = (e) => {
        e.preventDefault()
        if(data.name.length>255){
            return setError('name', 'Name cannot be longer than 255 chars')
        }

        if(data.info.length>1200){
            return setError('info', 'Info cannot be longer than 1200 chars')
        }

        setTaskModal({...taskModal, show: false})

        if(taskModal.task){
            router.patch(route('task.update'), data, {
                onFinish: () => reset(),
                onError: (error) => console.log(error)
            })
        }else{
            router.post(route('task.create'), data, {
                onFinish: () => reset()
            })
        }
    }

    return (
        <Modal show={taskModal.show} onClose={() => setTaskModal({...taskModal, show: false})}>
            <div className="max-h-full">
                <h5
                    className="mb-2 py-6 text-xl f-b border-b border-b-gray-300
                            text-gray-800 leading-tight text-center">
                    Create a task
                </h5>
                <form className="py-5 px-6 space-y-4" onSubmit={submit}>
                    <div>
                        <div className="flex flex-row justify-between items-center mb-1">
                            <InputLabel htmlFor="name">
                                Task Name
                                <label className="text-xs text-gray-600 ms-1">(Max 255 chars)</label>
                            </InputLabel>
                            <label className="text-xs text-gray-600">{data.name?.length} chars</label>
                        </div>
                        <TextInput
                            id="name"
                            className="block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />
                        <InputError className="mt-1" message={errors.name}/>
                    </div>

                    <div>
                        <div className="flex flex-row justify-between items-center mb-1">
                            <InputLabel htmlFor="name">
                                Task Info
                                <label className="text-xs text-gray-600 ms-1">(Max 1200 chars)</label>
                            </InputLabel>
                            <label className="text-xs text-gray-600">{data.info?.length} chars</label>
                        </div>
                        <textarea rows={8} onChange={(e)=> setData('info', e.target.value)}
                                  className="resize-none border border-gray-300 w-full rounded-lg"
                                  required
                                  value={data.info ?? ""}
                                  placeholder="Please type here the task info"></textarea>
                        <InputError className="mt-1" message={errors.info}/>
                    </div>

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>Save</PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">Created</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
