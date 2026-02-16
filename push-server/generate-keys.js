const wp = require('web-push')
const fs = require('fs')
const path = require('path')

const keys = wp.generateVAPIDKeys()

console.log('=== VAPID Keys Generated ===')
console.log('PUBLIC_KEY:', keys.publicKey)
console.log('PRIVATE_KEY:', keys.privateKey)
console.log('============================')

// Save to file for reference
fs.writeFileSync(path.join(__dirname, 'vapid-keys.json'), JSON.stringify(keys, null, 2))
console.log('Keys saved to vapid-keys.json')

// Clear old subscriptions (they were created with old keys)
fs.writeFileSync(path.join(__dirname, 'subscriptions.json'), '[]')
console.log('Subscriptions cleared (old keys invalid)')
