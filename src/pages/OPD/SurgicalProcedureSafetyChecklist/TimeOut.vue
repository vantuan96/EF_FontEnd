<template>
  <div class="tab-form-content">
    <div class="tab-title">Time Out</div>
    <template v-if="loaded">
      <template v-if="DataSubmit">
        <table class="table form-table">
          <tr>
            <template v-if="MASTERDATA['EIOSOSCTOATMI']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOATMI'])}}</th>
              <td width="25%">
                <div class="text-center">
                  <div class="v-checkbox" :data="item" :key="'EIOSOSCTOATMI-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCTOATMI'].Items">
                    <input type="checkbox" :id="'EIOSOSCTOATMIradio-' + index" v-model="item.Value">
                    <label :for="'EIOSOSCTOATMIradio-' + index"></label>
                  </div>
                </div>
              </td>
            </template>
            <template v-if="MASTERDATA['EIOSOSCTOSSMV']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOSSMV'])}}</th>
              <td width="25%">
                <div class="group-radio">
                  <span :data="item" :key="'EIOSOSCTOSSMV-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCTOSSMV'].Items">
                    <input type="checkbox" :id="'EIOSOSCTOSSMVradio-' + index" v-model="item.Value">
                    <label :for="'EIOSOSCTOSSMVradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCTOSSMV'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </template>
          </tr>
          <tr>
            <template v-if="MASTERDATA['EIOSOSCTOCPND']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOCPND'])}}</th>
              <td width="25%">
                <div class="text-center">
                  <div class="v-checkbox" :data="item" :key="'EIOSOSCTOCPND-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCTOCPND'].Items">
                    <input type="checkbox" :id="'EIOSOSCTOCPNDradio-' + index" v-model="item.Value">
                    <label :for="'EIOSOSCTOCPNDradio-' + index"></label>
                  </div>
                </div>
              </td>
            </template>
            <template v-if="MASTERDATA['EIOSOSCTOKNAL']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOKNAL'])}}</th>
              <td width="25%">
                <div class="group-radio">
                  <span :data="item" :key="'EIOSOSCTOKNAL-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCTOKNAL'].Items">
                    <input type="checkbox" :id="'EIOSOSCTOKNALradio-' + index" v-model="item.Value">
                    <label :for="'EIOSOSCTOKNALradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCTOKNAL'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </template>
          </tr>
          <tr>
            <template v-if="MASTERDATA['EIOSOSCTOCSSP']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOCSSP'])}}</th>
              <td width="25%">
                <div class="text-center">
                  <div class="v-checkbox" :data="item" :key="'EIOSOSCTOCSSP-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCTOCSSP'].Items">
                    <input type="checkbox" :id="'EIOSOSCTOCSSPradio-' + index" v-model="item.Value">
                    <label :for="'EIOSOSCTOCSSPradio-' + index"></label>
                  </div>
                </div>
              </td>
            </template>
            <template v-if="MASTERDATA['EIOSOSCTOPCPO']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOPCPO'])}}</th>
              <td width="25%">
                <div class="group-radio">
                  <span :data="item" :key="'EIOSOSCTOPCPO-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCTOPCPO'].Items">
                    <input type="checkbox" :id="'EIOSOSCTOPCPOradio-' + index" v-model="item.Value">
                    <label :for="'EIOSOSCTOPCPOradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCTOPCPO'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['EIOSOSCTOSURE']">
            <td colspan="4" class="bgdadce0">{{__label(MASTERDATA['EIOSOSCTOSURE'])}}</td>
          </tr>
          <tr>
            <template v-if="MASTERDATA['EIOSOSCTODSPT']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTODSPT'])}}</th>
              <td width="25%">
                <div class="text-center">
                  <div class="v-checkbox" :data="item" :key="'EIOSOSCTODSPT-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCTODSPT'].Items">
                    <input type="checkbox" :id="'EIOSOSCTODSPTradio-' + index" v-model="item.Value">
                    <label :for="'EIOSOSCTODSPTradio-' + index"></label>
                  </div>
                </div>
              </td>
            </template>
            <template v-if="MASTERDATA['EIOSOSCTOOPDU']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOOPDU'])}} <span class="note-text">({{__t('Phút')}})</span></th>
              <td width="25%">
                <div :data="item" :key="'EIOSOSCTOOPDU-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCTOOPDU'].Items" v-if="item.DataType === 'Text'">
                  <input type="text" class="form-control" v-model="item.Value" :placeholder="__label(MASTERDATA['EIOSOSCTOOPDU'])">
                </div>
              </td>
            </template>
          </tr>
          <tr>
            <template v-if="MASTERDATA['EIOSOSCTOWCUS']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOWCUS'])}}</th>
              <td width="25%">
                <div class="text-center">
                  <div class="v-checkbox" :data="item" :key="'EIOSOSCTOWCUS-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCTOWCUS'].Items">
                    <input type="checkbox" :id="'EIOSOSCTOWCUSradio-' + index" v-model="item.Value">
                    <label :for="'EIOSOSCTOWCUSradio-' + index"></label>
                  </div>
                </div>
              </td>
            </template>
            <template v-if="MASTERDATA['EIOSOSCTOABLO']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOABLO'])}} <span class="note-text">(ml)</span></th>
              <td width="25%">
                <div :data="item" :key="'EIOSOSCTOABLO-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCTOABLO'].Items" v-if="item.DataType === 'Text'">
                  <input type="text" class="form-control" v-model="item.Value" :placeholder="__label(MASTERDATA['EIOSOSCTOABLO'])">
                </div>
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['EIOSOSCTOATRE']">
            <td colspan="4" class="bgdadce0">{{__label(MASTERDATA['EIOSOSCTOATRE'])}}</td>
          </tr>
          <tr>
            <template v-if="MASTERDATA['EIOSOSCTOPACR']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOPACR'])}}</th>
              <td width="25%">
                <div class="group-radio">
                  <span :data="item" :key="'EIOSOSCTOPACR-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCTOPACR'].Items">
                    <input type="checkbox" :id="'EIOSOSCTOPACRradio-' + index" v-model="item.Value">
                    <label :for="'EIOSOSCTOPACRradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCTOPACR'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </template>
            <template v-if="MASTERDATA['EIOSOSCTOAPGW']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOAPGW'])}}</th>
              <td width="25%">
                <div class="group-radio">
                  <span :data="item" :key="'EIOSOSCTOAPGW-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCTOAPGW'].Items">
                    <input type="checkbox" :id="'EIOSOSCTOAPGWradio-' + index" v-model="item.Value">
                    <label :for="'EIOSOSCTOAPGWradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCTOAPGW'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </template>
          </tr>
          <!-- <tr v-if="MASTERDATA['EIOSOSCTONTRE']">
            <td colspan="4" class="bgdadce0">{{__label(MASTERDATA['EIOSOSCTONTRE'])}}</td>
          </tr>
          <tr>
            <template v-if="MASTERDATA['EIOSOSCTOSOIC']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOSOIC'])}}</th>
              <td width="25%">
                <div class="group-radio">
                  <span :data="item" :key="'EIOSOSCTOSOIC-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCTOSOIC'].Items">
                    <input type="checkbox" :id="'EIOSOSCTOSOICradio-' + index" v-model="item.Value">
                    <label :for="'EIOSOSCTOSOICradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCTOSOIC'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </template>
            <template v-if="MASTERDATA['EIOSOSCTOAPGW']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOAPGW'])}}</th>
              <td width="25%">
                <div class="group-radio">
                  <span :data="item" :key="'EIOSOSCTOAPGW-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCTOAPGW'].Items">
                    <input type="checkbox" :id="'EIOSOSCTOAPGWradio-' + index" v-model="item.Value">
                    <label :for="'EIOSOSCTOAPGWradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCTOAPGW'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </template>
          </tr> -->
          <tr v-if="MASTERDATA['EIOSOSCTONTRE']">
            <td colspan="4" class="bgdadce0">{{__label(MASTERDATA['EIOSOSCTONTRE'])}}</td>
          </tr>
          <tr>
            <template v-if="MASTERDATA['EIOSOSCTOSOIC']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOSOIC'])}}</th>
              <td width="25%">
                <div class="group-radio">
                  <span :data="item" :key="'EIOSOSCTOSOIC-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCTOSOIC'].Items">
                    <input type="checkbox" :id="'EIOSOSCTOSOICradio-' + index" v-model="item.Value">
                    <label :for="'EIOSOSCTOSOICradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCTOSOIC'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </template>
            <template v-if="MASTERDATA['EIOSOSCTOTAEI']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOTAEI'])}}</th>
              <td width="25%">
                <div class="group-radio">
                  <span :data="item" :key="'EIOSOSCTOTAEI-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCTOTAEI'].Items">
                    <input type="checkbox" :id="'EIOSOSCTOTAEIradio-' + index" v-model="item.Value">
                    <label :for="'EIOSOSCTOTAEIradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCTOTAEI'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </template>
          </tr>
          <tr>
            <template v-if="MASTERDATA['EIOSOSCTOSMEQ']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOSMEQ'])}}</th>
              <td width="25%">
                <div class="group-radio">
                  <span :data="item" :key="'EIOSOSCTOSMEQ-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCTOSMEQ'].Items">
                    <input type="checkbox" :id="'EIOSOSCTOSMEQradio-' + index" v-model="item.Value">
                    <label :for="'EIOSOSCTOSMEQradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCTOSMEQ'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </template>
            <template v-if="MASTERDATA['EIOSOSCTOIIDI']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOIIDI'])}}</th>
              <td width="25%">
                <div class="group-radio">
                  <span :data="item" :key="'EIOSOSCTOIIDI-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCTOIIDI'].Items">
                    <input type="checkbox" :id="'EIOSOSCTOIIDIradio-' + index" v-model="item.Value">
                    <label :for="'EIOSOSCTOIIDIradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCTOIIDI'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </template>
          </tr>
          <tr>
            <template v-if="MASTERDATA['EIOSOSCTOCNSI']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOCNSI'])}}</th>
              <td width="25%">
                <div class="group-radio">
                  <span :data="item" :key="'EIOSOSCTOCNSI-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCTOCNSI'].Items">
                    <input type="checkbox" :id="'EIOSOSCTOCNSIradio-' + index" v-model="item.Value">
                    <label :for="'EIOSOSCTOCNSIradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCTOCNSI'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </template>
            <td colspan="2"></td>
          </tr>
        </table>
        <br/>
        <div class="row" v-if="DataSubmit.Nurse && DataSubmit.Nurse.Username">
          <div class="col-md-8 col-sm-8">
          </div>
          <div class="col-md-4 col-sm-4">
            <p class="text-center">{{DataSubmit.CreatedAt}}</p>
            <EformSignature :title="__t('Điều dưỡng viên')" :ad="DataSubmit.Nurse.Username" />
          </div>
        </div>
        <div class="status-float-block">
          <div class="action-btn-block">
            <div class="container">
              <div class="content-container">
                <div class="row">
                  <div class="col-md-2 col-sm-2">
                    <div class="form-group1">
                      <button class="btn btn-block v-white-btn" type="button" @click="back2(`/IPD/SurgicalProcedureSafetyChecklist/${this.$route.params.Id}`)"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-4">
                  </div>
                  <div class="col-md-6 col-sm-6">
                    <div class="form-group1">
                      <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="validateForm()" @click="validateForm()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <logs :EdId="this.$route.params.ItemId" :Type="'SurgicalProcedureSafetyChecklist/TimeOut'" :noDetail="true" />
          <p>A02_053_050919_VE</p>
        </div>
      </template>
      <div class="text-center" v-else>
        <br/>
        <br/>
        <p>{{__t('Chưa có bảng kiểm an toàn phẫu thuật/thủ thuật, (Trước khi rạch da)')}}</p>
        <button class="btn btn-warning" @click="confirmPopup">Tạo mới</button>
      </div>
    </template>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import SurgicalProcedureSafetyChecklist from '@/services/SurgicalProcedureSafetyChecklist'
