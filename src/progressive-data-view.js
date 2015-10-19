export default class ProgressiveDataView {
  constructor(arrayBuffer, byteOffset = undefined, byteLength = undefined) {
    // `new DataView(...args)` does not work on Safari 9.0...
    if (byteOffset === undefined) {
      this.dataView = new DataView(arrayBuffer)
    } else if (byteLength === undefined) {
      this.dataView = new DataView(arrayBuffer, byteLength)
    } else {
      this.dataView = new DataView(arrayBuffer, byteOffset, byteLength)
    }

    this.buffer = this.dataView.buffer
    this.position = 0
  }

  advance(length) {
    this.position += length
    return length
  }

  rewind() {
    this.position = 0
  }

  getBytes(offset, length) {
    let bytes = []

    for (let i = 0; i < length; i++) {
      let uint = this.getUint(offset + i, 1)
      bytes.push(uint)
    }

    return bytes
  }

  getNextBytes(length) {
    return this.getBytes(this.position, this.advance(length))
  }

  getString(offset, length = Infinity) {
    let characters = []

    for (let i = 0; i < length; i++) {
      let uint = this.getUint(offset + i, 1)
      characters.push(String.fromCharCode(uint))

      if ((offset + i === this.dataView.byteLength - 1) || (length === Infinity && uint === 0)) {
        break;
      }
    }

    return characters.join('')
  }

  getNextString(length = Infinity) {
    let string = this.getString(this.position, length)
    this.advance(string.length)
    return string
  }

  getUint(offset, length) {
    return this.dataView['getUint' + 8 * length](offset)
  }

  getNextUint(length) {
    return this.getUint(this.position, this.advance(length))
  }

  getDataView(offset, length) {
    return new ProgressiveDataView(this.dataView.buffer, offset, length)
  }

  getNextDataView(length) {
    return this.getDataView(this.position, this.advance(length))
  }
}
