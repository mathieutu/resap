import axios from 'axios'
import { Adresse } from '../types/models'

export type Property = {
  label: string,
  score: number,
  housenumber: string,
  id: string,
  name: string,
  postcode: string,
  citycode: string,
  x: number,
  y: number,
  city: string,
  district: string,
  context: string,
  type: string,
  importance: number,
  street: string,
  distance: number,
}

export const findAdressFromCoordinates = async (lat:number, lon:number): Promise<Adresse> => {
  const { data } = await axios.get('https://api-adresse.data.gouv.fr/reverse/', { params: { lat, lon } })
  const properties = data.features[0]?.properties

  if (!properties) {
    return {
      lat,
      lon,
    }
  }

  return {
    housenumber: properties.housenumber,
    postcode: properties.postcode,
    city: properties.city,
    street: properties.street,
    lat: properties.x,
    lon: properties.y,
  }
}
