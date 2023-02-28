<template>
  <div class="MedicalRecordNeonatalPrint2" v-if="Data && MASTERDATA">
    <template v-if="box1">
      <div class="mrb10"><b>a.Tình hình sản phụ trong khi đẻ<i>/ Labour</i>:</b></div>
      <div class="mrb10">
        <span>- Ối vỡ<i>/ Amniotic membrance rupture</i> &emsp; {{HouseVoOi[0] || '&emsp;&emsp;'}} giờ<i>/ hour</i> {{HouseVoOi[1] || '&emsp;&emsp;'}} phút<i>/ minute</i> &emsp; ngày<i>/ date</i> {{DateVoOi[0] || '&emsp;&emsp;'}}/{{DateVoOi[1] || '&emsp;&emsp;'}}/{{ DateVoOi[2] || '&emsp;&emsp;'}}</span>
      </div>
      <div class="mrb10" v-if="MASTERDATA['IPDMRPT65']">
        <span>- Mầu sắc<i>/ Colour</i>: {{MASTERDATA['IPDMRPT65'].Items[0].Value}}</span>
      </div>
      <div class="mrb10" v-if="MASTERDATA['IPDMRPT67']">
        <div class="mrr20 inline">Cách đẻ<i>/ Delivery mode</i>: </div>
        <div class="mrr20 inline">1. Đẻ thường<i>/ Vaginally</i> <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT67'].Items[0].Value}">&#10003;</span> 2. Can thiệp<i>/ Intervention</i> <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT67'].Items[1].Value}">&#10003;</span></div>
        <div class="inline">
          <span>lúc<i>/ at</i> &emsp;{{HouseCachDe[0]  || '&emsp;&emsp;'}} giờ<i>/ hour</i> {{HouseCachDe[1]  || '&emsp;&emsp;'}} phút<i>/ minute</i> &emsp; ngày<i>/ date</i> {{DateCachDe[0] || '&emsp;&emsp;'}}/{{DateCachDe[1] || '&emsp;&emsp;'}}/{{DateCachDe[2] || '&emsp;&emsp;'}}</span>
        </div>
      </div>
      <div class="mrb10" v-if="MASTERDATA['IPDMRPT72']">
        <span>Lý do can thiệp<i>/ Reason for intervention</i>: {{MASTERDATA['IPDMRPT72'].Items[0].Value}}</span>
      </div>
      <div class="mrb10" v-if="MASTERDATA['IPDMRPT74']">
        <b class="mrr10">b.Tình trạng sơ sinh khi ra đời<i>/ Newborn’s condition at birth</i>: </b><br>
        <span class="mrr10">1. Khóc ngay<i>/ Cry immediately</i> <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT74'].Items[0].Value}">&#10003;</span></span>
        <span class="mrr10">2.Ngạt<i>/ Birth asphyxia</i> <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT74'].Items[1].Value}">&#10003;</span></span>
        <span class="mrr10">3.Khác<i>/ Others</i> <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT74'].Items[2].Value}">&#10003;</span></span>
      </div>
      <div class="mrb10">
        <span>Họ tên, chức danh người đỡ đẻ, phẫu thuật<i>/ Name of deliver</i>: {{MASTERDATA['IPDMRPT78'].Items[0].Value}}</span>
      </div>
      <div class="mrb10">
        <span class="mrr20" v-if="MASTERDATA['IPDMRPT82']">Apgar 1 phút<i>/ minute</i> {{parseInt(MASTERDATA['IPDMRPT82'].Items[0].Value) || '&emsp;&emsp;'}} điểm<i>/ scores</i></span>
        <span class="mrr20" v-if="MASTERDATA['IPDMRPT85']"> 5 phút<i>/ minute</i> {{parseInt(MASTERDATA['IPDMRPT85'].Items[0].Value) || '&emsp;&emsp;'}} điểm<i>/ scores</i></span>
        <span class="mrr20" v-if="MASTERDATA['IPDMRPT88']"> 10 phút<i>/ minute</i> {{parseInt(MASTERDATA['IPDMRPT88'].Items[0].Value) || '&emsp;&emsp;'}} điểm<i>/ scores</i></span>
        <span class="mrr20" v-if="Data"> Cân nặng<i>/ Weight</i> {{Data.Cannang ? Data.Cannang * 1000 : '&emsp;&emsp;'}} (gram)</span>
      </div>
      <div class="mrb10" v-if="MASTERDATA['IPDMRPT91']">
        <span>Tình trạng dinh dưỡng sau sinh<i>/ Nutritionnal status after birth</i>: </span>
        <span>{{MASTERDATA['IPDMRPT91'].Items[0].Value}}</span>
      </div>
    </template>
    <template v-if="box2">
      <b class="mrb10 mrt10 block">c- Phương pháp hồi sinh ngay sau đẻ<i>/ Method of neonatal resuscitation</i> (Điền &#10003; nếu áp dụng<i>/ Use &#10003; if applied</i>)</b>
        <NeonatalTable
          class="mrb10"
          v-if="MASTERDATA['IPDMRPT93']"
          :master="MASTERDATA['IPDMRPT93']"
          :print="true"
          :data="[MASTERDATA['IPDMRPT93'].Items[0],
          MASTERDATA['IPDMRPT93'].Items[3],
          MASTERDATA['IPDMRPT93'].Items[1],
          MASTERDATA['IPDMRPT93'].Items[4],
          MASTERDATA['IPDMRPT93'].Items[2],
          MASTERDATA['IPDMRPT93'].Items[5],
          MASTERDATA['IPDMRPT93'].Items[6]]"/>
      <div>
        <b>III. Khám bệnh<i>/ Examination</i>:</b> <span>Họ tên, chức danh người chuyển sơ sinh<i>/ Name of neonatal referrer</i>: {{MASTERDATA['IPDMRPT102'].Items[0].Value || ''}}</span>
      </div>
      <div class="mrb10" v-if="MASTERDATA['IPDMRPT104']">
        <b class="mrr20">1. Toàn thân<i>/ General status</i>:</b>
        <span class="mrr20"> - Dị tật bẩm sinh<i>/ Congenital anomalies</i>: <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT104'].Items[0].Value}">&#10003;</span></span>
        <span> - Có hậu môn<i>/ Anus presence</i>: <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT104'].Items[1].Value}">&#10003;</span></span>
      </div>
      <div class="mrb10 BreakPage" v-if="MASTERDATA['IPDMRPT107']">
        <span>Cụ thể dị tật<i>/ Detailed congenital anomalies</i>: </span>
        <span>{{MASTERDATA['IPDMRPT107'].Items[0].Value}}</span>
      </div>
      <div class="mrb10">
        <table width="100%" class="tbl-b2">
          <tr>
            <td v-if="MASTERDATA['IPDMRPT109']" style="vertical-align: top;" width="75%">
              <p>- Tình hình sơ sinh khi vào khoa<i>/ Newborn’s condition in admission</i>: </p>
              <p>{{MASTERDATA['IPDMRPT109'].Items[1].Value}}</p>
            </td>
            <td>
              <div style="border: 1px solid black; padding: 5px;">
                <p>Cân<i>/ Weight</i>: {{Data.Cannang * 1000 || 'N/A'}} gr</p>
                <p v-if="MASTERDATA['IPDMRPTCICA']">Chiều dài<i>/ Length</i>: {{MASTERDATA['IPDMRPTCICA'].Items[0].Value || 'N/A'}} cm</p>
                <p v-if="MASTERDATA['IPDMRPT109']">Vòng đầu<i>/ Head circumference</i>: {{MASTERDATA['IPDMRPT109'].Items[0].Value || 'N/A'}} cm</p>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="mrb10">
        <table width="100%" class="tbl-b2">
          <tr>
            <td width="75%" style="vertical-align: top;">
              <p>+ Tình trạng toàn thân<i>/ Overall condition</i>: </p>
              <p v-if="MASTERDATA['IPDMRPT112']">{{MASTERDATA['IPDMRPT112'].Items[0].Value}}</p>
            </td>
            <td>
              <div style="border: 1px solid black; padding: 5px;">
                <p v-if="MASTERDATA['IPDMRPTNHDO']">Nhiệt độ<i>/ Temp</i>: {{MASTERDATA['IPDMRPTNHDO'].Items[0].Value || 'N/A'}} <span>&#186;C</span></p>
                <p v-if="MASTERDATA['IPDMRPTNHTH']">Nhịp thở<i>/ RR</i>: {{MASTERDATA['IPDMRPT141'].Items[0].Value || 'N/A'}} lần /phút<i>/bpm</i> </p>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="flex mrb10" v-if="MASTERDATA['IPDMRPT114']">
        <div class="mrr20 pdt4">+ Màu sắc da<i>/ Skin colour</i>: </div>
        <div>
          <span class="mrr20">
            <i>1.Hồng hào<i>/ Pink</i></i>
            <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT114'].Items[0].Value}">&#10003;</span>
          </span>
          <span class="mrr20">
            <i>2.Xanh tái<i>/ Pale</i></i>
            <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT114'].Items[1].Value}">&#10003;</span>
          </span>
          <span class="mrr20">
            <i>3.Vàng<i>/ Icteric</i></i>
            <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT114'].Items[2].Value}">&#10003;</span>
          </span><br>
          <span class="mrr20">
            <i>4.Tím<i>/ Cyanosis</i></i>
            <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT114'].Items[3].Value}">&#10003;</span>
          </span>
          <span>
            <i>5.Khác<i>/ Other</i></i>
            <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT114'].Items[4].Value}">&#10003;</span>
          </span>
        </div>
      </div>
      <b>2. Các cơ quan khác<i>/ Other organs</i>:</b>
      <div class="mrb10">
        <span>- Hô hấp<i>/ Respiration</i>: </span>
        <span>{{getValueOfMASTERDATA('IPDMRPTHOHA', 'IPDMRPTHOHAANS')}}</span>
      </div>
      <div class="mrb10" v-if="MASTERDATA['IPDMRPT141']">
        <span>+ Nhịp thở<i>/ Breath rate</i>: {{MASTERDATA['IPDMRPT141'].Items[0].Value || '&emsp;&emsp;&emsp;'}} lần/ phút<i>/bpm</i>.</span>
      </div>
      <div class="mrb10" v-if="MASTERDATA['IPDMRPT121']">
        <span>+ Nghe phổi<i>/ Lung auscultation</i>: </span>
        <span>{{MASTERDATA['IPDMRPT121'].Items[0].Value || '&emsp;&emsp;'}}</span>
      </div>
      <div v-if="MASTERDATA['IPDMRPT123']">
        <span>+ Chỉ số Silverman<i>/ Silverman index</i>: {{MASTERDATA['IPDMRPT123'].Items[0].Value || '&emsp;&emsp;&emsp;'}} Điểm<i>/ Scores</i></span>
      </div>
      <br>
      <table width="100%" class="tbl-b text-center mrb10">
        <tr>
          <th width="50px">Điểm/<br><i> Score</i></th>
          <th width="380px">Sự dãn nở lồng ngực<br><i>Chest movement</i></th>
          <th width="130px">Co kéo cơ liên sườn<br><i>Intercostal retraction</i></th>
          <th width="130px">Co kéo mũi ức<br><i>Xyphoid retraction</i></th>
          <th width="150px">Đập cánh mũi<br><i>Nasal flaring</i></th>
          <th width="230px">Rên rỉ<i>/ Grunt</i></th>
        </tr>
        <tr>
          <td>0</td>
          <td>Điều hoà<br><i>Synchronized respiration</i></td>
          <td>Không<br><i>None</i></td>
          <td>Không<br><i>None</i></td>
          <td>Không<br><i>None</i></td>
          <td>Không<br><i>None</i></td>
        </tr>
        <tr>
          <td>1</td>
          <td>Xê dịch nhịp thở với di động bụng<br><i>Lag on inspiration</i></td>
          <td>Có ít<br><i>Minimal</i></td>
          <td>Có ít<br><i>Minimal</i></td>
          <td>Nhẹ<br><i>Minimal</i></td>
          <td>Nghe bằng ống nghe<br><i>Stethoscope only</i></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Không di động ngực bụng<br><i>See-saw respiration</i></td>
          <td>Thấy rõ<br><i>Marked</i></td>
          <td>Thấy rõ<br><i>Marked</i></td>
          <td>Rõ<br><i>Marked</i></td>
          <td>Tai thường nghe rõ<br><i>Naked ear</i></td>
        </tr>
      </table>
      <div class="mrb10">
        <span class="mrr10">- Tim mạch<i>/ Cardiac exam</i> : Nhịp tim<i>/ Heart rate</i> {{(MASTERDATA['IPDMRPT143'] && MASTERDATA['IPDMRPT143'].Items[0].Value) ? MASTERDATA['IPDMRPT143'].Items[0].Value : '&emsp;&emsp;&emsp;'}} lần/ phút<i>/bpm</i></span>
        <span v-if="MASTERDATA['IPDMRPT125']">{{MASTERDATA['IPDMRPT125'].Items[0].Value || '&emsp;&emsp;&emsp;'}}</span>
      </div>
      <div class="mrb10" v-if="MASTERDATA['IPDMRPT127']">
        <span>- Bụng<i>/ Abdomen</i>:</span>
        <span>{{MASTERDATA['IPDMRPT127'].Items[0].Value || '&emsp;&emsp;&emsp;'}}</span>
      </div>
      <div class="mrb10" v-if="MASTERDATA['IPDMRPT129']">
        <span>- Cơ quan sinh dục ngoài<i>/ Genital organs</i>:</span>
        <span>{{MASTERDATA['IPDMRPT129'].Items[0].Value || '&emsp;&emsp;&emsp;'}}</span>
      </div>
      <div class="mrb10" v-if="MASTERDATA['IPDMRPT131']">
        <span>- Xương khớp<i>/ Bone and joints</i>:</span>
        <span>{{MASTERDATA['IPDMRPT131'].Items[0].Value || '&emsp;&emsp;&emsp;'}}</span>
      </div>
      <div class="flex mrb10">
        <div class="mrr10">- Thần kinh<i>/ Neurology</i>:</div>
        <div>
          <div v-if="MASTERDATA['IPDMRPT134']"> + Phản xạ<i>/ Reflex</i>: {{MASTERDATA['IPDMRPT134'].Items[0].Value}}</div>
          <div v-if="MASTERDATA['IPDMRPT136']"> + Trương lực cơ<i>/ Mucle tone</i>: {{MASTERDATA['IPDMRPT136'].Items[0].Value}}</div>
        </div>
      </div>
      <div class="mrb10 BreakPage">
        <b>3. Các xét nghiệm cận lâm sàng cần làm<i>/ Neccessary laboratory tests</i>:</b>
        <span>{{getValueOfMASTERDATA('IPDMRPTCXNC', 'IPDMRPTCXNCANS')}}</span>
      </div>
      <div class="mrb10">
        <b>4. Tóm tắt bệnh án<i>/ Summary</i>:</b>
        <span>{{getValueOfMASTERDATA('IPDMRPTTTBA', 'IPDMRPTTTBAANS')}}</span>
      </div>
      <div v-if="MASTERDATA['IPDMRPT138']">
        <b>5. Chỉ định theo dõi<i>/ Indication for monitoring</i>:</b>
        <span>{{MASTERDATA['IPDMRPT138'].Items[0].Value}}</span>
      </div>
    </template>
  </div>
