import Service from './Service'

class ProblemList extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type = 'OPD') {
    super(`api/OhProblemList/${type}/`, parameters)
  }
}

export default ProblemList
