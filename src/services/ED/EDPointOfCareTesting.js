import Service from '../Service'

class EDPointOfCareTesting extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super(`api/${parameters.VisitType}/PointOfCareTesting`, parameters)
  }
}

export default EDPointOfCareTesting
