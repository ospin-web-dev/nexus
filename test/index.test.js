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

  const MODULE_STRUCTURE = {
    connect: 'function',
    createConfig: 'function',
    auth: {
      getCurrentSession: 'function',
      signIn: 'function',
      signOut: 'function',
    },
    dataPoints: {
      get: 'function',
      requestReporterFctData: 'function',
    },
    device: {
      certificate: {
        get: 'function',
      },
      create: 'function',
      list: 'function',
    },
    deviceAPI: {
      authentication: {
        validateAuthorization: 'function',
        setCredentials: 'function',
      },
      process: {
        functionality: {
          image: {
            createFromFile: 'function',
            createFromURI: 'function',
          },
        },
        stream: {
          image: {
            createFromFile: 'function',
            createFromURI: 'function',
          },
        },
      },
    },
    log: {
      device: {
        deleteMany: 'function',
      },
    },
    process: {
      functionality: {
        image: {
          create: 'function',
          list: 'function',
        },
      },
    },
    uIConfig: {
      userFctGraphUIConfig: {
        put: 'function',
      },
    },
    user: {
      notifications: {
        putAll: 'function',
      },
      delete: 'function',
      get: 'function',
      list: 'function',
      update: 'function',
    },
  }

  function testFunctionPresentInModule(functionName, module) {
    it(`exposes ${functionName}`, () => {
      expect(typeof module[functionName]).toBe('function')
    })
  }

  function assertValueFunctionOrObject(value) {
    // this check provides some safety on the MODULE_STRUCTURE above so it is not extended
    // with something unexpected unintentionally
    if (value !== 'function' && typeof value !== 'object') {
      throw new Error(`${value} must be string 'function' or an object`)
    }
  }

  function testExportAgainstNexus(exportName, exportValue, path) {
    assertValueFunctionOrObject(exportValue)

    exportValue === 'function' // eslint-disable-line
      ? testFunctionPresentInModule(exportName, eval(path.join('.'))) // eslint-disable-line
      : testModuleStructure(exportValue, [ ...path, exportName ]) // eslint-disable-line
  }

  function testModuleContainsExpectedNumberOfExports(expectedModule, nexusModule) {
    const expectedNumberExports = Object.keys(expectedModule).length
    const numberExportsPresent = Object.keys(nexusModule).length

    it(`exports ${expectedNumberExports} functions + modules`, () => {
      expect(numberExportsPresent).toBe(expectedNumberExports)
    })
  }

  function assertIsModule(nexusModule, path) {
    if (typeof nexusModule !== 'object') {
      throw new Error(`nexusModule at: ${path.join('.')} is not an object`)
    }
  }

  function testModuleStructure(expectedModule, path) {
    describe(`${path.join('.')}`, () => {
      const nexusModule = eval(path.join('.')) // eslint-disable-line
      assertIsModule(nexusModule, path)
      testModuleContainsExpectedNumberOfExports(expectedModule, nexusModule)

      Object.entries(expectedModule).forEach(([ exportName, exportValue ]) => {
        testExportAgainstNexus(exportName, exportValue, path)
      })
    })
  }

  testModuleStructure(MODULE_STRUCTURE, [ 'nexus' ])

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
