<template>
<div style="border: 1px solid #353535; padding: 10px 20px;">
  <p><b>1. Quá trình bệnh lý và diễn biến lâm sàng:</b> {{getValueOfMASTERDATA('IPDMRPEQTBL', 'IPDMRPEQTBLANS')}}</p>
  <div>
    <b>2. Tóm tắt kết quả xét nghiệm cận lâm sàng có giá trị chẩn đoán:</b>
    <p class="block mrt10">{{getValueOfMASTERDATA('IPDMRPETTKQ', 'IPDMRPETTKQANS')}}</p>
  </div>
  <p><b>3. Phương pháp điều trị:</b></p>
  <VTich class="text-center mrb10" v-if="MASTERDATA['IPDMRPE1001']" styleCustom="margin-right: 85px!important;" :noneDex="true" :showLabel="true" :listData="MASTERDATA['IPDMRPE1001'].Items"/>
  <div class="flex mrb10 on-top">
    <div class="mrr20" v-if="MASTERDATA['IPDMRPE1004']">- Tia xạ tiền phẫu: tại u: {{MASTERDATA['IPDMRPE1004'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}} Gy</div>
    <div v-if="MASTERDATA['IPDMRPE1006']">Tại hạch: {{MASTERDATA['IPDMRPE1006'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}}</div>
  </div>
  <div class="flex mrb10 on-top">
    <div class="mrr20" v-if="MASTERDATA['IPDMRPE1008']">- Tia xạ đơn thuần: tại u: {{MASTERDATA['IPDMRPE1008'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}} Gy</div>
    <div v-if="MASTERDATA['IPDMRPE1010']">Tại hạch: {{MASTERDATA['IPDMRPE1010'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}}</div>
  </div>
  <div v-if="MASTERDATA['IPDMRPE1012']" class="mrb10">- Phẫu thuật (tên): {{MASTERDATA['IPDMRPE1012'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}}</div>
  <div class="flex mrb10 on-top">
    <div class="mrr20" v-if="MASTERDATA['IPDMRPE1014']">- Tia xạ hậu phẫu: tại u: {{MASTERDATA['IPDMRPE1014'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}} Gy</div>
    <div v-if="MASTERDATA['IPDMRPE1016']">Tại hạch: {{MASTERDATA['IPDMRPE1016'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}}</div>
  </div>
  <div v-if="MASTERDATA['IPDMRPE1018']" class="mrb10">- Hoá chất (phác đồ): {{MASTERDATA['IPDMRPE1018'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}}</div>
  <div v-if="MASTERDATA['IPDMRPE1020']">- Số đợt: {{MASTERDATA['IPDMRPE1020'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}}</div>
  <div class="flex align-center">
    <div class="mrr40" v-if="MASTERDATA['IPDMRPE1022']">Đáp ứng: {{MASTERDATA['IPDMRPE1022'].Items[3].Value || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}}</div>
    <div>
      <VTich :noneDex="true" :showLabel="true" :listData="MASTERDATA['IPDMRPE1022'].Items" class="italic"/>
    </div>
  </div>
  <div v-if="MASTERDATA['IPDMRPE1027']" class="mrb10">- Điều trị khác: {{MASTERDATA['IPDMRPE1027'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}}</div>
  <p><b>4. {{__label(MASTERDATA['IPDMRPETTNB'])}}: </b> {{getValueOfMASTERDATA('IPDMRPETTNB', 'IPDMRPETTNBANS')}}</p>
  <p><b>5. {{__label(MASTERDATA['IPDMRPEHDTV'])}}: </b> {{getValueOfMASTERDATA('IPDMRPEHDTV', 'IPDMRPEHDTVANS')}}</p>
</div>
</template>

<script>
export default {
  name: 'OncologyPrint3',
  props: ['Data', 'MASTERDATA'],
  components: {
  },
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>
