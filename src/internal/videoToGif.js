const ffmpeg = require('fluent-ffmpeg')
const { writeFile, readFile, unlink } = require('fs-extra')
const { tmpdir } = require('os')

const videoToGif = async (data) => {
 const filename = `${tmpdir()}/${Math.random().toString(36)}`
 const [video, gif] = ['video', 'gif'].map((ext) => `${filename}.${ext}`)
 await writeFile(video, data)
 await new Promise((resolve) => {
  ffmpeg(video).save(gif).on('end', resolve)
 })
 const buffer = await readFile(gif)
 ;[video, gif].forEach((file) => unlink(file))
 return buffer
}

module.exports = videoToGif