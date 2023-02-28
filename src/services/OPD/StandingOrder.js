import Service from '../Service'

class OPDStandingOrderService extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type = 'OPD') {
    super(`api/${type}/StandingOrder/`, parameters)
  }
}

export default OPDStandingOrderService
