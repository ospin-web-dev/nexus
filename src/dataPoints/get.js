const API = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  (processId, reporterFctId, params) => API.get('datapoints', `processes/${processId}/functionalities/${reporterFctId}?numberOfPoints=${params.numberOfPoints}&start=${params.start}&end=${params.end}`, { ...DEFAULT_REQ_OPTS }),
)
