<template>
  <div class="a4-page box" id="printMe">
    <table class="table" style="width: 100%">
      <tr>
        <th width="100%" class="text-center" style="text-align: center;vertical-align: top;" align="top">
          <img src="/static/Logo Vinmec International Hospitall 1.png" />
        </th>
        <td style="vertical-align: top;" align="top">
          <CustomerBarCode :customer="data.Customer"/>
        </td>
      </tr>
    </table>
    <br/>
    <p style="margin-bottom: 10px"><b>Khoa / Department:</b>  {{this.$store.state.account.Specialty.ViName}}</p>
    <p class="text-center font16 font-bold">PHIẾU GHI NHẬN SỬ DỤNG THUỐC DO NGƯỜI BỆNH MANG VÀO</p>
    <p class="text-center font16 font-bold">PATIENT’S OWN MEDICATIONS CHART</p>
    <br/>
    <p class="no-wrap-hidden"><b>Tên người bệnh / Patient’s name:</b> {{data.Customer.Fullname || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}   <b class="tab404">Mã (Patient ID):</b> {{data.Customer.PID || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
    <p class="no-wrap-hidden"><b>Ngày tháng năm sinh / Date of Birth:</b> <span class="tab404">{{data.Customer.DateOfBirth || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</span></p>
    <table style="width: 100%" class="tbl-b">
      <tr>
        <th class="text-center" width="1">
          STT<br/>No.
        </th>
        <th class="text-center">
          Tên thuốc, nồng độ, hàm lượng<br/>Drug name, strength
        </th>
        <th class="text-center" width="1">
          ĐVT<br/>Unit
        </th>
        <th class="text-center" width="70">
          Số lượng<br/>Quantity
        </th>
        <th class="text-center" width="50">
          Số lô<br/>Lot No
        </th>
        <th class="text-center" width="90">
          Hạn dùng<br/>Expiry date
        </th>
        <th class="text-center" width="90">
          Điều kiện bảo quản/ nơi mua<br/>Storage/ Origin
        </th>
        <th class="text-center" width="200">
          Ghi chú<br/>Note
        </th>
      </tr>
      <template v-if="data.Datas && data.Datas.length">
        <tr v-for="(item, index) in data.Datas" :key="index">
          <td class="text-center" style="position: relative">
            {{index + 1}}
          </td>
          <td>
            <p v-if="item.DrugName">{{item.DrugName}}</p>
            <p v-else class="hidden-box">xxxx</p>
          </td>
          <td class="text-center">
            {{item.Unit}}
          </td>
          <td class="text-center">
            {{item.Quantity}}
          </td>
          <td class="text-center">
            {{item.LotNo}}
          </td>
          <td class="text-center">
            {{item.ExpiryDate}}
          </td>
          <td>
            <p>{{item.StorageOrigin}}</p>
          </td>
          <td width="200">
            <p>{{item.Note}}</p>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr><td class="text-center">1</td><td><p class="hidden-box">xxxx</p></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td class="text-center">2</td><td><p class="hidden-box">xxxx</p></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td class="text-center">3</td><td><p class="hidden-box">xxxx</p></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
      </template>
    </table>
    <p>Tổng số khoản / Total: {{data.FirstTotal || '. . . . . . . . . . . . . . . . . .'}}</p>
    <p><b>1.  Ý kiến của Bác sỹ điều trị / Doctor’s opinion:  </b>{{data.DoctorOpinion ||  ' . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
    <p><b>2.  Cam kết của người bệnh: đồng ý sử dụng và chịu hoàn toàn trách nhiệm nếu xảy ra các tai biến liên quan đến sử dụng các thuốc ở trên.</b></p>
    <p><small class="font13"><b>Commitment of patients:</b>  I agree to use and to take full responsibility for any complications (if any) related to use of the above drugs.</small></p>
    <p><b>3.  Thẩm định của khoa Dược / Clinical pharmacist review:  </b>{{data.ClinicalPharmacistReview ||  ' . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
    <p><b>4.  Gửi thuốc tại khoa dược / Storage Drugs At Pharmacy:  </b><span class="font25">{{data.StorageDrugsAtPharmacy  ? '&#9745;' : '&#9744;'}}</span> Có/ Yes <span class="font25">{{!data.StorageDrugsAtPharmacy ? '&#9745;' : '&#9744;'}}</span> Không/ No</p>
    <p>Tổng số khoản / Total: {{data.SecondTotal || '. . . . . . . . . . . . . . . . . .'}}</p>
    <br/>
    <table style="width: 100%">
      <tr>
        <td style="width: 25%" class="text-center">
          <div class="text-center"><b>{{('Trưởng khoa Dược')}}</b></div>
          <div class="text-center"><b>{{('Head of pharmacy')}}</b></div>
          <p class="text-center"><i>(Ký, ghi rõ họ tên)</i></p>
          <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
          <p class="text-center">Ngày:............................</p>
        </td>
        <td style="width: 25%" class="text-center">
          <div class="text-center"><b>{{('Trưởng khoa điều trị')}}</b></div>
          <div class="text-center"><b>{{('Head of department')}}</b></div>
          <p class="text-center"><i>(Ký, ghi rõ họ tên)</i></p>
          <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
          <p class="text-center">Ngày:............................</p>
        </td>
        <td style="width: 25%" class="text-center">
          <div class="text-center"><b>{{('Bác sĩ đề nghị')}}</b></div>
          <div class="text-center"><b>{{('Doctor')}}</b></div>
          <p class="text-center"><i>(Ký, ghi rõ họ tên)</i></p>
          <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
          <p class="text-center">Ngày:............................</p>
        </td>
        <td style="width: 25%" class="text-center">
          <div class="text-center"><b>{{('Người bệnh/Người nhà')}}</b></div>
          <div class="text-center"><b>{{('Patients/Relatives')}}</b></div>
          <p class="text-center"><i>(Ký, ghi rõ họ tên)</i></p>
          <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
          <p class="text-center">Ngày:............................</p>
        </td>
      </tr>
    </table>
    <p><i>Nơi lưu: Khoa Điều trị lưu bản chính tại hồ sơ bệnh án của người bệnh.</i></p>
  </div>
</template>
<script>
export default {
  name: 'PatientOwnMedicationsChartPrint',
  props: ['data']
}
</script>
