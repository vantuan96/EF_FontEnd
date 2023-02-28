<template>
  <div class="box-body no-padding">
    <div class="tbl-title">I. {{___t('Đánh giá chung')}}</div>
    <table class="table v-table-1 no-margin">
      <tr v-if="MASTERDATA['IPDIAFETYOP']">
        <th width="1">{{__label(MASTERDATA['IPDIAFETYOP'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATA['IPDIAFETYOP'].Items" />
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIAFEFRAI']">
        <th width="1">{{__label(MASTERDATA['IPDIAFEFRAI'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATA['IPDIAFEFRAI'].Items" />
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIAFEITV1']">
        <th width="1"><span class="no-wrap">{{__label(MASTERDATA['IPDIAFEITV1'])}}</span></th>
        <td>
          <div class="flex-box">
            <MDRadioView :data="MASTERDATA['IPDIAFEITV1'].Items" :DataType="'Checkbox'" />
            <div style="flex-grow: 1;" class="ml-10" v-if="MASTERDATA['IPDIAFEITV1'].Items[1].Value">
              <FakeInput v-model="MASTERDATA['IPDIAFEITV1'].Items[2].Value" />
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="2" class="no-padding">
          <div class="tbl-title">II. {{___t('Đánh giá tâm thần')}}</div>
        </td>
      </tr>
      <tr>
        <th width="1">{{___t('Kiểm tra nhanh về tâm thần (AMT test4)')}}</th>
        <td>
          <div class="flex-box flex-center">
            <div class="br1">
              <table class="no-border">
                <tr>
                  <td><b>{{__label(MASTERDATA['IPDIAFEAGEE'])}}</b></td>
                  <td>
                    <MDRadioView :data="MASTERDATA['IPDIAFEAGEE'].Items" />
                  </td>
                </tr>
                <tr>
                  <td><b>{{__label(MASTERDATA['IPDIAFEDAOB'])}}</b></td>
                  <td>
                    <MDRadioView :data="MASTERDATA['IPDIAFEDAOB'].Items" />
                  </td>
                </tr>
                <tr>
                  <td><b>{{__label(MASTERDATA['IPDIAFEDYKW'])}}</b></td>
                  <td>
                    <MDRadioView :data="MASTERDATA['IPDIAFEDYKW'].Items" />
                  </td>
                </tr>
                <tr>
                  <td><b>{{__label(MASTERDATA['IPDIAFEWYII'])}}</b></td>
                  <td>
                    <MDRadioView :data="MASTERDATA['IPDIAFEWYII'].Items" />
                  </td>
                </tr>
              </table>
            </div>
            <div class="flex-box flex-center">
              <b class="no-wrap mr-5">{{__label(MASTERDATA['IPDIAFECOGN'])}}:</b>
              <MDRadioView :data="MASTERDATA['IPDIAFECOGN'].Items" />
            </div>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIAFESLEE']">
        <th width="1">{{__label(MASTERDATA['IPDIAFESLEE'])}}</th>
        <td>
          <CheckboxsValue :data="MASTERDATA['IPDIAFESLEE'].Items" />
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIAFEITV2']">
        <th width="1">{{__label(MASTERDATA['IPDIAFEITV2'])}}</th>
        <td>
          <div class="flex-box">
            <MDRadioView :data="MASTERDATA['IPDIAFEITV2'].Items" :DataType="'Checkbox'" />
            <div style="flex-grow: 1;" class="ml-10" v-if="MASTERDATA['IPDIAFEITV2'].Items[1].Value">
              <FakeInput v-model="MASTERDATA['IPDIAFEITV2'].Items[2].Value" />
            </div>
          </div>
        </td>
      </tr>
      <template v-if="MASTERDATA['IPDIAFETYOP'].Items[1].Value">
      <tr>
        <td colspan="2" class="no-padding">
          <div class="tbl-title">III. {{___t('Đánh giá tinh thần và xã hội')}}</div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIAFEHASN']">
        <th width="1">{{__label(MASTERDATA['IPDIAFEHASN'])}}</th>
        <td>
          <div class="flex-box">
            <div class="w200">
              <MDRadioView :data="MASTERDATA['IPDIAFEHASN'].Items"/>
            </div>
            <div class="w200 padding-left-15">
              <b class="mb-5">{{__label(MASTERDATA['IPDIAFEHASN'].Items[3])}}</b>
              <FakeInput v-model="MASTERDATA['IPDIAFEHASN'].Items[3].Value" />
            </div>
            <div class="padding-left-15">
              <b class="mb-5">{{__label(MASTERDATA['IPDIAFEITV3'])}}</b>
              <MDRadioView :data="MASTERDATA['IPDIAFEITV3'].Items"/>
            </div>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIAFEHAFC']">
        <th width="1">{{__label(MASTERDATA['IPDIAFEHAFC'])}}</th>
        <td>
          <div class="flex-box">
            <div class="w200">
              <MDRadioView :data="MASTERDATA['IPDIAFEHAFC'].Items"/>
            </div>
            <div class="w200 padding-left-15">
              <b class="mb-5">{{__label(MASTERDATA['IPDIAFEHAFC'].Items[3])}}</b>
              <FakeInput v-model="MASTERDATA['IPDIAFEHAFC'].Items[3].Value" />
            </div>
            <div class="padding-left-15">
              <b class="mb-5">{{__label(MASTERDATA['IPDIAFEITV4'])}}</b>
              <MDRadioView :data="MASTERDATA['IPDIAFEITV4'].Items"/>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="2" class="no-padding">
          <div class="tbl-title">IV. {{___t('Gia đình')}}</div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIAFEDICF']">
        <th width="1">{{__label(MASTERDATA['IPDIAFEDICF'])}}</th>
        <td>
          <div class="flex-box">
            <div class="w200">
              <MDRadioView :data="MASTERDATA['IPDIAFEDICF'].Items"/>
            </div>
            <div class="w200 padding-left-15">
              <b class="mb-5">{{___t('Ghi chú')}}</b>
              <CheckboxsValue class="list-checkbox" :data="MASTERDATA['IPDIAFEDICF'].Items" />
              <div class="mt-5" v-if="MASTERDATA['IPDIAFEDICF'].Items[6].Value">
                <FakeInput v-model="MASTERDATA['IPDIAFEDICF'].Items[7].Value" />
              </div>
            </div>
            <div class="padding-left-15">
              <b class="mb-5">{{__label(MASTERDATA['IPDIAFEITV5'])}}</b>
              <MDRadioView :data="MASTERDATA['IPDIAFEITV5'].Items"/>
            </div>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIAFEAFPT']">
        <th width="1">{{__label(MASTERDATA['IPDIAFEAFPT'])}}</th>
        <td>
          <div class="flex-box">
            <div class="w200">
              <MDRadioView :data="MASTERDATA['IPDIAFEAFPT'].Items"/>
            </div>
            <div class="w200 padding-left-15">
              <b class="mb-5">{{__label(MASTERDATA['IPDIAFEAFPT'].Items[3])}}</b>
              <FakeInput v-model="MASTERDATA['IPDIAFEAFPT'].Items[3].Value" />
            </div>
            <div class="padding-left-15">
              <b class="mb-5">{{__label(MASTERDATA['IPDIAFEITV6'])}}</b>
              <MDRadioView :data="MASTERDATA['IPDIAFEITV6'].Items"/>
            </div>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIAFEAAIC']">
        <th width="1">{{__label(MASTERDATA['IPDIAFEAAIC'])}}</th>
        <td>
          <div class="flex-box">
            <div class="w200">
              <MDRadioView :data="MASTERDATA['IPDIAFEAAIC'].Items"/>
            </div>
            <div class="w200 padding-left-15">
              <b class="mb-5">{{__label(MASTERDATA['IPDIAFEAAIC'].Items[3])}}</b>
              <FakeInput v-model="MASTERDATA['IPDIAFEAAIC'].Items[3].Value" />
            </div>
            <div class="padding-left-15">
              <b class="mb-5">{{__label(MASTERDATA['IPDIAFEITV7'])}}</b>
              <MDRadioView :data="MASTERDATA['IPDIAFEITV7'].Items"/>
            </div>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIAFECPRD']">
        <th width="1">{{__label(MASTERDATA['IPDIAFECPRD'])}}</th>
        <td>
          <div class="flex-box flex-center">
            <MDRadioView :data="MASTERDATA['IPDIAFECPRD'].Items"/>
            <span>{{__t('Điều dưỡng báo bác sỹ hoàn thiện biểu mẫu “Yêu cầu không hồi sức tim phổi”')}}</span>
          </div>
        </td>
      </tr>
      </template>
    </table>
  </div>
</template>
<script>
import V2Select from '@/components/VSelectDisplay.vue'
export default {
  name: 'ForFrailElderlyViewOnly',
  props: ['MASTERDATA'],
  mixins: [],
  data () {
    return {
      DataSubmit: {},
      hasData: false
    }
  },
  components: {
    V2Select
  },
  watch: {
  },
  mounted () {
  },
  computed: {
  },
  methods: {
  }
}
</script>
