const { Sticker } = require('../src')

;(async () => {
 console.log('\n---\n')
 console.log('Full example')
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

 const type = 'full'
 const whiteBg = { r: 255, g: 255, b: 255, alpha: 1 }

 const getOptions = (pack = '', author = '') => ({
  pack,
  type,
  author: `${author}-${type}`
 })

 const tasks = [
  { label: 'Static Potrait', src: images.static.potrait, pack: 'static', author: 'potrait' },
  { label: 'Static Landscape', src: images.static.landscape, pack: 'static', author: 'landscape' },
  { label: 'Animated Potrait', src: images.animated.potrait, pack: 'animated', author: 'potrait' },
  { label: 'Animated Landscape', src: images.animated.landscape, pack: 'animated', author: 'landscape' },
  { label: 'Static Landscape with background', src: images.static.landscape, pack: 'static', author: 'landscape-bg', background: whiteBg },
  { label: 'Static Potrait with background', src: images.static.potrait, pack: 'static', author: 'potrait-bg', background: whiteBg },
  { label: 'Animated Landscape with background', src: images.animated.landscape, pack: 'animated', author: 'landscape-bg', background: whiteBg },
  { label: 'Animated Potrait with background', src: images.animated.potrait, pack: 'animated', author: 'potrait-bg', background: whiteBg }
 ]

 for (const task of tasks) {
  console.log(task.label)
  const sticker = new Sticker(task.src, getOptions(task.pack, task.author))
  if (task.background) sticker.setBackground(task.background)
  await sticker.toFile()
  console.log(`Saved to ${sticker.defaultFilename}\n`)
 }

 console.log('---\n')
})()