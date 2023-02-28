<template>
  <div>
    <div class="main-content" id="di0-page" hidden>
      <div class="a4-page box" id="printMe">
        <table class="table" style="width: 100%">
          <tr>
            <td width="22%"  style="vertical-align: top;" align="top">
              <img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" />
            </td>
            <td>
              <div style="vertical-align: center;">
                <p class="textUppercase font-bold font-italic">Trung tâm sàng lọc ung thư vú - bệnh viện đa khoa quốc tế Vinmec</p>
                <p class="textUppercase font-italic" style="margin-left: 5px;">Breast Service Line - International Hospital Vinmec</p>
              </div>
            </td>
          </tr>
        </table>
        <table class="table standing-order-tbl td-re">
          <tr>
            <th width="100%" class="text-center" style="text-align: center; vertical-align: top;" align="top">
              <h3 class="text-center font-bold textUppercase" style="font-size: 18px; text-align: center; margin-bottom: 30px; margin-top: 20px;">{{__t('Thông tin khách hàng - Đánh giá nguy cơ ung thư (UT)')}}</h3>
            </th>
          </tr>
          <tr v-if="Customer && DataInfo" class="display-flex">
            <td style="width: 50%">
              <div style="width: 80%; padding: 10px 20px; border: 1px solid black; border-radius: 12px">
                <div class="display-flex" style="align-items: center;">
                  <p style="margin-right: 5px">Họ và tên:</p>
                  <p>{{Customer.Fullname}}</p>
                </div>
                <div class="display-flex" style="align-items: center;">
                  <p style="margin-right: 5px">Số PID:</p>
                  <p>{{Customer.PID}}</p>
                </div>
                <div class="display-flex" style="align-items: center;">
                  <div class="display-flex" style="align-items: center;">
                    <p style="margin-right: 5px">Ngày sinh:</p>
                    <p>{{Customer.DateOfBirth}}</p>
                  </div>
                  <div class="display-flex" style="align-items: center;">
                    <p style="margin-left: 10px; margin-right: 5px;">tuổi:</p>
                    <p>{{getAge(Customer.DateOfBirth)}}</p>
                  </div>
                </div>
                <div class="display-flex" style="align-items: center;">
                  <p style="margin-right: 5px">Giới tính:</p>
                  <p>{{getGender(Customer.Gender)}}</p>
                </div>
              </div>
            </td>
            <td style="width: 50%">
              <div>
                <div class="display-flex">
                  <p class="no-wrap" style="margin-right: 5px">Địa chỉ:</p>
                  <p style="overflow-wrap: anywhere;">{{Customer.Address}}</p>
                </div>
                <div class="display-flex" style="align-items: center;">
                  <p style="margin-right: 5px">Số điện thoại:</p>
                  <p>{{Customer.Phone || '. . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
                </div>
                <div class="display-flex" style="align-items: center;">
                  <div class="display-flex mg-rg-5" style="align-items: center; margin-right: 10px;">
                    <p style="margin-right: 5px">Chiều cao:</p>
                    <p>{{DataInfo.VitalSigns.Height / 100 || '. . . . . . . .'}}</p>
                    <p style="margin-left: 5px">m</p>
                  </div>
                  <div class="display-flex" style="align-items: center;">
                    <p style="margin-right: 5px">Cân nặng:</p>
                    <p>{{DataInfo.VitalSigns.Weight || '. . . . . . . .'}}</p>
                    <p style="margin-left: 5px">kg</p>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <table>
          <tr>
            <td>
              <p style="font-weight: bold; font-style: italic;">Để có kết quả tốt nhất, xin vui lòng trả lời những câu hỏi dưới đây:</p>
              <ol>
                <!-- 1. -->
                <li v-if="MASTERDATA['OPDCARIAS5']">
                  <div class="display-flex" style="align-items: center;">
                    <p>{{__label(MASTERDATA['OPDCARIAS5'])}}</p>
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS5']" v-model="MASTERDATA['OPDCARIAS5'].Items[0].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS5'].Items[0])}}</p>
                    </div>
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS5']" v-model="MASTERDATA['OPDCARIAS5'].Items[1].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS5'].Items[1])}}</p>
                    </div>
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS5']" v-model="MASTERDATA['OPDCARIAS5'].Items[2].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS5'].Items[2])}}</p>
                    </div>
                  </div>
                </li>
                <!-- 2. -->
                <li v-if="MASTERDATA['OPDCARIAS9']">
                  <p>{{__label(MASTERDATA['OPDCARIAS9'])}}</p>
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS9']" v-model="MASTERDATA['OPDCARIAS9'].Items[0].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS9'].Items[0])}}</p>
                    </div>
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS9']" v-model="MASTERDATA['OPDCARIAS9'].Items[1].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS9'].Items[1])}}</p>
                    </div>
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS9']" v-model="MASTERDATA['OPDCARIAS9'].Items[2].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS9'].Items[2])}}</p>
                    </div>
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS9']" v-model="MASTERDATA['OPDCARIAS9'].Items[3].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS9'].Items[3])}}</p>
                    </div>
                  </div>
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS9']" v-model="MASTERDATA['OPDCARIAS9'].Items[4].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS9'].Items[4])}}</p>
                    </div>
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS9']" v-model="MASTERDATA['OPDCARIAS9'].Items[5].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS9'].Items[5])}}</p>
                    </div>
                  </div>
                </li>
                <!-- 3. -->
                <li v-if="MASTERDATA['OPDCARIAS16']">
                  <p>{{__label(MASTERDATA['OPDCARIAS16'])}}</p>
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center; margin-left: 20px; margin-right: 100px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS16']" v-model="MASTERDATA['OPDCARIAS16'].Items[0].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS16'].Items[0])}}</p>
                    </div>
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS16']" v-model="MASTERDATA['OPDCARIAS16'].Items[1].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS16'].Items[1])}}</p>
                      <p class="text-initial">&emsp;(nếu có, khi nào?: {{MASTERDATA['OPDCARIAS16'].Items[2].Value || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . '}})</p>
                    </div>
                  </div>
                  <div class="display-flex" style="align-items: center; margin-left: 20px;">
                    <p class="text-initial">{{__label(MASTERDATA['OPDCARIAS16'].Items[3])}}: {{MASTERDATA['OPDCARIAS16'].Items[3].Value || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . '}}</p>
                  </div>
                </li>
                <!-- 4. -->
                <li v-if="MASTERDATA['OPDCARIAS21']">
                  <div class="display-flex" style="align-items: center;">
                    <p>{{__label(MASTERDATA['OPDCARIAS21'])}}</p>
                    <p class="text-initial">&emsp;{{MASTERDATA['OPDCARIAS21'].Items[0].Value || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . '}}</p>
                  </div>
                  <div class="display-flex" style="align-items: center; margin-left: 20px;">
                    <p class="text-initial">{{__label(MASTERDATA['OPDCARIAS21'].Items[1])}}&emsp;{{MASTERDATA['OPDCARIAS21'].Items[1].Value || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
                  </div>
                </li>
                <!-- 5. -->
                <li v-if="MASTERDATA['OPDCARIAS24']">
                  <div class="display-flex" style="align-items: center;">
                    <p>{{__label(MASTERDATA['OPDCARIAS24'])}}</p>
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS24']" v-model="MASTERDATA['OPDCARIAS24'].Items[0].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS24'].Items[0])}}</p>
                    </div>
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS24']" v-model="MASTERDATA['OPDCARIAS24'].Items[1].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS24'].Items[1])}}</p>
                    </div>
                  </div>
                  <div class="display-flex" style="align-items: center; margin-left: 20px;">
                    <p class="text-initial">{{__label(MASTERDATA['OPDCARIAS24'].Items[2])}}&emsp;{{MASTERDATA['OPDCARIAS24'].Items[2].Value || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
                  </div>
                </li>
                <!-- 6. -->
                <li v-if="MASTERDATA['OPDCARIAS28']">
                  <div class="display-flex" style="align-items: center">
                    <p class="text-initial">{{__label(MASTERDATA['OPDCARIAS28'].Items[0])}}&emsp;{{MASTERDATA['OPDCARIAS28'].Items[0].Value || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
                  </div>
                </li>
                <!-- 7. -->
                <li v-if="MASTERDATA['OPDCARIAS30']">
                  <div class="display-flex">
                    <p>{{__label(MASTERDATA['OPDCARIAS30'])}}</p>
                    <div>
                      <div class="display-flex" style="align-items: center; margin-left: 20px;">
                        <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS30']" v-model="MASTERDATA['OPDCARIAS30'].Items[0].Value"/></div>
                        <p>{{__label(MASTERDATA['OPDCARIAS30'].Items[0])}}</p>
                      </div>
                      <div class="display-flex" style="align-items: center; margin-left: 20px;">
                        <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS30']" v-model="MASTERDATA['OPDCARIAS30'].Items[2].Value"/></div>
                        <p>{{__label(MASTERDATA['OPDCARIAS30'].Items[2])}}</p>
                      </div>
                    </div>
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS30']" v-model="MASTERDATA['OPDCARIAS30'].Items[1].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS30'].Items[1])}}</p>
                    </div>
                  </div>
                  <div class="display-flex" style="align-items: center; margin-left: 20px;">
                    <p class="text-initial">{{__label(MASTERDATA['OPDCARIAS30'].Items[3])}}&emsp;{{MASTERDATA['OPDCARIAS30'].Items[3].Value || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
                  </div>
                </li>
                <!-- 8. -->
                <li v-if="MASTERDATA['OPDCARIAS35']">
                  <p>{{__label(MASTERDATA['OPDCARIAS35'])}}</p>
                  <div class="display-flex" style="align-items: center">
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS35']" v-model="MASTERDATA['OPDCARIAS35'].Items[0].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS35'].Items[0])}}</p>
                    </div>
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS35']" v-model="MASTERDATA['OPDCARIAS35'].Items[1].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS35'].Items[1])}}</p>
                    </div>
                  </div>
                  <div class="display-flex" style="align-items: center; margin-left: 20px;">
                    <p class="text-initial">{{__label(MASTERDATA['OPDCARIAS35'].Items[2])}}&emsp;{{MASTERDATA['OPDCARIAS35'].Items[2].Value || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
                  </div>
                </li>
                <!-- 9. -->
                <li v-if="MASTERDATA['OPDCARIAS39']">
                  <div class="display-flex" style="align-items: center">
                    <p>{{__label(MASTERDATA['OPDCARIAS39'])}}</p>
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS39']" v-model="MASTERDATA['OPDCARIAS39'].Items[0].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS39'].Items[0])}}</p>
                    </div>
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS39']" v-model="MASTERDATA['OPDCARIAS39'].Items[1].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS39'].Items[1])}}</p>
                    </div>
                  </div>
                </li>
                <!-- 10. -->
                <li v-if="MASTERDATA['OPDCARIAS42']">
                  <p>{{__label(MASTERDATA['OPDCARIAS42'])}}</p>
                  <div class="display-flex" style="align-items: center; margin-bottom: 10px;">
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS42']" v-model="MASTERDATA['OPDCARIAS42'].Items[0].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS42'].Items[0])}}</p>
                    </div>
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS42']" v-model="MASTERDATA['OPDCARIAS42'].Items[1].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS42'].Items[1])}}</p>
                    </div>
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS42']" v-model="MASTERDATA['OPDCARIAS42'].Items[2].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS42'].Items[2])}}</p>
                    </div>
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS42']" v-model="MASTERDATA['OPDCARIAS42'].Items[3].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS42'].Items[3])}}</p>
                    </div>
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS42']" v-model="MASTERDATA['OPDCARIAS42'].Items[4].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS42'].Items[4])}}</p>
                    </div>
                  </div>
                  <div v-if="MASTERDATA['OPDCARIAS48']" class="display-flex BreakPage" style="align-items: center;">
                    <p style="font-style: italic;">{{__label(MASTERDATA['OPDCARIAS48'])}}</p>
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS48']" v-model="MASTERDATA['OPDCARIAS48'].Items[0].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS48'].Items[0])}}</p>
                    </div>
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS48']" v-model="MASTERDATA['OPDCARIAS48'].Items[1].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS48'].Items[1])}}</p>
                    </div>
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS48']" v-model="MASTERDATA['OPDCARIAS48'].Items[2].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS48'].Items[2])}}</p>
                    </div>
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS48']" v-model="MASTERDATA['OPDCARIAS48'].Items[3].Value"/></div>
                      <p class="text-initial">{{__label(MASTERDATA['OPDCARIAS48'].Items[4])}}&emsp;{{MASTERDATA['OPDCARIAS48'].Items[4].Value || '. . . . . . . . . . . . . . . .'}}</p>
                    </div>
                  </div>
                </li>
                <!-- 11. -->
                <li v-if="MASTERDATA['OPDCARIAS54']" style="margin-left: 0 !important">
                  <p>{{__label(MASTERDATA['OPDCARIAS54'])}}</p>
                  <div class="display-flex" style="align-items: center">
                    <div>
                      <div class="display-flex" style="align-items: center; margin-left: 20px;">
                        <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS54']" v-model="MASTERDATA['OPDCARIAS54'].Items[0].Value"/></div>
                        <p>{{__label(MASTERDATA['OPDCARIAS54'].Items[0])}}</p>
                      </div>
                      <div class="display-flex" style="align-items: center; margin-left: 20px;">
                        <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS54']" v-model="MASTERDATA['OPDCARIAS54'].Items[2].Value"/></div>
                        <p>{{__label(MASTERDATA['OPDCARIAS54'].Items[2])}}</p>
                      </div>
                    </div>
                    <div style="margin-left: 120px;">
                      <div class="display-flex" style="align-items: center; margin-left: 20px;">
                        <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS54']" v-model="MASTERDATA['OPDCARIAS54'].Items[1].Value"/></div>
                        <p>{{__label(MASTERDATA['OPDCARIAS54'].Items[1])}}</p>
                      </div>
                      <div class="display-flex" style="align-items: center; margin-left: 20px;">
                        <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS54']" v-model="MASTERDATA['OPDCARIAS54'].Items[3].Value"/></div>
                        <p>{{__label(MASTERDATA['OPDCARIAS54'].Items[3])}}</p>
                      </div>
                    </div>
                  </div>
                </li>
                <!-- 12. -->
                <li v-if="MASTERDATA['OPDCARIAS59']">
                  <p>{{__label(MASTERDATA['OPDCARIAS59'])}}</p>
                  <div class="display-flex" style="align-items: center">
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS59']" v-model="MASTERDATA['OPDCARIAS59'].Items[0].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS59'].Items[0])}}</p>
                    </div>
                    <div class="display-flex" style="align-items: center; margin-left: 186px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS59']" v-model="MASTERDATA['OPDCARIAS59'].Items[1].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS59'].Items[1])}}</p>
                    </div>
                  </div>
                  <!-- Nếu có được chẩn đoán là -->
                  <p style="font-style: italic;">{{__label(MASTERDATA['OPDCARIAS62'])}}:</p>
                  <div class="display-flex">
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS62']" v-model="MASTERDATA['OPDCARIAS62'].Items[0].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS62'].Items[0])}}</p>
                    </div>
                    <div class="display-flex" style="align-items: center; margin-left: 155px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS62']" v-model="MASTERDATA['OPDCARIAS62'].Items[3].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS62'].Items[3])}}</p>
                    </div>
                  </div>
                  <div class="display-flex">
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS62']" v-model="MASTERDATA['OPDCARIAS62'].Items[1].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS62'].Items[1])}}</p>
                    </div>
                    <div class="display-flex" style="align-items: center; margin-left: 81px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS62']" v-model="MASTERDATA['OPDCARIAS62'].Items[4].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS62'].Items[4])}}</p>
                    </div>
                  </div>
                  <div class="display-flex">
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS62']" v-model="MASTERDATA['OPDCARIAS62'].Items[2].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS62'].Items[2])}}</p>
                    </div>
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS62']" v-model="MASTERDATA['OPDCARIAS62'].Items[5].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS62'].Items[5])}}</p>
                    </div>
                  </div>
                </li>
                <!-- 13. -->
                <li v-if="MASTERDATA['OPDCARIAS69']">
                  <p>{{__label(MASTERDATA['OPDCARIAS69'])}}</p>
                  <div class="display-flex">
                    <div class="display-flex" style="align-items: center; margin-left: 20px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS69']" v-model="MASTERDATA['OPDCARIAS69'].Items[0].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS69'].Items[0])}}</p>
                    </div>
                    <div class="display-flex" style="align-items: center; margin-left: 60px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS69']" v-model="MASTERDATA['OPDCARIAS69'].Items[1].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS69'].Items[1])}}</p>
                    </div>
                    <div class="display-flex" style="align-items: center; margin-left: 60px;">
                      <div style="margin-right: 5px;"><VTich v-if="MASTERDATA['OPDCARIAS69']" v-model="MASTERDATA['OPDCARIAS69'].Items[2].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDCARIAS69'].Items[2])}}</p>
                    </div>
                  </div>
                <div class="display-flex" style="align-items: center; margin-left: 20px;">
                    <p class="text-initial">{{__label(MASTERDATA['OPDCARIAS69'].Items[3])}}&emsp;{{MASTERDATA['OPDCARIAS69'].Items[3].Value || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
                  </div>
                </li>
              </ol>
            </td>
          </tr>
        </table>
        <div style="width: 100%; height: 2px; background-color: #000;"></div>
        <table>
          <tr>
            <td>
              <div v-if="MASTERDATA['OPDCARIAS74']" class="display-flex">
                <p class="font-bold" style="margin-right: 20px">Phần đánh giá của bác sĩ:&nbsp;</p>
                <p class="text-initial textUppercase">{{__label(MASTERDATA['OPDCARIAS74'].Items[0])}}&nbsp;{{MASTERDATA['OPDCARIAS74'].Items[0].Value || '. . . . . . . . . . . . . .'}}</p>
                <p class="textUppercase">&nbsp;Model</p>
              </div>
              <p>Theo thông tin được cung cấp, nguy cơ UT vú xâm lấn của khách hàng được ước tính:</p>
              <div style="margin-bottom: 15px;">
                <ul>
                  <div v-if="MASTERDATA['OPDCARIAS76']" class="display-flex" style="align-items: center;">
                    <li>
                      <div class="display-flex" style="margin-right: 60px;">
                        <p class="text-initial">{{__t('Trong')}}:&nbsp;{{MASTERDATA['OPDCARIAS76'].Items[0].Value || '. . .'}}</p>
                        <p class="text-initial">{{__t('&nbsp;năm tới là')}}:&nbsp;{{MASTERDATA['OPDCARIAS76'].Items[1].Value || '. . . . .'}}</p>
                        <p>&nbsp;%</p>
                      </div>
                    </li>
                    <li>
                      <div class="display-flex">
                        <p class="text-initial">{{__t('Trong')}}:&nbsp;{{MASTERDATA['OPDCARIAS76'].Items[2].Value || '. . . . . . . . . .'}}</p>
                        <p class="text-initial">{{__t('&nbsp;là')}}:&nbsp;{{MASTERDATA['OPDCARIAS76'].Items[3].Value || '. . . . .'}}</p>
                        <p>&nbsp;%</p>
                      </div>
                    </li>
                  </div>
                </ul>
              </div>
              <div style="margin-left: 20px;">
                <p style="font-style: italic;"><span class="font-bold">LỢI ÍCH:</span> Sàng lọc UT vú đúng cách sẽ giúp phát hiện sớm UT, UT được phát hiện càng sớm càng giúp cho việc điều trị hiệu quả và triệt để hơn. Chụp Xquang vú có vai trò quan trọng trong phát hiện UT vú giai đoạn sớm và được FDA công nhận là phương tiện sàng lọc làm giảm được tỷ lệ tử vong.</p>
                <div style="font-style: italic;">
                  <p><span class="font-bold">LƯU Ý:</span> Khi tham gia sàng lọc UT vú, bạn có thể gặp phải một số vấn đề sau:</p>
                  <ul style="margin-top: 10px;">
                    <li>
                      <p>Kết quả dương tính sai: các biện pháp sàng lọc ban đầu nghi ngờ có bất thường nhưng sau khi được chẩn đoán thêm thì là không phải &#8594; phải làm thêm xét nghiệm có chi phí, lo âu và mất thêm thời gian hơn &#8594; có thể chấn đoán quá mức (overdiagnosis) &#8594; điều trị quá mức (overtreatment): do vậy việc lựa chọn phương pháp sàng lọc thích hợp ở cơ sở đáp ứng về chuyên môn là rất cần thiết và quan trọng.</p>
                    </li>
                    <li>
                      <p>Kết quả âm tính sai: Chụp Xquang vú vẫn có thể bỏ só một vài trường hợp UT dẫn đến việc chẩn đoán và điều trị muộn: do vậy bạn cần được bs hướng dẫn cách tự khám vú và có kiến thức về UT gian kỳ (UT xuất hiện giữa hai lần sàng lọc).</p>
                    </li>
                  </ul>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <table>
          <tr v-if="DataSubmit && DataSubmit.Confirm">
            <td style="width: 50%">
              <h3 class="font-bold textUppercase">Xác nhận của người được tư vấn</h3>
              <p>Tôi đã được tư vấn đầy đủ về lợi ích cũng như hạn chế của việc sàng lọc ung thư vú</p>
              <p class="text-initial">{{__t('Họ và tên')}}: {{'. . . . . . . . . . . . . . . . .'}}</p>
              <p>Chữ ký:</p>
            </td>
            <td v-if="MASTERDATA['OPDCARIAS3']" style="padding-left: 40px; width: 50%; transform: translateY(-10px);">
              <h3 class="font-bold textUppercase">Bác sĩ tư vấn</h3>
              <p class="text-initial">{{__label(MASTERDATA['OPDCARIAS3'])}}: {{MASTERDATA['OPDCARIAS3'].Items[0].Value || '. . . . . . / . . . . . . / . . . . . .'}}</p>
              <p class="text-initial">{{__t('Họ và tên')}}: {{ FullName || '. . . . . . . . . . . . . . . . .'}}</p>
              <p>Chữ ký:</p>
            </td>
          </tr>
        </table>
        <table class="BreakPage">
          <tr>
            <td v-if="MASTERDATA['OPDCARIAS81']">
              <drop-files id="mini-upload" :readonly="true" v-model="MASTERDATA['OPDCARIAS81'].Items[0].Value"/>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import Account from '@/services/Account'
import DropFiles from '@/components/DropFiles.vue'
import moment from 'moment'
export default {
  components: {
    DropFiles
  },
  props: {
    DataSubmit: {
      type: Object,
      default: () => {}
    },
    DataInfo: {
      type: Object,
      default: () => {}
    },
    MASTERDATA: {
      type: Object,
      default: () => {}
    },
    Customer: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      FullName: ''
    }
  },
  mounted () {
    if (this.DataSubmit && this.DataSubmit.Confirm.Doctor.UserName) {
      this.getFullName()
    }
  },
  methods: {
    getGender (genderCode) {
      if (genderCode === 1) {
        return 'Nam'
      } else {
        return 'Nữ'
      }
    },
    getAge (DateOfBirth) {
      return Math.floor(moment(new Date()).diff(moment(DateOfBirth, 'DD/MM/YYYY'), 'years', true))
    },
    getFullName () {
      new Account({noLoading: true, username: this.DataSubmit.Confirm.Doctor.UserName, hidemsg: true}).getInfo().then(res => {
        this.FullName = res.Fullname.split('(')[0]
      })
    }
  }
}
</script>
