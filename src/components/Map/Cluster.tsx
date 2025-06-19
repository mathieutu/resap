import { createPathComponent } from '@react-leaflet/core'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import L from 'leaflet'

export const MarkerClusterGroup = createPathComponent(
  (_props, ctx) => {
    const markerClusterGroup = L.markerClusterGroup({
      showCoverageOnHover: false,
      chunkedLoading: true,
      spiderfyOnMaxZoom: false,
      disableClusteringAtZoom: 12,
      maxClusterRadius: (zoom: number) => {
        if (zoom < 8) return 10000

        if (zoom < 10) return 80

        return 20
      },
    })

    return {
      instance: markerClusterGroup,
      context: {
        ...ctx,
        layerContainer: markerClusterGroup,
      },
    }
  },
)
