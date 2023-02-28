<template>
<div v-if="MASTERDATA && DataSubmit">
  <div v-if="box1" class="flex align-center">
    <div class="mrr10 fw600">{{__label(MASTERDATA['IPDMRPT1009'])}}</div>
    <MDText :readonly="true" v-if="MASTERDATA['IPDMRPT1009']" style="width: 120px;" class="mrr30" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT1009'].Items[0].Value"/>
    <div class="mrr10 fw600">{{__label(MASTERDATA['IPDMRPT1010'])}}</div>
    <MDText :readonly="true" v-if="MASTERDATA['IPDMRPT1010']" style="width: 120px;" class="mrr30" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT1010'].Items[0].Value"/>
    <div class="mrr10 fw600">{{__label(MASTERDATA['IPDMRPT1011'])}}</div>
    <MDText :readonly="true" v-if="MASTERDATA['IPDMRPT1011']" style="width: 120px;" class="mrr30" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT1011'].Items[0].Value"/>
    <div class="mrr10 fw600" style="width: 125px;">{{__label(MASTERDATA['IPDMRPT1012'])}}</div>
    <MDText :readonly="true" v-if="MASTERDATA['IPDMRPT1012']" style="width: 485px;" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT1012'].Items[0].Value"/>
  </div>
  <div v-if="box2">
    <p v-if="MASTERDATA['IPDMRPE896']"><b>23. Tổng số ngày điều trị sau phẫu thuật:</b> {{MASTERDATA['IPDMRPE896'].Items[0].Value}}</p>
    <p v-if="MASTERDATA['IPDMRPE894']"><b>24. Tổng số lần phẫu thuật:</b> {{MASTERDATA['IPDMRPE894'].Items[0].Value}}</p>
  </div>
  <div v-if="box3" class="flex align-center">
    <div class="mrr10 fw600">{{__label(MASTERDATA['IPDMRPE1029'])}}</div>
    <MDText :readonly="true" v-if="MASTERDATA['IPDMRPE1029']" style="width: 120px;" class="mrr30" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPE1029'].Items[0].Value"/>
    <div class="mrr10 fw600">{{__label(MASTERDATA['IPDMRPE1031'])}}</div>
    <MDText :readonly="true" v-if="MASTERDATA['IPDMRPE1031']" style="width: 120px;" class="mrr30" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPE1031'].Items[0].Value"/>
    <div class="mrr10 fw600">{{__label(MASTERDATA['IPDMRPE1033'])}}</div>
    <MDText :readonly="true" v-if="MASTERDATA['IPDMRPE1033']" style="width: 120px;" class="mrr30" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPE1033'].Items[0].Value"/>
    <div class="mrr10 fw600" style="width: 125px;">{{__label(MASTERDATA['IPDMRPE1035'])}}</div>
    <MDText :readonly="true" v-if="MASTERDATA['IPDMRPE1035']" style="width: 495px;" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPE1035'].Items[0].Value"/>
  </div>
  <div v-if="box4">
    <div class="mrb10">
      <!-- Chuẩn đoán trước phẫu thuật -->
      <p v-if="MASTERDATA['IPDMRPE888']">{{__label(MASTERDATA['IPDMRPE888'])}}:</p>
      <Icd10View2 v-if="MASTERDATA['IPDMRPE888']" :mdCode="'IPDMRPE888'" :single="true" v-model="MASTERDATA['IPDMRPE888'].Items[0].Value"/>
      <FakeInput style="margin-left: 0px" v-if="MASTERDATA['IPDMRPE888']" class="mrt10 mrb10" v-model="MASTERDATA['IPDMRPE888'].Items[1].Value" />
      <!-- Chuẩn đoán sau phẫu thuật -->
      <p v-if="MASTERDATA['IPDMRPE891']">{{__label(MASTERDATA['IPDMRPE891'])}}:</p>
      <Icd10View2 v-if="MASTERDATA['IPDMRPE891']" :mdCode="'IPDMRPE891'" :single="true" v-model="MASTERDATA['IPDMRPE891'].Items[0].Value"/>
      <FakeInput style="margin-left: 0px" v-if="MASTERDATA['IPDMRPE891']" class="mrt10" v-model="MASTERDATA['IPDMRPE891'].Items[1].Value" />
    </div>
    <div class="flex-box" v-if="MASTERDATA['IPDMRPT1018'] && MASTERDATA['IPDMRPT1021']">
      <CheckboxsValue class="flex-span" :data="MASTERDATA['IPDMRPT1018'].Items" :DataType="'Radio'" :showall="true"/>
    </div>
    <div>
      <CheckboxsValue class="flex-span" :data="MASTERDATA['IPDMRPT1021'].Items" :DataType="'Checkbox'" :showall="true"/>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Oncology1',
  props: ['box1', 'box2', 'box3', 'box4', 'MASTERDATA', 'readonly', 'DataSubmit'],
  components: {
  },
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
