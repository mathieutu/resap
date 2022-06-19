import 'leaflet/dist/leaflet.css'

import { GeoJSON, MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import L, { LatLngTuple } from 'leaflet'
import { ReactNode, useEffect, useMemo } from 'react'
import { groupBy } from 'ramda'
import { Structure } from '../../types/models'
import { departementsBoundaries } from './departements'
import { MarkerClusterGroup } from './Cluster'
import { ResetViewControl } from './ResetViewControl'
import { types } from '../../data/structures_types'

const initialCenter: LatLngTuple = [45.40, 4.66]
const initialZoom = 7

const UpdateViewWhenSelectingStructure = ({ selectedStructure: s }: { selectedStructure: Structure | undefined }) => {
  const map = useMap()
  useEffect(() => {
    if (s) {
      map.flyTo([s.latLon.lat, s.latLon.lon])
    }
  }, [s])

  return null
}

export type MapProps = {
  structures: Structure[],
  children?: ReactNode,
  onStructureSelected: (structure: Structure) => void,
  selectedStructure: Structure | undefined,
}

export const Map = ({
  structures,
  children,
  onStructureSelected,
  selectedStructure,
}: MapProps) => {
  const structuresByDepartements = useMemo(() => groupBy(s => s.departement, structures), [structures])

  return (
    <MapContainer
      center={initialCenter}
      zoom={initialZoom}
      minZoom={5}
      maxZoom={17}
      scrollWheelZoom={false}
      style={{
        height: '100%',
        width: '100%',
        margin: 'auto',
        borderRadius: '0.375rem',
        zIndex: 0,
      }}
    >
      <ResetViewControl />
      <GeoJSON
        data={departementsBoundaries}
        style={{
          opacity: 0.5,
          fill: false,
          color: 'currentColor',
          className: 'text-blue-default',
        }}
      />
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
      />
      {Object.entries(structuresByDepartements)
        .map(([departement, structs]) => (
          <MarkerClusterGroup key={departement}>
            {structs.filter(s => s.id !== selectedStructure?.id)
              .map((s) => (
                <Marker
                  key={s.id}
                  position={[s.latLon.lat, s.latLon.lon]}
                  eventHandlers={{ click: () => onStructureSelected(s) }}
                  icon={L.divIcon({
                    className: types[s.type].markerClassname,
                    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" height="22" width="22"><title>${s.nom}</title><rect fill="none" x="0" y="0" width="22" height="22"></rect><path fill="#ff1919" transform="translate(3 3)" d="M7.5,0C5.0676,0,2.2297,1.4865,2.2297,5.2703
\tC2.2297,7.8378,6.2838,13.5135,7.5,15c1.0811-1.4865,5.2703-7.027,5.2703-9.7297C12.7703,1.4865,9.9324,0,7.5,0z" style="stroke-linejoin:round;stroke-miterlimit:4;" stroke="black" stroke-width="2"></path><path fill="currentColor" transform="translate(3 3)" d="M7.5,0C5.0676,0,2.2297,1.4865,2.2297,5.2703
\tC2.2297,7.8378,6.2838,13.5135,7.5,15c1.0811-1.4865,5.2703-7.027,5.2703-9.7297C12.7703,1.4865,9.9324,0,7.5,0z"></path></svg>`,
                  })}
                />
              ))}
          </MarkerClusterGroup>
        ))}
      {selectedStructure && (
        <Marker
          key={selectedStructure.id}
          position={[selectedStructure.latLon.lat, selectedStructure.latLon.lon]}
          eventHandlers={{ click: () => onStructureSelected(selectedStructure) }}
          zIndexOffset={9999}
          icon={L.divIcon({
            className: types[selectedStructure.type].markerClassname,
            html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" height="30" width="30"><title>${selectedStructure.nom}</title><rect fill="none" x="0" y="0" width="22" height="22"></rect><path fill="#ff1919" transform="translate(3 3)" d="M7.5,0C5.0676,0,2.2297,1.4865,2.2297,5.2703
\tC2.2297,7.8378,6.2838,13.5135,7.5,15c1.0811-1.4865,5.2703-7.027,5.2703-9.7297C12.7703,1.4865,9.9324,0,7.5,0z" style="stroke-linejoin:round;stroke-miterlimit:4;" stroke="currentColor" stroke-width="3"></path><path fill="white" transform="translate(3 3)" d="M7.5,0C5.0676,0,2.2297,1.4865,2.2297,5.2703
\tC2.2297,7.8378,6.2838,13.5135,7.5,15c1.0811-1.4865,5.2703-7.027,5.2703-9.7297C12.7703,1.4865,9.9324,0,7.5,0z"></path></svg>`,
          })}
        />
      )}
      <UpdateViewWhenSelectingStructure selectedStructure={selectedStructure} />
      {children}
    </MapContainer>
  )
}
