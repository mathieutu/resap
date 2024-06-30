import { useEffect, useState } from "react";
import { Container } from "../../../components/Layout/Container";
import { Layout } from "../../../components/Layout/Layout";
import { SimpleHeader } from "../../../components/Layout/SimpleHeader";
import { getEntries } from "../../../services/manageContent";

export default function ListeFiches() {

    const [fiches, setFiches] = useState([]);

    async function fetchFiches() {
        const result = await getEntries('fiche');
    }

    useEffect(() => {
        console.log("dud")
        fetchFiches();
    }, [])

    return (
        <Layout className="bg-gray-50">
            <SimpleHeader className="h-[250px]" title="Fiches pratiques" titleClassName="text-blue-default" subTitle="">
                <Container className="flex justify-around pb-12">
                    <div>I am a list</div>
                </Container>
            </SimpleHeader>
        </Layout>

    )

}