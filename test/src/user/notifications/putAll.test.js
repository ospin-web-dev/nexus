const { API } = require('aws-amplify')
const uuidv4 = require('uuid').v4

const putAll = require('user/notifications/putAll')

describe('putAll user notifications', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.put method with the expected args', async () => {
    jest.spyOn(API, 'put').mockImplementation(args => args)
    const body = {
      originId: uuidv4(),
      sourceName: 'macrophage',
      sourceType: 'user',
      topic: 'changelog',
      message: 'chux',
    }

    putAll(body)
    expect(API.put).toHaveBeenCalledWith('user', 'notifications', { body })
  })

  describe('on API.put success', () => {
    beforeAll(() => {
      jest.spyOn(API, 'put')
        .mockImplementation((() => 'success!'))
    })

    it('returns the serialized result', async () => {
      const userId = uuidv4()

      const resp = await putAll(userId)
      expect(resp).toStrictEqual(expect.objectContaining({
        success: true,
        data: 'success!',
        error: null,
        errorMsg: null,
        status: 200,
      }))
    })
  })

  describe('on API.put error', () => {
    const error = new Error()

    beforeAll(() => {
      jest.spyOn(API, 'put')
        .mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      const userId = uuidv4()

      const resp = await putAll(userId)
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
