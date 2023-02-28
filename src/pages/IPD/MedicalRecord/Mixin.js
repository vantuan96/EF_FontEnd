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
        title: this.$t('Thông báo'),
        text: this.$t(`Tạo mới BỆNH ÁN ${nameRoute} - ${formName}`),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.$t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.create()
            }
          },
          {
            title: this.$t('Bỏ qua'),
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
      // Đồng bộ từ các bệnh án
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
        str += 'Bệnh sử:\n'
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
      // MẮT PHẢI
      for (const property in this.MASTERDATA) {
        if (property.includes('TR')) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              if (item.Value && !str.includes('MẮT PHẢI\n')) {
                str += 'MẮT PHẢI\n'
              }
            })
          }
        }
      }
      // 1
      if (this.getValueOfMASTERDATA('IPDMRPTR1079', 'IPDMRPTR1080') || this.getValueOfMASTERDATA('IPDMRPTR1081', 'IPDMRPTR1082') || this.getValueOfMASTERDATA('IPDMRPTR1083', 'IPDMRPTR1084') || this.getValueOfMASTERDATA('IPDMRPTR1085', 'IPDMRPTR1086')) {
        str += '1. Thị lực: '
        str += '\n'
      }
      if (this.getValueOfMASTERDATA('IPDMRPTR1079', 'IPDMRPTR1080')) {
        str += '   + ' + 'Không kính: ' + this.getValueOfMASTERDATA('IPDMRPTR1079', 'IPDMRPTR1080')
        str += '\n'
      }
      if (this.getValueOfMASTERDATA('IPDMRPTR1081', 'IPDMRPTR1082')) {
        str += '   + ' + 'Qua lỗ: ' + this.getValueOfMASTERDATA('IPDMRPTR1081', 'IPDMRPTR1082')
        str += '\n'
      }
      if (this.getValueOfMASTERDATA('IPDMRPTR1083', 'IPDMRPTR1084')) {
        str += '   + ' + 'Có chỉnh kính: ' + this.getValueOfMASTERDATA('IPDMRPTR1083', 'IPDMRPTR1084')
        str += '\n'
      }
      if (this.getValueOfMASTERDATA('IPDMRPTR1085', 'IPDMRPTR1086')) {
        str += '   + ' + 'Nhìn gần: ' + this.getValueOfMASTERDATA('IPDMRPTR1085', 'IPDMRPTR1086')
        str += '\n'
      }
      // 2
      if (this.getValueOfMASTERDATA('IPDMRPTR1087', 'IPDMRPTR1088')) {
        str += '2. Nhãn áp: ' + this.getValueOfMASTERDATA('IPDMRPTR1087', 'IPDMRPTR1088')
        str += '\n'
      }
      // 3
      if (this.getValueOfMASTERDATA('IPDMRPTR1089', 'IPDMRPTR1090')) {
        str += '3. Lác và vận nhãn: ' + this.getValueOfMASTERDATA('IPDMRPTR1089', 'IPDMRPTR1090')
        str += '\n'
      }
      if (this.getValueOfMASTERDATA('IPDMRPTR1091', 'IPDMRPTR1092')) {
        str += '   + Bơm lệ quản: Nước thoát tốt'
        str += '\n'
      }
      // 4
      if (this.getValueOfMASTERDATA('IPDMRPTR1093', 'IPDMRPTR1094') || this.getValueOfMASTERDATA('IPDMRPTR1093', 'IPDMRPTR1095')) {
        str += '4. Lệ đạo:'
        if (this.getValueOfMASTERDATA('IPDMRPTR1093', 'IPDMRPTR1094')) {
          str += ' Trào lệ quản đối diên'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1093', 'IPDMRPTR1095')) {
          str += ', Trào tại chỗ'
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
        str += '5. Mi mắt:'
        if (this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1097')) {
          str += ', Bình thường'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1098')) {
          str += ', Phù'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1099')) {
          str += ', Chắp'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1100')) {
          str += ', Lẹo'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1101')) {
          str += ', Sẹo da mi'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1102')) {
          str += ', Sụp mi'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1103')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1104')) {
            str += ', Khác: ' + this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1104')
          } else {
            str += ', Khác'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1105')) {
          str += ', Quặm'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1106')) {
          str += ', Hở mi'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1107')) {
          str += ', Trễ mi'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1109', 'IPDMRPTR1110')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1109', 'IPDMRPTR1111') || this.getValueOfMASTERDATA('IPDMRPTR1109', 'IPDMRPTR1112') || this.getValueOfMASTERDATA('IPDMRPTR1109', 'IPDMRPTR1113')) {
            str += '\n   + U mi: '
            if (this.getValueOfMASTERDATA('IPDMRPTR1109', 'IPDMRPTR1111')) {
              str += 'Tính chất U: ' + this.getValueOfMASTERDATA('IPDMRPTR1109', 'IPDMRPTR1111')
            }
            if (this.getValueOfMASTERDATA('IPDMRPTR1109', 'IPDMRPTR1112')) {
              str += ', Vị trí: ' + this.getValueOfMASTERDATA('IPDMRPTR1109', 'IPDMRPTR1112')
            }
            if (this.getValueOfMASTERDATA('IPDMRPTR1109', 'IPDMRPTR1113')) {
              str += ', Kích thước: ' + this.getValueOfMASTERDATA('IPDMRPTR1109', 'IPDMRPTR1113')
            }
          } else {
            str += '\n   + U mi'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1096', 'IPDMRPTR1108')) {
          str += '\n   + Viêm bờ mi (chân lông mi)'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1114', 'IPDMRPTR1115') ||
        this.getValueOfMASTERDATA('IPDMRPTR1114', 'IPDMRPTR1116') ||
        this.getValueOfMASTERDATA('IPDMRPTR1114', 'IPDMRPTR1117') ||
        this.getValueOfMASTERDATA('IPDMRPTR1114', 'IPDMRPTR1118')) {
          str += '\n   + Tuyến bờ mi:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1114', 'IPDMRPTR1115')) {
            str += ' Bình thường'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1114', 'IPDMRPTR1116')) {
            str += ', Viêm tắc nhẹ'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1114', 'IPDMRPTR1117')) {
            str += ', Vừa'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1114', 'IPDMRPTR1118')) {
            str += ', Nặng'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1119', 'IPDMRPTR1120')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1119', 'IPDMRPTR1121')) {
            str += '\n   + Tổn thương khác: ' + this.getValueOfMASTERDATA('IPDMRPTR1119', 'IPDMRPTR1121')
          } else {
            str += '\n   + Tổn thương khác'
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
        str += '6. Kết mạc:'
        if (this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1123') ||
        this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1124')) {
          str += '\n   + Cương tụ:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1123')) {
            str += ' Toả lan'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1124')) {
            str += ', Rìa'
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
            str += ' , Phù nề'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1126')) {
            str += ', Xuất huyết'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1127')) {
            str += ', Sừng hoá'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1128')) {
            str += ', Nhú'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1129')) {
            str += ', Hột'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1122', 'IPDMRPTR1130')) {
            str += ', Sẹo'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1131', 'IPDMRPTR1132')) {
          str += '\n   + U kết mạc:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1131', 'IPDMRPTR1133')) {
            str += ' Tính chất: ' + this.getValueOfMASTERDATA('IPDMRPTR1131', 'IPDMRPTR1133')
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1131', 'IPDMRPTR1134')) {
            str += ', Vị trí: ' + this.getValueOfMASTERDATA('IPDMRPTR1131', 'IPDMRPTR1134')
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1131', 'IPDMRPTR1135')) {
            str += ', Kích thước: ' + this.getValueOfMASTERDATA('IPDMRPTR1131', 'IPDMRPTR1135')
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1136', 'IPDMRPTR1137') ||
        this.getValueOfMASTERDATA('IPDMRPTR1136', 'IPDMRPTR1138') ||
        this.getValueOfMASTERDATA('IPDMRPTR1136', 'IPDMRPTR1139')) {
          str += '\n   + Cùng đồ:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1136', 'IPDMRPTR1137')) {
            str += ' Bình thường'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1136', 'IPDMRPTR1138')) {
            str += ', Cạn'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1136', 'IPDMRPTR1139')) {
            str += ', Dính'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1140', 'IPDMRPTR1141')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1140', 'IPDMRPTR1142')) {
            str += '\n   + Tổn thương khác: ' + this.getValueOfMASTERDATA('IPDMRPTR1140', 'IPDMRPTR1142')
          } else {
            str += '\n   + Tổn thương khác: '
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
        str += '7. Giác mạc: '
        if (this.getValueOfMASTERDATA('IPDMRPTR1662', 'IPDMRPTR1663') ||
        this.getValueOfMASTERDATA('IPDMRPTR1662', 'IPDMRPTR1664') ||
        this.getValueOfMASTERDATA('IPDMRPTR1662', 'IPDMRPTR1665')) {
          str += '\n   + Kích thước:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1662', 'IPDMRPTR1663')) {
            str += ' Bình thường'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1662', 'IPDMRPTR1664')) {
            str += ', To'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1662', 'IPDMRPTR1665')) {
            str += ', Nhỏ'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1666', 'IPDMRPTR1667') ||
        this.getValueOfMASTERDATA('IPDMRPTR1666', 'IPDMRPTR1668') ||
        this.getValueOfMASTERDATA('IPDMRPTR1666', 'IPDMRPTR1669')) {
          str += '\n   + Hình dạng:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1666', 'IPDMRPTR1667')) {
            str += ' Bình thường'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1666', 'IPDMRPTR1668')) {
            str += ', Nón'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1666', 'IPDMRPTR1669')) {
            str += ', Cầu'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1154', 'IPDMRPTR1155') ||
          this.getValueOfMASTERDATA('IPDMRPTR1154', 'IPDMRPTR1156') ||
          this.getValueOfMASTERDATA('IPDMRPTR1154', 'IPDMRPTR1157')) {
          str += '\n   + Biểu mô:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1154', 'IPDMRPTR1155')) {
            str += '\n     + Bình thường'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1154', 'IPDMRPTR1156')) {
            if (this.getValueOfMASTERDATA('IPDMRPTR1159', 'IPDMRPTR1160') ||
            this.getValueOfMASTERDATA('IPDMRPTR1159', 'IPDMRPTR1161') ||
            this.getValueOfMASTERDATA('IPDMRPTR1159', 'IPDMRPTR1162') ||
            this.getValueOfMASTERDATA('IPDMRPTR1163', 'IPDMRPTR1164') ||
            this.getValueOfMASTERDATA('IPDMRPTR1163', 'IPDMRPTR1165') ||
            this.getValueOfMASTERDATA('IPDMRPTR1163', 'IPDMRPTR1166')) {
              str += '\n     + Tổn thương dạng chấm:'
              if (this.getValueOfMASTERDATA('IPDMRPTR1167', 'IPDMRPTR1168')) {
                str += ' Thoái hoá dải băng'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1167', 'IPDMRPTR1169')) {
                str += ', Lắng đọng thuốc'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1159', 'IPDMRPTR1160') ||
              this.getValueOfMASTERDATA('IPDMRPTR1159', 'IPDMRPTR1161') ||
              this.getValueOfMASTERDATA('IPDMRPTR1159', 'IPDMRPTR1162')) {
                str += '\n       + Phù bọng biểu mô:'
                if (this.getValueOfMASTERDATA('IPDMRPTR1159', 'IPDMRPTR1160')) {
                  str += ' Nhẹ'
                }
                if (this.getValueOfMASTERDATA('IPDMRPTR1159', 'IPDMRPTR1161')) {
                  str += ', Vừa'
                }
                if (this.getValueOfMASTERDATA('IPDMRPTR1159', 'IPDMRPTR1162')) {
                  str += ', Nặng'
                }
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1163', 'IPDMRPTR1164') ||
              this.getValueOfMASTERDATA('IPDMRPTR1163', 'IPDMRPTR1165') ||
              this.getValueOfMASTERDATA('IPDMRPTR1163', 'IPDMRPTR1166')) {
                str += '\n       + Bờ tổn thương:'
                if (this.getValueOfMASTERDATA('IPDMRPTR1163', 'IPDMRPTR1164')) {
                  str += ' Nham nhở'
                }
                if (this.getValueOfMASTERDATA('IPDMRPTR1163', 'IPDMRPTR1165')) {
                  str += ', Trơn nhẵn'
                }
                if (this.getValueOfMASTERDATA('IPDMRPTR1163', 'IPDMRPTR1166')) {
                  str += ', Đào rãnh'
                }
              }
            } else {
              str += '\n     + Tổn thương dạng chấm'
            }
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1154', 'IPDMRPTR1157')) {
            if (this.getValueOfMASTERDATA('IPDMRPTR1154', 'IPDMRPTR1158')) {
              str += '\n     + Tổn thương khác: ' + this.getValueOfMASTERDATA('IPDMRPTR1154', 'IPDMRPTR1158')
            } else {
              str += '\n     + Tổn thương khác'
            }
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1170', 'IPDMRPTR1171') ||
        this.getValueOfMASTERDATA('IPDMRPTR1170', 'IPDMRPTR1172') ||
        this.getValueOfMASTERDATA('IPDMRPTR1170', 'IPDMRPTR1173') ||
        this.getValueOfMASTERDATA('IPDMRPTR1170', 'IPDMRPTR1174')) {
          str += '\n   + Nhu mô:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1170', 'IPDMRPTR1171')) {
            str += ' Bình thường'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1170', 'IPDMRPTR1172')) {
            str += ', Phù'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1170', 'IPDMRPTR1173')) {
            if (this.getValueOfMASTERDATA('IPDMRPTR1176', 'IPDMRPTR1177') ||
            this.getValueOfMASTERDATA('IPDMRPTR1176', 'IPDMRPTR1178') ||
            this.getValueOfMASTERDATA('IPDMRPTR1176', 'IPDMRPTR1179') ||
            this.getValueOfMASTERDATA('IPDMRPTR1180', 'IPDMRPTR1181') ||
            this.getValueOfMASTERDATA('IPDMRPTR1180', 'IPDMRPTR1182') ||
            this.getValueOfMASTERDATA('IPDMRPTR1180', 'IPDMRPTR1183')) {
              str += '\n     + Thẩm lậu:'
              if (this.getValueOfMASTERDATA('IPDMRPTR1176', 'IPDMRPTR1177')) {
                str += ' Nông'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1176', 'IPDMRPTR1178')) {
                str += ', Sâu'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1176', 'IPDMRPTR1179')) {
                str += ', Rất sâu'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1180', 'IPDMRPTR1181')) {
                str += ', Khu trú'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1180', 'IPDMRPTR1182')) {
                str += ', Lan toả'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1180', 'IPDMRPTR1183')) {
                str += ', Nhiều ổ vệ tinh'
              }
            } else {
              str += '\n     + Thẩm lậu'
            }
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1170', 'IPDMRPTR1174')) {
            if (this.getValueOfMASTERDATA('IPDMRPTR1170', 'IPDMRPTR1175')) {
              str += '\n     + Tổn thương khác: ' + this.getValueOfMASTERDATA('IPDMRPTR1170', 'IPDMRPTR1175')
            } else {
              str += '\n     + Tổn thương khác'
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
          str += '\n   + Nội mô & Descemet:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1185')) {
            str += ' Nếp gấp'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1186')) {
            str += ', Tủa sắc tố mặt sau GM'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1187')) {
            str += ', Mủ mặt sau'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1188')) {
            str += ', Xuất tiết mặt sau'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1189')) {
            str += ', Guttata'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1190')) {
            str += ', Rạn màng Des'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1191')) {
            if (this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1192')) {
              str += ', Tổn thương khác : ' + this.getValueOfMASTERDATA('IPDMRPTR1184', 'IPDMRPTR1192')
            } else {
              str += ', Tổn thương khác'
            }
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1193', 'IPDMRPTR1194')) {
            str += '\n   + Doạ thủng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1193', 'IPDMRPTR1195')) {
            str += '\n   + Kẹt mống mắt'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1193', 'IPDMRPTR1196')) {
            if (this.getValueOfMASTERDATA('IPDMRPTR1197', 'IPDMRPTR1198') ||
            this.getValueOfMASTERDATA('IPDMRPTR1197', 'IPDMRPTR1199') ||
            this.getValueOfMASTERDATA('IPDMRPTR1197', 'IPDMRPTR1200') ||
            this.getValueOfMASTERDATA('IPDMRPTR1201', 'IPDMRPTR1202') ||
            this.getValueOfMASTERDATA('IPDMRPTR1201', 'IPDMRPTR1203') ||
            this.getValueOfMASTERDATA('IPDMRPTR1201', 'IPDMRPTR1205')) {
              str += '\n   + Thủng giác mạc:'
              if (this.getValueOfMASTERDATA('IPDMRPTR1197', 'IPDMRPTR1198')) {
                str += ' Trung tâm'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1197', 'IPDMRPTR1199')) {
                str += ', Lệch tâm'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1197', 'IPDMRPTR1200')) {
                str += ', Sát rìa'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1201', 'IPDMRPTR1202')) {
                str += ', Seidel'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1201', 'IPDMRPTR1203')) {
                if (this.getValueOfMASTERDATA('IPDMRPTR1201', 'IPDMRPTR1204')) {
                  str += ', Đường kính thủng: ' + this.getValueOfMASTERDATA('IPDMRPTR1201', 'IPDMRPTR1204')
                } else {
                  str += ', Đường kính thủng'
                }
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1201', 'IPDMRPTR1205')) {
                str += ', Thủng bít'
              }
            } else {
              str += '\n   + Thủng giác mạc'
            }
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1206', 'IPDMRPTR1207') ||
        this.getValueOfMASTERDATA('IPDMRPTR1206', 'IPDMRPTR1208') ||
        this.getValueOfMASTERDATA('IPDMRPTR1206', 'IPDMRPTR1209')) {
          str += '\n   + Cảm giác giác mạc:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1206', 'IPDMRPTR1207')) {
            str += ' Mất'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1206', 'IPDMRPTR1208')) {
            str += ', Giảm'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1206', 'IPDMRPTR1209')) {
            str += ', Bình thường'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1210', 'IPDMRPTR1211') ||
        this.getValueOfMASTERDATA('IPDMRPTR1210', 'IPDMRPTR1212') ||
        this.getValueOfMASTERDATA('IPDMRPTR1210', 'IPDMRPTR1213')) {
          str += '\n   + Tân mạch:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1210', 'IPDMRPTR1211')) {
            str += ' Nông, hướng tâm'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1210', 'IPDMRPTR1212')) {
            str += ', Ly tâm'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1210', 'IPDMRPTR1213')) {
            str += ', Sâu'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1214', 'IPDMRPTR1215') ||
        this.getValueOfMASTERDATA('IPDMRPTR1214', 'IPDMRPTR1216')) {
          str += '\n   + Vùng rìa giác mạc:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1214', 'IPDMRPTR1215')) {
            str += ' Thoái hoá già'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1214', 'IPDMRPTR1216')) {
            str += ', Lắng đọng Canxi'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1217', 'IPDMRPTR1218')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1217', 'IPDMRPTR1219')) {
            str += '\n   + Bất thường khác: ' + this.getValueOfMASTERDATA('IPDMRPTR1217', 'IPDMRPTR1219')
          } else {
            str += '\n   + Bất thường khác'
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
        str += '\n8. Củng mạc:'
        if (this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1221')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1227', 'IPDMRPTR1228') ||
          this.getValueOfMASTERDATA('IPDMRPTR1227', 'IPDMRPTR1229') ||
          this.getValueOfMASTERDATA('IPDMRPTR1227', 'IPDMRPTR1230') ||
          this.getValueOfMASTERDATA('IPDMRPTR1227', 'IPDMRPTR1231') ||
          this.getValueOfMASTERDATA('IPDMRPTR1227', 'IPDMRPTR1232')) {
            str += '\n   + Viêm:'
            if (this.getValueOfMASTERDATA('IPDMRPTR1227', 'IPDMRPTR1228')) {
              str += ' Nốt'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTR1227', 'IPDMRPTR1229')) {
              str += ', Lan toả'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTR1227', 'IPDMRPTR1230')) {
              str += ', Áp xe'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTR1227', 'IPDMRPTR1231')) {
              str += ', Nông'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTR1227', 'IPDMRPTR1232')) {
              str += ', Sâu'
            }
          } else {
            str += '\n   + Viêm'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1222') ||
          this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1223') ||
          this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1224') ||
          this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1225')) {
          str += '\n   + '
          if (this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1222')) {
            str += ', Viêm thượng củng mạc'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1223')) {
            str += ', Giãn lối'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1224')) {
            str += ', Tiêu mỏng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1225')) {
            str += ', Hoại tử'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1226')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1648')) {
            str += '\n   + Chi tiết khác: ' + this.getValueOfMASTERDATA('IPDMRPTR1220', 'IPDMRPTR1648')
          } else {
            str += '\n   + Chi tiết khác'
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
        str += '9. Tiền phòng (Góc TP):'
        if (this.getValueOfMASTERDATA('IPDMRPTR1650', 'IPDMRPTR1651')) {
          str += ' Bình thường'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1650', 'IPDMRPTR1652')) {
          str += ', Nông'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1650', 'IPDMRPTR1653')) {
          str += ', Mất TP'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1650', 'IPDMRPTR1654')) {
          str += ', Sâu'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1650', 'IPDMRPTR1655')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1650', 'IPDMRPTR1678')) {
            str += ', Tổn thương khác: ' + this.getValueOfMASTERDATA('IPDMRPTR1650', 'IPDMRPTR1678')
          } else {
            str += ', Tổn thương khác'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1241', 'IPDMRPTR1242')) {
          str += '\n   + Tiền phòng: ' + this.getValueOfMASTERDATA('IPDMRPTR1241', 'IPDMRPTR1242') + 'mm'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1243', 'IPDMRPTR1244')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1243', 'IPDMRPTR1245')) {
            str += ', Mủ: ' + this.getValueOfMASTERDATA('IPDMRPTR1243', 'IPDMRPTR1245') + ' mm'
          } else {
            str += ', Mủ'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1246', 'IPDMRPTR1247')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1246', 'IPDMRPTR1248')) {
            str += ', Máu: ' + this.getValueOfMASTERDATA('IPDMRPTR1246', 'IPDMRPTR1248') + ' mm'
          } else {
            str += ', Máu'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1249', 'IPDMRPTR1250')) {
          str += ', Tyndal(+)'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1251', 'IPDMRPTR1252')) {
          str += ', Màng xuất tiết'
        }
        str += '\n'
      }
      // 10
      if (this.getValueOfMASTERDATA('IPDMRPTR1256', 'IPDMRPTR1257') || this.getValueOfMASTERDATA('IPDMRPTR1256', 'IPDMRPTR1258') || this.getValueOfMASTERDATA('IPDMRPTR1256', 'IPDMRPTR1259') || this.getValueOfMASTERDATA('IPDMRPTR1256', 'IPDMRPTR1260') || this.getValueOfMASTERDATA('IPDMRPTR1256', 'IPDMRPTR1261') || this.getValueOfMASTERDATA('IPDMRPTR1256', 'IPDMRPTR1262')) {
        str += '10. Mống mắt:'
        if (this.getValueOfMASTERDATA('IPDMRPTR1256', 'IPDMRPTR1257')) {
          str += ' Nâu xốp'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1256', 'IPDMRPTR1258')) {
          str += ', Xơ teo'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1256', 'IPDMRPTR1259')) {
          str += ', Cương tụ'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1256', 'IPDMRPTR1260')) {
          str += ', Tân mạch'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1256', 'IPDMRPTR1261')) {
          str += ', Phòi'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1256', 'IPDMRPTR1262')) {
          str += ', Kẹt'
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
        str += '11. Đồng tử:'
        if (this.getValueOfMASTERDATA('IPDMRPTR1263', 'IPDMRPTR1264')) {
          str += ', Đường kính: ' + this.getValueOfMASTERDATA('IPDMRPTR1263', 'IPDMRPTR1264') + ' mm'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1265', 'IPDMRPTR1266')) {
          str += ', Tròn'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1265', 'IPDMRPTR1267')) {
          str += ', Méo'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1265', 'IPDMRPTR1268')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1265', 'IPDMRPTR1269')) {
            str += '\n   + Dính: Vị trí dính: ' + this.getValueOfMASTERDATA('IPDMRPTR1265', 'IPDMRPTR1269')
          } else {
            str += '\n   + Dính'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1270', 'IPDMRPTR1271') ||
        this.getValueOfMASTERDATA('IPDMRPTR1270', 'IPDMRPTR1272') ||
        this.getValueOfMASTERDATA('IPDMRPTR1270', 'IPDMRPTR1273')) {
          str += '\n   + Phản xạ:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1270', 'IPDMRPTR1271')) {
            str += ', Tốt'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1270', 'IPDMRPTR1272')) {
            str += ', Kém'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1270', 'IPDMRPTR1273')) {
            str += ', Mất'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1274', 'IPDMRPTR1275') ||
        this.getValueOfMASTERDATA('IPDMRPTR1274', 'IPDMRPTR1276') ||
        this.getValueOfMASTERDATA('IPDMRPTR1274', 'IPDMRPTR1277')) {
          str += '\n   + Ánh đồng tử:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1274', 'IPDMRPTR1275')) {
            str += ', Hồng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1274', 'IPDMRPTR1276')) {
            str += ', Xám'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1274', 'IPDMRPTR1277')) {
            str += ', Không soi được'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1278', 'IPDMRPTR1279')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1278', 'IPDMRPTR1280')) {
            str += '\n   + Tổn thương khác: ' + this.getValueOfMASTERDATA('IPDMRPTR1278', 'IPDMRPTR1280')
          } else {
            str += '\n   + Tổn thương khác'
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
        str += '12. Thuỷ tinh thể:'
        if (this.getValueOfMASTERDATA('IPDMRPTR1281', 'IPDMRPTR1282')) {
          str += ' Bình thường'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1283', 'IPDMRPTR1284')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1283', 'IPDMRPTR1285')) {
            str += '\n   + Đục thuỷ tinh thể: Hình thái đục: ' + this.getValueOfMASTERDATA('IPDMRPTR1283', 'IPDMRPTR1285')
          } else {
            str += '\n   + Đục thuỷ tinh thể'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1286', 'IPDMRPTR1287')) {
          str += '\n   + Lệch'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1288', 'IPDMRPTR1289')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1288', 'IPDMRPTR1290') ||
          this.getValueOfMASTERDATA('IPDMRPTR1288', 'IPDMRPTR1291') ||
          this.getValueOfMASTERDATA('IPDMRPTR1288', 'IPDMRPTR1292') ||
          this.getValueOfMASTERDATA('IPDMRPTR1288', 'IPDMRPTR1293') ||
          this.getValueOfMASTERDATA('IPDMRPTR1288', 'IPDMRPTR1294')) {
            str += '\n   + IOL:'
            if (this.getValueOfMASTERDATA('IPDMRPTR1288', 'IPDMRPTR1290')) {
              str += ', Cân'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTR1288', 'IPDMRPTR1291')) {
              str += ', Lệch'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTR1288', 'IPDMRPTR1292')) {
              str += ', Đục bao sau'
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
            str += '\n   + Tổn thương khác: ' + this.getValueOfMASTERDATA('IPDMRPTR1295', 'IPDMRPTR1297')
          } else {
            str += '\n   + Tổn thương khác'
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
        str += '13. Dịch kính:'
        if (this.getValueOfMASTERDATA('IPDMRPTR1298', 'IPDMRPTR1299')) {
          str += ' Sạch'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1298', 'IPDMRPTR1300')) {
          str += ', Đục'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1298', 'IPDMRPTR1301')) {
          str += ', Xuất huyết'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1298', 'IPDMRPTR1302')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1298', 'IPDMRPTR1303')) {
            str += ', Viêm mủ: ' + this.getValueOfMASTERDATA('IPDMRPTR1298', 'IPDMRPTR1303')
          } else {
            str += ', Viêm mủ'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1304', 'IPDMRPTR1305')) {
          str += ', Xuất huyết'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1304', 'IPDMRPTR1306')) {
          str += ', Tổ chức hoá'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1304', 'IPDMRPTR1307')) {
          str += ', Bong dịch kính sau'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1304', 'IPDMRPTR1308')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1304', 'IPDMRPTR1309')) {
            str += ', Tổn thương khác: ' + this.getValueOfMASTERDATA('IPDMRPTR1304', 'IPDMRPTR1309')
          } else {
            str += ', Tổn thương khác'
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
        str += '14. Đáy mắt:'
        if (this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1311') ||
        this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1312') ||
        this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1313') ||
        this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1314') ||
        this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1315') ||
        this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1316')) {
          str += '\n   + Đĩa thị:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1311')) {
            str += ' Bình thường'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1312')) {
            if (this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1313')) {
              str += ' Lõm gai: ' + this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1313')
            } else {
              str += ' Lõm gai'
            }
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1314')) {
            str += ', Phù'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1315')) {
            str += ', Teo'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1310', 'IPDMRPTR1316')) {
            str += ', Bạc màu'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1317', 'IPDMRPTR1318') ||
        this.getValueOfMASTERDATA('IPDMRPTR1317', 'IPDMRPTR1319') ||
        this.getValueOfMASTERDATA('IPDMRPTR1317', 'IPDMRPTR1320') ||
        this.getValueOfMASTERDATA('IPDMRPTR1317', 'IPDMRPTR1321')) {
          str += '\n   + Hoàng điểm:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1317', 'IPDMRPTR1318')) {
            str += ' Bình thường'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1317', 'IPDMRPTR1319')) {
            str += ', Mất ánh HĐ'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1317', 'IPDMRPTR1320')) {
            str += ', Sẹo HĐ'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1317', 'IPDMRPTR1321')) {
            if (this.getValueOfMASTERDATA('IPDMRPTR1322', 'IPDMRPTR1323') || this.getValueOfMASTERDATA('IPDMRPTR1322', 'IPDMRPTR1324')) {
              str += ', Phù:'
              if (this.getValueOfMASTERDATA('IPDMRPTR1322', 'IPDMRPTR1323')) {
                str += ', Khu trú'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1322', 'IPDMRPTR1324')) {
                str += ', Toả lan'
              }
            } else {
              str += ', Phù'
            }
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1326', 'IPDMRPTR1327') ||
        this.getValueOfMASTERDATA('IPDMRPTR1326', 'IPDMRPTR1328') ||
        this.getValueOfMASTERDATA('IPDMRPTR1326', 'IPDMRPTR1329') ||
        this.getValueOfMASTERDATA('IPDMRPTR1326', 'IPDMRPTR1330') ||
        this.getValueOfMASTERDATA('IPDMRPTR1326', 'IPDMRPTR1331')) {
          str += '\n   + Võng mạc: Hệ mạch:'
          if (this.getValueOfMASTERDATA('IPDMRPTR1326', 'IPDMRPTR1327')) {
            str += ' Bình thường'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1326', 'IPDMRPTR1328')) {
            str += ', Tắc ĐM'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1326', 'IPDMRPTR1329')) {
            str += ', Tắc TM'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1326', 'IPDMRPTR1330')) {
            str += ', Tân mạch'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTR1326', 'IPDMRPTR1331')) {
            if (this.getValueOfMASTERDATA('IPDMRPTR1332', 'IPDMRPTR1333') || this.getValueOfMASTERDATA('IPDMRPTR1332', 'IPDMRPTR1334')) {
              str += ', Thoái hoá VM:'
              if (this.getValueOfMASTERDATA('IPDMRPTR1332', 'IPDMRPTR1333')) {
                str += ' Chu biên'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTR1332', 'IPDMRPTR1334')) {
                str += ', Trung tâm'
              }
            } else {
              str += ', Thoái hoá VM'
            }
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1335', 'IPDMRPTR1336')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1335', 'IPDMRPTR1337')) {
            str += '\n   + Bệnh lý khác: ' + this.getValueOfMASTERDATA('IPDMRPTR1335', 'IPDMRPTR1337')
          } else {
            str += '\n   + Bệnh lý khác'
          }
        }
      }
      // 15
      if (this.getValueOfMASTERDATA('IPDMRPTR1338', 'IPDMRPTR1339') || this.getValueOfMASTERDATA('IPDMRPTR1338', 'IPDMRPTR1340') || this.getValueOfMASTERDATA('IPDMRPTR1338', 'IPDMRPTR1341')) {
        str += '\n15. Hốc mắt:'
        if (this.getValueOfMASTERDATA('IPDMRPTR1338', 'IPDMRPTR1339')) {
          str += ' Bình thường'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTR1338', 'IPDMRPTR1340')) {
          if (this.getValueOfMASTERDATA('IPDMRPTR1338', 'IPDMRPTR1341')) {
            str += ', Bệnh lý: ' + this.getValueOfMASTERDATA('IPDMRPTR1338', 'IPDMRPTR1341')
          } else {
            str += ', Bệnh lý'
          }
        }
        str += '\n'
      }
      // MẮT TRÁI
      for (const property in this.MASTERDATA) {
        if (property.includes('TL')) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              if (item.Value && !str.includes('MẮT TRÁI\n')) {
                str += 'MẮT TRÁI\n'
              }
            })
          }
        }
      }
      // 1
      if (this.getValueOfMASTERDATA('IPDMRPTL1079', 'IPDMRPTL1080') || this.getValueOfMASTERDATA('IPDMRPTL1081', 'IPDMRPTL1082') || this.getValueOfMASTERDATA('IPDMRPTL1083', 'IPDMRPTL1084') || this.getValueOfMASTERDATA('IPDMRPTL1085', 'IPDMRPTL1086')) {
        str += '1. Thị lực: '
        str += '\n'
      }
      if (this.getValueOfMASTERDATA('IPDMRPTL1079', 'IPDMRPTL1080')) {
        str += '   + ' + 'Không kính: ' + this.getValueOfMASTERDATA('IPDMRPTL1079', 'IPDMRPTL1080')
        str += '\n'
      }
      if (this.getValueOfMASTERDATA('IPDMRPTL1081', 'IPDMRPTL1082')) {
        str += '   + ' + 'Qua lỗ: ' + this.getValueOfMASTERDATA('IPDMRPTL1081', 'IPDMRPTL1082')
        str += '\n'
      }
      if (this.getValueOfMASTERDATA('IPDMRPTL1083', 'IPDMRPTL1084')) {
        str += '   + ' + 'Có chỉnh kính: ' + this.getValueOfMASTERDATA('IPDMRPTL1083', 'IPDMRPTL1084')
        str += '\n'
      }
      if (this.getValueOfMASTERDATA('IPDMRPTL1085', 'IPDMRPTL1086')) {
        str += '   + ' + 'Nhìn gần: ' + this.getValueOfMASTERDATA('IPDMRPTL1085', 'IPDMRPTL1086')
        str += '\n'
      }
      // 2
      if (this.getValueOfMASTERDATA('IPDMRPTL1087', 'IPDMRPTL1088')) {
        str += '2. Nhãn áp: ' + this.getValueOfMASTERDATA('IPDMRPTL1087', 'IPDMRPTL1088')
        str += '\n'
      }
      // 3
      if (this.getValueOfMASTERDATA('IPDMRPTL1089', 'IPDMRPTL1090')) {
        str += '3. Lác và vận nhãn: ' + this.getValueOfMASTERDATA('IPDMRPTL1089', 'IPDMRPTL1090')
        str += '\n'
      }
      if (this.getValueOfMASTERDATA('IPDMRPTL1091', 'IPDMRPTL1092')) {
        str += '   + Bơm lệ quản: Nước thoát tốt'
        str += '\n'
      }
      // 4
      if (this.getValueOfMASTERDATA('IPDMRPTL1093', 'IPDMRPTL1094') || this.getValueOfMASTERDATA('IPDMRPTL1093', 'IPDMRPTL1095')) {
        str += '4. Lệ đạo:'
        if (this.getValueOfMASTERDATA('IPDMRPTL1093', 'IPDMRPTL1094')) {
          str += ' Trào lệ quản đối diên'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1093', 'IPDMRPTL1095')) {
          str += ', Trào tại chỗ'
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
        str += '5. Mi mắt:'
        if (this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1097')) {
          str += ', Bình thường'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1098')) {
          str += ', Phù'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1099')) {
          str += ', Chắp'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1100')) {
          str += ', Lẹo'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1101')) {
          str += ', Sẹo da mi'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1102')) {
          str += ', Sụp mi'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1103')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1104')) {
            str += ', Khác: ' + this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1104')
          } else {
            str += ', Khác'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1105')) {
          str += ', Quặm'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1106')) {
          str += ', Hở mi'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1107')) {
          str += ', Trễ mi'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1109', 'IPDMRPTL1110')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1109', 'IPDMRPTL1111') || this.getValueOfMASTERDATA('IPDMRPTL1109', 'IPDMRPTL1112') || this.getValueOfMASTERDATA('IPDMRPTL1109', 'IPDMRPTL1113')) {
            str += '\n   + U mi: '
            if (this.getValueOfMASTERDATA('IPDMRPTL1109', 'IPDMRPTL1111')) {
              str += 'Tính chất U: ' + this.getValueOfMASTERDATA('IPDMRPTL1109', 'IPDMRPTL1111')
            }
            if (this.getValueOfMASTERDATA('IPDMRPTL1109', 'IPDMRPTL1112')) {
              str += ', Vị trí: ' + this.getValueOfMASTERDATA('IPDMRPTL1109', 'IPDMRPTL1112')
            }
            if (this.getValueOfMASTERDATA('IPDMRPTL1109', 'IPDMRPTL1113')) {
              str += ', Kích thước: ' + this.getValueOfMASTERDATA('IPDMRPTL1109', 'IPDMRPTL1113')
            }
          } else {
            str += '\n   + U mi'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1096', 'IPDMRPTL1108')) {
          str += '\n   + Viêm bờ mi (chân lông mi)'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1114', 'IPDMRPTL1115') ||
        this.getValueOfMASTERDATA('IPDMRPTL1114', 'IPDMRPTL1116') ||
        this.getValueOfMASTERDATA('IPDMRPTL1114', 'IPDMRPTL1117') ||
        this.getValueOfMASTERDATA('IPDMRPTL1114', 'IPDMRPTL1118')) {
          str += '\n   + Tuyến bờ mi:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1114', 'IPDMRPTL1115')) {
            str += ' Bình thường'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1114', 'IPDMRPTL1116')) {
            str += ', Viêm tắc nhẹ'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1114', 'IPDMRPTL1117')) {
            str += ', Vừa'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1114', 'IPDMRPTL1118')) {
            str += ', Nặng'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1119', 'IPDMRPTL1120')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1119', 'IPDMRPTL1121')) {
            str += '\n   + Tổn thương khác: ' + this.getValueOfMASTERDATA('IPDMRPTL1119', 'IPDMRPTL1121')
          } else {
            str += '\n   + Tổn thương khác'
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
        str += '6. Kết mạc:'
        if (this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1123') ||
        this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1124')) {
          str += '\n   + Cương tụ:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1123')) {
            str += ' Toả lan'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1124')) {
            str += ', Rìa'
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
            str += ' , Phù nề'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1126')) {
            str += ', Xuất huyết'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1127')) {
            str += ', Sừng hoá'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1128')) {
            str += ', Nhú'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1129')) {
            str += ', Hột'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1122', 'IPDMRPTL1130')) {
            str += ', Sẹo'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1131', 'IPDMRPTL1132')) {
          str += '\n   + U kết mạc:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1131', 'IPDMRPTL1133')) {
            str += ' Tính chất: ' + this.getValueOfMASTERDATA('IPDMRPTL1131', 'IPDMRPTL1133')
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1131', 'IPDMRPTL1134')) {
            str += ', Vị trí: ' + this.getValueOfMASTERDATA('IPDMRPTL1131', 'IPDMRPTL1134')
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1131', 'IPDMRPTL1135')) {
            str += ', Kích thước: ' + this.getValueOfMASTERDATA('IPDMRPTL1131', 'IPDMRPTL1135')
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1136', 'IPDMRPTL1137') ||
        this.getValueOfMASTERDATA('IPDMRPTL1136', 'IPDMRPTL1138') ||
        this.getValueOfMASTERDATA('IPDMRPTL1136', 'IPDMRPTL1139')) {
          str += '\n   + Cùng đồ:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1136', 'IPDMRPTL1137')) {
            str += ' Bình thường'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1136', 'IPDMRPTL1138')) {
            str += ', Cạn'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1136', 'IPDMRPTL1139')) {
            str += ', Dính'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1140', 'IPDMRPTL1141')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1140', 'IPDMRPTL1142')) {
            str += '\n   + Tổn thương khác: ' + this.getValueOfMASTERDATA('IPDMRPTL1140', 'IPDMRPTL1142')
          } else {
            str += '\n   + Tổn thương khác: '
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
        str += '7. Giác mạc: '
        if (this.getValueOfMASTERDATA('IPDMRPTL1662', 'IPDMRPTL1663') ||
        this.getValueOfMASTERDATA('IPDMRPTL1662', 'IPDMRPTL1664') ||
        this.getValueOfMASTERDATA('IPDMRPTL1662', 'IPDMRPTL1665')) {
          str += '\n   + Kích thước:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1662', 'IPDMRPTL1663')) {
            str += ' Bình thường'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1662', 'IPDMRPTL1664')) {
            str += ', To'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1662', 'IPDMRPTL1665')) {
            str += ', Nhỏ'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1666', 'IPDMRPTL1667') ||
        this.getValueOfMASTERDATA('IPDMRPTL1666', 'IPDMRPTL1668') ||
        this.getValueOfMASTERDATA('IPDMRPTL1666', 'IPDMRPTL1669')) {
          str += '\n   + Hình dạng:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1666', 'IPDMRPTL1667')) {
            str += ' Bình thường'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1666', 'IPDMRPTL1668')) {
            str += ', Nón'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1666', 'IPDMRPTL1669')) {
            str += ', Cầu'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1154', 'IPDMRPTL1155') ||
          this.getValueOfMASTERDATA('IPDMRPTL1154', 'IPDMRPTL1156') ||
          this.getValueOfMASTERDATA('IPDMRPTL1154', 'IPDMRPTL1157')) {
          str += '\n   + Biểu mô:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1154', 'IPDMRPTL1155')) {
            str += '\n     + Bình thường'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1154', 'IPDMRPTL1156')) {
            if (this.getValueOfMASTERDATA('IPDMRPTL1159', 'IPDMRPTL1160') ||
            this.getValueOfMASTERDATA('IPDMRPTL1159', 'IPDMRPTL1161') ||
            this.getValueOfMASTERDATA('IPDMRPTL1159', 'IPDMRPTL1162') ||
            this.getValueOfMASTERDATA('IPDMRPTL1163', 'IPDMRPTL1164') ||
            this.getValueOfMASTERDATA('IPDMRPTL1163', 'IPDMRPTL1165') ||
            this.getValueOfMASTERDATA('IPDMRPTL1163', 'IPDMRPTL1166')) {
              str += '\n     + Tổn thương dạng chấm:'
              if (this.getValueOfMASTERDATA('IPDMRPTL1167', 'IPDMRPTL1168')) {
                str += ' Thoái hoá dải băng'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1167', 'IPDMRPTL1169')) {
                str += ', Lắng đọng thuốc'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1159', 'IPDMRPTL1160') ||
              this.getValueOfMASTERDATA('IPDMRPTL1159', 'IPDMRPTL1161') ||
              this.getValueOfMASTERDATA('IPDMRPTL1159', 'IPDMRPTL1162')) {
                str += '\n       + Phù bọng biểu mô:'
                if (this.getValueOfMASTERDATA('IPDMRPTL1159', 'IPDMRPTL1160')) {
                  str += ' Nhẹ'
                }
                if (this.getValueOfMASTERDATA('IPDMRPTL1159', 'IPDMRPTL1161')) {
                  str += ', Vừa'
                }
                if (this.getValueOfMASTERDATA('IPDMRPTL1159', 'IPDMRPTL1162')) {
                  str += ', Nặng'
                }
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1163', 'IPDMRPTL1164') ||
              this.getValueOfMASTERDATA('IPDMRPTL1163', 'IPDMRPTL1165') ||
              this.getValueOfMASTERDATA('IPDMRPTL1163', 'IPDMRPTL1166')) {
                str += '\n       + Bờ tổn thương:'
                if (this.getValueOfMASTERDATA('IPDMRPTL1163', 'IPDMRPTL1164')) {
                  str += ' Nham nhở'
                }
                if (this.getValueOfMASTERDATA('IPDMRPTL1163', 'IPDMRPTL1165')) {
                  str += ', Trơn nhẵn'
                }
                if (this.getValueOfMASTERDATA('IPDMRPTL1163', 'IPDMRPTL1166')) {
                  str += ', Đào rãnh'
                }
              }
            } else {
              str += '\n     + Tổn thương dạng chấm'
            }
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1154', 'IPDMRPTL1157')) {
            if (this.getValueOfMASTERDATA('IPDMRPTL1154', 'IPDMRPTL1158')) {
              str += '\n     + Tổn thương khác: ' + this.getValueOfMASTERDATA('IPDMRPTL1154', 'IPDMRPTL1158')
            } else {
              str += '\n     + Tổn thương khác'
            }
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1170', 'IPDMRPTL1171') ||
        this.getValueOfMASTERDATA('IPDMRPTL1170', 'IPDMRPTL1172') ||
        this.getValueOfMASTERDATA('IPDMRPTL1170', 'IPDMRPTL1173') ||
        this.getValueOfMASTERDATA('IPDMRPTL1170', 'IPDMRPTL1174')) {
          str += '\n   + Nhu mô:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1170', 'IPDMRPTL1171')) {
            str += ' Bình thường'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1170', 'IPDMRPTL1172')) {
            str += ', Phù'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1170', 'IPDMRPTL1173')) {
            if (this.getValueOfMASTERDATA('IPDMRPTL1176', 'IPDMRPTL1177') ||
            this.getValueOfMASTERDATA('IPDMRPTL1176', 'IPDMRPTL1178') ||
            this.getValueOfMASTERDATA('IPDMRPTL1176', 'IPDMRPTL1179') ||
            this.getValueOfMASTERDATA('IPDMRPTL1180', 'IPDMRPTL1181') ||
            this.getValueOfMASTERDATA('IPDMRPTL1180', 'IPDMRPTL1182') ||
            this.getValueOfMASTERDATA('IPDMRPTL1180', 'IPDMRPTL1183')) {
              str += '\n     + Thẩm lậu:'
              if (this.getValueOfMASTERDATA('IPDMRPTL1176', 'IPDMRPTL1177')) {
                str += ' Nông'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1176', 'IPDMRPTL1178')) {
                str += ', Sâu'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1176', 'IPDMRPTL1179')) {
                str += ', Rất sâu'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1180', 'IPDMRPTL1181')) {
                str += ', Khu trú'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1180', 'IPDMRPTL1182')) {
                str += ', Lan toả'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1180', 'IPDMRPTL1183')) {
                str += ', Nhiều ổ vệ tinh'
              }
            } else {
              str += '\n     + Thẩm lậu'
            }
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1170', 'IPDMRPTL1174')) {
            if (this.getValueOfMASTERDATA('IPDMRPTL1170', 'IPDMRPTL1175')) {
              str += '\n     + Tổn thương khác: ' + this.getValueOfMASTERDATA('IPDMRPTL1170', 'IPDMRPTL1175')
            } else {
              str += '\n     + Tổn thương khác'
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
          str += '\n   + Nội mô & Descemet:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1185')) {
            str += ' Nếp gấp'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1186')) {
            str += ', Tủa sắc tố mặt sau GM'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1187')) {
            str += ', Mủ mặt sau'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1188')) {
            str += ', Xuất tiết mặt sau'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1189')) {
            str += ', Guttata'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1190')) {
            str += ', Rạn màng Des'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1191')) {
            if (this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1192')) {
              str += ', Tổn thương khác : ' + this.getValueOfMASTERDATA('IPDMRPTL1184', 'IPDMRPTL1192')
            } else {
              str += ', Tổn thương khác'
            }
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1193', 'IPDMRPTL1194')) {
            str += '\n   + Doạ thủng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1193', 'IPDMRPTL1195')) {
            str += '\n   + Kẹt mống mắt'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1193', 'IPDMRPTL1196')) {
            if (this.getValueOfMASTERDATA('IPDMRPTL1197', 'IPDMRPTL1198') ||
            this.getValueOfMASTERDATA('IPDMRPTL1197', 'IPDMRPTL1199') ||
            this.getValueOfMASTERDATA('IPDMRPTL1197', 'IPDMRPTL1200') ||
            this.getValueOfMASTERDATA('IPDMRPTL1201', 'IPDMRPTL1202') ||
            this.getValueOfMASTERDATA('IPDMRPTL1201', 'IPDMRPTL1203') ||
            this.getValueOfMASTERDATA('IPDMRPTL1201', 'IPDMRPTL1205')) {
              str += '\n   + Thủng giác mạc:'
              if (this.getValueOfMASTERDATA('IPDMRPTL1197', 'IPDMRPTL1198')) {
                str += ' Trung tâm'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1197', 'IPDMRPTL1199')) {
                str += ', Lệch tâm'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1197', 'IPDMRPTL1200')) {
                str += ', Sát rìa'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1201', 'IPDMRPTL1202')) {
                str += ', Seidel'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1201', 'IPDMRPTL1203')) {
                if (this.getValueOfMASTERDATA('IPDMRPTL1201', 'IPDMRPTL1204')) {
                  str += ', Đường kính thủng: ' + this.getValueOfMASTERDATA('IPDMRPTL1201', 'IPDMRPTL1204')
                } else {
                  str += ', Đường kính thủng'
                }
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1201', 'IPDMRPTL1205')) {
                str += ', Thủng bít'
              }
            } else {
              str += '\n   + Thủng giác mạc'
            }
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1206', 'IPDMRPTL1207') ||
        this.getValueOfMASTERDATA('IPDMRPTL1206', 'IPDMRPTL1208') ||
        this.getValueOfMASTERDATA('IPDMRPTL1206', 'IPDMRPTL1209')) {
          str += '\n   + Cảm giác giác mạc:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1206', 'IPDMRPTL1207')) {
            str += ' Mất'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1206', 'IPDMRPTL1208')) {
            str += ', Giảm'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1206', 'IPDMRPTL1209')) {
            str += ', Bình thường'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1210', 'IPDMRPTL1211') ||
        this.getValueOfMASTERDATA('IPDMRPTL1210', 'IPDMRPTL1212') ||
        this.getValueOfMASTERDATA('IPDMRPTL1210', 'IPDMRPTL1213')) {
          str += '\n   + Tân mạch:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1210', 'IPDMRPTL1211')) {
            str += ' Nông, hướng tâm'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1210', 'IPDMRPTL1212')) {
            str += ', Ly tâm'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1210', 'IPDMRPTL1213')) {
            str += ', Sâu'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1214', 'IPDMRPTL1215') ||
        this.getValueOfMASTERDATA('IPDMRPTL1214', 'IPDMRPTL1216')) {
          str += '\n   + Vùng rìa giác mạc:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1214', 'IPDMRPTL1215')) {
            str += ' Thoái hoá già'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1214', 'IPDMRPTL1216')) {
            str += ', Lắng đọng Canxi'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1217', 'IPDMRPTL1218')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1217', 'IPDMRPTL1219')) {
            str += '\n   + Bất thường khác: ' + this.getValueOfMASTERDATA('IPDMRPTL1217', 'IPDMRPTL1219')
          } else {
            str += '\n   + Bất thường khác'
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
        str += '\n8. Củng mạc:'
        if (this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1221')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1227', 'IPDMRPTL1228') ||
          this.getValueOfMASTERDATA('IPDMRPTL1227', 'IPDMRPTL1229') ||
          this.getValueOfMASTERDATA('IPDMRPTL1227', 'IPDMRPTL1230') ||
          this.getValueOfMASTERDATA('IPDMRPTL1227', 'IPDMRPTL1231') ||
          this.getValueOfMASTERDATA('IPDMRPTL1227', 'IPDMRPTL1232')) {
            str += '\n   + Viêm:'
            if (this.getValueOfMASTERDATA('IPDMRPTL1227', 'IPDMRPTL1228')) {
              str += ' Nốt'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTL1227', 'IPDMRPTL1229')) {
              str += ', Lan toả'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTL1227', 'IPDMRPTL1230')) {
              str += ', Áp xe'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTL1227', 'IPDMRPTL1231')) {
              str += ', Nông'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTL1227', 'IPDMRPTL1232')) {
              str += ', Sâu'
            }
          } else {
            str += '\n   + Viêm'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1222') ||
          this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1223') ||
          this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1224') ||
          this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1225')) {
          str += '\n   + '
          if (this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1222')) {
            str += ', Viêm thượng củng mạc'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1223')) {
            str += ', Giãn lối'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1224')) {
            str += ', Tiêu mỏng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1225')) {
            str += ', Hoại tử'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1226')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1648')) {
            str += '\n   + Chi tiết khác: ' + this.getValueOfMASTERDATA('IPDMRPTL1220', 'IPDMRPTL1648')
          } else {
            str += '\n   + Chi tiết khác'
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
        str += '9. Tiền phòng (Góc TP):'
        if (this.getValueOfMASTERDATA('IPDMRPTL1650', 'IPDMRPTL1651')) {
          str += ' Bình thường'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1650', 'IPDMRPTL1652')) {
          str += ', Nông'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1650', 'IPDMRPTL1653')) {
          str += ', Mất TP'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1650', 'IPDMRPTL1654')) {
          str += ', Sâu'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1650', 'IPDMRPTL1655')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1650', 'IPDMRPTL1678')) {
            str += ', Tổn thương khác: ' + this.getValueOfMASTERDATA('IPDMRPTL1650', 'IPDMRPTL1678')
          } else {
            str += ', Tổn thương khác'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1241', 'IPDMRPTL1242')) {
          str += '\n   + Tiền phòng: ' + this.getValueOfMASTERDATA('IPDMRPTL1241', 'IPDMRPTL1242') + 'mm'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1243', 'IPDMRPTL1244')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1243', 'IPDMRPTL1245')) {
            str += ', Mủ: ' + this.getValueOfMASTERDATA('IPDMRPTL1243', 'IPDMRPTL1245') + ' mm'
          } else {
            str += ', Mủ'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1246', 'IPDMRPTL1247')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1246', 'IPDMRPTL1248')) {
            str += ', Máu: ' + this.getValueOfMASTERDATA('IPDMRPTL1246', 'IPDMRPTL1248') + ' mm'
          } else {
            str += ', Máu'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1249', 'IPDMRPTL1250')) {
          str += ', Tyndal(+)'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1251', 'IPDMRPTL1252')) {
          str += ', Màng xuất tiết'
        }
        str += '\n'
      }
      // 10
      if (this.getValueOfMASTERDATA('IPDMRPTL1256', 'IPDMRPTL1257') || this.getValueOfMASTERDATA('IPDMRPTL1256', 'IPDMRPTL1258') || this.getValueOfMASTERDATA('IPDMRPTL1256', 'IPDMRPTL1259') || this.getValueOfMASTERDATA('IPDMRPTL1256', 'IPDMRPTL1260') || this.getValueOfMASTERDATA('IPDMRPTL1256', 'IPDMRPTL1261') || this.getValueOfMASTERDATA('IPDMRPTL1256', 'IPDMRPTL1262')) {
        str += '10. Mống mắt:'
        if (this.getValueOfMASTERDATA('IPDMRPTL1256', 'IPDMRPTL1257')) {
          str += ' Nâu xốp'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1256', 'IPDMRPTL1258')) {
          str += ', Xơ teo'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1256', 'IPDMRPTL1259')) {
          str += ', Cương tụ'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1256', 'IPDMRPTL1260')) {
          str += ', Tân mạch'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1256', 'IPDMRPTL1261')) {
          str += ', Phòi'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1256', 'IPDMRPTL1262')) {
          str += ', Kẹt'
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
        str += '11. Đồng tử:'
        if (this.getValueOfMASTERDATA('IPDMRPTL1263', 'IPDMRPTL1264')) {
          str += ', Đường kính: ' + this.getValueOfMASTERDATA('IPDMRPTL1263', 'IPDMRPTL1264') + ' mm'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1265', 'IPDMRPTL1266')) {
          str += ', Tròn'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1265', 'IPDMRPTL1267')) {
          str += ', Méo'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1265', 'IPDMRPTL1268')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1265', 'IPDMRPTL1269')) {
            str += '\n   + Dính: Vị trí dính: ' + this.getValueOfMASTERDATA('IPDMRPTL1265', 'IPDMRPTL1269')
          } else {
            str += '\n   + Dính'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1270', 'IPDMRPTL1271') ||
        this.getValueOfMASTERDATA('IPDMRPTL1270', 'IPDMRPTL1272') ||
        this.getValueOfMASTERDATA('IPDMRPTL1270', 'IPDMRPTL1273')) {
          str += '\n   + Phản xạ:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1270', 'IPDMRPTL1271')) {
            str += ', Tốt'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1270', 'IPDMRPTL1272')) {
            str += ', Kém'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1270', 'IPDMRPTL1273')) {
            str += ', Mất'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1274', 'IPDMRPTL1275') ||
        this.getValueOfMASTERDATA('IPDMRPTL1274', 'IPDMRPTL1276') ||
        this.getValueOfMASTERDATA('IPDMRPTL1274', 'IPDMRPTL1277')) {
          str += '\n   + Ánh đồng tử:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1274', 'IPDMRPTL1275')) {
            str += ', Hồng'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1274', 'IPDMRPTL1276')) {
            str += ', Xám'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1274', 'IPDMRPTL1277')) {
            str += ', Không soi được'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1278', 'IPDMRPTL1279')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1278', 'IPDMRPTL1280')) {
            str += '\n   + Tổn thương khác: ' + this.getValueOfMASTERDATA('IPDMRPTL1278', 'IPDMRPTL1280')
          } else {
            str += '\n   + Tổn thương khác'
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
        str += '12. Thuỷ tinh thể:'
        if (this.getValueOfMASTERDATA('IPDMRPTL1281', 'IPDMRPTL1282')) {
          str += ' Bình thường'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1283', 'IPDMRPTL1284')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1283', 'IPDMRPTL1285')) {
            str += '\n   + Đục thuỷ tinh thể: Hình thái đục: ' + this.getValueOfMASTERDATA('IPDMRPTL1283', 'IPDMRPTL1285')
          } else {
            str += '\n   + Đục thuỷ tinh thể'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1286', 'IPDMRPTL1287')) {
          str += '\n   + Lệch'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1288', 'IPDMRPTL1289')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1288', 'IPDMRPTL1290') ||
          this.getValueOfMASTERDATA('IPDMRPTL1288', 'IPDMRPTL1291') ||
          this.getValueOfMASTERDATA('IPDMRPTL1288', 'IPDMRPTL1292') ||
          this.getValueOfMASTERDATA('IPDMRPTL1288', 'IPDMRPTL1293') ||
          this.getValueOfMASTERDATA('IPDMRPTL1288', 'IPDMRPTL1294')) {
            str += '\n   + IOL:'
            if (this.getValueOfMASTERDATA('IPDMRPTL1288', 'IPDMRPTL1290')) {
              str += ', Cân'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTL1288', 'IPDMRPTL1291')) {
              str += ', Lệch'
            }
            if (this.getValueOfMASTERDATA('IPDMRPTL1288', 'IPDMRPTL1292')) {
              str += ', Đục bao sau'
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
            str += '\n   + Tổn thương khác: ' + this.getValueOfMASTERDATA('IPDMRPTL1295', 'IPDMRPTL1297')
          } else {
            str += '\n   + Tổn thương khác'
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
        str += '13. Dịch kính:'
        if (this.getValueOfMASTERDATA('IPDMRPTL1298', 'IPDMRPTL1299')) {
          str += ' Sạch'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1298', 'IPDMRPTL1300')) {
          str += ', Đục'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1298', 'IPDMRPTL1301')) {
          str += ', Xuất huyết'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1298', 'IPDMRPTL1302')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1298', 'IPDMRPTL1303')) {
            str += ', Viêm mủ: ' + this.getValueOfMASTERDATA('IPDMRPTL1298', 'IPDMRPTL1303')
          } else {
            str += ', Viêm mủ'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1304', 'IPDMRPTL1305')) {
          str += ', Xuất huyết'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1304', 'IPDMRPTL1306')) {
          str += ', Tổ chức hoá'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1304', 'IPDMRPTL1307')) {
          str += ', Bong dịch kính sau'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1304', 'IPDMRPTL1308')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1304', 'IPDMRPTL1309')) {
            str += ', Tổn thương khác: ' + this.getValueOfMASTERDATA('IPDMRPTL1304', 'IPDMRPTL1309')
          } else {
            str += ', Tổn thương khác'
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
        str += '14. Đáy mắt:'
        if (this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1311') ||
        this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1312') ||
        this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1313') ||
        this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1314') ||
        this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1315') ||
        this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1316')) {
          str += '\n   + Đĩa thị:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1311')) {
            str += ' Bình thường'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1312')) {
            if (this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1313')) {
              str += ' Lõm gai: ' + this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1313')
            } else {
              str += ' Lõm gai'
            }
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1314')) {
            str += ', Phù'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1315')) {
            str += ', Teo'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1310', 'IPDMRPTL1316')) {
            str += ', Bạc màu'
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1317', 'IPDMRPTL1318') ||
        this.getValueOfMASTERDATA('IPDMRPTL1317', 'IPDMRPTL1319') ||
        this.getValueOfMASTERDATA('IPDMRPTL1317', 'IPDMRPTL1320') ||
        this.getValueOfMASTERDATA('IPDMRPTL1317', 'IPDMRPTL1321')) {
          str += '\n   + Hoàng điểm:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1317', 'IPDMRPTL1318')) {
            str += ' Bình thường'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1317', 'IPDMRPTL1319')) {
            str += ', Mất ánh HĐ'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1317', 'IPDMRPTL1320')) {
            str += ', Sẹo HĐ'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1317', 'IPDMRPTL1321')) {
            if (this.getValueOfMASTERDATA('IPDMRPTL1322', 'IPDMRPTL1323') || this.getValueOfMASTERDATA('IPDMRPTL1322', 'IPDMRPTL1324')) {
              str += ', Phù:'
              if (this.getValueOfMASTERDATA('IPDMRPTL1322', 'IPDMRPTL1323')) {
                str += ', Khu trú'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1322', 'IPDMRPTL1324')) {
                str += ', Toả lan'
              }
            } else {
              str += ', Phù'
            }
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1326', 'IPDMRPTL1327') ||
        this.getValueOfMASTERDATA('IPDMRPTL1326', 'IPDMRPTL1328') ||
        this.getValueOfMASTERDATA('IPDMRPTL1326', 'IPDMRPTL1329') ||
        this.getValueOfMASTERDATA('IPDMRPTL1326', 'IPDMRPTL1330') ||
        this.getValueOfMASTERDATA('IPDMRPTL1326', 'IPDMRPTL1331')) {
          str += '\n   + Võng mạc: Hệ mạch:'
          if (this.getValueOfMASTERDATA('IPDMRPTL1326', 'IPDMRPTL1327')) {
            str += ' Bình thường'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1326', 'IPDMRPTL1328')) {
            str += ', Tắc ĐM'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1326', 'IPDMRPTL1329')) {
            str += ', Tắc TM'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1326', 'IPDMRPTL1330')) {
            str += ', Tân mạch'
          }
          if (this.getValueOfMASTERDATA('IPDMRPTL1326', 'IPDMRPTL1331')) {
            if (this.getValueOfMASTERDATA('IPDMRPTL1332', 'IPDMRPTL1333') || this.getValueOfMASTERDATA('IPDMRPTL1332', 'IPDMRPTL1334')) {
              str += ', Thoái hoá VM:'
              if (this.getValueOfMASTERDATA('IPDMRPTL1332', 'IPDMRPTL1333')) {
                str += ' Chu biên'
              }
              if (this.getValueOfMASTERDATA('IPDMRPTL1332', 'IPDMRPTL1334')) {
                str += ', Trung tâm'
              }
            } else {
              str += ', Thoái hoá VM'
            }
          }
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1335', 'IPDMRPTL1336')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1335', 'IPDMRPTL1337')) {
            str += '\n   + Bệnh lý khác: ' + this.getValueOfMASTERDATA('IPDMRPTL1335', 'IPDMRPTL1337')
          } else {
            str += '\n   + Bệnh lý khác'
          }
        }
      }
      // 15
      if (this.getValueOfMASTERDATA('IPDMRPTL1338', 'IPDMRPTL1339') || this.getValueOfMASTERDATA('IPDMRPTL1338', 'IPDMRPTL1340') || this.getValueOfMASTERDATA('IPDMRPTL1338', 'IPDMRPTL1341')) {
        str += '\n15. Hốc mắt:'
        if (this.getValueOfMASTERDATA('IPDMRPTL1338', 'IPDMRPTL1339')) {
          str += ' Bình thường'
        }
        if (this.getValueOfMASTERDATA('IPDMRPTL1338', 'IPDMRPTL1340')) {
          if (this.getValueOfMASTERDATA('IPDMRPTL1338', 'IPDMRPTL1341')) {
            str += ', Bệnh lý: ' + this.getValueOfMASTERDATA('IPDMRPTL1338', 'IPDMRPTL1341')
          } else {
            str += ', Bệnh lý'
          }
        }
        str += '\n'
      }
      // 4.2 Khám bệnh toàn thân
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
        str += 'Khám bệnh toàn thân'
      }
      if (this.getValueOfMASTERDATA('IPDMRPT1606', 'IPDMRPT1607')) {
        str += '\n   + Huyết áp: ' + this.getValueOfMASTERDATA('IPDMRPT1606', 'IPDMRPT1607') + ' (mmHg)'
      }
      if (this.getValueOfMASTERDATA('IPDMRPT1608', 'IPDMRPT1609')) {
        str += '\n   + Nhiệt độ: ' + this.getValueOfMASTERDATA('IPDMRPT1608', 'IPDMRPT1609') + ' (°C)'
      }
      if (this.getValueOfMASTERDATA('IPDMRPT1610', 'IPDMRPT1611')) {
        str += '\n   + Mạch: ' + this.getValueOfMASTERDATA('IPDMRPT1610', 'IPDMRPT1611') + ' (nhịp/phút)'
      }
      if (this.getValueOfMASTERDATA('IPDMRPT1612', 'IPDMRPT1613') || this.getValueOfMASTERDATA('IPDMRPT1612', 'IPDMRPT1614')) {
        str += '\n   + Nội tiết: '
        if (this.getValueOfMASTERDATA('IPDMRPT1612', 'IPDMRPT1613')) {
          str += ' Bình thường'
        }
        if (this.getValueOfMASTERDATA('IPDMRPT1612', 'IPDMRPT1614')) {
          if (this.getValueOfMASTERDATA('IPDMRPT1612', 'IPDMRPT1615')) {
            str += ', Có bệnh: ' + this.getValueOfMASTERDATA('IPDMRPT1612', 'IPDMRPT1615')
          } else {
            str += ', Có bệnh'
          }
        }
      }
      if (this.getValueOfMASTERDATA('IPDMRPT1616', 'IPDMRPT1617') || this.getValueOfMASTERDATA('IPDMRPT1616', 'IPDMRPT1618')) {
        str += '\n   + Tâm thần, thần kinh: '
        if (this.getValueOfMASTERDATA('IPDMRPT1616', 'IPDMRPT1617')) {
          str += ' Bình thường'
        }
        if (this.getValueOfMASTERDATA('IPDMRPT1616', 'IPDMRPT1618')) {
          if (this.getValueOfMASTERDATA('IPDMRPT1616', 'IPDMRPT1619')) {
            str += ', Có bệnh: ' + this.getValueOfMASTERDATA('IPDMRPT1616', 'IPDMRPT1619')
          } else {
            str += ', Có bệnh'
          }
        }
      }
      if (this.getValueOfMASTERDATA('IPDMRPT1620', 'IPDMRPT1621') || this.getValueOfMASTERDATA('IPDMRPT1620', 'IPDMRPT1622')) {
        str += '\n   + Tuần hoàn: '
        if (this.getValueOfMASTERDATA('IPDMRPT1620', 'IPDMRPT1621')) {
          str += ' Bình thường'
        }
        if (this.getValueOfMASTERDATA('IPDMRPT1620', 'IPDMRPT1622')) {
          if (this.getValueOfMASTERDATA('IPDMRPT1620', 'IPDMRPT1623')) {
            str += ', Có bệnh: ' + this.getValueOfMASTERDATA('IPDMRPT1620', 'IPDMRPT1623')
          } else {
            str += ', Có bệnh'
          }
        }
      }
      if (this.getValueOfMASTERDATA('IPDMRPT1624', 'IPDMRPT1625') || this.getValueOfMASTERDATA('IPDMRPT1624', 'IPDMRPT1626')) {
        str += '\n   + Hô hấp: '
        if (this.getValueOfMASTERDATA('IPDMRPT1624', 'IPDMRPT1625')) {
          str += ' Bình thường'
        }
        if (this.getValueOfMASTERDATA('IPDMRPT1624', 'IPDMRPT1626')) {
          if (this.getValueOfMASTERDATA('IPDMRPT1624', 'IPDMRPT1627')) {
            str += ', Có bệnh: ' + this.getValueOfMASTERDATA('IPDMRPT1624', 'IPDMRPT1627')
          } else {
            str += ', Có bệnh'
          }
        }
      }
      if (this.getValueOfMASTERDATA('IPDMRPT1628', 'IPDMRPT1629') || this.getValueOfMASTERDATA('IPDMRPT1628', 'IPDMRPT1630')) {
        str += '\n   + Tiêu hoá: '
        if (this.getValueOfMASTERDATA('IPDMRPT1628', 'IPDMRPT1629')) {
          str += ' Bình thường'
        }
        if (this.getValueOfMASTERDATA('IPDMRPT1628', 'IPDMRPT1630')) {
          if (this.getValueOfMASTERDATA('IPDMRPT1628', 'IPDMRPT1631')) {
            str += ', Có bệnh: ' + this.getValueOfMASTERDATA('IPDMRPT1628', 'IPDMRPT1631')
          } else {
            str += ', Có bệnh'
          }
        }
      }
      if (this.getValueOfMASTERDATA('IPDMRPT1632', 'IPDMRPT1633') || this.getValueOfMASTERDATA('IPDMRPT1628', 'IPDMRPT1634')) {
        str += '\n   + Cơ xương khớp: '
        if (this.getValueOfMASTERDATA('IPDMRPT1632', 'IPDMRPT1633')) {
          str += ' Bình thường'
        }
        if (this.getValueOfMASTERDATA('IPDMRPT1632', 'IPDMRPT1634')) {
          if (this.getValueOfMASTERDATA('IPDMRPT1632', 'IPDMRPT1635')) {
            str += ', Có bệnh: ' + this.getValueOfMASTERDATA('IPDMRPT1632', 'IPDMRPT1635')
          } else {
            str += ', Có bệnh'
          }
        }
      }
      if (this.getValueOfMASTERDATA('IPDMRPT1636', 'IPDMRPT1637') || this.getValueOfMASTERDATA('IPDMRPT1636', 'IPDMRPT1638')) {
        str += '\n   + Tiết niệu, sinh dục: '
        if (this.getValueOfMASTERDATA('IPDMRPT1636', 'IPDMRPT1637')) {
          str += ' Bình thường'
        }
        if (this.getValueOfMASTERDATA('IPDMRPT1636', 'IPDMRPT1638')) {
          if (this.getValueOfMASTERDATA('IPDMRPT1636', 'IPDMRPT1639')) {
            str += ', Có bệnh: ' + this.getValueOfMASTERDATA('IPDMRPT1636', 'IPDMRPT1639')
          } else {
            str += ', Có bệnh'
          }
        }
      }
      if (this.getValueOfMASTERDATA('IPDMRPT1640', 'IPDMRPT1641')) {
        str += '\n   + Khác: ' + this.getValueOfMASTERDATA('IPDMRPT1640', 'IPDMRPT1641')
      }
      if (str) {
        str = str.replaceAll('+ ,', '+')
        str = str.replaceAll(':,', ': ')
        str = str.replaceAll('(,', '(')
        str = str.replaceAll(': ,', ':')
      }
      if (!noneDex) {
        str += '\nCác xét nghiệm cận lâm sàng cần làm: ' + this.getValueOfMASTERDATA('IPDMRPTCXNC', 'IPDMRPTCXNCANS')
        str += '\nTóm tắt bệnh án: ' + this.getValueOfMASTERDATA('IPDMRPTTTBA', 'IPDMRPTTTBAANS')
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
