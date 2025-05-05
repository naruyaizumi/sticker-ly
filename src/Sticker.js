const { existsSync, readFile, writeFile } = require('fs-extra')
const axios = require('axios')
const { Utils, defaultBg } = require('./Utils')
const { fromBuffer } = require('file-type')
const convert = require('./internal/convert')
const Exif = require('./internal/Metadata/Exif')
const { StickerTypes } = require('./internal/Metadata/StickerTypes')
const { extractMetadata } = require('.')

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
   : axios.get(this.data, { responseType: 'arraybuffer' }).then(({ data }) => data)

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

const createSticker = async (...args) => {
 return new Sticker(...args).build()
}

module.exports = {
 Sticker,
 createSticker
}