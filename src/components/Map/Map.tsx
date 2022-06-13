import 'leaflet/dist/leaflet.css'

import { GeoJSON, MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import L, { LatLngTuple } from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { ReactNode, useEffect, useMemo } from 'react'
import { groupBy } from 'ramda'
import { Structure } from '../../types/models'
import { departmentsBoundaries } from './departements-auvergne-rhone-alpes'
import { MarkerClusterGroup } from './Cluster'
import { ResetViewControl } from './ResetViewControl'

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
        height: '70vh',
        width: '100%',
        margin: 'auto',
        borderRadius: '0.375rem',
      }}
    >
      <ResetViewControl />
      <GeoJSON
        data={departmentsBoundaries}
        style={feature => ({
          opacity: 0.5,
          fillOpacity: 0.2,
          color: 'currentColor',
          className: feature?.properties.className,
        })}
      />
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
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
                  icon={unSelectedIcon}
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
