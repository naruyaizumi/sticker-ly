import { randomBytes } from 'crypto'

const Utils = {
generateStickerID: () => randomBytes(32).toString('hex')
}

const defaultBg = {
r: 0,
g: 0,
b: 0,
alpha: 0
}

export {
Utils,
defaultBg
}