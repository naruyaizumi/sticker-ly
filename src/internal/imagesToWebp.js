import { readFile } from 'fs/promises'
import { tmpdir } from 'os'
import { spawn } from 'child_process'

const imagesToWebp = async (filename) => {
const output = `${tmpdir()}/${Math.random().toString(36)}.webp`

await new Promise((resolve, reject) => {
const ffmpeg = spawn('ffmpeg', [
'-i', filename,
'-lavfi', 'split[v],palettegen,[v]paletteuse',
'-vcodec', 'libwebp',
'-r', '10',
'-loop', '0',
output
])

ffmpeg.on('close', (code) => {
if (code === 0) resolve()
else reject(new Error(`FFmpeg exited with code ${code}`))
})
})

return await readFile(output)
}

export default imagesToWebp