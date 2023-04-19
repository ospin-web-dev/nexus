const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc updates a functionality description
 * @memberof nexus.deviceDescription.functionaltiyDescription
 * @function create
 * @async
 * @param {string} functionaltiyDescriptionId
 * @param {Object} params
 * @param {string} [params.displayName]
 * @param {string} [params.description]
 * @param {string} [params.iconURL]
 * @param {string} [params.inputDescriptionImageURL]
 * @param {string} [params.imageURL]
 * @param {array} [params.slotRelations]
 * @param {array} [params.slotDescriptions]
 * @param {boolean} [params.safeForCustomerUse]
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (functionaltiyDescriptionId, params) => API.post(
    'device-description',
    `functionality-descriptions/${functionaltiyDescriptionId}`,
    { body: params, ...DEFAULT_REQ_OPTS },
  ),
)
