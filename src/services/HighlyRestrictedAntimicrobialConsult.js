import Service from './Service'

class HighlyRestrictedAntimicrobialConsult extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type = 'ExxxD') {
    super(`api/${type}/HighlyRestrictedAntimicrobialConsult/`, parameters)
  }
}

export default HighlyRestrictedAntimicrobialConsult
