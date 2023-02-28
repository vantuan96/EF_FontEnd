<template>
  <div v-if="VisitId && VisitType && title">
    <basepopup name="popDetailProm" width="1300px" :isShowFooter="false" :clickToClose="true">
      <div slot="title" class="text-center">
        <h3 class="box-title cap">{{__t(title)}}</h3>
      </div>
      <div class="body-content">
        <PromForCoronaryDisease v-if="title === 'PROM mạch vành'" :viewOnly="true" :VisitId="VisitId" :VisitType="VisitType"/>
        <PROMForHeartFailure v-else :viewOnly="true" :VisitId="VisitId" :VisitType="VisitType"/>
      </div>
      <div slot="footer" style="padding-bottom: 20px;">
        <div class="mrb10">
          <button type="button" class="btn btn-block v-white-btn" @click="handleClose()">{{__t('Đóng-popup')}}</button>
        </div>
      </div>
    </basepopup>
  </div>
</template>

<script>
import PromForCoronaryDisease from '@/pages/IPD/PromForCoronaryDisease/Index.vue'
import PROMForHeartFailure from '@/pages/IPD/PROMForHeartFailure/Index.vue'
export default {
  name: 'PopDetailProm',
  props: ['title', 'VisitId', 'VisitType'],
  data () {
    return {
    }
  },
  components: {
    PromForCoronaryDisease, PROMForHeartFailure
  },
  mounted () {
  },
  methods: {
    handleClose () {
      this.$modal.hide('popDetailProm')
    }
  }
}
</script>

<style scoped>
  .btn {
    width: 132px;
    height: 34px;
  }
</style>
