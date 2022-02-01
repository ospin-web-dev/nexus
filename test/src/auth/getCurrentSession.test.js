const { default: Auth } = require('@aws-amplify/auth')

const getCurrentSession = require('auth/getCurrentSession')

describe('getCurrentSession', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s Auth.currentSession method', async () => {
    jest.spyOn(Auth, 'currentSession').mockImplementation(args => args)

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
        success: true,
        data: SESSION.data,
        errorMsg: null,
        error: null,
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
      const resp = await getCurrentSession()

      expect(resp).toStrictEqual(expect.objectContaining({
        success: false,
        data: null,
        errorMsg: ERROR_TEXT,
        error,
        status: null,
      }))
    })
  })
})
