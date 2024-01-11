import dynamic from 'next/dynamic'
import { ReactNode, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { XIcon } from '@heroicons/react/outline'
import { AtSymbolIcon, LocationMarkerIcon, PhoneIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { Structure } from '../../types/models'
import type { MapProps } from './Map'
import { types } from '../../data/structures_types'
import { ChildrenProp } from '../../types/react'

type StructureListItemProps = {
  structure: Structure,
  selected?: boolean,
  onClick: (structure: Structure) => void,
};

const LinkToCoordinate = ({ href, selected, children }: { href: string, selected?: boolean } & ChildrenProp) => {
  if (!selected) return <span className="inline-flex items-center gap-1">{children}</span>

  return (
    <a target="_blank noreferer nopener" href={href} className="inline-flex items-center gap-1 hover:text-blue-default">
      {children}
    </a>
  )
}

const StructureListItem = ({
  structure: s,
  selected,
  onClick,
}: StructureListItemProps) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
  <div
    className={classNames('text-gray-900 relative group block p-4 rounded-md space-y-1 border cursor-pointer', selected ? 'border-green-default' : 'border-gray-light hover:border-blue-default')}
    onClick={() => onClick(s)}
    role="button"
  >
    <p>
      <span className="font-bold">{s.nom}</span>
      {!s.organisation || s.nom.includes(s.organisation) ? null
        : <span className="text-sm italic"> ({s.organisation})</span>}
    </p>
    <p className={classNames('inline-block w-fit py-1 px-2 rounded-md text-xs', types[s.type].colorClassname)}>{types[s.type].nom}</p>
    <p>
      <LinkToCoordinate selected={selected!} href={`https://maps.google.fr/maps?hl=fr&q=${s.nom} ${s.adresse}`}>
        <LocationMarkerIcon className="h-4 w-4" /> {s.adresse}
      </LinkToCoordinate>
    </p>
    {s.tel
      && (
        <p>
          <LinkToCoordinate selected={selected!} href={`tel:${s.tel}`}>
            <PhoneIcon className="h-4 w-4" /> {s.tel}
          </LinkToCoordinate>
        </p>
      )}
    {s.email
      && (
        <p>
          <LinkToCoordinate selected={selected!} href={`mailto:${s.email}`}>
            <AtSymbolIcon className="h-4 w-4" /> {s.email}
          </LinkToCoordinate>
        </p>
      )}
    {s.siteWeb
      && (
        <p>
          <LinkToCoordinate selected={selected!} href={`${s.siteWeb}`}>
            <AtSymbolIcon className="h-4 w-4" /> {s.siteWeb}
          </LinkToCoordinate>
        </p>
      )}
    {selected && <XIcon className="absolute top-1 right-2 h-5 w-5 text-gray-300 group-hover:text-blue-default" />}
  </div>
)

const Loader = () => <div />

const Map = dynamic<MapProps>(
  () => import('./Map').then(module => module.Map),
  {
    ssr: false,
    loading: Loader,
  },
)

type StructuresListProps = {
  structures: Structure[],
  mapChildren?: ReactNode,
}

export const StructuresList = ({
  structures,
  mapChildren,
}: StructuresListProps) => {
  const router = useRouter()
  const { id: selectedStructureId } = router.query
  const selectStructure = ({ id }: Structure) => router.push(`/annuaire/${id === selectedStructureId ? '' : id}`, undefined, { shallow: true, scroll: false })

  const [selectedStructure, setSelectedStructure] = useState<Structure | undefined>()

  useEffect(() => {
    setSelectedStructure(currentStructure => {
      if (!selectedStructureId) return undefined

      const structure = structures.find(({ id }) => id === selectedStructureId)

      if (!structure || structure.id === currentStructure?.id) return currentStructure

      return structure
    })
  }, [selectedStructureId, structures])

  const selectedStructureRef = useRef<HTMLDivElement>(null)
  const [selectedStructureRefClientHeight, setSelectedStructureRefClientHeight] = useState<number | undefined>()

  // 🤷‍ It's working fine like that. I don't understand how it does not infinitely rerender.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setSelectedStructureRefClientHeight(selectedStructureRef.current?.clientHeight) })

  return (
    <div className="block flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-8/12 sm:h-[70vh] h-[300px] print:break-inside-avoid-page">
        <Map
          structures={structures}
          onStructureSelected={selectStructure}
          selectedStructure={selectedStructure}
        >
          {mapChildren}
        </Map>
      </div>
      <div className="w-full md:w-4/12 h-[70vh]">
        {selectedStructure && (
          <div ref={selectedStructureRef} className="pb-4">
            <StructureListItem
              key={selectedStructure.id}
              structure={selectedStructure}
              selected
              onClick={selectStructure}
            />
          </div>
        )}
        <div
          className="print:break-inside-avoid-page overflow-y-auto space-y-4 border-gray-light border-y py-4 print:border-0"
          style={{ height: `calc(100% - ${selectedStructureRefClientHeight || 0}px)` }}
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
