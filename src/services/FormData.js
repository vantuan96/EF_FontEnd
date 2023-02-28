import Service from './Service'

class FileProxy extends Service {
  constructor (parameters = {}) {
    super('api/masterdata-form', parameters)
  }
}

export default FileProxy
