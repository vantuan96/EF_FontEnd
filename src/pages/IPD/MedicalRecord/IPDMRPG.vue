<template>
  <div>
    <template v-if="isActiveWithStatus('Transfer')">
      <!-- <label class="block-title-2">{{___t('Chuyển khoa')}}:</label> -->
      <div class="ml-10">
        <div class="bg-gray-2">
          <label v-if="MASTERDATA['IPDMRPTLDCK'] && IsUseHandOverCheckList">{{__t2(MASTERDATA['IPDMRPTLDCK'].ViName)}}</label>
          <md-input-text :hidelabel="true" :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTLDCK'] && IsUseHandOverCheckList" v-model="MASTERDATA['IPDMRPTLDCK']"/>
          <div class="row">
            <div class="col-md-12" v-if="MASTERDATA['IPDMRPTNONH']">
              <div class="form-group">
                <label>{{__t2('Nơi nhận-mdc')}}<i class="unit-label">{{MASTERDATA['IPDMRPTNONH'].Note}}</i>:</label>
                <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['IPDMRPTNONH'].Items">
                  <VSelectView v-if="readonly || IsCheckTransfer" v-model="item.Value" :items="getMDSPECIALITIESs"/>
                  <v-select-box v-else :search="true" class="full-w select-boox-full-w" v-model="item.Value" :items="getMDSPECIALITIESs"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template  v-if="isActiveWithStatus('Discharged') || isActiveWithStatus('Complete treatment')">
      <!-- <label class="block-title-2">{{___t('Ra viện')}}:</label> -->
      <div class="ml-10">
        <div class="bg-gray-2">
          <div class="row" v-if="MASTERDATA['IPDMRPTCDRV']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{__t2(MASTERDATA['IPDMRPTCDRV'].ViName)}}<i class="unit-label">{{MASTERDATA['IPDMRPTCDRV'].Note}}</i>:</label>
                <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['IPDMRPTCDRV'].Items">
                  <div v-if="readonly" class="fake-input disable">{{item.Value}}</div>
                  <VDateTimePicker3 :max="ednDate" v-else v-model="item.Value" class=" select-boox" :format="vDateTimeFormat"/>
                </div>
              </div>
            </div>
          </div>
          <template v-if="Version === 1">
            <div class="row" v-if="MASTERDATA['IPDMRPTHTRV']">
              <div class="col-md-12">
                <div class="form-group">
                  <label>{{__t2(MASTERDATA['IPDMRPTHTRV'].ViName)}}<i class="unit-label">{{MASTERDATA['IPDMRPTHTRV'].Note}}</i>:</label>
                  <template v-if="readonly">
                    <MDRadioView :data="MASTERDATA['IPDMRPTHTRV'].Items" />
                    <div class="d-flex">
                      <MDRadioView :data="MASTERDATA['IPDMRPGRV01'].Items" />
                      <div>{{MASTERDATA['IPDMRPGRV01'].Items[3].Value}}</div>
                    </div>
                  </template>
                  <template v-else>
                    <MDRadio :t2="true" @onChange="setIPDIAAUITV2()" :indexs="[0]" v-if="MASTERDATA['IPDMRPTHTRV']" v-model="MASTERDATA['IPDMRPTHTRV']"/>
                    <hr/>
                    <div>{{__t('Ra viện không theo chỉ định')}}:</div>
                    <div class="d-flex flex-center">
                      <div style="flex-grow: 1;">
                        <div class="d-flex">
                          <MDRadio :t2="true" @onChange="setIPDIAAUITV2()" :indexs="[1]" v-if="MASTERDATA['IPDMRPTHTRV']" v-model="MASTERDATA['IPDMRPTHTRV']"/>
                          <div v-if="MASTERDATA['IPDMRPGRV01'] && MASTERDATA['IPDMRPTHTRV'].Items[1].Value" class="d-flex"  style="flex-grow: 1;">
                            <MDRadio v-model="MASTERDATA['IPDMRPGRV01']"/>
                            <textarea-autosize v-if="MASTERDATA['IPDMRPGRV01'].Items[2].Value" class="form-control" rows="2" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPGRV01'].Items[3].Value"/>
                          </div>
                        </div>
                        <div>
                          <MDRadio :t2="true" @onChange="setIPDIAAUITV2()" :indexs="[2]" v-if="MASTERDATA['IPDMRPTHTRV']" v-model="MASTERDATA['IPDMRPTHTRV']"/>
                        </div>
                      </div>
                    </div>
                    <!-- <hr/> -->
                    <MDRadio :t2="true" @onChange="setIPDIAAUITV2()" :indexs="[3]" v-if="MASTERDATA['IPDMRPTHTRV']" v-model="MASTERDATA['IPDMRPTHTRV']"/>
                  </template>
                </div>
              </div>
          </div>
          </template>
          <template v-else-if="Version >= 2">
            <div class="row" v-if="MASTERDATA['IPDMRPTHTRV']">
              <div class="col-md-12">
                <div class="form-group">
                  <label>{{__t2(MASTERDATA['IPDMRPTHTRV'].ViName)}}<i class="unit-label">{{MASTERDATA['IPDMRPTHTRV'].Note}}</i>:</label>
                  <template v-if="readonly">
                    <MDRadioView :data="MASTERDATA['IPDMRPTHTRV'].Items" />
                    <div class="d-flex">
                      <MDRadioView :data="MASTERDATA['IPDMRPGRV01'].Items" />
                      <div>{{MASTERDATA['IPDMRPGRV01'].Items[3].Value}}</div>
                    </div>
                  </template>
                  <template v-else>
                    <MDRadio :t2="true" @onChange="setIPDIAAUITV2()" :indexs="[0]" v-if="MASTERDATA['IPDMRPTHTRV']" v-model="MASTERDATA['IPDMRPTHTRV']"/>
                    <hr/>
                    <div>{{__t('Ra viện không theo chỉ định')}}:</div>
                    <div class="d-flex flex-center">
                      <div style="flex-grow: 1;">
                        <div class="d-flex">
                          <MDRadio :t2="true" @onChange="setIPDIAAUITV2()" :indexs="[1]" v-if="MASTERDATA['IPDMRPTHTRV']" v-model="MASTERDATA['IPDMRPTHTRV']"/>
                          <div v-if="MASTERDATA['IPDMRPGRV01'] && MASTERDATA['IPDMRPTHTRV'].Items[1].Value" class="d-flex"  style="flex-grow: 1;">
                            <MDRadio v-model="MASTERDATA['IPDMRPGRV01']"/>
                            <textarea-autosize v-if="MASTERDATA['IPDMRPGRV01'].Items[2].Value" class="form-control" rows="2" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPGRV01'].Items[3].Value"/>
                          </div>
                        </div>
                        <div>
                          <MDRadio :t2="true" @onChange="setIPDIAAUITV2()" :indexs="[2]" v-if="MASTERDATA['IPDMRPTHTRV']" v-model="MASTERDATA['IPDMRPTHTRV']"/>
                        </div>
                      </div>
                    </div>
                    <!-- <hr/> -->
                    <MDRadio :t2="true" @onChange="setIPDIAAUITV2()" :indexs="[3]" v-if="MASTERDATA['IPDMRPTHTRV']" v-model="MASTERDATA['IPDMRPTHTRV']"/>
                  </template>
                </div>
              </div>
          </div>
          </template>
          <template v-else>
            <div class="row" v-if="MASTERDATA['IPDMRPTHTRV']">
              <div class="col-md-12">
                <div class="form-group">
                  <label>{{__label(MASTERDATA['IPDMRPTHTRV'])}}<i class="unit-label">{{MASTERDATA['IPDMRPTHTRV'].Note}}</i>:</label>
                  <template v-if="readonly">
                    <MDRadioView v-if="MASTERDATA['IPDMRPTHTRV']" :data="MASTERDATA['IPDMRPTHTRV'].Items"/>
                  </template>
                  <template v-else>
                    <MDRadio v-if="MASTERDATA['IPDMRPTHTRV']" v-model="MASTERDATA['IPDMRPTHTRV']"/>
                  </template>
                </div>
              </div>
            </div>
          </template>
          <div class="form-group" v-if="MASTERDATA['IPDMRPG1000'] && MASTERDATA['IPDMRPTCDRV']">
            <label>{{__label(MASTERDATA['IPDMRPG1000'])}}</label>
            <VDateTimePicker3 :allday="'allday'" :readonly="readonly" v-model="MASTERDATA['IPDMRPG1000'].Items[0].Value" class=" select-boox" :format="vDateTimeFormat"/>
          </div>
        </div>
      </div>
    </template>
    <template  v-if="isActiveWithStatus('Inter-hospital transfer')">
      <!-- <label class="block-title-2">{{___t('Chuyển viện')}}:</label> -->
      <div class="ml-10">
        <div class="bg-gray-2">
          <md-input-text :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDRH0']" v-model="MASTERDATA['IPDRH0']"/>
          <md-input-text :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDRFT']" v-model="MASTERDATA['IPDRFT']"/>
          <md-input-text :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDNRH']" v-model="MASTERDATA['IPDNRH']"/>
          <md-input-text :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDTM0']" v-model="MASTERDATA['IPDTM0']"/>
          <md-input-text :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDNAT']" v-model="MASTERDATA['IPDNAT']"/>
          <div class="form-group" v-if="MASTERDATA['IPDMRPTCHVH']">
            <label>{{__t2(MASTERDATA['IPDMRPTCHVH'].ViName)}}</label>
            <template v-for="(item,index) in MASTERDATA['IPDMRPTCHVH'].Items">
              <div :data="item" :key="index" v-if="readonly" class="fake-input disable">{{item.Value}}</div>
              <!-- <VDateTimePicker3 v-else :data="item" :key="index" :id="item.Code" v-model="item.Value" class="select-boox" :format="vDateTimeFormat"/> -->
              <VDateTimePicker3 :max="ednDate" :key="index" v-else v-model="item.Value" class=" select-boox" :format="vDateTimeFormat"/>
            </template>
          </div>
        </div>
      </div>
    </template>
    <template  v-if="isActiveWithStatus('Dead')">
      <!-- <label class="block-title-2">{{___t('Tử vong')}}:</label> -->
      <div class="ml-10">
        <div class="bg-gray-2">
          <div class="row" v-if="MASTERDATA['IPDMRPTNGTV']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{__t2(MASTERDATA['IPDMRPTNGTV'].ViName)}}:<i class="unit-label">{{MASTERDATA['IPDMRPTNGTV'].Note}}</i></label>
                <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['IPDMRPTNGTV'].Items">
                  <div v-if="readonly" class="fake-input disable">{{item.Value}}</div>
                  <!-- <VDateTimePicker3 v-else v-model="item.Value" class=" select-boox" :format="vDateTimeFormat"/> -->
                  <VDateTimePicker3 :max="ednDate" v-else v-model="item.Value" class=" select-boox" :format="vDateTimeFormat"/>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-if="MASTERDATA['IPDMRPTLDTV']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{__t2(MASTERDATA['IPDMRPTLDTV'].ViName)}}:<i class="unit-label">{{MASTERDATA['IPDMRPTLDTV'].Note}}</i></label>
                <div class="flex-box">
                  <div>
                    <template v-if="readonly">
                      <MDRadioView :t2="true" v-if="MASTERDATA['IPDMRPTLDTV']" :data="MASTERDATA['IPDMRPTLDTV'].Items"/>
                    </template>
                    <template v-else>
                      <MDRadio :t2="true" v-if="MASTERDATA['IPDMRPTLDTV']" v-model="MASTERDATA['IPDMRPTLDTV']"/>
                    </template>
                  </div>
                  <div style="flex-grow: 1;" class="ml-10" v-if="MASTERDATA['IPDMRPTLDTV'].Items[2].Value">
                    <textarea-autosize class="form-control" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPTLDTV'].Items[3].Value"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-if="MASTERDATA['IPDMRPTTTTV']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{__t2(MASTERDATA['IPDMRPTTTTV'].ViName)}}<i class="unit-label">{{MASTERDATA['IPDMRPTTTTV'].Note}}</i>:</label>
                <template v-if="readonly">
                  <MDRadioView :t2="true" v-if="MASTERDATA['IPDMRPTTTTV'] && (routeType === 'Gynecological' || routeType === 'A01_195_050919_V' || routeType === 'A01_040_050919_V' || routeType === 'A01_039_050919_V' || routeType === 'Eye')" :indexs="[0, 2, 3]"  :data="MASTERDATA['IPDMRPTTTTV'].Items" />
                  <MDRadioView :t2="true" v-else-if="MASTERDATA['IPDMRPTTTTV']" :indexs="[0, 1]" :data="MASTERDATA['IPDMRPTTTTV'].Items" />
                </template>
                <template v-else>
                  <MDRadio :t2="true" v-if="MASTERDATA['IPDMRPTTTTV'] && (routeType === 'Gynecological' || routeType === 'A01_195_050919_V' || routeType === 'A01_040_050919_V' || routeType === 'A01_039_050919_V' || routeType === 'Eye')" :indexs="[0, 2, 3]" v-model="MASTERDATA['IPDMRPTTTTV']"/>
                  <MDRadio :t2="true" v-else-if="MASTERDATA['IPDMRPTTTTV']" :indexs="[0, 1]" v-model="MASTERDATA['IPDMRPTTTTV']"/>
                </template>
              </div>
            </div>
          </div>
          <div class="row" v-if="MASTERDATA['IPDMRPTTTTV']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{__t('Nguyên nhân tử vong')}}:</label>
              </div>
            </div>
            <div class="col-md-12" v-if="MASTERDATA['IPDMRPTICDT']">
              <div class="form-group">
                <label>{{__t2(MASTERDATA['IPDMRPTICDT'].ViName)}}:</label>
                <template v-if="readonly">
                  <icd10View :mdCode="'IPDMRPTICDT'" :single="true" v-model="MASTERDATA['IPDMRPTICDT'].Items[0].Value"/>
                </template>
                <icd10 v-else @icdChange="icdChange" :mdCode="'IPDMRPTICDT'" :single="true" v-model="MASTERDATA['IPDMRPTICDT'].Items[0].Value"/>
              </div>
            </div>
          </div>
          <label v-if="MASTERDATA['IPDMRPTBCTV']">{{__t2(MASTERDATA['IPDMRPTBCTV'].ViName)}}:</label>
          <md-input-text :hidelabel="true" :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTBCTV']" v-model="MASTERDATA['IPDMRPTBCTV']"/>
          <div class="row" v-if="MASTERDATA['IPDMRPTKNTT']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{__t2(MASTERDATA['IPDMRPTKNTT'].ViName)}}<i class="unit-label">{{MASTERDATA['IPDMRPTKNTT'].Note}}</i>:</label>
                <template v-if="readonly">
                  <MDRadioView :t2="true" v-if="MASTERDATA['IPDMRPTKNTT']" :data="MASTERDATA['IPDMRPTKNTT'].Items"/>
                </template>
                <template v-else>
                  <MDRadio :t2="true" v-if="MASTERDATA['IPDMRPTKNTT']" v-model="MASTERDATA['IPDMRPTKNTT']"/>
                </template>
              </div>
            </div>
          </div>
          <template v-if="MASTERDATA['IPDMRPTKNTT'] && MASTERDATA['IPDMRPTKNTT'].Items[0].Value">
          <div class="row" v-if="MASTERDATA['IPDMRPTTTTV']">
            <div class="col-md-12" v-if="MASTERDATA['IPDMRPTICDK']">
              <label>{{__t('Chẩn đoán giải phẫu tử thi')}}:</label>
            </div>
            <div class="col-md-12" v-if="MASTERDATA['IPDMRPTICDK']">
              <div class="form-group">
                <label>{{__t2(MASTERDATA['IPDMRPTICDK'].ViName)}}:</label>
                <template v-if="readonly">
                  <icd10View :mdCode="'IPDMRPTICDK'" :single="true" v-model="MASTERDATA['IPDMRPTICDK'].Items[0].Value"/>
                </template>
                <icd10 v-else @icdChange="icdChange" :mdCode="'IPDMRPTICDK'" :single="true" v-model="MASTERDATA['IPDMRPTICDK'].Items[0].Value"/>
              </div>
            </div>
          </div>
          <label v-if="MASTERDATA['IPDMRPTBCKN']">{{__t2(MASTERDATA['IPDMRPTBCKN'].ViName)}}:</label>
          <md-input-text :hidelabel="true" :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTBCKN']" v-model="MASTERDATA['IPDMRPTBCKN']"/>
          </template>
        </div>
      </div>
    </template>
    <template  v-if="isActiveWithStatus('Upstream/Downstream transfer')">
      <div class="ml-10">
        <div class="bg-gray-2">
          <div class="row" v-if="MASTERDATA['IPDMRPTCHVI']" id="IPDMRPTCHVI">
            <div class="col-md-12">
              <div class="form-group">
                <template v-if="readonly">
                  <MDRadioView v-if="MASTERDATA['IPDMRPTCHVI']" :data="MASTERDATA['IPDMRPTCHVI'].Items"/>
                </template>
                <template v-else>
                  <MDRadio :t2="true" v-if="MASTERDATA['IPDMRPTCHVI']" v-model="MASTERDATA['IPDMRPTCHVI']"/>
                </template>
              </div>
            </div>
          </div>
          <md-input-text :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDRH1']" v-model="MASTERDATA['IPDRH1']"/>
          <md-input-text :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMTU']" v-model="MASTERDATA['IPDMTU']"/>
          <md-input-text :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDPS0']" v-model="MASTERDATA['IPDPS0']"/>
          <div class="form-group" v-if="MASTERDATA['IPDRFT1']" id="IPDRFT1">
            <label>{{__label(MASTERDATA['IPDRFT1'])}}</label>
            <MDRadio v-if="MASTERDATA['IPDRFT1']" v-model="MASTERDATA['IPDRFT1']"/>
          </div>
          <md-input-text :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDTM1']" v-model="MASTERDATA['IPDTM1']"/>
          <md-input-text :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDNTM']" v-model="MASTERDATA['IPDNTM']"/>
          <div class="form-group" v-if="MASTERDATA['IPDTD0']">
            <label>{{__label(MASTERDATA['IPDTD0'])}}</label>
            <template v-for="(item,index) in MASTERDATA['IPDTD0'].Items">
              <div :data="item" :key="index" v-if="readonly" class="fake-input disable">{{item.Value}}</div>
              <!-- <VDateTimePicker3 v-else :data="item" :key="index" :id="item.Code" v-model="item.Value" class="select-boox" :format="vDateTimeFormat"/> -->
              <VDateTimePicker3 :key="index" :max="ednDate" v-else v-model="item.Value" class=" select-boox" :format="vDateTimeFormat"/>
            </template>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import VSelectBox from '@/components/VSelect.vue'
