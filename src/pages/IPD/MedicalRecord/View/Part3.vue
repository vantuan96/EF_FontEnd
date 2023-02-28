<template>
  <div class="main-content">
    <template v-if="loaded">
      <template v-if="DataSubmit">
        <div class="box box-table">
          <div class="box-body">
            <template v-if="routeType === 'Obstetrics'">
              <Obstetrics3 :readonly="true"
              :box1="true"
              :MASTERDATA="MASTERDATA"
              :VisitId="VisitId"
              :VisitIdDrop="VisitIdDrop"
              :DataSubmit="DataSubmit"
              :ListSoSinh="ListSoSinh"
              :optionChild="optionChild"
              />
            </template>
            <div id="MedicalRecord-part3-block1">
              <label class="block-title" v-if="routeType !== 'Obstetrics'">I. {{__t('TỔNG KẾT BỆNH ÁN')}}:</label>
              <div :class="routeType !== 'Obstetrics' ? 'ml-10' : null">
                <div class="bg-grays-2">
                  <md-input-text v-if="routeType !== 'Obstetrics' && MASTERDATA['IPDMRPEQTBL']" :readonly="true" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPEQTBL']"/>
                  <md-input-text :readonly="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPETTKQ']" v-model="MASTERDATA['IPDMRPETTKQ']"/>
                  <Eye3 v-if="routeType === 'Eye'"
                    ref="Eye3"
                    :box1="true"
                    :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                    :DataSubmit="DataSubmit"
                    :readonly="true"/>
                  <template v-if="routeType === 'CardiovascularForm'">
                    <div class="fw600 mrb10">{{__label(MASTERDATA['IPDMRPEPPDT'])}}</div>
                    <BMTIMMACH3 :box1="true" :readonly="true" :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit"/>
                  </template>
                  <template v-else>
                    <md-input-text :readonly="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPEPPDT'] && routeType !== 'Oncology'" v-model="MASTERDATA['IPDMRPEPPDT']"/>
                  </template>
                  <Eye3 v-if="routeType === 'Eye'"
                    :box2="true"
                    :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                    :DataSubmit="DataSubmit"
                    :readonly="true"/>
                  <Oncology3
                    v-if="routeType === 'Oncology'"
                    ref="Oncology3"
                    :box1="true"
                    :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                    :DataSubmit="DataSubmit"
                    :readonly="true"/>
                  <Gynecological3
                    v-if="routeType === 'Gynecological' || routeType === 'A01_195_050919_V' || routeType === 'A01_039_050919_V' || routeType === 'A01_040_050919_V'"
                    ref="Gynecological3Box1"
                    :routeType="routeType"
                    :box1="true"
                    :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                    :DataSubmit="DataSubmit"
                    :readonly="true"/>
                  <template v-if="routeType !== 'A01_039_050919_V' && routeType !== 'A01_040_050919_V'">
                  <md-input-text :readonly="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPETCDD']" v-model="MASTERDATA['IPDMRPETCDD']"/>
                  </template>
                  <label v-if="MASTERDATA['IPDMRPETTNB']">{{__t2(MASTERDATA['IPDMRPETTNB'].ViName)}}</label>
                  <md-input-text :hidelabel="true" :readonly="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPETTNB']" v-model="MASTERDATA['IPDMRPETTNB']"/>
                  <template>
                    <label style="display: block">{{__t('Chẩn đoán ra viện')}}:</label>
                    <div class="form-group" v-if="MASTERDATA['IPDMRPEICDC']">
                      <label>{{__label(MASTERDATA['IPDMRPEICDC'])}}:</label>
                      <icd10View :mdCode="'IPDMRPEICDC'" :single="true" v-model="MASTERDATA['IPDMRPEICDC'].Items[0].Value"/>
                    </div>
                    <label v-if="MASTERDATA['IPDMRPECDBC']">{{__t2(MASTERDATA['IPDMRPECDBC'].ViName)}}</label>
                    <md-input-text :hidelabel="true" :readonly="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPECDBC']" v-model="MASTERDATA['IPDMRPECDBC']"/>
                    <div :class="!MASTERDATA['IPDMRPECDKT'].Items[1].Value ? 'none' : null" class="form-group" v-if="MASTERDATA['IPDMRPEICDP']">
                      <label>{{__label(MASTERDATA['IPDMRPEICDP'])}}:</label>
                      <icd10View :mdCode="'IPDMRPEICDP'" :single="true" v-model="MASTERDATA['IPDMRPEICDP'].Items[0].Value"/>
                    </div>
                    <Oncology3
                      v-if="routeType === 'Oncology'"
                      class="mrb10"
                      ref="Oncology3Box2"
                      :box2="true"
                      :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                      :DataSubmit="DataSubmit"
                      :readonly="true"/>
                    <label v-if="MASTERDATA['IPDMRPECDKT']">{{__t2(MASTERDATA['IPDMRPECDKT'].ViName)}}:</label>
                    <MdRadiosInput2 v-if="MASTERDATA['IPDMRPECDKT']" :readonly="true" class="mrb10" :value="MASTERDATA['IPDMRPECDKT']" :noneDex="0"/>
                    <textarea-autosize :readonly="true" v-if="MASTERDATA['IPDMRPECDKT'] && MASTERDATA['IPDMRPECDKT'].Items[1].Value" class="form-control mrb10" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPECDKT'].Items[0].Value"/>
                    <!-- <md-input-text :readonly="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPECDKT']" v-model="MASTERDATA['IPDMRPECDKT']"/> -->
                    <md-input-text :readonly="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPEPHBI']" v-model="MASTERDATA['IPDMRPEPHBI']"/>
                    <template v-if="routeType === 'CardiovascularForm'">
                      <BMTIMMACH3 :readonly="true" class="mrb10" ref="BMTIMMACH3box2" :box2="true" :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit"/>
                    </template>
                    <template v-else>
                      <!-- Tai biến / biến chứng -->
                      <div class="flex-box" v-if="MASTERDATA['IPDMRPETHPT'] && routeType !== 'Obstetrics' && routeType !== 'A01_195_050919_V' && routeType !== 'Gynecological' && routeType !== 'A01_039_050919_V' && routeType !== 'A01_040_050919_V' && routeType !== 'Eye'">
                        <template v-if="routeType === 'A01_034_050919_V' && DataSubmit.Version >= 2">
                          <CheckboxsValue :t2="routeType === 'A01_034_050919_V' ? true : false" :data="MASTERDATA['IPDMRPETHPT'].Items" :indexs="[1]" :showall="true" />
                          <div style="flex-grow: 1;" class="ml-10">
                            <textarea-autosize readonly class="form-control" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPETHPT'].Items[2].Value"/>
                          </div>
                        </template>
                        <template v-else>
                          <CheckboxsValue :data="MASTERDATA['IPDMRPETHPT'].Items" :showall="true" />
                          <div style="flex-grow: 1;" class="ml-10">
                            <textarea-autosize readonly class="form-control" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPETHPT'].Items[2].Value"/>
                          </div>
                        </template>
                      </div>
                    </template>
                    <div class="row" v-if="MASTERDATA['IPDMRPEKQDT']">
                      <div class="col-md-12 mt-10">
                        <div class="form-group">
                          <label>{{__label(MASTERDATA['IPDMRPEKQDT'])}}<i class="unit-label">{{MASTERDATA['IPDMRPEKQDT'].Note}}</i>:</label>
                          <MDRadioView v-if="MASTERDATA['IPDMRPEKQDT']" :data="MASTERDATA['IPDMRPEKQDT'].Items"/>
                        </div>
                      </div>
                    </div>
                    <div class="row" v-if="MASTERDATA['IPDMRPEGIPB']">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>{{__label(MASTERDATA['IPDMRPEGIPB'])}}<i class="unit-label">{{MASTERDATA['IPDMRPEGIPB'].Note}}</i>:</label>
                          <MDRadioView v-if="MASTERDATA['IPDMRPEGIPB']" :data="MASTERDATA['IPDMRPEGIPB'].Items"/>
                        </div>
                      </div>
                    </div>
                    <Gynecological3
                      v-if="routeType === 'Gynecological' || routeType === 'A01_039_050919_V' || routeType === 'A01_040_050919_V'"
                      ref="Gynecological3Box2"
                      :box2="true"
                      :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                      :DataSubmit="DataSubmit"
                      :readonly="true"/>
                    <div class="row" v-if="MASTERDATA['IPDMRPEGPBT'] && MASTERDATA['IPDMRPEGIPB'].Items[0].Value">
                      <div class="col-md-12">
                        <div class="form-group">
                          <MDRadioView v-if="MASTERDATA['IPDMRPEGPBT']" :data="MASTERDATA['IPDMRPEGPBT'].Items"/>
                        </div>
                      </div>
                    </div>
                    <template v-if="routeType === 'CardiovascularForm'">
                      <BMTIMMACH3 :readonly="true" class="mrb10" ref="BMTIMMACH3box3" :box3="true" :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit"/>
                    </template>
                    <md-input-text :readonly="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPEBEPH'] && MASTERDATA['IPDMRPEGIPB'].Items[0].Value" v-model="MASTERDATA['IPDMRPEBEPH']"/>
                    <md-input-text :readonly="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPEHDTV'] && routeType !== 'Eye'" v-model="MASTERDATA['IPDMRPEHDTV']"/>
                  </template>
                </div>
              </div>
            </div>
            <div id="MedicalRecord-part2-block5" class="mt-10">
              <label class="block-title" v-if="routeType === 'Obstetrics'">V. {{__t('Trạng thái bệnh nhân')}}: {{__label(DataSubmit.Status)}}</label>
              <label class="block-title" v-else>II. {{__t('Trạng thái bệnh nhân')}}: {{__label(DataSubmit.Status)}}</label>
              <IPDMRPG :readonly="true" :routeType="routeType" :status="activeWithStatus" v-model="DataSubmit.GeneralDatas" :Version="DataSubmit.Version" :VisitIdDrop="VisitIdDrop" :IsUseHandOverCheckList="IsUseHandOverCheckList"/>
              <div class="bg-gray-2 mt-10" style="display: flex;" v-if="DataSubmit.Status.ViName === 'Chuyển khoa'">
                <input :readonly="true" type="checkbox" style="display: inline !important; height: 25px; width: 25px; margin-right: 6px;" v-model="IsUseHandOverCheckList">
                <b style="display: contents !important; line-height: 2.5;">{{__t('Sử dụng biên bản bàn giao NB')}}</b>
              </div>
              <label>{{__label(MASTERDATA['IPDMRPECOIN'])}}:</label><MdRadiosInput2 :readonly="true" :value="MASTERDATA['IPDMRPECOIN']"/>
            </div>
          </div>
        </div>
      </template>
      <div v-else style="padding: 20px;">
        <div class="text-center">
          <p>{{__t(getTextWarning())}}</p>
        </div>
      </div>
     </template>
     <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import MedicalRecordMixinForm from '../Mixin.js'
