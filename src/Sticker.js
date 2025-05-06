import { existsSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'
import { Utils, defaultBg } from './Utils.js'
import { fromBuffer } from 'file-type'
import convert from './internal/convert.js'
import Exif from './internal/Metadata/Exif.js'
import { StickerTypes } from './internal/Metadata/StickerTypes.js'
import { extractMetadata } from './index.js'

class Sticker {
constructor(data, metadata = {}) {
this.data = data
this.metadata = metadata
this.metadata.author = this.metadata.author || ''
this.metadata.pack = this.metadata.pack || ''
this.metadata.id = this.metadata.id || Utils.generateStickerID()
this.metadata.quality = this.metadata.quality || 100
this.metadata.type = Object.values(StickerTypes).includes(this.metadata.type)
? this.metadata.type
: StickerTypes.DEFAULT
this.metadata.background = this.metadata.background || defaultBg
}

_parse = async () =>
Buffer.isBuffer(this.data)
? this.data
: this.data.trim().startsWith('<svg')
? Buffer.from(this.data)
: existsSync(this.data)
? readFile(this.data)
: fetch(this.data).then(async (res) => {
if (!res.ok) throw new Error('Failed to fetch data')
return Buffer.from(await res.arrayBuffer())
})

_getMimeType = async (data) => {
const type = await fromBuffer(data)
if (!type) {
if (typeof this.data === 'string') return 'image/svg+xml'
throw new Error('Invalid file type')
}
return type.mime
}

build = async () => {
const data = await this._parse()
const mime = await this._getMimeType(data)
return new Exif(this.metadata).add(await convert(data, mime, this.metadata))
}

toBuffer = this.build

get defaultFilename() {
return `./${this.metadata.pack}-${this.metadata.author}.webp`
}

toFile = async (filename = this.defaultFilename) => {
await writeFile(filename, await this.build())
return filename
}

setPack = (pack) => {
this.metadata.pack = pack
return this
}

setAuthor = (author) => {
this.metadata.author = author
return this
}

setID = (id) => {
this.metadata.id = id
return this
}

setCategories = (categories) => {
this.metadata.categories = categories
return this
}

setType = (type) => {
this.metadata.type = type
return this
}

setQuality = (quality) => {
this.metadata.quality = quality
return this
}

setBackground = (background) => {
this.metadata.background = background
return this
}

get = this.build

toMessage = async () => ({ sticker: await this.build() })

static extractMetadata = extractMetadata
}

export const createSticker = async (...args) => {
return new Sticker(...args).build()
}

export {
Sticker
}