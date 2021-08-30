const { API } = require('aws-amplify')
const uuidv4 = require('uuid').v4

const putUserFctGraphUIConfig = require('uIConfig/userFctGraphUIConfig/put')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

describe('put', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.put method', async () => {
    jest.spyOn(API, 'put').mockImplementation(args => args)
    const userId = uuidv4()
    const fctGraphId = uuidv4()
    const params = { processBuilder: {} }

    await putUserFctGraphUIConfig(userId, fctGraphId, params)
    expect(API.put).toHaveBeenCalledWith('uiconfig', `users/${userId}/functionality-graphs/${fctGraphId}`, { body: params, ...DEFAULT_REQ_OPTS })
  })

  describe('on API.del success', () => {
    beforeAll(() => {
      jest.spyOn(API, 'put')
        .mockImplementation((() => ({ data: 'success!', status: 200 })))
    })

    it('returns the serialized result', async () => {
      const resp = await putUserFctGraphUIConfig()

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
      jest.spyOn(API, 'put')
        .mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      const resp = await putUserFctGraphUIConfig()

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
