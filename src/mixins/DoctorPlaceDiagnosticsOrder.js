import EventBus from '@/lib/eventBus'
export default {
  data () {
    return {
    }
  },
  methods: {
    setViewItem (charge) {
      this.$store.dispatch('PlaceDiagnostics/setViewItem', charge)
    },
    getServiceType (service) {
      if (service.ServiceGroupCode.includes('FB.01')) return 1
      if (service.ServiceGroupCode.includes('FB.05')) return 0
    },
    find (data) {
      this.$store.dispatch('PlaceDiagnostics/find', data)
    },
    update (data) {
      this.$store.dispatch('PlaceDiagnostics/update', data)
    },
    add (data) {
      this.$store.dispatch('PlaceDiagnostics/add', data)
    },
    addPackage (items) {
      this.$store.dispatch('PlaceDiagnostics/addPackage', items)
    },
    removePackage (itemId) {
      this.$store.dispatch('PlaceDiagnostics/removePackage', itemId)
    },
    remove (data) {
      EventBus.$emit('removeEventService', data)
      this.$store.dispatch('PlaceDiagnostics/remove', data)
    },
    removeAll (data) {
      this.$store.dispatch('PlaceDiagnostics/removeAll')
    },
    edit (item) {
      console.log(item)
      this.$store.dispatch('PlaceDiagnostics/setEditItem', item)
    },
    isNoPrice (price) {
      return price === null || price === undefined || price < 0
    },
    isValidateDataMicrobiology (e) {
      var item001 = (localStorage.getItem('MICROBIOLOGY_SERVICE_01') || '').split(',')
      var item002 = (localStorage.getItem('MICROBIOLOGY_SERVICE_02') || '').split(',')
      if (item001.includes(e.Code) && (!e.Microbiology || !e.Microbiology.STypeGroupID || !e.Microbiology.STypeID)) {
        return false
      }
      if (item002.includes(e.Code) && (!e.Microbiology || !e.Microbiology.STypeGroupID || !e.Microbiology.STypeID || !e.Microbiology.Stratified)) {
        return false
      }
      return true
    }
  }
}
