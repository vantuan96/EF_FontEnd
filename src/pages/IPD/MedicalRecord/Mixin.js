import utils from '@/utils'
import MedicalRecord from '@/services/IPD/MedicalRecord'
import _ from 'lodash'
export default {
  data () {
    return {
      MAPPINGDATA: {
        'upstream/downstreamtransfer': [
          'IPDRH1', 'IPDRFT1', 'IPDTM1', 'IPDNTM', 'IPDTD0', 'IPDMRPTCHVI'
        ],
        inhospital: [],
        nonhospitalization: [],
        waitingresults: [],
        waitingforresult: [],
        transfer: ['IPDMRPTLDCK', 'IPDMRPTNONH'],
        discharged: ['IPDMRPTCDRV', 'IPDMRPTHTRV', 'IPDMRPGRV01'],
        interhospitaltransfer: ['IPDRH0', 'IPDRFT', 'IPDNRH', 'IPDTM0', 'IPDNAT', 'IPDMRPTCHVH'],
        dead: ['IPDMRPTNGTV', 'IPDMRPTLDTV', 'IPDMRPTTTTV', 'IPDMRPTICDT', 'IPDMRPTBCTV', 'IPDMRPTKNTT', 'IPDMRPTICDK', 'IPDMRPTBCKN'],
        completetreatment: ['IPDMRPTCDRV', 'IPDMRPTHTRV', 'IPDMRPGRV01']
      },
      CreateBy: {},
      UpdateBy: {},
      valueOfPatientIllnessAndAssessmentEye: ''
    }
  },
  methods: {
    syncLastData (response) {
      if (response.IsNew) {
        new MedicalRecord().update('SyncDiagnosisAndICD/', {Id: this._VisitId, hidemsg: true, noLoading: true}).then(response => {
        })
      }
    },
    SyncDiagnosisAndICD () {
      new MedicalRecord({hidemsg: true, noLoading: true}).update('SyncDiagnosisAndICD/', {Id: this._VisitId, hidemsg: true, noLoading: true}).then(response => {
        if (response.InPrimaryDiagnosis && this.MASTERDATA['IPDMRPTCDBC']) {
          this.MASTERDATA['IPDMRPTCDBC'].Items.forEach(item => {
            if (item.Code === 'IPDMRPTCDBCANS' && !item.Value) {
              item.Value = response.InPrimaryDiagnosis
            }
          })
        }
        if (response.InPrimaryICD && this.MASTERDATA['IPDMRPTICDC']) {
          this.MASTERDATA['IPDMRPTICDC'].Items.forEach(item => {
            if (item.Code === 'IPDMRPTICDCANS' && (!item.Value || !(item.Value.filter(e => e)).length)) {
              item.Value = response.InPrimaryICD.filter(e => e.code).map(e => {
                if (!e.label) e.label = e.code
                return e
              })
            }
          })
        }
        if (response.OutPrimaryDiagnosis && this.MASTERDATA['IPDMRPECDBC']) {
          this.MASTERDATA['IPDMRPECDBC'].Items.forEach(item => {
            if (item.Code === 'IPDMRPECDBCANS' && !item.Value) {
              item.Value = response.OutPrimaryDiagnosis
            }
          })
        }
        if (response.OutPrimaryICD && this.MASTERDATA['IPDMRPEICDC']) {
          this.MASTERDATA['IPDMRPEICDC'].Items.forEach(item => {
            if (item.Code === 'IPDMRPEICDCANS' && (!item.Value || !(item.Value.filter(e => e)).length)) {
              item.Value = response.OutPrimaryICD.filter(e => e.code).map(e => {
                if (!e.label) e.label = e.code
                return e
              })
            }
          })
        }
        if (response.OutOptionDiagnosis && this.MASTERDATA['IPDMRPECDKT']) {
          this.MASTERDATA['IPDMRPECDKT'].Items.forEach(item => {
            if (item.Code === 'IPDMRPECDKTANS' && !item.Value) {
              item.Value = response.OutOptionDiagnosis
            }
          })
        }
        if (response.OutOptionICD && this.MASTERDATA['IPDMRPEICDP']) {
          this.MASTERDATA['IPDMRPEICDP'].Items.forEach(item => {
            if (item.Code === 'IPDMRPEICDPANS' && (!item.Value || !(item.Value.filter(e => e)).length)) {
              item.Value = response.OutOptionICD.filter(e => e.code).map(e => {
                if (!e.label) e.label = e.code
                return e
              })
            }
          })
        }
        setTimeout(() => {
          // this.SyncDiagnosisAndICD()
        }, 10 * 1000)
      }).catch(e => {
        this._401ResponseError(e)
      })
    },
    getDataSubmit () {
      var obj = {}
      this.DataSubmit.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var val = item.Value
            if (this.icd10Code.includes(item.Code)) {
              val = JSON.stringify(item.Value)
            }
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: val,
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }
      if (!obj['IPDMRPEGIPBYES']) {
        this.resetMdDataByCode(['IPDMRPEGIPBLAT', 'IPDMRPEGIPBNGN', 'IPDMRPEGIPBACT', 'IPDMRPEBEPHANS'])
      }
      var status = (this.DataSubmit.Status ? utils.cleanSearchKey(this.DataSubmit.Status.EnName, '') : 'DONOTHING').replace(/-+/g, '')
      this.DataSubmit.GeneralDatas.forEach(g => {
        // debugger
        if (!this.MAPPINGDATA[status].includes(g.Group)) {
          if (g.Code !== 'IPDMRPG1001') {
            g.Value = ''
          }
        }
      })
      return Object.assign({}, this.DataSubmit)
    },
    resetMdData (key) {
      if (!this.MASTERDATA[key]) return
      this.MASTERDATA[key].Items.forEach(item => {
        item.Value = null
      })
      this.DataSubmit.Datas.forEach(item => {
        if (item.Group === key) {
          item.Value = null
        }
      })
    },
    resetMdDataByCode (current) {
      this.DataSubmit.Datas.forEach(item => {
        if (current.includes(item.Code)) {
          item.Value = null
        }
      })
    },
    updateGeneralDatas () {
    },
    confirmPopup (nameRoute, formName) {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.$t('Th??ng b??o'),
        text: this.$t(`T???o m???i B???NH ??N ${nameRoute} - ${formName}`),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.$t('T??i x??c nh???n'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.create()
            }
          },
          {
            title: this.$t('B??? qua'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    pushCreateBy (CreateBy) {
      this.CreateBy = CreateBy
    },
    pushUpdateBy (UpdateBy) {
      this.UpdateBy = UpdateBy
    },
    getIndex (str) {
      let array = []
      for (let i = 0; i < 50; i++) {
        array.push(i + '.')
      }
      if (str === 'Pediatric') {
        array[4] = ''
        array[5] = '4.'
        array[6] = '5.'
        array[7] = '6.'
        array[8] = ''
        array[9] = '8.'
        array[10] = '9.'
        array[11] = '10.'
        array[20] = '19.'
        for (let i = 21; i < 30; i++) {
          array[i] = (i - 1) + '.'
        }
      }
      if (str === 'Neonatal') {
        for (let i = 5; i < 8; i++) {
          array[i] = (i + 1) + '.'
        }
      }
      if (str === 'Obstetrics') {
        array[3] = ''
        for (let i = 4; i < 12; i++) {
          array[i] = (i - 1) + '.'
        }
        array[20] = 19 + '. '
        array[21] = 20 + '. '
        for (let i = 24; i < 35; i++) {
          array[i] = (i + 5) + '.'
        }
      }
      if (str === 'Gynecological') {
        if (str !== 'A01_040_050919_V' && str !== 'A01_039_050919_V') array[3] = ''
        for (let i = 4; i < 12; i++) {
          array[i] = (i - 1) + '.'
        }
        array[20] = 19 + '. '
        array[21] = 20 + '. '
        for (let i = 23; i < 35; i++) {
          array[i] = (i + 1) + '.'
        }
      }
      if (str === 'A01_195_050919_V' || str === 'Oncology') {
        for (let i = 23; i < 50; i++) {
          array[i] = (i + 2) + '.'
        }
      }
      if (str === 'Eye') {
        for (let i = 24; i < 50; i++) {
          array[i] = (i + 2) + '.'
        }
      }
      if (str === 'A01_040_050919_V' || str === 'A01_039_050919_V') {
        array[20] = 20 + '. '
        array[21] = 21 + '. '
        for (let i = 24; i < 35; i++) {
          array[i] = (i + 2) + '.'
        }
      }
      return array
    },
    async getDataFillBAEye (FormCode, noneDex) {
      // ?????ng b??? t??? c??c b???nh ??n
      await new MedicalRecord().update('Part3/SyncHistoryOfPatientIllnessAndAssessment' + '/' + FormCode + '?hidemsg=' + true, {Id: this._VisitId}).then(response => {
        let data = response.map(m => {
          return this.removeIndexText(m.ViName) + ': ' + (m.Value || '')
        })
        if (data.length) {
          this.valueOfPatientIllnessAndAssessmentEye = this.changeDataSyncBaseEye(response, noneDex)
        }
      })
    },
    removeIndexText (value) {
      var t = this.trim_(value, '1. ')
      t = this.trim_(t, '2. ')
      t = this.trim_(t, '3. ')
      t = this.trim_(t, '4. ')
      t = this.trim_(t, '5. ')
      return t
    },
    changeDataSyncBaseEye (data, noneDex) {
      let str = ''
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(data, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'Painting')) console.log(exited.Value)
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else {
                item.Value = exited.Value
              }
            }
          })
        }
      }
      if (this.MASTERDATA['IPDMRPT1051'] && this.MASTERDATA['IPDMRPT1053'] && this.MASTERDATA['IPDMRPT1055'] && !noneDex) {
        str += 'B???nh s???:\n'
        if (this.MASTERDATA['IPDMRPT1051'].Items[0].Value) {
          str += '   + ' + this.MASTERDATA['IPDMRPT1051'].ViName + ': ' + this.MASTERDATA['IPDMRPT1051'].Items[0].Value
          str += '\n'
        }
        if (this.MASTERDATA['IPDMRPT1053'].Items[0].Value) {
          str += '   + ' + this.MASTERDATA['IPDMRPT1053'].ViName + ': ' + this.MASTERDATA['IPDMRPT1053'].Items[0].Value
          str += '\n'
        }
        if (this.MASTERDATA['IPDMRPT1055'].Items[0].Value) {
          str += '   + ' + this.MASTERDATA['IPDMRPT1055'].ViName + ': ' + this.MASTERDATA['IPDMRPT1055'].Items[0].Value
          str += '\n'
        }
      }
      // M???T PH???I
      for (const property in this.MASTERDATA) {
        if (property.includes('TR')) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              if (item.Value && !str.includes('M???T PH???I\n')) {
                str += 'M???T PH???I\n'
              }
            })
          }
        }
      }
      // 1
      if (this.getValueOfMASTERDATA('IPDMRPTR1079', 'IPDMRPTR1080') || this.getValueOfMASTERDATA('IPDMRPTR1081', 'IPDMRPTR1082') || this.getValueOfMASTERDATA('IPDMRPTR1083', 'IPDMRPTR1084') || this.getValueOfMASTERDATA('IPDMRPTR1085', 'IPDMRPTR1086')) {
        str += '1. Th??? l???c: '
        str += '\n'
      }
      if (this.getValueOfMASTERDATA('IPDMRPTR1079', 'IPDMRPTR1080')) {
        str += '   + ' + 'Kh??ng k??nh: ' + this.getValueOfMASTERDATA('IPDMRPTR1079', 'IPDMRPTR1080')
        str += '\n'
      }
      if (this.getValueOfMASTERDATA('IPDMRPTR1081', 'IPDMRPTR1082')) {
        str += '   + ' + 'Qua l???: ' + this.getValueOfMASTERDATA('IPDMRPTR1081', 'IPDMRPTR1082')
        str += '\n'
      }
      if (this.getValueOfMASTERDATA('IPDMRPTR1083', 'IPDMRPTR1084')) {
        str += '   + ' + 'C?? ch???nh k??nh: ' + this.getValueOfMASTERDATA('IPDMRPTR1083', 'IPDMRPTR1084')
        str += '\n'
      }
      if (this.getValueOfMASTERDATA('IPDMRPTR1085', 'IPDMRPTR1086')) {
        str += '   + ' + 'Nh??n g???n: ' + this.getValueOfMASTERDATA('IPDMRPTR1085', 'IPDMRPTR1086')
        str += '\n'
      }
      // 2
      if (this.getValueOfMASTERDATA('IPDMRPTR1087', 'IPDMRPTR1088')) {
        str += '2. Nh??n ??p: ' + this.getValueOfMASTERDATA('IPDMRPTR1087', 'IPDMRPTR1088')
        str += '\n'
      }
      // 3
      if (this.getValueOfMASTERDATA('IPDMRPTR1089', 'IPDMRPTR1090')) {
        str += '3. L??c v?? v???n nh??n: ' + this.getValueOfMASTERDATA('IPDMRPTR1089', 'IPDMRPTR1090')
        str += '\n'
      }
      if (this.getValueOfMASTERDATA('IPDMRPTR1091', 'IPDMRPTR1092')) {
        str += '   + B??m l??? qu???n: N?????c tho??t t???t'
        str += '\n'
      }
      // 4
      if (this.getValueOfMASTERDATA('IPDMRPTR1093', 'IPDMRPTR1094') || this.getValueOfMASTERDATA('IPDMRPTR1093', 'IPDMRPTR1095')) {
        str += '4. L??? ?????o:'
        if (this.getValueOfMASTERDATA('IPDMRPTR1093', 'IPDMRPTR1094')) {
          str += ' Tr??o l??? qu???n ?????i di??n'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1093', 'IPDMRPTR1095')) {
          str += ', Tr??o t???i ch???'
        }
        str += '\n'
      }
      // 5
      if (this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1097') ||
      this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1098') ||
      this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1099') ||
      this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1100') ||
      this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1101') ||
      this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1102') ||
      this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1103') ||
      this.getValueOfMASTERDATA('IPDMRPTR1109', 'IPDMRPTR1110') ||
      this.getValueOfMASTERDATA('IPDMRPTR1114', 'IPDMRPTR1115') ||
      this.getValueOfMASTERDATA('IPDMRPTR1114', 'IPDMRPTR1116') ||
      this.getValueOfMASTERDATA('IPDMRPTR1114', 'IPDMRPTR1117') ||
      this.getValueOfMASTERDATA('IPDMRPTR1114', 'IPDMRPTR1118') ||
      this.getValueOfMASTERDATA('IPDMRPTR1119', 'IPDMRPTR1120')) {
        str += '5. Mi m???t:'
        if (this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1097')) {
          str += ', B??nh th?????ng'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1098')) {
          str += ', Ph??'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1099')) {
          str += ', Ch???p'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1100')) {
          str += ', L???o'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1101')) {
          str += ', S???o da mi'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1102')) {
          str += ', S???p mi'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1103')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1104')) {
            str += ', Kh??c: ' + this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1104')
          } else {
            str += ', Kh??c'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1105')) {
          str += ', Qu???m'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1106')) {
          str += ', H??? mi'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1107')) {
          str += ', Tr??? mi'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1109', 'IPDMRPTR1110')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1109', 'IPDMRPTR1111') || this.getValueOfMASTERDATA('IPDMRPTR1109', 'IPDMRPTR1112') || this.getValueOfMASTERDATA('IPDMRPTR1109', 'IPDMRPTR1113')) {
            str += '\n   + U mi: '
            if (this.getValueOfMASTERDATA('IPDMRPTR1109', 'IPDMRPTR1111')) {
              str += 'T??nh ch???t U: ' + this.getValueOfMASTERDATA('IPDMRPTR1109', 'IPDMRPTR1111')
            }
            if (this.getValueOfMASTERDATA('IPDMRPTR1109', 'IPDMRPTR1112')) {
              str += ', V??? tr??: ' + this.getValueOfMASTERDATA('IPDMRPTR1109', 'IPDMRPTR1112')
            }
            if (this.getValueOfMASTERDATA('IPDMRPTR1109', 'IPDMRPTR1113')) {
              str += ', K??ch th?????c: ' + this.getValueOfMASTERDATA('IPDMRPTR1109', 'IPDMRPTR1113')
            }
          } else {
            str += '\n   + U mi'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1108')) {
          str += '\n   + Vi??m b??? mi (ch??n l??ng mi)'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1114', 'IPDMRPTR1115') ||
        this.getValueOfMASTERDATA('IPDMRPTR1114', 'IPDMRPTR1116') ||
        this.getValueOfMASTERDATA('IPDMRPTR1114', 'IPDMRPTR1117') ||
        this.getValueOfMASTERDATA('IPDMRPTR1114', 'IPDMRPTR1118')) {
          str += '\n   + Tuy???n b??? mi:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1114', 'IPDMRPTR1115')) {
            str += ' B??nh th?????ng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1114', 'IPDMRPTR1116')) {
            str += ', Vi??m t???c nh???'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1114', 'IPDMRPTR1117')) {
            str += ', V???a'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1114', 'IPDMRPTR1118')) {
            str += ', N???ng'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1119', 'IPDMRPTR1120')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1119', 'IPDMRPTR1121')) {
            str += '\n   + T???n th????ng kh??c: ' + this.getValueOfMASTERDATA('IPDMRPTR1119', 'IPDMRPTR1121')
          } else {
            str += '\n   + T???n th????ng kh??c'
          }
        }
        str += '\n'
      }
      // 6
      if (this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1123') ||
      this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1124') ||
      this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1125') ||
      this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1126') ||
      this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1127') ||
      this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1128') ||
      this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1129') ||
      this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1130') ||
      this.getValueOfMASTERDATA('IPDMRPTR1131', 'IPDMRPTR1132') ||
      this.getValueOfMASTERDATA('IPDMRPTR1136', 'IPDMRPTR1137') ||
      this.getValueOfMASTERDATA('IPDMRPTR1136', 'IPDMRPTR1138') ||
      this.getValueOfMASTERDATA('IPDMRPTR1136', 'IPDMRPTR1139') ||
      this.getValueOfMASTERDATA('IPDMRPTR1140', 'IPDMRPTR1141')) {
        str += '6. K???t m???c:'
        if (this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1123') ||
        this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1124')) {
          str += '\n   + C????ng t???:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1123')) {
            str += ' To??? lan'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1124')) {
            str += ', R??a'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1125') ||
          this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1126') ||
          this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1127') ||
          this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1128') ||
          this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1129') ||
          this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1130')) {
          str += '\n   +'
          if (this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1125')) {
            str += ' , Ph?? n???'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1126')) {
            str += ', Xu???t huy???t'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1127')) {
            str += ', S???ng ho??'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1128')) {
            str += ', Nh??'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1129')) {
            str += ', H???t'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1130')) {
            str += ', S???o'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1131', 'IPDMRPTR1132')) {
          str += '\n   + U k???t m???c:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1131', 'IPDMRPTR1133')) {
            str += ' T??nh ch???t: ' + this.getValueOfMASTERDATA('IPDMRPTR1131', 'IPDMRPTR1133')
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1131', 'IPDMRPTR1134')) {
            str += ', V??? tr??: ' + this.getValueOfMASTERDATA('IPDMRPTR1131', 'IPDMRPTR1134')
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1131', 'IPDMRPTR1135')) {
            str += ', K??ch th?????c: ' + this.getValueOfMASTERDATA('IPDMRPTR1131', 'IPDMRPTR1135')
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1136', 'IPDMRPTR1137') ||
        this.getValueOfMASTERDATA('IPDMRPTR1136', 'IPDMRPTR1138') ||
        this.getValueOfMASTERDATA('IPDMRPTR1136', 'IPDMRPTR1139')) {
          str += '\n   + C??ng ?????:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1136', 'IPDMRPTR1137')) {
            str += ' B??nh th?????ng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1136', 'IPDMRPTR1138')) {
            str += ', C???n'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1136', 'IPDMRPTR1139')) {
            str += ', D??nh'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1140', 'IPDMRPTR1141')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1140', 'IPDMRPTR1142')) {
            str += '\n   + T???n th????ng kh??c: ' + this.getValueOfMASTERDATA('IPDMRPTR1140', 'IPDMRPTR1142')
          } else {
            str += '\n   + T???n th????ng kh??c: '
          }
        }
        str += '\n'
      }
      // 7
      if (this.getValueOfMASTERDATA('IPDMRPTR1662', 'IPDMRPTR1663') ||
      this.getValueOfMASTERDATA('IPDMRPTR1662', 'IPDMRPTR1664') ||
      this.getValueOfMASTERDATA('IPDMRPTR1662', 'IPDMRPTR1665') ||
      this.getValueOfMASTERDATA('IPDMRPTR1666', 'IPDMRPTR1667') ||
      this.getValueOfMASTERDATA('IPDMRPTR1666', 'IPDMRPTR1668') ||
      this.getValueOfMASTERDATA('IPDMRPTR1666', 'IPDMRPTR1669') ||
      this.getValueOfMASTERDATA('IPDMRPTR1154', 'IPDMRPTR1155') ||
      this.getValueOfMASTERDATA('IPDMRPTR1154', 'IPDMRPTR1156') ||
      this.getValueOfMASTERDATA('IPDMRPTR1154', 'IPDMRPTR1157') ||
      this.getValueOfMASTERDATA('IPDMRPTR1170', 'IPDMRPTR1171') ||
      this.getValueOfMASTERDATA('IPDMRPTR1170', 'IPDMRPTR1172') ||
      this.getValueOfMASTERDATA('IPDMRPTR1170', 'IPDMRPTR1173') ||
      this.getValueOfMASTERDATA('IPDMRPTR1170', 'IPDMRPTR1174') ||
      this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1138') ||
      this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1139') ||
      this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1137') ||
      this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1138') ||
      this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1139') ||
      this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1137') ||
      this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1138') ||
      this.getValueOfMASTERDATA('IPDMRPTR1193', 'IPDMRPTR1194') ||
      this.getValueOfMASTERDATA('IPDMRPTR1193', 'IPDMRPTR1195') ||
      this.getValueOfMASTERDATA('IPDMRPTR1193', 'IPDMRPTR1196') ||
      this.getValueOfMASTERDATA('IPDMRPTR1206', 'IPDMRPTR1207') ||
      this.getValueOfMASTERDATA('IPDMRPTR1206', 'IPDMRPTR1208') ||
      this.getValueOfMASTERDATA('IPDMRPTR1206', 'IPDMRPTR1209') ||
      this.getValueOfMASTERDATA('IPDMRPTR1210', 'IPDMRPTR1211') ||
      this.getValueOfMASTERDATA('IPDMRPTR1210', 'IPDMRPTR1212') ||
      this.getValueOfMASTERDATA('IPDMRPTR1210', 'IPDMRPTR1213') ||
      this.getValueOfMASTERDATA('IPDMRPTR1214', 'IPDMRPTR1215') ||
      this.getValueOfMASTERDATA('IPDMRPTR1214', 'IPDMRPTR1216') ||
      this.getValueOfMASTERDATA('IPDMRPTR1217', 'IPDMRPTR1218')) {
        str += '7. Gi??c m???c: '
        if (this.getValueOfMASTERDATA('IPDMRPTR1662', 'IPDMRPTR1663') ||
        this.getValueOfMASTERDATA('IPDMRPTR1662', 'IPDMRPTR1664') ||
        this.getValueOfMASTERDATA('IPDMRPTR1662', 'IPDMRPTR1665')) {
          str += '\n   + K??ch th?????c:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1662', 'IPDMRPTR1663')) {
            str += ' B??nh th?????ng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1662', 'IPDMRPTR1664')) {
            str += ', To'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1662', 'IPDMRPTR1665')) {
            str += ', Nh???'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1666', 'IPDMRPTR1667') ||
        this.getValueOfMASTERDATA('IPDMRPTR1666', 'IPDMRPTR1668') ||
        this.getValueOfMASTERDATA('IPDMRPTR1666', 'IPDMRPTR1669')) {
          str += '\n   + H??nh d???ng:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1666', 'IPDMRPTR1667')) {
            str += ' B??nh th?????ng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1666', 'IPDMRPTR1668')) {
            str += ', N??n'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1666', 'IPDMRPTR1669')) {
            str += ', C???u'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1154', 'IPDMRPTR1155') ||
          this.getValueOfMASTERDATA('IPDMRPTR1154', 'IPDMRPTR1156') ||
          this.getValueOfMASTERDATA('IPDMRPTR1154', 'IPDMRPTR1157')) {
          str += '\n   + Bi???u m??:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1154', 'IPDMRPTR1155')) {
            str += '\n     + B??nh th?????ng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1154', 'IPDMRPTR1156')) {
            if (this.getValueOfMASTERDATA('IPDMRPTR1159', 'IPDMRPTR1160') ||
            this.getValueOfMASTERDATA('IPDMRPTR1159', 'IPDMRPTR1161') ||
            this.getValueOfMASTERDATA('IPDMRPTR1159', 'IPDMRPTR1162') ||
            this.getValueOfMASTERDATA('IPDMRPTR1163', 'IPDMRPTR1164') ||
            this.getValueOfMASTERDATA('IPDMRPTR1163', 'IPDMRPTR1165') ||
            this.getValueOfMASTERDATA('IPDMRPTR1163', 'IPDMRPTR1166')) {
              str += '\n     + T???n th????ng d???ng ch???m:'
              if (this.getValueOfMASTERDATA('IPDMRPTR1167', 'IPDMRPTR1168')) {
                str += ' Tho??i ho?? d???i b??ng'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1167', 'IPDMRPTR1169')) {
                str += ', L???ng ?????ng thu???c'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1159', 'IPDMRPTR1160') ||
              this.getValueOfMASTERDATA('IPDMRPTR1159', 'IPDMRPTR1161') ||
              this.getValueOfMASTERDATA('IPDMRPTR1159', 'IPDMRPTR1162')) {
                str += '\n       + Ph?? b???ng bi???u m??:'
                if (this.getValueOfMASTERDATA('IPDMRPTR1159', 'IPDMRPTR1160')) {
                  str += ' Nh???'
                }
                if (this.getValueOfMASTERDATA('IPDMRPTR1159', 'IPDMRPTR1161')) {
                  str += ', V???a'
                }
                if (this.getValueOfMASTERDATA('IPDMRPTR1159', 'IPDMRPTR1162')) {
                  str += ', N???ng'
                }
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1163', 'IPDMRPTR1164') ||
              this.getValueOfMASTERDATA('IPDMRPTR1163', 'IPDMRPTR1165') ||
              this.getValueOfMASTERDATA('IPDMRPTR1163', 'IPDMRPTR1166')) {
                str += '\n       + B??? t???n th????ng:'
                if (this.getValueOfMASTERDATA('IPDMRPTR1163', 'IPDMRPTR1164')) {
                  str += ' Nham nh???'
                }
                if (this.getValueOfMASTERDATA('IPDMRPTR1163', 'IPDMRPTR1165')) {
                  str += ', Tr??n nh???n'
                }
                if (this.getValueOfMASTERDATA('IPDMRPTR1163', 'IPDMRPTR1166')) {
                  str += ', ????o r??nh'
                }
              }
            } else {
              str += '\n     + T???n th????ng d???ng ch???m'
            }
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1154', 'IPDMRPTR1157')) {
            if (this.getValueOfMASTERDATA('IPDMRPTR1154', 'IPDMRPTR1158')) {
              str += '\n     + T???n th????ng kh??c: ' + this.getValueOfMASTERDATA('IPDMRPTR1154', 'IPDMRPTR1158')
            } else {
              str += '\n     + T???n th????ng kh??c'
            }
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1170', 'IPDMRPTR1171') ||
        this.getValueOfMASTERDATA('IPDMRPTR1170', 'IPDMRPTR1172') ||
        this.getValueOfMASTERDATA('IPDMRPTR1170', 'IPDMRPTR1173') ||
        this.getValueOfMASTERDATA('IPDMRPTR1170', 'IPDMRPTR1174')) {
          str += '\n   + Nhu m??:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1170', 'IPDMRPTR1171')) {
            str += ' B??nh th?????ng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1170', 'IPDMRPTR1172')) {
            str += ', Ph??'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1170', 'IPDMRPTR1173')) {
            if (this.getValueOfMASTERDATA('IPDMRPTR1176', 'IPDMRPTR1177') ||
            this.getValueOfMASTERDATA('IPDMRPTR1176', 'IPDMRPTR1178') ||
            this.getValueOfMASTERDATA('IPDMRPTR1176', 'IPDMRPTR1179') ||
            this.getValueOfMASTERDATA('IPDMRPTR1180', 'IPDMRPTR1181') ||
            this.getValueOfMASTERDATA('IPDMRPTR1180', 'IPDMRPTR1182') ||
            this.getValueOfMASTERDATA('IPDMRPTR1180', 'IPDMRPTR1183')) {
              str += '\n     + Th???m l???u:'
              if (this.getValueOfMASTERDATA('IPDMRPTR1176', 'IPDMRPTR1177')) {
                str += ' N??ng'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1176', 'IPDMRPTR1178')) {
                str += ', S??u'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1176', 'IPDMRPTR1179')) {
                str += ', R???t s??u'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1180', 'IPDMRPTR1181')) {
                str += ', Khu tr??'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1180', 'IPDMRPTR1182')) {
                str += ', Lan to???'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1180', 'IPDMRPTR1183')) {
                str += ', Nhi???u ??? v??? tinh'
              }
            } else {
              str += '\n     + Th???m l???u'
            }
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1170', 'IPDMRPTR1174')) {
            if (this.getValueOfMASTERDATA('IPDMRPTR1170', 'IPDMRPTR1175')) {
              str += '\n     + T???n th????ng kh??c: ' + this.getValueOfMASTERDATA('IPDMRPTR1170', 'IPDMRPTR1175')
            } else {
              str += '\n     + T???n th????ng kh??c'
            }
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1185') ||
          this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1186') ||
          this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1187') ||
          this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1188') ||
          this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1189') ||
          this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1190') ||
          this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1191') ||
          this.getValueOfMASTERDATA('IPDMRPTR1193', 'IPDMRPTR1194') ||
          this.getValueOfMASTERDATA('IPDMRPTR1193', 'IPDMRPTR1195') ||
          this.getValueOfMASTERDATA('IPDMRPTR1193', 'IPDMRPTR1196')) {
          str += '\n   + N???i m?? & Descemet:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1185')) {
            str += ' N???p g???p'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1186')) {
            str += ', T???a s???c t??? m???t sau GM'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1187')) {
            str += ', M??? m???t sau'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1188')) {
            str += ', Xu???t ti???t m???t sau'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1189')) {
            str += ', Guttata'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1190')) {
            str += ', R???n m??ng Des'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1191')) {
            if (this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1192')) {
              str += ', T???n th????ng kh??c : ' + this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1192')
            } else {
              str += ', T???n th????ng kh??c'
            }
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1193', 'IPDMRPTR1194')) {
            str += '\n   + Do??? th???ng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1193', 'IPDMRPTR1195')) {
            str += '\n   + K???t m???ng m???t'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1193', 'IPDMRPTR1196')) {
            if (this.getValueOfMASTERDATA('IPDMRPTR1197', 'IPDMRPTR1198') ||
            this.getValueOfMASTERDATA('IPDMRPTR1197', 'IPDMRPTR1199') ||
            this.getValueOfMASTERDATA('IPDMRPTR1197', 'IPDMRPTR1200') ||
            this.getValueOfMASTERDATA('IPDMRPTR1201', 'IPDMRPTR1202') ||
            this.getValueOfMASTERDATA('IPDMRPTR1201', 'IPDMRPTR1203') ||
            this.getValueOfMASTERDATA('IPDMRPTR1201', 'IPDMRPTR1205')) {
              str += '\n   + Th???ng gi??c m???c:'
              if (this.getValueOfMASTERDATA('IPDMRPTR1197', 'IPDMRPTR1198')) {
                str += ' Trung t??m'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1197', 'IPDMRPTR1199')) {
                str += ', L???ch t??m'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1197', 'IPDMRPTR1200')) {
                str += ', S??t r??a'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1201', 'IPDMRPTR1202')) {
                str += ', Seidel'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1201', 'IPDMRPTR1203')) {
                if (this.getValueOfMASTERDATA('IPDMRPTR1201', 'IPDMRPTR1204')) {
                  str += ', ???????ng k??nh th???ng: ' + this.getValueOfMASTERDATA('IPDMRPTR1201', 'IPDMRPTR1204')
                } else {
                  str += ', ???????ng k??nh th???ng'
                }
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1201', 'IPDMRPTR1205')) {
                str += ', Th???ng b??t'
              }
            } else {
              str += '\n   + Th???ng gi??c m???c'
            }
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1206', 'IPDMRPTR1207') ||
        this.getValueOfMASTERDATA('IPDMRPTR1206', 'IPDMRPTR1208') ||
        this.getValueOfMASTERDATA('IPDMRPTR1206', 'IPDMRPTR1209')) {
          str += '\n   + C???m gi??c gi??c m???c:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1206', 'IPDMRPTR1207')) {
            str += ' M???t'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1206', 'IPDMRPTR1208')) {
            str += ', Gi???m'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1206', 'IPDMRPTR1209')) {
            str += ', B??nh th?????ng'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1210', 'IPDMRPTR1211') ||
        this.getValueOfMASTERDATA('IPDMRPTR1210', 'IPDMRPTR1212') ||
        this.getValueOfMASTERDATA('IPDMRPTR1210', 'IPDMRPTR1213')) {
          str += '\n   + T??n m???ch:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1210', 'IPDMRPTR1211')) {
            str += ' N??ng, h?????ng t??m'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1210', 'IPDMRPTR1212')) {
            str += ', Ly t??m'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1210', 'IPDMRPTR1213')) {
            str += ', S??u'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1214', 'IPDMRPTR1215') ||
        this.getValueOfMASTERDATA('IPDMRPTR1214', 'IPDMRPTR1216')) {
          str += '\n   + V??ng r??a gi??c m???c:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1214', 'IPDMRPTR1215')) {
            str += ' Tho??i ho?? gi??'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1214', 'IPDMRPTR1216')) {
            str += ', L???ng ?????ng Canxi'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1217', 'IPDMRPTR1218')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1217', 'IPDMRPTR1219')) {
            str += '\n   + B???t th?????ng kh??c: ' + this.getValueOfMASTERDATA('IPDMRPTR1217', 'IPDMRPTR1219')
          } else {
            str += '\n   + B???t th?????ng kh??c'
          }
        }
      }
      // 8
      if (this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1221') ||
      this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1222') ||
      this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1223') ||
      this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1224') ||
      this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1225') ||
      this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1226')) {
        str += '\n8. C???ng m???c:'
        if (this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1221')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1227', 'IPDMRPTR1228') ||
          this.getValueOfMASTERDATA('IPDMRPTR1227', 'IPDMRPTR1229') ||
          this.getValueOfMASTERDATA('IPDMRPTR1227', 'IPDMRPTR1230') ||
          this.getValueOfMASTERDATA('IPDMRPTR1227', 'IPDMRPTR1231') ||
          this.getValueOfMASTERDATA('IPDMRPTR1227', 'IPDMRPTR1232')) {
            str += '\n   + Vi??m:'
            if (this.getValueOfMASTERDATA('IPDMRPTR1227', 'IPDMRPTR1228')) {
              str += ' N???t'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTR1227', 'IPDMRPTR1229')) {
              str += ', Lan to???'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTR1227', 'IPDMRPTR1230')) {
              str += ', ??p xe'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTR1227', 'IPDMRPTR1231')) {
              str += ', N??ng'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTR1227', 'IPDMRPTR1232')) {
              str += ', S??u'
            }
          } else {
            str += '\n   + Vi??m'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1222') ||
          this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1223') ||
          this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1224') ||
          this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1225')) {
          str += '\n   + '
          if (this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1222')) {
            str += ', Vi??m th?????ng c???ng m???c'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1223')) {
            str += ', Gi??n l???i'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1224')) {
            str += ', Ti??u m???ng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1225')) {
            str += ', Ho???i t???'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1226')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1648')) {
            str += '\n   + Chi ti???t kh??c: ' + this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1648')
          } else {
            str += '\n   + Chi ti???t kh??c'
          }
        }
        str += '\n'
      }
      // 9
      if (this.getValueOfMASTERDATA('IPDMRPTR1650', 'IPDMRPTR1651') ||
      this.getValueOfMASTERDATA('IPDMRPTR1650', 'IPDMRPTR1652') ||
      this.getValueOfMASTERDATA('IPDMRPTR1650', 'IPDMRPTR1653') ||
      this.getValueOfMASTERDATA('IPDMRPTR1650', 'IPDMRPTR1654') ||
      this.getValueOfMASTERDATA('IPDMRPTR1650', 'IPDMRPTR1655') ||
      this.getValueOfMASTERDATA('IPDMRPTR1241', 'IPDMRPTR1242') ||
      this.getValueOfMASTERDATA('IPDMRPTR1243', 'IPDMRPTR1244') ||
      this.getValueOfMASTERDATA('IPDMRPTR1246', 'IPDMRPTR1247') ||
      this.getValueOfMASTERDATA('IPDMRPTR1249', 'IPDMRPTR1250') ||
      this.getValueOfMASTERDATA('IPDMRPTR1251', 'IPDMRPTR1252')) {
        str += '9. Ti???n ph??ng (G??c TP):'
        if (this.getValueOfMASTERDATA('IPDMRPTR1650', 'IPDMRPTR1651')) {
          str += ' B??nh th?????ng'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1650', 'IPDMRPTR1652')) {
          str += ', N??ng'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1650', 'IPDMRPTR1653')) {
          str += ', M???t TP'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1650', 'IPDMRPTR1654')) {
          str += ', S??u'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1650', 'IPDMRPTR1655')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1650', 'IPDMRPTR1678')) {
            str += ', T???n th????ng kh??c: ' + this.getValueOfMASTERDATA('IPDMRPTR1650', 'IPDMRPTR1678')
          } else {
            str += ', T???n th????ng kh??c'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1241', 'IPDMRPTR1242')) {
          str += '\n   + Ti???n ph??ng: ' + this.getValueOfMASTERDATA('IPDMRPTR1241', 'IPDMRPTR1242') + 'mm'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1243', 'IPDMRPTR1244')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1243', 'IPDMRPTR1245')) {
            str += ', M???: ' + this.getValueOfMASTERDATA('IPDMRPTR1243', 'IPDMRPTR1245') + ' mm'
          } else {
            str += ', M???'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1246', 'IPDMRPTR1247')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1246', 'IPDMRPTR1248')) {
            str += ', M??u: ' + this.getValueOfMASTERDATA('IPDMRPTR1246', 'IPDMRPTR1248') + ' mm'
          } else {
            str += ', M??u'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1249', 'IPDMRPTR1250')) {
          str += ', Tyndal(+)'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1251', 'IPDMRPTR1252')) {
          str += ', M??ng xu???t ti???t'
        }
        str += '\n'
      }
      // 10
      if (this.getValueOfMASTERDATA('IPDMRPTR1256', 'IPDMRPTR1257') || this.getValueOfMASTERDATA('IPDMRPTR1256', 'IPDMRPTR1258') || this.getValueOfMASTERDATA('IPDMRPTR1256', 'IPDMRPTR1259') || this.getValueOfMASTERDATA('IPDMRPTR1256', 'IPDMRPTR1260') || this.getValueOfMASTERDATA('IPDMRPTR1256', 'IPDMRPTR1261') || this.getValueOfMASTERDATA('IPDMRPTR1256', 'IPDMRPTR1262')) {
        str += '10. M???ng m???t:'
        if (this.getValueOfMASTERDATA('IPDMRPTR1256', 'IPDMRPTR1257')) {
          str += ' N??u x???p'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1256', 'IPDMRPTR1258')) {
          str += ', X?? teo'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1256', 'IPDMRPTR1259')) {
          str += ', C????ng t???'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1256', 'IPDMRPTR1260')) {
          str += ', T??n m???ch'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1256', 'IPDMRPTR1261')) {
          str += ', Ph??i'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1256', 'IPDMRPTR1262')) {
          str += ', K???t'
        }
        str += '\n'
      }
      // 11
      if (this.getValueOfMASTERDATA('IPDMRPTR1263', 'IPDMRPTR1264') ||
      this.getValueOfMASTERDATA('IPDMRPTR1265', 'IPDMRPTR1266') ||
      this.getValueOfMASTERDATA('IPDMRPTR1265', 'IPDMRPTR1267') ||
      this.getValueOfMASTERDATA('IPDMRPTR1265', 'IPDMRPTR1268') ||
      this.getValueOfMASTERDATA('IPDMRPTR1270', 'IPDMRPTR1271') ||
      this.getValueOfMASTERDATA('IPDMRPTR1270', 'IPDMRPTR1272') ||
      this.getValueOfMASTERDATA('IPDMRPTR1270', 'IPDMRPTR1273') ||
      this.getValueOfMASTERDATA('IPDMRPTR1274', 'IPDMRPTR1275') ||
      this.getValueOfMASTERDATA('IPDMRPTR1274', 'IPDMRPTR1276') ||
      this.getValueOfMASTERDATA('IPDMRPTR1274', 'IPDMRPTR1277') ||
      this.getValueOfMASTERDATA('IPDMRPTR1278', 'IPDMRPTR1279')) {
        str += '11. ?????ng t???:'
        if (this.getValueOfMASTERDATA('IPDMRPTR1263', 'IPDMRPTR1264')) {
          str += ', ???????ng k??nh: ' + this.getValueOfMASTERDATA('IPDMRPTR1263', 'IPDMRPTR1264') + ' mm'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1265', 'IPDMRPTR1266')) {
          str += ', Tr??n'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1265', 'IPDMRPTR1267')) {
          str += ', M??o'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1265', 'IPDMRPTR1268')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1265', 'IPDMRPTR1269')) {
            str += '\n   + D??nh: V??? tr?? d??nh: ' + this.getValueOfMASTERDATA('IPDMRPTR1265', 'IPDMRPTR1269')
          } else {
            str += '\n   + D??nh'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1270', 'IPDMRPTR1271') ||
        this.getValueOfMASTERDATA('IPDMRPTR1270', 'IPDMRPTR1272') ||
        this.getValueOfMASTERDATA('IPDMRPTR1270', 'IPDMRPTR1273')) {
          str += '\n   + Ph???n x???:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1270', 'IPDMRPTR1271')) {
            str += ', T???t'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1270', 'IPDMRPTR1272')) {
            str += ', K??m'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1270', 'IPDMRPTR1273')) {
            str += ', M???t'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1274', 'IPDMRPTR1275') ||
        this.getValueOfMASTERDATA('IPDMRPTR1274', 'IPDMRPTR1276') ||
        this.getValueOfMASTERDATA('IPDMRPTR1274', 'IPDMRPTR1277')) {
          str += '\n   + ??nh ?????ng t???:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1274', 'IPDMRPTR1275')) {
            str += ', H???ng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1274', 'IPDMRPTR1276')) {
            str += ', X??m'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1274', 'IPDMRPTR1277')) {
            str += ', Kh??ng soi ???????c'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1278', 'IPDMRPTR1279')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1278', 'IPDMRPTR1280')) {
            str += '\n   + T???n th????ng kh??c: ' + this.getValueOfMASTERDATA('IPDMRPTR1278', 'IPDMRPTR1280')
          } else {
            str += '\n   + T???n th????ng kh??c'
          }
        }
        str += '\n'
      }
      // 12
      if (this.getValueOfMASTERDATA('IPDMRPTR1281', 'IPDMRPTR1282') ||
      this.getValueOfMASTERDATA('IPDMRPTR1283', 'IPDMRPTR1284') ||
      this.getValueOfMASTERDATA('IPDMRPTR1286', 'IPDMRPTR1287') ||
      this.getValueOfMASTERDATA('IPDMRPTR1288', 'IPDMRPTR1289') ||
      this.getValueOfMASTERDATA('IPDMRPTR1295', 'IPDMRPTR1296')) {
        str += '12. Thu??? tinh th???:'
        if (this.getValueOfMASTERDATA('IPDMRPTR1281', 'IPDMRPTR1282')) {
          str += ' B??nh th?????ng'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1283', 'IPDMRPTR1284')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1283', 'IPDMRPTR1285')) {
            str += '\n   + ?????c thu??? tinh th???: H??nh th??i ?????c: ' + this.getValueOfMASTERDATA('IPDMRPTR1283', 'IPDMRPTR1285')
          } else {
            str += '\n   + ?????c thu??? tinh th???'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1286', 'IPDMRPTR1287')) {
          str += '\n   + L???ch'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1288', 'IPDMRPTR1289')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1288', 'IPDMRPTR1290') ||
          this.getValueOfMASTERDATA('IPDMRPTR1288', 'IPDMRPTR1291') ||
          this.getValueOfMASTERDATA('IPDMRPTR1288', 'IPDMRPTR1292') ||
          this.getValueOfMASTERDATA('IPDMRPTR1288', 'IPDMRPTR1293') ||
          this.getValueOfMASTERDATA('IPDMRPTR1288', 'IPDMRPTR1294')) {
            str += '\n   + IOL:'
            if (this.getValueOfMASTERDATA('IPDMRPTR1288', 'IPDMRPTR1290')) {
              str += ', C??n'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTR1288', 'IPDMRPTR1291')) {
              str += ', L???ch'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTR1288', 'IPDMRPTR1292')) {
              str += ', ?????c bao sau'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTR1288', 'IPDMRPTR1293')) {
              str += ', Trong TP'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTR1288', 'IPDMRPTR1294')) {
              str += ', Trong HP'
            }
          } else {
            str += '\n   + IOL'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1295', 'IPDMRPTR1296')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1295', 'IPDMRPTR1297')) {
            str += '\n   + T???n th????ng kh??c: ' + this.getValueOfMASTERDATA('IPDMRPTR1295', 'IPDMRPTR1297')
          } else {
            str += '\n   + T???n th????ng kh??c'
          }
        }
        str += '\n'
      }
      // 13
      if (this.getValueOfMASTERDATA('IPDMRPTR1298', 'IPDMRPTR1299') ||
      this.getValueOfMASTERDATA('IPDMRPTR1298', 'IPDMRPTR1300') ||
      this.getValueOfMASTERDATA('IPDMRPTR1298', 'IPDMRPTR1301') ||
      this.getValueOfMASTERDATA('IPDMRPTR1298', 'IPDMRPTR1302') ||
      this.getValueOfMASTERDATA('IPDMRPTR1298', 'IPDMRPTR1303') ||
      this.getValueOfMASTERDATA('IPDMRPTR1304', 'IPDMRPTR1305') ||
      this.getValueOfMASTERDATA('IPDMRPTR1304', 'IPDMRPTR1306') ||
      this.getValueOfMASTERDATA('IPDMRPTR1304', 'IPDMRPTR1307') ||
      this.getValueOfMASTERDATA('IPDMRPTR1304', 'IPDMRPTR1308') ||
      this.getValueOfMASTERDATA('IPDMRPTR1304', 'IPDMRPTR1309')) {
        str += '13. D???ch k??nh:'
        if (this.getValueOfMASTERDATA('IPDMRPTR1298', 'IPDMRPTR1299')) {
          str += ' S???ch'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1298', 'IPDMRPTR1300')) {
          str += ', ?????c'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1298', 'IPDMRPTR1301')) {
          str += ', Xu???t huy???t'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1298', 'IPDMRPTR1302')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1298', 'IPDMRPTR1303')) {
            str += ', Vi??m m???: ' + this.getValueOfMASTERDATA('IPDMRPTR1298', 'IPDMRPTR1303')
          } else {
            str += ', Vi??m m???'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1304', 'IPDMRPTR1305')) {
          str += ', Xu???t huy???t'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1304', 'IPDMRPTR1306')) {
          str += ', T??? ch???c ho??'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1304', 'IPDMRPTR1307')) {
          str += ', Bong d???ch k??nh sau'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1304', 'IPDMRPTR1308')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1304', 'IPDMRPTR1309')) {
            str += ', T???n th????ng kh??c: ' + this.getValueOfMASTERDATA('IPDMRPTR1304', 'IPDMRPTR1309')
          } else {
            str += ', T???n th????ng kh??c'
          }
        }
        str += '\n'
      }
      // 14
      if (this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1311') ||
      this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1312') ||
      this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1313') ||
      this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1314') ||
      this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1315') ||
      this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1316') ||
      this.getValueOfMASTERDATA('IPDMRPTR1317', 'IPDMRPTR1318') ||
      this.getValueOfMASTERDATA('IPDMRPTR1317', 'IPDMRPTR1319') ||
      this.getValueOfMASTERDATA('IPDMRPTR1317', 'IPDMRPTR1320') ||
      this.getValueOfMASTERDATA('IPDMRPTR1317', 'IPDMRPTR1321') ||
      this.getValueOfMASTERDATA('IPDMRPTR1326', 'IPDMRPTR1327') ||
      this.getValueOfMASTERDATA('IPDMRPTR1326', 'IPDMRPTR1328') ||
      this.getValueOfMASTERDATA('IPDMRPTR1326', 'IPDMRPTR1329') ||
      this.getValueOfMASTERDATA('IPDMRPTR1326', 'IPDMRPTR1330') ||
      this.getValueOfMASTERDATA('IPDMRPTR1326', 'IPDMRPTR1331') ||
      this.getValueOfMASTERDATA('IPDMRPTR1335', 'IPDMRPTR1336') ||
      this.getValueOfMASTERDATA('IPDMRPTR1335', 'IPDMRPTR1337')) {
        str += '14. ????y m???t:'
        if (this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1311') ||
        this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1312') ||
        this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1313') ||
        this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1314') ||
        this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1315') ||
        this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1316')) {
          str += '\n   + ????a th???:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1311')) {
            str += ' B??nh th?????ng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1312')) {
            if (this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1313')) {
              str += ' L??m gai: ' + this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1313')
            } else {
              str += ' L??m gai'
            }
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1314')) {
            str += ', Ph??'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1315')) {
            str += ', Teo'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1316')) {
            str += ', B???c m??u'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1317', 'IPDMRPTR1318') ||
        this.getValueOfMASTERDATA('IPDMRPTR1317', 'IPDMRPTR1319') ||
        this.getValueOfMASTERDATA('IPDMRPTR1317', 'IPDMRPTR1320') ||
        this.getValueOfMASTERDATA('IPDMRPTR1317', 'IPDMRPTR1321')) {
          str += '\n   + Ho??ng ??i???m:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1317', 'IPDMRPTR1318')) {
            str += ' B??nh th?????ng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1317', 'IPDMRPTR1319')) {
            str += ', M???t ??nh H??'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1317', 'IPDMRPTR1320')) {
            str += ', S???o H??'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1317', 'IPDMRPTR1321')) {
            if (this.getValueOfMASTERDATA('IPDMRPTR1322', 'IPDMRPTR1323') || this.getValueOfMASTERDATA('IPDMRPTR1322', 'IPDMRPTR1324')) {
              str += ', Ph??:'
              if (this.getValueOfMASTERDATA('IPDMRPTR1322', 'IPDMRPTR1323')) {
                str += ', Khu tr??'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1322', 'IPDMRPTR1324')) {
                str += ', To??? lan'
              }
            } else {
              str += ', Ph??'
            }
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1326', 'IPDMRPTR1327') ||
        this.getValueOfMASTERDATA('IPDMRPTR1326', 'IPDMRPTR1328') ||
        this.getValueOfMASTERDATA('IPDMRPTR1326', 'IPDMRPTR1329') ||
        this.getValueOfMASTERDATA('IPDMRPTR1326', 'IPDMRPTR1330') ||
        this.getValueOfMASTERDATA('IPDMRPTR1326', 'IPDMRPTR1331')) {
          str += '\n   + V??ng m???c: H??? m???ch:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1326', 'IPDMRPTR1327')) {
            str += ' B??nh th?????ng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1326', 'IPDMRPTR1328')) {
            str += ', T???c ??M'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1326', 'IPDMRPTR1329')) {
            str += ', T???c TM'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1326', 'IPDMRPTR1330')) {
            str += ', T??n m???ch'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1326', 'IPDMRPTR1331')) {
            if (this.getValueOfMASTERDATA('IPDMRPTR1332', 'IPDMRPTR1333') || this.getValueOfMASTERDATA('IPDMRPTR1332', 'IPDMRPTR1334')) {
              str += ', Tho??i ho?? VM:'
              if (this.getValueOfMASTERDATA('IPDMRPTR1332', 'IPDMRPTR1333')) {
                str += ' Chu bi??n'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1332', 'IPDMRPTR1334')) {
                str += ', Trung t??m'
              }
            } else {
              str += ', Tho??i ho?? VM'
            }
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1335', 'IPDMRPTR1336')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1335', 'IPDMRPTR1337')) {
            str += '\n   + B???nh l?? kh??c: ' + this.getValueOfMASTERDATA('IPDMRPTR1335', 'IPDMRPTR1337')
          } else {
            str += '\n   + B???nh l?? kh??c'
          }
        }
      }
      // 15
      if (this.getValueOfMASTERDATA('IPDMRPTR1338', 'IPDMRPTR1339') || this.getValueOfMASTERDATA('IPDMRPTR1338', 'IPDMRPTR1340') || this.getValueOfMASTERDATA('IPDMRPTR1338', 'IPDMRPTR1341')) {
        str += '\n15. H???c m???t:'
        if (this.getValueOfMASTERDATA('IPDMRPTR1338', 'IPDMRPTR1339')) {
          str += ' B??nh th?????ng'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1338', 'IPDMRPTR1340')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1338', 'IPDMRPTR1341')) {
            str += ', B???nh l??: ' + this.getValueOfMASTERDATA('IPDMRPTR1338', 'IPDMRPTR1341')
          } else {
            str += ', B???nh l??'
          }
        }
        str += '\n'
      }
      // M???T TR??I
      for (const property in this.MASTERDATA) {
        if (property.includes('TL')) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              if (item.Value && !str.includes('M???T TR??I\n')) {
                str += 'M???T TR??I\n'
              }
            })
          }
        }
      }
      // 1
      if (this.getValueOfMASTERDATA('IPDMRPTL1079', 'IPDMRPTL1080') || this.getValueOfMASTERDATA('IPDMRPTL1081', 'IPDMRPTL1082') || this.getValueOfMASTERDATA('IPDMRPTL1083', 'IPDMRPTL1084') || this.getValueOfMASTERDATA('IPDMRPTL1085', 'IPDMRPTL1086')) {
        str += '1. Th??? l???c: '
        str += '\n'
      }
      if (this.getValueOfMASTERDATA('IPDMRPTL1079', 'IPDMRPTL1080')) {
        str += '   + ' + 'Kh??ng k??nh: ' + this.getValueOfMASTERDATA('IPDMRPTL1079', 'IPDMRPTL1080')
        str += '\n'
      }
      if (this.getValueOfMASTERDATA('IPDMRPTL1081', 'IPDMRPTL1082')) {
        str += '   + ' + 'Qua l???: ' + this.getValueOfMASTERDATA('IPDMRPTL1081', 'IPDMRPTL1082')
        str += '\n'
      }
      if (this.getValueOfMASTERDATA('IPDMRPTL1083', 'IPDMRPTL1084')) {
        str += '   + ' + 'C?? ch???nh k??nh: ' + this.getValueOfMASTERDATA('IPDMRPTL1083', 'IPDMRPTL1084')
        str += '\n'
      }
      if (this.getValueOfMASTERDATA('IPDMRPTL1085', 'IPDMRPTL1086')) {
        str += '   + ' + 'Nh??n g???n: ' + this.getValueOfMASTERDATA('IPDMRPTL1085', 'IPDMRPTL1086')
        str += '\n'
      }
      // 2
      if (this.getValueOfMASTERDATA('IPDMRPTL1087', 'IPDMRPTL1088')) {
        str += '2. Nh??n ??p: ' + this.getValueOfMASTERDATA('IPDMRPTL1087', 'IPDMRPTL1088')
        str += '\n'
      }
      // 3
      if (this.getValueOfMASTERDATA('IPDMRPTL1089', 'IPDMRPTL1090')) {
        str += '3. L??c v?? v???n nh??n: ' + this.getValueOfMASTERDATA('IPDMRPTL1089', 'IPDMRPTL1090')
        str += '\n'
      }
      if (this.getValueOfMASTERDATA('IPDMRPTL1091', 'IPDMRPTL1092')) {
        str += '   + B??m l??? qu???n: N?????c tho??t t???t'
        str += '\n'
      }
      // 4
      if (this.getValueOfMASTERDATA('IPDMRPTL1093', 'IPDMRPTL1094') || this.getValueOfMASTERDATA('IPDMRPTL1093', 'IPDMRPTL1095')) {
        str += '4. L??? ?????o:'
        if (this.getValueOfMASTERDATA('IPDMRPTL1093', 'IPDMRPTL1094')) {
          str += ' Tr??o l??? qu???n ?????i di??n'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1093', 'IPDMRPTL1095')) {
          str += ', Tr??o t???i ch???'
        }
        str += '\n'
      }
      // 5
      if (this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1097') ||
      this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1098') ||
      this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1099') ||
      this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1100') ||
      this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1101') ||
      this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1102') ||
      this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1103') ||
      this.getValueOfMASTERDATA('IPDMRPTL1109', 'IPDMRPTL1110') ||
      this.getValueOfMASTERDATA('IPDMRPTL1114', 'IPDMRPTL1115') ||
      this.getValueOfMASTERDATA('IPDMRPTL1114', 'IPDMRPTL1116') ||
      this.getValueOfMASTERDATA('IPDMRPTL1114', 'IPDMRPTL1117') ||
      this.getValueOfMASTERDATA('IPDMRPTL1114', 'IPDMRPTL1118') ||
      this.getValueOfMASTERDATA('IPDMRPTL1119', 'IPDMRPTL1120')) {
        str += '5. Mi m???t:'
        if (this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1097')) {
          str += ', B??nh th?????ng'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1098')) {
          str += ', Ph??'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1099')) {
          str += ', Ch???p'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1100')) {
          str += ', L???o'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1101')) {
          str += ', S???o da mi'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1102')) {
          str += ', S???p mi'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1103')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1104')) {
            str += ', Kh??c: ' + this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1104')
          } else {
            str += ', Kh??c'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1105')) {
          str += ', Qu???m'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1106')) {
          str += ', H??? mi'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1107')) {
          str += ', Tr??? mi'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1109', 'IPDMRPTL1110')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1109', 'IPDMRPTL1111') || this.getValueOfMASTERDATA('IPDMRPTL1109', 'IPDMRPTL1112') || this.getValueOfMASTERDATA('IPDMRPTL1109', 'IPDMRPTL1113')) {
            str += '\n   + U mi: '
            if (this.getValueOfMASTERDATA('IPDMRPTL1109', 'IPDMRPTL1111')) {
              str += 'T??nh ch???t U: ' + this.getValueOfMASTERDATA('IPDMRPTL1109', 'IPDMRPTL1111')
            }
            if (this.getValueOfMASTERDATA('IPDMRPTL1109', 'IPDMRPTL1112')) {
              str += ', V??? tr??: ' + this.getValueOfMASTERDATA('IPDMRPTL1109', 'IPDMRPTL1112')
            }
            if (this.getValueOfMASTERDATA('IPDMRPTL1109', 'IPDMRPTL1113')) {
              str += ', K??ch th?????c: ' + this.getValueOfMASTERDATA('IPDMRPTL1109', 'IPDMRPTL1113')
            }
          } else {
            str += '\n   + U mi'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1108')) {
          str += '\n   + Vi??m b??? mi (ch??n l??ng mi)'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1114', 'IPDMRPTL1115') ||
        this.getValueOfMASTERDATA('IPDMRPTL1114', 'IPDMRPTL1116') ||
        this.getValueOfMASTERDATA('IPDMRPTL1114', 'IPDMRPTL1117') ||
        this.getValueOfMASTERDATA('IPDMRPTL1114', 'IPDMRPTL1118')) {
          str += '\n   + Tuy???n b??? mi:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1114', 'IPDMRPTL1115')) {
            str += ' B??nh th?????ng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1114', 'IPDMRPTL1116')) {
            str += ', Vi??m t???c nh???'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1114', 'IPDMRPTL1117')) {
            str += ', V???a'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1114', 'IPDMRPTL1118')) {
            str += ', N???ng'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1119', 'IPDMRPTL1120')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1119', 'IPDMRPTL1121')) {
            str += '\n   + T???n th????ng kh??c: ' + this.getValueOfMASTERDATA('IPDMRPTL1119', 'IPDMRPTL1121')
          } else {
            str += '\n   + T???n th????ng kh??c'
          }
        }
        str += '\n'
      }
      // 6
      if (this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1123') ||
      this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1124') ||
      this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1125') ||
      this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1126') ||
      this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1127') ||
      this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1128') ||
      this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1129') ||
      this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1130') ||
      this.getValueOfMASTERDATA('IPDMRPTL1131', 'IPDMRPTL1132') ||
      this.getValueOfMASTERDATA('IPDMRPTL1136', 'IPDMRPTL1137') ||
      this.getValueOfMASTERDATA('IPDMRPTL1136', 'IPDMRPTL1138') ||
      this.getValueOfMASTERDATA('IPDMRPTL1136', 'IPDMRPTL1139') ||
      this.getValueOfMASTERDATA('IPDMRPTL1140', 'IPDMRPTL1141')) {
        str += '6. K???t m???c:'
        if (this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1123') ||
        this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1124')) {
          str += '\n   + C????ng t???:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1123')) {
            str += ' To??? lan'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1124')) {
            str += ', R??a'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1125') ||
          this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1126') ||
          this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1127') ||
          this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1128') ||
          this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1129') ||
          this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1130')) {
          str += '\n   +'
          if (this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1125')) {
            str += ' , Ph?? n???'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1126')) {
            str += ', Xu???t huy???t'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1127')) {
            str += ', S???ng ho??'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1128')) {
            str += ', Nh??'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1129')) {
            str += ', H???t'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1130')) {
            str += ', S???o'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1131', 'IPDMRPTL1132')) {
          str += '\n   + U k???t m???c:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1131', 'IPDMRPTL1133')) {
            str += ' T??nh ch???t: ' + this.getValueOfMASTERDATA('IPDMRPTL1131', 'IPDMRPTL1133')
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1131', 'IPDMRPTL1134')) {
            str += ', V??? tr??: ' + this.getValueOfMASTERDATA('IPDMRPTL1131', 'IPDMRPTL1134')
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1131', 'IPDMRPTL1135')) {
            str += ', K??ch th?????c: ' + this.getValueOfMASTERDATA('IPDMRPTL1131', 'IPDMRPTL1135')
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1136', 'IPDMRPTL1137') ||
        this.getValueOfMASTERDATA('IPDMRPTL1136', 'IPDMRPTL1138') ||
        this.getValueOfMASTERDATA('IPDMRPTL1136', 'IPDMRPTL1139')) {
          str += '\n   + C??ng ?????:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1136', 'IPDMRPTL1137')) {
            str += ' B??nh th?????ng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1136', 'IPDMRPTL1138')) {
            str += ', C???n'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1136', 'IPDMRPTL1139')) {
            str += ', D??nh'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1140', 'IPDMRPTL1141')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1140', 'IPDMRPTL1142')) {
            str += '\n   + T???n th????ng kh??c: ' + this.getValueOfMASTERDATA('IPDMRPTL1140', 'IPDMRPTL1142')
          } else {
            str += '\n   + T???n th????ng kh??c: '
          }
        }
        str += '\n'
      }
      // 7
      if (this.getValueOfMASTERDATA('IPDMRPTL1662', 'IPDMRPTL1663') ||
      this.getValueOfMASTERDATA('IPDMRPTL1662', 'IPDMRPTL1664') ||
      this.getValueOfMASTERDATA('IPDMRPTL1662', 'IPDMRPTL1665') ||
      this.getValueOfMASTERDATA('IPDMRPTL1666', 'IPDMRPTL1667') ||
      this.getValueOfMASTERDATA('IPDMRPTL1666', 'IPDMRPTL1668') ||
      this.getValueOfMASTERDATA('IPDMRPTL1666', 'IPDMRPTL1669') ||
      this.getValueOfMASTERDATA('IPDMRPTL1154', 'IPDMRPTL1155') ||
      this.getValueOfMASTERDATA('IPDMRPTL1154', 'IPDMRPTL1156') ||
      this.getValueOfMASTERDATA('IPDMRPTL1154', 'IPDMRPTL1157') ||
      this.getValueOfMASTERDATA('IPDMRPTL1170', 'IPDMRPTL1171') ||
      this.getValueOfMASTERDATA('IPDMRPTL1170', 'IPDMRPTL1172') ||
      this.getValueOfMASTERDATA('IPDMRPTL1170', 'IPDMRPTL1173') ||
      this.getValueOfMASTERDATA('IPDMRPTL1170', 'IPDMRPTL1174') ||
      this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1138') ||
      this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1139') ||
      this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1137') ||
      this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1138') ||
      this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1139') ||
      this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1137') ||
      this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1138') ||
      this.getValueOfMASTERDATA('IPDMRPTL1193', 'IPDMRPTL1194') ||
      this.getValueOfMASTERDATA('IPDMRPTL1193', 'IPDMRPTL1195') ||
      this.getValueOfMASTERDATA('IPDMRPTL1193', 'IPDMRPTL1196') ||
      this.getValueOfMASTERDATA('IPDMRPTL1206', 'IPDMRPTL1207') ||
      this.getValueOfMASTERDATA('IPDMRPTL1206', 'IPDMRPTL1208') ||
      this.getValueOfMASTERDATA('IPDMRPTL1206', 'IPDMRPTL1209') ||
      this.getValueOfMASTERDATA('IPDMRPTL1210', 'IPDMRPTL1211') ||
      this.getValueOfMASTERDATA('IPDMRPTL1210', 'IPDMRPTL1212') ||
      this.getValueOfMASTERDATA('IPDMRPTL1210', 'IPDMRPTL1213') ||
      this.getValueOfMASTERDATA('IPDMRPTL1214', 'IPDMRPTL1215') ||
      this.getValueOfMASTERDATA('IPDMRPTL1214', 'IPDMRPTL1216') ||
      this.getValueOfMASTERDATA('IPDMRPTL1217', 'IPDMRPTL1218')) {
        str += '7. Gi??c m???c: '
        if (this.getValueOfMASTERDATA('IPDMRPTL1662', 'IPDMRPTL1663') ||
        this.getValueOfMASTERDATA('IPDMRPTL1662', 'IPDMRPTL1664') ||
        this.getValueOfMASTERDATA('IPDMRPTL1662', 'IPDMRPTL1665')) {
          str += '\n   + K??ch th?????c:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1662', 'IPDMRPTL1663')) {
            str += ' B??nh th?????ng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1662', 'IPDMRPTL1664')) {
            str += ', To'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1662', 'IPDMRPTL1665')) {
            str += ', Nh???'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1666', 'IPDMRPTL1667') ||
        this.getValueOfMASTERDATA('IPDMRPTL1666', 'IPDMRPTL1668') ||
        this.getValueOfMASTERDATA('IPDMRPTL1666', 'IPDMRPTL1669')) {
          str += '\n   + H??nh d???ng:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1666', 'IPDMRPTL1667')) {
            str += ' B??nh th?????ng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1666', 'IPDMRPTL1668')) {
            str += ', N??n'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1666', 'IPDMRPTL1669')) {
            str += ', C???u'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1154', 'IPDMRPTL1155') ||
          this.getValueOfMASTERDATA('IPDMRPTL1154', 'IPDMRPTL1156') ||
          this.getValueOfMASTERDATA('IPDMRPTL1154', 'IPDMRPTL1157')) {
          str += '\n   + Bi???u m??:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1154', 'IPDMRPTL1155')) {
            str += '\n     + B??nh th?????ng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1154', 'IPDMRPTL1156')) {
            if (this.getValueOfMASTERDATA('IPDMRPTL1159', 'IPDMRPTL1160') ||
            this.getValueOfMASTERDATA('IPDMRPTL1159', 'IPDMRPTL1161') ||
            this.getValueOfMASTERDATA('IPDMRPTL1159', 'IPDMRPTL1162') ||
            this.getValueOfMASTERDATA('IPDMRPTL1163', 'IPDMRPTL1164') ||
            this.getValueOfMASTERDATA('IPDMRPTL1163', 'IPDMRPTL1165') ||
            this.getValueOfMASTERDATA('IPDMRPTL1163', 'IPDMRPTL1166')) {
              str += '\n     + T???n th????ng d???ng ch???m:'
              if (this.getValueOfMASTERDATA('IPDMRPTL1167', 'IPDMRPTL1168')) {
                str += ' Tho??i ho?? d???i b??ng'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1167', 'IPDMRPTL1169')) {
                str += ', L???ng ?????ng thu???c'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1159', 'IPDMRPTL1160') ||
              this.getValueOfMASTERDATA('IPDMRPTL1159', 'IPDMRPTL1161') ||
              this.getValueOfMASTERDATA('IPDMRPTL1159', 'IPDMRPTL1162')) {
                str += '\n       + Ph?? b???ng bi???u m??:'
                if (this.getValueOfMASTERDATA('IPDMRPTL1159', 'IPDMRPTL1160')) {
                  str += ' Nh???'
                }
                if (this.getValueOfMASTERDATA('IPDMRPTL1159', 'IPDMRPTL1161')) {
                  str += ', V???a'
                }
                if (this.getValueOfMASTERDATA('IPDMRPTL1159', 'IPDMRPTL1162')) {
                  str += ', N???ng'
                }
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1163', 'IPDMRPTL1164') ||
              this.getValueOfMASTERDATA('IPDMRPTL1163', 'IPDMRPTL1165') ||
              this.getValueOfMASTERDATA('IPDMRPTL1163', 'IPDMRPTL1166')) {
                str += '\n       + B??? t???n th????ng:'
                if (this.getValueOfMASTERDATA('IPDMRPTL1163', 'IPDMRPTL1164')) {
                  str += ' Nham nh???'
                }
                if (this.getValueOfMASTERDATA('IPDMRPTL1163', 'IPDMRPTL1165')) {
                  str += ', Tr??n nh???n'
                }
                if (this.getValueOfMASTERDATA('IPDMRPTL1163', 'IPDMRPTL1166')) {
                  str += ', ????o r??nh'
                }
              }
            } else {
              str += '\n     + T???n th????ng d???ng ch???m'
            }
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1154', 'IPDMRPTL1157')) {
            if (this.getValueOfMASTERDATA('IPDMRPTL1154', 'IPDMRPTL1158')) {
              str += '\n     + T???n th????ng kh??c: ' + this.getValueOfMASTERDATA('IPDMRPTL1154', 'IPDMRPTL1158')
            } else {
              str += '\n     + T???n th????ng kh??c'
            }
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1170', 'IPDMRPTL1171') ||
        this.getValueOfMASTERDATA('IPDMRPTL1170', 'IPDMRPTL1172') ||
        this.getValueOfMASTERDATA('IPDMRPTL1170', 'IPDMRPTL1173') ||
        this.getValueOfMASTERDATA('IPDMRPTL1170', 'IPDMRPTL1174')) {
          str += '\n   + Nhu m??:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1170', 'IPDMRPTL1171')) {
            str += ' B??nh th?????ng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1170', 'IPDMRPTL1172')) {
            str += ', Ph??'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1170', 'IPDMRPTL1173')) {
            if (this.getValueOfMASTERDATA('IPDMRPTL1176', 'IPDMRPTL1177') ||
            this.getValueOfMASTERDATA('IPDMRPTL1176', 'IPDMRPTL1178') ||
            this.getValueOfMASTERDATA('IPDMRPTL1176', 'IPDMRPTL1179') ||
            this.getValueOfMASTERDATA('IPDMRPTL1180', 'IPDMRPTL1181') ||
            this.getValueOfMASTERDATA('IPDMRPTL1180', 'IPDMRPTL1182') ||
            this.getValueOfMASTERDATA('IPDMRPTL1180', 'IPDMRPTL1183')) {
              str += '\n     + Th???m l???u:'
              if (this.getValueOfMASTERDATA('IPDMRPTL1176', 'IPDMRPTL1177')) {
                str += ' N??ng'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1176', 'IPDMRPTL1178')) {
                str += ', S??u'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1176', 'IPDMRPTL1179')) {
                str += ', R???t s??u'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1180', 'IPDMRPTL1181')) {
                str += ', Khu tr??'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1180', 'IPDMRPTL1182')) {
                str += ', Lan to???'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1180', 'IPDMRPTL1183')) {
                str += ', Nhi???u ??? v??? tinh'
              }
            } else {
              str += '\n     + Th???m l???u'
            }
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1170', 'IPDMRPTL1174')) {
            if (this.getValueOfMASTERDATA('IPDMRPTL1170', 'IPDMRPTL1175')) {
              str += '\n     + T???n th????ng kh??c: ' + this.getValueOfMASTERDATA('IPDMRPTL1170', 'IPDMRPTL1175')
            } else {
              str += '\n     + T???n th????ng kh??c'
            }
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1185') ||
          this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1186') ||
          this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1187') ||
          this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1188') ||
          this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1189') ||
          this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1190') ||
          this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1191') ||
          this.getValueOfMASTERDATA('IPDMRPTL1193', 'IPDMRPTL1194') ||
          this.getValueOfMASTERDATA('IPDMRPTL1193', 'IPDMRPTL1195') ||
          this.getValueOfMASTERDATA('IPDMRPTL1193', 'IPDMRPTL1196')) {
          str += '\n   + N???i m?? & Descemet:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1185')) {
            str += ' N???p g???p'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1186')) {
            str += ', T???a s???c t??? m???t sau GM'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1187')) {
            str += ', M??? m???t sau'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1188')) {
            str += ', Xu???t ti???t m???t sau'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1189')) {
            str += ', Guttata'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1190')) {
            str += ', R???n m??ng Des'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1191')) {
            if (this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1192')) {
              str += ', T???n th????ng kh??c : ' + this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1192')
            } else {
              str += ', T???n th????ng kh??c'
            }
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1193', 'IPDMRPTL1194')) {
            str += '\n   + Do??? th???ng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1193', 'IPDMRPTL1195')) {
            str += '\n   + K???t m???ng m???t'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1193', 'IPDMRPTL1196')) {
            if (this.getValueOfMASTERDATA('IPDMRPTL1197', 'IPDMRPTL1198') ||
            this.getValueOfMASTERDATA('IPDMRPTL1197', 'IPDMRPTL1199') ||
            this.getValueOfMASTERDATA('IPDMRPTL1197', 'IPDMRPTL1200') ||
            this.getValueOfMASTERDATA('IPDMRPTL1201', 'IPDMRPTL1202') ||
            this.getValueOfMASTERDATA('IPDMRPTL1201', 'IPDMRPTL1203') ||
            this.getValueOfMASTERDATA('IPDMRPTL1201', 'IPDMRPTL1205')) {
              str += '\n   + Th???ng gi??c m???c:'
              if (this.getValueOfMASTERDATA('IPDMRPTL1197', 'IPDMRPTL1198')) {
                str += ' Trung t??m'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1197', 'IPDMRPTL1199')) {
                str += ', L???ch t??m'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1197', 'IPDMRPTL1200')) {
                str += ', S??t r??a'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1201', 'IPDMRPTL1202')) {
                str += ', Seidel'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1201', 'IPDMRPTL1203')) {
                if (this.getValueOfMASTERDATA('IPDMRPTL1201', 'IPDMRPTL1204')) {
                  str += ', ???????ng k??nh th???ng: ' + this.getValueOfMASTERDATA('IPDMRPTL1201', 'IPDMRPTL1204')
                } else {
                  str += ', ???????ng k??nh th???ng'
                }
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1201', 'IPDMRPTL1205')) {
                str += ', Th???ng b??t'
              }
            } else {
              str += '\n   + Th???ng gi??c m???c'
            }
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1206', 'IPDMRPTL1207') ||
        this.getValueOfMASTERDATA('IPDMRPTL1206', 'IPDMRPTL1208') ||
        this.getValueOfMASTERDATA('IPDMRPTL1206', 'IPDMRPTL1209')) {
          str += '\n   + C???m gi??c gi??c m???c:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1206', 'IPDMRPTL1207')) {
            str += ' M???t'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1206', 'IPDMRPTL1208')) {
            str += ', Gi???m'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1206', 'IPDMRPTL1209')) {
            str += ', B??nh th?????ng'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1210', 'IPDMRPTL1211') ||
        this.getValueOfMASTERDATA('IPDMRPTL1210', 'IPDMRPTL1212') ||
        this.getValueOfMASTERDATA('IPDMRPTL1210', 'IPDMRPTL1213')) {
          str += '\n   + T??n m???ch:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1210', 'IPDMRPTL1211')) {
            str += ' N??ng, h?????ng t??m'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1210', 'IPDMRPTL1212')) {
            str += ', Ly t??m'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1210', 'IPDMRPTL1213')) {
            str += ', S??u'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1214', 'IPDMRPTL1215') ||
        this.getValueOfMASTERDATA('IPDMRPTL1214', 'IPDMRPTL1216')) {
          str += '\n   + V??ng r??a gi??c m???c:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1214', 'IPDMRPTL1215')) {
            str += ' Tho??i ho?? gi??'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1214', 'IPDMRPTL1216')) {
            str += ', L???ng ?????ng Canxi'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1217', 'IPDMRPTL1218')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1217', 'IPDMRPTL1219')) {
            str += '\n   + B???t th?????ng kh??c: ' + this.getValueOfMASTERDATA('IPDMRPTL1217', 'IPDMRPTL1219')
          } else {
            str += '\n   + B???t th?????ng kh??c'
          }
        }
      }
      // 8
      if (this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1221') ||
      this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1222') ||
      this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1223') ||
      this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1224') ||
      this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1225') ||
      this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1226')) {
        str += '\n8. C???ng m???c:'
        if (this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1221')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1227', 'IPDMRPTL1228') ||
          this.getValueOfMASTERDATA('IPDMRPTL1227', 'IPDMRPTL1229') ||
          this.getValueOfMASTERDATA('IPDMRPTL1227', 'IPDMRPTL1230') ||
          this.getValueOfMASTERDATA('IPDMRPTL1227', 'IPDMRPTL1231') ||
          this.getValueOfMASTERDATA('IPDMRPTL1227', 'IPDMRPTL1232')) {
            str += '\n   + Vi??m:'
            if (this.getValueOfMASTERDATA('IPDMRPTL1227', 'IPDMRPTL1228')) {
              str += ' N???t'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTL1227', 'IPDMRPTL1229')) {
              str += ', Lan to???'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTL1227', 'IPDMRPTL1230')) {
              str += ', ??p xe'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTL1227', 'IPDMRPTL1231')) {
              str += ', N??ng'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTL1227', 'IPDMRPTL1232')) {
              str += ', S??u'
            }
          } else {
            str += '\n   + Vi??m'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1222') ||
          this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1223') ||
          this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1224') ||
          this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1225')) {
          str += '\n   + '
          if (this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1222')) {
            str += ', Vi??m th?????ng c???ng m???c'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1223')) {
            str += ', Gi??n l???i'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1224')) {
            str += ', Ti??u m???ng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1225')) {
            str += ', Ho???i t???'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1226')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1648')) {
            str += '\n   + Chi ti???t kh??c: ' + this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1648')
          } else {
            str += '\n   + Chi ti???t kh??c'
          }
        }
        str += '\n'
      }
      // 9
      if (this.getValueOfMASTERDATA('IPDMRPTL1650', 'IPDMRPTL1651') ||
      this.getValueOfMASTERDATA('IPDMRPTL1650', 'IPDMRPTL1652') ||
      this.getValueOfMASTERDATA('IPDMRPTL1650', 'IPDMRPTL1653') ||
      this.getValueOfMASTERDATA('IPDMRPTL1650', 'IPDMRPTL1654') ||
      this.getValueOfMASTERDATA('IPDMRPTL1650', 'IPDMRPTL1655') ||
      this.getValueOfMASTERDATA('IPDMRPTL1241', 'IPDMRPTL1242') ||
      this.getValueOfMASTERDATA('IPDMRPTL1243', 'IPDMRPTL1244') ||
      this.getValueOfMASTERDATA('IPDMRPTL1246', 'IPDMRPTL1247') ||
      this.getValueOfMASTERDATA('IPDMRPTL1249', 'IPDMRPTL1250') ||
      this.getValueOfMASTERDATA('IPDMRPTL1251', 'IPDMRPTL1252')) {
        str += '9. Ti???n ph??ng (G??c TP):'
        if (this.getValueOfMASTERDATA('IPDMRPTL1650', 'IPDMRPTL1651')) {
          str += ' B??nh th?????ng'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1650', 'IPDMRPTL1652')) {
          str += ', N??ng'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1650', 'IPDMRPTL1653')) {
          str += ', M???t TP'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1650', 'IPDMRPTL1654')) {
          str += ', S??u'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1650', 'IPDMRPTL1655')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1650', 'IPDMRPTL1678')) {
            str += ', T???n th????ng kh??c: ' + this.getValueOfMASTERDATA('IPDMRPTL1650', 'IPDMRPTL1678')
          } else {
            str += ', T???n th????ng kh??c'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1241', 'IPDMRPTL1242')) {
          str += '\n   + Ti???n ph??ng: ' + this.getValueOfMASTERDATA('IPDMRPTL1241', 'IPDMRPTL1242') + 'mm'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1243', 'IPDMRPTL1244')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1243', 'IPDMRPTL1245')) {
            str += ', M???: ' + this.getValueOfMASTERDATA('IPDMRPTL1243', 'IPDMRPTL1245') + ' mm'
          } else {
            str += ', M???'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1246', 'IPDMRPTL1247')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1246', 'IPDMRPTL1248')) {
            str += ', M??u: ' + this.getValueOfMASTERDATA('IPDMRPTL1246', 'IPDMRPTL1248') + ' mm'
          } else {
            str += ', M??u'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1249', 'IPDMRPTL1250')) {
          str += ', Tyndal(+)'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1251', 'IPDMRPTL1252')) {
          str += ', M??ng xu???t ti???t'
        }
        str += '\n'
      }
      // 10
      if (this.getValueOfMASTERDATA('IPDMRPTL1256', 'IPDMRPTL1257') || this.getValueOfMASTERDATA('IPDMRPTL1256', 'IPDMRPTL1258') || this.getValueOfMASTERDATA('IPDMRPTL1256', 'IPDMRPTL1259') || this.getValueOfMASTERDATA('IPDMRPTL1256', 'IPDMRPTL1260') || this.getValueOfMASTERDATA('IPDMRPTL1256', 'IPDMRPTL1261') || this.getValueOfMASTERDATA('IPDMRPTL1256', 'IPDMRPTL1262')) {
        str += '10. M???ng m???t:'
        if (this.getValueOfMASTERDATA('IPDMRPTL1256', 'IPDMRPTL1257')) {
          str += ' N??u x???p'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1256', 'IPDMRPTL1258')) {
          str += ', X?? teo'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1256', 'IPDMRPTL1259')) {
          str += ', C????ng t???'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1256', 'IPDMRPTL1260')) {
          str += ', T??n m???ch'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1256', 'IPDMRPTL1261')) {
          str += ', Ph??i'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1256', 'IPDMRPTL1262')) {
          str += ', K???t'
        }
        str += '\n'
      }
      // 11
      if (this.getValueOfMASTERDATA('IPDMRPTL1263', 'IPDMRPTL1264') ||
      this.getValueOfMASTERDATA('IPDMRPTL1265', 'IPDMRPTL1266') ||
      this.getValueOfMASTERDATA('IPDMRPTL1265', 'IPDMRPTL1267') ||
      this.getValueOfMASTERDATA('IPDMRPTL1265', 'IPDMRPTL1268') ||
      this.getValueOfMASTERDATA('IPDMRPTL1270', 'IPDMRPTL1271') ||
      this.getValueOfMASTERDATA('IPDMRPTL1270', 'IPDMRPTL1272') ||
      this.getValueOfMASTERDATA('IPDMRPTL1270', 'IPDMRPTL1273') ||
      this.getValueOfMASTERDATA('IPDMRPTL1274', 'IPDMRPTL1275') ||
      this.getValueOfMASTERDATA('IPDMRPTL1274', 'IPDMRPTL1276') ||
      this.getValueOfMASTERDATA('IPDMRPTL1274', 'IPDMRPTL1277') ||
      this.getValueOfMASTERDATA('IPDMRPTL1278', 'IPDMRPTL1279')) {
        str += '11. ?????ng t???:'
        if (this.getValueOfMASTERDATA('IPDMRPTL1263', 'IPDMRPTL1264')) {
          str += ', ???????ng k??nh: ' + this.getValueOfMASTERDATA('IPDMRPTL1263', 'IPDMRPTL1264') + ' mm'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1265', 'IPDMRPTL1266')) {
          str += ', Tr??n'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1265', 'IPDMRPTL1267')) {
          str += ', M??o'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1265', 'IPDMRPTL1268')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1265', 'IPDMRPTL1269')) {
            str += '\n   + D??nh: V??? tr?? d??nh: ' + this.getValueOfMASTERDATA('IPDMRPTL1265', 'IPDMRPTL1269')
          } else {
            str += '\n   + D??nh'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1270', 'IPDMRPTL1271') ||
        this.getValueOfMASTERDATA('IPDMRPTL1270', 'IPDMRPTL1272') ||
        this.getValueOfMASTERDATA('IPDMRPTL1270', 'IPDMRPTL1273')) {
          str += '\n   + Ph???n x???:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1270', 'IPDMRPTL1271')) {
            str += ', T???t'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1270', 'IPDMRPTL1272')) {
            str += ', K??m'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1270', 'IPDMRPTL1273')) {
            str += ', M???t'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1274', 'IPDMRPTL1275') ||
        this.getValueOfMASTERDATA('IPDMRPTL1274', 'IPDMRPTL1276') ||
        this.getValueOfMASTERDATA('IPDMRPTL1274', 'IPDMRPTL1277')) {
          str += '\n   + ??nh ?????ng t???:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1274', 'IPDMRPTL1275')) {
            str += ', H???ng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1274', 'IPDMRPTL1276')) {
            str += ', X??m'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1274', 'IPDMRPTL1277')) {
            str += ', Kh??ng soi ???????c'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1278', 'IPDMRPTL1279')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1278', 'IPDMRPTL1280')) {
            str += '\n   + T???n th????ng kh??c: ' + this.getValueOfMASTERDATA('IPDMRPTL1278', 'IPDMRPTL1280')
          } else {
            str += '\n   + T???n th????ng kh??c'
          }
        }
        str += '\n'
      }
      // 12
      if (this.getValueOfMASTERDATA('IPDMRPTL1281', 'IPDMRPTL1282') ||
      this.getValueOfMASTERDATA('IPDMRPTL1283', 'IPDMRPTL1284') ||
      this.getValueOfMASTERDATA('IPDMRPTL1286', 'IPDMRPTL1287') ||
      this.getValueOfMASTERDATA('IPDMRPTL1288', 'IPDMRPTL1289') ||
      this.getValueOfMASTERDATA('IPDMRPTL1295', 'IPDMRPTL1296')) {
        str += '12. Thu??? tinh th???:'
        if (this.getValueOfMASTERDATA('IPDMRPTL1281', 'IPDMRPTL1282')) {
          str += ' B??nh th?????ng'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1283', 'IPDMRPTL1284')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1283', 'IPDMRPTL1285')) {
            str += '\n   + ?????c thu??? tinh th???: H??nh th??i ?????c: ' + this.getValueOfMASTERDATA('IPDMRPTL1283', 'IPDMRPTL1285')
          } else {
            str += '\n   + ?????c thu??? tinh th???'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1286', 'IPDMRPTL1287')) {
          str += '\n   + L???ch'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1288', 'IPDMRPTL1289')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1288', 'IPDMRPTL1290') ||
          this.getValueOfMASTERDATA('IPDMRPTL1288', 'IPDMRPTL1291') ||
          this.getValueOfMASTERDATA('IPDMRPTL1288', 'IPDMRPTL1292') ||
          this.getValueOfMASTERDATA('IPDMRPTL1288', 'IPDMRPTL1293') ||
          this.getValueOfMASTERDATA('IPDMRPTL1288', 'IPDMRPTL1294')) {
            str += '\n   + IOL:'
            if (this.getValueOfMASTERDATA('IPDMRPTL1288', 'IPDMRPTL1290')) {
              str += ', C??n'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTL1288', 'IPDMRPTL1291')) {
              str += ', L???ch'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTL1288', 'IPDMRPTL1292')) {
              str += ', ?????c bao sau'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTL1288', 'IPDMRPTL1293')) {
              str += ', Trong TP'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTL1288', 'IPDMRPTL1294')) {
              str += ', Trong HP'
            }
          } else {
            str += '\n   + IOL'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1295', 'IPDMRPTL1296')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1295', 'IPDMRPTL1297')) {
            str += '\n   + T???n th????ng kh??c: ' + this.getValueOfMASTERDATA('IPDMRPTL1295', 'IPDMRPTL1297')
          } else {
            str += '\n   + T???n th????ng kh??c'
          }
        }
        str += '\n'
      }
      // 13
      if (this.getValueOfMASTERDATA('IPDMRPTL1298', 'IPDMRPTL1299') ||
      this.getValueOfMASTERDATA('IPDMRPTL1298', 'IPDMRPTL1300') ||
      this.getValueOfMASTERDATA('IPDMRPTL1298', 'IPDMRPTL1301') ||
      this.getValueOfMASTERDATA('IPDMRPTL1298', 'IPDMRPTL1302') ||
      this.getValueOfMASTERDATA('IPDMRPTL1298', 'IPDMRPTL1303') ||
      this.getValueOfMASTERDATA('IPDMRPTL1304', 'IPDMRPTL1305') ||
      this.getValueOfMASTERDATA('IPDMRPTL1304', 'IPDMRPTL1306') ||
      this.getValueOfMASTERDATA('IPDMRPTL1304', 'IPDMRPTL1307') ||
      this.getValueOfMASTERDATA('IPDMRPTL1304', 'IPDMRPTL1308') ||
      this.getValueOfMASTERDATA('IPDMRPTL1304', 'IPDMRPTL1309')) {
        str += '13. D???ch k??nh:'
        if (this.getValueOfMASTERDATA('IPDMRPTL1298', 'IPDMRPTL1299')) {
          str += ' S???ch'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1298', 'IPDMRPTL1300')) {
          str += ', ?????c'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1298', 'IPDMRPTL1301')) {
          str += ', Xu???t huy???t'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1298', 'IPDMRPTL1302')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1298', 'IPDMRPTL1303')) {
            str += ', Vi??m m???: ' + this.getValueOfMASTERDATA('IPDMRPTL1298', 'IPDMRPTL1303')
          } else {
            str += ', Vi??m m???'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1304', 'IPDMRPTL1305')) {
          str += ', Xu???t huy???t'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1304', 'IPDMRPTL1306')) {
          str += ', T??? ch???c ho??'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1304', 'IPDMRPTL1307')) {
          str += ', Bong d???ch k??nh sau'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1304', 'IPDMRPTL1308')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1304', 'IPDMRPTL1309')) {
            str += ', T???n th????ng kh??c: ' + this.getValueOfMASTERDATA('IPDMRPTL1304', 'IPDMRPTL1309')
          } else {
            str += ', T???n th????ng kh??c'
          }
        }
        str += '\n'
      }
      // 14
      if (this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1311') ||
      this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1312') ||
      this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1313') ||
      this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1314') ||
      this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1315') ||
      this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1316') ||
      this.getValueOfMASTERDATA('IPDMRPTL1317', 'IPDMRPTL1318') ||
      this.getValueOfMASTERDATA('IPDMRPTL1317', 'IPDMRPTL1319') ||
      this.getValueOfMASTERDATA('IPDMRPTL1317', 'IPDMRPTL1320') ||
      this.getValueOfMASTERDATA('IPDMRPTL1317', 'IPDMRPTL1321') ||
      this.getValueOfMASTERDATA('IPDMRPTL1326', 'IPDMRPTL1327') ||
      this.getValueOfMASTERDATA('IPDMRPTL1326', 'IPDMRPTL1328') ||
      this.getValueOfMASTERDATA('IPDMRPTL1326', 'IPDMRPTL1329') ||
      this.getValueOfMASTERDATA('IPDMRPTL1326', 'IPDMRPTL1330') ||
      this.getValueOfMASTERDATA('IPDMRPTL1326', 'IPDMRPTL1331') ||
      this.getValueOfMASTERDATA('IPDMRPTL1335', 'IPDMRPTL1336') ||
      this.getValueOfMASTERDATA('IPDMRPTL1335', 'IPDMRPTL1337')) {
        str += '14. ????y m???t:'
        if (this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1311') ||
        this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1312') ||
        this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1313') ||
        this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1314') ||
        this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1315') ||
        this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1316')) {
          str += '\n   + ????a th???:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1311')) {
            str += ' B??nh th?????ng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1312')) {
            if (this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1313')) {
              str += ' L??m gai: ' + this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1313')
            } else {
              str += ' L??m gai'
            }
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1314')) {
            str += ', Ph??'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1315')) {
            str += ', Teo'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1316')) {
            str += ', B???c m??u'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1317', 'IPDMRPTL1318') ||
        this.getValueOfMASTERDATA('IPDMRPTL1317', 'IPDMRPTL1319') ||
        this.getValueOfMASTERDATA('IPDMRPTL1317', 'IPDMRPTL1320') ||
        this.getValueOfMASTERDATA('IPDMRPTL1317', 'IPDMRPTL1321')) {
          str += '\n   + Ho??ng ??i???m:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1317', 'IPDMRPTL1318')) {
            str += ' B??nh th?????ng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1317', 'IPDMRPTL1319')) {
            str += ', M???t ??nh H??'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1317', 'IPDMRPTL1320')) {
            str += ', S???o H??'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1317', 'IPDMRPTL1321')) {
            if (this.getValueOfMASTERDATA('IPDMRPTL1322', 'IPDMRPTL1323') || this.getValueOfMASTERDATA('IPDMRPTL1322', 'IPDMRPTL1324')) {
              str += ', Ph??:'
              if (this.getValueOfMASTERDATA('IPDMRPTL1322', 'IPDMRPTL1323')) {
                str += ', Khu tr??'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1322', 'IPDMRPTL1324')) {
                str += ', To??? lan'
              }
            } else {
              str += ', Ph??'
            }
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1326', 'IPDMRPTL1327') ||
        this.getValueOfMASTERDATA('IPDMRPTL1326', 'IPDMRPTL1328') ||
        this.getValueOfMASTERDATA('IPDMRPTL1326', 'IPDMRPTL1329') ||
        this.getValueOfMASTERDATA('IPDMRPTL1326', 'IPDMRPTL1330') ||
        this.getValueOfMASTERDATA('IPDMRPTL1326', 'IPDMRPTL1331')) {
          str += '\n   + V??ng m???c: H??? m???ch:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1326', 'IPDMRPTL1327')) {
            str += ' B??nh th?????ng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1326', 'IPDMRPTL1328')) {
            str += ', T???c ??M'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1326', 'IPDMRPTL1329')) {
            str += ', T???c TM'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1326', 'IPDMRPTL1330')) {
            str += ', T??n m???ch'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1326', 'IPDMRPTL1331')) {
            if (this.getValueOfMASTERDATA('IPDMRPTL1332', 'IPDMRPTL1333') || this.getValueOfMASTERDATA('IPDMRPTL1332', 'IPDMRPTL1334')) {
              str += ', Tho??i ho?? VM:'
              if (this.getValueOfMASTERDATA('IPDMRPTL1332', 'IPDMRPTL1333')) {
                str += ' Chu bi??n'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1332', 'IPDMRPTL1334')) {
                str += ', Trung t??m'
              }
            } else {
              str += ', Tho??i ho?? VM'
            }
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1335', 'IPDMRPTL1336')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1335', 'IPDMRPTL1337')) {
            str += '\n   + B???nh l?? kh??c: ' + this.getValueOfMASTERDATA('IPDMRPTL1335', 'IPDMRPTL1337')
          } else {
            str += '\n   + B???nh l?? kh??c'
          }
        }
      }
      // 15
      if (this.getValueOfMASTERDATA('IPDMRPTL1338', 'IPDMRPTL1339') || this.getValueOfMASTERDATA('IPDMRPTL1338', 'IPDMRPTL1340') || this.getValueOfMASTERDATA('IPDMRPTL1338', 'IPDMRPTL1341')) {
        str += '\n15. H???c m???t:'
        if (this.getValueOfMASTERDATA('IPDMRPTL1338', 'IPDMRPTL1339')) {
          str += ' B??nh th?????ng'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1338', 'IPDMRPTL1340')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1338', 'IPDMRPTL1341')) {
            str += ', B???nh l??: ' + this.getValueOfMASTERDATA('IPDMRPTL1338', 'IPDMRPTL1341')
          } else {
            str += ', B???nh l??'
          }
        }
        str += '\n'
      }
      // 4.2 Kh??m b???nh to??n th??n
      if (this.getValueOfMASTERDATA('IPDMRPT1606', 'IPDMRPT1607') ||
      this.getValueOfMASTERDATA('IPDMRPT1608', 'IPDMRPT1609') ||
      this.getValueOfMASTERDATA('IPDMRPT1610', 'IPDMRPT1611') ||
      this.getValueOfMASTERDATA('IPDMRPT1612', 'IPDMRPT1613') ||
      this.getValueOfMASTERDATA('IPDMRPT1612', 'IPDMRPT1614') ||
      this.getValueOfMASTERDATA('IPDMRPT1616', 'IPDMRPT1617') ||
      this.getValueOfMASTERDATA('IPDMRPT1616', 'IPDMRPT1618') ||
      this.getValueOfMASTERDATA('IPDMRPT1620', 'IPDMRPT1621') ||
      this.getValueOfMASTERDATA('IPDMRPT1620', 'IPDMRPT1622') ||
      this.getValueOfMASTERDATA('IPDMRPT1624', 'IPDMRPT1625') ||
      this.getValueOfMASTERDATA('IPDMRPT1624', 'IPDMRPT1626') ||
      this.getValueOfMASTERDATA('IPDMRPT1628', 'IPDMRPT1629') ||
      this.getValueOfMASTERDATA('IPDMRPT1628', 'IPDMRPT1630') ||
      this.getValueOfMASTERDATA('IPDMRPT1632', 'IPDMRPT1633') ||
      this.getValueOfMASTERDATA('IPDMRPT1632', 'IPDMRPT1634') ||
      this.getValueOfMASTERDATA('IPDMRPT1636', 'IPDMRPT1637') ||
      this.getValueOfMASTERDATA('IPDMRPT1636', 'IPDMRPT1638') ||
      this.getValueOfMASTERDATA('IPDMRPT1640', 'IPDMRPT1641')) {
        str += 'Kh??m b???nh to??n th??n'
      }
      if (this.getValueOfMASTERDATA('IPDMRPT1606', 'IPDMRPT1607')) {
        str += '\n   + Huy???t ??p: ' + this.getValueOfMASTERDATA('IPDMRPT1606', 'IPDMRPT1607') + ' (mmHg)'
      }
      if (this.getValueOfMASTERDATA('IPDMRPT1608', 'IPDMRPT1609')) {
        str += '\n   + Nhi???t ?????: ' + this.getValueOfMASTERDATA('IPDMRPT1608', 'IPDMRPT1609') + ' (??C)'
      }
      if (this.getValueOfMASTERDATA('IPDMRPT1610', 'IPDMRPT1611')) {
        str += '\n   + M???ch: ' + this.getValueOfMASTERDATA('IPDMRPT1610', 'IPDMRPT1611') + ' (nh???p/ph??t)'
      }
      if (this.getValueOfMASTERDATA('IPDMRPT1612', 'IPDMRPT1613') || this.getValueOfMASTERDATA('IPDMRPT1612', 'IPDMRPT1614')) {
        str += '\n   + N???i ti???t: '
        if (this.getValueOfMASTERDATA('IPDMRPT1612', 'IPDMRPT1613')) {
          str += ' B??nh th?????ng'
        }
        if (this.getValueOfMASTERDATA('IPDMRPT1612', 'IPDMRPT1614')) {
          if (this.getValueOfMASTERDATA('IPDMRPT1612', 'IPDMRPT1615')) {
            str += ', C?? b???nh: ' + this.getValueOfMASTERDATA('IPDMRPT1612', 'IPDMRPT1615')
          } else {
            str += ', C?? b???nh'
          }
        }
      }
      if (this.getValueOfMASTERDATA('IPDMRPT1616', 'IPDMRPT1617') || this.getValueOfMASTERDATA('IPDMRPT1616', 'IPDMRPT1618')) {
        str += '\n   + T??m th???n, th???n kinh: '
        if (this.getValueOfMASTERDATA('IPDMRPT1616', 'IPDMRPT1617')) {
          str += ' B??nh th?????ng'
        }
        if (this.getValueOfMASTERDATA('IPDMRPT1616', 'IPDMRPT1618')) {
          if (this.getValueOfMASTERDATA('IPDMRPT1616', 'IPDMRPT1619')) {
            str += ', C?? b???nh: ' + this.getValueOfMASTERDATA('IPDMRPT1616', 'IPDMRPT1619')
          } else {
            str += ', C?? b???nh'
          }
        }
      }
      if (this.getValueOfMASTERDATA('IPDMRPT1620', 'IPDMRPT1621') || this.getValueOfMASTERDATA('IPDMRPT1620', 'IPDMRPT1622')) {
        str += '\n   + Tu???n ho??n: '
        if (this.getValueOfMASTERDATA('IPDMRPT1620', 'IPDMRPT1621')) {
          str += ' B??nh th?????ng'
        }
        if (this.getValueOfMASTERDATA('IPDMRPT1620', 'IPDMRPT1622')) {
          if (this.getValueOfMASTERDATA('IPDMRPT1620', 'IPDMRPT1623')) {
            str += ', C?? b???nh: ' + this.getValueOfMASTERDATA('IPDMRPT1620', 'IPDMRPT1623')
          } else {
            str += ', C?? b???nh'
          }
        }
      }
      if (this.getValueOfMASTERDATA('IPDMRPT1624', 'IPDMRPT1625') || this.getValueOfMASTERDATA('IPDMRPT1624', 'IPDMRPT1626')) {
        str += '\n   + H?? h???p: '
        if (this.getValueOfMASTERDATA('IPDMRPT1624', 'IPDMRPT1625')) {
          str += ' B??nh th?????ng'
        }
        if (this.getValueOfMASTERDATA('IPDMRPT1624', 'IPDMRPT1626')) {
          if (this.getValueOfMASTERDATA('IPDMRPT1624', 'IPDMRPT1627')) {
            str += ', C?? b???nh: ' + this.getValueOfMASTERDATA('IPDMRPT1624', 'IPDMRPT1627')
          } else {
            str += ', C?? b???nh'
          }
        }
      }
      if (this.getValueOfMASTERDATA('IPDMRPT1628', 'IPDMRPT1629') || this.getValueOfMASTERDATA('IPDMRPT1628', 'IPDMRPT1630')) {
        str += '\n   + Ti??u ho??: '
        if (this.getValueOfMASTERDATA('IPDMRPT1628', 'IPDMRPT1629')) {
          str += ' B??nh th?????ng'
        }
        if (this.getValueOfMASTERDATA('IPDMRPT1628', 'IPDMRPT1630')) {
          if (this.getValueOfMASTERDATA('IPDMRPT1628', 'IPDMRPT1631')) {
            str += ', C?? b???nh: ' + this.getValueOfMASTERDATA('IPDMRPT1628', 'IPDMRPT1631')
          } else {
            str += ', C?? b???nh'
          }
        }
      }
      if (this.getValueOfMASTERDATA('IPDMRPT1632', 'IPDMRPT1633') || this.getValueOfMASTERDATA('IPDMRPT1628', 'IPDMRPT1634')) {
        str += '\n   + C?? x????ng kh???p: '
        if (this.getValueOfMASTERDATA('IPDMRPT1632', 'IPDMRPT1633')) {
          str += ' B??nh th?????ng'
        }
        if (this.getValueOfMASTERDATA('IPDMRPT1632', 'IPDMRPT1634')) {
          if (this.getValueOfMASTERDATA('IPDMRPT1632', 'IPDMRPT1635')) {
            str += ', C?? b???nh: ' + this.getValueOfMASTERDATA('IPDMRPT1632', 'IPDMRPT1635')
          } else {
            str += ', C?? b???nh'
          }
        }
      }
      if (this.getValueOfMASTERDATA('IPDMRPT1636', 'IPDMRPT1637') || this.getValueOfMASTERDATA('IPDMRPT1636', 'IPDMRPT1638')) {
        str += '\n   + Ti???t ni???u, sinh d???c: '
        if (this.getValueOfMASTERDATA('IPDMRPT1636', 'IPDMRPT1637')) {
          str += ' B??nh th?????ng'
        }
        if (this.getValueOfMASTERDATA('IPDMRPT1636', 'IPDMRPT1638')) {
          if (this.getValueOfMASTERDATA('IPDMRPT1636', 'IPDMRPT1639')) {
            str += ', C?? b???nh: ' + this.getValueOfMASTERDATA('IPDMRPT1636', 'IPDMRPT1639')
          } else {
            str += ', C?? b???nh'
          }
        }
      }
      if (this.getValueOfMASTERDATA('IPDMRPT1640', 'IPDMRPT1641')) {
        str += '\n   + Kh??c: ' + this.getValueOfMASTERDATA('IPDMRPT1640', 'IPDMRPT1641')
      }
      if (str) {
        str = str.replaceAll('+ ,', '+')
        str = str.replaceAll(':,', ': ')
        str = str.replaceAll('(,', '(')
        str = str.replaceAll(': ,', ':')
      }
      if (!noneDex) {
        str += '\nC??c x??t nghi???m c???n l??m s??ng c???n l??m: ' + this.getValueOfMASTERDATA('IPDMRPTCXNC', 'IPDMRPTCXNCANS')
        str += '\nT??m t???t b???nh ??n: ' + this.getValueOfMASTERDATA('IPDMRPTTTBA', 'IPDMRPTTTBAANS')
      }
      if (noneDex) {
        str = str.replaceAll('       +', '&emsp;&emsp;+')
        str = str.replaceAll('     +', '&emsp;&nbsp;+')
        str = str.replaceAll('   +', '&emsp;+')
      }
      return str
    },
    getNameType () {
      let name = 'MedicalRecord'
      if (this.$route.meta.type === 'Pediatric') {
        name = 'MedicalRecordPediatric'
      }
      if (this.$route.meta.type === 'Neonatal') {
        name = 'MedicalRecordNeonatal'
      }
      if (this.$route.meta.type === 'Obstetrics') {
        name = 'MedicalRecordObstetrics'
      }
      if (this.$route.meta.type === 'Gynecological') {
        name = 'MedicalRecordGynecological'
      }
      if (this.$route.meta.type === 'Gynecological') {
        name = 'MedicalRecordGynecological'
      }
      if (this.$route.meta.type === 'Oncology') {
        name = 'MedicalRecordOncology'
      }
      if (this.$route.meta.type === 'A01_195_050919_V') {
        name = 'TheSurgicalMedicalRecord'
      }
      if (this.$route.meta.type === 'A01_040_050919_V') {
        name = 'A01_040_050919_V'
      }
      if (this.$route.meta.type === 'A01_039_050919_V') {
        name = 'A01_039_050919_V'
      }
      if (this.$route.meta.type === 'Eye') {
        name = 'MedicalRecordEye'
      }
      if (this.$route.meta.type === 'CardiovascularForm') {
        name = 'CardiovascularForm'
      }
      return name
    }
  },
  created () {
  }
}
