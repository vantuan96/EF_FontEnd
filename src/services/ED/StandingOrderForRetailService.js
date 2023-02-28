import Service from '../Service'

class StandingOrderForRetailService extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type = 'ED') {
    super(`api/${type}/StandingOrderForRetailService/`, parameters)
  }
}

export default StandingOrderForRetailService
