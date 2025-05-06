;(async () => {
try {
await import('./default.js')
await import('./crop.js')
await import('./full.js')
await import('./circle.js')
await import('./rounded.js')
await import('./star.js')
} catch (err) {
console.error(err)
}
})()