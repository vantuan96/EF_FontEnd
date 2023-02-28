<template>
  <div>
    <modal name="RadiologyProcedurePlanRefPopup" transition="pop-out" id="RadiologyProcedurePlanRefPopup" height="auto" :clickToClose="false" :width="modalWidth" >
      <div class="box v-model-content-popup" v-if="form">
        <div class="box-header text-center">
          <h3 class="box-title">{{form.Code}} - {{__label(form)}}.</h3>
        </div>
        <div class="box-body padding-15 min-heigcht-500">
          <div class="row">
            <div class="form-group">
              <div class="group-radio" v-if="RadiologyProcedurePlanRefOptions">
                <template  v-for="(option, index) in RadiologyProcedurePlanRefOptions">
                  <input :data="option" :key="index" type="radio" :id="'a' + index" name="option" :value="option.Id" v-model="form.RadiologyProcedureId">
                  <label :class="'option-' + option.Code" :id="'option-' + option.Id" :key="'a' + index" :for="'a' + index">{{option.RadiologyProcedureNameE}}</label>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="box-footer padding-15">
          <div class="row">
            <div class="col-sm-6 col-md-6"><button type="button" class="btn btn-block" @click="close">{{__t('Hủy')}}</button></div>
            <div class="col-sm-6 col-md-6"><button type="button" :class="{'disabled': noValidate}" class="btn btn-block v-yellow-btn" @click="ok()">{{__t('Đồng ý')}}</button></div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import MixinPlaceDiagnostics from '@/mixins/DoctorPlaceDiagnosticsOrder.js'
import MixinMasterData from '@/mixins/masterdata.js'
const MODAL_WIDTH = 970
export default {
  name: 'RadiologyProcedurePlanRefPopup',
  mixins: [MixinPlaceDiagnostics, MixinMasterData],
  data () {
    return {
      RadiologyProcedurePlanRefOptions: [],
      form: {
      }
    }
  },
  components: {
  },
  computed: {
    noValidate: function () {
      return !this.form.RadiologyProcedureId
    },
    ...mapGetters({
      editItem: 'PlaceDiagnostics/getEditItem'
    })
  },
  watch: {
    editItem: {
      handler (a, b) {
        if (a) this.open(a)
      },
      deep: true
    }
  },
  created () {
    this.getTypeGroupList()
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
  },
  beforeDestroy () {
  },
  methods: {
    getTypeGroupList () {
      if (this.TYPEGROUPLIST) return
      this.getRawMasterDatas({Form: 'Microbiology'}, (data) => {
        this.TYPEGROUPLIST = data
      })
    },
    close () {
      this.remove({Id: this.form.Id, type: this.form.type})
      this.$modal.hide('RadiologyProcedurePlanRefPopup')
      this.showGuild = false
    },
    ok () {
      this.update({form: this.form, type: this.form.type})
      this.$modal.hide('RadiologyProcedurePlanRefPopup')
      this.showGuild = false
    },
    open (form) {
      var newItem = this.cloneObj(form)
      if (newItem.RadiologyProcedurePlanRef && newItem.RadiologyProcedurePlanRef.length > 1) {
        this.RadiologyProcedurePlanRefOptions = newItem.RadiologyProcedurePlanRef
        if (!newItem.RadiologyProcedureId) {
          this.$set(newItem, 'RadiologyProcedureId', null)
        }
        this.form = newItem
        this.$modal.show('RadiologyProcedurePlanRefPopup')
      } else if (newItem.RadiologyProcedurePlanRef && newItem.RadiologyProcedurePlanRef.length === 1) {
        newItem.RadiologyProcedureId = newItem.RadiologyProcedurePlanRef[0].Id
        this.update({form: newItem, type: newItem.type})
      }
    }
  }
}
</script>
