# image-file

**image-file** is an image metadata parser that can be run on both Node.js and browsers.

Currently the following image types are supported:

* PNG
* JPEG (JFIF/Exif)

## Usage

```js
var ImageFile = require('image-file')
var arrayBuffer = getArrayBufferFromFileReaderOrAnything()
var image = new ImageFile(arrayBuffer)
console.log(image)
// {
//   data: { dataView: {}, buffer: {}, position: 0 },
//   width: 240,
//   height: 88,
//   ppi: 144
// }
```

If you use `image-file` in browser environment with Browserify or something,
you need to add `babel` to your application dependencies
and `require('babel/polyfill')` before `require`ing `image-file`.

## Development

Run `npm run` for the available development tasks.
