/**
 * Platform helper — deteksi apakah app berjalan di Capacitor (native) atau browser
 */
export function isNativePlatform() {
  return window.Capacitor?.isNativePlatform?.() ?? false
}

export function getPlatform() {
  if (isNativePlatform()) {
    return window.Capacitor.getPlatform() // 'android' | 'ios'
  }
  return 'web'
}
