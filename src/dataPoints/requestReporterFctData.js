const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  (processId, reporterFctId) => API
    .post('datapoints', `processes/${processId}/functionalities/${reporterFctId}/downloadrequests`, { ...DEFAULT_REQ_OPTS }),
)
