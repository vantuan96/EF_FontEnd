<template>
  <div class="box box-table">
    <div class="flex-box flex-center padding-1z5 mt-10" style="flex-flow: row wrap;">
      <b class="mr-5 ml-5">{{__t('Chọn đối tượng người bệnh')}}:</b>
      <div class="group-tab">
        <template  v-for="(type, index) in Types">
          <router-link :key="index" :to="{name: type.RouteName, params: { Id: $route.params.Id }}">
            <label @click="Type = type.Value">{{__t(type.Label)}}</label>
          </router-link>
        </template>
      </div>
    </div>
    <div>
      <router-view/>
    </div>
    <!-- <ForFrailElderly v-if="Type === 1" />
    <ForChemotherapy v-if="Type === 2" /> -->
  </div>
</template>
<script>
// import ForFrailElderly from './ForFrailElderly.vue'
// import ForChemotherapy from './ForChemotherapy.vue'
export default {
  name: 'InitialAssessmentForPregnantWomen',
  components: {
    // ForFrailElderly,
    // ForChemotherapy
  },
  data () {
    return {
      Types: [
        {
          Label: 'NB cao tuổi/ cuối đời',
          Value: 1,
          RouteName: 'IPDInitialAssessmentForFrailElderly'
        },
        {
          Label: 'NB hóa trị',
          Value: 2,
          RouteName: 'IPDInitialAssessmentForChemotherapy'
        }
        // {
        //   Label: 'Sản phụ chuyển dạ',
        //   Value: 3,
        //   RouteName: 'IPDInitialAssessmentForChemotherS'
        // }
      ],
      Type: 0
    }
  }
}
</script>
