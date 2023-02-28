<template>
  <div v-if="MASTERDATA && Data">
    <div v-if="box1">
      <p><b>3. Tiền sử sản phụ khoa<i>/ Obstetric-gynecological history</i>:</b></p>
      <div class="mrb10">
        <span v-if="MASTERDATA['IPDMRPT818']" class="mrr10">
          - Bắt đầu thấy kinh năm<i>/ Menstruation started (in year)</i>: {{MASTERDATA['IPDMRPT818'].Items[0].Value || '&emsp;&emsp;'}}
        </span>
        <span v-if="MASTERDATA['IPDMRPT818']">
          Tuổi<i>/ At age</i>: <VAgeYearInput class="inline" :DateOfBirth="DateOfBirth" :getage="true" v-model="MASTERDATA['IPDMRPT818'].Items[0].Value"/>
        </span>
      </div>
      <div class="mrb10">
        <span v-if="MASTERDATA['IPDMRPT820']" style="word-break: break-word;display: inline-block;" class="mrr10">- Tính chất kinh nguyệt<i>/ Menstrual characteristics</i>: {{MASTERDATA['IPDMRPT820'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;'}}</span>
        <span v-if="MASTERDATA['IPDMRPT822']" style="word-break: break-word;display: inline-block;">Chu kỳ<i>/ Cycle</i>: {{MASTERDATA['IPDMRPT822'].Items[0].Value || '&emsp;&emsp;'}} ngày<i>/ days</i>. </span>
        <span v-if="MASTERDATA['IPDMRPT909']" style="word-break: break-word;display: inline-block;" class="mrr20">Số ngày thấy kinh<i>/ Length of period (days)</i> {{MASTERDATA['IPDMRPT909'].Items[0].Value || '&emsp;&emsp;'}}</span>
        <span v-if="MASTERDATA['IPDMRPT824']" style="word-break: break-word;display: inline-block;">Lượng kinh<i>/ Period volume</i>: {{MASTERDATA['IPDMRPT824'].Items[0].Value}}</span>
      </div>
      <div v-if="MASTERDATA['IPDMRPT913']" class="mrb10">- Kinh lần cuối ngày<i>/ Last menstrual period</i>: {{MASTERDATA['IPDMRPT913'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;'}}</div>
      <div class="mrb10">
        <div class="mrr10 inline" v-if="MASTERDATA['IPDMRPT915']">Đau bụng<i>/ Abdominal pain</i>: <VTich :t4="true" v-model="MASTERDATA['IPDMRPT915'].Items[0].Value"/></div>
        <div class="inline" v-if="MASTERDATA['IPDMRPT949']">Thời gian<i>/ Time</i>: <i><VTich :t4="true" :noneDex="true" :showLabel="true" :listData="MASTERDATA['IPDMRPT949'].Items" class="inline"/></i></div>
      </div>
      <div class="mrb10">
        <span v-if="MASTERDATA['IPDMRPT826']" class="mrr10">- Lấy chồng năm<i>/ Year of marriage</i>: {{MASTERDATA['IPDMRPT826'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;'}}</span>
        <span>tuổi<i>/ at age</i> <VAgeYearInput class="inline mrr40" :DateOfBirth="DateOfBirth" :getage="true" v-model="MASTERDATA['IPDMRPT826'].Items[0].Value"/></span>
        <span v-if="MASTERDATA['IPDMRPT923']" class="mrr10">Hết kinh năm<i>/ Year of menopause</i>: {{MASTERDATA['IPDMRPT923'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;'}}</span>
        <span>tuổi<i>/ at age</i> <VAgeYearInput class="inline" :DateOfBirth="DateOfBirth" :getage="true" v-model="MASTERDATA['IPDMRPT923'].Items[0].Value"/></span>
      </div>
      <div class="mrb10">
        <span v-if="MASTERDATA['IPDMRPT828']">
          - Những bệnh phụ khoa đã điều trị<i>/ Previous gynecologic disorders</i>: {{MASTERDATA['IPDMRPT828'].Items[0].Value}}
        </span>
      </div>
      <p><b>4. Tiền sử sản khoa<i>/ Obstetric history</i>: </b></p>
      <div class="mrt20 mrb10">
        <span class="mrr40">- Tiền thai (Para)</span>
        <span v-if="MASTERDATA['IPDMRPT09']" class="square-text square-text2" :class="{'hidden-text': !MASTERDATA['IPDMRPT09'].Items[0].Value}">{{MASTERDATA['IPDMRPT09'].Items[0].Value || '1'}}<span class="top-label">S</span></span>
        <span v-if="MASTERDATA['IPDMRPT11']" class="square-text square-text2" :class="{'hidden-text': !MASTERDATA['IPDMRPT11'].Items[0].Value}">{{MASTERDATA['IPDMRPT11'].Items[0].Value || '1'}}<span class="top-label">S</span></span>
        <span v-if="MASTERDATA['IPDMRPT13']" class="square-text square-text2" :class="{'hidden-text': !MASTERDATA['IPDMRPT13'].Items[0].Value}">{{MASTERDATA['IPDMRPT13'].Items[0].Value || '1'}}<span class="top-label">S</span></span>
        <span v-if="MASTERDATA['IPDMRPT15']" class="square-text square-text2" :class="{'hidden-text': !MASTERDATA['IPDMRPT15'].Items[0].Value}">{{MASTERDATA['IPDMRPT15'].Items[0].Value || '1'}}<span class="top-label">S</span></span>
        <span>Sinh (đủ tháng), Sớm (đẻ non), Sẩy (nạo, hút), Sống</span>
      </div>
      <div>
        <span style="margin-right: 178px;">History of pregnancy</span>
        <span>Full-term, Pre-term, Misscarriage, Alive</span>
      </div>
    </div>
    <div v-if="box2">
      <div><b>2. Các cơ quan<i>/ Organs</i>:</b></div>
      <p>+ Tuần hoàn<i>/ Circulatory system</i>: {{getValueOfMASTERDATA('IPDMRPTTUHO', 'IPDMRPTTUHOANS')}}</p>
      <p>+ Hô hấp<i>/ Respiratory system</i>: {{getValueOfMASTERDATA('IPDMRPTHOHA', 'IPDMRPTHOHAANS')}}</p>
      <p>+ Tiêu hóa<i>/ Digestive system</i>: {{getValueOfMASTERDATA('IPDMRPTTIHO', 'IPDMRPTTIHOANS')}}</p>
      <p>+ Thần kinh<i>/ Nervous system</i>: {{getValueOfMASTERDATA('IPDMRPTTHKI', 'IPDMRPTTHKIANS')}}</p>
      <p>+ Cơ - Xương - Khớp<i>/ Musculoskeletal system</i>: {{getValueOfMASTERDATA('IPDMRPTCOXK', 'IPDMRPTCOXKANS')}}</p>
      <p>+ Thận - Tiết niệu<i>/ Nephro-urological system</i>: {{getValueOfMASTERDATA('IPDMRPTTTNS', 'IPDMRPTTTNSANS')}}</p>
      <p v-if="MASTERDATA['IPDMRPT830']">+ Khác<i>/ Others</i>: {{MASTERDATA['IPDMRPT830'].Items[0].Value}}</p>
      <p><b>3. Khám chuyên khoa<i>/ Specialized examination</i>:</b></p>
      <p class="italic"><b>a. Khám ngoài<i>/ External examination</i></b></p>
      <div class="mrb10" v-if="MASTERDATA['IPDMRPT934']">
        <div :key="index" v-for="(item, index) in MASTERDATA['IPDMRPT934'].Items">
          <p>- {{item.ViName}}<i>{{'/ ' + item.EnName}}</i>: {{item.Value}}</p>
        </div>
      </div>
      <p class="italic"><b>b. Khám trong<i>/ Vaginal exmination</i>:</b></p>
      <div class="mrb10">
        <div :key="index" v-for="(code, index) in GroupCode2">
          <p v-if="MASTERDATA[code]">- {{MASTERDATA[code].ViName}}<i>{{'/ ' + MASTERDATA[code].EnName}}</i>: {{MASTERDATA[code].Items[0].Value}}</p>
        </div>
      </div>
      <p><b>4. Các xét nghiệm cận lâm sàng cần làm<i>/ Para-clinical laboratory tests to do</i>:</b> {{getValueOfMASTERDATA('IPDMRPTCXNC', 'IPDMRPTCXNCANS')}}</p>
      <p><b>5. Tóm tắt bệnh án<i>/ Summary</i>:</b> {{getValueOfMASTERDATA('IPDMRPTTTBA', 'IPDMRPTTTBAANS')}}</p>
      <div><b>IV. Chẩn đoán khi vào khoa điều trị<i>/ Diagnosis at admission</i>:</b></div>
      <p>+ Bệnh chính<i>/ Primary diagnosis</i>: {{getValueOfMASTERDATA('IPDMRPTCDBC', 'IPDMRPTCDBCANS') ? getValueOfMASTERDATA('IPDMRPTCDBC', 'IPDMRPTCDBCANS') + ',' : ''}} <template v-if="MASTERDATA['IPDMRPTICDC']">{{getICD10Code(MASTERDATA['IPDMRPTICDC'].Items[0].Value)}}</template></p>
      <p>+ Bệnh kèm theo <i>(nếu có)</i><i>/ Co-morbidities (if any)</i>: {{getValueOfMASTERDATA('IPDMRPTCDKT', 'IPDMRPTCDKTANS') ? getValueOfMASTERDATA('IPDMRPTCDKT', 'IPDMRPTCDKTANS') + ',' : ''}} <template v-if="MASTERDATA['IPDMRPTICDP']">{{getICD10Code(MASTERDATA['IPDMRPTICDP'].Items[0].Value)}}</template></p>
      <p>+ Phân biệt<i>/ Differentiate</i>: {{getValueOfMASTERDATA('IPDMRPTPHBI', 'IPDMRPTPHBIANS')}}</p>
    </div>
  </div>
</template>

<script>
import VSelect from '@/components/VSelect.vue'
import TblWithMasterData from '@/components/global/TblWithMasterData'
import Customer from '@/services/IPD/Customer'
import VAgeYearInput from '@/components/global/VAgeYearInput.vue'
export default {
  name: 'GynecologicalPrint2',
  props: ['box1', 'box2', 'MASTERDATA', 'Data', 'VisitId', 'VisitIdDrop'],
  components: {
    VSelect,
    TblWithMasterData,
    VAgeYearInput
  },
  data () {
    return {
      DateOfBirth: null,
      GroupCode2: [
        'IPDMRPT855',
        'IPDMRPT859',
        'IPDMRPT943',
        'IPDMRPT861',
        'IPDMRPT945'
      ]
    }
  },
  created () {
  },
  mounted () {
    this.getCustomer()
  },
  methods: {
    getCustomer () {
      new Customer({noLoading: true}).find(this._VisitId).then(response => {
        if (response.DateOfBirth) {
          this.DateOfBirth = response.DateOfBirth.split('/')[2]
        }
      })
    },
    getICD10Code (icd) {
      var arr = this.JSONParse(icd) || []
      return arr.map(e => {
        return e.code
      }).join(',')
    }
  }
}
</script>
<style scoped>
</style>
