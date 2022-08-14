/* eslint-disable no-underscore-dangle */
import { createControlComponent } from '@react-leaflet/core'
import type { LatLng, Map } from 'leaflet'
import { Control, DomEvent, DomUtil, Util } from 'leaflet'

const ResetViewControlFactory = Control.extend({
  onAdd(map: Map) {
    Util.setOptions(this, {
      zoom: map.getZoom(),
      center: map.getCenter(),
    })

    const container = DomUtil.create('div', 'leaflet-bar')
    const link = DomUtil.create('a', '', container)

    link.setAttribute('style', 'display: flex; justify-content: center; align-items: center;')
    link.setAttribute('role', 'button')

    link.title = 'Réinitialiser la vue'
    link.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>`
    DomEvent.on(link, 'mousedown dblclick', DomEvent.stopPropagation)
      .on(link, 'click', DomEvent.stop)
      .on(link, 'click', this._resetView, this)

    return container
  },

  _resetView(this: {
    options: { zoom: number, center: LatLng },
    _map: Map,
  }) {
    const { center, zoom } = this.options
    return this._map.setView(center, zoom)
  },
})

export const ResetViewControl = createControlComponent(() => new ResetViewControlFactory())
