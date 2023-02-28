<template>
  <div v-if="PID" class="pull-right mr-20" :style="noneFloat ? 'float: none!important;' : ''">
    <button class="btn btn-info btn-sm pull-right" :style="noneFloat ? 'float: none!important;' : ''" @click="open()">{{__t('Xem')}} {{__t('LSKB')}}</button>
    <modal name="histoyr-modal" transition="pop-out" height="auto" :scrollable="false" :width="modalWidth">
      <div class="box v-model-content-popup">
        <div class="box-body padding-15">
          <table v-if="viewType === 'list'" class="table table-striped table-bordered v-table" id="customer-tbl">
            <tbody>
              <template v-if="Records && Records.length">
                <tr class="custom-table-head" style="background-color: #337AB7 !important;">
                  <td><b>{{__t('Stt')}}</b></td>
                  <td><b>{{__t('Thời gian thăm khám')}}</b></td>
                  <td><b>{{__t('Mã tiếp nhận')}}</b></td>
                  <td><b>{{__t('Trạng thái')}}</b></td>
                  <td align="center"><b>{{__t('Loại thăm khám')}}</b></td>
                  <td><b>{{__t('Chuyên khoa khám')}}</b></td>
                  <td><b>{{__t('BS Chính')}}</b></td>
                  <td><b>{{__t('Chi tiết')}}</b></td>
                </tr>
                <tr :data="item" :key="((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1)" v-for="(item ,index) in Records.filter(e => e.Assessment !== 'Điều trị nội trú')">
                  <td width="40" align="center">{{((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1)}}</td>
                  <td width="170">{{ item.ExaminationTime | formatDateTime}}</td>
                  <td width="150">{{ item.VisitCode }}</td>
                  <td width="150">{{__label(item.Status)}}</td>
                  <td width="130" align="center"><span :class="'visit-type-label label-' + item.Type">{{ item.Type }}</span></td>
                  <td width="150">
                    <span v-if="item.Type == 'EHOS'">{{__label(item)}}</span>
                    <span v-else>{{__label(item.Specialty)}}</span>
                  </td>
                  <td>
                    <ad-Info :ad="item.Type == 'EHOS' ? item.Username : item.Fullname" :extInfo="{Fullname: item.Fullname}" />
                  </td>
                  <td width="100" style="text-align: center;">
                    <button class="btn v-yellow-btn" v-if="item.Type == 'OPD'" @click="openEformView(item.Id, 'OPD', item.IsPreAnesthesia)" type="button">{{__t('Chi tiết')}}</button>
                    <button class="btn v-yellow-btn" v-if="item.Type == 'ED'" @click="openEformView(item.Id, 'ED')" type="button">{{__t('Chi tiết')}}</button>
                    <button class="btn v-yellow-btn" v-if="item.Type == 'IPD'" @click="openEformView(item.Id, 'IPD')" type="button">{{__t('Chi tiết')}}</button>
                    <button class="btn v-yellow-btn" v-if="item.Type == 'EOC'" @click="openEformView(item.Id, 'EOC')" type="button">{{__t('Chi tiết')}}</button>
                    <button v-if="item.Type == 'EHOS'" @click="openEhosView(item)" class="btn v-yellow-btn" type="button">{{__t('Chi tiết')}}</button>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="9" class="text-center">{{__t('Không có dữ liệu')}}</td>
                </tr>
              </template>
            </tbody>
          </table>
          <div v-else-if="viewType === 'ehos'">
            <EhosView :Data="ehosItem" />
          </div>
          <div v-else-if="viewType === 'ED'">
            <EdView :VisitId="VisitIdForView" />
          </div>
          <div v-else-if="viewType === 'OPD'">
            <OPDView :VisitId="VisitIdForView" :checkAnesthesia="checkAnesthesia"/>
          </div>
          <div v-else-if="viewType === 'IPD'">
            <IPDView :VisitId="VisitIdForView" />
          </div>
          <div v-else-if="viewType === 'EOC'">
            <EOCView :VisitId="VisitIdForView" />
          </div>
        </div>
        <div class="box-footer padding-15"  v-if="viewType !== 'list'">
          <div class="row">
            <div class="col-md-12"><button type="button" class="btn btn-block" @click="viewType = 'list'">{{__t('Quay lại')}}</button></div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import MedicalRecords from '@/services/MedicalRecords'
import EhosView from '@/pages/MedicalRecords/EhosView'
import EdView from '@/pages/ED/View'
import OPDView from '@/pages/OPD/View'
import EOCView from '@/pages/EOC/View'
import IPDView from '@/pages/IPD/Detail/Index'
import Logs from '@/services/Logs'

const MODAL_WIDTH = 1280
export default {
  name: 'GoToStore',
  props: ['PID', 'VisitId', 'noneFloat'],
  components: {
    EhosView,
    EdView,
    OPDView,
    IPDView,
    EOCView
  },
  data () {
    return {
      Records: null,
      viewType: 'list',
      parameters: {
        pageNumber: 1,
        pages: 1,
        PageSize: 99999
      },
      checkAnesthesia: false,
      ehosItem: {},
      modalWidth: MODAL_WIDTH,
      VisitIdForView: null
    }
  },
  computed: {
  },
  mounted () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    // this.getData()
  },
  created () {
  },
  methods: {
    logiing () {
      new Logs({})
        .update('', {
          url: window.location.href,
          name: 'Kho HSBA - BN PID ' + this.PID,
          reason: 'Khám bệnh/ Thực hiện phẫu thuật/thủ thuật tại bệnh viện'
        })
        .then(response => {
        })
    },
    openEformView (id, type, check) {
      this.checkAnesthesia = check
      this.logiing()
      this.viewType = type
      this.VisitIdForView = id
      this.$modal.show('histoyr-modal')
    },
    open () {
      this.getData()
      this.logiing()
      this.viewType = 'list'
    },
    openEhosView (item) {
      this.logiing()
      this.viewType = 'ehos'
      this.ehosItem = item
    },
    getData () {
      if (!this.PID) return
      new MedicalRecords(this.parameters)
        .find(this.PID)
        .then(response => {
          this.Records = response.Visit.filter(e => e.Id !== this.VisitId) || []
          this.$modal.show('histoyr-modal')
        })
    }
  }
}
</script>
<style scoped>
@media (max-width: 1146px) {
  .pull-right {
    margin-left: 0px!important;
  }
}
</style>
