<template>
  <div v-if="loaded">
    <template v-if="ItemId">
      <div style="float: right;" class="italic mrb10 mrt10">{{__t('Tạo mới bởi')}} <ad-info v-if="DataSubmit" :ad="DataSubmit.CreatedBy"/> {{__t('lúc')}} {{getFTime(DataSubmit.CreatedAt)}}</div>
      <table class="mrt10 table table-striped table-bordered v-table v-table2 none-row-curso" id="customer-tbl">
        <thead class="bg-1375ba">
          <tr>
            <th colspan="4" width="1px" class="text-center">{{__t('SIGN-OUT')}}</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th colspan="4">{{__label(MASTERDATA['PMVPCTTMIV105'])}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="4">
              <div class="flex align-center">
                <MdRadiosInput4 class="inline-block mrr30" :vcheckbox="true" v-if="MASTERDATA['PMVPCTTMIV106']" :readonly="true" v-model="MASTERDATA['PMVPCTTMIV106']"/>
                <div class="inline-block mrr5">{{__label(MASTERDATA['PMVPCTTMIV108'])}}</div>
                <VText class="inline-block" v-if="MASTERDATA['PMVPCTTMIV108']" :readonly="true" :placeholder="__t('Nhập')" :rows="'1'" v-model="MASTERDATA['PMVPCTTMIV108'].Items[0].Value"/>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTMIV110'])}}</td>
            <td width="25%" align="center"><MdRadiosInput4 class="inline-block" v-if="MASTERDATA['PMVPCTTMIV110']" :readonly="true" v-model="MASTERDATA['PMVPCTTMIV110']"/></td>
            <td width="25%">{{__label({ViName: 'Dán nhãn bệnh phẩm', EnName: 'Specimen labeling completed'})}} <i>({{__label({ViName: 'đọc to nhãn bệnh phẩm, bao gồm cả tên người bệnh', EnName: 'read aloud label, including patient’s name'})}})</i></td>
            <td width="25%" align="center"><MdRadiosInput4 class="inline-block" v-if="MASTERDATA['PMVPCTTMIV113']" :readonly="true" v-model="MASTERDATA['PMVPCTTMIV113']"/></td>
          </tr>
          <tr>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTMIV116'])}}</td>
            <td width="25%" align="center"><MdRadiosInput4 class="inline-block" v-if="MASTERDATA['PMVPCTTMIV116']" :readonly="true" v-model="MASTERDATA['PMVPCTTMIV116']"/></td>
            <td colspan="2"></td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th colspan="4">{{__label(MASTERDATA['PMVPCTTMIV119'])}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="4">
              <div class="mrb10">
                <MdRadiosInput4 class="inline-block" :indexs="[0]" :vcheckbox="true" v-if="MASTERDATA['PMVPCTTMIV120']" :readonly="true" v-model="MASTERDATA['PMVPCTTMIV120']"/>
              </div>
              <div>
                <VText v-if="MASTERDATA['PMVPCTTMIV120']" :readonly="true" :placeholder="__t('Nhập')" v-model="MASTERDATA['PMVPCTTMIV120'].Items[1].Value"/>
              </div>
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
                    :MasterDataCode="'PMVPCTTMIVCF07'"
                    :FormId="DataSubmit.Id"
                    :kind="'PMVPCTTMIVCF07'"
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
import MDCheckboxGroup from '@/components/Form/Input/MDCheckboxGroup.vue'
import VText from '@/components/Form/Input/VText.vue'
import Confirm2 from '@/components/Form/Confirm2.vue'
import MixinForm from './../Mixin.js'
import MixinMasterData from '@/mixins/masterdata.js'
import FormApi from '@/services/FormAPI.js'
export default {
  name: 'ItemChild4',
  props: ['readonly', 'VisitId', 'VisitType'],
  mixins: [MixinForm, MixinMasterData],
  components: {
    MDCheckboxGroup,
    VText,
    Confirm2
  },
  data () {
    return {
      loaded: false,
      DataSubmit: null,
      ItemId: '',
      FormName: 'Bảng kiểm (Trước khi người bệnh rời phòng mổ)'
    }
  },
  mounted () {
    this.APIService = new FormApi({
      VisitType: this._VisitType,
      VisitId: this._VisitId,
      FormCode: 'A02_053_OR_201022_V_TAB14',
      hidemsg: true
    })
    this.getMasterDatas({Form: 'PMVPCTTMIV'}, () => {
      this.getFirstData()
    })
  },
  methods: {
    getFirstData () {
      this.APIService.CheckGetDetail().then(res => {
        this.ItemId = res.Id
        this.$store.dispatch('setCurrentFormId', res.Id)
        if (res.IsCheckGetForm) {
          this.loaded = true
          this.$store.dispatch('setCurrentFormId', '')
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
            this.loaded = true
          }, 500)
        }).catch((e) => {
          console.log(e)
          this.loaded = true
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
