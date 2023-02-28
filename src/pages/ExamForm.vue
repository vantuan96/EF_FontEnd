<template>
  <v-layout>
    <div class="container">
      <section class="content" v-if="loaded">
        <h2 class="text-center">ExamForm ({{isReadOnly}})</h2>
        <div>
          <div class="tbl-title">
          1. {{ __t("Title") }}
          </div>
          <table class="table v-table-1 no-margin col-1-1">
            <tr v-if="MASTERDATA['EFORMDEMO_RADIO']">
              <th width="1">
                <div class="w160">{{ __label(MASTERDATA['EFORMDEMO_RADIO']) }}</div>
              </th>
              <td>
                <pre v-if="rawData">{{MASTERDATA['EFORMDEMO_RADIO'].Items[0]}}</pre>
                <MDRadioGroup :readonly="isReadOnly" v-model="MASTERDATA['EFORMDEMO_RADIO'].Items[0]" />
              </td>
            </tr>
            <tr v-if="MASTERDATA['EFORMDEMO_GROUP_CHECKBOX']">
              <th width="1">
                <div class="w160">{{ __label(MASTERDATA['EFORMDEMO_GROUP_CHECKBOX']) }}</div>
              </th>
              <td>
                <MDCheckboxGroup :readonly="isReadOnly" :mrb10="true" v-model="MASTERDATA['EFORMDEMO_GROUP_CHECKBOX']"/>
              </td>
            </tr>
            <tr v-if="MASTERDATA['EFORMDEMO_SELECT']">
              <th width="1">
                <div class="w160">{{ __label(MASTERDATA['EFORMDEMO_SELECT']) }}</div>
              </th>
              <td>
                <MDSelectBox :readonly="isReadOnly" :multi="false" v-model="MASTERDATA['EFORMDEMO_SELECT'].Items[0]"/>
              </td>
            </tr>
            <tr>
              <th width="1">
                <div class="w160">Multi SelectBox</div>
              </th>
              <td>
              </td>
            </tr>
            <tr>
              <th width="1">
                <div class="w160">User select</div>
              </th>
              <td>
              </td>
            </tr>
            <tr>
              <th width="1">
                <div class="w160">Multi Users select</div>
              </th>
              <td>
              </td>
            </tr>
            <tr>
              <th width="1">
                <div class="w160">ICD10 select</div>
              </th>
              <td>
              </td>
            </tr>
            <tr>
              <th width="1">
                <div class="w160">Allergies Select</div>
              </th>
              <td>
              </td>
            </tr>
            <tr>
              <th width="1">
                <div class="w160">Date picker</div>
              </th>
              <td>
              </td>
            </tr>
            <tr>
              <th width="1">
                <div class="w160">Datetime picker</div>
              </th>
              <td>
              </td>
            </tr>
            <tr>
              <th width="1">
                <div class="w160">Date ranger picker</div>
              </th>
              <td>
              </td>
            </tr>
            <tr>
              <th width="1">
                <div class="w160">Text</div>
              </th>
              <td>
                <VText type="text" v-model="text" :readonly="isReadOnly" :placeholder="__t('Nhập')"/>
              </td>
            </tr>
            <tr>
              <th width="1">
                <div class="w160">Text Area</div>
              </th>
              <td>
                <VText v-model="textArea" :readonly="isReadOnly" :placeholder="__t('Nhập')"/>
              </td>
            </tr>
            <tr>
              <th width="1">
                <div class="w160">Text Number</div>
              </th>
              <td>
                <VText type="number" v-model="textNumber" :readonly="isReadOnly" :placeholder="__t('Nhập')"/>
              </td>
            </tr>
            <tr>
              <th width="1">
                <div class="w160">Upload file</div>
              </th>
              <td>
              </td>
            </tr>
            <tr v-if="MASTERDATA['EFORMDEMO_CHECKBOX']">
              <th width="1">
                <div class="w160">{{ __label(MASTERDATA['EFORMDEMO_CHECKBOX']) }}</div>
              </th>
              <td>
                <VCheckbox v-model="MASTERDATA['EFORMDEMO_CHECKBOX'].Items[0].Value" :label="'readonly'" :id="MASTERDATA['EFORMDEMO_CHECKBOX'].Items[0].Code"/>
              </td>
            </tr>
          </table>
        </div>
      </section>
      <div v-else class="text-center"><v-loading/></div>
    </div>
  </v-layout>
</template>

<script>
import MixinMasterData from '@/mixins/masterdata.js'
import VLayout from '@/layouts/Default.vue'
import {
  MDRadioGroup,
  MDCheckboxGroup,
  VCheckbox,
  MDSelectBox,
  VSelectBox,
  VText
} from '@/components/Form/Input/index.js'

export default {
  name: 'ExamForm',
  mixins: [MixinMasterData],
  components: {
    VLayout,
    MDRadioGroup,
    VCheckbox,
    MDCheckboxGroup,
    MDSelectBox,
    VSelectBox,
    VText
  },
  data () {
    return {
      loaded: false,
      readonly: false,
      rawData: false,
      selectvalue: '1',
      text: '',
      textArea: '',
      textNumber: ''
    }
  },
  computed: {
    isReadOnly () {
      return this.MASTERDATA['EFORMDEMO_CHECKBOX'] && ([true, 'true', 'True', 'TRUE'].includes(this.MASTERDATA['EFORMDEMO_CHECKBOX'].Items[0].Value))
    }
  },
  mounted () {
    this.getMasterDatas({Form: 'EFORMDEMO'}, () => {
      setTimeout(() => {
        this.loaded = true
      }, 1000)
    })
  },
  methods: {
  }
}
</script>
<style scoped>
.box-label {
  min-width: 400px;
}
</style>