import MedicalRecord from '@/services/IPD/MedicalRecord'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import Logs from '@/components/Logs.vue'
// import OutpatientExaminationNote from '@/services/OPD/OutpatientExaminationNote'
import VSelectBox from '@/components/VSelect.vue'
import ListOfCurrentMedications from '../ListOfCurrentMedications.vue'
import _ from 'lodash'
// import EventBus from '@/lib/eventBus'
import IPDMRPG from '../IPDMRPG.vue'
import SyncPrincipalTest from '../SyncPrincipalTest.vue'
// import $ from 'jquery'
// import _ from 'lodash'
// import moment from 'moment'
import $ from 'jquery'
import EventBus from '@/lib/eventBus'
import Obstetrics3 from '@/pages/IPD/MedicalRecord/Page2CPN/Obstetrics3.vue'
import Gynecological3 from '@/pages/IPD/MedicalRecord/Page2CPN/Gynecological3.vue'
import Oncology3 from '@/pages/IPD/MedicalRecord/Page2CPN/Oncology3.vue'
import Eye3 from '@/pages/IPD/MedicalRecord/Page2CPN/Eye3.vue'
import BMTIMMACH3 from '@/pages/IPD/MedicalRecord/Page2CPN/BMTIMMACH3.vue'
export default {
  name: 'IPDMedicalRecordPart3',
  mixins: [MixinMasterData, MedicalRecordMixinForm],
  props: ['Form', 'routeType', 'VisitIdDrop', 'VisitId'],
  data () {
    return {
      isErrorPop: false,
      DataSubmit: null,
      loaded: false,
      isFirst: true,
      icd10Code: ['IPDMRPTICDTANS', 'IPDMRPTICDKANS', 'IPDMRPEICDCANS', 'IPDMRPEICDPANS', 'IPDMRPE889', 'IPDMRPE892', 'IPDMRPE806'],
      syncIPDMRPETTKQAt: null,
      GroupCodeMasterData: [
        'IPDMRPE803',
        'IPDMRPE807',
        'IPDMRPE907',
        'IPDMRPE909',
        'IPDMRPE911',
        'IPDMRPE914',
        'IPDMRPE916',
        'IPDMRPE917',
        'IPDMRPE819',
        'IPDMRPE821',
        'IPDMRPE812',
        'IPDMRPE919',
        'IPDMRPE922',
        'IPDMRPE913',
        'IPDMRPE915',
        'IPDMRPE809'
      ],
      ListSoSinh: [],
      optionChild: []
    }
  },
  components: {
    ListOfCurrentMedications,
    VSelectBox,
    VDateTimePicker,
    Logs,
    IPDMRPG,
    SyncPrincipalTest,
    Obstetrics3,
    Gynecological3,
    Oncology3,
    Eye3,
    BMTIMMACH3
  },
  watch: {
    'DataSubmit.Status' () {
      if (!this.isFirst) {
        setTimeout(() => {
          $('html, body').animate({ scrollTop: 99000 }, 500)
        }, 100)
      }
      this.isFirst = false
    },
    VisitIdDrop () {
      this.getData()
    }
  },
  mounted () {
    this.getSpecialities()
    this.getData()
    EventBus.$emit('updateGlobalIpdTopbaInfo', [])
  },
  computed: {
    activeWithStatus: function () {
      return this.DataSubmit.Status ? this.DataSubmit.Status : ''
    },
    typeForm () {
      return this.MedicalRecordFormCode
    }
  },
  methods: {
    async getData () {
      if (this.routeType === 'Obstetrics') {
        await new MedicalRecord().find('Part3/SyncInfoNewborn/' + this._VisitId).then(res => {
          this.optionChild = res.NewbornFromInitialAsseesment
        }).catch(e => {
          this.optionChild = []
        })
      }
      await new MedicalRecord().find('Part3/' + this.typeForm + '/' + this._VisitId + '?hidemsg=' + true).then(response => {
        if (response.ErrorPopup) {
          this.pId = response.Id
          this.message = response.ViMessage
          this.isErrorPop = true
        }
        this.DataSubmit = response
        this.IsUseHandOverCheckList = response.IsUseHandOverCheckList
        if (this.IsUseHandOverCheckList == null || this.IsUseHandOverCheckList === undefined) {
          this.IsUseHandOverCheckList = true
        }
        if (response.Datas && response.Datas.length) {
          response.Datas.find(e => {
            if (e.Code === 'IPDMRPE927') {
              this.ListSoSinh = this.JSONParse(e.Value)
            }
          })
        }
        this.getMasterDatas({Form: 'IPDMRPE'}, () => {
          if (this.MASTERDATA && this.ListSoSinh && this.ListSoSinh.length) {
            this.ListSoSinh.forEach(elm => {
              this.GroupCodeMasterData.forEach(code => {
                if (this.MASTERDATA[code]) {
                  let md = this.cloneObj(this.MASTERDATA[code])
                  md.Code = code + '_' + elm.Id
                  if (md.Items && md.Items.length) {
                    md.Items.forEach(e => {
                      if (!e.Code.includes('_') && md.Code.includes(elm.Id)) {
                        e.Code = e.Code + '_' + elm.Id
                      }
                    })
                  }
                  this.$set(this.MASTERDATA, md.Code, md)
                }
              })
            })
          }
          this.mapData(response)
        })
        if (this.MASTERDATA['IPDMRPECDKT'] && (this.MASTERDATA['IPDMRPECDKT'].Items[2].Value || (!this.MASTERDATA['IPDMRPECDKT'].Items[2].Value && !this.MASTERDATA['IPDMRPECDKT'].Items[1].Value))) {
          this.MASTERDATA['IPDMRPECDKT'].Items[0].Value = ''
        }
        if (this.routeType === 'Neonatal' && this.MASTERDATA['IPDMRPETTNB']) {
          this.MASTERDATA['IPDMRPETTNB'].ViName = '4. Tình trạng sơ sinh ra viện'
          this.MASTERDATA['IPDMRPETTNB'].EnName = '4. Newborn’s status at discharge'
        }
        if (this.routeType === 'Neonatal' && this.MASTERDATA['IPDMRPEHDTV']) {
          this.MASTERDATA['IPDMRPEHDTV'].ViName = '5. Hướng điều trị và các chế độ tiếp theo'
          this.MASTERDATA['IPDMRPEHDTV'].EnName = '5. Treatment plan and further recommendations'
        }
        if (this.routeType === 'Obstetrics' && this.MASTERDATA['IPDMRPEHDTV']) {
          this.MASTERDATA['IPDMRPEHDTV'].ViName = '10. Hướng điều trị và các chế độ tiếp theo'
          this.MASTERDATA['IPDMRPEHDTV'].EnName = '10. Indication and follow-up plan'
        }
        if (this.routeType === 'Obstetrics' && this.MASTERDATA['IPDMRPETTNB']) {
          this.MASTERDATA['IPDMRPETTNB'].ViName = '9. Tình trạng người bệnh ra viện'
          this.MASTERDATA['IPDMRPETTNB'].EnName = '9. Patient status at discharge'
        }
        if (this.routeType === 'Obstetrics' && this.MASTERDATA['IPDMRPETCDD']) {
          this.MASTERDATA['IPDMRPETCDD'].ViName = '8. Các thuốc chính đã dùng'
          this.MASTERDATA['IPDMRPETCDD'].EnName = '8. Used Medication List'
        }
        if (this.routeType === 'Neonatal' && this.MASTERDATA['IPDMRPETCDD'] && this.MASTERDATA['IPDMRPEHDTV']) {
          this.MASTERDATA['IPDMRPETTNB'].ViName = '5. Tình trạng người bệnh ra viện'
          this.MASTERDATA['IPDMRPETTNB'].EnName = '5. Patient status at discharge'
          this.MASTERDATA['IPDMRPEHDTV'].ViName = '6. Hướng điều trị và các chế độ tiếp theo'
          this.MASTERDATA['IPDMRPEHDTV'].EnName = '6. Indication and follow-up plan'
        }
        if (this.routeType === 'Obstetrics' && this.MASTERDATA['IPDMRPEPPDT']) {
          this.MASTERDATA['IPDMRPEPPDT'].ViName = '7. Phương pháp điều trị'
          this.MASTERDATA['IPDMRPEPPDT'].EnName = '7. Treatment method'
        }
        if (this.routeType === 'Obstetrics' && this.MASTERDATA['IPDMRPETTKQ']) {
          this.MASTERDATA['IPDMRPETTKQ'].ViName = '6. Tóm tắt kết quả xét nghiệm cận lâm sàng có giá trị chẩn đoán'
          this.MASTERDATA['IPDMRPETTKQ'].EnName = '6. Summary of laboratory tests for diagnosis'
        }
        if (this.routeType === 'Obstetrics' && this.MASTERDATA['IPDMRPEQTBL']) {
          this.MASTERDATA['IPDMRPEQTBL'].ViName = '4. Quá trình bệnh lý và diễn biến lâm sàng'
          this.MASTERDATA['IPDMRPEQTBL'].EnName = '4. History of present illness and clinical developements'
        }
        if (['A01_039_050919_V', 'A01_040_050919_V'].includes(this.routeType) && this.MASTERDATA['IPDMRPETTNB']) {
          this.MASTERDATA['IPDMRPETTNB'].ViName = '4. Tình trạng người bệnh ra viện'
          this.MASTERDATA['IPDMRPETTNB'].EnName = '4. Patient status at discharge'
          this.MASTERDATA['IPDMRPEHDTV'].ViName = '5. Hướng điều trị và các chế độ tiếp theo'
          this.MASTERDATA['IPDMRPEHDTV'].EnName = '5. Indication and follow-up plan'
        }
        if (this.routeType === 'Pediatric' && this.MASTERDATA['IPDMRPETTKQ']) {
          this.MASTERDATA['IPDMRPETTKQ'].ViName = '2. Tóm tắt kết quả xét nghiệm cận lâm sàng có giá trị chẩn đoán'
          this.MASTERDATA['IPDMRPETTKQ'].EnName = '2. Summary of laboratory tests for diagnosis'
        }
        if (this.routeType === 'Pediatric' && this.MASTERDATA['IPDMRPEPPDT']) {
          this.MASTERDATA['IPDMRPEPPDT'].ViName = '3. Phương pháp điều trị'
          this.MASTERDATA['IPDMRPEPPDT'].EnName = '3. Treatment method'
        }
        if (this.MASTERDATA['IPDMRPEKQDT'] && this.routeType === 'Obstetrics') {
          this.MASTERDATA['IPDMRPEKQDT'].Items[4].ViName = '6. Tử vong'
          this.MASTERDATA['IPDMRPEKQDT'].Items[4].EnName = '6. Deceased'
        }
        this.loaded = true
      }).catch(e => {
        console.log(e)
        this.loaded = true
        this.DataSubmit = false
        if (e.status === 404) {}
      })
    },
    getTextWarning () {
      return 'CHƯA CÓ BỆNH ÁN ' + this.MedicalRecordFormName + ' - TỔNG KẾT BỆNH ÁN'
    },
    mapData (response) {
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(response.Datas, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else if (this.icd10Code.includes(item.Code)) {
                item.Value = this.JSONParse(exited.Value)
              } else {
                item.Value = exited.Value
                if (!exited.Value && this.checkString(item.DataType, 'Text') && this.$store.state.account.Username === 'thangdc3') {
                  item.Value = item.ViName
                }
              }
            } else {
              item.Value = null
              if (this.checkString(item.DataType, 'Text') && this.$store.state.account.Username === 'thangdc3') {
                item.Value = item.ViName
              }
            }
          })
        }
      }
    }
  }
}
</script>
