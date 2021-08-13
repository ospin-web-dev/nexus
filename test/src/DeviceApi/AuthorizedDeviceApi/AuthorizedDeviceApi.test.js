const faker = require('faker')
const crypto = require('crypto')
const { API } = require('aws-amplify')

const AuthorizedDeviceApi = require('../../../../src/DeviceApi/AuthorizedDeviceApi/authorizedDeviceApi')
const DeviceApi = require('../../../../src/DeviceApi/DeviceApi')
const { DEFAULT_REQ_OPTS } = require('../../../../src/utils/defaultReqOpts')

describe('the AuthorizedDeviceApi', () => {

  afterEach(() => { jest.restoreAllMocks() })

  afterAll(() => { jest.restoreAllMocks() })

  it('should inherit from the deviceAPI', () => {
    expect(AuthorizedDeviceApi.DEVICE_API_PREFIX).toBe(DeviceApi.DEVICE_API_PREFIX)
  })

  describe('setCredentials', () => {
    describe('when attempted with insufficient parameters', () => {
      describe('without a path to the certifcate', () => {
        it('should fail and display the approriate error message', () => {
          expect(() => {
            AuthorizedDeviceApi.setCredentials({
              deviceId: faker.datatype.uuid(),
            })
          }).toThrow('No Certificate specified')
        })
      })

      describe('without a device id', () => {
        it('should fail and display the approriate error message', () => {
          expect(() => {
            AuthorizedDeviceApi.setCredentials({ pathToCert: 'test/src/DeviceApi/AuthorizedDeviceApi/fakeDevice_cert.crt' })
          }).toThrow('No Device ID specified')
        })
      })

      describe('with an invalid device Id', () => {
        it('should fail and display the approriate error message', () => {
          const notADeviceId = 'CUBE4THECUBENING'
          expect(() => {
            AuthorizedDeviceApi.setCredentials({
              deviceId: notADeviceId,
              pathToCert: 'test/src/DeviceApi/AuthorizedDeviceApi/fakeDevice_cert.crt' })
          }).toThrow(`${notADeviceId} is not a valid UUIDv4`)
        })
      })

      describe('with an inaccesible file', () => {
        it('should fail and display the approriate error message', () => {
          const pathToCert = '/rööt/cert.crt'
          expect(() => {
            AuthorizedDeviceApi.setCredentials({
              deviceId: faker.datatype.uuid(),
              pathToCert,
            })
          }).toThrow(`No Certificate could be found at ${pathToCert}`)
        })
      })

      describe('with a incompatible hashing algorithm', () => {

        it('should throw an error', () => {
          const deviceId = faker.datatype.uuid()
          jest.spyOn(crypto, 'createHash')
            .mockImplementationOnce(() => crypto.createHash('md5'))

          expect(() => {
            AuthorizedDeviceApi.setCredentials({
              deviceId,
              pathToCert: 'test/src/DeviceApi/AuthorizedDeviceApi/fakeDevice_cert.crt',
            })
          }).toThrow('Invalid Hash Length')
        })
      })

    })

    describe('with valid credentials', () => {
      it('should set the device id', () => {
        const deviceId = faker.datatype.uuid()

        AuthorizedDeviceApi.setCredentials({
          deviceId,
          pathToCert: 'test/src/DeviceApi/AuthorizedDeviceApi/fakeDevice_cert.crt',
        })

        expect(AuthorizedDeviceApi.deviceId).toBe(deviceId)
      })

      it('should set the Authorization', () => {
        const deviceId = faker.datatype.uuid()
        const pathToCert = 'test/src/DeviceApi/AuthorizedDeviceApi/fakeDevice_cert.crt'
        const Authorization = AuthorizedDeviceApi._createHashFromCertificateFile(pathToCert)
        AuthorizedDeviceApi.setCredentials({
          deviceId,
          pathToCert,
        })

        expect(AuthorizedDeviceApi.Authorization).toBe(Authorization)
      })
    })



  })

  describe('authorizationHeaders', () => {
    it('sould return an object with {headers: Authorization} format', () => {
      const deviceId = faker.datatype.uuid()
      const pathToCert = 'test/src/DeviceApi/AuthorizedDeviceApi/fakeDevice_cert.crt'
      const Authorization = AuthorizedDeviceApi._createHashFromCertificateFile(pathToCert)
      AuthorizedDeviceApi.setCredentials({
        deviceId,
        pathToCert,
      })
      const requestObject = AuthorizedDeviceApi.authorizationHeaders
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
    const pathToCert = 'test/src/DeviceApi/AuthorizedDeviceApi/fakeDevice_cert.crt'
    const Authorization = AuthorizedDeviceApi._createHashFromCertificateFile(pathToCert)

    beforeEach(() => {
      AuthorizedDeviceApi.setCredentials({
        deviceId,
        pathToCert,
      })
    })

    describe('get', () => {

      it('should call on the parent method', async () => {
        const APISpy = jest.spyOn(DeviceApi, 'get').mockImplementation()

        await AuthorizedDeviceApi.get(fakeResource)

        expect(APISpy).toHaveBeenCalledWith(
          fakeResource,
          { headers: {
            Authorization,
          } },
        )
      })

      it('should call the API.get method with passed trough opts', async () => {
        const APISpy = jest.spyOn(API, 'get').mockImplementation()

        await AuthorizedDeviceApi.get(fakeResource)

        expect(APISpy).toHaveBeenCalledWith(
          DeviceApi.DEVICE_API_PREFIX,
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
        const APISpy = jest.spyOn(DeviceApi, 'post').mockImplementation()

        await AuthorizedDeviceApi.post(fakeResource, fakeBody)

        expect(APISpy).toHaveBeenCalledWith(
          fakeResource,
          fakeBody,
          { headers: { Authorization }
          },
        )
      })

      it('should call the API.get method with passed trough opts', async () => {
        const APISpy = jest.spyOn(API, 'post').mockImplementation()

        await AuthorizedDeviceApi.post(fakeResource, fakeBody)

        expect(APISpy).toHaveBeenCalledWith(
          DeviceApi.DEVICE_API_PREFIX,
          `/${deviceId}/${fakeResource}`,
          { headers: { Authorization },
            body: fakeBody,
            ...DEFAULT_REQ_OPTS
          },
        )
      })
    })
  })




})
