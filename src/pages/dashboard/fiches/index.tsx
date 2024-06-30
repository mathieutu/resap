import { useEffect, useState } from "react";
import { Container } from "../../../components/Layout/Container";
import { Layout } from "../../../components/Layout/Layout";
import { SimpleHeader } from "../../../components/Layout/SimpleHeader";
import { getEntries } from "../../../services/manageContent";
import { GetStaticPaths } from "next";
import Link from "next/link";

export default function ListeFiches() {

    const [fiches, setFiches] = useState([] as Array<Record<string, any>>);

    async function fetchFiches() {
        const result = await getEntries('fiche');
        console.log(result)
        setFiches(result)
    }

    useEffect(() => {
        console.log("dud")
        fetchFiches();
    }, [])

    return (
        <Layout className="bg-gray-50">
            <SimpleHeader className="h-[250px]" title="Fiches pratiques" titleClassName="text-blue-default" subTitle="">
                <Container className="flex justify-around pb-12">
                    <ul>
                        {fiches.map(fiche =>
                            <li key={fiche.sys.id}>
                                <Link href={{ pathname: `/dashboard/fiches/${fiche.sys.id}` }}>
                                    {fiche.fields.titre.fr}
                                </Link>
                            </li>
                        )}
                    </ul>
                </Container>
            </SimpleHeader>
        </Layout>
    )
}