import { useEffect, useState } from "react";
import { Container } from "../../../components/Layout/Container";
import { Layout } from "../../../components/Layout/Layout";
import { SimpleHeader } from "../../../components/Layout/SimpleHeader";
import { getEntries } from "../../../services/manageContent";
import { GetStaticPaths } from "next";
import Link from "next/link";
import { Card } from "../../../components/Dashboard/Card";

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
            <SimpleHeader className="h-fit" title="Structures" titleClassName="text-blue-default" subTitle="">
                <Container className="m-5">
                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        <Link href={{ pathname: `/dashboard/structures/new` }}>Nouvelle Structure</Link>
                    </button>
                </Container>
                <Container className="flex justify-around pb-12">
                    <div className="w-full grid grid-cols-4 gap-2">
                        {structures.map(structure =>
                            <Link href={{ pathname: `/dashboard/structures/${structure.sys.id}` }}>
                                <a>
                                    {structure.fields.nom ? <Card title={structure.fields.nom.fr} id={structure.sys.id} /> : <Card title={'undefined'} id={structure.sys.id} />}
                                </a>
                            </Link>
                        )}
                    </div>
                </Container>
            </SimpleHeader>
        </Layout>
    )
}