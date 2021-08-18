import {ButtonHTMLAttributes} from "react";

type buttonProps = {text: string, onClick?: React.MouseEventHandler} & ButtonHTMLAttributes<any>

export const PrimaryButton = ({type, text, onClick}: buttonProps) => (
    <button
        onClick={onClick}
        type={type}
        className="mt-3 w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
    >{text}</button>
)
