const { default: Auth } = require('@aws-amplify/auth')

const changePassword = require('auth/changePassword')

describe('changePassword', () => {

  const params = { oldPassword: 'abcd1234', newPassword: 'wxyz6789' }

  beforeAll(() => {
    jest.spyOn(Auth, 'currentAuthenticatedUser')
      .mockImplementation(() => ({ username: 'merkel' }))
  })

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s Auth.changePassword method', async () => {
    jest.spyOn(Auth, 'changePassword').mockImplementation(() => Promise.resolve({}))
    await changePassword(params)
    expect(Auth.changePassword).toHaveBeenCalledTimes(1)
    expect(Auth.changePassword)
      .toHaveBeenCalledWith({ username: 'merkel' }, params.oldPassword, params.newPassword)
  })

  describe('on Auth.changePassword success', () => {
    const res = { data: { angelo: 'merks' }, status: 200 }

    beforeAll(() => {
      jest.spyOn(Auth, 'changePassword').mockImplementation(() => res)
    })

    it('returns the serialized result', async () => {
      const resp = await changePassword(params)

      expect(resp).toStrictEqual(expect.objectContaining({
        data: res.data,
        status: 200,
      }))
    })
  })

  describe('on Auth.changePassword error', () => {
    const ERROR_TEXT = 'session error'
    const error = new Error(ERROR_TEXT)

    beforeAll(() => {
      jest.spyOn(Auth, 'changePassword').mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      await expect(changePassword(params)).rejects.toThrow(ERROR_TEXT)
    })
  })
})