import _ from 'lodash'
import Logs from '@/components/Logs.vue'
import NProgress from 'nprogress'
export default {
  name: 'SurgicalProcedureSafetyChecklistTimeOut',
  mixins: [MixinMasterData, MixinForm],
  data () {
    return {
      loaded: false,
      DataSubmit: null,
      type: 'OPD'
    }
  },
  components: {
    Logs
  },
  mounted () {
    this.getMasterDatas({Form: 'EIOSOSCTO'}, () => {
      this.getData()
    })
    this.id = 'TimeOut/' + this.$route.params.ItemId
  },
  methods: {
    validateForm () {
      var warn = false
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items && this.MASTERDATA[property].Items.length) {
          var hasData = this.MASTERDATA[property].Items.find(e => (e.Value))
          if (!hasData) {
            console.log(this.MASTERDATA[property])
            warn = true
          }
        }
      }
      if (warn) {
        this.$modal.show('dialog', {
          clickToClose: false,
          title: this.$t('Bạn có trường thông tin chưa được đánh giá'),
          text: this.$t('Bạn cần hoàn thiện thông tin "Trước khi rạch da" trước khi chuyển sang đánh giá "Trước khi NB rời phòng phẫu thuật/thủ thuật"'),
          class: 'v-dialog v-dialog-warning',
          buttons: [
            {
              title: this.$t('Tôi xác nhận'),
              class: 'btn btn-warning',
              handler: () => {
                this.$modal.hide('dialog')
                this.save()
              }
            },
            {
              title: this.$t('Bỏ qua'),
              class: 'btn',
              handler: () => {
                // this.back()
                this.$modal.hide('dialog')
              }
            }
          ]
        })
      } else {
        this.save()
      }
    },
    save () {
      var obj = {}
      NProgress.start()
      this.DataSubmit.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var val = item.Value
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: val || '',
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }
      new SurgicalProcedureSafetyChecklist({}, this._VisitType).update(this.id, this.DataSubmit).then(response => {
        this.toastedSuccess()
        this.edited = false
      }).catch(e => {
        // this._401ResponseError(e)
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.$t('Tạo mới: Trước khi rạch da'),
        text: this.$t('(Kíp phẫu thuật/ thủ thuật tham gia)'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.$t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.creat()
            }
          },
          {
            title: this.$t('Bỏ qua'),
            class: 'btn',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    creat () {
      new SurgicalProcedureSafetyChecklist({}, this._VisitType).update('TimeOut/Create/' + this.$route.params.FormId, {}).then(response => {
        this.$router.push({name: this._VisitType + 'SurgicalProcedureSafetyChecklistTimeOut', params: {Id: this.$route.params.Id, FormId: this.$route.params.FormId, ItemId: response.Id}})
        this.reload()
      }).catch(e => {
        // this.back()
      })
    },
    getData () {
      this.loaded = false
      new SurgicalProcedureSafetyChecklist({}, this._VisitType).find(this.id + '?hidemsg=' + true).then(response => {
        this.HasData = true
        this.DataSubmit = response
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              var code = item.Code
              var exited = _.find(this.DataSubmit.Datas, {Code: code})
              if (exited) {
                if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                  var isTrue = (exited.Value === 'True')
                  item.Value = exited.Value ? isTrue : ''
                } else {
                  item.Value = exited.Value
                }
              }
            })
          }
        }
        this.loaded = true
      }).catch(e => {
        this.loaded = true
        if (e.status === 404) {}
      })
    }
  }
}
</script>
