const { API } = require('aws-amplify')

const get = require('device/certificate/get')

describe('get', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const deviceId = '131c3c27-bdf3-4a45-93d4-449b4578b3ee'

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await get(deviceId)
    expect(API.get).toHaveBeenCalledWith('device', `${deviceId}/certificate`)
  })

  describe('on API.get success', () => {
    beforeAll(() => {
      jest.spyOn(API, 'get')
        .mockImplementation((() => 'success!'))
    })

    it('returns the serialized result', async () => {
      const resp = await get(deviceId)

      expect(resp).toStrictEqual(expect.objectContaining({
        success: true,
        data: 'success!',
        error: null,
        errorMsg: null,
        status: 200,
      }))
    })
  })

  describe('on API.get error', () => {
    const error = new Error()

    beforeAll(() => {
      jest.spyOn(API, 'get')
        .mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      const resp = await get(deviceId)

      expect(resp).toStrictEqual(expect.objectContaining({
        success: false,
        data: null,
        error,
        errorMsg: '',
        status: null,
      }))
    })
  })
})
