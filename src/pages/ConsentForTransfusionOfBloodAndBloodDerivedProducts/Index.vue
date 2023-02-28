<template>
  <div class="main-content disable_ccp">
    <div class="header" style="margin-bottom: 30px;">
      <div class="text-center uppercase cap fw600" style="font-size: 30px;">{{__t('Phiếu cam kết truyền máu và các chế phẩm máu')}}</div>
    </div>
    <div class="content-body">
      <div>
        <Item @hiddenLog="setHiddenLog" @TimeLog="getTimeLog" :viewOnly="viewOnly" :VisitId="VisitId" :VisitType="VisitType"/>
      </div>
    </div>
  </div>
</template>

<script>
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import Item from './Item.vue'
export default {
  name: 'ConsentForTransfusionOfBloodAndBloodDerivedProductsIndex',
  props: ['viewOnly', 'VisitId', 'VisitType'],
  mixins: [],
  components: {
    VDateTimePicker,
    Item
  },
  data () {
    return {
      nullContent: false,
      formId: '',
      IsLocked: false,
      timeLog: [],
      hiddenLog: false
    }
  },
  mounted () {
  },
  methods: {
    getTimeLog (val1, val2) {
      this.timeLog = [val1, val2]
    },
    setHiddenLog () {
      this.hiddenLog = true
    }
  }
}
</script>

<style>

</style>
