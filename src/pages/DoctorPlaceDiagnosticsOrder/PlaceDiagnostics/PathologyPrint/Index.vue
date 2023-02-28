<template>
  <div v-if="Items">
    <modal name="PathologyPrintPopup" transition="pop-out" id="PathologyPrintPopup" height="auto" :clickToClose="false" :width="modalWidth" >
      <div class="box v-model-content-popup">
        <div class="box-header text-center">
          <h3 class="box-title">{{__t('Phiếu khai Giải phẫu bệnh')}}.</h3>
        </div>
        <div class="box-body padding-15 box-modal-auto">
          <table class="table mb-0 tbl-5">
            <tbody>
              <template v-for="(chargeItem, indexxn) in Items">
                <tr :key="indexxn" :data="chargeItem" :class="'status-' + chargeItem.Status">
                  <td style="padding-left: 15px !important;">
                    <input class="mr-5"  type="checkbox" v-model="chargeItem.Selected"/> {{chargeItem.Service.Code}} - {{__label(chargeItem.Service)}} <i style="color: #f3b600">{{(PathologyTypes.find(e => e.Code === chargeItem.Pathology.PathologyType) || {}).ViName}}</i>
                  </td>
                  <td style="width: 1px">
                    <a @click="chargeItem.IsOpen = !chargeItem.IsOpen">
                      <i aria-hidden="true" class="fa fa-angle-double-down" v-if="chargeItem.IsOpen"></i>
                      <i aria-hidden="true" class="fa fa-angle-double-up" v-else></i>
                    </a>
                  </td>
                </tr>
                <tr :key="indexxn + 'ool'" :data="chargeItem" v-if="chargeItem.IsOpen">
                  <td colspan="2">
                    <PathologyPrint002 :data="chargeItem" :Customer="Customer" :User="User" :Charge="Charge" v-if="chargeItem.Pathology.PathologyType === '002'"/>
                    <PathologyPrint003 :data="chargeItem" :Customer="Customer" :User="User" :Charge="Charge" v-if="chargeItem.Pathology.PathologyType === '003'"/>
                    <PathologyPrint004 :data="chargeItem" :Customer="Customer" :User="User" :Charge="Charge" v-if="chargeItem.Pathology.PathologyType === '004'"/>
                    <PathologyPrint002 :title="'005'" :data="chargeItem" :Customer="Customer" :User="User" :Charge="Charge" v-if="chargeItem.Pathology.PathologyType === '005'"/>
                    <PathologyPrint006 :data="chargeItem" :Customer="Customer" :User="User" :Charge="Charge" v-if="chargeItem.Pathology.PathologyType === '006'"/>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div class="box-footer">
          <div class="row">
            <div hidden id="PathologyPrintEln">
              <div :key="indexxn + 'ooXl'" :data="chargeItem" v-if="chargeItem.Selected" v-for="(chargeItem, indexxn) in Items">
                <PathologyPrint002 :data="chargeItem" :Customer="Customer" :User="User" :Charge="Charge" v-if="chargeItem.Pathology.PathologyType === '002'"/>
                <PathologyPrint003 :data="chargeItem" :Customer="Customer" :User="User" :Charge="Charge" v-if="chargeItem.Pathology.PathologyType === '003'"/>
                <PathologyPrint004 :data="chargeItem" :Customer="Customer" :User="User" :Charge="Charge" v-if="chargeItem.Pathology.PathologyType === '004'"/>
                <PathologyPrint002 :title="'005'" :data="chargeItem" :Customer="Customer" :User="User" :Charge="Charge" v-if="chargeItem.Pathology.PathologyType === '005'"/>
                <PathologyPrint006 :data="chargeItem" :Customer="Customer" :User="User" :Charge="Charge" v-if="chargeItem.Pathology.PathologyType === '006'"/>
              </div>
            </div>
            <div class="col-sm-6 col-md-6"><button type="button" class="btn btn-block" @click="close">{{__t('Bỏ qua')}}</button></div>
            <div class="col-sm-6 col-md-6"><button type="button" :class="{'disabled': noValidate}" class="btn btn-block v-yellow-btn" @click="print()">{{__t('Đồng ý')}}</button></div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import EventBus from '@/lib/eventBus'
import PathologyPrint002 from './P002'
import PathologyPrint003 from './P003'
import PathologyPrint004 from './P004'
import PathologyPrint006 from './P006'
const MODAL_WIDTH = 970
export default {
  name: 'PathologyPrint',
  props: ['fulldata'],
  mixins: [],
  data () {
    return {
      modalWidth: MODAL_WIDTH,
      Items: null,
      Charge: {},
      Customer: {},
      User: {},
      PathologyTypes: [{
        ViName: 'Không dùng',
        EnName: 'Không dùng',
        Code: '001',
        Id: '001'
      }, {
        ViName: 'PXN Tế bào',
        EnName: 'PXN Tế bào',
        Code: '002',
        Id: '002'
      }, {
        ViName: 'XN tế bào học phụ khoa',
        EnName: 'XN tế bào học phụ khoa',
        Code: '003',
        Id: '003'
      }, {
        ViName: 'PXN mô bệnh học',
        EnName: 'PXN mô bệnh học',
        Code: '004',
        Id: '004'
      }, {
        ViName: 'PXN khối tế bào',
        EnName: 'PXN khối tế bào',
        Code: '005',
        Id: '005'
      }, {
        ViName: 'PXN sinh thiết lạnh',
        EnName: 'PXN sinh thiết lạnh',
        Code: '006',
        Id: '006'
      }]
    }
  },
  components: {
    PathologyPrint002,
    PathologyPrint003,
    PathologyPrint004,
    PathologyPrint006
  },
  computed: {
    noValidate: function () {
      return !this.Items.find(e => e.Selected)
    }
  },
  mounted () {
    EventBus.$on('openPathologyPrint', this.open)
    this.Customer = this.fulldata.Customer
  },
  beforeDestroy () {
    EventBus.$off('openPathologyPrint')
  },
  methods: {
    close () {
      this.$modal.hide('PathologyPrintPopup')
    },
    open (data, user, ChargeData) {
      this.User = user
      this.Charge = data
      this.Charge.AreaName = ChargeData.AreaName
      this.Items = (this.cloneObj(data.Items.filter(e => e.Pathology && e.Status === 'Placed' && e.Pathology.PathologyType !== '001')) || []).map(e => {
        e.IsOpen = false
        e.Selected = true
        return e
      })
      console.log(this.Items)
      setTimeout(() => {
        this.$modal.show('PathologyPrintPopup')
      }, 100)
    },
    print () {
      this.$htmlToPaperPrint2('PathologyPrintEln', false, '')
    }
  }
}
</script>
