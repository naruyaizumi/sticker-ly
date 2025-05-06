# <div align='center'>WA STICKER JS</div>

<div align='center'>

![wa-sticker-js](https://i.supa.codes/Gwl0B2)

</div>

# wa-sticker-js

**wa-sticker-js** adalah versi remake dari [`wa-sticker-formatter`](https://github.com/AlenVelocity/wa-sticker-formatter), ditulis ulang menggunakan JavaScript murni (tanpa TypeScript) untuk meningkatkan kompatibilitas dan kemudahan integrasi pada berbagai proyek WhatsApp bot.

## Fitur Utama

- **Migrasi ke JavaScript Native**  
  Tidak perlu lagi proses build TypeScript, langsung bisa digunakan di runtime Node.js.

- **Perbaikan Audit & Dependency**  
  Semua dependensi telah dibersihkan dari modul usang atau rawan celah keamanan.

- **Ringan dan Efisien**  
  Performa lebih baik pada lingkungan server seperti VPS dan Pterodactyl.

- **Kompatibel Penuh dengan WhatsApp**  
  Mendukung konversi media ke stiker dengan metadata `pack` dan `author`, output webp optimal.

## Catatan

Remake ini bertujuan menjaga fungsionalitas utama dari `wa-sticker-formatter`, namun dengan arsitektur yang lebih praktis, modern, dan bebas dari overhead proses build.

> Dibangun berdasarkan karya asli [`wa-sticker-formatter`](https://github.com/AlenVelocity/wa-sticker-formatter) oleh **Helvio Pedreschi**.

## Instalasi

```javascript
npm install wa-sticker-js
```

## Penggunaan

wa-sticker-js menyediakan dua cara untuk membuat stiker.
Parameter yang digunakan sama untuk keduanya:

1. Parameter pertama adalah Buffer, string SVG, URL, atau path file dari gambar statis, GIF, atau video.  
   Jika menggunakan GIF atau video, hasilnya akan berupa file WebP animasi.

2. Parameter kedua adalah objek opsi. Opsi stiker ini mendukung properti berikut:

• `pack` adalah nama paket stiker.

• `author` adalah nama pembuat stiker.

• `type` adalah nilai dari enum `StickerTypes` (yang diekspor). Bisa berupa `'crop'`, `'full'`, atau undefined (default).

• `categories` adalah kategori stiker. Bisa berupa array emoji, atau undefined (default).

• `quality` adalah kualitas file output. Harus berupa angka dari 0 hingga 100. Default-nya adalah 100.

• `id` adalah ID unik stiker. Jika tidak didefinisikan, maka akan dibuat otomatis.

• `background` adalah warna latar belakang dalam format hexadecimal atau objek RGBA. Default-nya adalah transparan.

## Import

Sebelum menggunakan library ini, kamu perlu mengimpornya terlebih dahulu.

```javascript
import { Sticker, createSticker, StickerTypes } from 'wa-sticker-js' // ES6
// const { Sticker, createSticker, StickerTypes } = require('wa-sticker-js') // CommonJS
```

## Menggunakan Konstruktor `Sticker` (Direkomendasikan)

```javascript
const sticker = new Sticker(image, {
    pack: 'Naruya', // Nama paket stiker
    author: 'Izumi', // Nama pembuat stiker
    type: StickerTypes.FULL, // Tipe stiker
    categories: ['🤩', '🎉'], // Kategori stiker (emoji)
    id: '12345', // ID stiker
    quality: 50, // Kualitas file output (0–100)
    background: '#000000' // Warna latar belakang (hanya untuk stiker full)
})

const buffer = await sticker.toBuffer() // mengubah menjadi Buffer
// atau simpan ke file
await sticker.toFile('sticker.webp')

// atau kirim sebagai objek yang kompatibel dengan Baileys-MD
conn.sendMessage(jid, await sticker.toMessage())
```

Kamu juga bisa menggunakan metode chaining seperti ini:

```javascript
const buffer = await new Sticker(image)
    .setPack('Naruya')
    .setAuthor('Izumi')
    .setType(StickerTypes.FULL)
    .setCategories(['🤩', '🎉'])
    .setId('12345')
    .setBackground('#000000')
    .setQuality(50)
    .toBuffer()
```

Parameter `image` (parameter pertama) bisa berupa `Buffer`, `URL`, string SVG, atau path file lokal.

### Contoh SVG

```javascript
const sticker = new Sticker(`
    <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
        <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 464c-119.1 0-216-96.9-216-216S136.9 40 256 40s216 96.9 216 216-96.9 216-216 216z" fill="#ff0000" />
    </svg>
`, { author: 'W3' })
```

## Menggunakan Fungsi `createSticker`

```javascript
const buffer = await createSticker(buffer, options) // parameter sama seperti konstruktor
// CATATAN: `createSticker` mengembalikan Promise berupa Buffer
```

## Opsi yang Didukung

Berikut adalah opsi konfigurasi yang dapat digunakan:

```javascript
interface IStickerConfig {
    pack?: string // Judul paket stiker
    author?: string // Nama pembuat
    id?: string // ID stiker (unik)
    categories?: Categories[] // Kategori stiker (emoji)
    background?: Sharp.Color // Warna latar belakang (hex atau RGBA)
    type?: StickerTypes | string // Jenis stiker
    quality?: number // Kualitas output (0–100)
}
```

## Jenis Stiker (`StickerTypes`)

Jenis stiker diekspor sebagai enum:

```javascript
enum StickerTypes {
    DEFAULT = 'default',
    CROPPED = 'crop',
    FULL = 'full',
    CIRCLE = 'circle',
    ROUNDED = 'rounded',
    STAR = 'star'
}
```

## Latar Belakang (Background)

Warna latar belakang dapat berupa string warna hexadecimal atau objek warna dalam format `sharp`.

Contoh menggunakan kode warna hex:

```json
{
    "background": "#FFFFFF"
}
```

Atau menggunakan objek RGBA:

```json
{
    "background": {
        "r": 255,
        "g": 255,
        "b": 255,
        "alpha": 1
    }
}
```

## Metadata

Berikut informasi dasar mengenai metadata stiker WhatsApp.

Di dalam WhatsApp, setiap stiker memiliki metadata yang tertanam di dalam file WebP. Metadata ini berisi informasi seperti nama pembuat (`author`), nama paket (`pack`), dan kategori stiker (emoji).

Metadata ini dibaca langsung oleh aplikasi WhatsApp untuk menampilkan informasi paket stiker yang digunakan oleh pengguna.

### 1. Nama Pembuat (Author) dan Judul Paket (Pack Title)

![metadata](https://i.supa.codes/7-OOYk)

Teks yang dicetak tebal merupakan **judul paket** stiker, sedangkan sisanya adalah **nama pembuat** stiker.

Informasi ini sebenarnya merupakan [Metadata Exif](https://id.wikipedia.org/wiki/Exchangeable_image_file_format) yang disematkan ke dalam file WebP.

### 2. Kategori Stiker (Sticker Category)

Kategori stiker merupakan array dari emoji.  
Pelajari lebih lanjut: [WhatsApp Sticker Categories](https://github.com/WhatsApp/stickers/wiki/Tag-your-stickers-with-Emojis)

### Ekstraksi Metadata

Untuk mengekstrak metadata dari file WebP, kamu bisa menggunakan fungsi `extractMetadata()`.

```javascript
import { extractMetadata, Sticker } from 'wa-sticker-js'
import { readFileSync } from 'fs'

const sticker = readFileSync('sticker.webp')

let metadata = await extractMetadata(sticker)
// Hasilnya:
// {
//   emojis: [],
//   'sticker-pack-id': '',
//   'sticker-pack-name': '',
//   'sticker-author-name': ''
// }

// Atau menggunakan metode statis dari class Sticker
metadata = await Sticker.extractMetadata(sticker)
```

Terima kasih telah menggunakan **wa-sticker-js**!