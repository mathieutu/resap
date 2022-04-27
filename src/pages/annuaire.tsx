/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable eol-last */
import { NextSeo } from 'next-seo'
import { Layout } from '../components/Layout/Layout'

export default function Annuaires() {
    return (
        <Layout className="bg-gray-50" withoutContactBanner>
            <NextSeo title="À propos" />
            <div className="py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
                <div className="relative max-w-3xl mx-auto">
                    <svg
                        className="absolute left-full transform translate-x-1/4"
                        width={404}
                        height={404}
                        fill="none"
                        viewBox="0 0 404 404"
                        aria-hidden="true"
                    >
                        <defs>
                            <pattern
                                id="85737c0e-0916-41d7-917f-596dc7edfa27"
                                x={0}
                                y={0}
                                width={20}
                                height={20}
                                patternUnits="userSpaceOnUse"
                            >
                                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
                    </svg>
                    <svg
                        className="absolute right-full bottom-0 transform -translate-x-1/4"
                        width={404}
                        height={404}
                        fill="none"
                        viewBox="0 0 404 404"
                        aria-hidden="true"
                    >
                        <defs>
                            <pattern
                                id="85737c0e-0916-41d7-917f-596dc7edfa27"
                                x={0}
                                y={0}
                                width={20}
                                height={20}
                                patternUnits="userSpaceOnUse"
                            >
                                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
                    </svg>
                    <div className="text-center">
                        <h1 className="text-3xl font-extrabold tracking-tight text-blue-default sm:text-4xl">Annuaire</h1>
                    </div>
                    <div className="text-center mt-12 max-w-[100ch] prose prose-sm sm:prose-base lg:prose-lg">
                        <h2>Zone barre de recherche</h2>
                    </div>
                    <div className="text-center mt-12 max-w-[100ch] prose prose-sm sm:prose-base lg:prose-lg">
                        <h2>Zone carte</h2>
                    </div>
                </div>
            </div>
        </Layout>
    )
}