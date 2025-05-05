const Ffmpeg = require('fluent-ffmpeg')
const { readFile } = require('fs-extra')
const { tmpdir } = require('os')

const imagesToWebp = async (filename) => {
 const file = await new Promise((resolve) => {
  const name = `${tmpdir()}/${Math.random().toString(36)}.webp`
  Ffmpeg(filename)
   .outputOption('-lavfi split[v],palettegen,[v]paletteuse')
   .outputOption('-vcodec libwebp')
   .outputFPS(10)
   .loop(0)
   .save(name)
   .on('end', () => resolve(name))
 })
 return await readFile(file)
}

module.exports = imagesToWebp