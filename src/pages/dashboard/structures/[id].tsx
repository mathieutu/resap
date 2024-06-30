import { useRouter } from "next/router"
import { Container } from "../../../components/Layout/Container"
import { Layout } from "../../../components/Layout/Layout"
import { SimpleHeader } from "../../../components/Layout/SimpleHeader"
import { useEffect, useState } from "react"
import { createEntry, getSingleEntry, patchEntry } from "../../../services/manageContent"


import { types } from "../../../data/structures_types"


export default function FicheForm() {

    const router = useRouter();
    const [metadata, setMetadata] = useState({});
    const [sys, setSys] = useState({ version: 1});
    const [nom, setNom] = useState('');
    const [organisation, setOrganisation] = useState('');
    const [type, setType] = useState('');
    const [specialites, setSpecialites] = useState([] as string[]);
    const [latLon, setlatLon] = useState([0,0] as number[]);
    const [adresse, setAdresse] = useState('');
    const [siteWeb, setSiteWeb] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');

    const structureTypes = ["Accompagnement MNA", "Association LGBTQIA+", "Association d'aide aux migrants", 
        "Associations caritatives - Distribution Alimentaire", "Associations d’accompagnement personnes en situation de prostitution",
        "CAARUD", "CADA", "CAES", "CDS", "CEGIDD", "CLAT", "COREVIH", "CPH", "CPTS", "CSAPA", "Centre de vaccination", 
        "Filières gérontologiques", "HUDA", "MDPH",
        "MSP", "OFII", "PASS", "PRAHDA", "Préfecture", 
        "Réseaux polyvalents (tous âges et toutes pathologies)", "SIAO", "SPADA"
    ]

    const handleSpecialites = (value: string) => {
        const data = value.split(';')
        setSpecialites(data)
    }
    
    async function fetchStructure(id: string) {
        const result = await getSingleEntry(id);
        if (result) {
            setNom((result.fields.nom) ? result.fields.nom.fr : '');
            setOrganisation((result.fields.organisation) ? result.fields.organisation.fr : '');
            setType((result.fields.type) ? result.fields.type.fr : '');
            setSpecialites((result.fields.specialites) ? result.fields.specialites.fr : []);
            setlatLon((result.fields.latLon) ? result.fields.latLon.fr : [0, 0]);
            setAdresse((result.fields.adresse) ? result.fields.adresse.fr : '');
            setSiteWeb((result.fields.siteWeb) ?result.fields.siteWeb.fr: '');
            setTel((result.fields.tel) ? result.fields.tel.fr: '');
            setEmail((result.fields.email) ? result.fields.email.email: '');
            setSys({...result.sys})
            setMetadata({...result.metadata})
        }
    }

    async function handleSubmit(event: any) {
        event.preventDefault();
        const id = router.query.id as string;
        if (id === 'new') {
            // create
            let payload = {
                nom,
                organisation,
                type,
                specialites,
                latLon,
                adresse,
                siteWeb,
                tel,
                email,
            };
            const result = await createEntry('structure', payload)
        } else {
            // update
            const payload = {
                nom,
                organisation,
                type,
                specialites,
                latLon,
                adresse,
                siteWeb,
                tel,
                email,
            }
            const result = await patchEntry(id, payload, sys.version)
            setSys({...result.sys});
            setMetadata({...result.metadata});
        }
    }

    useEffect(() => {
        const id = router.query.id;
        if (id !== 'new') {
            fetchStructure(id as string);
        }
    }, [])

    return (
        <Layout className="bg-gray-light">
            <SimpleHeader className="h-[250px]" title="Fiches pratiques" titleClassName="text-blue-default" subTitle="" >
                <div></div>
            </SimpleHeader>
            <Container className="flex justify-around pb-12">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-full">
                                    <label htmlFor="nom" className="block text-sm font-medium leading-6 text-gray-900">Nom</label>
                                    <div className="mt-2 w-full">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input type="text" name="nom" id="nom" autoComplete="title" value={nom} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" onChange={(e) => setNom(e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-full">
                                    <label htmlFor="organisation" className="block text-sm font-medium leading-6 text-gray-900">Organisation</label>
                                    <div className="mt-2 w-full">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input type="text" name="organisation" id="organisation" autoComplete="organisation" value={organisation} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" onChange={(e) => setOrganisation(e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-full">
                                    <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">Type de structure</label>
                                    <div className="mt-2 w-full">
                                        <select id="type" name="type" autoComplete="type" value={type} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => setType(e.target.value)}>
                                            {structureTypes.map((type, index) => 
                                                <option key={index} value={type}>{type}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>


                                <div className="col-span-full">
                                    <label htmlFor="specialites" className="block text-sm font-medium leading-6 text-gray-900">Spécialités (tags)</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input type="text" name="specialites" id="specialites" autoComplete="specialites" placeholder="tag 1;tag 2" value={specialites.join(';')} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" onChange={(e) => handleSpecialites(e.target.value)} />
                                        </div>
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">Une suite de mots séparés par des point-virgules, pour identifier et rechercher la fiche.</p>
                                </div>

                                {/*
                                map selector
                                */}

                                <div className="sm:col-span-full">
                                    <label htmlFor="adresse" className="block text-sm font-medium leading-6 text-gray-900">Adresse à afficher</label>
                                    <div className="mt-2 w-full">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input type="text" name="adresse" id="adresse" autoComplete="adresse" value={adresse} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" onChange={(e) => setAdresse(e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-full">
                                    <label htmlFor="siteWeb" className="block text-sm font-medium leading-6 text-gray-900">Site web</label>
                                    <div className="mt-2 w-full">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input type="text" name="siteWeb" id="siteWeb" autoComplete="siteWeb" value={siteWeb} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" onChange={(e) => setSiteWeb(e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-full">
                                    <label htmlFor="tel" className="block text-sm font-medium leading-6 text-gray-900">Téléphone</label>
                                    <div className="mt-2 w-full">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input type="text" name="tel" id="tel" autoComplete="tel" value={tel} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" onChange={(e) => setTel(e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-full">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Téléphone</label>
                                    <div className="mt-2 w-full">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input type="text" name="email" id="email" autoComplete="email" value={email} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="submit" onClick={handleSubmit} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Ajouter</button>
                        </div>
                    </div>
                </form>
            </Container>
        </Layout>
    )
}