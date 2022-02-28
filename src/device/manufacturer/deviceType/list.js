const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  ({ manufacturerId }) => API.get('device', `manufacturers/${manufacturerId}/deviceTypes`, { ...DEFAULT_REQ_OPTS }),
)
