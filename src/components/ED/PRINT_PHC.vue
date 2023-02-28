<template>
  <div id="A4PrintPage" v-if="MASTERDATA">
    <section class="sheet padding-10mm" id="page00001">
      <article>
        <table>
          <tr>
            <td valign="top"><img src="/static/Logo%20Vinmec%20International%20Hospitall%201.png" /></td>
            <td align="center">
              <h2>BẢNG KIỂM CHUẨN BỊ VÀ BÀN GIAO NGƯỜI BỆNH TRƯỚC PHẪU THUẬT /THỦ THUẬT</h2>
              <h3><i>PRE-OPERATIVE/PROCEDURE HANDOVER CHECKLIST</i></h3>
            </td>
            <td align="middle"><CustomerBarCode :customer="PreOperativeProcedureHandoverChecklistsData.customer" :height="50"/></td>
          </tr>
        </table>
        <table class="tableboder" :class="bindCalss()">
          <tr>
            <td class="col-60" v-if="MASTERDATA['PHCTOP']" rowspan="4">
              <p><vlabel :data="MASTERDATA['PHCTOP']" /></p>
              <table class="col-10">
                <tr>
                  <template :data="item"  v-for="(item,index) in MASTERDATA['PHCTOP'].Items" >
                    <td :key="index" v-if="item.DataType === 'RadioBox'" class="col-30">
                      <b>{{item.Value + '' === (index + '') ? '&#9745;' : '&#9744;'}}</b> <vlabel :data="item" />
                    </td>
                  </template>
                </tr>
              </table>
            </td>
            <td class="col-20" v-if="MASTERDATA['PHCTEM']">
              <label>Nhiệt độ/T° <Unit :unit="'tem'" />:</label>
              <template v-for="item in MASTERDATA['PHCTEM'].Items">
                {{item.Value}}
              </template>
            </td>
            <td rowspan="4" v-if="MASTERDATA['PHCBG0']">
              <p><vlabel :data="MASTERDATA['PHCBG0']" /></p>
              <p class="text-center font18">
                <b>
                  <template v-for="item in MASTERDATA['PHCBG0'].Items">
                    {{item.Value}}
                  </template>
                </b>
              </p>
            </td>
          </tr>
          <tr>
            <td class="col-20" v-if="MASTERDATA['PHCPUL']">
              <vlabel :data="MASTERDATA['PHCPUL']" /> (nhịp/phút) :
              <template v-for="item in MASTERDATA['PHCPUL'].Items">
                {{item.Value}}
              </template>
            </td>
          </tr>
          <tr>
            <td class="col-20" v-if="MASTERDATA['PHCRR0']">
              <vlabel :data="MASTERDATA['PHCRR0']" /> (lần/phút) :
              <template v-for="item in MASTERDATA['PHCRR0'].Items">
                {{item.Value}}
              </template>
            </td>
          </tr>
          <tr>
            <td class="col-20" v-if="MASTERDATA['PHCBP0']">
              <vlabel :data="MASTERDATA['PHCBP0']" /> (mmHg) :
              <template v-for="item in MASTERDATA['PHCBP0'].Items">
                {{item.Value}}
              </template>
            </td>
          </tr>
          <tr>
            <td v-if="MASTERDATA['PHCPD0']">
              <div><vlabel :data="MASTERDATA['PHCPD0']" />:</div>
              <template v-for="item in MASTERDATA['PHCPD0'].Items">
                {{item.Value}}
              </template>
            </td>
            <td v-if="MASTERDATA['PHCHEI']">
              <div><vlabel :data="MASTERDATA['PHCHEI']" /> (cm):</div>
              <template v-for="item in MASTERDATA['PHCHEI'].Items">
                {{item.Value}}
              </template>
            </td>
            <td v-if="MASTERDATA['PHCWEI']">
              <div><vlabel :data="MASTERDATA['PHCWEI']" /> (kg):</div>
              <template v-for="item in MASTERDATA['PHCWEI'].Items">
                {{item.Value}}
              </template>
            </td>
          </tr>
          <tr>
            <td v-if="MASTERDATA['PHCDOO']">
              <vlabel :data="MASTERDATA['PHCDOO']" />:
              <template v-for="item in MASTERDATA['PHCDOO'].Items">
                {{item.Value}}
              </template>
            </td>
            <td colspan="2" v-if="MASTERDATA['PHCOT0']">
              <vlabel :data="MASTERDATA['PHCOT0']" />:
              <template v-for="item in MASTERDATA['PHCOT0'].Items">
                {{item.Value}}
              </template>
            </td>
            <tr>
            <td v-if="MASTERDATA['PHCNOO']">
              <vlabel :data="MASTERDATA['PHCNOO']" />:
              <template v-for="item in MASTERDATA['PHCNOO'].Items">
                {{item.Value}}
              </template>
            </td>
            <td colspan="2" v-if="MASTERDATA['PHCREM']">
              <vlabel :data="MASTERDATA['PHCREM']" />:
              <template v-for="item in MASTERDATA['PHCREM'].Items">
                {{item.Value}}
              </template>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              Ngày giờ bàn giao /<i>Date/Time of handover:</i>
              {{PreOperativeProcedureHandoverChecklistsData.DateTimeHandover | viDisplayformatDateTimeWithMoment2}}
            </td>
          </tr>
        </table>
        <p></p>
        <table class="tableboder" :class="bindCalss()">
          <tr>
            <th rowspan="2" class="text-center">Nội dung bàn giao/<i>Handover Items</i></th>
            <th colspan="3">Khoa/Ward</th>
            <th rowspan="2" class="col-1">Phòng mổ/OT</th>
          </tr>
          <tr>
            <th class="col-1">Yes</th>
            <th class="col-1">No</th>
            <th class="col-1">NA</th>
          </tr>
          <tr v-if="MASTERDATA['PHCPIA']">
            <td>1. <vlabel :data="MASTERDATA['PHCPIA']" /></td>
            <template v-for="(item,index) in MASTERDATA['PHCPIA'].Items">
              <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
              <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['PHCIBC']">
            <td>2. <vlabel :data="MASTERDATA['PHCIBC']" /></td>
            <template v-for="(item,index) in MASTERDATA['PHCIBC'].Items">
              <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
              <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['PHCSCF']">
            <td>3. <vlabel :data="MASTERDATA['PHCSCF']" /></td>
            <template v-for="(item,index) in MASTERDATA['PHCSCF'].Items">
              <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
              <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['PHCPCA']">
            <td>4. <vlabel :data="MASTERDATA['PHCPCA']" /></td>
            <template v-for="(item,index) in MASTERDATA['PHCPCA'].Items">
              <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
              <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['PHCPMR']">
            <td>5. <vlabel :data="MASTERDATA['PHCPMR']" /></td>
            <template v-for="(item,index) in MASTERDATA['PHCPMR'].Items">
              <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
              <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['PHCSCP']">
            <td>6. <vlabel :data="MASTERDATA['PHCSCP']" /></td>
            <template v-for="(item,index) in MASTERDATA['PHCSCP'].Items">
              <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
              <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['PHCLRC']">
            <td>7. <vlabel :data="MASTERDATA['PHCLRC']" /></td>
            <template v-for="(item,index) in MASTERDATA['PHCLRC'].Items">
              <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
              <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['PHCXUS']">
            <td>8.
              {{PHCXUSANS('vi')}} đã được kiểm tra và kết quả có trong hồ sơ bệnh án /{{PHCXUSANS('en')}} checked & available
            </td>
            <template v-for="(item,index) in MASTERDATA['PHCXUS'].Items">
              <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
              <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['PHCFF0']">
            <td>9. <vlabel :data="MASTERDATA['PHCFF0']" /> <i>{{MASTERDATA['PHCFF0'].Items[0].Value}}</i></td>
            <template v-for="(item,index) in MASTERDATA['PHCFF0'].Items">
              <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
              <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['PHCEG0']">
            <td>10. <vlabel :data="MASTERDATA['PHCEG0']" /> <i>{{MASTERDATA['PHCEG0'].Items[0].Value}}</i></td>
            <template v-for="(item,index) in MASTERDATA['PHCEG0'].Items">
              <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
              <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['PHCAKA']">
            <td>11. <vlabel :data="MASTERDATA['PHCAKA']" /> <i>{{MASTERDATA['PHCAKA'].Items[0].Value}}</i></td>
            <template v-for="(item,index) in MASTERDATA['PHCAKA'].Items">
              <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
              <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['PHCOSS']">
            <td>12. <vlabel :data="MASTERDATA['PHCOSS']" /></td>
            <template v-for="(item,index) in MASTERDATA['PHCOSS'].Items">
              <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
              <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['PHCSIC']">
            <td>13. <vlabel :data="MASTERDATA['PHCSIC']" /></td>
            <template v-for="(item,index) in MASTERDATA['PHCSIC'].Items">
              <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
              <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['PHCSSC']">
            <td>14. <vlabel :data="MASTERDATA['PHCSSC']" /></td>
            <template v-for="(item,index) in MASTERDATA['PHCSSC'].Items">
              <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
              <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['PHCAPO']">
            <td>15. <vlabel :data="MASTERDATA['PHCAPO']" /></td>
            <template v-for="(item,index) in MASTERDATA['PHCAPO'].Items">
              <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
              <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['PHCNCA']">
            <td>16. <vlabel :data="MASTERDATA['PHCNCA']" /></td>
            <template v-for="(item,index) in MASTERDATA['PHCNCA'].Items">
              <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
              <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['PHCAMR']">
            <td>17. <vlabel :data="MASTERDATA['PHCAMR']" /></td>
            <template v-for="(item,index) in MASTERDATA['PHCAMR'].Items">
              <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
              <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['PHCJBP']">
            <td>18. <vlabel :data="MASTERDATA['PHCJBP']" /></td>
            <template v-for="(item,index) in MASTERDATA['PHCJBP'].Items">
              <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
              <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['PHCDIC']">
            <td>19. <vlabel :data="MASTERDATA['PHCDIC']" /></td>
            <template v-for="(item,index) in MASTERDATA['PHCDIC'].Items">
              <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
              <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['PHCACC']">
            <td>20. <vlabel :data="MASTERDATA['PHCACC']" /><i> {{MASTERDATA['PHCACC'].Items[0].Value}}</i></td>
            <template v-for="(item,index) in MASTERDATA['PHCACC'].Items">
              <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
              <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['PHCPMG']">
            <td>21. <vlabel :data="MASTERDATA['PHCPMG']" /></td>
            <template v-for="(item,index) in MASTERDATA['PHCPMG'].Items">
              <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
              <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['PHCICI']">
            <td>22. <vlabel :data="MASTERDATA['PHCICI']" /></td>
            <template v-for="(item,index) in MASTERDATA['PHCICI'].Items">
              <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
              <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['PHCCBBS']">
            <td>23. <vlabel :data="MASTERDATA['PHCCBBS']" /></td>
            <template v-for="(item,index) in MASTERDATA['PHCCBBS'].Items">
              <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
              <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['PHCOTH']">
            <td>24. <vlabel :data="MASTERDATA['PHCOTH']" /><i> {{MASTERDATA['PHCOTH'].Items[0].Value}}</i></td>
            <template v-for="(item,index) in MASTERDATA['PHCOTH'].Items">
              <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
              <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center text-bold">
                {{item.Value ? '&#9745;' : '&#9744;'}}
              </td>
            </template>
          </tr>
        </table>
        <table :class="bindCalss()">
          <tr>
            <td class="col-33 text-center">
              <div>Điều dưỡng chuẩn bị</div>
              <div><i>Ward nurse</i></div>
              <img class="hidden" src="/static/140x80.png" />
              <div>{{PreOperativeProcedureHandoverChecklistsData.WardNurse}}</div>
            </td>
            <td class="col-33 text-center">
              <div>Điều dưỡng chuyển người bệnh</div>
              <div><i>Escort nurse</i></div>
              <img class="hidden" src="/static/140x80.png" />
              <div>{{PreOperativeProcedureHandoverChecklistsData.EscortNurse}}</div>
            </td>
            <td class="col-33 text-center">
              <div>Điều dưỡng tiếp nhận người bệnh</div>
              <div><i>Receiving nurse</i></div>
              <img class="hidden" src="/static/140x80.png" />
              <div>{{PreOperativeProcedureHandoverChecklistsData.ReceivingNurse}}</div>
            </td>
          </tr>
        </table>
        <p style="font-size: 12px">A03_035_050919_VE</p>
      </article>
    </section>
    <section class="sheet padding-10mm" id="page00002">
      <article>
        <h2 class="text-center">PHIẾU KIỂM GẠC VÀ DỤNG CỤ PHẪU THUẬT</h2>
        <h3 class="text-center"><i>SPONGE, SHARPS AND INSTRUMENTS COUNTS SHEET</i></h3>
      </article>
      <table class="tableboder" :class="bindCalss()">
        <tr class="text-left">
          <td class="col-20" rowspan="3">
            <div>Dụng vụ/vật tư</div>
            <div><i>Instruments/Consumable</i></div>
          </td>
          <td class="col-30 text-center" colspan="4">
            Số lượng xuất ra
            <div><i>Taken out</i></div>
          </td>
          <td class="col-40 text-center" colspan="7">
            Số lượng thu về
            <div><i>Collected</i></div>
          </td>
        </tr>
        <tr class="text-center">
          <td rowspan="2">
            SL Ban đầu
            <div><i>Initial count</i></div>
          </td>
          <td rowspan="2">
            SL thêm
            <div><i>Added</i></div>
          </td>
          <td rowspan="2">
            SL thêm
            <div><i>Added</i></div>
          </td>
          <td rowspan="2">
            Tổng
            <div><i>Total</i></div>
          </td>
          <td colspan="2">Lần 1<div><i>First</i></div></td>
          <td colspan="2">Lần 2<div><i>Secound</i></div></td>
          <td colspan="2">
            Lần 3<i>/Third</i>
            <div>Trước khi đóng da</div>
            <div><i>Before woundclosure</i></div>
          </td>
          <td rowspan="2">Tổng<div><i>Total</i></div></td>
        </tr>
        <tr class="text-center">
          <td>Bẩn<div><i>Dirty</i></div></td>
          <td>Sạch<div><i>Clean</i></div></td>
          <td>Bẩn<div><i>Dirty</i></div></td>
          <td>Sạch<div><i>Clean</i></div></td>
          <td>Bẩn<div><i>Dirty</i></div></td>
          <td>Sạch<div><i>Clean</i></div></td>
        </tr>
        <tr :data="c" :key="i" v-for="(c,i) in CODE2" class="text-left td-h-30">
          <template v-if="MASTERDATA[c]">
            <td>
              <template v-if="MASTERDATA[c].Code === 'SSAINS' || MASTERDATA[c].Code === 'SSAIPA'"><b><vlabel :data="MASTERDATA[c]" /></b></template>
              <vlabel v-else :data="MASTERDATA[c]" />
            </td>
            <template v-for="(item,index3) in MASTERDATA[c].Items">
              <td :data="item" :key="index3" class="text-center" v-if="index3 <= 10">
                {{item.Value}}
              </td>
            </template>
          </template>
        </tr>
        <template v-for="(it,i) in CODE3">
          <tr class="text-left" :key="i + '23432'" :data="it">
            <template v-if="MASTERDATA[it]" >
              <td :data="item" :key="index2" v-for="(item,index2) in MASTERDATA[it].Items">
                <template v-if="item.Value">{{item.Value}}</template>
                <template v-else><p class="hidden">NA</p></template>
              </td>
            </template>
          </tr>
        </template>
        <tr class="text-left">
          <th colspan="15">
            Kết luận
          </th>
        </tr>
        <template v-if="MASTERDATA['SSACON'] && MASTERDATA['SSACON'].Items.length > 1">
        <tr :data="item" :key="index + 'SSACON'" v-for="(item,index) in [MASTERDATA['SSACON'].Items[0]]">
          <td v-if="item.DataType === 'Radio'" colspan="15">
            <b>{{item.Value ? '&#9745;' : '&#9744;'}}</b> <vlabel :data="item" />
          </td>
        </tr>
        <tr :data="item" :key="index + 'SSACON1'" v-for="(item,index) in [MASTERDATA['SSACON'].Items[1]]">
          <td v-if="item.DataType === 'Radio'" rowspan="4" colspan="2">
            <b>{{item.Value ? '&#9745;' : '&#9744;'}}</b> <vlabel :data="item" />
          </td>
        </tr>
        </template>
        <tr v-if="MASTERDATA['SSADOI']">
          <td colspan="5">
            <vlabel :data="MASTERDATA['SSADOI']" />
          </td>
          <td colspan="5">
            <template v-for="(item) in MASTERDATA['SSADOI'].Items">
              {{item.Value}}
            </template>
          </td>
        </tr>
        <tr v-if="MASTERDATA['SSAAT0']">
          <td colspan="5">
            <vlabel :data="MASTERDATA['SSAAT0']" />
          </td>
          <td colspan="5">
            <template v-for="(item) in MASTERDATA['SSAAT0'].Items">
              {{item.Value}}
            </template>
          </td>
        </tr>
        <tr v-if="MASTERDATA['SSAFC0']">
          <td colspan="5">
            <vlabel :data="MASTERDATA['SSAFC0']" />
          </td>
          <td colspan="5">
            <template v-for="(item) in MASTERDATA['SSAFC0'].Items">
              {{item.Value}}
            </template>
          </td>
        </tr>
      </table>
      <p v-if="SpongeSharpsAndInstrumentsCountsSheetsData.DateTimeSheet" :class="bindCalss()"><i>{{SpongeSharpsAndInstrumentsCountsSheetsData.DateTimeSheet | viDisplayformatDateTime}}</i></p>
      <p v-else :class="bindCalss()">..... giờ ..... phút, ngày ..... tháng ..... năm .....</p>
      <br/>
      <table :class="bindCalss()">
        <tr>
          <td class="col-33 text-center">
            <div>Điều dưỡng dụng cụ</div>
            <div><i>Scrub nurse</i></div>
            <img class="hidden" src="/static/140x80.png" />
            <div>{{SpongeSharpsAndInstrumentsCountsSheetsData.ScrubNurse}}</div>
          </td>
          <td class="col-33 text-center">
            <div>Điều dưỡng chạy ngoài</div>
            <div><i>Circulating nurse</i></div>
            <img class="hidden" src="/static/140x80.png" />
            <div>{{SpongeSharpsAndInstrumentsCountsSheetsData.CirculatingNurse}}</div>
          </td>
          <td class="col-33 text-center">
            <div>Phẫu thuật viên</div>
            <div><i>Surgeon</i></div>
            <img class="hidden" src="/static/140x80.png" />
            <div>{{SpongeSharpsAndInstrumentsCountsSheetsData.Surgeon}}</div>
          </td>
        </tr>
      </table>
      <p style="font-size: 12px">A03_035_050919_VE</p>
    </section>
  </div>
