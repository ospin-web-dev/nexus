const faker = require('faker')
const crypto = require('crypto')
const { API } = require('aws-amplify')

const AuthorizedDeviceAPI = require('../../../src/DeviceAPI/AuthorizedDeviceAPI')
const DeviceAPI = require('../../../src/DeviceAPI/DeviceAPI')
const { DEFAULT_REQ_OPTS } = require('../../../src/utils/defaultReqOpts')

describe('the AuthorizedDeviceAPI', () => {

  const pathToCert = 'test/src/DeviceAPI/fakeDevice_cert.crt'

  afterEach(() => { jest.restoreAllMocks() })

  afterAll(() => { jest.restoreAllMocks() })

  it('should inherit from the DeviceAPI', () => {
    expect(AuthorizedDeviceAPI.DEVICE_API_PREFIX).toBe(DeviceAPI.DEVICE_API_PREFIX)
  })

  describe('setCredentials', () => {
    describe('when attempted with insufficient parameters', () => {
      describe('without a path to the certifcate', () => {
        it('should fail and display the approriate error message', () => {
          expect(() => {
            AuthorizedDeviceAPI.setCredentials({
              deviceId: faker.datatype.uuid(),
            })
          }).toThrow('No Certificate specified')
        })
      })

      describe('without a device id', () => {
        it('should fail and display the approriate error message', () => {
          expect(() => {
            AuthorizedDeviceAPI.setCredentials({
              pathToCert,
            })
          }).toThrow('No Device ID specified')
        })
      })

      describe('with an invalid device Id', () => {
        it('should fail and display the approriate error message', () => {
          const notADeviceId = 'CUBE4THECUBENING'
          expect(() => {
            AuthorizedDeviceAPI.setCredentials({
              deviceId: notADeviceId,
              pathToCert,
            })
          }).toThrow(`${notADeviceId} is not a valid UUIDv4`)
        })
      })

      describe('with an inaccesible file', () => {
        it('should fail and display the approriate error message', () => {
          const fakePathToCert = '/rööt/cert.crt'
          expect(() => {
            AuthorizedDeviceAPI.setCredentials({
              deviceId: faker.datatype.uuid(),
              pathToCert: fakePathToCert,
            })
          }).toThrow(`No Certificate could be found at ${fakePathToCert}`)
        })
      })

      describe('with a incompatible hashing algorithm', () => {

        it('should throw an error', () => {
          const deviceId = faker.datatype.uuid()
          jest.spyOn(crypto, 'createHash')
            .mockImplementationOnce(() => crypto.createHash('md5'))

          expect(() => {
            AuthorizedDeviceAPI.setCredentials({
              deviceId,
              pathToCert,
            })
          }).toThrow('Invalid Hash Length')
        })
      })

    })

    describe('with valid credentials', () => {
      it('should set the device id', () => {
        const deviceId = faker.datatype.uuid()

        AuthorizedDeviceAPI.setCredentials({
          deviceId,
          pathToCert,
        })

        expect(AuthorizedDeviceAPI.deviceId).toBe(deviceId)
      })

      it('should set the Authorization', () => {
        const deviceId = faker.datatype.uuid()
        const Authorization = AuthorizedDeviceAPI._createHashFromCertificateFile(pathToCert)
        AuthorizedDeviceAPI.setCredentials({
          deviceId,
          pathToCert,
        })

        expect(AuthorizedDeviceAPI.Authorization).toBe(Authorization)
      })
    })

  })

  describe('authorizationHeaders', () => {
    it('sould return an object with {headers: Authorization} format', () => {
      const deviceId = faker.datatype.uuid()
      const Authorization = AuthorizedDeviceAPI._createHashFromCertificateFile(pathToCert)
      AuthorizedDeviceAPI.setCredentials({
        deviceId,
        pathToCert,
      })
      const requestObject = AuthorizedDeviceAPI.authorizationHeaders
      expect(requestObject).toStrictEqual({
        headers: {
          Authorization,
        },
      })
    })
  })

  describe('its HTTP methods', () => {

    const deviceId = faker.datatype.uuid()
    const fakeResource = faker.random.word()
    const Authorization = AuthorizedDeviceAPI._createHashFromCertificateFile(pathToCert)

    beforeEach(() => {
      AuthorizedDeviceAPI.setCredentials({
        deviceId,
        pathToCert,
      })
    })

    describe('get', () => {

      it('should call on the parent method', async () => {
        const APISpy = jest.spyOn(DeviceAPI, 'get').mockImplementation()

        await AuthorizedDeviceAPI.get(fakeResource)

        expect(APISpy).toHaveBeenCalledWith(
          fakeResource,
          { headers: {
            Authorization,
          } },
        )
      })

      it('should call the API.get method with passed trough opts', async () => {
        const APISpy = jest.spyOn(API, 'get').mockImplementation()

        await AuthorizedDeviceAPI.get(fakeResource)

        expect(APISpy).toHaveBeenCalledWith(
          DeviceAPI.DEVICE_API_PREFIX,
          `/${deviceId}/${fakeResource}`,
          { headers: {
            Authorization,
          },
          ...DEFAULT_REQ_OPTS },
        )
      })
    })

    describe('post', () => {
      const fakeBody = {
        message: faker.random.words(10),
      }

      it('should call on the parent method', async () => {
        const APISpy = jest.spyOn(DeviceAPI, 'post').mockImplementation()

        await AuthorizedDeviceAPI.post(fakeResource, fakeBody)

        expect(APISpy).toHaveBeenCalledWith(
          fakeResource,
          fakeBody,
          { headers: { Authorization },
          },
        )
      })

      it('should call the API.get method with passed trough opts', async () => {
        const APISpy = jest.spyOn(API, 'post').mockImplementation()

        await AuthorizedDeviceAPI.post(fakeResource, fakeBody)

        expect(APISpy).toHaveBeenCalledWith(
          DeviceAPI.DEVICE_API_PREFIX,
          `/${deviceId}/${fakeResource}`,
          { headers: { Authorization },
            body: fakeBody,
            ...DEFAULT_REQ_OPTS,
          },
        )
      })
    })
  })
})
