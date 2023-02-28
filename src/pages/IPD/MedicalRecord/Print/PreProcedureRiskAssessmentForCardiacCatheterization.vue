<template>
  <div>
    <table width="100%">
      <tr>
        <td valign="top">
          <p>
            <img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" />
          </p>
        </td>
        <td>
          <h3>APPENDIX 1</h3>
        </td>
        <td style="width: 30%" align="middle"><CustomerBarCode :customer="Data.Customer" :height="50"/></td>
      </tr>
    </table>
    <div style="margin-top: 12px;">
      <h3 class="text-center form-title; margin-bottom: 10px;"><b>ĐÁNH GIÁ NGUY CƠ TRƯỚC THỦ THUẬT ĐỐI VỚI BỆNH NHÂN CAN THIỆP TIM MẠCH</b></h3>
      <h4 class="text-center form-title; margin-bottom: 10px;"><i>(PRE-PROCEDURE RISK ASSESSMENT FOR CARDIAC CATHETERIZATION)</i></h4>
      <p class="text-center">(Bác sĩ đánh giá lúc BN nhập viện hoặc ngay trước khi tiến hành can thiệp tim mạch/<br><i>Physicians assess prior to admission or immediately before cardiac catheterization</i>)</p>
    </div>
    <!-- <div>
      <table>
        <tr style="width: 100%">
          <td style="width: 50%">
            <span v-if="MASTERDATA['IPDPPRAFCC230']">
              <p><b>{{MASTERDATA['IPDPPRAFCC230'].ViName}}/<i>{{MASTERDATA['IPDPPRAFCC230'].EnName}}:</i></b> {{MASTERDATA['IPDPPRAFCC230'].Items[0].Value}}</p>
            </span>
          </td>
          <td style="width: 50%; margin-left: 24px;">
            <span v-if="MASTERDATA['IPDPPRAFCC232']">
              <p><b>{{MASTERDATA['IPDPPRAFCC232'].ViName}}/<i>{{MASTERDATA['IPDPPRAFCC232'].EnName}}:</i></b> {{CreatedBy}}</p>
            </span>
          </td>
        </tr>
      </table>
    </div> -->
    <div v-if="FormExist && MASTERDATA">
      <div style="margin-top: 12px;">
        <table style="margin-bottom: 12px;">
          <tr v-if="MASTERDATA['IPDPPRAFCC01']">
            <td>
              <span class="v-checkbox" align="center" v-if="MASTERDATA['IPDPPRAFCC01']">
                <span class="square-text" :class="MASTERDATA['IPDPPRAFCC01'].Items[0].Value === true ? '' : 'hidden-text'">&#10003;</span>
                <label class="ml-5" :for="'IPDPPRAFCC01'">{{MASTERDATA['IPDPPRAFCC01'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC01'].EnName}}</i></label>
              </span>
            </td>
            <td>
              <span class="v-checkbox" align="center">
                <span class="square-text" :class="MASTERDATA['IPDPPRAFCC11'].Items[0].Value === true ? '' : 'hidden-text'">&#10003;</span>
                <label class="ml-5" :for="'IPDPPRAFCC11'">{{MASTERDATA['IPDPPRAFCC11'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC11'].EnName}}</i></label>
              </span>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDPPRAFCC03']">
            <td>
              <span class="v-checkbox" align="center">
                <span class="square-text" :class="MASTERDATA['IPDPPRAFCC03'].Items[0].Value === true ? '' : 'hidden-text'">&#10003;</span>
                <label class="ml-5" :for="'IPDPPRAFCC03'">{{MASTERDATA['IPDPPRAFCC03'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC03'].EnName}}</i></label>
              </span>
            </td>
            <td>
              <span class="v-checkbox" align="center">
                <span class="square-text" :class="MASTERDATA['IPDPPRAFCC13'].Items[0].Value === true ? '' : 'hidden-text'">&#10003;</span>
                <label class="ml-5" :for="'IPDPPRAFCC13'">{{MASTERDATA['IPDPPRAFCC13'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC13'].EnName}}</i></label>
              </span>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDPPRAFCC05']">
            <td>
              <span class="v-checkbox" align="center">
                <span class="square-text" :class="MASTERDATA['IPDPPRAFCC05'].Items[0].Value === true ? '' : 'hidden-text'">&#10003;</span>
                <label class="ml-5" :for="'IPDPPRAFCC05'">{{MASTERDATA['IPDPPRAFCC05'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC05'].EnName}}</i></label>
              </span>
            </td>
            <td>
              <span class="v-checkbox" align="center">
                <span class="square-text" :class="MASTERDATA['IPDPPRAFCC15'].Items[0].Value === true ? '' : 'hidden-text'">&#10003;</span>
                <label class="ml-5" :for="'IPDPPRAFCC15'">{{MASTERDATA['IPDPPRAFCC15'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC15'].EnName}}</i></label>
              </span>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDPPRAFCC07']">
            <td>
              <span class="v-checkbox" align="center">
                <span class="square-text" :class="MASTERDATA['IPDPPRAFCC07'].Items[0].Value === true ? '' : 'hidden-text'">&#10003;</span>
                <label class="ml-5" :for="'IPDPPRAFCC07'">{{MASTERDATA['IPDPPRAFCC07'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC07'].EnName}}</i></label>
              </span>
            </td>
            <td>
              <span class="v-checkbox" align="center">
                <span class="square-text" :class="MASTERDATA['IPDPPRAFCC17'].Items[0].Value === true ? '' : 'hidden-text'">&#10003;</span>
                <label class="ml-5" :for="'IPDPPRAFCC17'">{{MASTERDATA['IPDPPRAFCC17'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC17'].EnName}}</i></label>
              </span>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDPPRAFCC09']">
            <td>
              <span class="v-checkbox" align="center">
                <span class="square-text" :class="MASTERDATA['IPDPPRAFCC09'].Items[0].Value === true ? '' : 'hidden-text'">&#10003;</span>
                <label class="ml-5" :for="'IPDPPRAFCC09'">{{MASTERDATA['IPDPPRAFCC09'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC09'].EnName}}</i></label>
              </span>
            </td>
            <td>
              <span class="v-checkbox" align="center">
                <span class="square-text" :class="MASTERDATA['IPDPPRAFCC19'].Items[0].Value === true ? '' : 'hidden-text'">&#10003;</span>
                <label class="ml-5" :for="'IPDPPRAFCC19'">{{MASTERDATA['IPDPPRAFCC19'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC19'].EnName}}</i>: {{MASTERDATA['IPDPPRAFCC19'].Items[0].Value ? MASTERDATA['IPDPPRAFCC19'].Items[1].Value : ''}}</label>
              </span>
            </td>
          </tr>
        </table>
      </div>
      <table style="margin-top: 12px;">
        <tr>
          <td style="width: 80%">
            <table class="tbl-b font9pt-">
              <tr class="text-center">
                <td style="width: 75%"></td>
                <td style="width: 5%">Yes</td>
                <td style="width: 5%">No</td>
                <td style="width: 5%">N/A</td>
              </tr>
              <tr>
                <td style="width: 75%" colspan="4"><b>Khai thác tiền sử và khám lâm sàng/ <i>History and Physical Examination</i></b></td>
                <!-- <td style="width: 5%"></td>
                <td style="width: 5%"></td>
                <td style="width: 5%"></td> -->
              </tr>
              <!-- Bệnh nhân ngoại trú: khai thác tiền sử khám bệnh trong vòng 30 ngày -->
              <tr v-if="MASTERDATA['IPDPPRAFCC57']">
                <td><p>{{MASTERDATA['IPDPPRAFCC57'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC57'].EnName}}</i></p></td>
                <td :key="index + 'IPDPPRAFCC57'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC57'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC57-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- Có tiền sử can thiệp mạch vành qua da (PCI) hoặc phẫu thuật bắc cầu chủ vành (CABG) -->
              <tr v-if="MASTERDATA['IPDPPRAFCC61']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC61'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC61'].EnName}}</i></p>
                    <span>
                      <p style="margin-top: auto; margin-bottom: auto; margin-right: 12px;">{{MASTERDATA['IPDPPRAFCC65'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC65'].EnName}}</i> {{MASTERDATA['IPDPPRAFCC65'].Items[0].Value}}</p>
                    </span>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC61'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC61'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC61-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- Nghiệm pháp gắng sức hoặc đánh giá LVEF hoặc các kết quả chẩn đoán hình ảnh khác -->
              <tr v-if="MASTERDATA['IPDPPRAFCC67']">
                <td><p>{{MASTERDATA['IPDPPRAFCC67'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC67'].EnName}}</i></p></td>
                <td :key="index + 'IPDPPRAFCC67'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC67'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC67-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- Dị ứng -->
              <tr v-if="MASTERDATA['IPDPPRAFCC71']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC71'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC71'].EnName}}</i>: {{MedicationInfo.Allergy}}</p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC71'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC71'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC71-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- Ngừng thở khi ngủ -->
              <tr v-if="MASTERDATA['IPDPPRAFCC75']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC75'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC75'].EnName}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC75'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC75'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC75-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- Sử dụng Nicotin -->
              <tr v-if="MASTERDATA['IPDPPRAFCC79']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC79'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC79'].EnName}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC79'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC79'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC79-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- Sử dụng rượu -->
              <tr v-if="MASTERDATA['IPDPPRAFCC83']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC83'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC83'].EnName}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC83'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC83'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC83-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- Tiền sử kháng Heparin hoặc giảm tiểu cầu do dùng Heparin -->
              <tr v-if="MASTERDATA['IPDPPRAFCC87']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC87'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC87'].EnName}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC87'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC87'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC87-' + index"></label>
                    </span>
                </td>
              </tr>
              <tr>
                <td style="width: 75%" colspan="4"><b>Nguy cơ chảy máu/ <i>Bleeding risk</i></b></td>
                <!-- <td style="width: 5%"></td>
                <td style="width: 5%"></td>
                <td style="width: 5%"></td> -->
              </tr>
              <!-- Có tiền sử xuất huyết tiêu hóa hoặc tiết niệu hoặc các biến cố chảy máu khác -->
              <tr v-if="MASTERDATA['IPDPPRAFCC91']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC91'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC91'].EnName}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC91'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC91'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC91-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- Có dấu hiệu thiếu máu hoặc rối loạn đông máu, cảnh báo chảy máu đang diễn ra hoặc nguy cơ cao xảy ra -->
              <tr v-if="MASTERDATA['IPDPPRAFCC95']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC95'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC95'].EnName}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC95'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC95'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC95-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- Cần điều trị đồng thời thuốc chống đông và thuốc kháng tiểu cầu kép -->
              <tr v-if="MASTERDATA['IPDPPRAFCC99']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC99'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC99'].EnName}}</i></p>
                    <span >
                      <p style="margin-top: auto; margin-bottom: auto; margin-right: 12px;">{{__label(MASTERDATA['IPDPPRAFCC103'])}} {{MASTERDATA['IPDPPRAFCC103'].Items[0].Value}}</p>
                    </span>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC99'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC99'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC99-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- Đánh giá nguy cơ chảy máu -->
              <tr v-if="MASTERDATA['IPDPPRAFCC105']">
                <td>
                  <div>
                    <p >{{MASTERDATA['IPDPPRAFCC105'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC105'].EnName}}</i> {{MASTERDATA['IPDPPRAFCC105'].Items[0].Value !== '' ? MASTERDATA['IPDPPRAFCC105'].Items[0].Value : '&#160;&#160;&#160;&#160;'}} %</p>
                  </div>
                  <div style="align-items: baseline; margin-top: 12px;">
                    <p >{{MASTERDATA['IPDPPRAFCC107'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC107'].EnName}}</i> {{MASTERDATA['IPDPPRAFCC107'].Items[0].Value}}</p>
                  </div>
                  <p>Đánh giá nguy cơ chảy máu: Thấp (&#60;= 2%), Trung bình (> 2% &#60;= 6.5%), Cao (> 6.5%)/ Assess Bleeding risk: Low (&#60;= 2%), Moderate (> 2% &#60;= 6.5%), High (> 6.5%)</p>
                </td>
                <td style="width: 5%"></td>
                <td style="width: 5%"></td>
                <td style="width: 5%"></td>
              </tr>
              <!-- Nguy cơ chảy máu cao -->
              <tr v-if="MASTERDATA['IPDPPRAFCC109']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC109'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC109'].EnName}}</i></p>
                    <span>
                      <p>{{MASTERDATA['IPDPPRAFCC113'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC113'].EnName}}</i>: {{MASTERDATA['IPDPPRAFCC113'].Items[0].Value}}</p>
                    </span>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC109'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC109'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC109-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- Liệu pháp bắc cầu thuốc chống đông -->
              <tr v-if="MASTERDATA['IPDPPRAFCC115']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC115'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC115'].EnName}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC115'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC115'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC115-' + index"></label>
                    </span>
                </td>
              </tr>
              <tr>
                <td style="width: 75%" colspan="4"><b>Nguy cơ thuyên tắc mạch/ <i>Thromboembolic risk</i></b></td>
                <!-- <td style="width: 5%"></td>
                <td style="width: 5%"></td>
                <td style="width: 5%"></td> -->
              </tr>
              <!-- Có van cơ học -->
              <tr v-if="MASTERDATA['IPDPPRAFCC119']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC119'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC119'].EnName}}:</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC119'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC119'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC119-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- Có tiền sử đột quỵ với van cơ học... -->
              <tr v-if="MASTERDATA['IPDPPRAFCC123']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC123'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC123'].EnName}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC123'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC123'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC123-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- Rung nhĩ với van tim cơ học ở vị trí van hai lá hoặc van động mạch chủ -->
              <tr v-if="MASTERDATA['IPDPPRAFCC127']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC127'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC127'].EnName}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC127'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC127'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC127-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- Rung nhĩ gây ra đột quỵ hoặc con thiếu máu não cụ bộ thoáng qua (trong vòng 3 tháng) -->
              <tr v-if="MASTERDATA['IPDPPRAFCC131']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC131'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC131'].EnName}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC131'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC131'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC131-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- Thuyên tắc huyết khối tĩnh mạch trong vòng 3 tháng trước -->
              <tr v-if="MASTERDATA['IPDPPRAFCC135']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC135'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC135'].EnName}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC135'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC135'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC135-' + index"></label>
                    </span>
                </td>
              </tr>
              <tr>
                <td style="width: 75%" colspan="4"><b>Nguy cơ tổn thương thận do thuốc cản quang/ <i>Contrast- Induced- Nephropathy risk</i></b></td>
                <!-- <td style="width: 5%"></td>
                <td style="width: 5%"></td>
                <td style="width: 5%"></td> -->
              </tr>
              <!-- Điểm Mehran -->
              <tr v-if="MASTERDATA['IPDPPRAFCC139']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC139'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC139'].EnName}}</i> {{MASTERDATA['IPDPPRAFCC139'].Items[0].Value !== '' ? MASTERDATA['IPDPPRAFCC139'].Items[0].Value : '&#160;&#160;&#160;&#160;'}} điểm/ <i>points</i></p>
                  </div>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC141'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC141'].EnName}}</i> {{MASTERDATA['IPDPPRAFCC141'].Items[0].Value !== '' ? MASTERDATA['IPDPPRAFCC141'].Items[0].Value : '&#160;&#160;&#160;&#160;'}} %</p>
                  </div>
                  <div style="margin-top: 10px;">
                    <p >{{MASTERDATA['IPDPPRAFCC143'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC143'].EnName}}</i> {{MASTERDATA['IPDPPRAFCC143'].Items[0].Value !== '' ? MASTERDATA['IPDPPRAFCC143'].Items[0].Value : '&#160;&#160;&#160;&#160;'}} %</p>
                  </div>
                </td>
                <td style="width: 5%"></td>
                <td style="width: 5%"></td>
                <td style="width: 5%"></td>
              </tr>
              <!-- Ngưỡng tối đa thuốc cản quan ước tính trong giới hạn an toàn -->
              <tr v-if="MASTERDATA['IPDPPRAFCC145']">
                <td>
                  <div>
                    <p >{{MASTERDATA['IPDPPRAFCC145'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC145'].EnName}}</i> {{MASTERDATA['IPDPPRAFCC145'].Items[0].Value !== '' ? MASTERDATA['IPDPPRAFCC145'].Items[0].Value : '&#160;&#160;&#160;&#160;'}} ml</p>
                  </div>
                </td>
                <td style="width: 5%"></td>
                <td style="width: 5%"></td>
                <td style="width: 5%"></td>
              </tr>
              <!-- Dừng sử dụng các thuốc liên quan tới thổn thương thận do dùng thuốc cản quang -->
              <tr v-if="MASTERDATA['IPDPPRAFCC147']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC147'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC147'].EnName}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC147'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC147'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC147-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- Truyền dịch trước thủ thuật -->
              <tr v-if="MASTERDATA['IPDPPRAFCC151']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC151'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC151'].EnName}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC151'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC151'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC151-' + index"></label>
                    </span>
                </td>
              </tr>
              <tr>
                <td style="width: 75%" colspan="4"><b>Y lệnh thuốc/ Medication</b></td>
                <!-- <td style="width: 5%"></td>
                <td style="width: 5%"></td>
                <td style="width: 5%"></td> -->
              </tr>
              <!-- 1. Aspirin được dùng trong vòng 24 tiếng -->
              <tr v-if="MASTERDATA['IPDPPRAFCC155']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC155'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC155'].EnName.replace('1.', '')}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC155'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC155'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC155-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- 2. Clopidogrel hoặc prasugrel hoặc ticagrelor được dùng trong vòng 24 tiếng -->
              <tr v-if="MASTERDATA['IPDPPRAFCC159']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC159'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC159'].EnName.replace('2.', '')}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC159'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC159'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC159-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- 3. Đối với bệnh nhân đái tháo đường, Metformin hoặc các thuốc khác được dùng trong vòng 24 tiếng và đường huyết của người bệnh được theo dõi -->
              <tr v-if="MASTERDATA['IPDPPRAFCC163']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC163'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC163'].EnName.replace('3.', '')}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC163'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC163'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC163-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- 4. Sildenafil (hoặc chất ức chế PDE5 khác) được dùng trong vòng 24 tiếng -->
              <tr v-if="MASTERDATA['IPDPPRAFCC167']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC167'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC167'].EnName.replace('4.', '')}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC167'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC167'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC167-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- 5. Heparin trọng lượng phân tử thấp (LMWH) được dùng trong vòng 12 tiếng -->
              <tr v-if="MASTERDATA['IPDPPRAFCC171']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC171'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC171'].EnName.replace('5.', '')}}</i></p>
                    <span>
                      <p style="margin-top: auto; margin-bottom: auto; margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC175'])}} {{MASTERDATA['IPDPPRAFCC175'].Items[0].Value}}</p>
                    </span>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC171'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC171'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC171-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- 6. Thuốc chống đông? -->
              <tr v-if="MASTERDATA['IPDPPRAFCC177']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC177'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC177'].EnName.replace('6.', '')}}</i></p>
                    <div>
                      <p>{{MASTERDATA['IPDPPRAFCC181'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC181'].EnName}}</i> {{MASTERDATA['IPDPPRAFCC181'].Items[0].Value}}</p>
                    </div>
                    <div>
                      <p>{{MASTERDATA['IPDPPRAFCC183'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC183'].EnName}}</i> {{MASTERDATA['IPDPPRAFCC183'].Items[0].Value}}</p>
                    </div>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC177'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC177'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC177-' + index"></label>
                    </span>
                </td>
              </tr>
              <tr>
                <td style="width: 75%" colspan="4"><b>Nguy cơ biến chứng đường vào mạch máu/ <i>Risk of access site complications</i></b></td>
                <!-- <td style="width: 5%"></td>
                <td style="width: 5%"></td>
                <td style="width: 5%"></td> -->
              </tr>
              <!-- Nhiễm trùng tại đường vào? -->
              <tr v-if="MASTERDATA['IPDPPRAFCC185']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC185'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC185'].EnName}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC185'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC185'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC185-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- Bệnh nhân tiểu đường? -->
              <tr v-if="MASTERDATA['IPDPPRAFCC189']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC189'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC189'].EnName}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC189'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC189'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC189-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- Bệnh mạch máu ngoại biên? -->
              <tr v-if="MASTERDATA['IPDPPRAFCC193']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC193'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC193'].EnName}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC193'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC193'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC193-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- Bệnh béo phì? -->
              <tr v-if="MASTERDATA['IPDPPRAFCC197']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC197'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC197'].EnName}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC197'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC197'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC197-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- Kết quả test Allen hoặc Barbeau bình thường -->
              <tr v-if="MASTERDATA['IPDPPRAFCC201']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC201'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC201'].EnName}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC201'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC201'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC201-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- Đường vào mạch máu ưu tiên -->
              <tr v-if="MASTERDATA['IPDPPRAFCC205']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC205'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC205'].EnName}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC205'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC205'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC205-' + index"></label>
                    </span>
                </td>
              </tr>
              <tr>
                <td style="width: 75%" colspan="4"><b>Quá trình xác minh/ <i>Verification process</i></b></td>
                <!-- <td style="width: 5%"></td>
                <td style="width: 5%"></td>
                <td style="width: 5%"></td> -->
              </tr>
              <!-- Không có hCG trong nước tiểu/huyết thanh ở phụ nữ độ tuổi mang thai (12 - 60 tuổi)? -->
              <tr v-if="MASTERDATA['IPDPPRAFCC209']">
                <td>
                  <div>
                    <p v-if="MASTERDATA['IPDPPRAFCC209']">{{MASTERDATA['IPDPPRAFCC209'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC209'].EnName}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC209'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC209'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC209-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- Đã kí cam kết đồng ý thực hiện thủ thuật? -->
              <tr v-if="MASTERDATA['IPDPPRAFCC213']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC213'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC213'].EnName}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC213'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC213'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC213-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- Lập trình viên thiết bị có mặt để đánh giá các trường hợp đã có thiết bị cấy ghép trước đây, chẩn đoán và thực hiện các đánh giá trước thủ thuật. -->
              <tr v-if="MASTERDATA['IPDPPRAFCC217']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC217'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC217'].EnName}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC217'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC217'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC217-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- Xác nhận tính sẵn có và sự phù hợp của các thiết bị đặc biệt quan trọng đối với thủ thuật -->
              <tr v-if="MASTERDATA['IPDPPRAFCC221']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC221'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC221'].EnName}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC221'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC221'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC221-' + index"></label>
                    </span>
                </td>
              </tr>
              <!-- Khám tiền mê trước các thủ thuật can thiệp tim mạch -->
              <tr v-if="MASTERDATA['IPDPPRAFCC225']">
                <td>
                  <div>
                    <p>{{MASTERDATA['IPDPPRAFCC225'].ViName}}/ <i>{{MASTERDATA['IPDPPRAFCC225'].EnName}}</i></p>
                  </div>
                </td>
                <td :key="index + 'IPDPPRAFCC225'"
                    v-for="(item, index) in MASTERDATA['IPDPPRAFCC225'].Items">
                    <span class="v-checkbox text-center">
                      <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                      <label class="ml-5" :for="'IPDPPRAFCC225-' + index"></label>
                    </span>
                </td>
              </tr>
            </table>
          </td>
          <td style="margin-left: 12px; vertical-align: top;">
            <table style="margin-left: 5px;" class="tbl-b font9pt-" >
              <tr>
                <td style="width: 50%">
                  <label>{{__label(MASTERDATA['IPDPPRAFCC21'])}}</label>
                </td>
                <td>
                  <p>{{MASTERDATA['IPDPPRAFCC21'].Items[0].Value}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC23'])}}</label>
                </td>
                <td>
                  <p>{{MASTERDATA['IPDPPRAFCC23'].Items[0].Value}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC25'])}}</label>
                </td>
                <td>
                  <p>{{MASTERDATA['IPDPPRAFCC25'].Items[0].Value}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC27'])}}</label>
                </td>
                <td>
                  <p>{{MASTERDATA['IPDPPRAFCC27'].Items[0].Value}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC29'])}}</label>
                </td>
                <td>
                  <p>{{MASTERDATA['IPDPPRAFCC29'].Items[0].Value}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC31'])}}</label>
                </td>
                <td>
                  <p>{{MASTERDATA['IPDPPRAFCC31'].Items[0].Value}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC33'])}}</label>
                </td>
                <td>
                  <p>{{MASTERDATA['IPDPPRAFCC33'].Items[0].Value}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC35'])}}</label>
                </td>
                <td>
                  <p>{{MASTERDATA['IPDPPRAFCC35'].Items[0].Value}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC37'])}}</label>
                </td>
                <td>
                  <p>{{MASTERDATA['IPDPPRAFCC37'].Items[0].Value}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC39'])}}</label>
                </td>
                <td>
                  <p>{{MASTERDATA['IPDPPRAFCC39'].Items[0].Value}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC41'])}}</label>
                </td>
                <td>
                  <p>{{MASTERDATA['IPDPPRAFCC41'].Items[0].Value}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC43'])}}</label>
                </td>
                <td>
                  <p>{{MASTERDATA['IPDPPRAFCC43'].Items[0].Value}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC45'])}}</label>
                </td>
                <td>
                  <p>{{MASTERDATA['IPDPPRAFCC45'].Items[0].Value}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC47'])}}</label>
                </td>
                <td>
                  <p>{{MASTERDATA['IPDPPRAFCC47'].Items[0].Value}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC234'])}}</label>
                </td>
                <td>
                  <p>{{MASTERDATA['IPDPPRAFCC234'].Items[0].Value}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC49'])}}</label>
                </td>
                <td>
                  <p>{{MASTERDATA['IPDPPRAFCC49'].Items[0].Value}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC51'])}}</label>
                </td>
                <td>
                  <p>{{MASTERDATA['IPDPPRAFCC51'].Items[0].Value}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC53'])}}</label>
                </td>
                <td>
                  <p>{{MASTERDATA['IPDPPRAFCC53'].Items[0].Value !== 'NaN' ? MASTERDATA['IPDPPRAFCC53'].Items[0].Value : ''}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC55'])}}</label>
                </td>
                <td>
                  <p>{{MASTERDATA['IPDPPRAFCC55'].Items[0].Value}}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table width="100%" class="tbl-b2">
        <tr>
          <td width="40%"></td>
          <td style="text-align: center;">
            <div style="text-align: center;" class="mrb10 italic">{{HouseCreated[0] || '&emsp;&emsp;'}} Giờ/Hour {{HouseCreated[1] || '&emsp;&emsp;'}} Ngày/date {{DateCreated[0] || '&emsp;&emsp;'}} tháng/month {{DateCreated[1] || '&emsp;&emsp;'}} năm/year {{DateCreated[2] || '&emsp;&emsp;'}}</div>
            <div style="text-align: center;" ><b>Bác sỹ can thiệp/ <i>Interventionists</i></b></div>
            <div class="hidden-text"><b>Bác sỹ can thiệp</b></div>
            <div class="hidden-text"><b>Bác sỹ can thiệp</b></div>
            <div class="hidden-text"><b>Bác sỹ can thiệp</b></div>
            <div class="hidden-text"><b>Bác sỹ can thiệp</b></div>
            <div class="hidden-text"><b>Bác sỹ can thiệp</b></div>
            <div style="text-align: center;"><i>Họ và tên/Fullname: {{CreatedBy ? CreatedBy : ''}}</i></div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>

import PreProcedureRiskAssessmentForCardiacCatheterization from '@/services/IPD/MedicalRecordExtenstion/PreProcedureRiskAssessmentForCardiacCatheterization.js'
import constants from '@/constants'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
export default {
  name: 'PreProcedureRiskAssessmentForCardiacCatheterization',
  props: ['viewOnly', 'VisitId', 'MASTERDATA', 'Data'],
  data () {
    return {
      PatientInfo: {},
      GENDER: constants.GENDER,
      FormExist: true,
      NeedCreateRecordExtenstion: false,
      DataSubmit: {},
      nullContent: true,
      dataMaster: '',
      createdBy: '',
      maxDate: Date.now(),
      MedicationInfo: {},
      ConfirmInfo: {},
      user: {},
      readOnly: true,
      CreateTime: '',
      CreatedBy: ''
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    DateCreated: function () {
      return (this.Data.PreProcedureRiskAssessmentDatas.find(e => e.Code === 'IPDPPRAFCC231').Value) ? this.Data.PreProcedureRiskAssessmentDatas.find(e => e.Code === 'IPDPPRAFCC231').Value.split(' ')[1].split('/') : ['', '', '']
    },
    HouseCreated: function () {
      if (this.Data) {
        return (this.Data.PreProcedureRiskAssessmentDatas.find(e => e.Code === 'IPDPPRAFCC231').Value) ? this.$options.filters.formatDateWithoutSecon(this.Data.PreProcedureRiskAssessmentDatas.find(e => e.Code === 'IPDPPRAFCC231').Value).split(' ')[0].split(':') : ['', '']
      }
    }
  },
  components: {
    VDateTimePicker
  },
  watch: {
  },
  methods: {
    getData () {
      let url = `A01_034_290422_V/PreProcedureRiskAssessmentForCardiacCatheterization/${this._VisitId}`
      new PreProcedureRiskAssessmentForCardiacCatheterization().find(url).then(response => {
        this.MedicationInfo = response.MedicationInfo.CustomerMedicationInfo
        this.CreatedBy = response.FullNameCreate

        this.MASTERDATA['IPDPPRAFCC232'].Items[0].Value = this.createdBy
        this.MASTERDATA['IPDPPRAFCC51'].Items[0].Value = response.Height
        this.MASTERDATA['IPDPPRAFCC49'].Items[0].Value = response.Weight
        this.MASTERDATA['IPDPPRAFCC53'].Items[0].Value = this.bmiCalculation()

        if (this.MedicationInfo.Allergy === 'Không') {
          this.MASTERDATA['IPDPPRAFCC71'].Items[0].Value = false
          this.MASTERDATA['IPDPPRAFCC71'].Items[1].Value = true
          this.MASTERDATA['IPDPPRAFCC71'].Items[2].Value = false
          this.MedicationInfo.Allergy = ''
        } else if (this.MedicationInfo.Allergy === 'Không xác định' || this.MedicationInfo.Allergy === null || this.MedicationInfo.Allergy === '') {
          this.MASTERDATA['IPDPPRAFCC71'].Items[0].Value = false
          this.MASTERDATA['IPDPPRAFCC71'].Items[1].Value = false
          this.MASTERDATA['IPDPPRAFCC71'].Items[2].Value = true
          this.MedicationInfo.Allergy = ''
        } else {
          this.MASTERDATA['IPDPPRAFCC71'].Items[0].Value = true
          this.MASTERDATA['IPDPPRAFCC71'].Items[1].Value = false
          this.MASTERDATA['IPDPPRAFCC71'].Items[2].Value = false
        }
      })

      this.nullContent = true
      this.dataMaster = JSON.stringify(this.MASTERDATA)
      this.createdBy = this.getUser()
    },
    bmiCalculation: function () {
      var weight = this.MASTERDATA['IPDPPRAFCC49'].Items[0].Value
        ? parseFloat(this.MASTERDATA['IPDPPRAFCC49'].Items[0].Value)
        : 0
      var height = this.MASTERDATA['IPDPPRAFCC51'].Items[0].Value
        ? parseFloat(this.MASTERDATA['IPDPPRAFCC51'].Items[0].Value) / 100
        : 0
      return (weight / (height * height)).toFixed(2)
    }
  }
}
</script>
