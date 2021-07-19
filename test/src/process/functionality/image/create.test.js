const faker = require('faker')
const create = require('process/functionality/image/create')
const { API } = require('aws-amplify')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

describe('create Process Functionality Image', () => {

  afterAll(() => { jest.restoreAllMocks() })

  beforeEach(() => {
    jest.spyOn(API, 'post').mockImplementation(args => args)
  })

  const processId = faker.datatype.uuid()
  const functionalityId = faker.datatype.uuid()
  const body = {
    imageData: 'aHellLotOfCharacters',
    fileType: 'jpeg',
  }

  it('calls amplifys API.post with the expected args', async () => {

    create(processId, functionalityId, body)

    expect(API.post).toHaveBeenCalledWith(
      'process',
      `${processId}/functionality/${functionalityId}`,
      { body, ...DEFAULT_REQ_OPTS },

    )
  })

  describe('on success', () => {

    beforeEach(() => {
      jest.spyOn(API, 'post').mockImplementation(() => ({ data: 'success!', status: 200 }))
    })

    it('should respond with the data ,the status code and success=true', async () => {
      const resp = await create({})

      expect(resp).toStrictEqual(expect.objectContaining({
        success: true,
        data: 'success!',
        error: null,
        errorMsg: null,
        status: 200,
      }))
    })

    describe('on failure', () => {

      beforeEach(() => {
        jest.spyOn(API, 'post').mockImplementation(() => { throw new Error() })
      })

      it('should repond with the error message,the status code and success=false', async () => {

        const resp = await create({})

        expect(resp).toStrictEqual(expect.objectContaining({
          success: false,
          data: null,
          error: new Error(),
          errorMsg: '',
          status: null,
        }))
      })
    })
  })
})
