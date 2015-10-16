import ProgressiveDataView from './progressive-data-view'
import PNGParser from './png-parser'
import JPEGParser from './jpeg-parser'

export default class ImageFile {
  constructor(arrayBuffer) {
    this.data = new ProgressiveDataView(arrayBuffer)
    this.parse()
  }

  parse() {
    let metadata = null

    if (this.isPNG()) {
      metadata = PNGParser.parse(this.data)
    } else if (this.isJPEG()) {
      metadata = JPEGParser.parse(this.data)
    } else {
      return
    }

    Object.assign(this, metadata)

    this.data.rewind()
  }

  isPNG() {
    return PNGParser.isPNG(this.data)
  }

  isJPEG() {
    return JPEGParser.isJPEG(this.data)
  }
}