</template>

<script>
import NeonatalTable from '@/pages/IPD/MedicalRecord/Suport/NeonatalTable.vue'
export default {
  name: 'MedicalRecordNeonatalPrint2',
  props: ['box1', 'box2', 'MASTERDATA', 'Data'],
  computed: {
    DateVoOi: function () {
      let date = ['', '', '']
      if (this.MASTERDATA['IPDMRPT63'] && this.MASTERDATA['IPDMRPT63'].Items[0].Value) {
        date = this.MASTERDATA['IPDMRPT63'].Items[0].Value.split(' ')[1].split('/')
      }
      return date
    },
    HouseVoOi: function () {
      let house = ['', '']
      if (this.MASTERDATA['IPDMRPT63'] && this.MASTERDATA['IPDMRPT63'].Items[0].Value) {
        house = this.MASTERDATA['IPDMRPT63'].Items[0].Value.split(' ')[0].split(':')
      }
      return house
    },
    DateCachDe: function () {
      let date = ['', '', '']
      if (this.MASTERDATA['IPDMRPT70'] && this.MASTERDATA['IPDMRPT70'].Items[0].Value) {
        date = this.MASTERDATA['IPDMRPT70'].Items[0].Value.split(' ')[1].split('/')
      }
      return date
    },
    HouseCachDe: function () {
      let house = ['', '']
      if (this.MASTERDATA['IPDMRPT70'] && this.MASTERDATA['IPDMRPT70'].Items[0].Value) {
        house = this.MASTERDATA['IPDMRPT70'].Items[0].Value.split(' ')[0].split(':')
      }
      return house
    }
  },
  components: {
    NeonatalTable
  }
}
</script>

<style lang="stylus" scoped>

</style>
