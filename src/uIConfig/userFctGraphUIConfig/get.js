const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  ({ userId, fctGraphId }) => API.get(
    'uiconfig',
    `users/${userId}/functionality-graphs/${fctGraphId}`,
    DEFAULT_REQ_OPTS,
  ),
)
