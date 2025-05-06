import { writeFile, readFile, unlink } from 'fs/promises'
import { tmpdir } from 'os'
import { spawn } from 'child_process'

const videoToGif = async (data) => {
const filename = `${tmpdir()}/${Math.random().toString(36)}`
const [video, gif] = ['video', 'gif'].map(ext => `${filename}.${ext}`)

await writeFile(video, data)

await new Promise((resolve, reject) => {
const ffmpeg = spawn('ffmpeg', ['-i', video, '-f', 'gif', gif])
ffmpeg.on('close', (code) => {
if (code === 0) resolve()
else reject(new Error(`FFmpeg exited with code ${code}`))
})
})

const buffer = await readFile(gif)
await Promise.all([unlink(video), unlink(gif)])
return buffer
}

export default videoToGif