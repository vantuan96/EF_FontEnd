import _ from 'lodash'
import FormApi from '@/services/FormAPI.js'
export default {
  methods: {
    async saveConfirm (dataInfo) {
      await this.mapData2MDData()
      if (this.$refs.TblWithMasterData) {
        await this.$refs.TblWithMasterData.submit()
      }
      let DataSubmit = Object.assign({}, dataInfo.DataSubmit)
      console.log('dataInfo: ', dataInfo)
      new FormApi({VisitType: dataInfo.VisitType, VisitId: dataInfo.VisitId, FormCode: dataInfo.FormCode, hidemsg: true}).UpdateForm(dataInfo.Id, DataSubmit).then(res => {
        this.edited = false
      }).catch(e => {
        console.log('e', e)
      })
    },
    mapData () {
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(this.DataSubmit.Datas, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else {
                item.Value = exited.Value
              }
            } else {
              item.Value = null
            }
          })
        }
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.query.plan || !this.edited) {
      next()
      return
    }
    this.$modal.show('dialog', {
      title: this.__t('Cảnh báo'),
      text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
      class: 'v-dialog v-dialog-warning',
      buttons: [
        {
          title: this.__t('Đồng ý'),
          class: 'btn',
          handler: () => {
            next()
            this.$modal.hide('dialog')
          }
        },
        {
          title: this.__t('Hủy bỏ'),
          class: 'btn bg-yellow',
          handler: () => {
            next(false)
            this.$modal.hide('dialog')
          }
        }
      ]
    })
  }
}
