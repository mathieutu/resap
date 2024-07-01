import { useRouter } from "next/router"
import { Container } from "../../../components/Layout/Container"
import { Layout } from "../../../components/Layout/Layout"
import { SimpleHeader } from "../../../components/Layout/SimpleHeader"
import { useEffect, useState } from "react"
import { createEntry, getSingleEntry, patchEntry, deleteEntry, publishEntry, unpublishEntry } from "../../../services/manageContent"
const { parseHtml } = require('contentful-html-rich-text-converter')
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

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
    const [sys, setSys] = useState({ version: 1, publishedAt: null });
    const [titre, setTitre] = useState('');
    const [slug, setSlug] = useState('');
    const [categorie, setCategorie] = useState('sante');
    const [illustration, setIllustration] = useState('');
    const [description, setDescription] = useState('');
    const [resume, setResume] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([] as string[]);
    /*
    const [plusLoin, setPlusLoin] = useState('')
    const [tools, setTools] = useState('')
    const [patient, setPatient] = useState('')
    */

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    function onTitleChange() {
        const newSlug = titre
            .toLowerCase()
            .trim()
            .replaceAll(' ', '-')
            .replace(/[^\w\-]+/g, '');     // Remove all non-word chars
        setSlug(newSlug);
    }

    function parseHtmlToFormattedText(html: string): string {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        function extractText(node: Node, listIndex: number[] = []): string {
            if (node.nodeType === Node.TEXT_NODE) {
                return node.textContent || '';
            }

            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element;
                let text = '';

                if (element.tagName.toLowerCase() === 'ol') {
                    listIndex.push(0);
                }

                for (const child of Array.from(element.childNodes)) {
                    text += extractText(child, listIndex);
                }

                if (element.tagName.toLowerCase() === 'ol') {
                    listIndex.pop();
                }

                switch (element.tagName.toLowerCase()) {
                    case 'h1':
                    case 'h2':
                    case 'h3':
                        return '\n\n' + text.toUpperCase() + '\n\n';
                    case 'p':
                        return text + '\n\n';
                    case 'br':
                        return '\n';
                    case 'li':
                        if (element.parentElement?.tagName.toLowerCase() === 'ol') {
                            listIndex[listIndex.length - 1]++;
                            return `${listIndex[listIndex.length - 1]}. ${text}\n`;
                        }
                        return '• ' + text + '\n';
                    default:
                        return text;
                }
            }

            return '';
        }

        return extractText(doc.body).replace(/\n{3,}/g, '\n\n').trim();
    }

    const handleSelect = (option: OptionType) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item.id !== option.id))
        } else {
            setSelectedOptions([...selectedOptions, option])
        }
    }

    const handleTags = (value: string) => {
        const data = value.split(';')
        setTags(data)
    }

    async function fetchFiche(id: string) {
        const result = await getSingleEntry(id);
        if (result) {
            // console.log(result.fields)
            setTitre((result.fields.titre) ? result.fields.titre.fr : '');
            setCategorie((result.fields.categorie) ? result.fields.categorie.fr : '');
            //setIllustration(result.fields.illustration.fr);
            setDescription((result.fields.description) ? result.fields.description.fr : '');
            setResume((result.fields.resume) ? parseHtmlToFormattedText(documentToHtmlString(result.fields.resume.fr)) : '');
            setContent((result.fields.contenu) ? parseHtmlToFormattedText(documentToHtmlString(result.fields.contenu.fr)) : '');
            setResume((result.fields.resume) ? parseHtmlToFormattedText(documentToHtmlString(result.fields.resume.fr)) : '');
            setContent((result.fields.contenu) ? parseHtmlToFormattedText(documentToHtmlString(result.fields.contenu.fr)) : '');
            setTags((result.fields.tags) ? result.fields.tags.fr : '');
            /*
            setPlusLoin(result.fields.plusLoin.fr);
            setTools(result.fields.tools.fr)
            setPatient(result.fields.patient.fr)
            */
            setSys({ ...result.sys })
            setMetadata({ ...result.metadata })
        }
    }

    async function handleSubmit(event: any) {
        event.preventDefault();
        const id = router.query.id as string;
        if (id === 'new') {
            // create
            let payload = {
                titre,
                slug,
                categorie,
                //illustration,
                //description,
                //resume,
                //contenu,
                tags
            };

            const result = await createEntry('fiche', payload)
            router.push('/dashboard/fiches')

        } else {
            // update
            const payload = {
                titre,
                slug,
                categorie,
                //illustration,
                //description,
                //resume,
                content,
                tags
            }
            const result = await patchEntry(id, payload, sys.version)
            setSys({ ...result.sys });
            setMetadata({ ...result.metadata });
            router.push('/dashboard/fiches')

        }
    }

    async function publish() {
        const id = router.query.id as string;
        const result = await publishEntry(id, sys.version);
        setSys({ ...result.sys });
        setMetadata({ ...result.metadata });
    }

    async function unpublish() {
        const id = router.query.id as string;
        const result = await unpublishEntry(id, sys.version);
        setSys({ ...result.sys });
        setMetadata({ ...result.metadata });
    }

    async function requestDelete() {
        if (confirm('La suppression est irréversible. Confirmer?')) {
            const id = router.query.id as string;
            await deleteEntry(id, sys.version);
            router.push('/dashboard/fiches')
        }
    }

    useEffect(() => {
        const id = router.query.id;
        if (id !== 'new') {
            fetchFiche(id as string);
        }
    }, [])

    useEffect(onTitleChange, [titre])

    return (
        <Layout className="bg-gray-light">
            <SimpleHeader className="h-[250px]" title="Fiches pratiques" titleClassName="text-blue-default" subTitle="" >
                {
                    router.query.id !== 'new' &&
                    <div className="flex">
                        {!sys.publishedAt &&
                            <>
                                <button type="button" onClick={publish} className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Publier
                                </button>
                                <button type="button" onClick={requestDelete} className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Supprimer
                                </button>
                            </>
                        }
                        {sys.publishedAt &&
                            <>
                                <button type="button" onClick={unpublish} className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Passer en brouillon
                                </button>
                                <button type="button" onClick={requestDelete} disabled className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Supprimer
                                </button>
                            </>
                        }
                    </div>
                }
            </SimpleHeader>
            <Container className="flex justify-around pb-12">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-full">
                                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Titre</label>
                                    <div className="mt-2 w-full">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input type="text" name="title" id="title" autoComplete="title" value={titre} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" onChange={(e) => setTitre(e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-full">
                                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Slug</label>
                                    <div className="mt-2 w-full">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input type="text" name="slug" id="slug" autoComplete="slug" value={slug} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" onChange={(e) => setSlug(e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-full">
                                    <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">Catégorie</label>
                                    <div className="mt-2 w-full">
                                        <select id="category" name="category" autoComplete="category" value={titre} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => setCategorie(e.target.value)}>
                                            <option value={'sante'}>Santé</option>
                                            <option value={'besoins-primaires'}>Besoins primaires</option>
                                            <option value={'social'}>Social</option>
                                            <option value={'interpretariat'}>Interpretariat</option>
                                        </select>
                                    </div>
                                </div>

                                {/* <div className="col-span-full">
                                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Illustration</label>
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                            </svg>
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                    <span>Ajouter une illustration</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => setIllustration(e.target.value)} />
                                                </label>
                                                <p className="pl-1">ou glissez et déposez</p>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF jusqu'à 10MB</p>
                                        </div>
                                    </div>
                                </div> */}

                                <div className="col-span-full">
                                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                    <div className="mt-2">
                                        <textarea id="description" name="description" rows={4} value={description} className="block p-2.5 w-full text-sm rounded-lg border focus:ring-blue-500 focus:border-blue-500" onChange={(e) => setDescription(e.target.value)}></textarea>
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">Courte description apparaissant dans la recherche et les listes. Maximum 280 characters</p>
                                </div>


                                <div className="col-span-full">
                                    <label htmlFor="resume" className="block text-sm font-medium leading-6 text-gray-900">Resumé</label>
                                    <div className="mt-2">
                                        <textarea id="resume" name="resume" rows={4} value={resume} className="block p-2.5 w-full text-sm rounded-lg border focus:ring-blue-500 focus:border-blue-500" onChange={(e) => setResume(e.target.value)}></textarea>
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">Un résumé qui s'affichera en premier sur la fiche.</p>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">Contenu</label>
                                    <div className="mt-2">
                                        <textarea id="content" name="content" rows={4} value={content} className="block p-2.5 w-full text-sm rounded-lg border focus:ring-blue-500 focus:border-blue-500" onChange={(e) => setContent(e.target.value)}></textarea>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="tags" className="block text-sm font-medium leading-6 text-gray-900">Tags</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input type="text" name="tags" id="tags" autoComplete="tags" placeholder="tag 1;tag 2" value={tags.join(';')} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" onChange={(e) => handleTags(e.target.value)} />
                                        </div>
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">Une suite de mots séparés par des point-virgules, pour identifier et rechercher la fiche.</p>
                                </div>

                                {/*
                                <div className="col-span-full">
                                    <label htmlFor="plus-loin" className="block text-sm font-medium leading-6 text-gray-900">Pour aller plus loin</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input type="text" name="plus-loin" id="plus-loin" autoComplete="plus-loin" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" onChange={(e) => setPlusLoin(e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="tools" className="block text-sm font-medium leading-6 text-gray-900">Quelques Outils</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input type="text" name="tools" id="tools" autoComplete="tools" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" onChange={(e) => setTools(e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-full">
                                    <label htmlFor="patients" className="block text-sm font-medium leading-6 text-gray-900">Pour les patients</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input type="text" name="patients" id="patients" autoComplete="patients" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" onChange={(e) => setPatient(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                */}

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
                            <button type="submit" onClick={handleSubmit} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Ajouter</button>
                        </div>
                    </div>
                </form>
            </Container>
        </Layout>
    )
}