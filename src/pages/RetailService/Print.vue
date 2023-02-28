<template>
  <div id="printMe" v-if="data">
    <!-- 2 -->
    <table width="100%">
      <tr>
        <td width="20%" valign="top">
          <img src="/static/Logo Vinmec International Hospitall 1.png" />
        </td>
        <td class="text-center">
          <div class="font20 font-bold text-center">THEO DÕI THỰC HIỆN THUỐC NGƯỜI BỆNH SỬ DỤNG DỊCH VỤ LẺ</div>
        </td>
        <td width="30%" valign="top">
          <table style="width: 300px; margin: 0 auto;border: 1px solid #000;">
            <tr>
              <td style="padding: 5px">
                <p><b>Họ tên:</b> {{data.Customer.Fullname || '. . . . . . . . . . .'}}</p>
                <p><b>Số PID:</b> {{data.Customer.PID || '. . . . . . . . . . .'}}</p>
                <p><b>Ngày tháng năm sinh:</b> {{data.Customer.DateOfBirth || '. . . . . . . . . . .'}}</p>
                <p class="no-margin"><b>Giới tính:</b> {{data.Customer.Gender || '. . . . . . . . . . .'}}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <br/><br/>
    <p>Mạch: {{data.Pulse || '. . . . . . . . . . .'}}  lần/phút, Nhiệt độ {{data.Temparature || '. . . . . . . . . . .'}} độ C, Huyết áp {{data.BloodPressure || '. . . . . . . .  . . .'}} mmHg, Cân nặng {{data.Weight || '. . . . . . . .  .  . .'}} (kg), Chiều cao {{data.Height || '. . . . . . . . . .  .'}} (cm)</p>
    <p>Chẩn đoán: {{data.Diagnosis || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . '}}</p>
    <p class="no-wrap-hidden">Bác sĩ chỉ định:  {{data.DoctorFullname || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .   . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
    <table width="100%" class="tbl-border-1">
      <tr>
        <th class="text-center" width="22%">Tên thuốc, hàm lượng, liều dùng, cách pha</th>
        <th class="text-center" width="80px">Đường dùng</th>
        <th class="text-center" width="80px">Tốc độ (ml/h)</th>
        <th class="text-center" colspan="5">Giờ, ngày tháng năm thực hiện (Nhân viên ký, ghi rõ họ tên)</th>
      </tr>
      <template v-for="(item ,index) in [0, 1, 2]">
        <tr :data="item" :key="index + 'root'">
          <td class="not-justify" rowspan="4">{{getRowsData(item, 'Drug')}}</td>
          <td class="text-center" rowspan="4">{{getRowsData(item, 'Route')}}</td>
          <td class="text-center" rowspan="4">{{getRowsData(item, 'Speed')}}</td>
          <td class="no-wrap">
            Ngày giờ thực hiện
          </td>
          <td class="no-wrap text-center">{{getRowData(item, 0, 'NoteAt')}}</td>
          <td class="no-wrap text-center">{{getRowData(item, 1, 'NoteAt')}}</td>
          <td class="no-wrap text-center">{{getRowData(item, 2, 'NoteAt')}}</td>
          <td class="no-wrap text-center">{{getRowData(item, 3, 'NoteAt')}}</td>
        </tr>
        <tr :data="item" :key="item + 'chil2'">
          <td class="no-wrap">
            Bác sĩ xác nhận
          </td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 0, 'DoctorFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 1, 'DoctorFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 2, 'DoctorFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 3, 'DoctorFullname')}}</div></td>
        </tr>
        <tr :data="item" :key="item + 'chil3'">
          <td class="no-wrap">
            Điều dưỡng trưởng ca
          </td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 0, 'NurseFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 1, 'NurseFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 2, 'NurseFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 3, 'NurseFullname')}}</div></td>
        </tr>
        <tr :data="item" :key="item + 'chil4'">
          <td class="no-wrap">
            Điều dưỡng thực hiện
          </td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 0, 'userFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 1, 'userFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 2, 'userFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 3, 'userFullname')}}</div></td>
        </tr>
      </template>
    </table>
    <template v-if="hasTable(4)">
      <div class="BreakPage"><p class="hidden">xxxxxxxxx</p></div>
      <table width="100%" class="tbl-border-1">
        <tr>
          <th class="text-center" width="22%">Tên thuốc, hàm lượng, liều dùng, cách pha</th>
          <th class="text-center" width="80px">Đường dùng</th>
          <th class="text-center" width="80px">Tốc độ (ml/h)</th>
          <th class="text-center" colspan="5" style="border-bottom: none">Giờ, ngày tháng năm thực hiện (Nhân viên ký, ghi rõ họ tên)</th>
        </tr>
        <template v-for="(item ,index) in [3, 4, 5, 6]" v-if="hasRow(item)">
          <tr :data="item" :key="index + 'root'">
            <td class="not-justify" rowspan="4">{{getRowsData(item, 'Drug')}}</td>
            <td class="text-center" rowspan="4">{{getRowsData(item, 'Route')}}</td>
            <td class="text-center" rowspan="4">{{getRowsData(item, 'Speed')}}</td>
            <td class="no-wrap">
              Ngày giờ thực hiện
            </td>
            <td class="no-wrap text-center">{{getRowData(item, 0, 'NoteAt')}}</td>
            <td class="no-wrap text-center">{{getRowData(item, 1, 'NoteAt')}}</td>
            <td class="no-wrap text-center">{{getRowData(item, 2, 'NoteAt')}}</td>
            <td class="no-wrap text-center">{{getRowData(item, 3, 'NoteAt')}}</td>
          </tr>
          <tr :data="item" :key="item + 'chil2'">
            <td class="no-wrap">
              Bác sĩ xác nhận
            </td>
            <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 0, 'DoctorFullname')}}</div></td>
            <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 1, 'DoctorFullname')}}</div></td>
            <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 2, 'DoctorFullname')}}</div></td>
            <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 3, 'DoctorFullname')}}</div></td>
          </tr>
          <tr :data="item" :key="item + 'chil3'">
            <td class="no-wrap">
              Điều dưỡng trưởng ca
            </td>
            <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 0, 'NurseFullname')}}</div></td>
            <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 1, 'NurseFullname')}}</div></td>
            <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 2, 'NurseFullname')}}</div></td>
            <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 3, 'NurseFullname')}}</div></td>
          </tr>
          <tr :data="item" :key="item + 'chil4'">
            <td class="no-wrap">
              Điều dưỡng thực hiện
            </td>
            <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 0, 'userFullname')}}</div></td>
            <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 1, 'userFullname')}}</div></td>
            <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 2, 'userFullname')}}</div></td>
            <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 3, 'userFullname')}}</div></td>
          </tr>
        </template>
      </table>
    </template>
    <template v-if="hasTable(8)">
    <div class="BreakPage"><p class="hidden">xxxxxxxxx</p></div>
    <table width="100%" class="tbl-border-1">
      <tr>
        <th class="text-center" width="22%">Tên thuốc, hàm lượng, liều dùng, cách pha</th>
        <th class="text-center" width="80px">Đường dùng</th>
        <th class="text-center" width="80px">Tốc độ (ml/h)</th>
        <th class="text-center" colspan="5" style="border-bottom: none">Giờ, ngày tháng năm thực hiện (Nhân viên ký, ghi rõ họ tên)</th>
      </tr>
      <template v-for="(item ,index) in [7, 8, 9, 10]" v-if="hasRow(item)">
        <tr :data="item" :key="index + 'root'">
          <td class="not-justify" rowspan="4">{{getRowsData(item, 'Drug')}}</td>
          <td class="text-center" rowspan="4">{{getRowsData(item, 'Route')}}</td>
          <td class="text-center" rowspan="4">{{getRowsData(item, 'Speed')}}</td>
          <td class="no-wrap">
            Ngày giờ thực hiện
          </td>
          <td class="no-wrap text-center">{{getRowData(item, 0, 'NoteAt')}}</td>
          <td class="no-wrap text-center">{{getRowData(item, 1, 'NoteAt')}}</td>
          <td class="no-wrap text-center">{{getRowData(item, 2, 'NoteAt')}}</td>
          <td class="no-wrap text-center">{{getRowData(item, 3, 'NoteAt')}}</td>
        </tr>
        <tr :data="item" :key="item + 'chil2'">
          <td class="no-wrap">
            Bác sĩ xác nhận
          </td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 0, 'DoctorFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 1, 'DoctorFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 2, 'DoctorFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 3, 'DoctorFullname')}}</div></td>
        </tr>
        <tr :data="item" :key="item + 'chil3'">
          <td class="no-wrap">
            Điều dưỡng trưởng ca
          </td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 0, 'NurseFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 1, 'NurseFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 2, 'NurseFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 3, 'NurseFullname')}}</div></td>
        </tr>
        <tr :data="item" :key="item + 'chil4'">
          <td class="no-wrap">
            Điều dưỡng thực hiện
          </td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 0, 'userFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 1, 'userFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 2, 'userFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 3, 'userFullname')}}</div></td>
        </tr>
      </template>
    </table>
    </template>
    <template v-if="hasTable(12)">
    <div class="BreakPage"><p class="hidden">xxxxxxxxx</p></div>
    <table width="100%" class="tbl-border-1">
      <tr>
        <th class="text-center" width="22%">Tên thuốc, hàm lượng, liều dùng, cách pha</th>
        <th class="text-center" width="80px">Đường dùng</th>
        <th class="text-center" width="80px">Tốc độ (ml/h)</th>
        <th class="text-center" colspan="5" style="border-bottom: none">Giờ, ngày tháng năm thực hiện (Nhân viên ký, ghi rõ họ tên)</th>
      </tr>
      <template v-for="(item ,index) in [11, 12, 13, 14]" v-if="hasRow(item)">
        <tr :data="item" :key="index + 'root'">
          <td class="not-justify" rowspan="4">{{getRowsData(item, 'Drug')}}</td>
          <td class="text-center" rowspan="4">{{getRowsData(item, 'Route')}}</td>
          <td class="text-center" rowspan="4">{{getRowsData(item, 'Speed')}}</td>
          <td class="no-wrap">
            Ngày giờ thực hiện
          </td>
          <td class="no-wrap text-center">{{getRowData(item, 0, 'NoteAt')}}</td>
          <td class="no-wrap text-center">{{getRowData(item, 1, 'NoteAt')}}</td>
          <td class="no-wrap text-center">{{getRowData(item, 2, 'NoteAt')}}</td>
          <td class="no-wrap text-center">{{getRowData(item, 3, 'NoteAt')}}</td>
        </tr>
        <tr :data="item" :key="item + 'chil2'">
          <td class="no-wrap">
            Bác sĩ xác nhận
          </td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 0, 'DoctorFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 1, 'DoctorFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 2, 'DoctorFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 3, 'DoctorFullname')}}</div></td>
        </tr>
        <tr :data="item" :key="item + 'chil3'">
          <td class="no-wrap">
            Điều dưỡng trưởng ca
          </td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 0, 'NurseFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 1, 'NurseFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 2, 'NurseFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 3, 'NurseFullname')}}</div></td>
        </tr>
        <tr :data="item" :key="item + 'chil4'">
          <td class="no-wrap">
            Điều dưỡng thực hiện
          </td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 0, 'userFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 1, 'userFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 2, 'userFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 3, 'userFullname')}}</div></td>
        </tr>
      </template>
    </table>
    </template>
    <template v-if="hasTable(16)">
    <div class="BreakPage"><p class="hidden">xxxxxxxxx</p></div>
    <table width="100%" class="tbl-border-1">
      <tr>
        <th class="text-center" width="22%">Tên thuốc, hàm lượng, liều dùng, cách pha</th>
        <th class="text-center" width="80px">Đường dùng</th>
        <th class="text-center" width="80px">Tốc độ (ml/h)</th>
        <th class="text-center" colspan="5" style="border-bottom: none">Giờ, ngày tháng năm thực hiện (Nhân viên ký, ghi rõ họ tên)</th>
      </tr>
      <template v-for="(item ,index) in [15, 16, 17, 18]" v-if="hasRow(item)">
        <tr :data="item" :key="index + 'root'">
          <td class="not-justify" rowspan="4">{{getRowsData(item, 'Drug')}}</td>
          <td class="text-center" rowspan="4">{{getRowsData(item, 'Route')}}</td>
          <td class="text-center" rowspan="4">{{getRowsData(item, 'Speed')}}</td>
          <td class="no-wrap">
            Ngày giờ thực hiện
          </td>
          <td class="no-wrap text-center">{{getRowData(item, 0, 'NoteAt')}}</td>
          <td class="no-wrap text-center">{{getRowData(item, 1, 'NoteAt')}}</td>
          <td class="no-wrap text-center">{{getRowData(item, 2, 'NoteAt')}}</td>
          <td class="no-wrap text-center">{{getRowData(item, 3, 'NoteAt')}}</td>
        </tr>
        <tr :data="item" :key="item + 'chil2'">
          <td class="no-wrap">
            Bác sĩ xác nhận
          </td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 0, 'DoctorFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 1, 'DoctorFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 2, 'DoctorFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 3, 'DoctorFullname')}}</div></td>
        </tr>
        <tr :data="item" :key="item + 'chil3'">
          <td class="no-wrap">
            Điều dưỡng trưởng ca
          </td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 0, 'NurseFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 1, 'NurseFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 2, 'NurseFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 3, 'NurseFullname')}}</div></td>
        </tr>
        <tr :data="item" :key="item + 'chil4'">
          <td class="no-wrap">
            Điều dưỡng thực hiện
          </td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 0, 'userFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 1, 'userFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 2, 'userFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 3, 'userFullname')}}</div></td>
        </tr>
      </template>
    </table>
    </template>
    <template v-if="hasTable(20)">
    <div class="BreakPage"><p class="hidden">xxxxxxxxx</p></div>
    <table width="100%" class="tbl-border-1">
      <tr>
        <th class="text-center" width="22%">Tên thuốc, hàm lượng, liều dùng, cách pha</th>
        <th class="text-center" width="80px">Đường dùng</th>
        <th class="text-center" width="80px">Tốc độ<br/>(ml/h)</th>
        <th class="text-center" colspan="5" style="border-bottom: none">Giờ, ngày tháng năm thực hiện<br/>Nhân viên ký, ghi rõ họ tên</th>
      </tr>
      <template v-for="(item ,index) in [19, 20, 21, 22]" v-if="hasRow(item)">
        <tr :data="item" :key="index + 'root'">
          <td class="not-justify" rowspan="4">{{getRowsData(item, 'Drug')}}</td>
          <td class="text-center" rowspan="4">{{getRowsData(item, 'Route')}}</td>
          <td class="text-center" rowspan="4">{{getRowsData(item, 'Speed')}}</td>
          <td class="no-wrap">
            Ngày giờ thực hiện
          </td>
          <td class="no-wrap text-center">{{getRowData(item, 0, 'NoteAt')}}</td>
          <td class="no-wrap text-center">{{getRowData(item, 1, 'NoteAt')}}</td>
          <td class="no-wrap text-center">{{getRowData(item, 2, 'NoteAt')}}</td>
          <td class="no-wrap text-center">{{getRowData(item, 3, 'NoteAt')}}</td>
        </tr>
        <tr :data="item" :key="item + 'chil2'">
          <td class="no-wrap">
            Bác sĩ xác nhận
          </td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 0, 'DoctorFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 1, 'DoctorFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 2, 'DoctorFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 3, 'DoctorFullname')}}</div></td>
        </tr>
        <tr :data="item" :key="item + 'chil3'">
          <td class="no-wrap">
            Điều dưỡng trưởng ca
          </td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 0, 'NurseFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 1, 'NurseFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 2, 'NurseFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 3, 'NurseFullname')}}</div></td>
        </tr>
        <tr :data="item" :key="item + 'chil4'">
          <td class="no-wrap">
            Điều dưỡng thực hiện
          </td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 0, 'userFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 1, 'userFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 2, 'userFullname')}}</div></td>
          <td class="no-wrap text-center"><img src="/static/fff.png" width="100%" height="25px" /><div class="text-center">{{getRowData(item, 3, 'userFullname')}}</div></td>
        </tr>
      </template>
    </table>
    </template>
  </div>
