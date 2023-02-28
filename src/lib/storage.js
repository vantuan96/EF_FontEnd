var storage = {
  set: function (key, value) {
    localStorage.setItem(key, value)
  },
  get: function (key) {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (error) {
      return null
    }
  },
  removeItem: function (key) {
    localStorage.removeItem(key)
  },
  clear: function () {
    localStorage.clear()
  }
}
export default storage
