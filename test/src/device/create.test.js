const { API } = require('aws-amplify')
const uuidv4 = require('uuid').v4

const create = require('device/create')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

describe('create device', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.post method with the expected args', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)

    const body = {
      ownerId: uuidv4(),
      name: 'knuckles',
      isVirtual: false,
    }

    create(body)
    expect(API.post).toHaveBeenCalledWith('device', '', { body, ...DEFAULT_REQ_OPTS })
  })

  describe('on API.post success', () => {
    beforeAll(() => {
      jest.spyOn(API, 'post').mockImplementation(() => ({ data: 'success!', status: 200 }))
    })

    it('returns the serialized result', async () => {
      const resp = await create({})

      expect(resp).toStrictEqual(expect.objectContaining({
        success: true,
        data: 'success!',
        error: null,
        errorMsg: null,
        status: 200,
      }))
    })
  })

  describe('on API.post error', () => {
    const error = new Error()

    beforeAll(() => {
      jest.spyOn(API, 'post').mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      const userid = uuidv4()

      const resp = await create(userid)
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
