const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  processId => API.get('datapoints', `processes/${processId}/downloadrequests`, { ...DEFAULT_REQ_OPTS }),
)
