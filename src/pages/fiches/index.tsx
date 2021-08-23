import {GetStaticProps} from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {listAllFiches} from '../../services/contentful'
import {Fiche} from '../../types/models'
import {Prose} from '../../components/Prose'
import {Layout} from "../../components/Layout/Layout";
import {FicheCard} from "../../components/Card/FicheCard";
import {SimpleHeader} from "../../components/Layout/SimpleHeader";
import {PrimaryButton} from "../../components/Buttons/Primary";

export const getStaticProps: GetStaticProps = async ({preview}) => ({
    props: {
        fiches: await listAllFiches(preview),
        preview: Boolean(preview),
    },
})

export default function ListFiches({fiches}: { fiches: Fiche[] }) {
    return (
        <Layout className="bg-gray-50" header={"navbar"}>
            <SimpleHeader className="h-[475px]" title={"Fiches pratiques"} tag={"FICHES"}>
                <form action="#" method="POST" className="w-full block md:w-1/2 mx-auto mt-20 sm:flex">
                    <label htmlFor="email" className="sr-only">
                        Recherchez parmis nos 400+ fiches
                    </label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        size={33}
                        className="block w-full py-3 text-base rounded-md placeholder-gray-500 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:flex-1 border-gray-300"
                        placeholder="Recherchez parmis nos 400+ fiches"
                    />
                    <PrimaryButton type={"submit"} text={"Recherche"}/>
                </form>
            </SimpleHeader>
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 -mt-24">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {fiches.map((fiche) => (
                        <FicheCard fiche={fiche}/>
                    ))}
                </div>
            </div>
        </Layout>
    )
}
