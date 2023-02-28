<template>
<div v-if="box1">
  <div style="position: relative;">
    <div style="width: 570px;">
      <p><b class="mrb10">1. Toàn thân</b><br/>{{getValueOfMASTERDATA('IPDMRPTTTYT', 'IPDMRPTTTYTANS')}}</p>
    </div>
    <div style="border: 1px solid #353535;position: absolute;top: -23px;right: 0px;padding: 5px">
      <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTMACH']">{{__label(MASTERDATA['IPDMRPTMACH'])}}: {{MASTERDATA['IPDMRPTMACH'].Items[0].Value || 'N/A'}} {{___t(MASTERDATA['IPDMRPTMACH'].Note)}}</span></div>
      <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTNHDO']">{{__label(MASTERDATA['IPDMRPTNHDO'])}}: {{MASTERDATA['IPDMRPTNHDO'].Items[0].Value || 'N/A'}} {{___t(MASTERDATA['IPDMRPTNHDO'].Note)}}</span></div>
      <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTHUAP']">{{__label(MASTERDATA['IPDMRPTHUAP'])}}: {{MASTERDATA['IPDMRPTHUAP'].Items[0].Value || 'N/A'}} {{___t(MASTERDATA['IPDMRPTHUAP'].Note)}}</span></div>
      <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTNHTH']">{{__label(MASTERDATA['IPDMRPTNHTH'])}}: {{MASTERDATA['IPDMRPTNHTH'].Items[0].Value || 'N/A'}} {{___t(MASTERDATA['IPDMRPTNHTH'].Note)}}</span></div>
      <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTCANA']">{{__label(MASTERDATA['IPDMRPTCANA'])}}: {{MASTERDATA['IPDMRPTCANA'].Items[0].Value || 'N/A'}} {{___t(MASTERDATA['IPDMRPTCANA'].Note)}}</span></div>
    </div>
  </div>
  <div class="mrb10" style="margin-top: 60px;">
    <div>
      <b>2. Bộ phận tổn thương: </b>
      <span v-if="MASTERDATA['IPDMRPT1002']">{{MASTERDATA['IPDMRPT1002'].Items[0].Value}}</span>
    </div>
    <!-- upload file -->
      <VUpload
        code="IPDMRPT1004"
        v-if="MASTERDATA['IPDMRPT1004'] && showPickture"
        :print="true"
        :dataFile="MASTERDATA['IPDMRPT1004'].Items[0]"
        :dataImg="MASTERDATA['IPDMRPT1004'].Items[1]"
        :index="[1, 2]"/>
      <div v-if="MASTERDATA['IPDMRPT1006']">
      <b>Mô tả tổn thương: </b>
      <div class="inline">{{MASTERDATA['IPDMRPT1006'].Items[0].Value}}</div>
    </div>
  </div>
  <div><b>3. Các cơ quan:</b></div>
  <p>+ Thần kinh: {{getValueOfMASTERDATA('IPDMRPTTHKI', 'IPDMRPTTHKIANS')}}</p>
  <p>+ Tuần hoàn: {{getValueOfMASTERDATA('IPDMRPTTUHO', 'IPDMRPTTUHOANS')}}</p>
  <p>+ Hô hấp: {{getValueOfMASTERDATA('IPDMRPTHOHA', 'IPDMRPTHOHAANS')}}</p>
  <p>+ Tiêu hóa: {{getValueOfMASTERDATA('IPDMRPTTIHO', 'IPDMRPTTIHOANS')}}</p>
  <p>+ Cơ - Xương - Khớp: {{getValueOfMASTERDATA('IPDMRPTCOXK', 'IPDMRPTCOXKANS')}}</p>
  <p>+ Tiết niệu: {{getValueOfMASTERDATA('IPDMRPT1026', 'IPDMRPT1027')}}</p>
  <p>+ Sinh dục: {{getValueOfMASTERDATA('IPDMRPT1000', 'IPDMRPT1001')}}</p>
  <p>+ Khác: {{getValueOfMASTERDATA('IPDMRPT830', 'IPDMRPT831')}}</p>
  <p><b>4. Các xét nghiệm cận lâm sàng cần làm:</b> {{getValueOfMASTERDATA('IPDMRPTCXNC', 'IPDMRPTCXNCANS')}}</p>
  <p><b>5. Tóm tắt bệnh án:</b> {{getValueOfMASTERDATA('IPDMRPTTTBA', 'IPDMRPTTTBAANS')}}</p>
  <div><b>IV. Chẩn đoán khi vào khoa điều trị:</b></div>
  <p>+ Bệnh chính: {{getValueOfMASTERDATA('IPDMRPTCDBC', 'IPDMRPTCDBCANS') ? getValueOfMASTERDATA('IPDMRPTCDBC', 'IPDMRPTCDBCANS') + ',' : ''}} <template v-if="MASTERDATA['IPDMRPTICDC']">{{getICD10Code(MASTERDATA['IPDMRPTICDC'].Items[0].Value)}}</template></p>
  <div class="flex align-center mrb10">
    <div v-if="MASTERDATA['IPDMRPT1009']" class="mrr20">T {{MASTERDATA['IPDMRPT1009'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}}</div>
    <div v-if="MASTERDATA['IPDMRPT1010']" class="mrr20">N {{MASTERDATA['IPDMRPT1010'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}}</div>
    <div v-if="MASTERDATA['IPDMRPT1011']" class="mrr20">M {{MASTERDATA['IPDMRPT1011'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}}</div>
    <div v-if="MASTERDATA['IPDMRPT1012']">giai đoạn {{MASTERDATA['IPDMRPT1012'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}}</div>
  </div>
  <p>+ Bệnh kèm theo <i>(nếu có):</i> {{getValueOfMASTERDATA('IPDMRPTCDKT', 'IPDMRPTCDKTANS') ? getValueOfMASTERDATA('IPDMRPTCDKT', 'IPDMRPTCDKTANS') + ',' : ''}} <template v-if="MASTERDATA['IPDMRPTICDP']">{{getICD10Code(MASTERDATA['IPDMRPTICDP'].Items[0].Value)}}</template></p>
  <p>+ Phân biệt: {{getValueOfMASTERDATA('IPDMRPTPHBI', 'IPDMRPTPHBIANS')}}</p>
</div>
</template>

<script>
import Painting from '@/components/Painting.vue'
export default {
  name: 'OncologyPrint2',
  props: ['Data', 'MASTERDATA', 'box1'],
  components: {
    Painting
  },
  data () {
    return {
      showPickture: false
    }
  },
  mounted () {
    if (this.MASTERDATA['IPDMRPT1004'].Items[0].Value.length > 6 || this.MASTERDATA['IPDMRPT1004'].Items[1].Value.length > 6) {
      this.showPickture = true
    }
  },
  methods: {
    getICD10Code (icd) {
      var arr = this.JSONParse(icd) || []
      return arr.map(e => {
        return e.code
      }).join(',')
    },
    getValueByCode (code) {
      let data = (this.Data.DatasPart2.find(e => e.Code === code) || {}).Value
      return data
    }
  }
}
</script>
