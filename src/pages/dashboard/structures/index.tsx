import { useEffect, useState } from "react";
import { Container } from "../../../components/Layout/Container";
import { Layout } from "../../../components/Layout/Layout";
import { SimpleHeader } from "../../../components/Layout/SimpleHeader";
import { getEntries } from "../../../services/manageContent";
import { GetStaticPaths } from "next";
import Link from "next/link";

export default function ListeStructures() {

    const [structures, setStructures] = useState([] as Array<Record<string, any>>);

    async function fetchStructures() {
        const result = await getEntries('structure');
        setStructures(result)
    }

    useEffect(() => {
        fetchStructures();
    }, [])

    return (
        <Layout className="bg-gray-50">
            <SimpleHeader className="h-[250px]" title="Structures" titleClassName="text-blue-default" subTitle="">
                <Container className="flex justify-around pb-12">
                    <button>
                        <Link href={{ pathname: `/dashboard/structures/new` }}>Nouvelle Structure</Link>
                    </button>
                    <ul>
                        {structures.map(structure =>
                            <li key={structure.sys.id}>
                                <Link href={{ pathname: `/dashboard/structures/${structure.sys.id}` }}>
                                    {structure.fields.titre.fr}
                                </Link>
                            </li>
                        )}
                    </ul>
                </Container>
            </SimpleHeader>
        </Layout>
    )
}