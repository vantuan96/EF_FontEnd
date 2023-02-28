<template>
  <div v-if="loaded">
    <template v-if="ItemId">
      <div style="float: right;" class="italic mrb10 mrt10">{{__t('Tạo mới bởi')}} <ad-info v-if="DataSubmit" :ad="DataSubmit.CreatedBy"/> {{__t('lúc')}} {{getFTime(DataSubmit.CreatedAt)}}</div>
      <table class="mrt10 table table-striped table-bordered v-table v-table2 none-row-curso" id="customer-tbl">
        <thead class="bg-1375ba">
          <tr>
            <th colspan="4" width="1px" class="text-center">{{__t('TIME-OUT')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="4">
              <MdRadiosInput4 class="mrb10" :vcheckbox="true" v-if="MASTERDATA['PMVPCTTMII41']" :readonly="true" v-model="MASTERDATA['PMVPCTTMII41']"/>
              <MdRadiosInput4 class="mrb10" :vcheckbox="true" v-if="MASTERDATA['PMVPCTTMII43']" :readonly="true" v-model="MASTERDATA['PMVPCTTMII43']"/>
              <MdRadiosInput4 class="mrb10" :vcheckbox="true" v-if="MASTERDATA['PMVPCTTMII45']" :readonly="true" v-model="MASTERDATA['PMVPCTTMII45']"/>
            </td>
          </tr>
          <tr>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTMII47'])}}</td>
            <td width="25%" align="center">
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMII47']" :readonly="true" v-model="MASTERDATA['PMVPCTTMII47']"/>
            </td>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTMII53'])}}</td>
            <td width="25%" align="center">
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMII53']" :readonly="true" v-model="MASTERDATA['PMVPCTTMII53']"/>
            </td>
          </tr>
          <tr>
            <td>{{__label(MASTERDATA['PMVPCTTMII50'])}}</td>
            <td>
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMII50']" :readonly="true" v-model="MASTERDATA['PMVPCTTMII50']"/>
            </td>
            <td>{{__label(MASTERDATA['PMVPCTTMII55'])}}</td>
            <td>
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMII55']" :readonly="true" v-model="MASTERDATA['PMVPCTTMII55']"/>
            </td>
          </tr>
          <tr>
            <td colspan="4">
              <div style="margin-bottom: 10px;"></div>
            </td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th colspan="4" width="1px">{{__label({ViName: 'Phẫu thuật viên kiểm tra', EnName: 'Surgeons review'})}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="4">
              <MdRadiosInput4 class="mrb10" :vcheckbox="true" v-if="MASTERDATA['PMVPCTTMII58']" :readonly="true" v-model="MASTERDATA['PMVPCTTMII58']"/>
              <MdRadiosInput4 class="mrb10" :vcheckbox="true" v-if="MASTERDATA['PMVPCTTMII60']" :readonly="true" v-model="MASTERDATA['PMVPCTTMII60']"/>
              <template v-for="(code, index) in ['PMVPCTTMII62', 'PMVPCTTMII65', 'PMVPCTTMII68']">
                <div class="flex align-center mrb10" :key="index" v-if="MASTERDATA[code]">
                  <MdRadiosInput4 style="min-width: 360px;" class="mrr10" :indexs="[0]" :vcheckbox="true" :readonly="true" v-model="MASTERDATA[code]"/>
                  <VText :placeholder="__t('Nhập')" :rows="'1'" v-if="MASTERDATA[code].Items[0].Value" :readonly="true" v-model="MASTERDATA[code].Items[1].Value"/>
                </div>
              </template>
            </td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th colspan="4" width="1px">{{__label(MASTERDATA['PMVPCTTMII71'])}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{__label(MASTERDATA['PMVPCTTMII72'])}}</td>
            <td>
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMII72']" :readonly="true" v-model="MASTERDATA['PMVPCTTMII72']"/>
            </td>
            <td>{{__label(MASTERDATA['PMVPCTTMII75'])}}</td>
            <td>
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMII75']" :readonly="true" v-model="MASTERDATA['PMVPCTTMII75']"/>
            </td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th colspan="4" width="1px">{{__label(MASTERDATA['PMVPCTTMII78'])}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{__label(MASTERDATA['PMVPCTTMII79'])}}</td>
            <td>
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMII79']" :readonly="true" v-model="MASTERDATA['PMVPCTTMII79']"/>
            </td>
            <td>{{__label(MASTERDATA['PMVPCTTMII87'])}}</td>
            <td>
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMII87']" :readonly="true" v-model="MASTERDATA['PMVPCTTMII87']"/>
            </td>
          </tr>
          <tr>
            <td>{{__label(MASTERDATA['PMVPCTTMII81'])}}</td>
            <td>
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMII81']" :readonly="true" v-model="MASTERDATA['PMVPCTTMII81']"/>
            </td>
            <td>{{__label(MASTERDATA['PMVPCTTMII90'])}}</td>
            <td>
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMII90']" :readonly="true" v-model="MASTERDATA['PMVPCTTMII90']"/>
            </td>
          </tr>
          <tr>
            <td>{{__label(MASTERDATA['PMVPCTTMII84'])}}</td>
            <td>
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMII84']" :readonly="true" v-model="MASTERDATA['PMVPCTTMII84']"/>
            </td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td colspan="4">
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
                    :MasterDataCode="'PMVPCTTMIIIICF05'"
                    :FormId="DataSubmit.Id"
                    :kind="'PMVPCTTMIIIICF05'"
                    :title="{ViName: 'Điều dưỡng đọc', EnName: 'Nurse'}"
                    :popupTitle="'Điều dưỡng đọc'"
                  />
                </div>
              </div>
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
import VText from '@/components/Form/Input/VText.vue'
import FormApi from '@/services/FormAPI.js'
import Confirm2 from '@/components/Form/Confirm2.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from './../Mixin.js'
export default {
  name: 'ItemChild2',
  props: ['readonly', 'VisitId', 'VisitType'],
  mixins: [MixinForm, MixinMasterData],
  components: {
    VText, Confirm2
  },
  data () {
    return {
      ItemId: '',
      loaded: false,
      DataSubmit: null,
      FormName: 'Trước khi rạch da/ thực hiện PT/TT'
    }
  },
  mounted () {
    this.APIService = new FormApi({
      VisitType: this._VisitType,
      VisitId: this._VisitId,
      FormCode: 'A02_053_OR_201022_V_TAB12',
      hidemsg: true
    })
    this.getMasterDatas({Form: 'PMVPCTTMII'}, () => {
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
      if (this.ItemId) {
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
      }
    },
    checkDinhDanh () {
      if (this.CurrentPatientObj && this.MASTERDATA['PMVPCTTMII43']) {
        if (this.CurrentPatientObj.Fullname ||
          this.CurrentPatientObj.DateOfBirth ||
          this.CurrentPatientObj.PID) {
          this.MASTERDATA['PMVPCTTMII43'].Items[0].Value = true
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
