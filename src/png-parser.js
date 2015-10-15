const PNG_SIGNATURE = [137, 80, 78, 71, 13, 10, 26, 10]
const INCH_TO_METRE_RATIO = 0.0254

export default class PNGParser {
  static isPNG(progressiveDataView) {
    // http://www.w3.org/TR/2003/REC-PNG-20031110/#5PNG-file-signature
    return progressiveDataView.getBytes(0, PNG_SIGNATURE.length).join() === PNG_SIGNATURE.join()
  }

  static parse(progressiveDataView) {
    let parser = new PNGParser(progressiveDataView)
    return parser.parse()
  }

  constructor(progressiveDataView) {
    this.data = progressiveDataView
    this.metadata = {}
  }

  parse() {
    this.eachChunk((chunk) => {
      let handler = this['on' + chunk.type]
      if (handler) {
        handler.call(this, chunk)
      }
    })

    return this.metadata
  }

  eachChunk(callback) {
    this.data.advance(PNG_SIGNATURE.length)

    while (true) {
      // http://www.w3.org/TR/2003/REC-PNG-20031110/#5Chunk-layout
      let chunk = {}
      chunk.length = this.data.getNextUint(4)
      chunk.type = this.data.getNextString(4)
      chunk.data = this.data.getNextDataView(chunk.length)
      chunk.crc = this.data.getNextUint(4)

      callback(chunk)

      if (chunk.type === 'IEND') {
        break
      }
    }
  }

  onIHDR(chunk) {
    // http://www.w3.org/TR/2003/REC-PNG-20031110/#11IHDR
    this.metadata.width = chunk.data.getNextUint(4)
    this.metadata.height = chunk.data.getNextUint(4)
  }

  onpHYs(chunk) {
    // http://www.w3.org/TR/2003/REC-PNG-20031110/#11pHYs
    let dimensions = {}
    dimensions.xPixelPerUnit = chunk.data.getNextUint(4)
    dimensions.yPixelPerUnit = chunk.data.getNextUint(4)
    dimensions.isMetreUnit = chunk.data.getNextUint(1) === 1

    if (dimensions.isMetreUnit) {
      let pixelPerMetre = (dimensions.xPixelPerUnit + dimensions.yPixelPerUnit) / 2
      this.metadata.ppi = Math.round(pixelPerMetre * INCH_TO_METRE_RATIO)
    }
  }
}
