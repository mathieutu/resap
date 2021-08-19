import {Disclosure} from '@headlessui/react'
import {SearchIcon} from '@heroicons/react/solid'
import {BellIcon, MenuIcon, XIcon} from '@heroicons/react/outline'
import {Logo} from "../Logo";
import Link from "next/link";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

const navigation = [
    {name: 'Fiches pratiques', href: 'fiches'},
    {name: 'Annuaires', href: '#'},
    {name: 'Contact', href: '#'},
];

export const Navbar = () => (
    <Disclosure as="nav" className="bg-white shadow">
        {({open}) => (
            <>
                <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex px-2 lg:px-0">
                            <div className="flex-shrink-0 flex items-center">
                                <Logo/>
                            </div>
                            <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                                {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}>
                                        <a className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                            {item.name}
                                        </a>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 flex items-center justify-center px-2  lg:justify-end">
                            <label htmlFor="search" className="sr-only">
                                Search
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                </div>
                                <input
                                    id="search"
                                    name="search"
                                    className="block pl-10 l-10  py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Recherchez parmis les fiches et structures"
                                    type="search"
                                    size={42}
                                />
                            </div>
                        </div>
                        <div className="flex items-center lg:hidden">
                            {/* Mobile menu button */}
                            <Disclosure.Button
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="sr-only">Open main menu</span>
                                {open ? (
                                    <XIcon className="block h-6 w-6" aria-hidden="true"/>
                                ) : (
                                    <MenuIcon className="block h-6 w-6" aria-hidden="true"/>
                                )}
                            </Disclosure.Button>
                        </div>
                    </div>
                </div>

                <Disclosure.Panel className="lg:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}>
                                <a className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                                    {item.name}
                                </a>
                            </Link>
                        ))}
                    </div>
                </Disclosure.Panel>
            </>
        )}
    </Disclosure>
);
