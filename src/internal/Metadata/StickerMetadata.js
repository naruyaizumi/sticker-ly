const { Utils } = require('../../Utils')

class StickerMetadata {
 constructor(pack = '', author = '', categories = [], id = Utils.generateStickerID()) {
  this.pack = pack
  this.author = author
  this.categories = categories
  this.id = id
  this.crop = false
  this.full = false
 }

 static from(object = {}) {
  return new StickerMetadata(object.pack, object.author, object.categories, object.id)
 }

 setPack(title) {
  this.pack = title
  return this
 }

 setAuthor(author) {
  this.author = author
  return this
 }

 setId(id) {
  this.id = id
  return this
 }

 setCrop(value) {
  this.crop = value
  this.full = !value
  return this
 }

 setFull(value) {
  this.crop = !value
  this.full = value
  return this
 }

 setCategories(categories) {
  this.categories = typeof categories === 'string'
   ? categories.split(',').map((emoji) => emoji.trim())
   : categories
  return this
 }

 toJSON() {
  const obj = {}
  Object.keys(this)
   .filter((key) => typeof this[key] !== 'function')
   .forEach((key) => (obj[key] = this[key]))
  return obj
 }
}

module.exports = StickerMetadata