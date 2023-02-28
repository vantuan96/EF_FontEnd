import Service from '../Service'

class PregnancyFollowUpRecord extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/OPD/PregnancyFollowUpRecord', parameters)
  }
}

export default PregnancyFollowUpRecord