</template>
<script>
export default {
  name: 'StandingOrderForRetailServicePrint',
  props: ['data'],
  data () {
    return {
      dataTblPage1: [],
      dataTblPage2: [],
      labels: [
        'Ngày giờ thực hiện',
        'Bác sĩ xác nhận',
        'Điều dưỡng trưởng ca',
        'Điều dưỡng thực hiện'
      ],
      keys: [
        'NoteAt',
        'Doctor',
        'Nurse',
        'user'
      ],
      dataTblPage: []
    }
  },
  watch: {
    data: {
      handler () {
        this.convertDataToTabel()
      },
      deep: true
    }
  },
  mounted () {
    this.convertDataToTabel()
  },
  methods: {
    hasRow (row) {
      return this.dataTblPage[row]
    },
    hasTable (index) {
      return this.dataTblPage.length >= index
    },
    getRowsData (row, type) {
      if (this.dataTblPage[row]) {
        return this.dataTblPage[row][type]
      }
    },
    getRowData (row, col, type) {
      if (this.dataTblPage[row] && this.dataTblPage[row].Notes && this.dataTblPage[row].Notes[col]) {
        return this.dataTblPage[row].Notes[col][type]
      }
    },
    convertDataToTabel () {
      var fakedata = []
      var datas = this.cloneObj(this.data.Datas)
      datas.forEach(data => {
        var index = 0
        if (data.Note.length === 0) {
          fakedata.push({
            Notes: [],
            ...data
          })
        } else {
          data.Note.forEach((note, i) => {
            if (index % 4 === 0) {
              fakedata.push({
                Notes: this.cloneObj(data.Note.slice(i, i + 4)),
                ...data
              })
            }
            index++
          })
        }
      })
      this.dataTblPage = fakedata
      // var dataIndex = 0
      // for (let index = 0; index < 12; index++) {
      //   var obj = {
      //     Drug: '',
      //     Route: '',
      //     Speed: '',
      //     colSpan: index % 4 === 0 ? 4 : false
      //   }
      //   if (fakedata[dataIndex]) {
      //     obj.Drug = fakedata[dataIndex].Drug
      //     obj.Route = fakedata[dataIndex].Route
      //     obj.Speed = fakedata[dataIndex].Speed
      //   }
      //   obj.label = this.labels[index % 4]
      //   for (let $index = 0; $index < 4; $index++) {
      //     obj['value_' + $index] = ''
      //     if (fakedata[dataIndex] && fakedata[dataIndex].Notes && fakedata[dataIndex].Notes[$index]) {
      //       obj['value_' + $index] = fakedata[dataIndex].Notes[$index][this.keys[dataIndex]]
      //     }
      //   }
      //   this.dataTblPage1.push(obj)
      //   if (index % 4 === 0) {
      //     dataIndex++
      //   }
      // }
    }
  }
}
</script>
