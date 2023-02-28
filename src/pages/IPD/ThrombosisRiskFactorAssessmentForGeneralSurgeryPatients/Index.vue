<template>
  <div>
    <div class="header">
      <h1 class="text-center form-title; margin-bottom: 10px;">{{__t('ĐÁNH GIÁ NGUY CƠ THUYÊN TẮC MẠCH')}}</h1>
      <p class="text-center">{{__t("(Áp dụng cho bệnh nhân Ngoại tổng hợp - Bác sĩ đánh giá lúc BN nhập viện)")}}</p>
    </div>
    <div class="content">
      <div class="table">
        <!-- filter -->
        <div v-if="!viewOnly" class="row container" style="width: 100%; display: flex;">
          <div class="col-2 form-group" style="width: 100%; display: inline-table">
            <label>{{__t('Từ ngày')}}</label>
            <v-date-time-picker :format="vDateTimeFormat" :allday="'allday'" v-model="parameters.FromDate" ></v-date-time-picker>
          </div>
          <div class="col-2 form-group" style="width: 100%; display: inline-table">
            <label>{{__t('Đến ngày')}}</label>
            <v-date-time-picker :format="vDateTimeFormat" :allday="'allday'" v-model="parameters.ToDate" :min="parameters.FromDate"></v-date-time-picker>
          </div>
          <div class="col-4 form-group" style="width: 100%; display: inline-table; margin-left: 36px;">
            <label>{{__t('Người đánh giá')}}</label>
            <UsersSelect2 v-model="parameters.Assessor" />
          </div>
          <div class="col-3 form-group" style="width: 100%; display: inline-table; margin-top: 25px; margin-left: 20px;">
            <button class="btn btn-flat v-yellow-btn" style="margin-right: 20px" @click="getData()">{{__t("Lọc")}}</button>
            <button class="btn btn-flat" @click="clearFilter()">{{__t('Xóa bộ lọc')}}</button>
          </div>
        </div>
        <p style="font-style: italic" class="mt-10 mb-10">{{__t('Lọc theo thời gian bắt đầu đánh giá.')}}</p>
        <!-- table -->
        <table class="standing-order-tbl">
          <tr>
            <th width="5%" class="text-center">STT</th>
            <th width="10%" class="text-center">{{__t('Bắt đầu')}}</th>
            <th width="10%" class="text-center">{{__t('Kết thúc')}}</th>
            <th width="60%" class="text-center">{{__t('Nội dung đánh giá')}}</th>
            <th width="15%" class="text-center">{{__t('Người đánh giá')}}</th>
          </tr>
          <template v-if="data && data.length === 0">
            <tr>
              <td colspan="5" class="text-center">{{__t('Không có dữ liệu')}}</td>
            </tr>
          </template>
          <template v-else v-for="(item, index) in data">
            <tr :key="index + '-root-tr' + item.ItemId" class="view-full">
              <td class="text-center" style="vertical-align: top">{{((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1)}}</td>
              <td style="vertical-align: top" class="text-center">{{ item.StartingAssessment | formatDateWithoutSecon}}</td>
              <td style="vertical-align: top" class="text-center">{{ item.FinishingAssessment | formatDateWithoutSecon}}</td>
              <!-- Nội dung đánh giá -->
              <td style="vertical-align: top" class="no-padding">
                <div>
                  <p style="text-align: left; padding-left: 5px; margin: 0">1. {{__t('Đánh giá nguy cơ thuyên tắc mạch bằng thang điểm Caprini')}}</p>
                  <div class="flex-box flex-items pl-5 mb-5">
                    <i class="fa fa-check fa-2 green-color" aria-hidden="true"></i>
                    <div v-if="item.PaduaTotalPoint === 0">&#160;{{__t('Tổng điểm')}}: 0.</div>
                    <div v-else>&#160;{{__t('Tổng điểm')}}: {{item.PaduaTotalPoint}}.</div>
                    <!-- Check Nguy co -->
                    <!-- <div v-if="item.PaduaTotalPoint === 0">&#160;{{__t('Nguy cơ HKTT')}}: {{__t('N/A')}}</div> -->
                    <div v-if="item.PaduaTotalPoint >= 0 && item.PaduaTotalPoint <= 2">&#160;{{__t('Nguy cơ HKTT')}}: {{__t('Thấp')}}</div>
                    <div v-if="item.PaduaTotalPoint >= 3 && item.PaduaTotalPoint <= 4">&#160;{{__t('Nguy cơ HKTT')}}: {{__t('Trung bình')}}</div>
                    <div v-if="item.PaduaTotalPoint >= 5">&#160;{{__t('Nguy cơ HKTT')}}: {{__t('Cao')}}</div>
                  </div>
                </div>
                <div>
                  <p style="text-align: left; padding-left: 5px; margin: 0">2. {{__t('Đánh giá nguy cơ chảy máu theo phẫu thuật')}}</p>
                  <div class="flex-box flex-items pl-5">
                    <Intervention style="padding: 0" :Intervention="item.ConditionOfPatient" />
                  </div>
                </div>
                <div>
                  <p style="text-align: left; padding-left: 5px; margin: 0">3. {{__t('Đánh giá nguy cơ chảy máu của từng bệnh nhân bằng bảng Improve')}}</p>
                  <div class="flex-box flex-items pl-5 mb-5">
                    <i class="fa fa-check fa-2 green-color" aria-hidden="true"></i>
                    <div v-if="item.IMPROVETotalPoint === 0">&#160;{{__t('Tổng điểm')}}: 0.</div>
                    <div v-else>&#160;{{__t('Tổng điểm')}}: {{item.IMPROVETotalPoint}}.</div>
                    <!-- <div v-if="item.IMPROVETotalPoint === 0">&#160;{{__t('Nguy cơ chảy máu')}}: {{__t('N/A')}}</div> -->
                    <div v-if="item.IMPROVETotalPoint < 7">&#160;{{__t('Nguy cơ chảy máu')}}: {{__t('Thấp')}}</div>
                    <div v-if="item.IMPROVETotalPoint >= 7">&#160;{{__t('Nguy cơ chảy máu')}}: {{__t('Cao')}}</div>
                  </div>
                </div>
                <div>
                  <p style="text-align: left; padding-left: 5px; margin: 0">4. {{__t('CCĐ thuốc chống đông - cân nhắc điều trị dự phòng bằng biện pháp cơ học')}}</p>
                  <div class="flex-box flex-items pl-5">
                    <Intervention style="padding: 0" :Intervention="item.ContraindicationsForAntiCoagulant" />
                  </div>
                </div>
                <div>
                  <p style="text-align: left; padding-left: 5px; margin: 0">5. {{__t('CCĐ của biện pháp cơ học')}}</p>
                  <div class="flex-box flex-items pl-5">
                    <Intervention style="padding: 0" :Intervention="item.MechanicalProphylaxis" />
                  </div>
                </div>
                <div>
                  <p style="text-align: left; padding-left: 5px; margin: 0">6. {{__t('Tổng hợp yếu tố nguy cơ và áp dụng biện pháp dự phòng HKTT')}}</p>
                  <div class="flex-box flex-items pl-5">
                    <Intervention style="padding: 0" :Intervention="item.VTERiskFactors" />
                  </div>
                </div>
              </td>
              <td align="center" class="text-center">
                <template v-if="Version < 9">
                  <div class="box-ad-info">
                    <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
                  </div>
                  <div class="box-btn-edit mrb10">
                    <button class="btn v-yellow-btn btn-edit" style="width: 85px;" v-if="$store.state.account.Username === item.CreatedBy && !Is24hLock && !viewOnly" @click="handleEdit(item.ItemId, item)">{{__t('Chi tiết')}}</button>
                  </div>
                </template>
                <template v-else>
                  <div class="box-btn-edit mrb10">
                    <button class="btn v-yellow-btn btn-edit" style="width: 85px;" v-if="checkShowDetail(item)" @click="handleEdit(item.ItemId, item)">{{__t('Chi tiết')}}</button>
                  </div>
                  <div class="box-ad-info" v-if="(!item.ConfirmCreated || (item.ConfirmCreated && item.ConfirmCreated.IsUnlockConfirm))">
                    <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
                  </div>
                  <SingleConfirm
                    :kind="'TRFA_USERCREATED'"
                    :FormCode="'A01_049_050919_VE'"
                    :item="item" :readonly="readonly2(item)"
                    :viewOnly="viewOnly"
                    :hideLabel="true"
                    @success="success"
                    :styleBtnCopy="'top: -19px;right: -5px;'"
                    class="no-wrap"
                    :title="'Người đánh giá'"/>
                </template>
              </td>
            </tr>
            <!-- <MDShowMore :key="index + '-action-tr'" :data="item" colspan="5"/> -->
          </template>
          <!-- phân trang -->
          <tfoot v-if="data && data.length > 0">
            <tr>
              <td colspan="5">
                <template>
                  <div class="flex space-between">
                    <div>
                      <paginate
                      :clickHandler="getData"
                      :container-class="'pagination pagination-sm no-margin v-pagination'"
                      :next-text="'»'"
                      :page-count="parameters.pages"
                      :prev-text="'«'"
                      v-if="data.length > 0"
                      v-model="parameters.pageNumber">
                      </paginate>
                    </div>
                    <div class="box-record">
                      <p>{{__t('ThrombosisRisk.hien_thi')}}: {{data.length + '/' + totalRow}} {{__t('đánh giá')}}</p>
                    </div>
                  </div>
                </template>
              </td>
            </tr>
          </tfoot>
        </table>
        <div>
        </div>
      </div>
      <Form :viewOnly="viewOnly" :Version="Version" :readonlyPopup="readonlyPopup" ref="Form" />
      <p>A01_049_050919_VE</p>
      <div v-if="data && data.length > 0">
        <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="UpdateBy" :ad="UpdateBy" /> {{__t('lúc')}} {{UpdateAt | formatDateWithoutSecon}}</p>
      </div>
      <!-- footer -->
      <FloatBlock v-if="!viewOnly && !Is24hLock" @handleBack='handleBack()'>
        <template slot='buttons'>
          <div class="col-md-2 col-sm-2">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-4 col-sm-4">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-6 col-sm-6">
            <div class="form-group1">
              <button v-if="condition === 'Doctor'" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleInsert"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Thêm đánh giá')}}</button>
              <!-- <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleInsert"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Thêm đánh giá')}}</button> -->
            </div>
          </div>
        </template>
      </FloatBlock>
    </div>
  </div>
</template>

<script>
import Intervention from './Intervention'
import ThrombosisRiskFactorAssessment from '@/services/IPD/ThrombosisRiskFactorAssessment'
import Form from './Form.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import UsersSelect2 from '@/components/UsersSelect2.vue'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import _ from 'lodash'
import SingleConfirm from '@/components/Form/SingleConfirm.vue'

export default {
  name: 'ThrombosisRiskFactorAssessmentForGSP',
  components: {
    Intervention,
    Form,
    UsersSelect2,
    VDateTimePicker,
    SingleConfirm
  },
  mixins: [MixinForm, MixinMasterData],
  props: ['viewOnly', 'VisitId'],
  data () {
    return {
      Is24hLock: false,
      UpdateBy: '',
      UpdateAt: '',
      formId: '',
      totalRow: '',
      data: null,
      showPopup: false,
      subTotalPoint: 0,
      parameters: {
        FormCode: 'A01_049_050919_VE',
        pageNumber: 1,
        pages: 1,
        FromDate: null,
        ToDate: null,
        PageSize: 5,
        Assessor: {
          Username: '',
          Fullname: ''
        },
        IPDId: this._VisitId
      },
      Version: '',
      readonlyPopup: false
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    condition () {
      let name = ''
      if (this.$store.state.account.Position.includes('Nurse')) {
        name = 'Nurse'
      }
      if (this.$store.state.account.Position.includes('Doctor')) {
        name = 'Doctor'
      }
      return name
    },
    readonly () {
      return this.viewOnly || this.Is24hLock
    }
  },
  methods: {
    getData () {
      new ThrombosisRiskFactorAssessment(this.updateQuery()).all().then(response => {
        this.Version = response.Version
        this.data = response.thrombosisRisk
        this.Is24hLock = response.Is24hLock
        this.totalRow = response.Count
        this.UpdateBy = response.LastUpdate.UpdateBy
        this.UpdateAt = response.LastUpdate.UpdateAt
        response.thrombosisRisk.map(e => {
          e.showBtn = true
          e.view = !e.showBtn
        })
        this.data = _.cloneDeep(response.thrombosisRisk)
        var bonussssss = 1
        if ((response.Count % this.parameters.PageSize) === 0) {
          bonussssss = 0
        }
        this.parameters.pages = parseInt(response.Count / this.parameters.PageSize) + bonussssss
      })
    },
    updateQuery () {
      return Object.assign({}, this.parameters, {
        IPDId: this._VisitId,
        FromDate: this.parameters.FromDate === null ? '' : this.parameters.FromDate,
        ToDate: this.parameters.ToDate === null ? '' : this.parameters.ToDate,
        Assessor: this.parameters.Assessor.Username === null ? '' : this.parameters.Assessor.Username
      })
    },
    clearFilter () {
      this.parameters = {
        FormCode: 'A01_049_050919_VE',
        IPDId: this._VisitId,
        FromDate: null,
        ToDate: null,
        Assessor: {
          Username: '',
          Fullname: ''
        },
        pageNumber: 1,
        pages: 1,
        PageSize: 5
      }
      this.getData()
    },
    handleEdit (id, item) {
      this.readonlyPopup = false
      if (item.ConfirmCreated && item.ConfirmCreated.ConfirmAt) {
        this.readonlyPopup = true
      }
      this.$refs.Form.getDetail(id)
    },
    handleInsert () {
      this.readonlyPopup = false
      this.$nextTick(() => {
        this.$refs.Form.openPopup()
      })
    },
    isChangeStarting () {
      this.isChangeStartingAssessment = true
    },
    isChangeFinishing () {
      this.isChangeFinishingAssessment = true
    },
    success () {
      this.getData()
    },
    readonly2 (item) {
      let check = false
      if (this.viewOnly || item.Is24hLocked || (item.ConfirmCreated && item.ConfirmCreated.ConfirmAt)) {
        check = true
      }
      return check
    },
    checkShowDetail (item) {
      let check = false
      if (!this.viewOnly && this.$store.state.account.Username === item.CreatedBy && !item.Is24hLocked && (!item.ConfirmCreated || (item.ConfirmCreated && !item.ConfirmCreated.ConfirmAt))) {
        check = true
      }
      return check
    }
  }
}
</script>

<style lang="stylus" scoped>
.flex-items {
  align-items: center;
}
</style>
