
<template>
<v-layout>
  <div class="main-content">
    <h2 class="text-center">{{__t('Masterdata')}}</h2>
    <div class="box form-content">
      <TblWithMasterData
        :FormCode="'IPDPHUTBL1'"
        :headerStyle="[{width: '100px'}, {minWidth: '100px'}, {}]"
        ref="TblWithMasterData"
      />
      <button class="btn btn-info" @click="submit">Lưu</button>
    </div>
  </div>
</v-layout>
</template>
<script>
import TblWithMasterData from '@/components/global/TblWithMasterData'
import VLayout from '@/layouts/Minimal.vue'
export default {
  name: 'Masterdata',
  mixins: [],
  data () {
    return {
      DataSubmit: {
      }
    }
  },
  components: {
    TblWithMasterData, VLayout
  },
  mounted () {
    this.getData()
  },
  computed: {
  },
  methods: {
    submit () {
      if (this.$refs.TblWithMasterData) {
        this.$refs.TblWithMasterData.submit()
      }
    },
    getData () {
    }
  }
}
</script>
