import { readFile } from 'fs/promises'
import { tmpdir } from 'os'
import { spawn } from 'child_process'

const crop = async (filename) => {
const output = `${tmpdir()}/${Math.random().toString(36)}.webp`

await new Promise((resolve, reject) => {
const ffmpeg = spawn('ffmpeg', [
'-i', filename,
'-vcodec', 'libwebp',
'-vf', `crop=w='min(min(iw\\,ih)\\,500)':h='min(min(iw\\,ih)\\,500)',scale=500:500,setsar=1,fps=15`,
'-loop', '0',
'-preset', 'default',
'-an',
'-vsync', '0',
'-s', '512:512',
output
])

ffmpeg.on('close', (code) => {
if (code === 0) resolve()
else reject(new Error(`FFmpeg exited with code ${code}`))
})
})

return await readFile(output)
}

export default crop