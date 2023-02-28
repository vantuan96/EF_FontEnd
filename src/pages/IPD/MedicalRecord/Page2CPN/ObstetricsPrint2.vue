<template>
<div>
  <div v-if="Data && MASTERDATA && box1">
    <!-- <div class="mrb10">
      <b>1. Quá trình bệnh lý:</b>
      <span v-if="MASTERDATA['IPDMRPTQTBL']">
        {{MASTERDATA['IPDMRPTQTBL'].Items[0].Value}}
      </span>
    </div> -->
    <div class="line-height"><b>1. Quá trình kỳ thai này<i>/ Progression of this pregnancy</i>:</b> <i>kinh cuối cùng từ ngày<i>/ Last menstrual period from date</i> {{dateKinhCuoi[0] ? dateKinhCuoi[0] : ' &emsp; ' }}/{{dateKinhCuoi[1] ? dateKinhCuoi[1] : ' &emsp; ' }}/{{dateKinhCuoi[2] ? dateKinhCuoi[2] : ' &emsp; ' }} đến ngày<i>/ to date </i> {{dateDenNgay[0] ? dateDenNgay[0] : ' &emsp; ' }}/{{dateDenNgay[1] ? dateDenNgay[1] : ' &emsp; ' }}/{{dateDenNgay[2] ? dateDenNgay[2] : ' &emsp; '}}</i></div>
    <div class="mrb10">
      <span v-if="MASTERDATA['IPDMRPT805']">
        - Khám thai tại<i>/ Prenatal check-up at</i>: {{MASTERDATA['IPDMRPT805'].Items[0].Value}}
      </span>
    </div>
    <div class="mrb10">
      <span v-if="MASTERDATA['IPDMRPT807']">- Tiêm phòng uốn ván<i>/ Tetanus vaccination</i>: <VTich :t3="true" :showLabel="true" :noneDex="true" class="inline" :listData="MASTERDATA['IPDMRPT807'].Items" /></span>
      <span v-if="MASTERDATA['IPDMRPT807']">(Được tiêm<i>/ Vaccinated</i>: {{MASTERDATA['IPDMRPT807'].Items[2].Value || ' &emsp; '}} lần<i>/ times</i>)</span>
    </div>
    <div class="mrb10">
      <span>- Bắt đầu chuyển dạ từ<i>/ Labour started at</i>: {{houseChuyenDa[0] ? houseChuyenDa[0] : ' &emsp; ' }} giờ<i>/ hour</i> {{houseChuyenDa[1] ? houseChuyenDa[1] : ' &emsp; ' }} phút<i>/ minute</i> ngày<i>/ date</i> {{dateChuyenDa[0] ? dateChuyenDa[0] : ' &emsp; ' }}/{{dateChuyenDa[1] ? dateChuyenDa[1] : ' &emsp; ' }}/{{dateChuyenDa[2] ? dateChuyenDa[2] : ' &emsp; ' }}</span>
    </div>
    <div class="mrb10">
      <span v-if="MASTERDATA['IPDMRPT813']">
        - Dấu hiệu lúc đầu<i>/ Early signs of labour</i>: {{MASTERDATA['IPDMRPT813'].Items[0].Value}}
      </span>
    </div>
    <div class="mrb10">
      <span v-if="MASTERDATA['IPDMRPT815']">
        - Biến chuyển<i>/ Progression</i>: {{MASTERDATA['IPDMRPT815'].Items[0].Value}}
      </span>
    </div>
  </div>
  <div v-if="Data && MASTERDATA && box2">
    <p><b>3. Tiền sử phụ khoa<i>/ Gynecological history</i>:</b></p>
    <div class="mrb10">
      <span v-if="MASTERDATA['IPDMRPT818']" class="mrr10">
        - Bắt đầu thấy kinh năm<i>/ Menstruation started (in year)</i>: {{MASTERDATA['IPDMRPT818'].Items[0].Value || '&emsp;&emsp;'}}
      </span>
      <span v-if="MASTERDATA['IPDMRPT818']">
        Tuổi<i>/ At age</i>: <VAgeInput2 class="inline" :DateOfBirth="DateOfBirth || 0" :getage="true" v-model="MASTERDATA['IPDMRPT818'].Items[0].Value"/>
      </span>
    </div>
    <div class="mrb10">
      <span v-if="MASTERDATA['IPDMRPT820']" class="mrr10">- Tính chất kinh nguyệt<i>/ Menstrual characteristics</i>: {{MASTERDATA['IPDMRPT820'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;'}}</span>
      <span v-if="MASTERDATA['IPDMRPT822']" class="mrr10">- Chu kỳ<i>/ Cycle</i>: {{MASTERDATA['IPDMRPT822'].Items[0].Value || '&emsp;&emsp;'}} ngày<i>/ day</i></span>
    </div>
    <div v-if="MASTERDATA['IPDMRPT824']" class="mrb10">- Lượng kinh<i>/ Period volume</i>: {{MASTERDATA['IPDMRPT824'].Items[0].Value}}</div>
    <div class="mrb10">
      <span v-if="MASTERDATA['IPDMRPT826']" class="mrr10">- Lấy chồng năm<i>/ Year of marriage</i>: {{MASTERDATA['IPDMRPT826'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;'}}</span>
      <span>tuổi<i>/ At age</i>: <VAgeInput2 class="inline" :DateOfBirth="DateOfBirth || 0" :getage="true" v-model="MASTERDATA['IPDMRPT826'].Items[0].Value"/></span>
    </div>
    <div class="mrb10">
      <span v-if="MASTERDATA['IPDMRPT828']">
        - Những bệnh phụ khoa đã điều trị<i>/ Previous gynecologic disorders</i>: {{MASTERDATA['IPDMRPT828'].Items[0].Value}}
      </span>
    </div>
    <div class="mrb10 hasBreakPage" @dblclick="addBreakPage">
      <b>4. Tiền sử sản khoa<i>/ Obstetric history</i>:</b>
    </div>
    <div class="mrb10">
      <table v-if="!DataTable" width="100%" class="tbl-b tbl-c">
        <tr>
          <th width="46px">Số lần<span class="italic"><br>có thai<br>Numb<br>er of<br>pregn<br>ancy</span></th>
          <th width="46px">Năm<br><span class="italic">Year</span></th>
          <th width="46px">Đẻ đủ<br>tháng<br><span class="italic">Full-<br>term</span></th>
          <th width="46px">Đẻ thiếu<br>tháng<br><span class="italic">Pre-term</span></th>
          <th width="46px">Sẩy<br><span class="italic">Misca<br>rriage</span></th>
          <th width="46px">Hút<br><span class="italic">Suc<br>tion</span></th>
          <th width="46px">Nạo<br><span class="italic">D&<br>E</span></th>
          <th width="46px">Co-<br>vac</th>
          <th width="46px">Chửa<br>ngoài<br>TC<br><span class="italic">Ectopi<br>c<br>pregn<br>ancy</span></th>
          <th width="46px">Chửa<br>trứng<br><span class="italic">Hydati<br>diform<br>mole</span></th>
          <th width="46px">Thai<br>chết<br>lưu<br><span class="italic">Stillb<br>irth</span></th>
          <th width="46px">Con<br>hiện<br>sống<br><span class="italic">Alive</span></th>
          <th width="46px">Cân<br>nặng<br><span class="italic">Weight</span></th>
          <th>Phương<br>pháp đẻ<br><span class="italic">Labour<br>method</span></th>
          <th width="46px">Tai biến<br><span class="italic">Acciden<br>t</span></th>
        </tr>
        <tr>
          <td>1</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>2</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>3</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>4</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>5</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
      <TblWithMasterData
        :hidethead="true"
        @getCol="getCol"
        :top="true"
        :headerStyle="[{width: '40px'}, {width: '45px'}, {width: '45px'}, {width: '45px'}, {width: '45px'}, {width: '45px'}, {width: '45px'}, {width: '60px'}, {}, {}, {}, {}, {width: '53px'}, {width: '70px'}, {width: '53px'}]"
        width="100px"
        :FormCode="'IPDSANTBL1'"
        :VisitId="_VisitId"
        :VisitType="'IPD'"
        :FormID="Data.Id"
        :print="true"
        :checkShow="true"
        ref="TblWithMasterData"/>
    </div>
    <div style="position: relative;">
      <div>
        <p><b>III. Khám bệnh<i>/ Examination</i>:</b></p>
        <p><b>1. Toàn thân<i>/ General status</i>:</b></p>
        <div v-if="MASTERDATA['IPDMRPTTTYT']" style="width: 500px;padding-left: 10px; margin-bottom: 15px;">
          <div class="inline" style="margin-left: -10px;">- Toàn trạng<i>/ Overall condition</i>:</div>
          <div class="inline pre-line">{{MASTERDATA['IPDMRPTTTYT'].Items[0].Value}}</div>
        </div>
        <div class="mrb10" style="width: 500px;padding-left: 10px;">
          <div class="inline" style="margin-left: -10px;">- Tuần hoàn<i>/ Circulatory system</i>:</div>
          <div class="inline pre-line">{{getValueOfMASTERDATA('IPDMRPTTUHO', 'IPDMRPTTUHOANS')}}</div>
        </div>
      </div>
      <div style="border: 1px solid;padding: 5px;position: absolute;right:0px;top:25px;">
        <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTMACH']">Mạch<i>/ pulse</i>: {{MASTERDATA['IPDMRPTMACH'].Items[0].Value || '&emsp;&emsp;'}} <i>lần/ph/ bpm</i></span></div>
        <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTNHDO']">Nhiệt độ<i>/ Temp</i>: {{MASTERDATA['IPDMRPTNHDO'].Items[0].Value || '&emsp;&emsp;'}} &#8451;</span></div>
        <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTHUAP']">Huyết áp<i>/ BP</i>: {{MASTERDATA['IPDMRPTHUAP'].Items[0].Value || '&emsp;&emsp;'}} mmHg</span></div>
        <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTNHTH']">Nhịp thở<i>/ RR</i>: {{MASTERDATA['IPDMRPTNHTH'].Items[0].Value || '&emsp;&emsp;'}} <i>lần/ph/ bpm</i></span></div>
        <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTCICA']">Chiều cao<i>/ Height</i>: {{MASTERDATA['IPDMRPTCICA'].Items[0].Value || '&emsp;&emsp;'}} <i>cm</i></span></div>
        <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTCANA']">Cân nặng<i>/ Weight</i>: {{MASTERDATA['IPDMRPTCANA'].Items[0].Value || '&emsp;&emsp;'}} <i> Kg</i></span></div>
      </div>
    </div>
    <div class="mrb10" style="width: 500px;padding-left: 10px;">
      <div class="inline" style="margin-left: -10px;">- Hô hấp<i>/ Resporatory system</i>:</div>
      <div class="inline pre-line">{{getValueOfMASTERDATA('IPDMRPTHOHA', 'IPDMRPTHOHAANS')}}</div>
    </div>
    <div class="mrb10" style="width: 500px;padding-left: 10px;">
      <div class="inline" style="margin-left: -10px;">- Tiêu hóa<i>/ Digestive system</i>:</div>
      <div class="inline pre-line">{{getValueOfMASTERDATA('IPDMRPTTIHO', 'IPDMRPTTIHOANS')}}</div>
    </div>
    <div class="mrb10" style="width: 500px;padding-left: 10px;">
      <div class="inline" style="margin-left: -10px;">- Tiết niệu<i>/ Urinary system</i>:</div>
      <div class="inline pre-line">{{getValueOfMASTERDATA('IPDMRPTTTNS', 'IPDMRPTTTNSANS')}}</div>
    </div>
    <div class="mrb10" style="width: 500px;padding-left: 10px;" v-if="MASTERDATA['IPDMRPT830']">
      <div class="inline" style="margin-left: -10px;">- Các bộ phận khác<i>/ Other organs</i>:</div>
      <div class="inline pre-line">{{MASTERDATA['IPDMRPT830'].Items[0].Value}}</div>
    </div>
    <p><b>2. Khám ngoài<i>/ External examination</i>:</b></p>
    <table class="mrb10" style="width: 100%">
      <tr>
        <td colspan="2">
          <div v-if="MASTERDATA['IPDMRPT833']" class="block mrb10">
            - Sẹo phẫu thuật cũ ở bụng<i>/ Prior abdominal surgical scar</i>: <VTich :t3="true" class="inline" :showLabel2="true" :noneDex="true" :listData="MASTERDATA['IPDMRPT833'].Items"/>
          </div>
          <div class="mrb10">
            <div v-if="MASTERDATA['IPDMRPT836'] && MASTERDATA['IPDMRPT838']" class="inline mrr20">- Hình dạng TC<i>/ Uterine shape</i>: {{MASTERDATA['IPDMRPT836'].Items[0].Value || '&emsp;&emsp;'}}</div>
            <div class="inline">Tư thế<i>/ Position</i>: {{MASTERDATA['IPDMRPT838'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;'}}</div>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <div v-if="MASTERDATA['IPDMRPT844'] && MASTERDATA['IPDMRPT842']" class="block mrb10 mrr20">- Chiều cao TC<i>/ Uterine height</i>: {{MASTERDATA['IPDMRPT844'].Items[0].Value || '&emsp;&emsp;'}} cm, vòng bụng<i>/ Abdominal circumference</i>: {{MASTERDATA['IPDMRPT842'].Items[0].Value || '&emsp;&emsp;'}} cm</div>
          <div v-if="MASTERDATA['IPDMRPT840']" class="block mrb10">- Cơn co TC<i>/ Unterine contractions</i>: {{MASTERDATA['IPDMRPT840'].Items[0].Value}}</div>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <div class="mrb10">
            <div v-if="MASTERDATA['IPDMRPT846']" class="inline mrr20">- Tim thai<i>/ Fetal heart rate</i>: {{MASTERDATA['IPDMRPT846'].Items[0].Value || '&emsp;&emsp;'}} lần/ phút<i>/ bpm</i></div>
            <div v-if="MASTERDATA['IPDMRPT848']" class="inline">- Vú<i>/ Breasts</i>: {{MASTERDATA['IPDMRPT848'].Items[0].Value}}</div>
          </div>
        </td>
      </tr>
      <tr>
        <td><p><b>3. Khám trong<i>/ Vaginal exmination</i>:</b></p></td>
      </tr>
      <tr>
        <td>
          <span>- Chỉ số Bishop<i>/ Bishop index</i></span>
          <div v-if="MASTERDATA['IPDMRPT851']" class="inline" style="border:1px solid;padding: 3px">{{MASTERDATA['IPDMRPT851'].Items[0].Value || '&emsp;&emsp;&emsp;'}} Điểm<i>/ score(s)</i></div>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <span v-if="MASTERDATA['IPDMRPT853']" class="mrr20">- Âm hộ<i>/ Vulva</i>: {{MASTERDATA['IPDMRPT853'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;'}}</span>
          <span v-if="MASTERDATA['IPDMRPT855']" class="mrr20">- Âm đạo<i>/ Vagina</i>: {{MASTERDATA['IPDMRPT855'].Items[0].Value}}</span>
          <span v-if="MASTERDATA['IPDMRPT857']">- Tầng sinh môn<i>/ Perineum</i>: {{MASTERDATA['IPDMRPT857'].Items[0].Value}}</span>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <div class="mrb10">
            <span v-if="MASTERDATA['IPDMRPT859']" class="mrr20">- Cổ tử cung<i>/ Cervix</i>: {{MASTERDATA['IPDMRPT859'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;'}}</span>
            <span v-if="MASTERDATA['IPDMRPT861']">- Phần phụ<i>/ Adnexa</i>: {{MASTERDATA['IPDMRPT861'].Items[0].Value}}</span>
          </div>
          <div>
            <div class="inline-block">- Tình trạng ối<i>/ Amniotic status</i>: </div>
            <div class="inline-block">
              <VTich :t3="true" class="block" v-if="MASTERDATA['IPDMRPT863']" :listData="MASTERDATA['IPDMRPT863'].Items"/>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <div class="mrb10">
            <span v-if="MASTERDATA['IPDMRPT889']">- Ối vỡ lúc<i>/ ROM at</i>: {{MASTERDATA['IPDMRPT889'].Items[0].Value}}</span>
          </div>
          <div>
            <span class="mrr10">- Ối vỡ<i>/ Type of ROM</i>: </span>
            <VTich :t3="true" v-if="MASTERDATA['IPDMRPT867']" class="inline" :noneDex="true" :showLabel="true" :listData="MASTERDATA['IPDMRPT867'].Items"/>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <div v-if="MASTERDATA['IPDMRPT870']" class="inline mrr20">- Mầu sắc nước ối<i>/ Amniotic fluid color</i>: {{MASTERDATA['IPDMRPT870'].Items[0].Value}}</div>
          <div v-if="MASTERDATA['IPDMRPT872']" class="inline">- Nước ối nhiều hay ít<i>/ Amniotic fluid volume</i>: {{MASTERDATA['IPDMRPT872'].Items[0].Value}}</div>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <div class="inline mrr20" v-if="MASTERDATA['IPDMRPT874'] && MASTERDATA['IPDMRPT876']">
            - Ngôi<i>/ Presentation</i>: {{MASTERDATA['IPDMRPT874'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;'}}&emsp;&emsp; - Thế<i>/ Position</i>: {{MASTERDATA['IPDMRPT876'].Items[0].Value}}
          </div>
          <div class="inline" v-if="MASTERDATA['IPDMRPT878']">- Kiểu thế<i>/ Types of position</i>: {{MASTERDATA['IPDMRPT878'].Items[0].Value}}</div>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <div class="inline-block">- Độ lọt<i>/ Descendent of fetal head</i>:</div>
          <VTich styleCustom="margin-right: 0px!important;" :indexs="[0, 1, 2, 3]" :t3="true" v-if="MASTERDATA['IPDMRPT880']" class="inline-block" :noneDex="true" :showLabel="true" :listData="MASTERDATA['IPDMRPT880'].Items"/><br>
          <div v-if="MASTERDATA['IPDMRPT885']" class="block mrt10">- Đường kính nhô hạ vệ<i>/ Diagonal conjugate diameter</i>: {{MASTERDATA['IPDMRPT885'].Items[0].Value}}</div>
        </td>
      </tr>
    </table>
    <p v-if="MASTERDATA['IPDMRPTCXNC']"><b>4. Các xét nghiệm cận lâm sàng cần làm<i>/ Para-clinical laboratory tests to do</i>: </b>{{MASTERDATA['IPDMRPTCXNC'].Items[0].Value}}</p>
    <!-- <p v-if="MASTERDATA['IPDMRPTTTBA']"><b>5. Tóm tắt bệnh án: </b>{{MASTERDATA['IPDMRPTTTBA'].Items[0].Value}}</p> -->
    <p><b>5. Chẩn đoán<i>/ Diagnosis</i>:</b></p>
    <div class="flex align-center">
      <div class="mrr10">- Khi vào khoa<i>/ At admission</i>:</div>
      <div>{{getChuanDoan()}}</div>
    </div>
    <p v-if="MASTERDATA['IPDMRPTPHBI']">- Phân biệt<i>/ Differentiate</i>: {{MASTERDATA['IPDMRPTPHBI'].Items[0].Value}}</p>
  </div>
</div>
</template>

<script>
import TblWithMasterData from '@/components/global/TblWithMasterData'
import Customer from '@/services/IPD/Customer'
import VAgeInput2 from '@/components/global/VAgeInput2.vue'
export default {
  name: 'ObstetricsPrint2',
  props: ['Data', 'MASTERDATA', 'box2', 'box1', 'VisitId', 'VisitIdDrop'],
  components: {
    TblWithMasterData,
    VAgeInput2
  },
  data () {
    return {
      DataTable: null,
      DateOfBirth: null
    }
  },
  methods: {
    getICD10Code (icd) {
      var arr = this.JSONParse(icd) || []
      return arr.map(e => {
        return e.code
      }).join(',')
    },
    getCol (col) {
      this.DataTable = ''
      if (col && col.length) {
        this.DataTable = col.length
      }
    },
    getCustomer () {
      new Customer({noLoading: true}).find(this._VisitId).then(response => {
        if (response.DateOfBirth) {
          this.DateOfBirth = response.DateOfBirth.split('/')[2]
        }
      })
    },
    getICD10Codex2 (icd) {
      let check = false
      if (this.JSONParse(icd)) {
        check = true
      }
      return check
    },
    getICD10Codex (icd) {
      return this.JSONParse(icd, true)
    },
    getChuanDoan () {
      let text = ''
      let text2 = ''
      if (this.MASTERDATA['IPDMRPTCDBC'] && this.MASTERDATA['IPDMRPTCDKT'] && this.MASTERDATA['IPDMRPTICDC'] && this.MASTERDATA['IPDMRPTICDP']) {
        if (this.MASTERDATA['IPDMRPTCDBC'].Items[0].Value) {
          text = this.MASTERDATA['IPDMRPTCDBC'].Items[0].Value
        }
        if (this.MASTERDATA['IPDMRPTCDKT'].Items[0].Value) {
          if (text) {
            text += '/'
          }
          text += this.MASTERDATA['IPDMRPTCDKT'].Items[0].Value
        }
        if (this.MASTERDATA['IPDMRPTICDC'].Items[0].Value && this.getICD10Code(this.MASTERDATA['IPDMRPTICDC'].Items[0].Value)) {
          text2 += this.getICD10Code(this.MASTERDATA['IPDMRPTICDC'].Items[0].Value)
        }
        if (this.MASTERDATA['IPDMRPTICDP'].Items[0].Value && this.getICD10Code(this.MASTERDATA['IPDMRPTICDP'].Items[0].Value)) {
          if (text2) {
            text2 += '/'
          }
          text2 += this.getICD10Code(this.MASTERDATA['IPDMRPTICDP'].Items[0].Value)
        }
      }
      if (text2) {
        text = text + ' (' + text2 + ')'
      }
      return text
    }
  },
  computed: {
    dateKinhCuoi: function () {
      if (this.MASTERDATA['IPDMRPT801']) {
        return this.MASTERDATA['IPDMRPT801'].Items[0].Value ? this.MASTERDATA['IPDMRPT801'].Items[0].Value.split('/') : ['', '', '']
      }
    },
    dateDenNgay: function () {
      if (this.MASTERDATA['IPDMRPT887']) {
        return this.MASTERDATA['IPDMRPT887'].Items[0].Value ? this.MASTERDATA['IPDMRPT887'].Items[0].Value.split('/') : ['', '', '']
      }
    },
    houseChuyenDa: function () {
      if (this.MASTERDATA['IPDMRPT811']) {
        return this.MASTERDATA['IPDMRPT811'].Items[0].Value ? this.MASTERDATA['IPDMRPT811'].Items[0].Value.split(' ')[0].split(':') : ['', '']
      }
    },
    dateChuyenDa: function () {
      if (this.MASTERDATA['IPDMRPT811']) {
        return this.MASTERDATA['IPDMRPT811'].Items[0].Value ? this.MASTERDATA['IPDMRPT811'].Items[0].Value.split(' ')[1].split('/') : ['', '', '']
      }
    }
  },
  mounted () {
    this.getCustomer()
  }
}
</script>
