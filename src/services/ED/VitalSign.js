import Service from '../Service'

class VitalSign extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type = 'ED') {
    super(`api/${type}/VitalSign`, parameters)
  }
}

export default VitalSign
