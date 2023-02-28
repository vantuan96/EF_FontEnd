
import Service from '../Service'
class ConfirmDischargeWithoutDirect extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/IPDConfirmDischargeWithoutDirect', parameters)
  }
}

export default ConfirmDischargeWithoutDirect
