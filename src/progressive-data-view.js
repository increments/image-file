export default class ProgressiveDataView {
  constructor(...args) {
    this.dataView = new DataView(...args)
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

  getString(offset, length) {
    let characters = []

    for (let i = 0; i < length; i++) {
      let uint = this.getUint(offset + i, 1)
      characters.push(String.fromCharCode(uint))
    }

    return characters.join('')
  }

  getNextString(length) {
    return this.getString(this.position, this.advance(length))
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
