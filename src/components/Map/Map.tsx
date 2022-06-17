import 'leaflet/dist/leaflet.css'

import { GeoJSON, MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import L, { LatLngTuple } from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { ReactNode, useEffect, useMemo } from 'react'
import { groupBy } from 'ramda'
import { Structure } from '../../types/models'
import { departementsBoundaries } from './departements'
import { MarkerClusterGroup } from './Cluster'
import { ResetViewControl } from './ResetViewControl'
import { types } from '../../data/structures_types'

const unSelectedIcon = new L.Icon({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const selectedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: markerShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const initialCenter: LatLngTuple = [45.40, 4.66]
const initialZoom = 7

const UpdateViewWhenSelectingStructure = ({ selectedStructure: s }: { selectedStructure: Structure | undefined }) => {
  const map = useMap()
  useEffect(() => {
    if (s) {
      map.flyTo([s.latLon.lat, s.latLon.lon])
    } else {
      map.flyTo(initialCenter, initialZoom)
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
      maxZoom={20}
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
                  icon={L.divIcon({ className: types[s.type]?.markerClassname, html: `<svg viewBox="0 0 15 15" height="15" width="15">
<rect fill="none" x="0" y="0" width="15" height="15"></rect><path fill="currentColor" transform="translate(0 0)" d="M7.5,0C5.0676,0,2.2297,1.4865,2.2297,5.2703
\tC2.2297,7.8378,6.2838,13.5135,7.5,15c1.0811-1.4865,5.2703-7.027,5.2703-9.7297C12.7703,1.4865,9.9324,0,7.5,0z"></path></svg>` })}
                />
              ))}
          </MarkerClusterGroup>
        ))}
      {selectedStructure && (
        <Marker
          key={selectedStructure.id}
          position={[selectedStructure.latLon.lat, selectedStructure.latLon.lon]}
          eventHandlers={{ click: () => onStructureSelected(selectedStructure) }}
          icon={selectedIcon}
        />
      )}
      <UpdateViewWhenSelectingStructure selectedStructure={selectedStructure} />
      {children}
    </MapContainer>
  )
}
