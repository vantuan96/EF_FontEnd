<template>
  <div v-if="loaded">
    <template v-if="ItemId">
      <div style="float: right;" class="italic mrb10 mrt10">{{__t('Tạo mới bởi')}} <ad-info v-if="DataSubmit" :ad="DataSubmit.CreatedBy"/> {{__t('lúc')}} {{getFTime(DataSubmit.CreatedAt)}}</div>
      <table style="margin-bottom: 0px;" class="mrt10 table table-striped table-bordered v-table v-table2 none-row-curso" id="customer-tbl">
        <thead class="bg-1375ba">
          <tr>
            <th colspan="2" width="1px" class="text-center">{{__label({ViName: 'Yếu tố nguy cơ', EnName: 'Risk factors'})}}</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(code, index) in ['PMVPCTTMV125', 'PMVPCTTMV128', 'PMVPCTTMV131']">
            <tr :key="index">
              <td v-if="MASTERDATA[code]">{{__label(MASTERDATA[code])}}</td>
              <td width="35%" v-if="MASTERDATA[code]">
                <MdRadiosInput4 :readonly="true" v-model="MASTERDATA[code]"/>
              </td>
            </tr>
          </template>
          <tr>
            <td colspan="2">
              <div class="flex align-center fw600 mrb10">
                <div class="mrr10">{{__label(MASTERDATA['PMVPCTTMV134'])}}:</div>
                <div class="text-center" style="background: #FFC107;width: 59px;height: 29px;border-radius: 4px;line-height: 29px;">{{getToTal()}}</div>
              </div>
              <div class="fw600 mrb10">{{__label(MASTERDATA['PMVPCTTMV136'])}}: <span class="fw200">{{__label(getText(getToTal()))}}</span></div>
            </td>
          </tr>
        </tbody>
        <thead class="bg-1375ba">
          <tr>
            <th colspan="2" width="1px" class="text-center">{{__label({ViName: 'Bảng kiểm thực hiện quy trình dự phòng cháy và bỏng TRONG QUÁ TRÌNH thực hiện PT/TT', EnName: 'Fire and burn Safety Checklist'})}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2">
              <div class="italic flex on-top">
                <div class="fw600 mrr10">{{__label(MASTERDATA['PMVPCTTMV138'])}}:</div>
                <div>
                  <div>- <span>{{__label({ViName: 'ĐD chạy ngoài', EnName: 'Circulating Nurse'})}}</span> <b>{{__label({ViName: 'giám sát', EnName: 'observes'})}}</b> {{__label({ViName: 'việc thực hiện các biện pháp phòng cháy của kíp PT/TT và', EnName: 'the compliance of the team and'})}} <b>{{__label({ViName: 'phụ trách hoàn thiện', EnName: 'complete'})}}</b> {{__label({ViName: 'bảng kiểm', EnName: 'the checklist'})}}</div>
                  <div>- {{__label(MASTERDATA['PMVPCTTMV140'])}}</div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th colspan="2" width="1px">{{__label(MASTERDATA['PMVPCTTMV141'])}}</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(code, index) in ['PMVPCTTMV142', 'PMVPCTTMV146', 'PMVPCTTMV150', 'PMVPCTTMV154']">
            <tr :key="index">
              <td v-if="MASTERDATA[code]"><span class="mrr10" v-if="code === 'PMVPCTTMV146'"></span>{{__label(MASTERDATA[code])}}</td>
              <td v-if="MASTERDATA[code]">
                <MdRadiosInput4 :readonly="true" v-model="MASTERDATA[code]"/>
              </td>
            </tr>
          </template>
        </tbody>
        <thead>
          <tr>
            <th colspan="2" width="1px">{{__label(MASTERDATA['PMVPCTTMV158'])}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div>
                <div>{{__label(MASTERDATA['PMVPCTTMV159'])}}:</div>
                <div class="mrl10">{{__label({ViName: 'a. Khuyến khích sử dụng lưu lượng thấp (≤ 2 lít/phút) qua mũi (gọng kính)', EnName: 'a. Low flow rate (≤ 2 l/min) is recommended through nasal cannular'})}}</div>
                <div class="mrl10">{{__label({ViName: 'b. Trường hợp sử dụng nhiều hơn 2 lít/phút', EnName: 'b. In case of using more than 2 l/min'})}}:</div>
                <div class="mrl20">{{__label({ViName: 'i. Cân nhắc chuyển sang đặt nội khí quản/mask thanh quản', EnName: 'i. Consider using an endotracheal tube/laryngeal mask'})}}:</div>
                <div class="mrl20">{{__label({ViName: 'ii. Nếu không thực hiện (i), thông báo nguy cơ cháy tới kíp PT/TT để lưu ý', EnName: 'ii. If (i) is not applied, notify the full team to be alerted'})}}:</div>
              </div>
            </td>
            <td><MdRadiosInput4 :readonly="true" v-model="MASTERDATA['PMVPCTTMV159']"/></td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th colspan="2" width="1px">{{__label(MASTERDATA['PMVPCTTMV165'])}}</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(code, index) in ['PMVPCTTMV166', 'PMVPCTTMV170', 'PMVPCTTMV174']">
            <tr :key="index">
              <td v-if="MASTERDATA[code]">{{__label(MASTERDATA[code])}}</td>
              <td v-if="MASTERDATA[code]">
                <MdRadiosInput4 :readonly="true" v-model="MASTERDATA[code]"/>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <TblWithMasterData
        :readonly="true"
        :FormCode="'PMVPCTTM185'"
        :colSpan="[2, '']"
        :headerStyle="[{}, {display: 'none'}]"
        :widthTD="['65%', '']"
        :VisitId="_VisitId"
        :VisitType="_VisitType"
        :FormID="DataSubmit.Id"
        class="table-bang-kiem"
        ref="TblWithMasterData"/>
      <div class="row">
        <div class="col-xs-6"></div>
        <div class="col-xs-2"></div>
        <div class="col-xs-4">
          <Confirm2 :viewOnly="true"
            ref="Confirm"
            :VisitType="_VisitType"
            :FormCode="'A02_053_OR_201022_V'"
            :VisitId="_VisitId"
            :readonly="true"
            :MasterDataCode="'PMVPCTTMCF08'"
            :FormId="DataSubmit.Id"
            :kind="'PMVPCTTMCF08'"
            :title="{ViName: 'NVYT thực hiện', EnName: 'Completed by'}"
            :popupTitle="'NVYT thực hiện'"
          />
        </div>
      </div>
      <p>A02_053_OR_201022_V</p>
      <LogForm :DataSubmit="DataSubmit" />
    </template>
    <div v-else>
      <div class="text-center mrt10">
        <p>{{__t(`Chưa có ${FormName}`)}}</p>
      </div>
    </div>
  </div>
  <div v-else class="text-center"><v-loading/></div>
</template>

<script>
import VText from '@/components/Form/Input/VText.vue'
import TblWithMasterData from '@/components/global/TblWithMasterData'
import Confirm2 from '@/components/Form/Confirm2.vue'
import MixinForm from './../Mixin.js'
import FormApi from '@/services/FormAPI.js'
import MixinMasterData from '@/mixins/masterdata.js'
export default {
  name: 'A02_053_OR_201022_VItem02View',
  props: ['readonly', 'VisitType', 'VisitId'],
  mixins: [MixinForm, MixinMasterData],
  components: {
    VText,
    TblWithMasterData,
    Confirm2
  },
  data () {
    return {
      DataSubmit: null,
      loaded: false,
      IsLock24h: false,
      ItemId: '',
      FormName: 'Đánh giá nguy cơ cháy và bỏng'
    }
  },
  mounted () {
    this.APIService = new FormApi({
      VisitType: this._VisitType,
      VisitId: this._VisitId,
      FormCode: 'A02_053_OR_201022_V_TAB2',
      hidemsg: true
    })
    this.getMasterDatas({Form: 'PMVPCTTMV'}, () => {
      this.getFirstData()
    })
  },
  methods: {
    getFirstData () {
      this.APIService.CheckGetDetail().then(res => {
        this.IsLock24h = res.IsLock24h
        this.ItemId = res.Id
        if (res.IsCheckGetForm) {
          this.loaded = true
        }
        this.getData()
      })
    },
    getData () {
      if (this.ItemId) {
        this.APIService.GetDetail(this.ItemId).then(res => {
          this.DataSubmit = res.data
          this.mapData()
          setTimeout(() => {
            this.$store.dispatch('setCurrentFormId', res.data.Id)
            this.loaded = true
          }, 500)
        }).catch((e) => {
          console.log(e)
          setTimeout(() => {
            this.$store.dispatch('setCurrentFormId', '')
            this.loaded = true
          }, 200)
        })
      }
    },
    getToTal () {
      let total = 0
      if (this.MASTERDATA['PMVPCTTMV125'] && this.MASTERDATA['PMVPCTTMV128'] && this.MASTERDATA['PMVPCTTMV131']) {
        if (!this.MASTERDATA['PMVPCTTMV125'].Items[0].Value && !this.MASTERDATA['PMVPCTTMV128'].Items[0].Value && !this.MASTERDATA['PMVPCTTMV131'].Items[0].Value) {
          total = 'N/A'
        }
        if (this.MASTERDATA['PMVPCTTMV125'].Items[1].Value || this.MASTERDATA['PMVPCTTMV128'].Items[1].Value || this.MASTERDATA['PMVPCTTMV131'].Items[1].Value) {
          total = 0
        }
        if (this.MASTERDATA['PMVPCTTMV125'].Items[0].Value) {
          total = total + 1
        }
        if (this.MASTERDATA['PMVPCTTMV128'].Items[0].Value) {
          total = total + 1
        }
        if (this.MASTERDATA['PMVPCTTMV131'].Items[0].Value) {
          total = total + 1
        }
      }
      return total
    },
    getText (number) {
      let str = {ViName: '', EnName: ''}
      if (number === 'N/A') {
        str = {
          ViName: '',
          EnName: 'N/A'
        }
      }
      if (number === 0) {
        str = {
          ViName: 'Không yêu cầu',
          EnName: 'No action required'
        }
      }
      if (number === 1 || number === 2) {
        str = {
          ViName: 'Quy trình thường quy (Các nội dung không có dấu sao)',
          EnName: 'Follow standard precautions'
        }
      }
      if (number === 3) {
        str = {
          ViName: 'Áp dụng thêm quy trình nguy cơ cao (Các nội dung có dấu *)',
          EnName: 'Apply high-risk precautions on top of standard precaution (those labelled with *)'
        }
      }
      return str
    }
  }
}
</script>
