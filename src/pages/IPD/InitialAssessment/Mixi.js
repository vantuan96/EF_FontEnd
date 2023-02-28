export default {
  data () {
    return {
      PainscoreSelect: []
    }
  },
  computed: {
  },
  created () {
    for (let index = 0; index < 10; index++) {
      this.PainscoreSelect.push({
        label: (index + 1).toString(),
        value: (index + 1).toString()
      })
    }
  },
  methods: {
    checkboxToRadio (item, type) {
      if (item) {
        this.MASTERDATA[type].Items.forEach(element => {
          if (element.Code !== item.Code) {
            if (this.checkString(element.DataType, 'Radio')) {
              element.Value = false
            }
            if (this.checkString(element.DataType, 'Text')) {
              element.Value = ''
            }
            if (this.checkString(element.DataType, 'Select')) {
              element.Value = ''
            }
          }
        })
      }
      setTimeout(() => {
        this.setIPDIAAUITV2(type)
      }, 300)
    },
    onIPDIAAUITV7 () {
      return this.MASTERDATA['IPDIAAUEADR'].Items[3].Value ||
        this.MASTERDATA['IPDIAAUHEAR'].Items[3].Value ||
        this.MASTERDATA['IPDIAAUTALK'].Items[3].Value ||
        this.MASTERDATA['IPDIAAUVISI'].Items[3].Value ||
        this.MASTERDATA['IPDIAAUDRES'].Items[3].Value ||
        this.MASTERDATA['IPDIAAUPEHY'].Items[3].Value ||
        this.MASTERDATA['IPDIAAUWALK'].Items[3].Value ||
        this.MASTERDATA['IPDIAAUTAME'].Items[3].Value
    },
    onIPDIAAUITV8 () {
      return this.MASTERDATA['IPDIAAUWLOG'].Items[1].Value ||
        this.MASTERDATA['IPDIAAUDIET'].Items[2].Value ||
        this.MASTERDATA['IPDIAAUSWAL'].Items[1].Value || this.MASTERDATA['IPDIAAUSWAL'].Items[2].Value ||
        this.MASTERDATA['IPDIAAUFERO'].Items[1].Value ||
        this.MASTERDATA['IPDIAAUBOHA'].Items[1].Value || this.MASTERDATA['IPDIAAUBOHA'].Items[2].Value
    },
    onIPDIAAUITV8New () {
      return this.MASTERDATA['IPDIAAUBOHA'].Items[2].Value || this.MASTERDATA['IPDIAAUBOHA'].Items[5].Value
    },
    onIPDIAAUITV9 () {
      return this.MASTERDATA['IPDIAAUURAS'].Items[2].Value || this.MASTERDATA['IPDIAAUURAS'].Items[3].Value
    },
    setIPDIAAUITV2 (type) {
      setTimeout(() => {
        try {
          if (['IPDIAAUALLE', 'IPDIAAUEDEM'].includes(type)) {
            this.MASTERDATA['IPDIAAUITV1'].Items[0].Value = this.MASTERDATA['IPDIAAUALLE'].Items[1].Value || this.MASTERDATA['IPDIAAUEDEM'].Items[1].Value
          }
          if (type === 'IPDIAAUREAS') {
            this.MASTERDATA['IPDIAAUITV3'].Items[0].Value = this.MASTERDATA['IPDIAAUREAS'].Items[4].Value
            this.MASTERDATA['IPDIAAUITV3'].Items[1].Value = this.MASTERDATA['IPDIAAUREAS'].Items[4].Value
          }
          if (type === 'IPDIAAUPASC') {
            this.MASTERDATA['IPDIAAUITV2'].Items[0].Value = this.parseInt(this.MASTERDATA['IPDIAAUPASC'].Items[1].Value) >= 4
          }
          if (type === 'IPDIAAUCOLO') {
            this.MASTERDATA['IPDIAAUITV4'].Items[0].Value = this.MASTERDATA['IPDIAAUCOLO'].Items[2].Value
          }
          if (type === 'IPDIAAUMEST') {
            this.MASTERDATA['IPDIAAUITV5'].Items[1].Value = this.MASTERDATA['IPDIAAUMEST'].Items[1].Value || this.MASTERDATA['IPDIAAUMEST'].Items[2].Value
          }
          if (type === 'IPDIAAUPSAS') {
            this.MASTERDATA['IPDIAAUITV6'].Items[0].Value = this.MASTERDATA['IPDIAAUPSAS'].Items[2].Value
          }
          if (type === 'IPDIAAUITV7') {
            this.MASTERDATA['IPDIAAUITV7'].Items[3].Value = this.onIPDIAAUITV7()
          }
          if (type === 'IPDIAAUITV8') {
            this.MASTERDATA['IPDIAAUITV8'].Items[0].Value = this.onIPDIAAUITV8()
          }
          if (type === 'IPDIAAUITV8NEW') {
            this.MASTERDATA['IPDIAAUITV8'].Items[2].Value = this.onIPDIAAUITV8New()
          }
          if (type === 'IPDIAAUITV9') {
            this.MASTERDATA['IPDIAAUITV9'].Items[0].Value = this.onIPDIAAUITV9()
          }
          /*
            this.MASTERDATA['IPDIAAUITV9'].Items[0].Value = this.MASTERDATA['IPDIAAUURAS'].Items[2].Value || this.MASTERDATA['IPDIAAUURAS'].Items[3].Value
            this.MASTERDATA['IPDIAAUITV2'].Items[0].Value = this.MASTERDATA['IPDIAAUPASC'].Items[1].Value >= 4
            this.MASTERDATA['IPDIAAUITV3'].Items[0].Value = this.MASTERDATA['IPDIAAUREAS'].Items[4].Value
            this.MASTERDATA['IPDIAAUITV3'].Items[1].Value = this.MASTERDATA['IPDIAAUREAS'].Items[4].Value
            this.MASTERDATA['IPDIAAUITV4'].Items[0].Value = this.MASTERDATA['IPDIAAUCOLO'].Items[2].Value
            this.MASTERDATA['IPDIAAUITV5'].Items[1].Value = this.MASTERDATA['IPDIAAUMEST'].Items[1].Value || this.MASTERDATA['IPDIAAUMEST'].Items[2].Value
            this.MASTERDATA['IPDIAAUITV6'].Items[0].Value = this.MASTERDATA['IPDIAAUPSAS'].Items[2].Value
            this.MASTERDATA['IPDIAAUITV7'].Items[3].Value = this.MASTERDATA['IPDIAAUEADR'].Items[3].Value ||
              this.MASTERDATA['IPDIAAUHEAR'].Items[3].Value ||
              this.MASTERDATA['IPDIAAUTALK'].Items[3].Value ||
              this.MASTERDATA['IPDIAAUVISI'].Items[3].Value ||
              this.MASTERDATA['IPDIAAUDRES'].Items[3].Value ||
              this.MASTERDATA['IPDIAAUPEHY'].Items[3].Value ||
              this.MASTERDATA['IPDIAAUWALK'].Items[3].Value ||
              this.MASTERDATA['IPDIAAUTAME'].Items[3].Value
            this.MASTERDATA['IPDIAAUITV8'].Items[0].Value = this.MASTERDATA['IPDIAAUWLOG'].Items[1].Value ||
              this.MASTERDATA['IPDIAAUDIET'].Items[2].Value ||
              this.MASTERDATA['IPDIAAUSWAL'].Items[1].Value || this.MASTERDATA['IPDIAAUSWAL'].Items[2].Value ||
              this.MASTERDATA['IPDIAAUFERO'].Items[1].Value ||
              this.MASTERDATA['IPDIAAUBOHA'].Items[1].Value || this.MASTERDATA['IPDIAAUBOHA'].Items[2].Value
          */
        } catch (error) {
          console.log(error)
        }
      })
    }
  }
}
