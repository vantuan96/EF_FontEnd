<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{pkFormat ? $options.filters.formatDateWithoutSecon(Form.UpdatedAt) : FormV2 ? FormV2.UpdateAt :  Form.UpdatedAt }}</span>
    </template>
    <template slot='content' v-if="hasData">
      <table class="standing-order-tbl">
        <tr>
          <th width="40">{{__t('STT')}}</th>
          <th>{{__t('Tên phác đồ/ Ghi chú')}}</th>
          <th width="250">{{__t('Tên thuốc, nồng độ, hàm lượng')}}</th>
          <th width="200">{{__t('Liều dùng')}}</th>
          <th width="100">{{__t('Đường dùng')}}</th>
          <th width="100">{{__t('standingoder')}}</th>
          <th width="150">{{__t('Thời điểm dùng')}}</th>
        </tr>
        <template :data="item" v-for="(item,index) in dataSubmit.Datas">
          <tr v-bind:key="index">
            <td rowspan="2" align="center">{{index + 1}}</td>
            <td>{{item.StandingOrderName}}</td>
            <td class="wrap">{{item.Drug}}</td>
            <td class="wrap">{{item.Dosage}}</td>
            <td class="wrap">{{item.Route}}</td>
            <td class="wrap"><p>{{item.Note}}</p></td>
            <td>{{item.UsedAt}}</td>
          </tr>
          <tr v-bind:key="index + 'ex'">
            <td style="border: none;">
              <template v-if="Version >= 7">
                <span v-if="item.MedicalStaffName" style="display: inline-flex;">
                  <div><i class="v-icon v-icon-doctor"></i></div>
                  <div class="text-center" style="display: grid; margin-left: 5px;">
                    <div class="italic fw400">{{getFTime(item.DoctorTime)}}</div>
                    <b>{{__t('Bác sĩ xác nhận')}}</b>
                    <template v-if="!item.DoctorTime">
                      <div class="italic" style="color: green">({{__t('Chưa ký xác nhận')}})</div>
                    </template>
                    <template v-else>
                      <div class="fw600 inline-block">{{item.DoctorConfirm}}
                        <span class="italic fw400" style="color: green">({{__t('Đã ký xác nhận')}})</span>
                      </div>
                      <div class="fw600">{{item.FullNameDoctorConfirm}}</div>
                    </template>
                  </div>
                </span>
              </template>
              <template v-else>
                <span v-if="item.MedicalStaffName" style="display: inline-flex;">
                  <div><i class="v-icon v-icon-doctor"></i></div>
                  <div style="display: grid; margin-left: 5px;">
                    <b>{{__t('Bác sĩ xác nhận')}}</b>
                    <ad-Info :ad="item.DoctorConfirm" />
                  </div>
                </span>
              </template>
            </td>
            <td colspan="4" style="border: none;">
              <template v-if="Version >= 7">
                <span v-if="item" style="display: inline-flex;">
                  <div><i :class="{
                      'v-icon v-icon-doctor': item.Position.includes('Doctor'),
                      'v-icon v-icon-nurse': item.Position.includes('Nurse'),
                      'v-icon v-icon-medical-secretary': item.Position.includes('Medical Secretary'),
                      'v-icon v-icon-administrator': item.Position.includes('Administrator')
                      }" aria-hidden="true"></i></div>
                  <div style="display: grid; margin-left: 5px;">
                    <SingleConfirm
                    :kind="'CREATEDCONFIRM_USERCREATED'"
                    :FormCode="'A03_029_050919_VE'"
                    :item="item" :readonly="true"
                    :dataVerOld="item.MedicalStaffName"
                    :styleBtnCopy="'top: 10px!important; right: -50px!important;'"
                    :title="'Người tạo và thực hiện'"/>
                  </div>
                </span>
              </template>
              <template v-else-if="Version < 7">
                <span v-if="item.MedicalStaffName" style="display: inline-flex;">
                  <div><i :class="{
                      'v-icon v-icon-doctor': item.Position.includes('Doctor'),
                      'v-icon v-icon-nurse': item.Position.includes('Nurse'),
                      'v-icon v-icon-medical-secretary': item.Position.includes('Medical Secretary'),
                      'v-icon v-icon-administrator': item.Position.includes('Administrator')
                      }" aria-hidden="true"></i></div>
                  <div style="display: grid; margin-left: 5px;">
                    <b>{{__t('Người tạo và thực hiện')}}</b>
                    <ad-Info :ad="item.MedicalStaffName" />
                  </div>
                </span>
              </template>
            </td>
            <td style="border: none;"></td>
          </tr>
        </template>
      </table>
      <p>A03_029_050919_VE</p>
    </template>
  </Vcollapse>
</template>
<script>
import Orders from '@/services/OPD/StandingOrder'
import SingleConfirm from '@/components/Form/SingleConfirm.vue'
export default {
  name: 'OPDStandingOrder',
  props: ['VisitId', 'Form', 'VisitType', 'pkFormat', 'FormV2'],
  data () {
    return {
      dataSubmit: {
        Datas: []
      },
      datas: [],
      user: {},
      StandingOrders: [],
      Type: 'OPD',
      hasData: false,
      Version: ''
    }
  },
  mixins: [],
  /**
   * The components that the page can use.
   */
  components: {
    SingleConfirm
  },
  mounted () {
    this.Type = this.VisitType
  },
  computed: {
    hasConfirmBtn: function () {
      return this.dataSubmit.Datas && this.dataSubmit.Datas.find(e => !e.IsConfirm && e.Id)
    }
  },
  methods: {
    getData () {
      new Orders({}, this._VisitType).find(this._VisitId).then(response => {
        response.Datas.forEach(item => {
        })
        this.hasData = true
        if (this.$refs.Vcollapse) {
          this.$refs.Vcollapse.setHasData()
        }
        this.dataSubmit.Datas = response.Datas
        this.Version = response.Version
      })
    }
  }
}
</script>
