const faker = require('faker')
const { API } = require('aws-amplify')

const { DeviceApi } = require('../../../src/DeviceApi')
const { DEFAULT_REQ_OPTS } = require('../../../src/utils/defaultReqOpts')

describe('the DeviceAPI class', () => {
  afterEach(() => {
    jest.restoreAllMocks()
    jest.resetModules()

  })

  describe('the setDeviceID method', () => {
    describe('with a valid ID', () => {
      it('should save the ID', () => {
        const deviceId = faker.datatype.uuid()
        DeviceApi.setIdentity(deviceId)

        expect(DeviceApi.deviceId).toBe(deviceId)
      })
    })

    describe('with an Invalid ID', () => {
      it('should throw an error', () => {
        const invalidDeviceID = faker.random.word()
        expect(() => {
          DeviceApi.setIdentity(invalidDeviceID)
        }).toThrow(`${invalidDeviceID} is not a valid UUIDv4`)
      })
    })

    describe('without an Id', () => {
      it('should throw an error', () => {
        expect(() => {
          DeviceApi.setIdentity()
        }).toThrow('No Device ID specified')
      })
    })
  })

  describe('the .deviceId', () => {

    it('should throw without a set device id', () => {
      DeviceApi._deviceId = undefined
      expect(() => { DeviceApi.deviceId }).toThrow('No Device ID specified')
    })

    it('should return the deviceId', () => {
      const deviceId = faker.datatype.uuid()
      DeviceApi.setIdentity(deviceId)

      expect(DeviceApi.deviceId).toBe(deviceId)
    })


  })

  describe('the http methods method', () => {
    const deviceId = faker.datatype.uuid()

    beforeEach(() => {
      DeviceApi.setIdentity(deviceId)
    })

    describe('the get method', () => {
      it('should call to API.get with the API-prefix, the path and default opts', async () => {
        const APISpy = jest.spyOn(API,'get').mockImplementation()
        const fakeResource = faker.random.word()

        await DeviceApi.get(fakeResource)

        expect(APISpy).toHaveBeenCalledWith(
          DeviceApi.DEVICE_API_PREFIX,
          `/${deviceId}/${fakeResource}`,
          DEFAULT_REQ_OPTS,
        )
      })
    })

    describe('the post method', () => {
      it('should call to API.post with the API-prefix, the path, default opts and the body', async () => {
        const APISpy = jest.spyOn(API, 'post').mockImplementation()
        const fakeResource = faker.random.word()
        const fakeBody = { message: 'this is a test' }

        await DeviceApi.post(fakeResource,fakeBody)

        expect(APISpy).toHaveBeenCalledWith(
          DeviceApi.DEVICE_API_PREFIX,
          `/${deviceId}/${fakeResource}`,
          { body: fakeBody,
            ...DEFAULT_REQ_OPTS },
        )
      })
    })
  })
})
