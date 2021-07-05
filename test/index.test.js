const { Amplify } = require('aws-amplify')

const createConfig = require('../src/amplify/createConfig')

const mirrorEnvOnStage = env => ({ stage: env })
jest.spyOn(createConfig, 'createConfig').mockImplementation(mirrorEnvOnStage)

const nexus = require('../index')

describe('nexus', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const EXPECTED_FUNCTIONS = new Set([
    'connectToEnv',
    'createConfig',
  ])

  const EXPECTED_MODULES = new Set([
    'auth',
    'user',
    'device',
    'log',
  ])

  it('this test gets updated when a new fn or module is added', () => {
    expect(Object.keys(nexus)).toHaveLength(
      EXPECTED_MODULES.size + EXPECTED_FUNCTIONS.size,
    )
  })

  EXPECTED_MODULES.forEach(module => {
    it(`exports the ${module} module`, () => {
      expect(typeof nexus[module]).toBe('object')
    })
  })

  describe('connectToEnv', () => {
    it('calls createConfig and Amplify.configure with it\'s returned value', () => {
      jest.spyOn(Amplify, 'configure').mockImplementation()

      const ENV = 'test'
      nexus.connectToEnv(ENV)

      expect(Amplify.configure).toHaveBeenCalledWith(mirrorEnvOnStage(ENV))
    })

  })
})
