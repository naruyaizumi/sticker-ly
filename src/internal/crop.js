const Ffmpeg = require('fluent-ffmpeg')
const { readFile } = require('fs-extra')
const { tmpdir } = require('os')

const crop = async (filename) => {
 const file = await new Promise((resolve) => {
  const name = `${tmpdir()}/${Math.random().toString(36)}.webp`
  Ffmpeg(filename)
   .outputOptions([
    '-vcodec',
    'libwebp',
    '-vf',
    `crop=w='min(min(iw\\,ih)\\,500)':h='min(min(iw\\,ih)\\,500)',scale=500:500,setsar=1,fps=15`,
    '-loop',
    '0',
    '-preset',
    'default',
    '-an',
    '-vsync',
    '0',
    '-s',
    '512:512'
   ])
   .save(name)
   .on('end', () => resolve(name))
 })
 return await readFile(file)
}

module.exports = crop