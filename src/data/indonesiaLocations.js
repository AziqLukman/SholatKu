/**
 * Indonesia Location Resolver for Equran.id API
 * Maps Nominatim reverse-geocoding address data to provinsi/kabkota names
 * compatible with equran.id jadwal shalat API.
 */

const CACHE_KEY_PROVINSI = 'sholatku-equran-provinsi'
const CACHE_KEY_KABKOTA = 'sholatku-equran-kabkota'
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000 // 7 days

// Mapping from Nominatim state names → equran.id provinsi names
// Nominatim sometimes returns different names than equran.id
const PROVINSI_ALIAS = {
  'daerah khusus ibukota jakarta': 'DKI Jakarta',
  'dki jakarta': 'DKI Jakarta',
  'jakarta': 'DKI Jakarta',
  'daerah istimewa yogyakarta': 'D.I. Yogyakarta',
  'di yogyakarta': 'D.I. Yogyakarta',
  'yogyakarta': 'D.I. Yogyakarta',
  'nanggroe aceh darussalam': 'Aceh',
  'aceh': 'Aceh',
  'sumatera utara': 'Sumatera Utara',
  'sumatra utara': 'Sumatera Utara',
  'sumatera barat': 'Sumatera Barat',
  'sumatra barat': 'Sumatera Barat',
  'sumatera selatan': 'Sumatera Selatan',
  'sumatra selatan': 'Sumatera Selatan',
  'jawa barat': 'Jawa Barat',
  'jawa tengah': 'Jawa Tengah',
  'jawa timur': 'Jawa Timur',
  'kalimantan barat': 'Kalimantan Barat',
  'kalimantan tengah': 'Kalimantan Tengah',
  'kalimantan selatan': 'Kalimantan Selatan',
  'kalimantan timur': 'Kalimantan Timur',
  'kalimantan utara': 'Kalimantan Utara',
  'sulawesi utara': 'Sulawesi Utara',
  'sulawesi tengah': 'Sulawesi Tengah',
  'sulawesi selatan': 'Sulawesi Selatan',
  'sulawesi tenggara': 'Sulawesi Tenggara',
  'sulawesi barat': 'Sulawesi Barat',
  'gorontalo': 'Gorontalo',
  'maluku': 'Maluku',
  'maluku utara': 'Maluku Utara',
  'nusa tenggara barat': 'Nusa Tenggara Barat',
  'nusa tenggara timur': 'Nusa Tenggara Timur',
  'papua': 'Papua',
  'papua barat': 'Papua Barat',
  'papua barat daya': 'Papua Barat Daya',
  'papua tengah': 'Papua Tengah',
  'papua pegunungan': 'Papua Pegunungan',
  'papua selatan': 'Papua Selatan',
  'riau': 'Riau',
  'kepulauan riau': 'Kepulauan Riau',
  'jambi': 'Jambi',
  'bengkulu': 'Bengkulu',
  'lampung': 'Lampung',
  'kepulauan bangka belitung': 'Kepulauan Bangka Belitung',
  'bangka belitung': 'Kepulauan Bangka Belitung',
  'banten': 'Banten',
  'bali': 'Bali',
}

/**
 * Fetch daftar provinsi dari equran.id (cached)
 */
async function fetchProvinsiList() {
  const cached = localStorage.getItem(CACHE_KEY_PROVINSI)
  if (cached) {
    const parsed = JSON.parse(cached)
    if (Date.now() - parsed.timestamp < CACHE_TTL) {
      return parsed.data
    }
  }

  try {
    const res = await fetch('https://equran.id/api/v2/shalat/provinsi')
    const json = await res.json()
    if (json.code === 200 && json.data) {
      localStorage.setItem(CACHE_KEY_PROVINSI, JSON.stringify({
        data: json.data,
        timestamp: Date.now()
      }))
      return json.data
    }
  } catch (err) {
    console.error('[SholatKu] Failed to fetch provinsi list:', err)
  }
  return null
}

/**
 * Fetch daftar kabupaten/kota dari equran.id (cached per provinsi)
 */
async function fetchKabkotaList(provinsi) {
  const cacheKey = `${CACHE_KEY_KABKOTA}-${provinsi}`
  const cached = localStorage.getItem(cacheKey)
  if (cached) {
    const parsed = JSON.parse(cached)
    if (Date.now() - parsed.timestamp < CACHE_TTL) {
      return parsed.data
    }
  }

  try {
    const res = await fetch('https://equran.id/api/v2/shalat/kabkota', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provinsi })
    })
    const json = await res.json()
    if (json.code === 200 && json.data) {
      localStorage.setItem(cacheKey, JSON.stringify({
        data: json.data,
        timestamp: Date.now()
      }))
      return json.data
    }
  } catch (err) {
    console.error('[SholatKu] Failed to fetch kabkota list:', err)
  }
  return null
}

