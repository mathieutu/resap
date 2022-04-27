import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { SearchIcon } from '@heroicons/react/solid'
import { departmentsBoundaries } from './departements-auvergne-rhone-alpes'
import { SearchInput } from '../Search/SearchInput'
import { SearchContext } from '../Search/SearchContext'

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
})

const StructureListItem = () => (
  <div className="shadow-md p-5 my-1 rounded-md">
    <p className="font-bold my-1">MyDigitalSchool Lyon</p>
    <p className="text-sm my-1">MyDigitalSchool</p>
    <p className="inline-block bg-green-default text-center w-fit p-1 rounded-md text-xs my-1">Formation</p>
    <p className="my-1">26 Rue de la Villette, 69003, Lyon</p>
  </div>
)

export const Map = () => (
  <div className="flex flex-col bg-white drop-shadow-md rounded-md p-5 w-10/12 m-auto my-5">
    <div className="bg-white mb-4">
      <SearchContext>
        <div className="mt-1 relative rounded-md shadow-sm w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5  text-grey-default " aria-hidden="true" />
          </div>
          <SearchInput
            className="block w-full pl-10 py-3 text-base rounded-md placeholder-grey-default shadow-sm focus:ring-blue-default focus:border-blue-default sm:flex-1 border-gray-default"
            label="Recherchez parmi nos structures..."
          />
        </div>
      </SearchContext>
    </div>
    <div className="block md:flex md:flex-row gap-3">
      <div className="w-full md:w-8/12">
        <MapContainer center={[45.40, 4.66]} zoom={7} minZoom={5} scrollWheelZoom={false} style={{ height: '70vh', width: '100%', margin: 'auto', borderRadius: '0.375rem' }}>
          <GeoJSON data={departmentsBoundaries} style={feature => ({ color: feature?.properties.color ?? 'blue' })} />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[45.73, 4.82]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="w-full md:w-4/12 p-1 overflow-y-auto h-[70vh]">
        <StructureListItem />
        <StructureListItem />
        <StructureListItem />
        <StructureListItem />
        <StructureListItem />
        <StructureListItem />
        <StructureListItem />
        <StructureListItem />
        <StructureListItem />
        <StructureListItem />
        <StructureListItem />
        <StructureListItem />
      </div>
    </div>
  </div>
)
