const faker = require('faker')
const API = require('@aws-amplify/api-rest')

const DeviceAPI = require('../../../src/deviceAPI/DeviceAPI')
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
        DeviceAPI.setIdentity(deviceId)

        expect(DeviceAPI.deviceId).toBe(deviceId)
      })
    })

    describe('with an Invalid ID', () => {
      it('should throw an error', () => {
        const invalidDeviceID = faker.random.word()
        expect(() => {
          DeviceAPI.setIdentity(invalidDeviceID)
        }).toThrow(`${invalidDeviceID} is not a valid UUIDv4`)
      })
    })

    describe('without an Id', () => {
      it('should throw an error', () => {
        expect(() => {
          DeviceAPI.setIdentity()
        }).toThrow('No Device ID specified')
      })
    })
  })

  describe('the .deviceId', () => {

    it('should throw without a set device id', () => {
      DeviceAPI._deviceId = undefined
      expect(() => { DeviceAPI.deviceId }).toThrow('No Device ID specified') //eslint-disable-line
    })

    it('should return the deviceId', () => {
      const deviceId = faker.datatype.uuid()
      DeviceAPI.setIdentity(deviceId)

      expect(DeviceAPI.deviceId).toBe(deviceId)
    })

  })

  describe('the http methods method', () => {
    const deviceId = faker.datatype.uuid()

    beforeEach(() => {
      DeviceAPI.setIdentity(deviceId)
    })

    describe('the get method', () => {
      it('should call to API.get with the API-prefix, the path and default opts', async () => {
        const APISpy = jest.spyOn(API, 'get').mockImplementation()
        const fakeResource = faker.random.word()

        await DeviceAPI.get(fakeResource)

        expect(APISpy).toHaveBeenCalledWith(
          DeviceAPI.DEVICE_API_PREFIX,
          `devices/${deviceId}/${fakeResource}`,
          DEFAULT_REQ_OPTS,
        )
      })
    })

    describe('the post method', () => {
      it('should call to API.post with the API-prefix, the path, default opts and the body', async () => {
        const APISpy = jest.spyOn(API, 'post').mockImplementation()
        const fakeResource = faker.random.word()
        const fakeBody = { message: 'this is a test' }

        await DeviceAPI.post(fakeResource, fakeBody)

        expect(APISpy).toHaveBeenCalledWith(
          DeviceAPI.DEVICE_API_PREFIX,
          `devices/${deviceId}/${fakeResource}`,
          { body: fakeBody,
            ...DEFAULT_REQ_OPTS },
        )
      })
    })
  })
})