/**
 * Normalize string for fuzzy matching
 */
function normalize(str) {
  return str.toLowerCase()
    .replace(/^(kab\.|kabupaten|kota)\s*/i, '')
    .replace(/[^a-z\s]/g, '')
    .trim()
}

/**
 * Find best match from a list using fuzzy matching
 */
function findBestMatch(target, candidates) {
  if (!target || !candidates?.length) return null

  const normalizedTarget = normalize(target)

  // 1. Exact match (normalized)
  for (const c of candidates) {
    if (normalize(c) === normalizedTarget) return c
  }

  // 2. Starts-with match
  for (const c of candidates) {
    if (normalize(c).startsWith(normalizedTarget) || normalizedTarget.startsWith(normalize(c))) return c
  }

  // 3. Contains match
  for (const c of candidates) {
    if (normalize(c).includes(normalizedTarget) || normalizedTarget.includes(normalize(c))) return c
  }

  return null
}

/**
 * Resolve Nominatim address to equran.id provinsi & kabkota
 * @param {Object} address - Nominatim address object
 * @returns {Object|null} { provinsi, kabkota } or null if not in Indonesia
 */
export async function resolveIndonesiaLocation(address) {
  if (!address) return null

  // Check if in Indonesia
  const country = (address.country || '').toLowerCase()
  const countryCode = (address.country_code || '').toLowerCase()
  if (countryCode !== 'id' && !country.includes('indonesia')) {
    return null
  }

  const state = address.state || ''
  if (!state) return null

  // 1. Resolve provinsi
  const stateKey = state.toLowerCase().trim()
  let resolvedProvinsi = PROVINSI_ALIAS[stateKey] || null

  if (!resolvedProvinsi) {
    // Try fetching from API and fuzzy match
    const provinsiList = await fetchProvinsiList()
    if (provinsiList) {
      resolvedProvinsi = findBestMatch(state, provinsiList)
    }
  }

  if (!resolvedProvinsi) {
    console.warn('[SholatKu] Could not resolve provinsi:', state)
    return null
  }

  // 2. Resolve kabkota
  const kabkotaList = await fetchKabkotaList(resolvedProvinsi)
  if (!kabkotaList) return null

  // Try multiple address fields
  const cityName = address.city || address.town || address.municipality || address.county || address.city_district || ''

  let resolvedKabkota = null

  // Try direct match first
  resolvedKabkota = findBestMatch(cityName, kabkotaList)

  // If not found, try with "Kota" prefix
  if (!resolvedKabkota && cityName) {
    resolvedKabkota = findBestMatch(`Kota ${cityName}`, kabkotaList)
  }

  // If not found, try with "Kab." prefix
  if (!resolvedKabkota && cityName) {
    resolvedKabkota = findBestMatch(`Kab. ${cityName}`, kabkotaList)
  }

  // If still not found but in DKI Jakarta, default to "Kota Jakarta"
  if (!resolvedKabkota && resolvedProvinsi === 'DKI Jakarta') {
    resolvedKabkota = kabkotaList.find(k => k.toLowerCase().includes('jakarta')) || kabkotaList[0]
  }

  // Last resort: use first kabkota in list (capital city)
  if (!resolvedKabkota) {
    console.warn('[SholatKu] Could not resolve kabkota for:', cityName, 'in', resolvedProvinsi, '. Using first available.')
    resolvedKabkota = kabkotaList[0]
  }

  console.log('[SholatKu] Resolved location:', resolvedProvinsi, '→', resolvedKabkota)
  return { provinsi: resolvedProvinsi, kabkota: resolvedKabkota }
}

/**
 * Fetch jadwal sholat bulanan dari equran.id
 * @returns {Array|null} Array of daily schedules or null on failure
 */
export async function fetchEquranSchedule(provinsi, kabkota, bulan, tahun) {
  try {
    const res = await fetch('https://equran.id/api/v2/shalat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provinsi, kabkota, bulan, tahun })
    })
    const json = await res.json()
    if (json.code === 200 && json.data?.jadwal) {
      return json.data.jadwal
    }
  } catch (err) {
    console.error('[SholatKu] Failed to fetch equran schedule:', err)
  }
  return null
}