import VSelectView from '@/components/VSelectDisplay.vue'
import VDateTimePicker3 from '@/components/VDateTimePicker3.vue'
import moment from 'moment'
import _ from 'lodash'
export default {
  name: 'IPDMRPG',
  mixins: [MixinMasterData, MixinForm],
  props: ['status', 'value', 'readonly', 'Version', 'routeType', 'VisitIdDrop', 'IsUseHandOverCheckList', 'VisitId', 'IsCheckTransfer'],
  components: {
    VSelectBox,
    VDateTimePicker3,
    VSelectView
  },
  data () {
    return {
      loaded: false,
      icd10Code: ['IPDMRPTICDTANS', 'IPDMRPTICDKANS', 'IPDMRPTICDCANS', 'IPDMRPTICDPANS'],
      ednDate: null,
      dateRaVien: ''
    }
  },
  computed: {
    getMDSPECIALITIESs: function () {
      if (this.readonly) {
        return this.MDSPECIALITIES.map(e => {
          e.label = e.VisitTypeGroup + ' - ' + e.label
          return e
        })
      }
      return (this.getSpecialitiesInCurrentSite(this.VisitIdDrop) || []).filter(e => {
        return ['IPD'].includes(e.VisitTypeGroup)
      }).map(e => {
        e.label = e.VisitTypeGroup + ' - ' + e.label
        return e
      })
    }
  },
  watch: {
    MASTERDATA: {
      handler (a, b) {
        if (this.loaded) this.emit()
        // Giờ, ngày chỉ định ra viện
        if (this.MASTERDATA['IPDMRPTCDRV'] && this.MASTERDATA['IPDMRPTCDRV'].Items[0].Value && this.MASTERDATA['IPDMRPTCDRV'].Items[0].Value === 'Invalid date') {
          this.MASTERDATA['IPDMRPTCDRV'].Items[0].Value = ''
        }
        if (this.MASTERDATA['IPDMRPTCDRV'] && this.MASTERDATA['IPDMRPTCDRV'].Items[0].Value && this.MASTERDATA['IPDMRPTCDRV'].Items[0].Value !== 'Invalid date') {
          this.dateRaVien = this.MASTERDATA['IPDMRPTCDRV'].Items[0].Value
        }
      },
      deep: true
    }
  },
  mounted () {
    this.getSpecialities()
    this.getMasterDatas({Form: 'IPDMRPG'}, () => {
      this.getData()
    })
    this.ednDate = moment().add(24, 'hours')
  },
  methods: {
    setIPDIAAUITV2 () {
      if (!this.MASTERDATA['IPDMRPGRV01'].Items[1].Value) {
        this.MASTERDATA['IPDMRPGRV01'].Items.forEach(e => {
          e.Value = null
        })
      }
    },
    isActiveWithStatus (type) {
      return this.status && this.status.EnName === type
    },
    emit () {
      this.$emit('input', this.getDataSubmit())
    },
    getDataSubmit () {
      var obj = {}
      var GeneralDatas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var val = item.Value
            if (this.icd10Code.includes(item.Code)) {
              val = JSON.stringify(item.Value)
            }
            GeneralDatas.push({
              Code: item.Code,
              Value: val,
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }
      if (!obj['IPDMRPTKNTTYES']) {
        this.resetMdData('IPDMRPTICDK')
        this.resetMdData('IPDMRPTBCKN')
        GeneralDatas.forEach(item => {
          if (['IPDMRPTICDK', 'IPDMRPTBCKN'].includes(item.Group)) {
            item.Value = null
          }
        })
      }
      return GeneralDatas
    },
    getData () {
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            if (item.Code === 'IPDMRPTHTRVBOV') item.ViName = item.ViName + ' ' + item.Note
            var exited = _.find(this.value, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else if (this.icd10Code.includes(item.Code)) {
                item.Value = this.JSONParse(exited.Value)
              } else {
                item.Value = exited.Value
              }
            } else {
              item.Value = null
              if (this.checkString(item.DataType, 'Text') && item.Data) {
              }
            }
          })
        }
      }
      if (this.MASTERDATA['IPDMRPTTTTV']) {
        if (this.routeType !== 'Obstetrics') {
          this.MASTERDATA['IPDMRPTTTTV'].Items.map((e, index) => {
            if (index === 1) {
              e.ViName = '2. Sau 24 giờ vào viện'
              e.EnName = '2. Sau 24 giờ vào viện'
            }
          })
        }
        if (this.routeType === 'Gynecological' || this.routeType === 'A01_195_050919_V' || this.routeType === 'Eye') {
          this.MASTERDATA['IPDMRPTTTTV'].Items.map((e, index) => {
            if (index === 0) {
              e.ViName = '1. Trong 24 giờ vào viện'
              e.EnName = '1. Trong 24 giờ vào viện'
            }
          })
        }
      }
      if (!this.routeType && this.MASTERDATA['IPDMRPTHTRV']) {
        this.MASTERDATA['IPDMRPTHTRV'].Items[0].ViName = '1. Ra viện'
        this.MASTERDATA['IPDMRPTHTRV'].Items[2].ViName = '3. Bỏ về'
      }
      if (this.MASTERDATA['IPDMRPG1000'] && this.MASTERDATA['IPDMRPG1000'].Items[0].Value && this.MASTERDATA['IPDMRPG1000'].Items[0].Value === 'Invalid date') {
        this.MASTERDATA['IPDMRPG1000'].Items[0].Value = ''
      }
      if (this.MASTERDATA['IPDMRPTCDRV'] && this.MASTERDATA['IPDMRPTCDRV'].Items[0].Value && this.MASTERDATA['IPDMRPTCDRV'].Items[0].Value !== 'Invalid date') {
        this.dateRaVien = this.MASTERDATA['IPDMRPTCDRV'].Items[0].Value
      }
      setTimeout(() => {
        this.emit()
        this.loaded = true
      }, 200)
    },
    icdChange (value, code) {
      var val = (value || []).map(e => e.ViName).join(',')
      switch (code) {
        case 'IPDMRPTICDC':
          // IPDMRPTCDBC
          if (!this.MASTERDATA['IPDMRPTCDBC'].Items[0].Value) this.MASTERDATA['IPDMRPTCDBC'].Items[0].Value = val
          break
        case 'IPDMRPTICDP':
          // IPDMRPTCDKT
          if (!this.MASTERDATA['IPDMRPTCDKT'].Items[0].Value) this.MASTERDATA['IPDMRPTCDKT'].Items[0].Value = val
          break
        case 'IPDMRPTICDT':
          // IPDMRPTBCTV
          if (!this.MASTERDATA['IPDMRPTBCTV'].Items[0].Value) this.MASTERDATA['IPDMRPTBCTV'].Items[0].Value = val
          break
        case 'IPDMRPTICDK':
          // IPDMRPTBCKN
          if (!this.MASTERDATA['IPDMRPTBCKN'].Items[0].Value) this.MASTERDATA['IPDMRPTBCKN'].Items[0].Value = val
          break
        default:
          break
      }
    }
  }
}
</script>
