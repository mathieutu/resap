import dynamic from 'next/dynamic'
import { ReactNode, useRef, useState } from 'react'
import classNames from 'classnames'
import { XIcon } from '@heroicons/react/outline'
import { Structure } from '../../types/models'
import type { MapProps } from './Map'
import { types } from '../../data/structures_types'

type StructureListItemProps = {
  structure: Structure,
  selected?: boolean,
  onClick: (structure: Structure) => void,
};

const StructureListItem = ({
  structure: s,
  selected,
  onClick,
}: StructureListItemProps) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
  <div
    className={classNames('relative group block p-4 rounded-md space-y-1 border cursor-pointer', selected ? 'border-green-default' : 'border-gray-light hover:border-blue-default')}
    onClick={() => onClick(s)}
    role="button"
  >
    <p>
      <span className="font-bold">{s.nom}</span>
      {s.organisation !== s.nom ? <span className="text-sm italic"> ({s.organisation})</span> : null}
    </p>
    <p className={classNames('inline-block text-center w-fit p-1 rounded-md text-xs', types[s.type]?.colorClassname)}>{s.type}</p>
    <p className="">{s.adresse}</p>
    {s.tel && <p className=""><a href={`tel:${s.tel}`} className="hover:text-blue-default">{s.tel}</a></p>}
    {s.email && <p className=""><a href={`mailto:${s.email}`} className="hover:text-blue-default">{s.email}</a></p>}
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
  const [selectedStructure, setSelectedStructure] = useState<Structure | undefined>()
  const selectedStructureRef = useRef<HTMLDivElement>(null)

  const selectStructure = (s: Structure) => setSelectedStructure(currentStructure => (currentStructure?.id === s.id ? undefined : s))
  return (
    <div className="block flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-8/12 sm:h-[70vh] h-[300px]">
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
        <div className="overflow-y-auto space-y-4 border-gray-light border-y py-4" style={{ height: `calc(100% - ${selectedStructureRef.current?.clientHeight || 0}px)` }}>
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
