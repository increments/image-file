import fixtures from './fixtures'

export function arrayBufferFromFixture(fixtureName) {
  let fixture = fixtures[fixtureName]
  let uint8Array = new Uint8Array(fixture.data)
  return uint8Array.buffer
}
