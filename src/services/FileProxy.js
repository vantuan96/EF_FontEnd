import Service from './Service'

class FileProxy extends Service {
  constructor (parameters = {}) {
    super('api/file', parameters)
  }
}

export default FileProxy
