<template>
  <div class="tab-form-content">
    <div class="tab-form-content">
      <p style="margin: 10px 0">{{__t('Đã thực hiện truyền')}}:</p>
      <table class="table table-bordered table-bordered-x no-margin middel-table">
        <thead>
          <tr>
            <th>{{__t('Tên chế phẩm - Người cho/ Mã hiệu')}}</th>
            <th width="110px">{{__t('Số lượng (đv)')}}</th>
            <th width="110px">{{__t('Thể tích (ml)')}}</th>
            <th width="160px">{{__t('Ghi chú ')}}</th>
            <th width="200px">{{__t('Thời gian thực hiện')}}</th>
            <th width="160px">{{__t('Người thực hiện')}}</th>
          </tr>
        </thead>
        <tbody v-if="data.Datas && data.Datas.length">
          <tr :key="index" v-for="(item, index) in data.Datas" v-if="!item.IsDeleted">
            <template v-if="!viewOnly && (item.CreatedBy === $store.state.account.Username) && (!item.ConfirmCreated || (item.ConfirmCreated && item.ConfirmCreated.IsUnlockConfirm)) && data.Version >= 7">
              <td style="position: relative">
                <button v-if="(item.CreatedBy === $store.state.account.Username) && !viewOnly" class="btn-pos-left" @click="item.IsDeleted = true">
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
                <v-select class='select-full-w' :search="true" v-model="item.Code" :placeholder="__t('Chọn')" :items="BloodNames"/>
                </td>
              <td>
                <VNumberInput v-model="item.Quanlity" :placeholder="__t('Số lượng')"/>
              </td>
              <td>
                <VNumberInput v-model="item.Capacity" :placeholder="__t('Nhập')"/>
              </td>
              <td>
                <!-- <textarea-autosize class="form-control" v-model="item.Note"/> -->
                <MDText :placeholder="__t('Nhập')" rows="1" v-model="item.Note"/>
              </td>
              <td><v-date-picker v-model="item.Time" class="full-w" :format="vDateTimeFormat"/></td>
              <td class="no-wrap">
                <div v-if="data.Version >= 7">
                  <SingleConfirm
                    :kind="'BloodTransfusionist_USERCREATED'"
                    :FormCode="'A03_027_080322_V'"
                    :item="item" :readonly="viewOnly"
                    :viewOnly="viewOnly"
                    :dataVerOld="item.CreatedBy"
                    :hideLabel="true"
                    @saveRow="saveRow"
                    @success="success"
                    :title="'Người thực hiện'"/>
                </div>
                <ad-Info v-else :ad="item.CreatedBy" />
              </td>
            </template>
            <template v-else-if="!viewOnly && (item.CreatedBy === $store.state.account.Username) && data.Version < 7">
              <td style="position: relative">
                <button v-if="(item.CreatedBy === $store.state.account.Username) && !viewOnly" class="btn-pos-left" @click="item.IsDeleted = true">
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
                <v-select class='select-full-w' :search="true" v-model="item.Code" :placeholder="__t('Chọn')" :items="BloodNames"/>
                </td>
              <td>
                <VNumberInput v-model="item.Quanlity" :placeholder="__t('Số lượng')"/>
              </td>
              <td>
                <VNumberInput v-model="item.Capacity" :placeholder="__t('Nhập')"/>
              </td>
              <td>
                <!-- <textarea-autosize class="form-control" v-model="item.Note"/> -->
                <MDText :placeholder="__t('Nhập')" rows="1" v-model="item.Note"/>
              </td>
              <td><v-date-picker v-model="item.Time" class="full-w" :format="vDateTimeFormat"/></td>
              <td class="no-wrap">
                <div v-if="data.Version >= 7">
                  <SingleConfirm
                    :kind="'BloodTransfusionist_USERCREATED'"
                    :FormCode="'A03_027_080322_V'"
                    :item="item" :readonly="viewOnly"
                    :viewOnly="viewOnly"
                    :dataVerOld="item.CreatedBy"
                    :hideLabel="true"
                    @saveRow="saveRow"
                    @success="success"
                    :title="'Người thực hiện'"/>
                </div>
                <ad-Info v-else :ad="item.CreatedBy" />
              </td>
            </template>
            <template v-else>
              <td>{{item.Code || 'N/A'}}</td>
              <td>{{item.Quanlity || 'N/A'}}</td>
              <td>{{item.Capacity || 'N/A'}}</td>
              <td>{{item.Note}}</td>
              <td>{{item.Time}}</td>
              <td class="no-wrap">
                <template v-if="data.Version >= 7">
                  <SingleConfirm
                    :kind="'BloodTransfusionist_USERCREATED'"
                    :FormCode="'A03_027_080322_V'"
                    :item="item" :readonly="viewOnly"
                    :viewOnly="viewOnly"
                    :dataVerOld="item.CreatedBy"
                    :hideLabel="true"
                    @saveRow="saveRow"
                    @success="success"
                    :title="'Người thực hiện'"/>
                </template>
                <template v-else>
                  <ad-Info :ad="item.CreatedBy" />
                </template>
              </td>
            </template>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="6" class="text-center">{{__t('Chưa có chế phẩm')}}</td>
          </tr>
        </tbody>
      </table>
      <div class="text-center" v-if="!viewOnly">
        <button class="btn v-green-btn v-bottom-btn" @click="newData()"><i aria-hidden="true" class="fa fa-plus"></i> {{__t('THÊM XÁC NHẬN')}}</button>
      </div>
      <br/><br/>
      <br/>
      <br/>
      <!-- <div class="padding-form">
        <div class="row">
          <div class="col-md-12">
            <button class="btn v-yellow-btn pull-right btn-block" type="button" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
          </div>
        </div>
      </div> -->
    </div>
    <div class="status-float-block" v-if="!viewOnly">
      <div class="action-btn-block">
        <div class="container">
          <div class="content-container">
            <div class="row">
              <div class="col-md-2 col-sm-2">
                <div class="form-group1">
                  <button class="btn btn-block v-white-btn" type="button" @click="back()"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
                <div class="form-group1">
                  <!-- <button  class="btn btn-block v-white-btn" type="button" @click="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In')}}</button> -->
                </div>
              </div>
              <div class="col-md-6 col-sm-6">
                <div class="form-group1">
                  <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" v-shortkey="['ctrl', 's']" @shortkey="save()" type="button" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <printer ref="Printer" :Id="$route.params.Id" />
    <div>
      <logs v-if="!viewOnly" :EdId="this.$route.params.Id" :Type="'BloodRequestSupplyAndConfirmation/TransfusionConfirmation'" :noDetail="true" />
      <p v-if="data.Version === 2 || data.Version >= 7">A03_027_080322_V</p>
      <p v-else>A03_027_050919_V</p>
      <span class="mrr5" v-if="data.UpdatedBy || data.CreatedBy">{{__t('Lần chỉnh sửa cuối cùng bởi')}} <ad-Info :ad="data.UpdatedBy || data.CreatedBy" /></span><span v-if="data.UpdatedAt || data.CreatedAt">{{__t('lúc')}} {{data.UpdatedAt || data.CreatedAt}}</span>
    </div>
  </div>
