import Service from '../Service'

class GuggingSwallowingScreenChecked extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/GuggingSwallowingScreen/CheckFormLocked', parameters)
  }
}

export default GuggingSwallowingScreenChecked
