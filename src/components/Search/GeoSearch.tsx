import { LatLng, LatLngBounds } from 'leaflet'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Configure } from 'react-instantsearch-core'
import { useMapEvents } from 'react-leaflet'

const PADDING = 0.05

const getBoundsFromFilters = (filters: string) => {
  const float = '[+-]?(?=\\.\\d|\\d)(?:\\d+)?(?:\\.?\\d*)'
  // eslint-disable-next-line regexp/no-super-linear-backtracking, regexp/no-trivially-nested-quantifier, regexp/no-useless-non-capturing-group
  const regexp = new RegExp(`^_geoloc\\.lat < (${float}) AND _geoloc\\.lat > (${float}) AND _geoloc\\.lng > (${float}) AND _geoloc\\.lng < (${float})$`)

  const matches = filters.match(regexp)

  if (!matches) return null

  const [, northLat, southLat, westLng, eastLng] = matches

  return new LatLngBounds(
    new LatLng(Number(southLat), Number(westLng)),
    new LatLng(Number(northLat), Number(eastLng)),
  )
}

const getFiltersFromBounds = (bounds: LatLngBounds) => (
  `_geoloc.lat < ${bounds.getNorth()}`
  + ` AND _geoloc.lat > ${bounds.getSouth()}`
  + ` AND _geoloc.lng > ${bounds.getWest()}`
  + ` AND _geoloc.lng < ${bounds.getEast()}`
)

export const GeoSearch = () => {
  const [bounds, setBounds] = useState<LatLngBounds>()
  const searchParams = useSearchParams()!

  const map = useMapEvents({
    moveend() {
      setBounds(map.getBounds()
        .pad(-PADDING))
    },
  })

  useEffect(() => {
    const filters = searchParams.get('configure[filters]')
    if (typeof filters === 'string') {
      const computedBounds = getBoundsFromFilters(filters)

      if (computedBounds) {
        map.fitBounds(computedBounds)
      }
    }
  }, [map, searchParams])

  if (!bounds) return null

  return (
    <Configure
      aroundLatLngViaIP
      filters={getFiltersFromBounds(bounds)}
    />
  )
}
