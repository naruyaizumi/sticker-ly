const { Image } = require('node-webpmux')

const extractMetadata = async (image) => {
 const img = new Image()
 await img.load(image)
 const exif = img.exif?.toString('utf-8') ?? '{}'
 return JSON.parse(exif.substring(exif.indexOf('{'), exif.lastIndexOf('}') + 1) ?? '{}')
}

module.exports = {
 extractMetadata
}