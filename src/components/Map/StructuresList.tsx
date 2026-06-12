'use client'

import type { MapProps } from './Map'
import type { Structure } from '@/types/models'
import type { ChildrenProp } from '@/types/react'
import { AtSymbolIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { useParams, useRouter } from 'next/navigation'
import { type ReactNode, useMemo, useState } from 'react'
import { types } from '@/data/structures_types'

type StructureListItemProps = {
  structure: Structure,
  selected?: boolean,
  onClick: (structure: Structure) => void,
}

const LinkToCoordinate = ({ href, selected, children }: { href: string, selected?: boolean } & ChildrenProp) => {
  if (!selected) return <span className="inline-flex items-center gap-1">{children}</span>

  return (
    <a
      target="_blank noreferer nopener"
      href={href}
      className="
        inline-flex items-center gap-1
        hover:text-blue-default
      "
    >
      {children}
    </a>
  )
}

const StructureListItem = ({
  structure: s,
  selected,
  onClick,
}: StructureListItemProps) => (
  <div
    className={classNames('text-gray-900 relative group block p-4 rounded-md space-y-1 border cursor-pointer', selected ? 'border-green-default' : 'border-gray-light hover:border-blue-default')}
    onClick={() => onClick(s)}
    role="button"
  >
    <p>
      <span className="font-bold">{s.nom}</span>
      {!s.organisation || s.nom.includes(s.organisation) ? null
        : (
            <span className="text-sm italic">
              {' '}
              (
              {s.organisation}
              )
            </span>
          )}
    </p>
    <p className={classNames('inline-block w-fit py-1 px-2 rounded-md text-xs', types[s.type].colorClassname)}>{types[s.type].nom}</p>
    <p>
      <LinkToCoordinate selected={selected!} href={`https://maps.google.fr/maps?hl=fr&q=${s.nom} ${s.adresse}`}>
        <MapPinIcon className="size-4" />
        {' '}
        {s.adresse}
      </LinkToCoordinate>
    </p>
    {s.tel
      && (
        <p>
          <LinkToCoordinate selected={selected!} href={`tel:${s.tel}`}>
            <PhoneIcon className="size-4" />
            {' '}
            {s.tel}
          </LinkToCoordinate>
        </p>
      )}
    {s.email
      && (
        <p>
          <LinkToCoordinate selected={selected!} href={`mailto:${s.email}`}>
            <AtSymbolIcon className="size-4" />
            {' '}
            {s.email}
          </LinkToCoordinate>
        </p>
      )}
    {selected && (
      <XMarkIcon className="
        absolute top-1 right-2 size-5 text-gray-300
        group-hover:text-blue-default
      "
      />
    )}
  </div>
)

const Loader = () => <div />

const Map = dynamic<MapProps>(
  () => import('./Map').then(module => module.Map),
  { ssr: false, loading: Loader },
)

type StructuresListProps = {
  structures: Structure[],
  mapChildren?: ReactNode,
}

export const StructuresList = ({
  structures,
  mapChildren,
}: StructuresListProps) => {
  const { structure: selectedStructureId } = useParams()!
  const router = useRouter()
  const selectStructure = ({ id }: Structure) => router.push(`/annuaire/${id === selectedStructureId ? '' : id}`, { scroll: false })

  const selectedStructure = useMemo(
    () => selectedStructureId ? structures.find(({ id }) => id === selectedStructureId) : undefined,
    [selectedStructureId, structures],
  )

  const [selectedStructureEl, setSelectedStructureEl] = useState<HTMLDivElement | null>(null)
  const selectedStructureClientHeight = selectedStructureEl?.clientHeight ?? 0

  return (
    <div className="
      flex flex-col gap-4
      md:flex-row
    "
    >
      <div className="
        h-[300px] w-full
        sm:h-[70vh]
        md:w-8/12
        print:break-inside-avoid-page
      "
      >
        <Map
          structures={structures}
          onStructureSelected={selectStructure}
          selectedStructure={selectedStructure}
        >
          {mapChildren}
        </Map>
      </div>
      <div className="
        h-[70vh] w-full
        md:w-4/12
      "
      >
        {selectedStructure && (
          <div ref={setSelectedStructureEl} className="pb-4">
            <StructureListItem
              key={selectedStructure.id}
              structure={selectedStructure}
              selected
              onClick={selectStructure}
            />
          </div>
        )}
        <div
          className="
            space-y-4 overflow-y-auto border-y border-gray-light py-4
            print:break-inside-avoid-page print:border-0
          "
          style={{ height: `calc(100% - ${selectedStructureClientHeight}px)` }}
        >
          {structures.filter(s => s.id !== selectedStructure?.id)
            .map(structure => (
              <StructureListItem
                key={structure.id}
                structure={structure}
                onClick={selectStructure}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
