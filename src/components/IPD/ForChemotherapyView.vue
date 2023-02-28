<template>
  <div class="box-body no-padding">
    <div class="tbl-title">I. {{___t('Thông tin chung')}}</div>
    <table class="table v-table-1 no-margin" id="InitialAssessment-ForChemotherapy-block1">
      <tr v-if="MASTERDATA['IPDIACPONDI']">
        <th width="1"><div class="w160">{{__label(MASTERDATA['IPDIACPONDI'])}}</div></th>
        <td>
          <FakeInput v-model="MASTERDATA['IPDIACPONDI'].Items[0].Value" />
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIACPDAOD']">
        <th width="1">{{__label(MASTERDATA['IPDIACPDAOD'])}}</th>
        <td>
          <FakeInput v-model="MASTERDATA['IPDIACPDAOD'].Items[0].Value" />
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIACPOCIA']">
        <th width="1">{{__label(MASTERDATA['IPDIACPOCIA'])}}</th>
        <td>
          <FakeInput v-model="MASTERDATA['IPDIACPOCIA'].Items[0].Value" />
        </td>
      </tr>
    </table>
    <table  class="table v-table-1 no-margin" id="InitialAssessment-ForChemotherapy-block2">
      <tr>
        <td colspan="2" class="no-padding">
          <div class="tbl-title">II. {{___t('Thông tin điều trị')}}</div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIACPPTCA']">
        <th width="1"><div class="w160">{{__label(MASTERDATA['IPDIACPPTCA'])}}</div></th>
        <td>
          <FakeInput v-model="MASTERDATA['IPDIACPPTCA'].Items[0].Value" />
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIACPAPTR']">
        <th width="1">{{__label(MASTERDATA['IPDIACPAPTR'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATA['IPDIACPAPTR'].Items"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIACPELOS']">
        <th width="1">{{__label(MASTERDATA['IPDIACPELOS'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATA['IPDIACPELOS'].Items"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIACPEATT']">
        <th width="1">{{__label(MASTERDATA['IPDIACPEATT'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATA['IPDIACPEATT'].Items"/>
        </td>
      </tr>
    </table>
    <table  class="table v-table-1 no-margin" id="InitialAssessment-ForChemotherapy-block3">
      <tr>
        <td colspan="2" class="no-padding">
          <div class="tbl-title">III. {{___t('Đánh giá của điều dưỡng')}}</div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIACPECOG']">
        <th width="1"><div class="w160">{{__label(MASTERDATA['IPDIACPECOG'])}}</div></th>
        <td>
          <MDRadioView :data="MASTERDATA['IPDIACPECOG'].Items"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIACPCOND']">
        <th width="1">{{__label(MASTERDATA['IPDIACPCOND'])}}</th>
        <td>
          <div class="flex-box flex-center">
            <MDRadioView :data="MASTERDATA['IPDIACPCOND'].Items"/>
            <span>{{__label(MASTERDATA['IPDIACPCOND'].Items[4])}}:</span>
            <FakeInput v-model="MASTERDATA['IPDIACPCOND'].Items[4].Value"/>
            <span>m2</span>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIACPSKCO']">
        <th width="1">{{__label(MASTERDATA['IPDIACPSKCO'])}}</th>
        <td>
          <div class="flex-box flex-center">
            <MDRadioView :data="MASTERDATA['IPDIACPSKCO'].Items"/>
            <span>{{__label(MASTERDATA['IPDIACPSKCO'].Items[2])}}:</span>
            <FakeInput v-model="MASTERDATA['IPDIACPSKCO'].Items[2].Value"/>
            <span>m2</span>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIACPHEEN']">
        <th width="1">{{__label(MASTERDATA['IPDIACPHEEN'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATA['IPDIACPHEEN'].Items"/>
        </td>
      </tr>
    </table>
    <table  class="table v-table-1 no-margin" id="InitialAssessment-ForChemotherapy-block4">
      <tr>
        <td colspan="2" class="no-padding">
          <div class="tbl-title">IV. {{___t('Đánh giá tình trạng ven')}}</div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIACPCVC']">
        <th width="1"><div class="w160">{{__label(MASTERDATA['IPDIACPCVC'])}}</div></th>
        <td>
          <MDRadioView :data="MASTERDATA['IPDIACPCVC'].Items"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIACPCATY']">
        <th width="1">{{__label(MASTERDATA['IPDIACPCATY'])}}</th>
        <td>
          <FakeInput v-model="MASTERDATA['IPDIACPCATY'].Items[0].Value"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIACPLOOC']">
        <th width="1">{{__label(MASTERDATA['IPDIACPLOOC'])}}</th>
        <td>
          <FakeInput v-model="MASTERDATA['IPDIACPLOOC'].Items[0].Value"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIACPTWDI']">
        <th width="1">{{__label(MASTERDATA['IPDIACPTWDI'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATA['IPDIACPTWDI'].Items"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIACPITV1']">
        <th width="1"><span class="">{{__label(MASTERDATA['IPDIACPITV1'])}}</span></th>
        <td>
          <CheckboxsValue :data="MASTERDATA['IPDIACPITV1'].Items" />
        </td>
      </tr>
    </table>
    <table  class="table v-table-1 no-margin" id="InitialAssessment-ForChemotherapy-block5">
      <tr>
        <td colspan="2" class="no-padding">
          <div class="tbl-title">V. {{___t('Đánh giá các phản ứng có hại của điều trị trước đó')}}</div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIACPHBTC']">
        <th width="1">
          <div class="w160">
            {{__label(MASTERDATA['IPDIACPHBTC'])}}
            <p class="note-text"><i>* Nếu lựa chọn không thì bỏ qua phần này</i></p>
          </div>
        </th>
        <td>
          <div class="flex-box flex-center">
            <MDRadioView :data="MASTERDATA['IPDIACPHBTC'].Items"/>
            <template v-if="MASTERDATA['IPDIACPHBTC'].Items[0].Value">
              <span class="mr-5">{{__label(MASTERDATA['IPDIACPHBTC'].Items[2])}}:</span>
              <FakeInput v-model="MASTERDATA['IPDIACPHBTC'].Items[2].Value"/>
            </template>
          </div>
        </td>
      </tr>
      <template v-if="MASTERDATA['IPDIACPHBTC'].Items[0].Value">
      <tr v-if="MASTERDATA['IPDIACPANOR']">
        <th width="1">{{__label(MASTERDATA['IPDIACPANOR'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATA['IPDIACPANOR'].Items"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIACPCTPT']">
        <th width="1">{{__label(MASTERDATA['IPDIACPCTPT'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATA['IPDIACPCTPT'].Items"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIACPDIAR']">
        <th width="1">{{__label(MASTERDATA['IPDIACPDIAR'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATA['IPDIACPDIAR'].Items"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIACPDMOM']">
        <th width="1">{{__label(MASTERDATA['IPDIACPDMOM'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATA['IPDIACPDMOM'].Items"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIACPNAUS']">
        <th width="1">{{__label(MASTERDATA['IPDIACPNAUS'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATA['IPDIACPNAUS'].Items"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIACPVOMI']">
        <th width="1">{{__label(MASTERDATA['IPDIACPVOMI'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATA['IPDIACPVOMI'].Items"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIACPALHL']">
        <th width="1">{{__label(MASTERDATA['IPDIACPALHL'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATA['IPDIACPALHL'].Items"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIACPNRTX']">
        <th width="1">{{__label(MASTERDATA['IPDIACPNRTX'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATA['IPDIACPNRTX'].Items"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIACPNTPN']">
        <th width="1">{{__label(MASTERDATA['IPDIACPNTPN'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATA['IPDIACPNTPN'].Items"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIACPITV2']">
        <th width="1"><span class="">{{__label(MASTERDATA['IPDIACPITV2'])}}</span></th>
        <td>
          <!-- <MDRadioView :data="MASTERDATA['IPDIACPITV2'].Items" :DataType="'Checkbox'"/> -->
          <MDRadioView :data="MASTERDATA['IPDIACPITV2'].Items"/>
        </td>
      </tr>
      </template>
    </table>
    <br/><br/><br/>
  </div>
</template>
<script>
import V2Select from '@/components/VSelectDisplay.vue'
export default {
  name: 'ForChemotherapyViewOnly',
  props: ['MASTERDATA'],
  mixins: [],
  data () {
    return {
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