</template>
<script>
import BloodRequestSupplyAndConfirmation from '@/services/ED/BloodRequestSupplyAndConfirmation'
import VSelect from '@/components/VSelect.vue'
import moment from 'moment'
import VDatePicker from '@/components/VDateTimePicker.vue'
import Printer from '@/pages/ED/BloodRequestSupplyAndConfirmation/Print'
import Logs from '@/components/Logs.vue'
import SingleConfirm from '@/components/Form/SingleConfirm.vue'
export default {
  name: 'EDBloodRequestSupplyAndConfirmationTransfusionConfirmation',
  props: ['formdata', 'viewOnly', 'VisitId', 'VisitType'],
  data () {
    return {
      Id: 'TransfusionConfirmation/' + this.$route.params.Id,
      data: {},
      BloodNames: [
      ],
      Quanlity: [],
      popupTitle: '',
      Created: '',
      Note: '',
      user: {}
    }
  },
  components: {
    VSelect, VDatePicker, Printer, Logs, SingleConfirm
  },
  mounted () {
    this.Id = 'TransfusionConfirmation/' + this._VisitId
    for (let index = 0; index < 10; index++) {
      this.Quanlity.push({
        value: String(index + 1),
        label: String(index + 1)
      })
    }
    this.getData()
  },
  computed: {
  },
  methods: {
    print () {
      this.$refs.Printer.print()
    },
    save (str) {
      this.data.IsFrequently = this.formdata.IsFrequently || this.formdata.IsFrequently === 'true'
      this.data.Number = this.formdata.Number
      this.data.Datas = this.data.Datas.filter(e => !e.IsDeleted || e.Id)
      this.data.Datas.forEach(e => {
        e.Quanlity = parseInt(e.Quanlity)
      })
      new BloodRequestSupplyAndConfirmation({}, this._VisitType).update(this.Id, this.data).then(response => {
        if (str !== 'confirm') {
          this.toastedSuccess().getData()
          this.reload()
        }
      }).catch(e => {
        // this._401ResponseError(e)
      })
    },
    // parseInt (i) {
    //   return parseInt(i)
    // },
    newData () {
      let obj = {}
      if (this.data.Version >= 7) {
        obj = {
          Code: '',
          Quanlity: '1',
          Capacity: '',
          Note: '',
          CreatedBy: this.$store.state.account.Username,
          Time: moment().format('HH:mm DD/MM/YYYY'),
          IsDeleted: false,
          ConfirmCreated: null
        }
      } else {
        obj = {
          Code: '',
          Quanlity: '1',
          Capacity: '',
          Note: '',
          CreatedBy: this.$store.state.account.Username,
          Time: moment().format('HH:mm DD/MM/YYYY'),
          IsDeleted: false
        }
      }
      this.data.Datas.push(obj)
    },
    getData () {
      new BloodRequestSupplyAndConfirmation({}, this._VisitType).find(this.Id + '?hidemsg=' + true).then(response => {
        this.BloodNames = []
        let obj = response
        obj.Datas.forEach(element => {
          element.Quanlity = String(element.Quanlity)
          element.IsDeleted = false
        })
        this.data = obj
        // this.data.Datas.forEach(element => {
        //   element.Quanlity = String(element.Quanlity)
        //   element.IsDeleted = false
        // })
        this.data.ListCode.forEach(element => {
          if (!this.BloodNames.find(e => e.value === element.Name + '-' + element.Code)) {
            this.BloodNames.push({
              value: element.Name + '-' + element.Code,
              label: element.Name + '-' + element.Code
            })
          }
        })
      })
    },
    saveRow (item) {
      if (item.CreatedBy === this.$store.state.account.Username) {
        let Data = {}
        Data.IsFrequently = this.formdata.IsFrequently || this.formdata.IsFrequently === 'true'
        Data.Number = this.formdata.Number
        item.Quanlity = parseInt(item.Quanlity)
        Data.Datas = [item]
        new BloodRequestSupplyAndConfirmation({}, this._VisitType).update(this.Id, Data).then(res => {
          if (res.ListId && res.ListId.length) {
            item.Id = res.ListId[0]
          }
        })
      }
    },
    success (dataConfirm) {
      console.log('dataConfirm', dataConfirm)
      this.data.Datas.find(e => {
        if (e.Id === dataConfirm.Id) {
          e.ConfirmCreated = {
            ConfirmAt: '',
            ConfirmBy: '',
            ConfirmType: '',
            ObjectId: '',
            IsUnlockConfirm: false
          }
          console.log('e: ', e)
        }
      })
      console.log('Datas', this.data.Datas)
    }
  }
}
</script>
