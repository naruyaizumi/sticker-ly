const Sticker = require('./Sticker')
const extractMetadata = require('./extractMetadata')
const Types = require('./Types')
const StickerMetadata = require('./internal/Metadata/StickerMetadata')
const Exif = require('./internal/Metadata/Exif')
const StickerTypes = require('./internal/Metadata/StickerTypes')

module.exports = {
 ...Sticker,
 ...extractMetadata,
 ...Types,
 StickerMetadata,
 Exif,
 ...StickerTypes,
 default: Sticker.Sticker
}