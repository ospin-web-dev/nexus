const { Amplify } = require('aws-amplify')

const configGenerator = require('../src/amplify/configGenerator')

const injectMerkelIntoArgObjectAndReturn = args => ({
  ...args,
  merkel: 'you bet',
})
jest.spyOn(configGenerator, 'createConfig')
  .mockImplementation(injectMerkelIntoArgObjectAndReturn)

const nexus = require('../index')

describe('nexus', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const EXPECTED_FUNCTIONS = new Set([
    'connect',
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

  describe('connect', () => {
    it('calls createConfig with the expected default connection options if none are provided', () => {
      nexus.connect()

      expect(configGenerator.createConfig).toHaveBeenCalledWith({
        ENV: 'dev',
        AWS_REGION: 'eu-central-1',
      })
    })

    it('calls Amplify.configure with configGenerator.createConfig\'s returned value', () => {
      // see imports for the spy on configGenerator,
      // which needed to be spied on before the nexus was imported
      jest.spyOn(Amplify, 'configure').mockImplementation()

      const connectionOpts = {
        ENV: 'test',
        AWS_REGION: 'its-all-merkels-realm-now',
      }
      nexus.connect(connectionOpts)

      expect(Amplify.configure).toHaveBeenCalledWith(
        injectMerkelIntoArgObjectAndReturn(connectionOpts),
      )
    })
  })
})
