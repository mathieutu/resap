import { useMapEvent, useMapEvents } from 'react-leaflet'
import { useEffect, useRef, useState } from 'react'
import { FeatureGroup, Marker } from 'leaflet'
import { useGeoSearch } from '../../services/algolia.browser'
import { usePrevious } from '../../utils/hooks'

const PADDING = 0.05

export const GeoSearch = () => {
  const { refine, items } = useGeoSearch()
  const oldItems = usePrevious(items)
  const autoMove = useRef(false)

  const map = useMapEvents({
    moveend() {
      autoMove.current = false
      const bounds = map.getBounds().pad(-PADDING)

      refine({
        northEast: bounds.getNorthEast(),
        southWest: bounds.getSouthWest(),
      })
    },
  })

  // useEffect(() => {
  //   if (autoMove.current && items.length !== oldItems.length) {
  //     const markers = items.map(({ _geoloc }) => new Marker(_geoloc))
  //     const bounds = new FeatureGroup(markers).getBounds().pad(PADDING)
  //
  //     map.fitBounds(bounds)
  //   }
  //
  //   autoMove.current = true
  // }, [items])

  return null
}
