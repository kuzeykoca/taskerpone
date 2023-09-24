import Modal from "@/Components/Modal.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Transition} from "@headlessui/react";
import {useForm} from "@inertiajs/react";


export default function NewProjectModal({show, setShow}){
    const {data, setData, post, errors, processing, recentlySuccessful} = useForm({
        name: "",
    })

    const submit = (e) => {
        setShow(false)
        e.preventDefault()
        post(route('projects.create'))
    }

    return (
        <Modal show={show} onClose={() => setShow(false)}>
            <div className="max-h-full">
                <h5
                    className="mb-2 py-6 text-xl f-b border-b border-b-gray-300
                            text-gray-800 leading-tight text-center">
                    Create a project
                </h5>
                <form className="py-5 px-6 space-y-2" onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="name" value="Project Name"/>
                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />
                        <InputError className="mt-2" message={errors.name}/>
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
