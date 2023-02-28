<template>
  <Vcollapse @getData="getData" ref="Vcollapse">
    <template slot="title">
      {{__labelViEN(Form.Datas[0])}}
    </template>
    <!-- <template slot="info" v-if="Form.UpdatedAt">
      <span class="pull-right" style="padding: 8px;font-size: 14px;"
        >{{ __t("Chỉnh sửa lần cuối bởi") }} <AdInfo :ad="Form.UpdatedBy" />
        {{ __t("lúc") }}:
        {{Form.UpdatedAt | formatDateWithoutSecon}}</span
      >
    </template> -->
    <template slot="content" v-if="hasData">
      <div class="main-content"><slot name="content"></slot></div>
    </template>
  </Vcollapse>
</template>
<script>
export default {
  name: 'MedicalRecordWrap',
  props: ['Form'],
  data () {
    return {
      hasData: false
    }
  },
  mounted () {
    // console.log('Label', this.Form, this.Label)
  },
  methods: {
    getData () {
      this.hasData = true
      if (this.$refs.Vcollapse) {
        this.$refs.Vcollapse.setHasData()
      }
    }
  }
}
</script>
