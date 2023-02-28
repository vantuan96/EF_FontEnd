<template>
  <div v-if="data">
    <div class="mb-10">
      <div class="box-collapse-2" :class="{'open': isOpen}">
        <div class="v-collapse-title" @click="open()">
          <div class="d-flex p-10">
            <div class="flex-grow-1">
            <b>({{data.ActualVisitDate | formatDate}} - Visit {{data.VisitCode}})</b> {{data.AreaName}} - <ad-Info :ad="data.DoctorAD" />
            </div>
            <span>
              <i class="fa fa-angle-double-up" aria-hidden="true"></i>
              <i class="fa fa-angle-double-down" aria-hidden="true"></i>
            </span>
          </div>
        </div>
        <div class="box-collapse-content">
          <div class="panel-group PlaceDiagnostics" role="tablist" aria-multiselectable="true" v-if="chargesData && chargesData.length">
            <template v-for="(charge, index) in chargesData">
              <div :key="index" :data="charge" class="panel panel-default">
                <div class="panel-heading" role="tab" :id="'headingOne-' + index">
                  <h4 class="panel-title">
                    <a style="width: 100%" @click="GetUpdate(charge.Id, index)" role="button" data-toggle="collapse" :class="{'collapsed': index >= 1}"  :href="'#collapseboxxn-' + charge.Id" aria-expanded="true" :aria-controls="'collapseboxxn-' + index">
                      {{charge.CreatedAt | formatDate}} - <ad-Info :ad="charge.CreatedBy" /> <i class="fa fa-angle-double-down" aria-hidden="true"></i> <i class="fa fa-angle-double-up" aria-hidden="true"></i>
                    </a>
                  </h4>
                </div>
                <div :id="'collapseboxxn-' + charge.Id" class="panel-collapse collapse" :class="{'in': index < 1}" role="tabpanel" aria-labelledby="headingOne">
                  <ChargeDetail v-if="!charge.needGetUpdate" :Customer="fulldata.Customer" :User="charge.User" :Site="Site" :viewDetailItem="charge" :chargeData="data"/>
                  <NeedGetUpdate v-if="!charge.needGetUpdate" v-model="chargesData[index]" />
                </div>
              </div>
            </template>
            <!-- <div class="text-right m5" style="margin: 10px 0px"><button v-if="chargesData.find(e => e.Items.find(f => f.Status === 'Placed'))" class="btn btn-sm btn-warning" @click="printAction(data.VisitCode)"><i class="fa fa-print" aria-hidden="true"></i> In</button></div>
            <Print :data="chargesData" :Site="Site" :User="User" :Customer="fulldata.Customer" :ref="'PrintPopup' + data.VisitCode" /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DoctorPlaceDiagnosticsOrder from '@/services/DoctorPlaceDiagnosticsOrder'
import ChargeDetail from './ChargeDetail.vue'
import NeedGetUpdate from './NeedGetUpdate.vue'

export default {
  props: ['data', 'index', 'fulldata'],
  name: 'VisitItem',
  components: {
    ChargeDetail,
    NeedGetUpdate
  },
  data () {
    return {
      isOpen: false,
      chargesData: null,
      Site: {},
      User: {}
    }
  },
  watch: {
    // value: {
    //   handler (a, b) {
    //     this.data = this.value
    //     console.log('here')
    //   },
    //   deep: true
    // },
    chargesData (val, oldVal) {
      console.log('here2')
    }
  },
  created () {
    if (this.index === 0) {
      this.open()
    }
  },
  beforeDestroy () {
  },
  computed: {
  },
  methods: {
    printAction (id) {
      var idPopup = 'PrintPopup' + id
      if (this.$refs[idPopup]) this.$refs[idPopup].open(this.viewDetailItem)
    },
    GetUpdate (ChargeId, index) {
      if (this.chargesData[index || 0].needGetUpdate) {
        new DoctorPlaceDiagnosticsOrder()
          .update('/GetUpdate', {
            ChargeId: ChargeId || this.chargesData[index || 0].Id
          })
          .then(response => {
            this.chargesData[index || 0].User = response.User
            this.chargesData[index || 0].needGetUpdate = false
            this.chargesData[index || 0].Items = response.ChargeItem
          }).catch(e => {
            this.chargesData[index || 0].needGetUpdate = false
          })
      } else {
        this.chargesData[index || 0].needGetUpdate = true
      }
    },
    open () {
      if (this.isOpen) {
        this.collapse()
      } else {
        this.getData()
      }
    },
    getData () {
      new DoctorPlaceDiagnosticsOrder()
        .find('Charge/History/' + this.data.Id)
        .then(response => {
          this.collapse()
          this.Site = response.Site
          this.chargesData = response.Items.map(e => {
            e.needGetUpdate = true
            return e
          })
          this.GetUpdate()
        })
    },
    collapse () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>
