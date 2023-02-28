<template>
  <div class="EyePrint2" v-if="MASTERDATA && Data">
    <table width="100%" class="tbl-b2">
      <tr>
        <td colspan="2"><h3><b>A. BỆNH ÁN<i>/ MEDICAL RECORD</i></b></h3></td>
      </tr>
      <tr>
        <td colspan="2">
          <b>1. Lý do vào viện<i>/ Chief complaints</i>: </b><span v-if="MASTERDATA['IPDMRPTLDVV']">{{MASTERDATA['IPDMRPTLDVV'].Items[0].Value || '&emsp;&emsp;'}}</span>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <div class="mrb10"><b>2. Bệnh sử<i>/ Clinical evolution</i>: </b></div>
          <div class="mrb10">
          <span>- Thời gian xuất hiện bệnh<i>/ Onset of disease</i>: </span>
          <span v-if="MASTERDATA['IPDMRPT1051']">{{MASTERDATA['IPDMRPT1051'].Items[0].Value || '&emsp;&emsp;'}}</span>
          </div>
          <div class="mrb10">
            <span>- Nguyên nhân (nếu có)<i>/ Causes (if any)</i>: </span>
              <span v-if="MASTERDATA['IPDMRPT1053']">{{MASTERDATA['IPDMRPT1053'].Items[0].Value || '&emsp;&emsp;'}}</span>
          </div>
          <div class="mrb10">
            <span>- Các phương pháp đã điều trị<i>/ Treatment methods received</i>: </span>
              <span v-if="MASTERDATA['IPDMRPT1055']">{{MASTERDATA['IPDMRPT1055'].Items[0].Value || '&emsp;&emsp;'}}</span>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <div class="mrb10"><b>3. Tiền sử<i>/ Past medical history</i>:</b></div>
          <div class="mrb10">- Bản thân<i>/ Personal medical history</i>:</div>
          <div class="mrb10">
            <span>+ Dị ứng<i>/ Allergy</i>: </span>
            <span v-if="MASTERDATA['IPDMRPT01']">{{MASTERDATA['IPDMRPT01'].Items[0].Value || '&emsp;&emsp;'}}</span>
          </div>
          <div class="mrb10">
            <span>+ Tại mắt<i>/ Eye condition</i>: </span>
            <span v-if="MASTERDATA['IPDMRPT1057']">{{MASTERDATA['IPDMRPT1057'].Items[0].Value || '&emsp;&emsp;'}}</span>
          </div>
          <div class="mrb10">
            <span>+ Toàn thân<i>/ General condition</i>: </span>
            <span v-if="MASTERDATA['IPDMRPT1644']">{{MASTERDATA['IPDMRPT1644'].Items[0].Value || '&emsp;&emsp;'}}</span>
          </div>
          <div class="mrb10">- Gia đình<i>/ Family medical history</i>:</div>
          <div class="mrb10">
            <span>+ Bệnh mắt<i>/ Eye condition</i>: </span>
            <span v-if="MASTERDATA['IPDMRPT1059']">{{MASTERDATA['IPDMRPT1059'].Items[0].Value || '&emsp;&emsp;'}}</span>
          </div>
          <div class="mrb10">
            <span>+ Bệnh toàn thân<i>/ General condition</i>: </span>
            <span v-if="MASTERDATA['IPDMRPT1061']">{{MASTERDATA['IPDMRPT1061'].Items[0].Value || '&emsp;&emsp;'}}</span>
          </div>
        </td>
      </tr>
      </table>
      <div class="mrb10">
        <p>+ Thuốc hiện đang dùng (Bao gồm cả thuốc kê đơn và không kê đơn)<i>/ Medication currently used (Inclusive of both prescribed or over-the-counter medication)</i></p>
        <list-of-current-medications
          ref="ListOfCurrentMedications"
          :Type="'IPD-PatientMedicationList'"
          :VisitTypeGroupCode="'IPD'"
          :VisitId="VisitId"
          :RealOnly="true"
          :t3="true"
          :Gynecological="true"
          :customHeader="'text-align: center!important;'"
          />
      </div>
      <div class="mrb10 BreakPage"><b>4. Khám bệnh<i>/ Medical examination</i>:</b></div>
      <div class="mrb10"><b>4.1 Khám mắt<i>/ Eye examination</i>:</b></div>
      <table width="100%" class="tbl-b font9pt- tbl-pd-5">
        <tr>
          <td></td>
          <td width="42%" class="text-center fw600 cap">Mắt phải<i>/ RIGHT EYE</i></td>
          <td width="42%" class="text-center fw600 cap">Mắt trái<i>/ LEFT EYE</i></td>
        </tr>
        <tr>
          <td class="fw600 on-top" rowspan="3"><div>1. Thị lực<i>/ Visual acuity</i></div></td>
          <td>
            <div class="flex align-center">
              <div class="mrr10">Không kính<i>/ Unaided</i>: </div>
              <div class="mrr10" v-if="MASTERDATA['IPDMRPTR1079']">{{MASTERDATA['IPDMRPTR1079'].Items[0].Value || '&emsp;&emsp;'}}</div>
              <div class="mrr10">Qua lỗ<i>/ Pinhole</i>: </div>
              <div class="mrr10" v-if="MASTERDATA['IPDMRPTR1081']">{{MASTERDATA['IPDMRPTR1081'].Items[0].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td>
            <div class="flex align-center">
              <div class="mrr10">Không kính<i>/ Unaided</i>: </div>
              <div class="mrr10" v-if="MASTERDATA['IPDMRPTL1079']">{{MASTERDATA['IPDMRPTL1079'].Items[0].Value || '&emsp;&emsp;'}}</div>
              <div class="mrr10">Qua lỗ<i>/ Pinhole</i>: </div>
              <div class="mrr10" v-if="MASTERDATA['IPDMRPTL1081']">{{MASTERDATA['IPDMRPTL1081'].Items[0].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center">
              <div class="mrr10">Có chỉnh kính<i>/ Aided</i>: </div>
              <div class="mrr10" v-if="MASTERDATA['IPDMRPTR1083']">{{MASTERDATA['IPDMRPTR1083'].Items[0].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td>
            <div class="flex align-center">
              <div class="mrr10">Có chỉnh kính<i>/ Aided</i>: </div>
              <div class="mrr10" v-if="MASTERDATA['IPDMRPTL1083']">{{MASTERDATA['IPDMRPTL1083'].Items[0].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center">
              <div class="mrr10">Nhìn gần<i>/ Near vision</i>: </div>
              <div class="mrr10" v-if="MASTERDATA['IPDMRPTR1085']">{{MASTERDATA['IPDMRPTR1085'].Items[0].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td>
            <div class="flex align-center">
              <div class="mrr10">Nhìn gần<i>/ Near vision</i>: </div>
              <div class="mrr10" v-if="MASTERDATA['IPDMRPTL1085']">{{MASTERDATA['IPDMRPTL1085'].Items[0].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="fw600"><div>2. Nhãn áp<i>/ IOP</i></div></td>
          <td>
            <div class="mrr10" v-if="MASTERDATA['IPDMRPTR1087']">{{MASTERDATA['IPDMRPTR1087'].Items[0].Value || '&emsp;&emsp;'}}</div>
          </td>
          <td>
            <div class="mrr10" v-if="MASTERDATA['IPDMRPTL1087']">{{MASTERDATA['IPDMRPTL1087'].Items[0].Value || '&emsp;&emsp;'}}</div>
          </td>
        </tr>
        <tr>
          <td class="fw600 on-top" rowspan="2"><div style="text-align: initial;">3. Lác và vận nhãn<i>/ Strabismus and eye movement</i></div></td>
          <td>
            <div class="mrr10" v-if="MASTERDATA['IPDMRPTR1089']">{{MASTERDATA['IPDMRPTR1089'].Items[0].Value || '&emsp;&emsp;'}}</div>
          </td>
          <td>
            <div class="mrr10" v-if="MASTERDATA['IPDMRPTL1089']">{{MASTERDATA['IPDMRPTL1089'].Items[0].Value || '&emsp;&emsp;'}}</div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center">
              <div class="mrr5">Bơm lệ quản<i>/ Lacrimal irrigation</i>: Nước thoát tốt<i>/ Good drainage</i>: </div>
              <div><VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1091']" v-model="MASTERDATA['IPDMRPTR1091'].Items[0].Value"/></div>
            </div>
          </td>
          <td>
            <div class="flex align-center">
              <div class="mrr5">Bơm lệ quản<i>/ Lacrimal irrigation</i>: Nước thoát tốt<i>/ Good drainage</i>: </div>
              <div><VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1091']" v-model="MASTERDATA['IPDMRPTL1091'].Items[0].Value"/></div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="fw600 on-top" rowspan="2">4. Lệ đạo<i>/ Nasolacrimal duct</i></td>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1093']"
              :listData="MASTERDATA['IPDMRPTR1093'].Items"
              :indexs="[0]"
              :noneDex="true"
              :showLabel="true"
              />
          </td>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1093']"
              :listData="MASTERDATA['IPDMRPTL1093'].Items"
              :indexs="[0]"
              :noneDex="true"
              :showLabel="true"
              />
          </td>
        </tr>
        <tr>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1093']"
              :listData="MASTERDATA['IPDMRPTR1093'].Items"
              :indexs="[1]"
              :noneDex="true"
              :showLabel="true"
              />
          </td>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1093']"
              :listData="MASTERDATA['IPDMRPTL1093'].Items"
              :indexs="[1]"
              :noneDex="true"
              :showLabel="true"
              />
          </td>
        </tr>
        <tr>
          <td class="fw600 on-top" rowspan="12">5. Mi mắt<i>/ Eyelid</i></td>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1096']"
              :listData="MASTERDATA['IPDMRPTR1096'].Items"
              :indexs="[0, 1, 2, 3]"
              :noneDex="true"
              :showLabel="true"
              styleCustom="margin-right: 20px!important;"
              />
          </td>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1096']"
              :listData="MASTERDATA['IPDMRPTL1096'].Items"
              :indexs="[0, 1, 2, 3]"
              :noneDex="true"
              :showLabel="true"
              styleCustom="margin-right: 20px!important;"
              />
          </td>
        </tr>
        <tr>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1096']"
              :listData="MASTERDATA['IPDMRPTR1096'].Items"
              :indexs="[4, 5]"
              :noneDex="true"
              :showLabel="true"
              styleCustom="margin-right: 20px!important;"
              />
          </td>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1096']"
              :listData="MASTERDATA['IPDMRPTL1096'].Items"
              :indexs="[4, 5]"
              :noneDex="true"
              :showLabel="true"
              styleCustom="margin-right: 20px!important;"
              />
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center">
              <div class="mrr10">Khác<i>/ Others</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTR1096']">{{MASTERDATA['IPDMRPTR1096'].Items[7].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td>
            <div class="flex align-center">
              <div class="mrr10">Khác<i>/ Others</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTL1096']">{{MASTERDATA['IPDMRPTL1096'].Items[7].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="mrb10" v-if="MASTERDATA['IPDMRPTR1109']">
              <div class="mrr10 inline">- U mi<i>/ Eyelid tumor</i>: </div>
              <div class="inline"><VTich :t4="true" v-model="MASTERDATA['IPDMRPTR1109'].Items[0].Value"/></div>
            </div>
            <div>
              <div class="mrr10 inline">Tính chất U<i>/ Properties of tumor</i>: </div>
              <div class="inline">{{MASTERDATA['IPDMRPTR1109'].Items[1].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td>
            <div class="mrb10" v-if="MASTERDATA['IPDMRPTL1109']">
              <div class="mrr10 inline">- U mi<i>/ Eyelid tumor</i>: </div>
              <div class="inline"><VTich :t4="true" v-model="MASTERDATA['IPDMRPTL1109'].Items[0].Value"/></div>
            </div>
            <div>
              <div class="mrr10 inline">Tính chất U<i>/ Properties of tumor</i>: </div>
              <div class="inline">{{MASTERDATA['IPDMRPTL1109'].Items[1].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center space-center">
              <div class="mrr10">Vị trí<i>/ Location</i>: </div>
              <div class="mrr20" v-if="MASTERDATA['IPDMRPTR1109']">{{MASTERDATA['IPDMRPTR1109'].Items[2].Value || '&emsp;&emsp;'}}</div>
              <div class="mrr10">Kích thước<i>/ Size</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTR1109']">{{MASTERDATA['IPDMRPTR1109'].Items[3].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td>
            <div class="flex align-center space-center">
              <div class="mrr10">Vị trí<i>/ Location</i>: </div>
              <div class="mrr20" v-if="MASTERDATA['IPDMRPTL1109']">{{MASTERDATA['IPDMRPTL1109'].Items[2].Value || '&emsp;&emsp;'}}</div>
              <div class="mrr10">Kích thước<i>/ Size</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTL1109']">{{MASTERDATA['IPDMRPTL1109'].Items[3].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div v-if="MASTERDATA['IPDMRPTR1096']">
              <div class="mrr20 inline">- Quặm<i>/ Entropion</i>: </div>
              <div class="mrr20 inline"><VTich :t4="true" class="mrr5" v-model="MASTERDATA['IPDMRPTR1096'].Items[8].Value"/> Có<i>/ Yes</i></div>
              <div><span class="mrr5 square-text inline" :class="{'hidden-text': MASTERDATA['IPDMRPTR1096'].Items[8].Value}">{{'&#10003;'}}</span>Không<i>/ No</i></div>
            </div>
          </td>
          <td>
            <div v-if="MASTERDATA['IPDMRPTL1096']">
              <div class="mrr20 inline">- Quặm<i>/ Entropion</i>: </div>
              <div class="mrr20 inline"><VTich :t4="true" class="mrr5" v-model="MASTERDATA['IPDMRPTL1096'].Items[8].Value"/> Có<i>/ Yes</i></div>
              <div><span class="mrr5 square-text inline" :class="{'hidden-text': MASTERDATA['IPDMRPTL1096'].Items[8].Value}">{{'&#10003;'}}</span>Không<i>/ No</i></div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center" v-if="MASTERDATA['IPDMRPTR1096']">
              <div class="mrr20">- Hở mi<i>/ Lagophthalmos</i>: </div>
              <div><VTich :t4="true" v-model="MASTERDATA['IPDMRPTR1096'].Items[9].Value"/></div>
            </div>
          </td>
          <td>
            <div class="flex align-center" v-if="MASTERDATA['IPDMRPTL1096']">
              <div class="mrr20">- Hở mi<i>/ Lagophthalmos</i>: </div>
              <div><VTich :t4="true" v-model="MASTERDATA['IPDMRPTL1096'].Items[9].Value"/></div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center" v-if="MASTERDATA['IPDMRPTR1096']">
              <div class="mrr20">- Trễ mi<i>/ Ectropion</i>: </div>
              <div><VTich :t4="true" v-model="MASTERDATA['IPDMRPTR1096'].Items[10].Value"/></div>
            </div>
          </td>
          <td>
            <div class="flex align-center" v-if="MASTERDATA['IPDMRPTL1096']">
              <div class="mrr20">- Trễ mi<i>/ Ectropion</i>: </div>
              <div><VTich :t4="true" v-model="MASTERDATA['IPDMRPTL1096'].Items[10].Value"/></div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div v-if="MASTERDATA['IPDMRPTR1114']">
              <div class="mrr20 inline inline">- Tuyến bờ mi<i>/ Meibominal gland</i>: </div>
              <div><span class="mrr5 italic inline">Bình thường<i>/ normal</i></span><VTich :t4="true" v-model="MASTERDATA['IPDMRPTR1114'].Items[0].Value"/></div>
            </div>
          </td>
          <td>
            <div v-if="MASTERDATA['IPDMRPTL1114']">
              <div class="mrr20 inline">- Tuyến bờ mi<i>/ Meibominal gland</i>: </div>
              <div><span class="mrr5 italic inline">Bình thường<i>/ normal</i></span><VTich :t4="true" v-model="MASTERDATA['IPDMRPTL1114'].Items[0].Value"/></div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1114']"
              :listData="MASTERDATA['IPDMRPTR1114'].Items"
              :indexs="[1, 2, 3]"
              :noneDex="true"
              :showLabel="true"
              class="italic"
              />
          </td>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1114']"
              :listData="MASTERDATA['IPDMRPTL1114'].Items"
              :indexs="[1, 2, 3]"
              :noneDex="true"
              :showLabel="true"
              class="italic"
              />
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center" v-if="MASTERDATA['IPDMRPTR1096']">
              <div class="mrr20">- Viêm bờ mi (chân lông mi)<i>/ Blepharitis (eyelash root)</i> </div>
              <div><VTich :t4="true" v-model="MASTERDATA['IPDMRPTR1096'].Items[11].Value"/></div>
            </div>
          </td>
          <td>
            <div class="flex align-center" v-if="MASTERDATA['IPDMRPTL1096']">
              <div class="mrr20">- Viêm bờ mi (chân lông mi)<i>/ Blepharitis (eyelash root)</i> </div>
              <div><VTich :t4="true" v-model="MASTERDATA['IPDMRPTL1096'].Items[11].Value"/></div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center">
              <div class="mrr10">- Tổn thương khác<i>/ Other lesions</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTR1119']">{{MASTERDATA['IPDMRPTR1119'].Items[1].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td>
            <div class="flex align-center">
              <div class="mrr10">- Tổn thương khác<i>/ Other lesions</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTL1119']">{{MASTERDATA['IPDMRPTL1119'].Items[1].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="fw600 on-top" rowspan="8">6. Kết mạc<i>/ Conjunctiva</i></td>
          <td>
            <div v-if="MASTERDATA['IPDMRPTR1122']">
              <div class="mrr20 inline">- Cương tụ<i>/ Congestion</i>: </div>
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1122']"
                :listData="MASTERDATA['IPDMRPTR1122'].Items"
                :indexs="[0]"
                :noneDex="true"
                :showLabel="true"
                class="mrr20 inline"
                />
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1122']"
                :listData="MASTERDATA['IPDMRPTR1122'].Items"
                :indexs="[1]"
                :noneDex="true"
                :showLabel="true"
                class="italic inline"
                />
            </div>
          </td>
          <td>
            <div v-if="MASTERDATA['IPDMRPTL1122']">
              <div class="mrr20 inline">- Cương tụ:<i>/ Congestion</i> </div>
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1122']"
                :listData="MASTERDATA['IPDMRPTL1122'].Items"
                :indexs="[0]"
                :noneDex="true"
                :showLabel="true"
                class="mrr20 inline"
                />
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1122']"
                :listData="MASTERDATA['IPDMRPTL1122'].Items"
                :indexs="[1]"
                :noneDex="true"
                :showLabel="true"
                class="italic inline"
                />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex" v-if="MASTERDATA['IPDMRPTR1122']">
              <div class="mrr5 pdt4">- </div>
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1122']"
                :listData="MASTERDATA['IPDMRPTR1122'].Items"
                :indexs="[2, 3, 4]"
                :noneDex="true"
                :showLabel="true"
                styleCustom="margin-right: 5px!important;"
                />
            </div>
          </td>
          <td>
            <div class="flex" v-if="MASTERDATA['IPDMRPTL1122']">
              <div class="mrr5 pdt4">- </div>
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1122']"
                :listData="MASTERDATA['IPDMRPTL1122'].Items"
                :indexs="[2, 3, 4]"
                :noneDex="true"
                :showLabel="true"
                styleCustom="margin-right: 5px!important;"
                />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex" v-if="MASTERDATA['IPDMRPTR1122']">
              <div class="mrr5 pdt4">- </div>
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1122']"
                :listData="MASTERDATA['IPDMRPTR1122'].Items"
                :indexs="[5, 6, 7]"
                :noneDex="true"
                :showLabel="true"
                />
            </div>
          </td>
          <td>
            <div class="flex" v-if="MASTERDATA['IPDMRPTL1122']">
              <div class="mrr5 pdt4">- </div>
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1122']"
                :listData="MASTERDATA['IPDMRPTL1122'].Items"
                :indexs="[5, 6, 7]"
                :noneDex="true"
                :showLabel="true"
                />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <div class="mrr20">- U kết mạc<i>/ Conjunctival tumor</i>: </div>
              <div class="italic mrr10 inline">+ Tính chất<i>/ Properties</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTR1131']" class="inline">{{MASTERDATA['IPDMRPTR1131'].Items[1].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td>
            <div>
              <div class="mrr20">- U kết mạc<i>/ Conjunctival tumor</i>: </div>
              <div class="italic mrr10 inline">+ Tính chất<i>/ Properties</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTL1131']" class="inline">{{MASTERDATA['IPDMRPTL1131'].Items[1].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center">
              <div class="mrr10" style="margin-left: 96px;">+ Vị trí<i>/ Location</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTR1131']">{{MASTERDATA['IPDMRPTR1131'].Items[2].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td>
            <div class="flex align-center">
              <div class="mrr10" style="margin-left: 96px;">+ Vị trí<i>/ Location</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTL1131']">{{MASTERDATA['IPDMRPTL1131'].Items[2].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center">
              <div class="mrr10" style="margin-left: 96px;">+ Kích thước<i>/ Size</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTR1131']">{{MASTERDATA['IPDMRPTR1131'].Items[3].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td>
            <div class="flex align-center">
              <div class="mrr10" style="margin-left: 96px;">+ Kích thước<i>/ Size</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTL1131']">{{MASTERDATA['IPDMRPTL1131'].Items[3].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div v-if="MASTERDATA['IPDMRPTR1136']">
              <div class="mrr10 inline" style="width: 100px;padding-top: 4px;">- Cùng đồ<i>/ Fornix</i>: </div>
              <VTich :t4="true"
                :showLabel="true"
                :noneDex="true"
                :indexs="[0, 1, 2]"
                :listData="MASTERDATA['IPDMRPTR1136'].Items"
                class="italic inline"
                :initial="[0]"
                styleCustom="margin-right: 15px!important;"
                />
            </div>
          </td>
          <td>
            <div v-if="MASTERDATA['IPDMRPTL1136']">
              <div class="mrr10 inline" style="width: 100px;padding-top: 4px;">- Cùng đồ<i>/ Fornix</i>: </div>
              <VTich :t4="true"
                :showLabel="true"
                :noneDex="true"
                :indexs="[0, 1, 2]"
                :listData="MASTERDATA['IPDMRPTL1136'].Items"
                class="italic inline"
                :initial="[0]"
                styleCustom="margin-right: 15px!important;"
                />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center">
              <div class="mrr10">- Tổn thương khác<i>/ Other lesions</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTR1140']">{{MASTERDATA['IPDMRPTR1140'].Items[1].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td>
            <div class="flex align-center">
              <div class="mrr10">- Tổn thương khác<i>/ Other lesions</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTL1140']">{{MASTERDATA['IPDMRPTL1140'].Items[1].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="fw600 on-top" rowspan="23">7. Giác mạc<i>/ Cornea</i></td>
          <td>
            <VUpload2
              code="IPDMRPTR1143"
              :widthImg="'400px'"
              v-if="MASTERDATA['IPDMRPTR1143']"
              planUpdate="Bác sĩ tải hình ảnh tại đây (cho phép tải 1 hoặc nhiều ảnh)"
              :dataImg="MASTERDATA['IPDMRPTR1143'].Items[0]"
              :index="[5, 6]"
              :bgImg="'static/bgrTaiMat.png'"
              :print="true"
              :dataDropfile="dataDropfile"
              />
          </td>
          <td>
            <VUpload2
              code="IPDMRPTL1143"
              :widthImg="'400px'"
              v-if="MASTERDATA['IPDMRPTL1143']"
              planUpdate="Bác sĩ tải hình ảnh tại đây (cho phép tải 1 hoặc nhiều ảnh)"
              :dataImg="MASTERDATA['IPDMRPTL1143'].Items[0]"
              :index="[7, 8]"
              :bgImg="'static/bgrTaiMat.png'"
              :print="true"
              />
          </td>
        </tr>
        <tr>
          <td>
            <div v-if="MASTERDATA['IPDMRPTR1662']">
              <div class="mrr10 inline" style="width: 105px;">- Kích thước<i>/ Size</i>: </div>
              <VTich :t4="true"
                :showLabel="true"
                :noneDex="true"
                :listData="MASTERDATA['IPDMRPTR1662'].Items"
                class="italic inline"
                styleCustom="margin-right: 0px;"
                />
            </div>
          </td>
          <td>
            <div v-if="MASTERDATA['IPDMRPTL1662']">
              <div class="mrr10 inline" style="width: 105px;">- Kích thước<i>/ Size</i>: </div>
              <VTich :t4="true"
                :showLabel="true"
                :noneDex="true"
                :listData="MASTERDATA['IPDMRPTL1662'].Items"
                class="italic inline"
                styleCustom="margin-right: 0px;"
                />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div v-if="MASTERDATA['IPDMRPTR1666']">
              <div class="mrr10 inline" style="width: 105px;">- Hình dạng<i>/ Shape</i>: </div>
              <VTich :t4="true"
                :showLabel="true"
                :noneDex="true"
                :listData="MASTERDATA['IPDMRPTR1666'].Items"
                class="italic inline"
                styleCustom="margin-right: 0px;"
                />
            </div>
          </td>
          <td>
            <div v-if="MASTERDATA['IPDMRPTL1666']">
              <div class="mrr10 inline" style="width: 105px;">- Hình dạng<i>/ Shape</i>: </div>
              <VTich :t4="true"
                :showLabel="true"
                :noneDex="true"
                :listData="MASTERDATA['IPDMRPTL1666'].Items"
                class="italic inline"
                styleCustom="margin-right: 0px;"
                />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div v-if="MASTERDATA['IPDMRPTR1154']">
              <div class="mrr10 inline" style="width: 100px;">- Biểu mô<i>/ Epithelium</i>: </div>
              <VTich :t4="true"
                :showLabel="true"
                :noneDex="true"
                :indexs="[0, 1]"
                :listData="MASTERDATA['IPDMRPTR1154'].Items"
                class="italic inline"
                styleCustom="display: block;"
                />
            </div>
          </td>
          <td>
            <div v-if="MASTERDATA['IPDMRPTL1154']">
              <div class="mrr10 inline" style="width: 100px;">- Biểu mô<i>/ Epithelium</i>: </div>
              <VTich :t4="true"
                :showLabel="true"
                :noneDex="true"
                :indexs="[0, 1]"
                :listData="MASTERDATA['IPDMRPTL1154'].Items"
                class="italic inline"
                styleCustom="display: block;"
                />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div v-if="MASTERDATA['IPDMRPTR1154']">
              <div class="mrr5 italic inline" style="width: 170px;">+ Phù bọng biểu mô<i>/ Bullous epithelial edema</i>: </div>
              <VTich :t4="true"
                :showLabel="true"
                :noneDex="true"
                :listData="MASTERDATA['IPDMRPTR1159'].Items"
                class="italic inline"
                />
            </div>
          </td>
          <td>
            <div v-if="MASTERDATA['IPDMRPTL1154']">
              <div class="mrr5 italic inline" style="width: 170px;">+ Phù bọng biểu mô<i>/ Bullous epithelial edema</i>: </div>
              <VTich :t4="true"
                :showLabel="true"
                :noneDex="true"
                :listData="MASTERDATA['IPDMRPTL1159'].Items"
                class="italic inline"
                />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div v-if="MASTERDATA['IPDMRPTR1163']">
              <div class="italic inline" style="min-width: 108px;">+ Bờ tổn thương<i>/ Margins of lesion</i> </div>
              <VTich :t4="true"
                :showLabel="true"
                :noneDex="true"
                :listData="MASTERDATA['IPDMRPTR1163'].Items"
                class="italic inline"
                styleCustom="margin-right: 0px!important;"
                />
            </div>
          </td>
          <td>
            <div v-if="MASTERDATA['IPDMRPTL1163']">
              <div class="italic inline" style="min-width: 108px;">+ Bờ tổn thương<i>/ Margins of lesion</i> </div>
              <VTich :t4="true"
                :showLabel="true"
                :noneDex="true"
                :listData="MASTERDATA['IPDMRPTL1163'].Items"
                class="italic inline"
                styleCustom="margin-right: 0px!important;"
                />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center">
              <div style="margin-right: 2px;">+</div>
              <VTich :t4="true"
                v-if="MASTERDATA['IPDMRPTR1167']"
                :showLabel="true"
                :noneDex="true"
                :listData="MASTERDATA['IPDMRPTR1167'].Items"
                class="italic"
                styleCustom="margin-right: 0px!important;"
                />
            </div>
          </td>
          <td>
            <div class="flex align-center">
              <div style="margin-right: 2px;">+</div>
              <VTich :t4="true"
                v-if="MASTERDATA['IPDMRPTL1167']"
                :showLabel="true"
                :noneDex="true"
                :listData="MASTERDATA['IPDMRPTL1167'].Items"
                class="italic"
                styleCustom="margin-right: 0px!important;"
                />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center">
              <div class="italic mrr10">+ Tổn thương khác<i>/ Other lesions</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTR1154']">{{MASTERDATA['IPDMRPTR1154'].Items[3].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td>
            <div class="flex align-center">
              <div class="italic mrr10">+ Tổn thương khác<i>/ Other lesions</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTL1154']">{{MASTERDATA['IPDMRPTL1154'].Items[3].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <div class="mrr10 inline">- Nhu mô<i>/ Stroma</i>: </div>
              <VTich :t4="true"
                v-if="MASTERDATA['IPDMRPTR1170']"
                :showLabel="true"
                :noneDex="true"
                :listData="MASTERDATA['IPDMRPTR1170'].Items"
                :indexs="[0, 1]"
                class="italic inline"
                />
            </div>
          </td>
          <td>
            <div>
              <div class="mrr10 inline">- Nhu mô<i>/ Stroma</i>: </div>
              <VTich :t4="true"
                v-if="MASTERDATA['IPDMRPTL1170']"
                :showLabel="true"
                :noneDex="true"
                :listData="MASTERDATA['IPDMRPTL1170'].Items"
                :indexs="[0, 1]"
                class="italic inline"
                />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <div class="mrr10 italic inline">+ Thẩm lậu<i>/ Infiltration</i>: </div>
              <VTich :t4="true"
                v-if="MASTERDATA['IPDMRPTR1176']"
                :showLabel="true"
                :noneDex="true"
                :listData="MASTERDATA['IPDMRPTR1176'].Items"
                class="italic inline"
                styleCustom="margin-right: 0px!important;"
                />
            </div>
          </td>
          <td>
            <div>
              <div class="mrr10 italic inline">+ Thẩm lậu<i>/ Infiltration</i>: </div>
              <VTich :t4="true"
                v-if="MASTERDATA['IPDMRPTL1176']"
                :showLabel="true"
                :noneDex="true"
                :listData="MASTERDATA['IPDMRPTL1176'].Items"
                class="italic inline"
                styleCustom="margin-right: 0px!important;"
                />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <VTich :t4="true"
              v-if="MASTERDATA['IPDMRPTR1180']"
              :showLabel="true"
              :noneDex="true"
              :listData="MASTERDATA['IPDMRPTR1180'].Items"
              class="italic"
              styleCustom="margin-right: 5px!important;"
              />
          </td>
          <td>
            <VTich :t4="true"
              v-if="MASTERDATA['IPDMRPTL1180']"
              :showLabel="true"
              :noneDex="true"
              :listData="MASTERDATA['IPDMRPTL1180'].Items"
              class="italic"
              styleCustom="margin-right: 5px!important;"
              />
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center">
              <div class="italic mrr10">+ Tổn thương khác<i>/ Other lesions</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTR1170']">{{MASTERDATA['IPDMRPTR1170'].Items[4].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td>
            <div class="flex align-center">
              <div class="italic mrr10">+ Tổn thương khác<i>/ Other lesions</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTL1170']">{{MASTERDATA['IPDMRPTL1170'].Items[4].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <div class="mrr10 inline">- Nội mô & Descemet<i>/ Endothelium&Descemet</i>: </div>
              <VTich :t4="true"
                v-if="MASTERDATA['IPDMRPTR1184']"
                :showLabel="true"
                :noneDex="true"
                :indexs=[0]
                :listData="MASTERDATA['IPDMRPTR1184'].Items"
                class="italic inline"
                />
            </div>
          </td>
          <td>
            <div>
              <div class="mrr10 inline">- Nội mô & Descemet<i>/ Endothelium&Descemet</i>: </div>
              <VTich :t4="true"
                v-if="MASTERDATA['IPDMRPTL1184']"
                :showLabel="true"
                :noneDex="true"
                :indexs="[0]"
                :listData="MASTERDATA['IPDMRPTL1184'].Items"
                class="italic inline"
                />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <VTich :t4="true"
              v-if="MASTERDATA['IPDMRPTR1184']"
              :showLabel="true"
              :noneDex="true"
              :indexs="[1, 2]"
              :listData="MASTERDATA['IPDMRPTR1184'].Items"
              class="italic"
              styleCustom="margin-right: 5px!important;"
              />
          </td>
          <td>
            <VTich :t4="true"
              v-if="MASTERDATA['IPDMRPTL1184']"
              :showLabel="true"
              :noneDex="true"
              :indexs="[1, 2]"
              :listData="MASTERDATA['IPDMRPTL1184'].Items"
              class="italic"
              styleCustom="margin-right: 5px!important;"
              />
          </td>
        </tr>
        <tr>
          <td>
            <VTich :t4="true"
              v-if="MASTERDATA['IPDMRPTR1184']"
              :showLabel="true"
              :noneDex="true"
              :indexs="[3, 4, 5]"
              :listData="MASTERDATA['IPDMRPTR1184'].Items"
              class="italic"
              styleCustom="margin-right: 10px!important;"
              />
          </td>
          <td>
            <VTich :t4="true"
              v-if="MASTERDATA['IPDMRPTL1184']"
              :showLabel="true"
              :noneDex="true"
              :indexs="[3, 4, 5]"
              :listData="MASTERDATA['IPDMRPTL1184'].Items"
              class="italic"
              styleCustom="margin-right: 10px!important;"
              />
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center">
              <div class="italic mrr10">+ Tổn thương khác<i>/ Other lesions</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTR1184']">{{MASTERDATA['IPDMRPTR1184'].Items[7].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td>
            <div class="flex align-center">
              <div class="italic mrr10">+ Tổn thương khác<i>/ Other lesions</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTL1184']">{{MASTERDATA['IPDMRPTL1184'].Items[7].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <div class="flex">
                <div class="mrr5 pdt4">-</div>
                <VTich :t4="true"
                  v-if="MASTERDATA['IPDMRPTR1193']"
                  :showLabel="true"
                  :noneDex="true"
                  :indexs="[0, 1]"
                  :listData="MASTERDATA['IPDMRPTR1193'].Items"
                  class="italic"
                  />
              </div>
            </div>
          </td>
          <td>
            <div>
              <div class="flex">
                <div class="mrr5 pdt4">-</div>
                <VTich :t4="true"
                  v-if="MASTERDATA['IPDMRPTL1193']"
                  :showLabel="true"
                  :noneDex="true"
                  :indexs="[0, 1]"
                  :listData="MASTERDATA['IPDMRPTL1193'].Items"
                  class="italic"
                  />
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <div class="mrr5" style="min-width: 112px;">- Thủng giác mạc<i>/ Corneal perforation</i>: </div>
              <VTich :t4="true"
                v-if="MASTERDATA['IPDMRPTR1197']"
                :showLabel="true"
                :noneDex="true"
                :listData="MASTERDATA['IPDMRPTR1197'].Items"
                class="italic inline"
                styleCustom="margin-right: 0px!important;"
                />
            </div>
          </td>
          <td>
            <div>
              <div class="mrr5" style="min-width: 112px;">- Thủng giác mạc<i>/ Corneal perforation</i>: </div>
              <VTich :t4="true"
                v-if="MASTERDATA['IPDMRPTL1197']"
                :showLabel="true"
                :noneDex="true"
                :listData="MASTERDATA['IPDMRPTL1197'].Items"
                class="italic inline"
                styleCustom="margin-right: 0px!important;"
                />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div v-if="MASTERDATA['IPDMRPTR1201']">
              <VTich :t4="true"
                :showLabel="true"
                :noneDex="true"
                :indexs="[0]"
                :listData="MASTERDATA['IPDMRPTR1201'].Items"
                class="italic"
              />
              <div>
                <div class="mrr5 inline">Đường kính thủng<i>/ Perforation diameter</i></div>
                <VTich :t4="true"
                  :showData="true"
                  v-model="MASTERDATA['IPDMRPTR1201'].Items[2].Value"
                  class="mrr5 inline"
                  />
                <div class="inline">mm</div>
              </div>
            </div>
            <VTich :t4="true"
              v-if="MASTERDATA['IPDMRPTR1201']"
              :showLabel="true"
              :noneDex="true"
              :indexs="[3]"
              :listData="MASTERDATA['IPDMRPTR1201'].Items"
              class="italic"
              />
          </td>
          <td>
            <div v-if="MASTERDATA['IPDMRPTL1201']">
              <VTich :t4="true"
                :showLabel="true"
                :noneDex="true"
                :indexs="[0]"
                :listData="MASTERDATA['IPDMRPTL1201'].Items"
                class="italic"
              />
              <div>
                <div class="mrr5 inline">Đường kính thủng<i>/ Perforation diameter</i></div>
                <VTich :t4="true"
                  :showData="true"
                  v-model="MASTERDATA['IPDMRPTL1201'].Items[2].Value"
                  class="mrr5 inline"
                  />
                <div class="inline">mm</div>
              </div>
            </div>
            <VTich :t4="true"
              v-if="MASTERDATA['IPDMRPTL1201']"
              :showLabel="true"
              :noneDex="true"
              :indexs="[3]"
              :listData="MASTERDATA['IPDMRPTL1201'].Items"
              class="italic"
              />
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <div class="mrr10 inline" style="min-width: 132px;">- Cảm giác giác mạc<i>/ Corneal reflex</i>: </div>
              <VTich :t4="true"
                v-if="MASTERDATA['IPDMRPTR1206']"
                :showLabel="true"
                :noneDex="true"
                :listData="MASTERDATA['IPDMRPTR1206'].Items"
                class="italic inline"
                />
            </div>
          </td>
          <td>
            <div>
              <div class="mrr10 inline" style="min-width: 132px;">- Cảm giác giác mạc<i>/ Corneal reflex</i>: </div>
              <VTich :t4="true"
                v-if="MASTERDATA['IPDMRPTL1206']"
                :showLabel="true"
                :noneDex="true"
                :listData="MASTERDATA['IPDMRPTL1206'].Items"
                class="italic inline"
                />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <div class="mrr5" style="min-width: 87px;">- Tân mạch<i>/ Neovascularization</i>:</div>
              <div class="inline">+ </div>
              <VTich :t4="true"
                v-if="MASTERDATA['IPDMRPTR1210']"
                :showLabel="true"
                :noneDex="true"
                :indexs="[0]"
                :listData="MASTERDATA['IPDMRPTR1210'].Items"
                class="italic inline"
                />
            </div>
            <VTich :t4="true"
              v-if="MASTERDATA['IPDMRPTR1210']"
              :showLabel="true"
              :noneDex="true"
              :indexs="[1, 2]"
              :listData="MASTERDATA['IPDMRPTR1210'].Items"
              class="italic"
              />
          </td>
          <td>
            <div>
              <div class="mrr5" style="min-width: 87px;">- Tân mạch<i>/ Neovascularization</i>:</div>
              <div class="inline">+ </div>
              <VTich :t4="true"
                v-if="MASTERDATA['IPDMRPTL1210']"
                :showLabel="true"
                :noneDex="true"
                :indexs="[0]"
                :listData="MASTERDATA['IPDMRPTL1210'].Items"
                class="italic inline"
                />
            </div>
            <VTich :t4="true"
              v-if="MASTERDATA['IPDMRPTL1210']"
              :showLabel="true"
              :noneDex="true"
              :indexs="[1, 2]"
              :listData="MASTERDATA['IPDMRPTL1210'].Items"
              class="italic"
              />
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <div class="mrr5" style="min-width: 127px;">- Vùng rìa giác mạc<i>/ Limbus</i>: </div>
              <VTich :t4="true"
                v-if="MASTERDATA['IPDMRPTR1214']"
                :showLabel="true"
                :noneDex="true"
                :listData="MASTERDATA['IPDMRPTR1214'].Items"
                class="italic inline"
                />
            </div>
          </td>
          <td>
            <div>
              <div class="mrr5" style="min-width: 127px;">- Vùng rìa giác mạc<i>/ Limbus</i>: </div>
              <VTich :t4="true"
                v-if="MASTERDATA['IPDMRPTL1214']"
                :showLabel="true"
                :noneDex="true"
                :listData="MASTERDATA['IPDMRPTL1214'].Items"
                class="italic inline"
                />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center">
              <div class="mrr10">- Bất thường khác<i>/ Other abnormalities</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTR1217']">{{MASTERDATA['IPDMRPTR1217'].Items[1].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td>
            <div class="flex align-center">
              <div class="mrr10">- Bất thường khác<i>/ Other abnormalities</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTL1217']">{{MASTERDATA['IPDMRPTL1217'].Items[1].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="fw600 on-top" rowspan="5">8. Củng mạc<i>/ Sclera</i></td>
          <td>
            <div>
              <div class="mrr10">- Viêm<i>/ inflamation</i>:</div>
              <div class="flex">
                <div class="mrr5" style="padding-top: 4px;">+</div>
                <VTich :t4="true"
                  v-if="MASTERDATA['IPDMRPTR1227']"
                  :showLabel="true"
                  :noneDex="true"
                  :indexs="[0, 1, 2]"
                  :listData="MASTERDATA['IPDMRPTR1227'].Items"
                  class="italic inline"
                  />
              </div>
            </div>
          </td>
          <td>
            <div>
              <div class="mrr10">- Viêm<i>/ inflamation</i>:</div>
              <div class="flex">
                <div class="mrr5" style="padding-top: 4px;">+</div>
                <VTich :t4="true"
                  v-if="MASTERDATA['IPDMRPTL1227']"
                  :showLabel="true"
                  :noneDex="true"
                  :indexs="[0, 1, 2]"
                  :listData="MASTERDATA['IPDMRPTL1227'].Items"
                  class="italic inline"
                  />
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <div class="inline">+</div>
              <VTich :t4="true"
                v-if="MASTERDATA['IPDMRPTR1227']"
                :showLabel="true"
                :noneDex="true"
                :indexs="[3, 4]"
                :listData="MASTERDATA['IPDMRPTR1227'].Items"
                class="italic inline"
                />
            </div>
          </td>
          <td>
            <div>
              <div class="inline">+</div>
              <VTich :t4="true"
                v-if="MASTERDATA['IPDMRPTL1227']"
                :showLabel="true"
                :noneDex="true"
                :indexs="[3, 4]"
                :listData="MASTERDATA['IPDMRPTL1227'].Items"
                class="italic inline"
                />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center">
              <div class="mrr5">- </div>
              <VTich :t4="true"
                v-if="MASTERDATA['IPDMRPTR1220']"
                :showLabel="true"
                :noneDex="true"
                :indexs="[1]"
                :listData="MASTERDATA['IPDMRPTR1220'].Items"
                />
            </div>
          </td>
          <td>
            <div class="flex align-center">
              <div class="mrr5">- </div>
              <VTich :t4="true"
                v-if="MASTERDATA['IPDMRPTL1220']"
                :showLabel="true"
                :noneDex="true"
                :indexs="[1]"
                :listData="MASTERDATA['IPDMRPTL1220'].Items"
                />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex">
              <div class="mrr5 pdt4">- </div>
              <VTich :t4="true"
                v-if="MASTERDATA['IPDMRPTR1220']"
                :showLabel="true"
                :noneDex="true"
                :indexs="[2, 3, 4]"
                :listData="MASTERDATA['IPDMRPTR1220'].Items"
                />
            </div>
          </td>
          <td>
            <div class="flex">
              <div class="mrr5 pdt4">- </div>
              <VTich :t4="true"
              v-if="MASTERDATA['IPDMRPTL1220']"
              :showLabel="true"
              :noneDex="true"
              :indexs="[2, 3, 4]"
              :listData="MASTERDATA['IPDMRPTL1220'].Items"
              />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center">
              <div class="mrr10">- Chi tiết khác<i>/ Other findings</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTR1220']">{{MASTERDATA['IPDMRPTR1220'].Items[6].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td>
            <div class="flex align-center">
              <div class="mrr10">- Chi tiết khác<i>/ Other findings</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTL1220']">{{MASTERDATA['IPDMRPTL1220'].Items[6].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="fw600 on-top" rowspan="6"><div style="text-align: initial;">9. Tiền phòng<i>/ Anterior chamber (anterior chamber angle)</i> (Góc TP<i>/ anterior chamber angle</i>)</div></td>
          <td>
            <div class="flex">
              <div class="mrr5 pdt4">- </div>
              <VTich :t4="true"
                v-if="MASTERDATA['IPDMRPTR1650']"
                :showLabel="true"
                :noneDex="true"
                :indexs="[0, 1, 2]"
                :listData="MASTERDATA['IPDMRPTR1650'].Items"
                />
            </div>
            <VTich :t4="true"
              v-if="MASTERDATA['IPDMRPTR1650']"
              :showLabel="true"
              :noneDex="true"
              :indexs="[3]"
              :listData="MASTERDATA['IPDMRPTR1650'].Items"
              />
          </td>
          <td>
            <div class="flex">
              <div class="mrr5 pdt4">- </div>
              <VTich :t4="true"
                v-if="MASTERDATA['IPDMRPTL1650']"
                :showLabel="true"
                :noneDex="true"
                :indexs="[0, 1, 2]"
                :listData="MASTERDATA['IPDMRPTL1650'].Items"
                class="inline"
                />
            </div>
            <VTich :t4="true"
              v-if="MASTERDATA['IPDMRPTL1650']"
              :showLabel="true"
              :noneDex="true"
              :indexs="[3]"
              :listData="MASTERDATA['IPDMRPTL1650'].Items"
              />
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center">
              <div v-if="MASTERDATA['IPDMRPTR1241']" class="mrr5">{{MASTERDATA['IPDMRPTR1241'].Items[0].Value || '&emsp;&emsp;'}}</div>
              <div>mm &#60;1/4. 1/4.1/2.≥GM</div>
            </div>
          </td>
          <td>
            <div class="flex align-center">
              <div v-if="MASTERDATA['IPDMRPTL1241']" class="mrr5">{{MASTERDATA['IPDMRPTL1241'].Items[0].Value || '&emsp;&emsp;'}}</div>
              <div>mm &#60;1/4. 1/4.1/2.≥GM</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <div class="mrr5 inline">Mủ<i>/ Pus</i></div>
              <div class="mrr5 inline" v-if="MASTERDATA['IPDMRPTR1243']">
                <VTich :t4="true"
                  :showData="true"
                  :indexs="[1]"
                  v-model="MASTERDATA['IPDMRPTR1243'].Items[1].Value"
                  class="inline"
                  />
              </div>
              <span class="mrr10 inline">mm</span>
              <VTich :t4="true"
                v-if="MASTERDATA['IPDMRPTR1251']"
                :showLabel="true"
                :noneDex="true"
                :indexs="[0]"
                :listData="MASTERDATA['IPDMRPTR1251'].Items"
                style="min-width: 129px;"
                class="inline"
                />
            </div>
            <VTich :t4="true"
              v-if="MASTERDATA['IPDMRPTR1249']"
              :showLabel="true"
              :noneDex="true"
              :indexs="[0]"
              :listData="MASTERDATA['IPDMRPTR1249'].Items"
              />
          </td>
          <td>
            <div>
              <div class="mrr5 inline">Mủ<i>/ Pus</i></div>
              <div class="mrr5 inline" v-if="MASTERDATA['IPDMRPTL1243']">
                <VTich :t4="true"
                  :showData="true"
                  :indexs="[1]"
                  v-model="MASTERDATA['IPDMRPTL1243'].Items[1].Value"
                  />
              </div>
              <span class="mrr10 inline">mm</span>
              <VTich :t4="true"
                v-if="MASTERDATA['IPDMRPTL1251']"
                :showLabel="true"
                :noneDex="true"
                :indexs="[0]"
                :listData="MASTERDATA['IPDMRPTL1251'].Items"
                style="min-width: 129px;"
                class="inline"
                />
            </div>
            <VTich :t4="true"
              v-if="MASTERDATA['IPDMRPTL1249']"
              :showLabel="true"
              :noneDex="true"
              :indexs="[0]"
              :listData="MASTERDATA['IPDMRPTL1249'].Items"
              />
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center" v-if="MASTERDATA['IPDMRPTR1246']">
              <div class="mrr5">- Máu<i>/ blood</i> </div>
              <div class="mrr5">
                <VTich :t4="true"
                  :showData="true"
                  :indexs="[1]"
                  v-model="MASTERDATA['IPDMRPTR1246'].Items[1].Value"
                  />
              </div>
              <div>mm</div>
            </div>
          </td>
          <td>
            <div class="flex align-center" v-if="MASTERDATA['IPDMRPTL1246']">
              <div class="mrr5">- Máu<i>/ blood</i> </div>
              <div class="mrr5">
                <VTich :t4="true"
                  :showData="true"
                  :indexs="[1]"
                  v-model="MASTERDATA['IPDMRPTL1246'].Items[1].Value"
                  />
              </div>
              <div>mm</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <VUpload2
              code="IPDMRPTR1253"
              :widthImg="'400px'"
              v-if="MASTERDATA['IPDMRPTR1253']"
              planUpdate="Bác sĩ tải hình ảnh tại đây (cho phép tải 1 hoặc nhiều ảnh)"
              :dataImg="MASTERDATA['IPDMRPTR1253'].Items[0]"
              :index="[1, 2]"
              :bgImg="'static/bgrTaiMat2.png'"
              :print="true"
              :dataDropfile="dataDropfile"
              />
          </td>
          <td>
            <VUpload2
              code="IPDMRPTL1253"
              :widthImg="'400px'"
              v-if="MASTERDATA['IPDMRPTL1253']"
              planUpdate="Bác sĩ tải hình ảnh tại đây (cho phép tải 1 hoặc nhiều ảnh)"
              :dataImg="MASTERDATA['IPDMRPTL1253'].Items[0]"
              :index="[3, 4]"
              :bgImg="'static/bgrTaiMat2.png'"
              :print="true"
              :dataDropfile="dataDropfile"
              />
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center">
              <div class="mrr10">- Tổn thương khác<i>/ Other lesions</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTR1650']">{{MASTERDATA['IPDMRPTR1650'].Items[5].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td>
            <div class="flex align-center">
              <div class="mrr10">- Tổn thương khác<i>/ Other lesions</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTL1650']">{{MASTERDATA['IPDMRPTL1650'].Items[5].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="fw600 on-top" rowspan="3">10. Mống mắt<i>/ Iris</i></td>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1256']"
              :listData="MASTERDATA['IPDMRPTR1256'].Items"
              :indexs="[0, 1]"
              :noneDex="true"
              :showLabel="true"
              />
          </td>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1256']"
              :listData="MASTERDATA['IPDMRPTL1256'].Items"
              :indexs="[0, 1]"
              :noneDex="true"
              :showLabel="true"
              />
          </td>
        </tr>
        <tr>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1256']"
              :listData="MASTERDATA['IPDMRPTR1256'].Items"
              :indexs="[2]"
              :noneDex="true"
              :showLabel="true"
            />
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1256']"
              :listData="MASTERDATA['IPDMRPTR1256'].Items"
              :indexs="[3]"
              :noneDex="true"
              :showLabel="true"
            />
          </td>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1256']"
              :listData="MASTERDATA['IPDMRPTL1256'].Items"
              :indexs="[2]"
              :noneDex="true"
              :showLabel="true"
            />
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1256']"
              :listData="MASTERDATA['IPDMRPTL1256'].Items"
              :indexs="[3]"
              :noneDex="true"
              :showLabel="true"
            />
          </td>
        </tr>
        <tr>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1256']"
              :listData="MASTERDATA['IPDMRPTR1256'].Items"
              :indexs="[4, 5]"
              :noneDex="true"
              :showLabel="true"
            />
          </td>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1256']"
              :listData="MASTERDATA['IPDMRPTL1256'].Items"
              :indexs="[4, 5]"
              :noneDex="true"
              :showLabel="true"
            />
          </td>
        </tr>
        <tr>
          <td class="fw600 on-top" rowspan="5">11. Đồng tử<i>/ Pupil</i></td>
          <td>
            <div class="flex align-center">
              <div class="mrr10">Đường kính<i>/ Diameter</i>:</div>
              <div v-if="MASTERDATA['IPDMRPTR1263']" class="mrr5">{{MASTERDATA['IPDMRPTR1263'].Items[0].Value || '&emsp;&emsp;&emsp;'}}</div>
              <div>mm</div>
            </div>
          </td>
          <td>
            <div class="flex align-center">
              <div class="mrr10">Đường kính<i>/ Diameter</i>:</div>
              <div v-if="MASTERDATA['IPDMRPTL1263']" class="mrr5">{{MASTERDATA['IPDMRPTL1263'].Items[0].Value || '&emsp;&emsp;&emsp;'}}</div>
              <div>mm</div>
            </div>
          </td>
        </tr>
        <tr>
          <td v-if="MASTERDATA['IPDMRPTR1265']">
            <div class="flex">
              <div class="mrr5" style="padding-top: 4px">-</div>
              <VTich :t4="true"
                :listData="MASTERDATA['IPDMRPTR1265'].Items"
                :indexs="[0, 1, 2]"
                :noneDex="true"
                :showLabel="true"
                class="inline"
              />
            </div>
            <div class="flex align-center">
              <div class="mrr10">Vị trí dính<i>/ Adhesive location</i>: </div>
              <div>{{MASTERDATA['IPDMRPTR1265'].Items[3].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td v-if="MASTERDATA['IPDMRPTL1265']">
            <div class="flex">
              <div class="mrr5" style="padding-top: 4px">-</div>
              <VTich :t4="true"
                :listData="MASTERDATA['IPDMRPTL1265'].Items"
                :indexs="[0, 1, 2]"
                :noneDex="true"
                :showLabel="true"
                class="inline"
              />
            </div>
            <div class="flex align-center">
              <div class="mrr10">Vị trí dính<i>/ Adhesive location</i>: </div>
              <div>{{MASTERDATA['IPDMRPTL1265'].Items[3].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div v-if="MASTERDATA['IPDMRPTR1270']">
              <div class="mrr10 inline">- Phản xạ<i>/ light reflex</i>:</div>
              <VTich :t4="true"
                :listData="MASTERDATA['IPDMRPTR1270'].Items"
                :noneDex="true"
                :showLabel="true"
                class="inline"
              />
            </div>
          </td>
          <td>
            <div v-if="MASTERDATA['IPDMRPTL1270']">
              <div class="mrr10 inline">- Phản xạ<i>/ light reflex</i>:</div>
              <VTich :t4="true"
                :listData="MASTERDATA['IPDMRPTL1270'].Items"
                :noneDex="true"
                :showLabel="true"
                class="inline"
              />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div v-if="MASTERDATA['IPDMRPTR1274']">
              <div class="mrr20 inline">- Ánh đồng tử<i>/ red reflex</i>:</div>
              <VTich :t4="true"
                :listData="MASTERDATA['IPDMRPTR1274'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[0, 1]"
                class="inline"
              />
            </div>
            <VTich :t4="true"
              :listData="MASTERDATA['IPDMRPTR1274'].Items"
              :noneDex="true"
              :showLabel="true"
              :indexs="[2]"
              />
          </td>
          <td>
            <div v-if="MASTERDATA['IPDMRPTL1274']">
              <div class="mrr20 inline">- Ánh đồng tử<i>/ red reflex</i>:</div>
              <VTich :t4="true"
                :listData="MASTERDATA['IPDMRPTL1274'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[0, 1]"
                class="inline"
              />
            </div>
            <VTich :t4="true"
              :listData="MASTERDATA['IPDMRPTL1274'].Items"
              :noneDex="true"
              :showLabel="true"
              :indexs="[2]"
              />
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center">
              <div class="mrr10">- Tổn thương khác<i>/ Other lesions</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTR1278']">{{MASTERDATA['IPDMRPTR1278'].Items[1].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td>
            <div class="flex align-center">
              <div class="mrr10">- Tổn thương khác<i>/ Other lesions</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTL1278']">{{MASTERDATA['IPDMRPTL1278'].Items[1].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="fw600 on-top" rowspan="6">12. Thuỷ tinh thể<i>/ Crystalline lens</i></td>
          <td>
            <div v-if="MASTERDATA['IPDMRPTL1274']">
              <div class="mrr5 inline">-</div>
              <VTich :t4="true"
                :listData="MASTERDATA['IPDMRPTR1281'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[0]"
                class="inline"
              />
              <VTich :t4="true"
                :listData="MASTERDATA['IPDMRPTR1283'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[0]"
                class="inline"
              />
            </div>
          </td>
          <td>
            <div v-if="MASTERDATA['IPDMRPTL1274']">
              <div class="mrr5 inline">-</div>
              <VTich :t4="true"
                :listData="MASTERDATA['IPDMRPTL1281'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[0]"
                class="inline"
              />
              <VTich :t4="true"
                :listData="MASTERDATA['IPDMRPTL1283'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[0]"
                class="inline"
              />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <div class="mrr10 inline">- Hình thái đục<i>/ morphological type of cataracts</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTR1283']" class="inline">{{MASTERDATA['IPDMRPTR1283'].Items[1].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td>
            <div>
              <div class="mrr10 inline">- Hình thái đục<i>/ morphological type of cataracts</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTL1283']" class="inline">{{MASTERDATA['IPDMRPTL1283'].Items[1].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <VTich :t4="true"
                :listData="MASTERDATA['IPDMRPTR1286'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[0]"
                :haiCham="true"
                :gachNgang="true"
              />
          </td>
          <td>
            <VTich :t4="true"
                :listData="MASTERDATA['IPDMRPTL1286'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[0]"
                :haiCham="true"
                :gachNgang="true"
              />
          </td>
        </tr>
        <tr>
          <td>
            <div v-if="MASTERDATA['IPDMRPTL1274']">
              <div class="mrr10 inline">- IOL: </div>
              <VTich :t4="true"
                :listData="MASTERDATA['IPDMRPTR1288'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[1, 2, 3]"
                styleCustom="margin-right: 0px!important;"
                class="italic inline"
              />
            </div>
          </td>
          <td>
            <div v-if="MASTERDATA['IPDMRPTL1274']">
              <div class="mrr10 inline">- IOL: </div>
              <VTich :t4="true"
                :listData="MASTERDATA['IPDMRPTL1288'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[1, 2, 3]"
                styleCustom="margin-right: 0px!important;"
                class="italic inline"
              />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1288']"
                :listData="MASTERDATA['IPDMRPTR1288'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[4, 5]"
                class="italic text-center"
              />
          </td>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1288']"
                :listData="MASTERDATA['IPDMRPTL1288'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[4, 5]"
                class="italic text-center"
              />
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center">
              <div class="mrr10">- Tổn thương khác<i>/ Other lesions</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTR1295']">{{MASTERDATA['IPDMRPTR1295'].Items[1].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td>
            <div class="flex align-center">
              <div class="mrr10">- Tổn thương khác<i>/ Other lesions</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTL1295']">{{MASTERDATA['IPDMRPTL1295'].Items[1].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="fw600 on-top" rowspan="4">14. Dịch kính<i>/ Vitreous body</i></td>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1298']"
                :listData="MASTERDATA['IPDMRPTR1298'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[0, 1]"
              />
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1298']"
                :listData="MASTERDATA['IPDMRPTR1298'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[2]"
              />
          </td>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1298']"
                :listData="MASTERDATA['IPDMRPTL1298'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[0, 1]"
              />
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1298']"
                :listData="MASTERDATA['IPDMRPTL1298'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[2]"
              />
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center" v-if="MASTERDATA['IPDMRPTR1298']">
              <VTich :t4="true"
                  :listData="MASTERDATA['IPDMRPTR1298'].Items"
                  :noneDex="true"
                  :showLabel="true"
                  :indexs="[3]"
              />
              <div v-if="MASTERDATA['IPDMRPTR1298']">{{MASTERDATA['IPDMRPTR1298'].Items[4].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td>
            <div class="flex align-center" v-if="MASTERDATA['IPDMRPTL1298']">
              <VTich :t4="true"
                  :listData="MASTERDATA['IPDMRPTL1298'].Items"
                  :noneDex="true"
                  :showLabel="true"
                  :indexs="[3]"
              />
              <div v-if="MASTERDATA['IPDMRPTL1298']">{{MASTERDATA['IPDMRPTL1298'].Items[4].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1304']"
              :listData="MASTERDATA['IPDMRPTR1304'].Items"
              :noneDex="true"
              :showLabel="true"
              :indexs="[0]"
              />
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1304']"
              :listData="MASTERDATA['IPDMRPTR1304'].Items"
              :noneDex="true"
              :showLabel="true"
              :indexs="[1]"
              />
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1304']"
              :listData="MASTERDATA['IPDMRPTR1304'].Items"
              :noneDex="true"
              :showLabel="true"
              :indexs="[2]"
              />
          </td>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1304']"
              :listData="MASTERDATA['IPDMRPTL1304'].Items"
              :noneDex="true"
              :showLabel="true"
              :indexs="[0]"
              />
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1304']"
              :listData="MASTERDATA['IPDMRPTL1304'].Items"
              :noneDex="true"
              :showLabel="true"
              :indexs="[1]"
              />
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1304']"
              :listData="MASTERDATA['IPDMRPTL1304'].Items"
              :noneDex="true"
              :showLabel="true"
              :indexs="[2]"
              />
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center">
              <div class="mrr10">- Tổn thương khác<i>/ Other lesions</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTR1304']">{{MASTERDATA['IPDMRPTR1304'].Items[4].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td>
            <div class="flex align-center">
              <div class="mrr10">- Tổn thương khác<i>/ Other lesions</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTL1304']">{{MASTERDATA['IPDMRPTL1304'].Items[4].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="fw600 on-top" rowspan="8">15. Đáy mắt<i>/ Fundus</i></td>
          <td>
            <div>
              <div class="mrr20 inline">Đĩa thị<i>/ Optic disc</i>: </div>
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1310']"
                :listData="MASTERDATA['IPDMRPTR1310'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[0, 1]"
                class="inline"
                styleCustom="margin-right: 5px!important;"
                />
            </div>
            <div class="flex align-center" style="margin-left: 64px;">
              <div class="mrr5">C/D:</div>
              <div v-if="MASTERDATA['IPDMRPTR1310']">{{MASTERDATA['IPDMRPTR1310'].Items[2].Value || '&emsp;&emsp;/&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td>
            <div>
              <div class="mrr20 inline">Đĩa thị<i>/ Optic disc</i>: </div>
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1310']"
                :listData="MASTERDATA['IPDMRPTL1310'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[0, 1]"
                class="inline"
                styleCustom="margin-right: 5px!important;"
                />
            </div>
            <div class="flex align-center" style="margin-left: 64px;">
              <div class="mrr5">C/D:</div>
              <div v-if="MASTERDATA['IPDMRPTL1310']">{{MASTERDATA['IPDMRPTL1310'].Items[2].Value || '&emsp;&emsp;/&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1310']"
              :listData="MASTERDATA['IPDMRPTR1310'].Items"
              :noneDex="true"
              :showLabel="true"
              :indexs="[3, 4]"
            />
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1310']"
              :listData="MASTERDATA['IPDMRPTR1310'].Items"
              :noneDex="true"
              :showLabel="true"
              :indexs="[5]"
            />
          </td>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1310']"
              :listData="MASTERDATA['IPDMRPTL1310'].Items"
              :noneDex="true"
              :showLabel="true"
              :indexs="[3, 4]"
            />
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1310']"
              :listData="MASTERDATA['IPDMRPTL1310'].Items"
              :noneDex="true"
              :showLabel="true"
              :indexs="[5]"
            />
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <div class="mrr5">Hoàng điểm<i>/ macula</i>: </div>
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1317']"
                :listData="MASTERDATA['IPDMRPTR1317'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[0, 1]"
                class="inline"
                styleCustom="margin-right: 0px!important;"
              />
            </div>
          </td>
          <td>
            <div>
              <div class="mrr5">Hoàng điểm<i>/ macula</i>: </div>
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1317']"
                :listData="MASTERDATA['IPDMRPTL1317'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[0, 1]"
                class="inline"
                styleCustom="margin-right: 0px!important;"
              />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <div class="mrr10 pdt3 inline">Phù<i>/ edema</i>: </div>
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1322']"
                :listData="MASTERDATA['IPDMRPTR1322'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[0]"
                class="mrr5 inline"
                styleCustom="margin-right: 0px!important;"
              />
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1322']"
                :listData="MASTERDATA['IPDMRPTR1322'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[1]"
                class="mrr5 inline"
                styleCustom="margin-right: 0px!important;"
              />
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1317']"
                :listData="MASTERDATA['IPDMRPTR1317'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[2]"
                class="inline"
                styleCustom="margin-right: 0px!important;"
              />
            </div>
          </td>
          <td>
            <div>
              <div class="mrr10 pdt3 inline">Phù<i>/ edema</i>: </div>
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1322']"
                :listData="MASTERDATA['IPDMRPTL1322'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[0]"
                class="mrr5 inline"
                styleCustom="margin-right: 0px!important;"
              />
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1322']"
                :listData="MASTERDATA['IPDMRPTL1322'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[1]"
                class="mrr5 inline"
                styleCustom="margin-right: 0px!important;"
              />
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1317']"
                :listData="MASTERDATA['IPDMRPTL1317'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[2]"
                class="inline"
                styleCustom="margin-right: 0px!important;"
              />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <div class="mrr10 inline">Võng mạc<i>/ Retina</i>: Hệ mạch<i>/ vessel system</i>: </div>
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1326']"
                :listData="MASTERDATA['IPDMRPTR1326'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[0]"
                class="inline"
              />
            </div>
          </td>
          <td>
            <div>
              <div class="mrr10 inline">Võng mạc<i>/ Retina</i>: Hệ mạch<i>/ vessel system</i>: </div>
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1326']"
                :listData="MASTERDATA['IPDMRPTL1326'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[0]"
                class="inline"
              />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1326']"
              :listData="MASTERDATA['IPDMRPTR1326'].Items"
              :noneDex="true"
              :showLabel="true"
              :indexs="[1]"
            />
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1326']"
              :listData="MASTERDATA['IPDMRPTR1326'].Items"
              :noneDex="true"
              :showLabel="true"
              :indexs="[2]"
            />
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1326']"
              :listData="MASTERDATA['IPDMRPTR1326'].Items"
              :noneDex="true"
              :showLabel="true"
              :indexs="[3]"
            />
          </td>
          <td>
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1326']"
              :listData="MASTERDATA['IPDMRPTL1326'].Items"
              :noneDex="true"
              :showLabel="true"
              :indexs="[1]"
            />
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1326']"
              :listData="MASTERDATA['IPDMRPTL1326'].Items"
              :noneDex="true"
              :showLabel="true"
              :indexs="[2]"
            />
            <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1326']"
              :listData="MASTERDATA['IPDMRPTL1326'].Items"
              :noneDex="true"
              :showLabel="true"
              :indexs="[3]"
            />
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <div class="mrr5">Thoái hoá VM<i>/ Retinal degeneration</i>: </div>
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1332']"
                :listData="MASTERDATA['IPDMRPTR1332'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[0]"
              />
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTR1332']"
                :listData="MASTERDATA['IPDMRPTR1332'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[1]"
              />
            </div>
          </td>
          <td>
            <div>
              <div class="mrr5">Thoái hoá VM<i>/ Retinal degeneration</i>: </div>
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1332']"
                :listData="MASTERDATA['IPDMRPTL1332'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[0]"
              />
              <VTich :t4="true" v-if="MASTERDATA['IPDMRPTL1332']"
                :listData="MASTERDATA['IPDMRPTL1332'].Items"
                :noneDex="true"
                :showLabel="true"
                :indexs="[1]"
              />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center">
              <div class="mrr10">Bệnh lý khác<i>/ Other findings</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTR1335']">{{MASTERDATA['IPDMRPTR1335'].Items[1].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td>
            <div class="flex align-center">
              <div class="mrr10">Bệnh lý khác<i>/ Other findings</i>: </div>
              <div v-if="MASTERDATA['IPDMRPTL1335']">{{MASTERDATA['IPDMRPTL1335'].Items[1].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="fw600 on-top" rowspan="2">16. Hốc mắt<i>/ Orbit</i></td>
          <td>
            <div>
              <div class="mrr5 mrb10">
                <div class="inline">Bình thường<i>/ normal</i> </div>
                <VTich :t4="true" class="inline" v-if="MASTERDATA['IPDMRPTR1338']" v-model="MASTERDATA['IPDMRPTR1338'].Items[0].Value" />
              </div>
              <div>
                <div class="inline">Bệnh lý<i>/ pathologic</i> </div>
                <VTich :t4="true" class="inline" v-if="MASTERDATA['IPDMRPTR1338']" v-model="MASTERDATA['IPDMRPTR1338'].Items[1].Value" />
              </div>
            </div>
          </td>
          <td>
            <div>
              <div class="mrr5 mrb10">
                <div class="inline">Bình thường<i>/ normal</i> </div>
                <VTich :t4="true" class="inline" v-if="MASTERDATA['IPDMRPTL1338']" v-model="MASTERDATA['IPDMRPTL1338'].Items[0].Value" />
              </div>
              <div>
                <div class="inline">Bệnh lý<i>/ pathologic</i> </div>
                <VTich :t4="true" class="inline" v-if="MASTERDATA['IPDMRPTL1338']" v-model="MASTERDATA['IPDMRPTL1338'].Items[1].Value" />
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="flex align-center" v-if="MASTERDATA['IPDMRPTR1338']">
              <div class="mrr10">Mô tả<i>/ Description</i>: </div>
              <div>{{MASTERDATA['IPDMRPTR1338'].Items[2].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
          <td>
            <div class="flex align-center" v-if="MASTERDATA['IPDMRPTL1338']">
              <div class="mrr10">Mô tả<i>/ Description</i>: </div>
              <div>{{MASTERDATA['IPDMRPTL1338'].Items[2].Value || '&emsp;&emsp;'}}</div>
            </div>
          </td>
        </tr>
      </table>
      <div class="mrb10 BreakPage"><b>4.2 Khám bệnh toàn thân<i>/ Full body medical examination</i>:</b></div>
      <div class="flex align-center mrb10">
        <div class="fw600 mrr10">- Huyết áp<i>/ Blood pressure</i> </div>
        <div v-if="MASTERDATA['IPDMRPT1606']">{{MASTERDATA['IPDMRPT1606'].Items[0].Value || '&emsp;&emsp;'}}</div>
        <div class="mrl10 fw600 mrr10">Nhiệt độ<i>/ Temperature</i> </div>
        <div v-if="MASTERDATA['IPDMRPT1608']">{{MASTERDATA['IPDMRPT1608'].Items[0].Value || '&emsp;&emsp;'}}</div>
        <div class="mrl10 fw600 mrr10">Mạch<i>/ Pulse</i> </div>
        <div v-if="MASTERDATA['IPDMRPT1610']">{{MASTERDATA['IPDMRPT1610'].Items[0].Value || '&emsp;&emsp;'}}</div>
      </div>
      <template v-for="(code, index) in groupCode">
        <div class="flex on-top" :class="index === 6 ? 'mrb10' : 'mrb20'" :key="index" v-if="MASTERDATA[code]">
          <div class="mrr50" style="min-width: 270px;">- {{MASTERDATA[code].ViName}}<i>/ {{MASTERDATA[code].EnName}}</i>: </div>
          <div>
            <div class="mrb10 flex align-center">
              <div style="min-width: 138px;" class="block">Bình thường<i>/ Normal</i></div>
              <VTich :t4="true" class="block" v-model="MASTERDATA[code].Items[0].Value" />
            </div>
            <div class="flex align-center">
              <div class="mrr10 flex align-center" style="height: 28px;">
                <div style="min-width: 138px;">Có bệnh<i>/ Pathologic</i></div>
                <VTich :t4="true" class="block" v-model="MASTERDATA[code].Items[1].Value" />
              </div>
              <div style="max-width: 429px;">{{MASTERDATA[code].Items[2].Value}}</div>
            </div>
          </div>
        </div>
      </template>
      <div class="mrb10">
        <span>- Khác<i>/ Others</i>: </span>
        <span v-if="MASTERDATA['IPDMRPT1640']">{{MASTERDATA['IPDMRPT1640'].Items[0].Value || '&emsp;&emsp;'}}</span>
      </div>
      <div class="mrb10">
        <span><b>5. Xét nghiệm<i>/ Lab tests</i>: </b></span>
        <span v-if="MASTERDATA['IPDMRPTCXNC']">{{MASTERDATA['IPDMRPTCXNC'].Items[0].Value || '&emsp;&emsp;'}}</span>
      </div>
      <div class="mrb10">
        <div><b>6. Kết luận<i>/ Conclusion</i>: </b></div>
        <div class="mrb10">
          <span>- Chẩn đoán chính<i>/ Primary diagnosis</i>: </span>
          <span>{{getValueOfMASTERDATA('IPDMRPTCDBC', 'IPDMRPTCDBCANS') ? getValueOfMASTERDATA('IPDMRPTCDBC', 'IPDMRPTCDBCANS') + ',' : ''}} <template v-if="MASTERDATA['IPDMRPTICDC']">{{getICD10Code(MASTERDATA['IPDMRPTICDC'].Items[0].Value)}}</template></span>
        </div>
        <div class="mrb10">
          <span>- Chẩn đoán kèm theo<i>/ Co-morbidities</i>: </span>
          <span>{{getValueOfMASTERDATA('IPDMRPTCDKT', 'IPDMRPTCDKTANS') ? getValueOfMASTERDATA('IPDMRPTCDKT', 'IPDMRPTCDKTANS') + ',' : ''}} <template v-if="MASTERDATA['IPDMRPTICDP']">{{getICD10Code(MASTERDATA['IPDMRPTICDP'].Items[0].Value)}}</template></span>
        </div>
        <div>
          <span>- Chẩn đoán phân biệt (nếu có)<i>/ Differential diagnosis(if any)</i>: </span>
          <span>{{getValueOfMASTERDATA('IPDMRPTPHBI', 'IPDMRPTPHBIANS')}}</span>
        </div>
      </div>
      <div class="mrb10">
        <span><b>7. Tiên lượng<i>/ Prognosis</i>: </b></span>
        <span v-if="MASTERDATA['IPDMRPT1642']">{{MASTERDATA['IPDMRPT1642'].Items[0].Value || '&emsp;&emsp;'}}</span>
      </div>
      <div class="mrb10">
        <span><b>8. Hướng điều trị<i>/ Treatment plan</i>: </b></span>
        <span v-if="MASTERDATA['IPDMRPT1646']">{{MASTERDATA['IPDMRPT1646'].Items[0].Value || '&emsp;&emsp;'}}</span>
      </div>
  </div>
</template>
<script>
import ListOfCurrentMedications from '@/components/ListOfCurrentMedicationsForPrinter.vue'
export default {
  name: 'EyePrint2',
  props: ['MASTERDATA', 'Data', 'VisitId'],
  data () {
    return {
      groupCode: [
        'IPDMRPT1612',
        'IPDMRPT1616',
        'IPDMRPT1620',
        'IPDMRPT1624',
        'IPDMRPT1628',
        'IPDMRPT1632',
        'IPDMRPT1636'
      ]
    }
  },
  components: {
    ListOfCurrentMedications
  },
  methods: {
    getICD10Code (icd) {
      var arr = this.JSONParse(icd) || []
      return arr.map(e => {
        return e.code
      }).join(',')
    }
  }
}
</script>
