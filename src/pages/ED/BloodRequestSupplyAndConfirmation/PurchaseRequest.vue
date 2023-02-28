<template>
 <div class="tab-form-content padding-form">
  <div class="row">
   <div class="col-md-4">
    <div class="form-group">
     <label>{{ __t("Chẩn đoán") }}:</label>
     <p class="fake-input disable">{{ data.Diagnosis || "N/A" }}</p>
    </div>
   </div>
   <div class="col-md-7">
    <div class="row">
     <div class="col-md-3 padding-5">
      <div class="form-group">
       <label>{{ __t("Khoa/ Phòng") }}:</label>
       <p class="fake-input disable">{{ __label(data.Specialty) }}</p>
      </div>
     </div>
     <div class="col-md-3 padding-5">
      <div class="form-group">
       <label>{{ __t("Nhóm máu ABO") }}</label>
       <!-- <p v-if="lockForm">{{ data.BloodTypeABO || "N/A" }}</p> -->
       <v-select
        class="select-full-w"
        :class="lockForm ? 'disableIP' : ''"
        :readonly="lockForm"
        v-model="data.BloodTypeABO"
        :placeholder="__t('Nhập nhóm máu ABO')"
        :items="BloodFroupABO"
       />
      </div>
     </div>
     <div class="col-md-3 padding-5">
      <div class="form-group">
       <label>{{ __t("Nhóm máu Rh") }}</label>
       <!-- <p v-if="lockForm">{{ data.BloodTypeRH || "N/A" }}</p> -->
       <v-select
        :readonly="lockForm"
        class="select-full-w"
        :class="lockForm ? 'disableIP' : ''"
        v-model="data.BloodTypeRH"
        :placeholder="__t('Nhập nhóm máu Rh')"
        :items="BloodFroupRH"
       />
      </div>
     </div>
     <div class="col-md-3 padding-5">
      <div class="form-group">
       <label class="white-space">{{ __t("Số lần đã truyền") }}</label>
       <p v-if="lockForm" class="fake-input disable">{{ data.TransfusionTime || "N/A" }}</p>
       <VNumberInput v-else v-model="data.TransfusionTime"/>
       <!-- <input v-else class="form-control" v-model="data.TransfusionTime" /> -->
      </div>
     </div>
    </div>
   </div>
  </div>
  <table class="table table-bordered table-bordered-x no-margin middel-table">
   <thead>
    <tr>
     <th class="no-wrap">{{ __t("Loại chế phẩm cần truyền") }}</th>
     <th width="131px" class="no-wrap">{{ __t("Số lượng (đv)") }}</th>
     <th width="131px" class="no-wrap">{{ __t("Thể tích (ml)") }}</th>
     <th width="197px" class="no-wrap" v-if="Version >= 2">{{ __t("Thời gian cần truyền") }}</th>
     <th width="165px" class="no-wrap">{{ __t("Thêm lúc") }}</th>
     <th width="131px" class="no-wrap">{{ __t("Người thêm") }}</th>
    </tr>
   </thead>
   <tbody v-if="data.Datas && data.Datas.length">
    <template v-for="(item, index) in data.Datas">
      <tr :key="index" v-if="!item.IsDeleted">
        <template v-if="lockForm || (item.CreatedBy !== $store.state.account.Username) || item.IsConfirm">
          <td>{{ item.Name }}</td>
          <td>{{ item.Quanlity }}</td>
          <td>{{ item.Capacity }}</td>
          <td v-if="Version >= 2">
            {{item.TransmissionTime}}
          </td>
        </template>
        <template v-else>
          <td style="position: relative">
          <button v-if="!item.Id && (Version === 1)" class="btn-pos-left" @click="item.IsDeleted = true" ><i class="fa fa-trash" aria-hidden="true"></i></button>
          <button
            v-if="(item.CreatedBy === $store.state.account.Username) &&
            (Version >= 2) &&
            !isConfirmed"
            class="btn-pos-left"
            @click="item.IsDeleted = true">
              <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
          <button
            v-else-if="(Version >= 2) && !item.Id"
            class="btn-pos-left"
            @click="item.IsDeleted = true">
              <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
          <v-select class="select-full-w" :search="true" v-model="item.Name" :placeholder="__t('Loại chế phẩm')" :items="BloodNames" />
          </td>
          <td>
            <v-select v-if="Version === 1" :disabeleclear="true" class='select-full-w' v-model="item.Quanlity" :placeholder="__t('Số lượng')" :items="Quanlity"/>
          <VNumberInput v-else v-model="item.Quanlity" :placeholder="__t('Nhập')"/>
          </td>
          <td>
          <input v-if="Version === 1" class="form-control" v-model="item.Capacity" />
          <VNumberInput v-else :decimal="true" v-model="item.Capacity" :placeholder="__t('Nhập')"/>
          </td>
          <td v-if="Version >= 2">
            <v-date-picker class="mrr20" :allday="'allday'" v-model="item.TransmissionTime" :format="vDateTimeFormat" :placeholder="__t('Nhập')"/>
          </td>
        </template>
        <td class="no-wrap">{{ item.Time }}</td>
        <td class="no-wrap"><ad-Info :ad="item.CreatedBy" /></td>
      </tr>
    </template>
   </tbody>
   <tbody v-else>
    <tr>
     <td colspan="6" class="text-center" v-if="Version >= 2">{{ __t("Chưa có chế phẩm") }}</td>
     <td colspan="5" class="text-center" v-else>{{ __t("Chưa có chế phẩm") }}</td>
    </tr>
   </tbody>
  </table>
  <div class="text-center" v-if="!lockForm">
   <button class="btn v-green-btn v-bottom-btn" @click="newData();">
    <i aria-hidden="true" class="fa fa-plus"></i> {{ __t("THÊM CHẾ PHẨM") }}
   </button>
  </div>
  <br /><br />
  <div class="row" v-if="Version >= 2">
   <div class="col-md-4 col-sm-4" v-if="data.HeadOfDeptTime">
    <p class="text-center" v-if="data.HeadOfDeptTime">
     {{ data.HeadOfDeptTime }}
    </p>
    <EformSignature2
     :title="__t('Trưởng khoa điều trị ')"
     :ad="data.HeadOfDept.Username"
    />
   </div>
   <div class="col-md-4 col-sm-4 text-center" v-else>
    <p>
     <b>{{ __t("Trưởng khoa điều trị ") }}</b>
    </p>
    <p v-if="!data.HeadOfDeptTime && !viewOnly">
     <button
      @click="showDoctorConfirm('HeadOfDept', 'Trưởng khoa điều trị ');"
      class="btn v-white-btn"
     >
      {{ __t("Xác nhận") }}
     </button>
    </p>
   </div>
   <div class="col-md-4 col-sm-4"></div>
   <div class="col-md-4 col-sm-4" v-if="data.DoctorConfirmTime">
    <p class="text-center" v-if="data.DoctorConfirmTime">
     {{ data.DoctorConfirmTime }}
    </p>
    <EformSignature2
     :title="__t('Bác sĩ điều trị ')"
     :ad="data.DoctorConfirm.Username"
    />
   </div>
   <div class="col-md-4 col-sm-4 text-center" v-else>
    <p>
     <b>{{ __t("Bác sĩ điều trị ") }}</b>
    </p>
    <p v-if="!data.DoctorConfirmTime && !viewOnly">
     <button
      @click="showDoctorConfirm('DoctorConfirm', 'Bác sĩ điều trị ');"
      class="btn v-white-btn"
     >
      {{ __t("Xác nhận") }}
     </button>
    </p>
   </div>
  </div>
  <div class="row" v-else>
    <div class="col-md-8 col-sm-8">
    </div>
    <div class="col-md-4 col-sm-4" v-if="isConfirmed">
      <p class="text-center" v-if="data.HeadOfDeptTime">{{data.HeadOfDeptTime}}</p>
      <EformSignature2 :title="__t('Trưởng khoa điều trị ')" :ad="data.HeadOfDept.Username" />
    </div>
    <div class="col-md-4 col-sm-4 text-center" v-else>
      <p><b>{{__t('Trưởng khoa điều trị ')}}</b></p>
      <p v-if="!lockForm"><button  @click="showDoctorConfirm('HeadOfDept', 'Trưởng khoa điều trị ')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
    </div>
  </div>
  <br />
  <br />
  <!--
   <div class="row">
     <div class="col-md-12">
       <button class="btn v-yellow-btn pull-right btn-block" type="button" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
     </div>
   </div>
  -->
  <modal
   name="doctorConfirm"
   transition="pop-out"
   id="doctor-login"
   height="auto"
   :clickToClose="false"
  >
   <div class="box v-model-content-popup">
    <div class="box-header text-center">
     <h3 class="box-title">{{ __t(popupTitle) }}.</h3>
     <div style="color: #fff">
      {{ __t("Vui lòng nhập tài khoản ad để xác nhận") }}
     </div>
    </div>
    <div class="form-confirm">
     <div class="form-group has-feedback">
      <input
       v-model="user.username"
       type="text"
       class="form-control"
       :placeholder="__t('Tên đăng nhập')"
      />
      <span class="glyphicon glyphicon-user form-control-feedback"></span>
     </div>
     <div class="form-group has-feedback">
      <input
       v-model="user.password"
       type="password"
       class="form-control current-password"
       :placeholder="__t('Mật khẩu')"
      />
      <span class="glyphicon glyphicon-lock form-control-feedback"></span>
     </div>
     <div class="row">
      <div class="col-xs-6">
       <button
        type="button"
        class="btn btn-block v-white-btn"
        @click="$modal.hide('doctorConfirm');"
       >
        {{ __t("Thoát") }}
       </button>
      </div>
      <div class="col-xs-6">
       <button
        type="button"
        class="btn btn-block v-yellow-btn"
        @click="confirm();"
       >
        {{ __t("Xác nhận") }}
       </button>
      </div>
     </div>
     <p style="margin-top: 10px; text-align:center">
      {{ __t("Sử dụng tài khoản máy tính") }}
     </p>
     <p style="margin-top: 10px; text-align:center">
      {{
       __t(
        "Sau khi xác nhận, người dùng sẽ không thể chỉnh sửa thông tin trên phiếu"
       )
      }}
     </p>
    </div>
   </div>
  </modal>
  <div class="status-float-block" v-if="!lockForm">
   <div class="action-btn-block">
    <div class="container">
     <div class="content-container">
      <div class="row">
       <div class="col-md-2 col-sm-2">
        <div class="form-group1">
         <button
          class="btn btn-block v-white-btn"
          type="button"
          @click="back();"
         >
          <i class="fa fa-angle-double-left" aria-hidden="true"></i>
          {{ __t("Quay lại") }}
         </button>
        </div>
       </div>
       <div class="col-md-4 col-sm-4">
        <div class="form-group1">
         <!--
          <button  class="btn btn-block v-white-btn" type="button" @click="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In')}}</button>
         -->
        </div>
       </div>
       <div class="col-md-6 col-sm-6">
        <div class="form-group1">
         <button
          class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"
          v-shortkey="['ctrl', 's']"
          @shortkey="save();"
          type="button"
          @click="handleSubmit()"
         >
          <i class="fa fa-floppy-o" aria-hidden="true"></i> {{ __t("btn.luu") }}
         </button>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
  <printer ref="Printer" :Id="$route.params.Id" />
  <div>
   <!-- <logs
    v-if="!lockForm"
    :EdId="$route.params.Id"
    :Type="'BloodRequestSupplyAndConfirmation/PurchaseRequest'"
    :noDetail="true"
   /> -->
   <p v-if="Version >= 2">A03_027_080322_V</p>
   <p v-else>A03_027_050919_V</p>
   <span class="mrr5" v-if="data.UpdatedBy || data.CreatedBy">{{__t('Lần chỉnh sửa cuối cùng bởi')}} <ad-Info :ad="data.UpdatedBy || data.CreatedBy" /></span><span v-if="data.UpdatedAt || data.CreatedAt">{{__t('lúc')}} {{data.UpdatedAt || data.CreatedAt}}</span>
  </div>
 </div>
