<template>
  <div class="box form-content mb-5">
    <!-- <thisisipd v-if="VisitType === 'IPD'" :Form="Form" :VisitType="VisitType" :VisitId="VisitId" :Type="Type" /> -->
    <!-- <thisised v-if="VisitType === 'ED'" :Form="Form" :VisitType="VisitType" :VisitId="VisitId" :Type="Type" /> -->
    <!-- <thisiseoc v-if="VisitType === 'EOC'" :Form="Form" :VisitType="VisitType" :VisitId="VisitId" :Type="Type" /> -->
    <!-- <thisisopd v-if="VisitType === 'OPD'" :Form="Form" :VisitType="VisitType" :VisitId="VisitId" :Type="Type" /> -->
  </div>
</template>
<script>
// import thisisipd from '@/pages/IPD/Detail/IndexV2.vue'
// import thisised from '@/pages/IPD/Detail/IndexV2.vue'
// import thisiseoc from '@/pages/IPD/Detail/IndexV2.vue'
// import thisisopd from '@/pages/OPD/ViewV2.vue'
export default {
  name: 'FormDetailComponents',
  props: ['Type', 'VisitType', 'VisitId', 'Form'],
  components: {
    // thisisipd, thisisopd
  }
}
</script>
