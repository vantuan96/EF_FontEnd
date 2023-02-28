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
                <p class="textUppercase font-bold font-italic">Đơn vị vú - bệnh viện đa khoa quốc tế Vinmec</p>
                <p class="textUppercase font-italic" style="margin-left: 5px;">Breast Unit - International Hospital Vinmec</p>
              </div>
            </td>
          </tr>
        </table>
        <table class="table standing-order-tbl td-re">
          <tr>
            <th width="100%" class="text-center" style="text-align: center; vertical-align: top;" align="top">
              <h3 class="text-center font-bold textUppercase" style="font-size: 18px; text-align: center; margin-bottom: 30px; margin-top: 20px;">{{__t('Phiếu đánh giá tiêu chuẩn chỉ định xét nghiệm gen BRCA 1/2')}}<sup style="font-size: 10px;">1</sup></h3>
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
                    <p style="margin-right: 5px">Ngày tháng năm sinh:</p>
                    <p>{{Customer.DateOfBirth}}</p>
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
                  <p>{{Customer.Phone}}</p>
                </div>
                <div class="display-flex" style="align-items: center;">
                  <div class="display-flex mg-rg-5" style="align-items: center; margin-right: 10px;">
                    <p><strong style="margin-right: 5px">KẾT QUẢ ĐÁNH GIÁ:</strong></p>
                  </div>
                </div>
                <div class="display-flex" style="align-items: center;">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px;"><VTich style="font-size: 10px;" v-if="MASTERDATA['OPDGENBRCA49']" v-model="MASTERDATA['OPDGENBRCA49'].Items[0].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDGENBRCA49'].Items[0])}}</p>
                    </div>
                    <div class="display-flex" style="align-items: center; margin-left: 15px;">
                      <div style="margin-right: 5px;"><VTich style="font-size: 10px;" v-if="MASTERDATA['OPDGENBRCA51']" v-model="MASTERDATA['OPDGENBRCA51'].Items[0].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDGENBRCA51'].Items[0])}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <table>
          <tr>
            <td>
              <p style="font-weight: bold; font-size: 18px; margin-top: 10px;">Chỉ định xét nghiệm gen BRCA 1/2 nếu đáp ứng được một hoặc một số tiêu chí dưới đây:</p>
              <p style="font-style: italic; margin-right: 5px; margin-left:20px; font-size: 16px"><strong>Lưu ý:</strong> Xét nghiệm di truyền cho người không có chẩn đoán ung thư chỉ nên xem xét khi không có sẵn thành viên nào của gia đình đã bị ung thư phù hợp với chỉ định để xét nghiệm.</p>
                <!-- Checkbox1 -->
                <div v-if="MASTERDATA['OPDGENBRCA1']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px;"><VTich style="font-size: 10px; margin-bottom: 20px;" v-if="MASTERDATA['OPDGENBRCA1']" v-model="MASTERDATA['OPDGENBRCA1'].Items[0].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDGENBRCA1'].Items[0])}}</p>
                    </div>
                  </div>
                </div>
                <!-- Checkbox2 -->
                <div v-if="MASTERDATA['OPDGENBRCA3']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px;"><VTich style="font-size: 10px;" v-if="MASTERDATA['OPDGENBRCA3']" v-model="MASTERDATA['OPDGENBRCA3'].Items[0].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDGENBRCA3'].Items[0])}}</p>
                    </div>
                  </div>
                </div>
                <!-- Checkbox2.1 -->
                <div v-if="MASTERDATA['OPDGENBRCA3']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px; margin-left: 20px"><VTich style="font-size: 10px; width: 10px; height: 12px; border-radius: 100%; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA3']" v-model="MASTERDATA['OPDGENBRCA3'].Items[1].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDGENBRCA3'].Items[1])}}</p>
                    </div>
                  </div>
                </div>
                <!-- Checkbox2.2 -->
                <div v-if="MASTERDATA['OPDGENBRCA3']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px; margin-left: 20px"><VTich style="font-size: 10px; width: 10px; height: 12px; border-radius: 100%; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA3']" v-model="MASTERDATA['OPDGENBRCA3'].Items[2].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDGENBRCA3'].Items[2])}}</p>
                    </div>
                  </div>
                </div>
                <!-- Child checkbox 2.2 -->
                <div v-if="MASTERDATA['OPDGENBRCA7']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px; margin-left: 40px"><VTich style="font-size: 10px; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA7']" v-model="MASTERDATA['OPDGENBRCA7'].Items[0].Value"/></div>
                      <p style="font-style: italic">{{__label(MASTERDATA['OPDGENBRCA7'].Items[0])}}</p>
                    </div>
                  </div>
                </div>
                <div v-if="MASTERDATA['OPDGENBRCA7']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px; margin-left: 40px"><VTich style="font-size: 10px; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA7']" v-model="MASTERDATA['OPDGENBRCA7'].Items[1].Value"/></div>
                      <p style="font-style: italic;">{{__label(MASTERDATA['OPDGENBRCA7'].Items[1])}}</p>
                    </div>
                  </div>
                </div>
                <div v-if="MASTERDATA['OPDGENBRCA7']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px; margin-left: 40px"><VTich style="font-size: 10px; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA7']" v-model="MASTERDATA['OPDGENBRCA7'].Items[2].Value"/></div>
                      <p style="font-style: italic;">{{__label(MASTERDATA['OPDGENBRCA7'].Items[2])}}</p>
                    </div>
                  </div>
                </div>
                <div v-if="MASTERDATA['OPDGENBRCA7']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px; margin-left: 40px"><VTich style="font-size: 10px; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA7']" v-model="MASTERDATA['OPDGENBRCA7'].Items[3].Value"/></div>
                      <p style="font-style: italic;">{{__label(MASTERDATA['OPDGENBRCA7'].Items[3])}}</p>
                    </div>
                  </div>
                </div>
                <!-- Checkbox2.3 -->
                <div v-if="MASTERDATA['OPDGENBRCA3']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px; margin-left: 20px"><VTich style="font-size: 10px; width: 10px; height: 12px; border-radius: 100%; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA3']" v-model="MASTERDATA['OPDGENBRCA3'].Items[3].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDGENBRCA3'].Items[3])}}</p>
                    </div>
                  </div>
                </div>
                <!-- Child checkbox2.3 -->
                <div v-if="MASTERDATA['OPDGENBRCA13']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px; margin-left: 40px"><VTich style="font-size: 10px; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA13']" v-model="MASTERDATA['OPDGENBRCA13'].Items[0].Value"/></div>
                      <p style="font-style: italic;">{{__label(MASTERDATA['OPDGENBRCA13'].Items[0])}}</p>
                    </div>
                  </div>
                </div>
                <!-- Checkbox2.4 -->
                <div v-if="MASTERDATA['OPDGENBRCA3']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px; margin-left: 20px"><VTich style="font-size: 10px; width: 10px; height: 12px; border-radius: 100%; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA3']" v-model="MASTERDATA['OPDGENBRCA3'].Items[4].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDGENBRCA3'].Items[4])}}</p>
                    </div>
                  </div>
                </div>
                <!-- Child checkbox2.4 -->
                <div v-if="MASTERDATA['OPDGENBRCA16']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px; margin-left: 40px"><VTich style="font-size: 10px; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA16']" v-model="MASTERDATA['OPDGENBRCA16'].Items[0].Value"/></div>
                      <p style="font-style: italic;">{{__label(MASTERDATA['OPDGENBRCA16'].Items[0])}}</p>
                    </div>
                  </div>
                </div>
                <!-- Child checkbox2.4.1 -->
                <div class="display-flex">
                  <div class="display-flex" style="align-items: center; margin-left: 20px;">
                    <div style="margin-right: 5px; margin-left: 40px"><VTich style="font-size: 10px; width: 10px; height: 12px; border-radius: 100%; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA18']" v-model="MASTERDATA['OPDGENBRCA18'].Items[0].Value"/></div>
                    <p>{{__label(MASTERDATA['OPDGENBRCA18'].Items[0])}}</p>
                  </div>
                  <div class="display-flex" style="align-items: center; margin-left: 115px;">
                    <div style="margin-right: 5px; margin-left: 12px"><VTich style="font-size: 10px; width: 10px; height: 12px; border-radius: 100%; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA18']" v-model="MASTERDATA['OPDGENBRCA18'].Items[2].Value"/></div>
                    <p>{{__label(MASTERDATA['OPDGENBRCA18'].Items[2])}}</p>
                  </div>
                </div>
                <div class="display-flex">
                  <div class="display-flex" style="align-items: center; margin-left: 20px;">
                    <div style="margin-right: 5px; margin-left: 40px"><VTich style="font-size: 10px; width: 10px; height: 12px; border-radius: 100%; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA18']" v-model="MASTERDATA['OPDGENBRCA18'].Items[1].Value"/></div>
                    <p>{{__label(MASTERDATA['OPDGENBRCA18'].Items[1])}}</p>
                  </div>
                  <div class="display-flex" style="align-items: center; margin-left: 155px;">
                    <div style="margin-right: 5px; margin-left: 15px"><VTich style="font-size: 10px; width: 10px; height: 12px; border-radius: 100%; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA18']" v-model="MASTERDATA['OPDGENBRCA18'].Items[3].Value"/></div>
                    <p>{{__label(MASTERDATA['OPDGENBRCA18'].Items[3])}}</p>
                  </div>
                </div>
                <div class="display-flex">
                  <div class="display-flex" style="align-items: center; margin-left: 20px;">
                    <div style="margin-right: 5px; margin-left: 40px"><VTich style="font-size: 10px; width: 10px; height: 12px; border-radius: 100%; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA18']" v-model="MASTERDATA['OPDGENBRCA18'].Items[4].Value"/></div>
                    <p>{{__label(MASTERDATA['OPDGENBRCA18'].Items[4])}}</p>
                  </div>
                </div>
                <!-- Checkbox 2.4.2 -->
                <div class="BreakPage" v-if="MASTERDATA['OPDGENBRCA16']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center; margin-top: 100px;">
                      <div style="margin-right: 5px; margin-left: 40px"><VTich style="margin-bottom: 20px; font-size: 10px; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA16']" v-model="MASTERDATA['OPDGENBRCA16'].Items[1].Value"/></div>
                      <p style="font-style: italic;">{{__label(MASTERDATA['OPDGENBRCA16'].Items[1])}}</p>
                    </div>
                  </div>
                </div>
                <!-- Checkbox 2.4.3 -->
                <div v-if="MASTERDATA['OPDGENBRCA16']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px; margin-left: 40px"><VTich style="font-size: 10px; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA16']" v-model="MASTERDATA['OPDGENBRCA16'].Items[2].Value"/></div>
                      <p style="font-style: italic">{{__label(MASTERDATA['OPDGENBRCA16'].Items[2])}}</p>
                    </div>
                  </div>
                </div>
                <!-- Checkbox 3 -->
                <div v-if="MASTERDATA['OPDGENBRCA26']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px;"><VTich style="font-size: 10px; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA26']" v-model="MASTERDATA['OPDGENBRCA26'].Items[0].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDGENBRCA26'].Items[0])}}</p>
                    </div>
                  </div>
                </div>
                <!-- Checkbox 4 -->
                <div v-if="MASTERDATA['OPDGENBRCA28']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px;"><VTich style="font-size: 10px; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA28']" v-model="MASTERDATA['OPDGENBRCA28'].Items[0].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDGENBRCA28'].Items[0])}}</p>
                    </div>
                  </div>
                </div>
                <!-- Checkbox 5 -->
                <div v-if="MASTERDATA['OPDGENBRCA30']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px;"><VTich style="font-size: 10px; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA30']" v-model="MASTERDATA['OPDGENBRCA30'].Items[0].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDGENBRCA30'].Items[0])}}</p>
                    </div>
                  </div>
                </div>
                <!-- Checkbox 6 -->
                <div v-if="MASTERDATA['OPDGENBRCA32']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px;"><VTich style="font-size: 10px; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA32']" v-model="MASTERDATA['OPDGENBRCA32'].Items[0].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDGENBRCA32'].Items[0])}}</p>
                    </div>
                  </div>
                </div>
                <!-- Checkbox 7 -->
                <div v-if="MASTERDATA['OPDGENBRCA34']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px;"><VTich style="font-size: 10px; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA34']" v-model="MASTERDATA['OPDGENBRCA34'].Items[0].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDGENBRCA34'].Items[0])}}</p>
                    </div>
                  </div>
                </div>
                <!-- Checkbox 7.1 -->
                <div v-if="MASTERDATA['OPDGENBRCA34']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px; margin-left: 20px"><VTich style="margin-bottom: 20px; font-size: 10px; width: 10px; height: 12px; border-radius: 100%; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA34']" v-model="MASTERDATA['OPDGENBRCA34'].Items[1].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDGENBRCA34'].Items[1])}}</p>
                    </div>
                  </div>
                </div>
                <!-- Checkbox 7.2 -->
                <div v-if="MASTERDATA['OPDGENBRCA34']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px; margin-left: 20px"><VTich style="margin-bottom: 22px; font-size: 10px; width: 10px; height: 12px; border-radius: 100%; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA34']" v-model="MASTERDATA['OPDGENBRCA34'].Items[2].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDGENBRCA34'].Items[2])}}</p>
                    </div>
                  </div>
                </div>
                <!-- Checkbox 7.3 -->
                <div v-if="MASTERDATA['OPDGENBRCA34']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px; margin-left: 20px"><VTich style="font-size: 10px; width: 10px; height: 12px; border-radius: 50%; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA34']" v-model="MASTERDATA['OPDGENBRCA34'].Items[3].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDGENBRCA34'].Items[3])}}</p>
                    </div>
                  </div>
                </div>
                <!-- Checkbox 8 -->
                <div v-if="MASTERDATA['OPDGENBRCA39']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px;"><VTich style="margin-bottom: 20px; font-size: 10px; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA39']" v-model="MASTERDATA['OPDGENBRCA39'].Items[0].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDGENBRCA39'].Items[0])}}</p>
                    </div>
                  </div>
                </div>
                <!-- Checkbox 9 -->
                <div v-if="MASTERDATA['OPDGENBRCA41']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px;"><VTich style="margin-bottom: 25px; font-size: 10px; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA41']" v-model="MASTERDATA['OPDGENBRCA41'].Items[0].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDGENBRCA41'].Items[0])}}</p>
                    </div>
                  </div>
                </div>
                <!-- Checkbox 10 -->
                <div v-if="MASTERDATA['OPDGENBRCA43']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px;"><VTich style="margin-bottom: 45px; font-size: 10px; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA43']" v-model="MASTERDATA['OPDGENBRCA43'].Items[0].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDGENBRCA43'].Items[0])}}</p>
                    </div>
                  </div>
                </div>
              <p style="font-weight: bold; font-size: 18px; margin-top: 10px;">Chỉ định xét nghiệm đa gen khi:</p>
              <!-- Checkbox 11 -->
                <div v-if="MASTERDATA['OPDGENBRCA45']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px;"><VTich style="margin-bottom: 5px; font-size: 10px; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA45']" v-model="MASTERDATA['OPDGENBRCA45'].Items[0].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDGENBRCA45'].Items[0])}}</p>
                    </div>
                  </div>
                </div>
              <!-- Checkbox 12 -->
                <div v-if="MASTERDATA['OPDGENBRCA47']">
                  <div class="display-flex" style="align-items: center;">
                    <div class="display-flex" style="align-items: center;">
                      <div style="margin-right: 5px;"><VTich style="margin-bottom:25px; font-size: 10px; display: flex; align-items: center; justify-content: center;" v-if="MASTERDATA['OPDGENBRCA47']" v-model="MASTERDATA['OPDGENBRCA47'].Items[0].Value"/></div>
                      <p>{{__label(MASTERDATA['OPDGENBRCA47'].Items[0])}}</p>
                    </div>
                  </div>
                </div>
            </td>
          </tr>
        </table>
        <div style="width: 100%; height: 2px; background-color: #000;"></div>
        <table>
          <tr v-if="DataSubmit && DataSubmit.Confirm.User">
            <td style="width:50%">
              <p class="text-initial">Ngày đánh giá: {{CreatedAt}}</p>
            </td>
          </tr>
          <tr v-if="DataSubmit && DataSubmit.Confirm.User">
            <td style="width: 50%">
              <p class="text-initial"><strong>Người thực hiện</strong>: {{FullName}}</p>
            </td>
            <td>
              <p><strong>Chữ ký</strong>:</p>
            </td>
          </tr>
        </table>
        <p class="mt-10" style="font-style: italic">(1) Genetic/Familial High -Risk Assessment: Breast and Ovarian (BRCA-1 & GENE -1). Version 3,2019- Jan 18, 2019.</p>
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
    },
    CreatedAt: {
      type: String
    },
    CreatedBy: {
      type: String
    }
  },
  data () {
    return {
      FullName: ''
    }
  },
  mounted () {
    if (this.DataSubmit && this.CreatedBy) {
      this.getFullName()
      console.log(this.DataSubmit, 'abc')
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
      new Account({noLoading: true, username: this.CreatedBy, hidemsg: true}).getInfo().then(res => {
        this.FullName = res.Fullname.split('(')[0]
      })
    }
  }
}
</script>
