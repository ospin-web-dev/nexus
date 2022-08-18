const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  ({ deviceId, fctGraphId }) => API.get('device', `${deviceId}/functionality-graphs/${fctGraphId}/physical-mappings`, { ...DEFAULT_REQ_OPTS }),
)
