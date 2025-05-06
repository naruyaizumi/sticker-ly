import { Sticker } from '../src/index.js'

;(async () => {
console.log('\n---\n')
console.log('Crop example')
console.log('---\n')

const images = {
static: {
potrait: 'https://i.pinimg.com/originals/3a/53/d6/3a53d68345b56241a875595b21ec2a59.jpg',
landscape: 'https://chasinganime.com/wp-content/uploads/2021/02/0_YgtEypuJ2QfMPCbn.jpg'
},
animated: {
potrait: 'https://c.tenor.com/-1mtmQgH5eYAAAAC/watson-amelia-vtuber.gif',
landscape: 'https://c.tenor.com/2RdLoyV5VPsAAAAC/ayame-nakiri.gif'
}
}

const type = 'crop'
const getOptions = (pack = '', author = '') => ({
pack,
type,
author: `${author}-${type}`,
quality: 10
})

const tasks = [
{ label: 'Static Potrait', src: images.static.potrait, pack: 'static', author: 'potrait' },
{ label: 'Static Landscape', src: images.static.landscape, pack: 'static', author: 'landscape' },
{ label: 'Animated Potrait', src: images.animated.potrait, pack: 'animated', author: 'potrait' },
{ label: 'Animated Landscape', src: images.animated.landscape, pack: 'animated', author: 'landscape' }
]

for (const task of tasks) {
console.log(task.label)
const sticker = new Sticker(task.src, getOptions(task.pack, task.author))
await sticker.toFile()
console.log(`Saved to ${sticker.defaultFilename}\n`)
}

console.log('---\n')
})()