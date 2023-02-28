module.exports = [{
  type: 'item',
  icon: 'fa fa-dashboard',
  name: 'Cuộc gọi nhỡ',
  active: true,
  router: {
    name: 'dashboard'
  },
  roles: 'MISSCALL'
}, {
  type: 'item',
  icon: 'fa fa-dashboard',
  name: 'Lịch sử cuộc gọi',
  active: true,
  router: {
    name: 'calllog'
  },
  roles: 'CALLLOG'
}, {
  type: 'item',
  icon: 'fa fa-dashboard',
  name: 'Lịch sử khách hàng',
  active: true,
  router: {
    name: 'leadcalllogs'
  },
  roles: 'LEAD'
}]
