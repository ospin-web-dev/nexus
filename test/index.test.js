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
    configure: 'function',
    auth: {
      changePassword: 'function',
      confirmSignUp: 'function',
      forgotPassword: 'function',
      forgotPasswordSubmit: 'function',
      resendConfirmationCode: 'function',
      getCurrentSession: 'function',
      signIn: 'function',
      signOut: 'function',
      signUp: 'function',
    },
    command: {
      device: {
        process: {
          end: 'function',
          goToNextPhase: 'function',
          pause: 'function',
          resume: 'function',
          start: 'function',
          updateRunning: 'function',
        },
        openSsh: 'function',
        updateFirmware: 'function',
      },
    },
    dataPoints: {
      get: 'function',
      downloadRequest: {
        createForReporter: 'function',
        createForProcess: 'function',
        list: 'function',
      },
      materializedView: {
        get: 'function',
      },
    },
    device: {
      access: {
        grant: 'function',
        revoke: 'function',
        modify: 'function',
      },
      certificate: {
        get: 'function',
      },
      create: 'function',
      createHeidolphCoreGateway: 'function',
      deletePendingInvitation: 'function',
      functionality: {
        calibration: {
          remove: 'function',
          update: 'function',
        },
      },
      functionalityGraph: {
        ports: {
          update: 'function',
        },
        configuration: {
          get: 'function',
        },
        update: 'function',
        functionalityConfiguration: {
          updateMany: 'function',
        },
      },
      get: 'function',
      getUserInvitations: 'function',
      manufacturer: {
        list: 'function',
        deviceType: {
          list: 'function',
        },
      },
      transferOwnership: 'function',
      list: 'function',
      remove: 'function',
      update: 'function',
      validate: 'function',
    },
    deviceDescription: {
      template: {
        create: 'function',
        list: 'function',
        remove: 'function',
        update: 'function',
        get: 'function',
        putLayout: 'function',

      },
      functionalityDescription: {
        create: 'function',
        putImage: 'function',
        list: 'function',
        remove: 'function',
        update: 'function',
      },
      functionalityDefinition: {
        list: 'function',
      },
    },
    event: {
      device: {
        removeAll: 'function',
      },
      remove: 'function',
    },
    licence: {
      preAssign: 'function',
      create: 'function',
      list: 'function',
      type: {
        list: 'function',
      },
      update: 'function',
    },
    log: {
      device: {
        deleteMany: 'function',
      },
      list: 'function',
    },
    process: {
      access: {
        grant: 'function',
        modify: 'function',
        revoke: 'function',
      },
      annotation: {
        create: 'function',
        remove: 'function',
        update: 'function',
      },
      physicalMapping: {
        update: 'function'
      },
      create: 'function',
      clone: 'function',
      deleteMany: 'function',
      functionality: {
        image: {
          create: 'function',
          list: 'function',
        },
      },
      get: 'function',
      list: 'function',
      preview: {
        get: 'function',
      },
      reports: {
        create: 'function',
        list: 'function',
      },
      snapshot: {
        list: 'function',
      },
      update: 'function',
    },
    uIConfig: {
      userFctGraphUIConfig: {
        put: 'function',
        get: 'function',
      },
      userUIConfig: {
        post: 'function',
      },
    },
    user: {
      notifications: {
        putAll: 'function',
        remove: 'function',
        deleteManyByTopic: 'function',
      },
      device: {
        get: 'function',
        list: 'function',
      },
      preview: {
        get: 'function',
      },
      createDeletionRequest: 'function',
      getChangelog: 'function',
      setCognitoIdentityId: 'function',
      acceptDeviceInvitation: 'function',
      get: 'function',
      getDeviceInvitations: 'function',
      licence: {
        list: 'function',
        add: 'function',
      },
      list: 'function',
      update: 'function',
      pusher: {
        subscriptions: {
          authorizeMany: 'function',
          device: {
            authorizeMany: 'function',
            process: {
              authorizeMany: 'function',
            },
          },
        },
      },
    },
    utils: {
      logClientError: 'function',
      getDocumentation: 'function',
      getMetrics: 'function',
    },
  }

  function testFunctionPresentInModule(functionName, module) {
    it(`exposes ${functionName}`, () => {
      expect(typeof module[functionName]).toBe('function')
    })
  }

  function testStringPresentInModule(stringExportName, module) {
    it(`exposes ${stringExportName}`, () => {
      expect(typeof module[stringExportName]).toBe('string')
    })
  }

  function assertValueFunctionOrObject(value) {
    // this check provides some safety on the MODULE_STRUCTURE above so it is not extended
    // with something unexpected unintentionally
    if (value !== 'function' && value !== 'string' && typeof value !== 'object') {
      throw new Error(`${value} must be string 'function', 'string' or an object`)
    }
  }

  function testExportAgainstNexus(exportName, exportValue, path) {
    assertValueFunctionOrObject(exportValue)

    switch (exportValue) {
      case 'function': {
        testFunctionPresentInModule(exportName, eval(path.join('.'))) // eslint-disable-line
        break
      }
      case 'string': {
        testStringPresentInModule(exportName, eval(path.join('.'))) // eslint-disable-line
        break
      }
      default: {
        testModuleStructure(exportValue, [ ...path, exportName ]) // eslint-disable-line
      }

    }
  }

  function testModuleContainsExpectedNumberOfExports(expectedModule, nexusModule) {
    const expectedNumberExports = Object.keys(expectedModule).length
    const numberExportsPresent = Object.keys(nexusModule).length

    it(`exports ${expectedNumberExports} functions/values + modules`, () => {
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
      nexus.configure()

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
      nexus.configure(connectionOpts)

      expect(Amplify.configure).toHaveBeenCalledWith(
        injectMerkelIntoArgObjectAndReturn(connectionOpts),
      )
    })
  })
})
