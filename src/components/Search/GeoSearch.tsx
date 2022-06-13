import { useMapEvents } from 'react-leaflet'
import { useRef } from 'react'
import { useGeoSearch } from '../../services/algolia.browser'

const PADDING = 0.05

export const GeoSearch = () => {
  const {
    refine,
  } = useGeoSearch()
  const autoMove = useRef(false)

  const map = useMapEvents({
    moveend() {
      autoMove.current = false
      const bounds = map.getBounds()
        .pad(-PADDING)

      refine({
        northEast: bounds.getNorthEast(),
        southWest: bounds.getSouthWest(),
      })
    },
  })

  return null
}
