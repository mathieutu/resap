import { useEffect, useState } from "react";
import { Container } from "../../../components/Layout/Container";
import { Layout } from "../../../components/Layout/Layout";
import { SimpleHeader } from "../../../components/Layout/SimpleHeader";
import { getEntries } from "../../../services/manageContent";
import { GetStaticPaths } from "next";
import Link from "next/link";
import { FicheCard } from "../../../components/Dashboard/FicheCard";

export default function ListeFiches() {

    const [fiches, setFiches] = useState([] as Array<Record<string, any>>);

    async function fetchFiches() {
        const result = await getEntries('fiche');
        setFiches(result)
    }

    useEffect(() => {
        fetchFiches();
    }, [])

    return (
        <Layout className="bg-gray-50">
            <SimpleHeader className="h-fit" title="Fiches pratiques" titleClassName="text-blue-default" subTitle="">
                <Container className="m-5">
                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        <Link href={{ pathname: `/dashboard/fiches/new` }}>Nouvelle fiche</Link>
                    </button>
                </Container>
                <Container className="flex justify-around pb-12">
                    <div className="w-full grid grid-cols-4 gap-2">
                        {fiches.map(fiche =>
                            <Link href={{ pathname: `/dashboard/fiches/${fiche.sys.id}` }}>
                                <a>
                                    <FicheCard title={fiche.fields.titre.fr} id={fiche.sys.id} />
                                </a>
                            </Link>
                        )}
                    </div>
                </Container>
            </SimpleHeader>
        </Layout>
    )
}