/**
 * Calculate Qibla direction from a given location.
 * Ka'bah coordinates: 21.42251° N, 39.82616° E
 * Uses the standard spherical bearing (great-circle) formula.
 */
const KAABAH_LAT = 21.42251
const KAABAH_LNG = 39.82616

export function calculateQiblaDirection(lat, lng) {
  const φ1 = toRad(lat)
  const φ2 = toRad(KAABAH_LAT)
  const Δλ = toRad(KAABAH_LNG - lng)

  const x = Math.cos(φ2) * Math.sin(Δλ)
  const y = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ)

  let bearing = Math.atan2(x, y)
  bearing = toDeg(bearing)
  bearing = (bearing + 360) % 360

  return bearing
}

export function calculateDistanceToKaabah(lat, lng) {
  const R = 6371 // Earth radius in km
  const dLat = toRad(KAABAH_LAT - lat)
  const dLng = toRad(KAABAH_LNG - lng)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat)) * Math.cos(toRad(KAABAH_LAT)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round(R * c)
}

function toRad(deg) {
  return (deg * Math.PI) / 180
}

function toDeg(rad) {
  return (rad * 180) / Math.PI
}
