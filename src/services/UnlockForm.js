import Service from './Service'

class UnlockForm extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/UnLock', parameters)
  }
}

export default UnlockForm