</template>
<script>
import BloodRequestSupplyAndConfirmation from '@/services/ED/BloodRequestSupplyAndConfirmation'
import Customer from '@/services/IPD/Customer'
import Printer from '@/pages/ED/BloodRequestSupplyAndConfirmation/Print'
import VSelect from '@/components/VSelect.vue'
import moment from 'moment'
import utils from '@/constants'
import Logs from '@/components/Logs.vue'
import MixinForm from '@/mixins/form.js'
import VDatePicker from '@/components/VDateTimePicker.vue'
export default {
  name: 'EDBloodRequestSupplyAndConfirmationPurchaseRequest',
  props: ['formdata', 'viewOnly', 'VisitId', 'VisitType'],
  mixins: [MixinForm],
  data () {
    return {
      Id: 'PurchaseRequest/' + this.$route.params.Id,
      data: {},
      BloodFroupABO: utils.BLOODFROUABO,
      BloodFroupRH: utils.BLOODFROUPRH,
      BloodNames: utils.BLOODNAMES,
      Quanlity: [],
      popupTitle: '',
      user: {},
      edited: false,
      Version: 1,
      IsEdited: false
    }
  },
  components: {
    VSelect,
    Printer,
    Logs,
    VDatePicker
  },
  watch: {
    data: {
      handler (a, b) {
        this.edited = true
      },
      deep: true
    },
    edited (val) {
      if (val && this.isConfirmed) {
        this.IsEdited = true
      } else {
        this.IsEdited = false
      }
    }
  },
  mounted () {
    this.Id = 'PurchaseRequest/' + this._VisitId
    for (let index = 0; index < 10; index++) {
      this.Quanlity.push({
        value: String(index + 1),
        label: String(index + 1)
      })
    }
    this.getData()
  },
  computed: {
    isConfirmed: function () {
      return this.data.HeadOfDeptTime || this.viewOnly || this.data.IsLocked || this.data.DoctorConfirmTime
    },
    lockForm: function () {
      return this.viewOnly || this.data.IsLocked || (this.data.DoctorConfirmTime && this.data.HeadOfDeptTime)
    }
  },
  methods: {
    async confirm () {
      if (this.edited) {
        await this.save('confirm')
      }
      if (this.user && this.user.kind) {
        new BloodRequestSupplyAndConfirmation({}, this._VisitType).update('PurchaseRequest/Confirm/' + this.$route.params.Id, this.user).then(async response => {
          this.$modal.hide('doctorConfirm')
          this.toastedSuccess(this.$t('Xác nhận thành công'))
          setTimeout(() => {
            this.reload()
          }, 200)
        }).catch(e => {
          // this.back()
        })
      } else {
        new BloodRequestSupplyAndConfirmation({}, this._VisitType).update('PurchaseRequest/DoctorConfirm/' + this.$route.params.Id, this.user).then(async response => {
          this.$modal.hide('doctorConfirm')
          this.toastedSuccess(this.$t('Xác nhận thành công'))
          setTimeout(() => {
            this.reload()
          }, 200)
        }).catch(e => {
          // this.back()
        })
      }
    },
    showDoctorConfirm (kind, title) {
      this.popupTitle = title
      if (kind !== 'DoctorConfirm') {
        this.user.kind = kind
      }
      this.$modal.show('doctorConfirm')
    },
    print () {
      this.$refs.Printer.print()
    },
    handleSubmit () {
      if (this.IsEdited && (this.Version >= 2)) {
        this.$modal.show('dialog', {
          clickToClose: false,
          title: this.__t('Cảnh báo'),
          text: this.__t('Trưởng khoa điều trị và Bác sĩ điều trị cần xác nhận lại phiếu do bạn đã chỉnh sửa nội dung!'),
          class: 'v-dialog v-dialog-warning',
          buttons: [
            {
              title: this.__t('Đồng ý  '),
              class: 'btn',
              handler: () => {
                this.$modal.hide('dialog')
                this.save()
              }
            },
            {
              title: this.__t('Hủy bỏ'),
              class: 'btn btn-warning',
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
    save (str) {
      this.data.Datas = this.data.Datas.filter(e => e.Id || !e.IsDeleted)
      this.data.IsFrequently = this.formdata.IsFrequently === true || this.formdata.IsFrequently === 'true'
      this.data.Number = this.formdata.Number
      this.data.IsEdited = this.IsEdited
      return new BloodRequestSupplyAndConfirmation({}, this._VisitType).update(this.Id, this.data).then(response => {
        if (!str || str !== 'confirm') {
          this.reload()
          this.toastedSuccess()
        }
      }).catch(e => {
        console.log(e)
        // this._401ResponseError(e)
      })
    },
    newData () {
      this.data.Datas.push({
        Name: '',
        CreatedBy: this.$store.state.account.Username,
        Time: moment().format('HH:mm DD/MM/YYYY'),
        IsDeleted: false,
        Quanlity: '1',
        TransmissionTime: ''
      })
    },
    getData () {
      if (this._VisitType === 'IPD') {
        new Customer({noLoading: true}).find(this._VisitId).then(response => {
          var opd = response
          var icd = this.getICD10s(opd.DiagnosisAndICD.ICD, opd.DiagnosisAndICD.ICDOption, true)
          this.data.Diagnosis = [opd.DiagnosisAndICD.Diagnosis, opd.DiagnosisAndICD.DiagnosisOption].filter(e => e).join(', ') + ' ' + icd
        })
      }
      new BloodRequestSupplyAndConfirmation({}, this._VisitType).find(this.Id + '?hidemsg=' + true).then(response => {
        var objj = response
        objj.Datas.map(element => {
          if (!element.CreatedBy) {
            element.CreatedBy = 'hunglq25'
          }
          element.IsDeleted = false
          element.Quanlity = String(element.Quanlity)
        })
        this.data = objj
        this.Version = response.Version
        setTimeout(() => {
          this.edited = false
        }, 500)
      })
    }
  }
}
</script>
<style scoped>
.disableIP {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  margin: 0 5px;
  border-radius: 3px;
  padding: 5px 8px;
}
</style>
