import Service from './Service'

class ConfirmForms extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super(`api/EIO/ConfirmForms`, parameters)
  }
}

export default ConfirmForms
