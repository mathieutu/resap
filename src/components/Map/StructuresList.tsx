import dynamic from 'next/dynamic'
import { ReactNode, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { Structure } from '../../types/models'
import type { MapProps } from './Map'

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
  <div
    className={classNames('block p-4 rounded-md space-y-1 border hover:border-grey-default cursor-pointer', selected ? 'border-blue-default' : 'border-grey-light')}
    onClick={() => onClick(s)}
  >
    <p>
      <span className="font-bold">{s.nom}</span>
      {s.organisation !== s.nom ? <span className="text-sm italic"> ({s.organisation})</span> : null}
    </p>
    <p className="inline-block bg-green-default text-center w-fit p-1 rounded-md text-xs">{s.type}</p>
    <p className="">{s.adresse}</p>
    {s.tel && <p className=""><a href={`tel:${s.tel}`} className="hover:text-blue-default">{s.tel}</a></p>}
    {s.email && <p className=""><a href={`mailto:${s.email}`} className="hover:text-blue-default">{s.email}</a></p>}
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

  const selectStructure = (s: Structure) => setSelectedStructure(currentStructure => (currentStructure?.id === s.id ? undefined : s))
  return (
    <div className="block md:flex md:flex-row gap-3">
      <div className="w-full md:w-8/12">
        <Map
          structures={structures}
          onStructureSelected={selectStructure}
          selectedStructure={selectedStructure}
        >
          {mapChildren}
        </Map>
      </div>
      <div className="w-full md:w-4/12 p-4 overflow-y-auto h-[70vh] space-y-4">
        {selectedStructure && (
          <StructureListItem
            key={selectedStructure.id}
            structure={selectedStructure}
            selected
            onClick={selectStructure}
          />
        )}
        {structures.filter(s => s.id !== selectedStructure?.id).map(structure => (
          <StructureListItem
            key={structure.id}
            structure={structure}
            onClick={selectStructure}
          />
        ))}
      </div>
    </div>
  )
}
