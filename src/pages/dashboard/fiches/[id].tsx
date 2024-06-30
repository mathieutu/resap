import { useRouter } from "next/router"
import { Container } from "../../../components/Layout/Container"
import { Layout } from "../../../components/Layout/Layout"
import { SimpleHeader } from "../../../components/Layout/SimpleHeader"
import { useEffect, useState } from "react"
import { getSingleEntry } from "../../../services/manageContent"
import { Editor } from "@tinymce/tinymce-react"

type OptionType = {
    id: number
    label: string
}

const options: OptionType[] = [
    { id: 1, label: 'Accompagnement MNA' },
    { id: 2, label: 'Association d\'aide aux migrants' },
    { id: 3, label: 'Association LGBTQIA+' },
    { id: 4, label: 'Associations caritatives - Distribution Alimentaire' },
    { id: 5, label: 'Associations d\'accompagnement personnes en situation de prostitution' },
    { id: 6, label: 'CAARUD' },
    { id: 7, label: 'CADA' },
    { id: 8, label: 'CAES' },
    { id: 9, label: 'CD' },
    { id: 10, label: 'CEGIDD' },
    { id: 11, label: 'Centre de vaccination' },
    { id: 12, label: 'COREVIH' },
    { id: 13, label: 'CPH' },
    { id: 14, label: 'CPTS' },
    { id: 15, label: 'CSAPA' },
    { id: 16, label: 'Filières gérontologiques' },
    { id: 17, label: 'HUDA' },
    { id: 18, label: 'MDPH' },
    { id: 19, label: 'MSP' },
    { id: 20, label: 'OFII' },
    { id: 21, label: 'PASS' },
    { id: 22, label: 'PRAHDA' },
    { id: 23, label: 'Préfecture' },
    { id: 24, label: 'Réseaux polyvalents (tous âges et toutes pathologies)' },
    { id: 25, label: 'SIAO' },
    { id: 26, label: 'SPADA' },
]

