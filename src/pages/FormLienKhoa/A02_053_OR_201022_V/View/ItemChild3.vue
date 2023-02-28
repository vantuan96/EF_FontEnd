<template>
  <div v-if="loaded">
    <template v-if="ItemId">
      <div style="float: right;" class="italic mrb10 mrt10">{{__t('Tạo mới bởi')}} <ad-info v-if="DataSubmit" :ad="DataSubmit.CreatedBy"/> {{__t('lúc')}} {{getFTime(DataSubmit.CreatedAt)}}</div>
      <table class="mrt10 table table-striped table-bordered v-table v-table2 none-row-curso" id="customer-tbl">
        <thead class="bg-1375ba">
          <tr>
            <th colspan="4" width="1px" class="text-center">{{__label({ViName: 'TIME-OUT bổ sung (nếu áp dụng)', EnName: 'ADDITIONAL TIME-OUT (if applicable)'})}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="4">
              <MdRadiosInput4 class="inline-block mrb10" :vcheckbox="true" v-if="MASTERDATA['PMVPCTTMIII94']" :readonly="true" v-model="MASTERDATA['PMVPCTTMIII94']"/>
              <MdRadiosInput4 class="inline-block mrb10" :vcheckbox="true" v-if="MASTERDATA['PMVPCTTMIII96']" :readonly="true" v-model="MASTERDATA['PMVPCTTMIII96']"/>
            </td>
          </tr>
          <tr>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTMIII98'])}}</td>
            <td width="25%" align="center"><MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMIII98']" :readonly="true" v-model="MASTERDATA['PMVPCTTMIII98']"/></td>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTMIII101'])}}</td>
            <td width="25%" align="center"><MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMIII101']" :readonly="true" v-model="MASTERDATA['PMVPCTTMIII101']"/></td>
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
                      :MasterDataCode="'PMVPCTTMIIICF06'"
                      :FormId="DataSubmit.Id"
                      :kind="'PMVPCTTMIIICF06'"
                      :title="{ViName: 'Điều dưỡng', EnName: 'Nurse'}"
                      :popupTitle="'Điều dưỡng'"
                      @saveConfirm="handleSave"
                      @confirmSuccess="confirmSuccess"
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
import Confirm2 from '@/components/Form/Confirm2.vue'
import MixinForm from './../Mixin.js'
import MixinMasterData from '@/mixins/masterdata.js'
import FormApi from '@/services/FormAPI.js'
export default {
  name: 'ItemChild3',
  props: ['readonly', 'VisitId', 'VisitType'],
  mixins: [MixinForm, MixinMasterData],
  components: {
    Confirm2
  },
  data () {
    return {
      loaded: false,
      DataSubmit: null,
      ItemId: '',
      FormName: 'Trong quá trình thực hiện PT/TT'
    }
  },
  mounted () {
    this.APIService = new FormApi({
      VisitType: this._VisitType,
      VisitId: this._VisitId,
      FormCode: 'A02_053_OR_201022_V_TAB13',
      hidemsg: true
    })
    this.getMasterDatas({Form: 'PMVPCTTMIII'}, () => {
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
