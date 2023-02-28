import Service from '../Service'

class BloodRequestSupplyAndConfirmation extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, visitType = 'ED') {
    super(`api/${visitType}/BloodRequestSupplyAndConfirmation/`, parameters)
  }
}

export default BloodRequestSupplyAndConfirmation
