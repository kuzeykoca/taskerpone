import { Link, Head } from '@inertiajs/react';
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";

export default function Welcome({ auth, laravelVersion, phpVersion }) {

    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex bg-blue-gray-900 sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center selection:bg-red-500 selection:text-white">
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-right">
                    {auth.user ? (
                        <Link
                            href={route('projects')}
                            className="font-semibold text-white hover:text-gray-500 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Projects
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-white hover:text-gray-500 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="ml-4 font-semibold text-white hover:text-gray-500 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
                <div className="intro-brand flex flex-col items-center justify-center">
                    <div className="flex justify-center">
                        <Link href="/">
                            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                        </Link>
                    </div>
                    <h1 className="text-6xl text-white">
                        Taskerpone
                    </h1>
                </div>
            </div>
        </>
    );
}
