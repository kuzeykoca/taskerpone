import {useForm} from "@inertiajs/react";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import {Transition} from "@headlessui/react";


export default function ProjectTitle({project}){
    const {data, setData, patch, errors, processing, recentlySuccessful} = useForm({
        name: project.name,
        project_id: project.id
    })

    const submit = (e) => {
        e.preventDefault()
        patch(route('projects.update'))
    }

    return (
        <form className="w-full grid grid-cols-8" onSubmit={submit}>
            <div className="col-span-7">
                <TextInput
                    id="name"
                    className="mt-1 block w-full border-none shadow-none focus:ring-0 text-lg"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                    autoComplete="name"
                />
                <InputError className="mt-2" message={errors.name}/>
            </div>
            {
                data.name !== project.name && (
                    <div className="flex items-center gap-4 col-span-1">
                        <SecondaryButton disabled={processing} className="w-full justify-center" type="submmit">Save</SecondaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">Updated</p>
                        </Transition>
                    </div>
                )
            }
        </form>
    )
}
