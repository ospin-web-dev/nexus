const { API } = require('aws-amplify')
const faker = require('faker')

const requestReporterFctData = require('dataPoints/requestReporterFctData')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

describe('requestReporterFctData', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const processId = faker.datatype.uuid()
  const reporterFctId = faker.datatype.uuid()

  it('calls amplify\'s API.post method', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)

    await requestReporterFctData(processId, reporterFctId)
    expect(API.post).toHaveBeenCalledWith('datapoints', `processes/${processId}/functionalities/${reporterFctId}/downloadrequests`, { ...DEFAULT_REQ_OPTS })
  })

  describe('on API.post success', () => {
    beforeAll(() => {
      jest.spyOn(API, 'post')
        .mockImplementation((() => ({ data: 'success!', status: 200 })))
    })

    it('returns the serialized result', async () => {
      const resp = await requestReporterFctData(process, reporterFctId)

      expect(resp).toStrictEqual(expect.objectContaining({
        success: true,
        data: 'success!',
        error: null,
        status: 200,
      }))
    })
  })

  describe('on API.post error', () => {
    const error = new Error()

    beforeAll(() => {
      jest.spyOn(API, 'post')
        .mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      const resp = await requestReporterFctData(processId, reporterFctId)

      expect(resp).toStrictEqual(expect.objectContaining({
        success: false,
        data: null,
        error,
        status: null,
      }))
    })
  })
})
