<template>
  <div class="tab-form-content">
    <div class="tab-title">Sign Out</div>
    <template v-if="loaded">
      <template v-if="DataSubmit">
        <table class="table form-table">
          <tr v-if="MASTERDATA['EIOSOSCSONVCW']">
            <td colspan="4" class="bgdadce0">{{__label(MASTERDATA['EIOSOSCSONVCW'])}}</td>
          </tr>
          <tr>
            <template v-if="MASTERDATA['EIOSOSCSONSPC']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCSONSPC'])}}</th>
              <td width="25%">
                <div class="text-center">
                  <div class="v-checkbox" :data="item" :key="'EIOSOSCSONSPC-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCSONSPC'].Items">
                    <input type="checkbox" :id="'EIOSOSCSONSPCradio-' + index" v-model="item.Value">
                    <label :for="'EIOSOSCSONSPCradio-' + index"></label>
                  </div>
                </div>
              </td>
            </template>
            <template v-if="MASTERDATA['EIOSOSCSOSLCO']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCSOSLCO'])}} <span class="note-text" v-if="MASTERDATA['EIOSOSCSOSLCO'].Note">{{__t(MASTERDATA['EIOSOSCSOSLCO'].Note)}}</span></th>
              <td width="25%">
                <div class="group-radio">
                  <span :data="item" :key="'EIOSOSCSOSLCO-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCSOSLCO'].Items">
                    <input type="checkbox" :id="'EIOSOSCSOSLCOradio-' + index" v-model="item.Value">
                    <label :for="'EIOSOSCSOSLCOradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCSOSLCO'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </template>
          </tr>
          <tr>
            <template v-if="MASTERDATA['EIOSOSCSOISNC']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCSOISNC'])}}</th>
              <td width="25%">
                <div class="group-radio">
                  <span :data="item" :key="'EIOSOSCSOISNC-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCSOISNC'].Items">
                    <input type="checkbox" :id="'EIOSOSCSOISNCradio-' + index" v-model="item.Value">
                    <label :for="'EIOSOSCSOISNCradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCSOISNC'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </template>
            <template v-if="MASTERDATA['EIOSOSCSOAEPR']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCSOAEPR'])}}</th>
              <td width="25%">
                <div class="group-radio">
                  <span :data="item" :key="'EIOSOSCSOAEPR-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCSOAEPR'].Items">
                    <input type="checkbox" :id="'EIOSOSCSOAEPRradio-' + index" v-model="item.Value">
                    <label :for="'EIOSOSCSOAEPRradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOSOSCSOAEPR'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </template>
          </tr>
          <tr>
            <template v-if="MASTERDATA['EIOSOSCSONOSC']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCSONOSC'])}}</th>
              <td width="25%">
                <div :data="item" :key="'EIOSOSCSONOSC-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCSONOSC'].Items" v-if="item.DataType === 'Text'">
                  <input type="text" class="form-control" :placeholder="__label(MASTERDATA['EIOSOSCSONOSC'])" v-model="item.Value">
                </div>
              </td>
            </template>
            <td colspan="2">
            </td>
          </tr>
          <tr v-if="MASTERDATA['EIOSOSCSOSAAN']">
            <td colspan="4" class="bgdadce0">{{__label(MASTERDATA['EIOSOSCSOSAAN'])}}</td>
          </tr>
          <tr>
            <template v-if="MASTERDATA['EIOSOSCSOKCFR']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCSOKCFR'])}} <span class="note-text" v-if="MASTERDATA['EIOSOSCSOKCFR'].Note">{{__t(MASTERDATA['EIOSOSCSOKCFR'].Note)}}</span></th>
              <td width="25%" colspan="3">
                <div :data="item" :key="'EIOSOSCSOKCFR-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCSOKCFR'].Items" v-if="item.DataType === 'Text'">
                  <textarea-autosize :placeholder="__label(MASTERDATA['EIOSOSCSOKCFR'])" class="form-control" v-model="item.Value" rows="3"/>
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
        <div>
          <logs :EdId="this.$route.params.ItemId" :Type="'SurgicalProcedureSafetyChecklist/SignOut'" :noDetail="true" />
          <p>A02_053_050919_VE</p>
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
      </template>
      <div class="text-center" v-else>
        <br/>
        <br/>
        <p>{{__t('Chưa có bảng kiểm an toàn phẫu thuật/thủ thuật, (Trước khi NB rời phòng phẫu thuật/thủ thuật)')}}</p>
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
import NProgress from 'nprogress'
import Logs from '@/components/Logs.vue'
export default {
  name: 'SurgicalProcedureSafetyChecklistSignOut',
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
    this.getMasterDatas({Form: 'EIOSOSCSO'}, () => {
      this.getData()
    })
    this.id = 'SignOut/' + this.$route.params.ItemId
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
          text: this.$t('Bạn có muốn lưu và thực hiện sau?'),
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
        title: this.$t('Tạo  mới: Trước khi NB rời phòng phẫu thuật/thủ thuật'),
        text: this.$t('(Điều dưỡng, bác sĩ gây mê, bác sĩ phẫu thuật tham gia)'),
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
      new SurgicalProcedureSafetyChecklist({}, this._VisitType).update('SignOut/Create/' + this.$route.params.FormId, {}).then(response => {
        this.$router.push({
          name: this._VisitType + 'SurgicalProcedureSafetyChecklistSignOut',
          params: {
            Id: this.$route.params.Id,
            FormId: this.$route.params.FormId,
            ItemId: response.Id
          }
        })
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
