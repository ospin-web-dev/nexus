const { API } = require('aws-amplify')
const uuidv4 = require('uuid').v4

const deleteMany = require('log/device/deleteMany')

describe('deleteMany', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.del method', async () => {
    jest.spyOn(API, 'del').mockImplementation(args => args)
    const deviceId = uuidv4()

    await deleteMany(deviceId)
    expect(API.del).toHaveBeenCalledWith('log', `devices/${deviceId}`)
  })

  describe('on API.del success', () => {
    beforeAll(() => {
      jest.spyOn(API, 'del')
        .mockImplementation((() => ({ data: 'success!', status: 200 })))
    })

    it('returns the serialized result', async () => {
      const resp = await deleteMany()

      expect(resp).toStrictEqual(expect.objectContaining({
        success: true,
        data: 'success!',
        errorMsg: null,
        error: null,
        status: 200,
      }))
    })
  })

  describe('on API.del error', () => {
    const error = new Error()

    beforeAll(() => {
      jest.spyOn(API, 'del')
        .mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      const resp = await deleteMany()

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
