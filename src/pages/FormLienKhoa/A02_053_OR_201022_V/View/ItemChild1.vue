<template>
  <div v-if="loaded">
    <template v-if="ItemId">
      <div style="float: right;" class="italic mrb10 mrt10">{{__t('Tạo mới bởi')}} <ad-info v-if="DataSubmit" :ad="DataSubmit.CreatedBy"/> {{__t('lúc')}} {{getFTime(DataSubmit.CreatedAt)}}</div>
      <table class="mrt10 table table-striped table-bordered v-table v-table2 none-row-curso" id="customer-tbl">
        <thead class="bg-1375ba">
          <tr>
            <th colspan="4" width="1px" class="text-center">{{__t('SIGN-IN')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="4">
              <MDCheckboxGroup :readonly="true" v-model="MASTERDATA['PMVPCTTM01']"/>
            </td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th colspan="4" width="1px">{{__label(MASTERDATA['PMVPCTTM03'])}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTM04'])}}</td>
            <td width="25%" align="center">
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTM04']" class="inline-block" :readonly="true" v-model="MASTERDATA['PMVPCTTM04']"/>
            </td>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTM13'])}}</td>
            <td width="25%" align="center">
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTM13']" class="inline-block" :hidelabel="true" :vcheckbox="true" :readonly="true" v-model="MASTERDATA['PMVPCTTM13']"/>
            </td>
          </tr>
          <tr>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTM07'])}}</td>
            <td width="25%" align="center">
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTM07']" class="inline-block" :readonly="true" v-model="MASTERDATA['PMVPCTTM07']"/>
            </td>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTM15'])}}</td>
            <td width="25%" align="center">
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTM15']" class="inline-block" :hidelabel="true" :vcheckbox="true" :readonly="true" v-model="MASTERDATA['PMVPCTTM15']"/>
            </td>
          </tr>
          <tr>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTM10'])}}</td>
            <td width="25%" align="center">
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTM10']" class="inline-block" :readonly="true" v-model="MASTERDATA['PMVPCTTM10']"/>
            </td>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTM17'])}}</td>
            <td width="25%" align="center">
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTM17']" class="inline-block" :readonly="true" v-model="MASTERDATA['PMVPCTTM17']"/>
            </td>
          </tr>
          <tr>
            <td colspan="2" align="center" style="border-top: 0px!important;border-right: 0px!important;">
              <Confirm2 :viewOnly="true"
                ref="Confirm1"
                :VisitType="_VisitType"
                :FormCode="'A02_053_OR_201022_V'"
                :VisitId="_VisitId"
                :readonly="true"
                :MasterDataCode="'PMVPCTTMCF01'"
                :FormId="DataSubmit.Id"
                :kind="'PMVPCTTMCF01'"
                :title="{ViName: 'BS Gây mê', EnName: 'Anesthesiologist'}"
                :popupTitle="'BS Gây mê'"
              />
            </td>
            <td colspan="2" align="center" style="border-top: 0px!important;border-left: 0px!important;">
              <Confirm2 :viewOnly="true"
                ref="Confirm2"
                :VisitType="_VisitType"
                :FormCode="'A02_053_OR_201022_V'"
                :VisitId="_VisitId"
                :readonly="true"
                :MasterDataCode="'PMVPCTTMCF02'"
                :FormId="DataSubmit.Id"
                :kind="'PMVPCTTMCF02'"
                :title="{ViName: 'ĐD Gây mê', EnName: 'Nurse anesthetist'}"
                :popupTitle="'ĐD Gây mê'"
              />
            </td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th colspan="4" width="1px">{{__label(MASTERDATA['PMVPCTTM20'])}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTM21'])}}</td>
            <td width="25%" align="center">
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTM21']" class="inline-block" :readonly="true" v-model="MASTERDATA['PMVPCTTM21']"/>
            </td>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTM27'])}}</td>
            <td width="25%" align="center">
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTM27']" class="inline-block" :readonly="true" v-model="MASTERDATA['PMVPCTTM27']"/>
            </td>
          </tr>
          <tr>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTM24'])}}</td>
            <td width="25%" align="center">
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTM24']" class="inline-block" :readonly="true" v-model="MASTERDATA['PMVPCTTM24']"/>
            </td>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTM30'])}}</td>
            <td width="25%" align="center">
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTM30']" class="inline-block" :readonly="true" v-model="MASTERDATA['PMVPCTTM30']"/>
            </td>
          </tr>
          <tr>
            <td colspan="2"></td>
            <td colspan="2" align="center" style="border-top: 0px!important;border-right: 0px!important;">
              <Confirm2 :viewOnly="true"
                ref="Confirm3"
                :VisitType="_VisitType"
                :FormCode="'A02_053_OR_201022_V'"
                :VisitId="_VisitId"
                :readonly="true"
                :MasterDataCode="'PMVPCTTMCF03'"
                :FormId="DataSubmit.Id"
                :kind="'PMVPCTTMCF03'"
                :title="{ViName: 'Điều dưỡng dụng cụ', EnName: 'Scrub nurse'}"
                :popupTitle="'Điều dưỡng dụng cụ'"
              />
            </td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th colspan="4" width="1px">{{__label(MASTERDATA['PMVPCTTM33'])}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="4">
              <div>
                <MdRadiosInput4 class="mrb10" :vcheckbox="true" v-if="MASTERDATA['PMVPCTTM34']" :readonly="true" v-model="MASTERDATA['PMVPCTTM34']"/>
                <MdRadiosInput4 class="mrb10" :vcheckbox="true" v-if="MASTERDATA['PMVPCTTM36']" :readonly="true" v-model="MASTERDATA['PMVPCTTM36']"/>
                <div class="flex align-center" v-if="MASTERDATA['PMVPCTTM38']">
                  <div class="no-wrap mrr5">{{__label(MASTERDATA['PMVPCTTM38'])}}:</div>
                  <VText :rows="'1'" class="full-width" :readonly="true" :placeholder="__t('Nhập')" v-model="MASTERDATA['PMVPCTTM38'].Items[0].Value"/>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="border-top: 0px!important;border-right: 0px!important;"></td>
            <td colspan="2" style="border-top: 0px!important;border-left: 0px!important;">
              <Confirm2 :viewOnly="true"
                ref="Confirm4"
                :VisitType="_VisitType"
                :FormCode="'A02_053_OR_201022_V'"
                :VisitId="_VisitId"
                :readonly="true"
                :MasterDataCode="'PMVPCTTMCF04'"
                :FormId="DataSubmit.Id"
                :kind="'PMVPCTTMCF04'"
                :title="{ViName: 'Điều dưỡng chạy ngoài', EnName: 'Circulating nurse'}"
                :popupTitle="'Điều dưỡng chạy ngoài'"
              />
            </td>
          </tr>
        </tbody>
      </table>
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
import MDCheckboxGroup from '@/components/Form/Input/MDCheckboxGroup.vue'
import VText from '@/components/Form/Input/VText.vue'
import Confirm2 from '@/components/Form/Confirm2.vue'
import FormApi from '@/services/FormAPI.js'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from './../Mixin.js'
export default {
  name: 'ItemChild1',
  props: ['readonly', 'VisitId', 'VisitType'],
  mixins: [MixinForm, MixinMasterData],
  components: {
    MDCheckboxGroup,
    VText,
    Confirm2
  },
  data () {
    return {
      ItemId: '',
      loaded: false,
      DataSubmit: null
    }
  },
  mounted () {
    this.APIService = new FormApi({
      VisitType: this._VisitType,
      VisitId: this._VisitId,
      FormCode: 'A02_053_OR_201022_V_TAB11',
      hidemsg: true
    })
    this.getMasterDatas({Form: 'PMVPCTTM'}, () => {
      this.getFirstData()
    })
  },
  methods: {
    getFirstData () {
      this.APIService.CheckGetDetail().then(res => {
        this.ItemId = res.Id
        this.$store.dispatch('setCurrentFormId', res.Id)
        if (res.IsCheckGetForm) {
          this.$store.dispatch('setCurrentFormId', '')
          this.loaded = true
        }
        this.getData()
      })
    },
    getData () {
      this.APIService.GetDetail(this.ItemId).then(res => {
        this.DataSubmit = res.data
        this.mapData()
        setTimeout(() => {
          if (res.data.IsNew) {
            this.checkDinhDanh()
          }
          this.loaded = true
        }, 500)
      }).catch((e) => {
        console.log(e)
        this.loaded = true
      })
    },
    checkDinhDanh () {
      if (this.CurrentPatientObj && this.MASTERDATA['PMVPCTTM01']) {
        if (this.CurrentPatientObj.Fullname ||
          this.CurrentPatientObj.DateOfBirth ||
          this.CurrentPatientObj.PID) {
          this.MASTERDATA['PMVPCTTM01'].Items[0].Value = true
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .right {
    float: right;
  }
  .inline-block {
    display: inline-block!important;
  }
</style>
