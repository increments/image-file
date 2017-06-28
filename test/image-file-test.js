import {expect} from 'chai'
import {arrayBufferFromFixture} from './test-helper'
import ImageFile from '../src/image-file'

describe('ImageFile', () => {
  let imageFile = null
  let arrayBuffer = null

  beforeEach(() => {
    imageFile = new ImageFile(arrayBuffer)
  })

  afterEach(() => {
    imageFile = null
    arrayBuffer = null
  })

  describe('#isPNG()', () => {
    context('with a PNG file', () => {
      before(() => {
        arrayBuffer = arrayBufferFromFixture('retina_240x88.png')
      })

      it('returns true', () => {
        expect(imageFile.isPNG()).to.be.true
      })
    })

    context('with a JPEG file', () => {
      before(() => {
        arrayBuffer = arrayBufferFromFixture('retina_240x88.jpg')
      })

      it('returns false', () => {
        expect(imageFile.isPNG()).to.be.false
      })
    })

    context('with an empty file', () => {
      before(() => {
        arrayBuffer = new ArrayBuffer(0)
      })

      it('returns false', () => {
        expect(imageFile.isPNG()).to.be.false
      })
    })
  })

  describe('#isJPEG()', () => {
    context('with a JPEG file', () => {
      before(() => {
        arrayBuffer = arrayBufferFromFixture('retina_240x88.jpg')
      })

      it('returns true', () => {
        expect(imageFile.isJPEG()).to.be.true
      })
    })

    context('with a PNG file', () => {
      before(() => {
        arrayBuffer = arrayBufferFromFixture('retina_240x88.png')
      })

      it('returns false', () => {
        expect(imageFile.isJPEG()).to.be.false
      })
    })

    context('with an empty file', () => {
      before(() => {
        arrayBuffer = new ArrayBuffer(0)
      })

      it('returns false', () => {
        expect(imageFile.isJPEG()).to.be.false
      })
    })
  })

  describe('#width', () => {
    context('with 240 x 88 PNG image', () => {
      before(() => {
        arrayBuffer = arrayBufferFromFixture('retina_240x88.png')
      })

      it('returns 240', () => {
        expect(imageFile.width).to.equal(240)
      })
    })

    context('with 240 x 88 JPEG file', () => {
      before(() => {
        arrayBuffer = arrayBufferFromFixture('retina_240x88.jpg')
      })

      it('returns 240', () => {
        expect(imageFile.width).to.equal(240)
      })
    })
  })

  describe('#height', () => {
    context('with 240 x 88 PNG image', () => {
      before(() => {
        arrayBuffer = arrayBufferFromFixture('retina_240x88.png')
      })

      it('returns 88', () => {
        expect(imageFile.height).to.equal(88)
      })
    })

    context('with 240 x 88 JPEG file', () => {
      before(() => {
        arrayBuffer = arrayBufferFromFixture('retina_240x88.jpg')
      })

      it('returns 240', () => {
        expect(imageFile.width).to.equal(240)
      })
    })
  })

  describe('#ppi', () => {
    context('with a non-Retina PNG image', () => {
      before(() => {
        arrayBuffer = arrayBufferFromFixture('non-retina_1024x768.png')
      })

      it('is undefined', () => {
        expect(imageFile.ppi).to.be.undefined
      })
    })

    context('with a 2x Retina PNG image', () => {
      before(() => {
        arrayBuffer = arrayBufferFromFixture('retina_240x88.png')
      })

      it('returns 144', () => {
        expect(imageFile.ppi).to.equal(144)
      })
    })

    context('with a 2x Retina JPEG image', () => {
      before(() => {
        arrayBuffer = arrayBufferFromFixture('retina_240x88.jpg')
      })

      it('returns 144', () => {
        expect(imageFile.ppi).to.equal(144)
      })
    })
  })

  describe('#internationalTextualData', () => {
    context('with a PNG image with iTXt chunk', () => {
      before(() => {
        arrayBuffer = arrayBufferFromFixture('retina_640x1136_iphone.png')
      })

      it('returns the parsed metadata', () => {
        expect(imageFile.internationalTextualData.text).to.include('<exif:UserComment>Screenshot</exif:UserComment>')
      })
    })

    context('with a PNG image without iTXt chunk', () => {
      before(() => {
        arrayBuffer = arrayBufferFromFixture('retina_240x88.png')
      })

      it('is undefined', () => {
        expect(imageFile.internationalTextualData).to.be.undefined
      })
    })
  })
})
