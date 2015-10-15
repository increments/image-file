import fs from 'fs'

export function arrayBufferFromFile(filePath) {
  let buffer = fs.readFileSync(filePath)
  let uint8Array = new Uint8Array(buffer)
  return uint8Array.buffer
}
