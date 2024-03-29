const { Auth } = require('aws-amplify')



const getCurrentSession = require('auth/getCurrentSession')

describe('getCurrentSession', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s Auth.currentSession method', async () => {
    jest.spyOn(Auth, 'currentSession').mockImplementation((args = {}) => args)

    await getCurrentSession()
    expect(Auth.currentSession).toHaveBeenCalledTimes(1)
  })

  describe('on Auth.currentSession success', () => {
    const SESSION = { data: { angelo: 'merks' }, status: 200 }

    beforeAll(() => {
      jest.spyOn(Auth, 'currentSession').mockImplementation(() => SESSION)
    })

    it('returns the serialized result', async () => {
      const resp = await getCurrentSession()

      expect(resp).toStrictEqual(expect.objectContaining({
        data: SESSION.data,
        status: 200,
      }))
    })
  })

  describe('on Auth.currentSession error', () => {
    const ERROR_TEXT = 'session error'
    const error = new Error(ERROR_TEXT)

    beforeAll(() => {
      jest.spyOn(Auth, 'currentSession')
        .mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      await expect(getCurrentSession()).rejects.toThrow(ERROR_TEXT)
    })
  })
})
