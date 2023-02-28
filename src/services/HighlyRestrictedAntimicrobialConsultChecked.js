import Service from './Service'

class HighlyRestrictedAntimicrobialConsultChecked extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type = 'ExxxD') {
    super(`api/${type}/HighlyRestrictedAntimicrobialConsult/CheckFormLocked/`, parameters)
  }
}

export default HighlyRestrictedAntimicrobialConsultChecked