export default function FicheForm() {

    const router = useRouter();

    const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')

    const [metadata, setMetadata] = useState({});
    const [sys, setSys] = useState({});
    const [fields, setFields] = useState({
        titre: '',
        categorie: 'sante',
        illustration: '',
        description: '',
        resume: '',
        contenu: '',
        tags: [] as string[],
        plusLoin: '',
        tools: '',
        patient: '',
    });

    /*
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('sante')
    const [illustration, setIllustration] = useState('')
    const [description, setDescription] = useState('')
    const [resume, setResume] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState([''])
    const [plusLoin, setPlusLoin] = useState('')
    const [tools, setTools] = useState('')
    const [patient, setPatient] = useState('')
    */

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleSelect = (option: OptionType) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item.id !== option.id))
        } else {
            setSelectedOptions([...selectedOptions, option])
        }
    }

    const handleTags = (value: string) => {
        const data = value.split(' ')
        setFields({...fields, tags: data})
    }


    async function fetchFiche(id: string) {
        const result = await getSingleEntry(id);
        if (result) {
            setFields({...result.fields});
            setSys({...result.sys});
            setMetadata({...result.metadata});
        }
    }

    useEffect(() => {
        const id = router.query.id;
        if (!!id) {
            fetchFiche(id as string);
        }
    }, [])


    return (
        <Layout className="bg-gray-light">
            <SimpleHeader className="h-[250px]" title="Fiches pratiques" titleClassName="text-blue-default" subTitle="" >
                <div></div>
            </SimpleHeader>
            <Container className="flex justify-around pb-12">
                <form>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-full">
                                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Titre</label>
                                    <div className="mt-2 w-full">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input type="text" name="title" id="title" autoComplete="title" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" onChange={(e) => setFields({...fields, titre: e.target.value})} />
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-full">
                                    <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">Catégorie</label>
                                    <div className="mt-2 w-full">
                                        <select id="category" name="category" autoComplete="category" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => setFields({...fields, categorie: e.target.value})}>
                                            <option value={'sante'}>Santé</option>
                                            <option value={'besoins-primaires'}>Besoins primaires</option>
                                            <option value={'social'}>Social</option>
                                            <option value={'interpretariat'}>Interpretariat</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Illustration</label>
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                            </svg>
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                    <span>Ajouter une illustration</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => setFields({...fields, illustration: e.target.value})} />
                                                </label>
                                                <p className="pl-1">ou glissez et déposez</p>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF jusqu'à 10MB</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                    <div className="mt-2">
                                        <textarea id="description" name="description" rows={3} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => setFields({...fields, description: e.target.value})}></textarea>
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">Courte description apparaissant dans la recherche et les listes. Maximum 280 characters</p>
                                </div>


                                <div className="col-span-full">
                                    <label htmlFor="resume" className="block text-sm font-medium leading-6 text-gray-900">Resumé</label>
                                    <div className="mt-2">
                                        <Editor
                                            apiKey='xbi1qu2whkqzxvp4t2sukbs69yqcdjby6ufpgikv3qqg9kgi'
                                            init={{
                                                height: 500,
                                                width: 1200,
                                                menubar: false,
                                                plugins: [
                                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                                ],
                                                toolbar: 'undo redo | blocks | ' +
                                                    'bold italic forecolor | alignleft aligncenter ' +
                                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                                    'removeformat | help',
                                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                            }}
                                            onEditorChange={(value) => setFields({...fields, resume: value})}
                                        />
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">Un résumé qui s'affichera en premier sur la fiche.</p>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">Contenu</label>
                                    <div className="mt-2">
                                        <Editor
                                            apiKey='xbi1qu2whkqzxvp4t2sukbs69yqcdjby6ufpgikv3qqg9kgi'
                                            init={{
                                                height: 500,
                                                width: 1200,
                                                menubar: false,
                                                plugins: [
                                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                                ],
                                                toolbar: 'undo redo | blocks | ' +
                                                    'bold italic forecolor | alignleft aligncenter ' +
                                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                                    'removeformat | help',
                                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                            }}
                                            onEditorChange={(value) => setFields({...fields, contenu: value})}
                                        />
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="tags" className="block text-sm font-medium leading-6 text-gray-900">Tags</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input type="text" name="tags" id="tags" autoComplete="tags" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" onChange={(e) => handleTags(e.target.value)} />
                                        </div>
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">Une suite de mots, pour identifier et rechercher la fiche.</p>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="plus-loin" className="block text-sm font-medium leading-6 text-gray-900">Pour aller plus loin</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input type="text" name="plus-loin" id="plus-loin" autoComplete="plus-loin" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" onChange={(e) => setFields({...fields, plusLoin: e.target.value})} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="tools" className="block text-sm font-medium leading-6 text-gray-900">Quelques Outils</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input type="text" name="tools" id="tools" autoComplete="tools" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" onChange={(e) => setFields({...fields, tools: e.target.value})} />
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-full">
                                    <label htmlFor="patients" className="block text-sm font-medium leading-6 text-gray-900">Pour les patients</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input type="text" name="patients" id="patients" autoComplete="patients" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" onChange={(e) => setFields({...fields, patient: e.target.value})} />
                                        </div>
                                    </div>
                                </div>

                                <div className="relative w-96">
                                    <div
                                        onClick={toggleDropdown}
                                        className="bg-white border border-gray-300 rounded-md p-2 flex justify-between items-center cursor-pointer"
                                    >
                                        <span>{selectedOptions.length > 0 ? selectedOptions.map(opt => opt.label).join(', ') : 'Types de dispositif'}</span>

                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d={isOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
                                            />
                                        </svg>
                                    </div>
                                    {isOpen && (
                                        <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-md z-10">
                                            <input
                                                type="text"
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                placeholder="Search..."
                                                className="p-2 w-full border-b border-gray-300"
                                            />
                                            <div className="max-h-60 overflow-y-auto">
                                                {options
                                                    .filter((option) => option.label.toLowerCase().includes(search.toLowerCase()))
                                                    .map((option) => (
                                                        <div
                                                            key={option.id}
                                                            onClick={() => handleSelect(option)}
                                                            className={`p-2 cursor-pointer ${selectedOptions.includes(option) ? 'bg-blue-500 text-white' : ''
                                                                }`}
                                                        >
                                                            {option.label}
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Ajouter</button>
                        </div>
                    </div>
                </form>
            </Container>
        </Layout>
    )
}