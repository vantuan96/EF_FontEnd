<template>
  <div>
    <div class="tab-form-content">
      <div class="tab-title">Sign In</div>
      <template v-if="loaded">
        <template v-if="DataSubmit">
          <table class="table form-table">
            <tr>
              <template v-if="MASTERDATA['EIOSOSCSIPNDB']">
                <th width="25%">{{__label(MASTERDATA['EIOSOSCSIPNDB'])}}</th>
                <td width="25%">
                  <div class="group-radio">
                    <span :data="item" :key="'EIOSOSCSIPNDB-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCSIPNDB'].Items">
                      <input type="checkbox" :id="'EIOSOSCSIPNDBradio-' + index" v-model="item.Value">
                      <label :for="'EIOSOSCSIPNDBradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCSIPNDB'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </div>
                </td>
              </template>
              <template v-if="MASTERDATA['EIOSOSCSIBTPL']">
                <th width="25%">{{__label(MASTERDATA['EIOSOSCSIBTPL'])}}</th>
                <td width="25%">
                  <div class="group-radio">
                    <span :data="item" :key="'EIOSOSCSIBTPL-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCSIBTPL'].Items">
                      <input type="checkbox" :id="'EIOSOSCSIBTPLradio-' + index" v-model="item.Value">
                      <label :for="'EIOSOSCSIBTPLradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCSIBTPL'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </div>
                </td>
              </template>
            </tr>
            <tr>
              <template v-if="MASTERDATA['EIOSOSCSISNSP']">
                <th width="25%">{{__label(MASTERDATA['EIOSOSCSISNSP'])}}</th>
                <td width="25%">
                  <div class="group-radio">
                    <span :data="item" :key="'EIOSOSCSISNSP-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCSISNSP'].Items">
                      <input type="checkbox" :id="'EIOSOSCSISNSPradio-' + index" v-model="item.Value">
                      <label :for="'EIOSOSCSISNSPradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCSISNSP'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </div>
                </td>
              </template>
              <template v-if="MASTERDATA['EIOSOSCSISPAP']">
                <th width="25%">{{__label(MASTERDATA['EIOSOSCSISPAP'])}}</th>
                <td width="25%">
                  <div class="group-radio">
                    <span :data="item" :key="'EIOSOSCSISPAP-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCSISPAP'].Items">
                      <input type="checkbox" :id="'EIOSOSCSISPAPradio-' + index" v-model="item.Value">
                      <label :for="'EIOSOSCSISPAPradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCSISPAP'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </div>
                </td>
              </template>
            </tr>
            <tr>
              <template v-if="MASTERDATA['EIOSOSCSISPSM']">
                <th width="25%">{{__label(MASTERDATA['EIOSOSCSISPSM'])}}</th>
                <td width="25%">
                  <div class="group-radio">
                    <span :data="item" :key="'EIOSOSCSISPSM-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCSISPSM'].Items">
                      <input type="checkbox" :id="'EIOSOSCSISPSMradio-' + index" v-model="item.Value">
                      <label :for="'EIOSOSCSISPSMradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCSISPSM'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </div>
                </td>
              </template>
              <template v-if="MASTERDATA['EIOSOSCSIAAPC']">
                <th width="25%">{{__label(MASTERDATA['EIOSOSCSIAAPC'])}}</th>
                <td width="25%">
                  <div class="group-radio">
                    <span :data="item" :key="'EIOSOSCSIAAPC-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCSIAAPC'].Items">
                      <input type="checkbox" :id="'EIOSOSCSIAAPCradio-' + index" v-model="item.Value">
                      <label :for="'EIOSOSCSIAAPCradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCSIAAPC'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </div>
                </td>
              </template>
            </tr>
            <tr>
              <template v-if="MASTERDATA['EIOSOSCSISPCF']">
                <th width="25%">{{__label(MASTERDATA['EIOSOSCSISPCF'])}}</th>
                <td width="25%">
                  <div class="group-radio">
                    <span :data="item" :key="'EIOSOSCSISPCF-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCSISPCF'].Items">
                      <input type="checkbox" :id="'EIOSOSCSISPCFradio-' + index" v-model="item.Value">
                      <label :for="'EIOSOSCSISPCFradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCSISPCF'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </div>
                </td>
              </template>
              <template v-if="MASTERDATA['EIOSOSCSIKNAL']">
                <th width="25%">{{__label(MASTERDATA['EIOSOSCSIKNAL'])}}</th>
                <td width="25%">
                  <div class="group-radio">
                    <span :data="item" :key="'EIOSOSCSIKNAL-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCSIKNAL'].Items">
                      <input type="checkbox" :id="'EIOSOSCSIKNALradio-' + index" v-model="item.Value">
                      <label :for="'EIOSOSCSIKNALradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCSIKNAL'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </div>
                </td>
              </template>
            </tr>
            <tr>
              <template v-if="MASTERDATA['EIOSOSCSIACFS']">
                <th width="25%">{{__label(MASTERDATA['EIOSOSCSIACFS'])}}</th>
                <td width="25%">
                  <div class="group-radio">
                    <span :data="item" :key="'EIOSOSCSIACFS-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCSIACFS'].Items">
                      <input type="checkbox" :id="'EIOSOSCSIACFSradio-' + index" v-model="item.Value">
                      <label :for="'EIOSOSCSIACFSradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCSIACFS'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </div>
                </td>
              </template>
              <template v-if="MASTERDATA['EIOSOSCSIASME']">
                <th width="25%">{{__label(MASTERDATA['EIOSOSCSIASME'])}}</th>
                <td width="25%">
                  <div class="group-radio">
                    <span :data="item" :key="'EIOSOSCSIASME-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCSIASME'].Items">
                      <input type="checkbox" :id="'EIOSOSCSIASMEradio-' + index" v-model="item.Value">
                      <label :for="'EIOSOSCSIASMEradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCSIASME'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </div>
                </td>
              </template>
            </tr>
            <tr>
              <template v-if="MASTERDATA['EIOSOSCSIBTCF']">
                <th width="25%">{{__label(MASTERDATA['EIOSOSCSIBTCF'])}}</th>
                <td width="25%">
                  <div class="group-radio">
                    <span :data="item" :key="'EIOSOSCSIBTCF-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCSIBTCF'].Items">
                      <input type="checkbox" :id="'EIOSOSCSIBTCFradio-' + index" v-model="item.Value">
                      <label :for="'EIOSOSCSIBTCFradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCSIBTCF'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </div>
                </td>
              </template>
              <template v-if="MASTERDATA['EIOSOSCSIAIDR']">
                <th width="25%">{{__label(MASTERDATA['EIOSOSCSIAIDR'])}}</th>
                <td width="25%">
                  <div class="group-radio">
                    <span :data="item" :key="'EIOSOSCSIAIDR-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCSIAIDR'].Items">
                      <input type="checkbox" :id="'EIOSOSCSIAIDRradio-' + index" v-model="item.Value">
                      <label :for="'EIOSOSCSIAIDRradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCSIAIDR'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </div>
                </td>
              </template>
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
            <logs :EdId="this.$route.params.ItemId" :Type="'SurgicalProcedureSafetyChecklist/SignIn'" :noDetail="true" />
            <p>A02_053_050919_VE</p>
          </div>
        </template>
      </template>
      <div v-else class="loading-text"><v-loading/></div>
    </div>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import SurgicalProcedureSafetyChecklist from '@/services/SurgicalProcedureSafetyChecklist'
import _ from 'lodash'
import NProgress from 'nprogress'
import Logs from '@/components/Logs.vue'
export default {
  name: 'SurgicalProcedureSafetyChecklistSignIn',
  props: ['formdata'],
  mixins: [MixinMasterData, MixinForm],
  components: {
    Logs
  },
  data () {
    return {
      loaded: false,
      DataSubmit: null,
      type: 'OPD'
    }
  },
  mounted () {
    this.getMasterDatas({Form: 'EIOSOSCSI'}, () => {
      this.getData()
    })
    this.id = 'SignIn/' + this.$route.params.ItemId
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
          text: this.$t('Bạn cần hoàn thiện thông tin "Trước khi gây mê/ gây tê" trước khi chuyển sang đánh giá "Trước khi rạch da"'),
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
