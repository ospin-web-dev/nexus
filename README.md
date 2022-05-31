[![codecov](https://codecov.io/gh/ospin-web-dev/nexus/branch/main/graph/badge.svg?token=Js7X2xLEwB)](https://codecov.io/gh/ospin-web-dev/nexus)
[![Maintainability](https://api.codeclimate.com/v1/badges/a404fb8a258e6f46b81f/maintainability)](https://codeclimate.com/github/ospin-web-dev/nexus/maintainability)

This documentation is likely to remain sparse, as it is for internal use and under development!

[For additional documentation see our endpoint documentation](https://app.swaggerhub.com/apis-docs/OSPIN-Webapp/ospin-rest_api/latest)


---

## Table of Contents

- [Use Overview](#UseOverview)
  - [Configuration](#Configuration)
  - [Authenticating as a User](#Authenticating-as-a-User)
  - [Authenticating as a Device](#Authenticating-as-a-Device)
- [API Documentation](#API-documentation)
  - [Modules and their Methods](#modules-and-their-methods)
  - [Helper Methods](#helper-methods)
- [Use Examples](#Use-Examples)
- [Contributing](#Contributing)
- [Upcoming](#Upcoming)

---

## <a name="UseOverview">Use Overview</a>

The @ospin/nexus exposes a set of conveniences methods wrapping calls to the OSPIN AWS backend, JSON serving, rest-like, API. Unless a method is explicitly labeled as using a public endpoint, or otherwise stated, all nexus consumers must do the following before using the methods provided:
  - [configure the nexus for their environment](#Configuration)
  - authenticate [as a User](#Authenticating-as-a-User) or [as a Device](#Authenticating-as-a-Device)

#### <a name="Configuration">Configuration</a>
```js
const nexus = require('@ospin/nexus') // or import

nexus.connect({
  ENV: <oneOf['dev', 'staging', 'prod']>), // default: 'prod'
  AWS_REGION, // default: 'eu-central-1'
})
// -> { result, config }

// if you'd like to inspect the configuration object that `connect` is ultimately using:
nexus.createConfig() // <- returns the default configuration
nexus.createConfig({ ENV, AWS_REGION }) // <- returns a custom configuration
```

#### <a name="Authenticating-as-a-User">Authenticating as a User</a>

With the nexus configured, a user can authenticate as their OSPIN AWS Cognito user:
```js
const nexus = require('@ospin/nexus')

nexus.auth.signIn(<username>, <password>) // may require 2FA
```

#### <a name="Authenticating-as-a-Device">Authenticating as a Device</a>

With the nexus configured, a device can authenticate using its certificate:
```js
const nexus = require('@ospin/nexus')

nexus.createConfig()
nexus.connect()

nexus.deviceAPI.authentication.setCredentials({
  deviceId: <deviceId>,
  pathToCert: <pathToCert>
})


nexus.deviceAPI.validateAuthorization()
// -> { sucess, status, data, errorMsg }

```
---

## <a name="API-documentation">API Documentation</a>

#### <a name="modules-and-their-methods">Modules and their Methods</a>

```js
nexus
├── auth
│    ├── signIn(<username>, <password>) // may require 2FA
│    ├── signOut()
│    ├── globalSignOut()
│    └── getCurrentSession()
├── user
│    ├── get(<userId>) // may require 2FA
│    ├── list()
│    ├── delete(<userId>)
│    ├── update(<userId>, <userParamsObj>)
│    └── notifications
│         └── putAll(<notificationObj>)
├── command
│    └── device
│         └── process
│               └── startProcess(<deviceId>, <processId>)
├── datapoints
│    └── get(<processId>, <reporterFctId>, <params>)
├── device
│    ├── list()
│    ├── create(<deviceParamsObj>)
│    ├── createHeidolphCoreGateway(<deviceParamsObj>)
│    └── certificate
│         └── get(<deviceId>)
├── log
|    └── device
|         └── deleteMany(<deviceId>)
├── process
|    └── functionality
|         └── image
|              ├── create(<processId>, <fctId>, <body>)
|              └── list(<processId>, <fctId>, <opts>)
└── deviceAPI
     ├── authentication
     |    ├── setCredentials({ deviceId, pathToCert })
     |    └── validateAuthorization()
     └── process
          ├── get(<processId>)
          └── functionality
               └── image
                    ├── createFromUri(<processId>, <fctId>, <body>)
                    └── createFromFile(<processId>, <fctId>, <body>)
```


##### **All methods above return a standardized response object, e.g.:**
```js
const nexus = require('@ospin/nexus')

const {
  success: <boolean>,
  status: <100 - 500>, // HTTP response status code
  data: {}, // JSON safe object
  error: <errObj>, // the error if the request failed
  errorMsg: <string>, // a conveniently parsed error message
} = nexus.user.list()

```

#### <a name="helper-methods">Helper Methods</a>

```js
nexus
├── createConfig(connectionOpts) // See the #Configuration section above
└── connect(connectionOpts) // uses createConfig's returned object - sets the configuration to the nexus
```

---

## <a name="Use-Examples">Use Example</a>
```js
// getting the list representation of all devices (that the authenticated consumer is privileged to)
const nexus = require('@ospin/nexus')

nexus.connect()

const username = 'Nero Claudius Caesar Augustus Germanicus'
const password = 'BurnRomeToMakeANewPalace@Good-Plan-&-Ok-Password',

nexus.auth.signIn(username, password)

const {
  success: listDevicesWasSuccessful,
  data: devicesList,
  errorMsg: listDevicesErrorMsg,
  error: listDevicesError
} = nexus.device.list()

if (listDevicesWasSuccessful) {
  console.log(deviceList)
  // -> [ { ...deviceObj }, { ...deviceObj }, ... ]
} else {
  // kindly find out why...
  console.error(errorMsg)

  // ..or live up to the username and be an unforgiving and unyielding tyrant
  throw listDevicesError
  // -> 💣
}

```

---

## <a name="Contributing">Contributing</a>

This repo employs the github action [semantic-release](https://semantic-release.gitbook.io/semantic-release/), which, on approved PRs to `main`, sniffs the PR title/commit message to automatically bump the semantic versioning and publish the package to NPM.

All PRs to the `main` branch should indicate the semantic version change via the following options:

Available types:
 - feat: A new feature
 - fix: A bug fix
 - docs: Documentation only changes (unclear if this bumps version)
 - style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
 - refactor: A code change that neither fixes a bug nor adds a feature
 - perf: A code change that improves performance
 - test: Adding missing tests or correcting existing tests
 - build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
 - ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
 - chore: Other changes that don't modify src or test files
 - revert: Reverts a previous commit

---

