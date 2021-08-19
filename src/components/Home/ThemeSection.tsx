/* This example requires Tailwind CSS v2.0+ */
import {AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon} from '@heroicons/react/outline'
import {Headline, headlineProps} from "../Headline";
import {ClassNameProp} from "../../types/react";
import { DotsVerticalIcon } from '@heroicons/react/solid'
import {ChartBarIcon, ShieldCheckIcon, CursorClickIcon, RefreshIcon} from "@heroicons/react/outline";
const projects = [
    { name: 'Santé',description: 'Description de la thématique',  icon: ChartBarIcon, href: '#', bgColor: 'bg-pink-600' },
    { name: 'Besoins Primaires',description: 'Description de la thématique',   icon: ShieldCheckIcon, href: '#',  bgColor: 'bg-purple-600' },
    { name: 'Interprenariat',description: 'Description de la thématique',   icon: CursorClickIcon, href: '#', bgColor: 'bg-yellow-500' },
    { name: 'Social',description: 'Description de la thématique',   icon: RefreshIcon, href: '#',  bgColor: 'bg-green-500' },
]


function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

const headline: headlineProps = {
    title: "Nos différentes thématique",
    text: "Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.",
    tag: '',
}

type themeSectionProps = {} & ClassNameProp

export const ThemeSection = ({className}: themeSectionProps) => (
    <div className={className + " py-12 bg-white"}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Headline tag={headline.tag} title={headline.title}
                      text={headline.text}/>
            <div className="mt-10">
                <ul role="list" className="mt-3 grid grid-rows-2 gap-5 sm:gap-6 grid-flow-col w-1/2 mx-auto">
                    {projects.map((project) => (
                        <li key={project.name} className="col-span-1 flex shadow-sm rounded-md">
                            <div
                                className={classNames(
                                    project.bgColor,
                                    'flex-shrink-0 flex items-center justify-center p-4 text-white text-sm font-medium rounded-md'
                                )}
                            >
                                <project.icon className={"w-6"}/>
                            </div>
                            <div className="flex-1 flex items-center justify-between truncate">
                                <div className="flex-1 px-4 py-2 text-sm truncate">
                                    <a href={project.href} className="text-gray-900 font-medium hover:text-gray-600">
                                        {project.name}
                                    </a>
                                    <p className="text-gray-500">{project.description}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
)
