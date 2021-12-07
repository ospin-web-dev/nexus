const { API } = require('aws-amplify')
const uuidv4 = require('uuid').v4

const deleteMany = require('process/deleteMany')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

describe('deleteMany', () => {
  it('calls amplify\'s API.patch method', async () => {
    jest.spyOn(API, 'patch').mockImplementation(args => args)
    const processId = [uuidv4(), uuidv4()]

    await deleteMany(processId)
    expect(API.patch).toHaveBeenCalledWith('process', '', { body: { processesIds: processId }, ...DEFAULT_REQ_OPTS })
  })

  describe('on API.patch success', () => {
    beforeAll(() => {
      jest.spyOn(API, 'patch')
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

  describe('on API.patch error', () => {
    const error = new Error()

    beforeAll(() => {
      jest.spyOn(API, 'patch')
        .mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      const resp = await deleteMany()

      expect(resp).toStrictEqual(expect.objectContaining({
        success: false,
        data: null,
        errorMsg: '',
        error,
        status: null,
      }))
    })
  })
})
