type Props = {
    title: string,
    id: string
}

export const Card = ({ title, id }: Props) => {

    console.log(`/dashboard/fiches/${id}`)
    return (
        <div className="flex items-center justify-center w-full p-6 bg-white rounded-lg shadow-lg overflow-hidden bg-white h-full">
            <h5 className="text-xl font-semibold text-gray-900">{title}</h5>
        </div>
    )
}