</template>

<script>
import Vlabel from '@/components/LabelWithLangs'
import VueBarcode from 'vue-barcode'
export default {
  name: 'print-phc',
  props: ['MASTERDATA', 'PreOperativeProcedureHandoverChecklistsData', 'SpongeSharpsAndInstrumentsCountsSheetsData', 'viewOnly'],
  components: {
    Vlabel, VueBarcode
  },
  data () {
    return {
      CODE2: ['SSASG0', 'SSALG0', 'SSASG1', 'SSALAP', 'SSAMEC', 'SSASPH', 'SSALNG', 'SSASNG', 'SSAENT', 'SSAOTH', 'SSAINS', 'SSASM0', 'SSANEE', 'SSASB1', 'SSASI0', 'SSAIPA'],
      CODE3: ['SSAIP1', 'SSAIP2', 'SSAIP3']
    }
  },
  created () {
  },
  methods: {
    bindCalss () {
      return this.viewOnly ? 'font14' : 'font13'
    },
    PHCXUSANS (l) {
      try {
        var data = []
        var arr = this.MASTERDATA['PHCXUS'].Items[4].Value
        arr.forEach(element => {
          if (l === 'vi') {
            data.push(element.label)
          } else {
            data.push(element.enlabel)
          }
        })
        var str = data.toString()
        return str || '..................'
      } catch (error) {
        return ''
      }
    }
  }
}
</script>
