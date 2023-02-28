export function formatNumber (value) {
  if (!value) return '0'
  const val = (value / 1).toFixed(0).replace('.', ',')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
export function sortDateArray (array) {
  if (array.length > 0) {
    array.forEach((items) => {
      if (items.UpdatedAt) {
        items.UpdatedAt = items.UpdatedAt.split(' ')[1].split('/').reverse().join('/') + ' ' + items.UpdatedAt.split(' ')[0]
      }
    })
    array.sort(function (a, b) {
      return new Date(b.UpdatedAt) - new Date(a.UpdatedAt)
    })
    array.forEach((items) => {
      if (items.UpdatedAt) {
        items.UpdatedAt = items.UpdatedAt.split(' ')[1] + ' ' + items.UpdatedAt.split(' ')[0].split('/').reverse().join('/')
      }
    })
  }
  return array
}
export function formatDateHourDDMMYYY (value) {
  if (!value) {
    return ''
  }
  const date = new Date(value)
  return (
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
    ':' +
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
    ':' +
    (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()) +
    ' ' +
    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
    '/' +
    (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
    '/' +
    date.getFullYear()
  )
}
export function formatDateHourMinutesDDMMYYY (value) {
  if (!value) {
    return ''
  }
  const date = new Date(value)
  return (
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
    ':' +
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
    ' ' +
    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
    '/' +
    (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
    '/' +
    date.getFullYear()
  )
}
export function formatDateDDMMYYY (value) {
  if (!value) {
    return ''
  }
  const date = new Date(value)
  return (
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
    ':' +
    (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()) +
    ' ' +
    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
    '/' +
    (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
    '/' +
    date.getFullYear()
  )
}
