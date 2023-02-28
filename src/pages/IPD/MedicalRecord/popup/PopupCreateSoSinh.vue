<template>
  <div>
    <basepopup name="PopupCreateSoSinh" width="600px" :isShowFooter="false" :clickToClose="false">
      <div slot="title" class="text-center">
        <h3 class="box-title">{{__t('Thêm sơ sinh')}}</h3>
      </div>
      <div class="body-content mrb10" style="min-height: 200px;overflow: auto;">
        <div class="flex align-center mrb10">
          <div class="fw600 mrr10 no-wrap">{{__label({ViName: 'Trẻ', EnName: 'Child'})}}:<span class="required">*</span></div>
          <v-select class='select-full-w' id="Child" v-model="child" :placeholder="__t('Chọn')" :items="option"/>
        </div>
      </div>
      <div slot="footer">
          <div class="row">
            <div class="col-xs-6">
              <button type="button" class="btn btn-block v-white-btn" @click="handleClose()">{{__t('Thoát')}}</button>
            </div>
            <div class="col-xs-6">
              <button type="button" class="btn btn-block v-yellow-btn" @click="hamdleSubmit()">{{__t('Thêm mới')}}</button>
            </div>
          </div>
      </div>
    </basepopup>
  </div>
</template>

<script>
import VSelect from '@/components/VSelect.vue'
export default {
  name: 'PopupCreateSoSinh',
  props: ['optionChild', 'ListSoSinh'],
  components: {
    VSelect
  },
  watch: {
    optionChild (val) {
      this.getData()
    },
    ListSoSinh (val) {
      this.getData()
    }
  },
  data () {
    return {
      child: null,
      option: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      let arr = this.optionChild.map(e => {
        return e.Newborn
      })
      this.option = []
      this.option = arr.map(e => {
        return {
          value: e.Id,
          label: e.FullNameNewborn
        }
      })
      if (this.ListSoSinh && this.ListSoSinh.length) {
        let arr2 = this.ListSoSinh.map(e => {
          return e.Id
        })
        this.option = this.option.filter(e => {
          if (!arr2.includes(e.value)) {
            return {
              value: e.value,
              label: e.label
            }
          }
        })
      }
      console.log('option: ', this.option)
    },
    handleResetData () {
    },
    handleClose () {
      this.handleResetData()
      this.$modal.hide('PopupCreateSoSinh')
    },
    hamdleSubmit () {
      let errors = []
      if (!this.child) {
        const obj = {
          ViName: 'Trẻ',
          EnName: 'Child',
          Code: 'Child'
        }
        errors.push(obj)
      }
      if (errors.length) {
        this.handlerResponse({Error: errors})
      }
      this.$emit('handleCreate', this.child)
      this.handleClose()
    }
  }
}
</script>

<style scoped>

</style>
