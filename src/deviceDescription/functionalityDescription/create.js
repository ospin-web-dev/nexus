const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc creates a new functionality description
 * @memberof nexus.deviceDescription.functionaltiyDescription
 * @function create
 * @async
 * @param {Object} body
 * @param {string} body.functionaltiyDescription.subType
 * @param {string} [body.functionaltiyDescription.displayName=null]
 * @param {string} [body.functionaltiyDescription.description=null]
 * @param {string} [body.functionaltiyDescription.iconURL=null]
 * @param {string} [body.functionaltiyDescription.inputDescriptionImageURL=null]
 * @param {string} [body.functionaltiyDescription.imageURL=null]
 * @param {array} [body.functionaltiyDescription.slotRelations=[]]
 * @param {array} [body.functionaltiyDescription.slotDescriptions=[]]
 * @param {boolean} [body.functionaltiyDescription.safeForCustomerUse=false]
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  body => API.post('device-description', 'functionality-descriptions', { body, ...DEFAULT_REQ_OPTS }),
)
