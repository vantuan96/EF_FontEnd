<template>
  <div class="main-content disable_ccp" id="di0-page-print">
    <div style="width: 100%">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div width="20%">
          <img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" />
        </div>
        <div class="text-center" style="width: 60%; transform: translateX(25px);">
          <p v-if="Data && Data.Specialty" class="text-center textUppercase">KHOA: {{Data.Specialty.ViName}}</p>
          <p v-else class="text-center textUppercase">KHOA: . . . . . . . . . . . . . . . . . . . . . . . . .</p>
        </div>
        <div style="width: 20%; display: flex; justify-content: flex-end;">
          <VueBarcode v-if="customer.PID" v-bind:value="customer.PID" :height="40" :displayValue="true" :textAlign="'left'" :width="1" :marginTop="5" :fontSize="15"/>
        </div>
      </div>
    </div>
    <div class="text-center textUppercase font-bold" style="text-align: center; margin-top: 20px;">Xét nghiệm tại chỗ/ Point- Of- Care Testing (POCT)</div>
    <p class="text-center font-bold font20" style="margin-bottom: 0;">Khí máu/ Blood gas analysis (Cartridge CG4+)</p>
    <p class="text-center font-bold font22" style="margin-bottom: 0;">Máy/ Equiqment: iSTAT</p>
    <br/>
    <table class="table" style="width: 100%">
      <tr>
        <td>
          <table style="width: 100%" class="tbl-b">
            <tr style="background-color: #f2f2f2;">
              <td style="background-color: #f2f2f2;" colspan="2">
                <p><b>Thông số bệnh nhân</b><span class="font-italic">  Thở máy () {{Data.UseBreathingMachine === true ? '&#9745; Có' : '&#9744; Có'}}   {{!(Data.UseBreathingMachine === true) ? '&#9745; Không' : '&#9744; Không'}}</span></p>
              </td>
            </tr>
            <tr>
              <td width="50%"><p>Mode thở: {{Data.BreathingMode || '.........................'}}</p></td>
              <td width="50%"><p>Huyết áp: {{Data.BP || '...............'}} mmHg</p></td>
            </tr>
            <tr>
              <td width="50%"><p>Vt: {{Data.Vt || '..............'}} f: {{Data.F || '............'}}</p></td>
              <td width="50%"><p>Nhịp thở: {{Data.RR || '........................'}}</p></td>
            </tr>
            <tr>
              <td width="50%"><p>FIO2: {{Data.FIO2 || '.......................'}} %</p></td>
              <td width="50%"><p>Nhiệt độ: {{Data.T || '.......................'}} &#8451;</p></td>
            </tr>
          </table>
        </td>
        <td width="40%" style="padding-left:5px; vertical-align: top;">
          <table style="width: 100%;" class="tbl-b">
            <tr>
              <td style="padding-left:5px">
                <!-- <p class="text-center"><i>IPD người bệnh </i></p> -->
                <p>Họ và tên: {{Data.Fullname}}</p>
                <p>Số PID:  {{Data.PID}}</p>
                <p>Ngày tháng năm sinh: {{Data.DateOfBirth}}</p>
                <p style="margin: 0;">Giới tính: {{Data.Gender}}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <br/>
    <table class="table tbl-b tbl-b2">
      <tr>
        <td width="100px" class="no-wrap">Allen Test</td>
        <td>{{Data.AllenTest}}</td>
      </tr>
      <tr>
        <td width="100px" class="no-wrap">
          <p>Vị trí lấy mẫu/</p>
          <p>Collection site</p>
        </td>
        <td>{{Data.CollectionSite}}</td>
      </tr>
    </table>
    <br/>
    <table class="table tbl-b tbl-b2" v-if="Version >= 11">
      <tr>
        <th rowspan="2">
          <p class="text-center">STT</p>
          <p class="text-center">No.</p>
        </th>
        <th rowspan="2" colspan="2" width="80px" style="width: 50px;">
          <p class="text-center">Thông số/</p>
          <p class="text-center">Parameters</p>
        </th>
        <th rowspan="2" width="80px">
          <p class="text-center">Khoảng tham chiếu/</p>
          <p class="text-center">Reference Interval</p>
        </th>
        <th colspan="2">
          <p class="text-center">Chỉ số báo động/</p>
          <p class="text-center">Critical results</p>
        </th>
        <th colspan="3">
          <p class="text-center">Kết quả/ Results</p>
        </th>
      </tr>
      <tr>
        <th class="nowrap">
          <p class="text-center">Giá trị thấp/ Low</p>
        </th>
        <th class="nowrap">
          <p class="text-center">Giá trị cao/ High</p>
        </th>
        <th class="nowrap">
          <p class="text-center">Kết quả/</p>
          <p class="text-center">Results</p>
        </th>
        <th>
          <p class="text-center">Đơn vị/</p>
          <p class="text-center">Unit</p>
        </th>
        <th class="text-center" width="30px" style="text-align: left" :rowspan="Data.Datas.length + 1">
          <img style="float: right;" width="20px" src="/static/print-note.png"/>
        </th>
      </tr>
      <tr :data="item" :key="index" v-for="(item, index) in Data.Datas" v-if="index <= 8">
        <!-- Col-1,2 -->
        <template v-if="index === 0 || index === 1">
          <td class="element-middle" rowspan="2" v-if="index === 0">{{item.Order}}</td>
          <td class="element-middle" rowspan="2" v-if="index === 0">{{item.Name}}</td>
        </template>
        <template v-else-if="index === 2 || index === 3">
          <td class="element-middle" rowspan="2" v-if="index === 2">{{item.Order}}</td>
          <td class="element-middle" rowspan="2" v-if="index === 2">{{item.Name}}</td>
        </template>
        <template v-else-if="index === 4 || index === 5 || index === 6">
          <td class="element-middle" rowspan="3" v-if="index === 4">{{item.Order}}</td>
          <td class="element-middle" rowspan="3" v-if="index === 4">{{item.Name}}</td>
        </template>
        <template v-else>
          <td class="element-middle">{{item.Order}}</td>
          <td class="element-middle">{{item.Name}}</td>
        </template>
        <!-- Col-3 -->
        <td style="text-align: center; width: 70px">{{item.ViAge}}</td>
        <!-- Col-4,5,6 -->
        <template v-if="index === 0 || index === 1">
          <td class="element-middle" style="width: 155px;" v-if="index === 0">
            {{item.LowerLimit ? item.LowerLimit : ''}} {{item.LowerLimit && item.HigherLimit ? '-' : ''}} {{item.HigherLimit ? item.HigherLimit : ''}}
          </td>
          <td v-if="index === 1"></td>
          <td class="element-middle" rowspan="2" v-if="index === 0">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
          <td class="element-middle" rowspan="2" v-if="index === 0">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td>
        </template>
        <template v-else-if="index === 2 || index === 3">
          <td class="element-middle" style="width: 155px;" v-if="index === 2">
            {{item.LowerLimit ? item.LowerLimit : ''}} {{item.LowerLimit && item.HigherLimit ? '-' : ''}} {{item.HigherLimit ? item.HigherLimit : ''}}
          </td>
          <td v-if="index === 3"></td>
          <td class="element-middle" v-if="index === 2">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
          <td class="element-middle" v-if="index === 2">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td>
          <td class="element-middle" v-if="index === 3">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
          <td class="element-middle" v-if="index === 3">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td>
        </template>
        <template v-else-if="index === 4 || index === 5 || index === 6">
          <td class="element-middle" style="width: 155px;" v-if="index === 4">
            {{item.LowerLimit ? item.LowerLimit : ''}} {{item.LowerLimit && item.HigherLimit ? '-' : ''}} {{item.HigherLimit ? item.HigherLimit : ''}}
          </td>
          <td class="element-middle" v-if="index === 5"></td>
          <td class="element-middle" v-if="index === 6"></td>
          <td class="element-middle">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
          <td class="element-middle">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td>
          <!-- <td class="element-middle" v-if="index === 5">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
          <td class="element-middle" v-if="index === 5">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td>
          <td class="element-middle" v-if="index === 6">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
          <td class="element-middle" v-if="index === 6">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td> -->
        </template>
        <template v-else-if="index === 7">
          <td class="element-middle" style="width: 155px;">
            ({{item.LowerLimit ? (item.LowerLimit) : ''}}) {{item.LowerLimit && item.HigherLimit ? '-' : ''}} ({{item.HigherLimit ? `+${item.HigherLimit}` : ''}})
          </td>
          <td class="element-middle" v-if="index === 7">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
          <td class="element-middle" v-if="index === 7">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td>
        </template>
        <template v-else>
          <td class="element-middle" style="width: 155px;">
            {{item.LowerLimit ? item.LowerLimit : ''}} {{item.LowerLimit && item.HigherLimit ? '-' : ''}} {{item.HigherLimit ? item.HigherLimit : ''}}
          </td>
          <td class="element-middle">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
          <td class="element-middle">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td>
        </template>
        <!-- Col-7 -->
        <td class="element-middle">
          <span>
            {{item.Result}}
          </span>
        </td>
        <template v-if="index === 0 || index === 1">
          <td class="element-middle" rowspan="2" v-if="index === 0"></td>
        </template>
        <template v-else-if="index === 2 || index === 3">
          <td class="element-middle" rowspan="2" v-if="index === 2">{{item.Unit}}</td>
        </template>
        <template v-else-if="index === 4 || index === 5 || index === 6">
          <td class="element-middle" rowspan="3" v-if="index === 4">{{item.Unit}}</td>
        </template>
        <template v-else>
          <td class="element-middle">{{item.Unit}}</td>
        </template>
      </tr>
    </table>
    <div class="BreakPage" v-if="Version >= 11"></div>
    <table class="table tbl-b tbl-b2" v-if="Version >= 11">
      <tr>
        <th rowspan="2">
          <p class="text-center">STT</p>
          <p class="text-center">No.</p>
        </th>
        <th rowspan="2" colspan="2" width="80px" style="width: 50px;">
          <p class="text-center">Thông số/</p>
          <p class="text-center">Parameters</p>
        </th>
        <th rowspan="2" width="80px">
          <p class="text-center">Khoảng tham chiếu/</p>
          <p class="text-center">Reference Interval</p>
        </th>
        <th colspan="2">
          <p class="text-center">Chỉ số báo động/</p>
          <p class="text-center">Critical results</p>
        </th>
        <th colspan="3">
          <p class="text-center">Kết quả/ Results</p>
        </th>
      </tr>
      <tr>
        <th class="nowrap">
          <p class="text-center">Giá trị thấp/ Low</p>
        </th>
        <th class="nowrap">
          <p class="text-center">Giá trị cao/ High</p>
        </th>
        <th class="nowrap">
          <p class="text-center">Kết quả/</p>
          <p class="text-center">Results</p>
        </th>
        <th>
          <p class="text-center">Đơn vị/</p>
          <p class="text-center">Unit</p>
        </th>
        <th class="text-center" width="30px" style="text-align: left" :rowspan="Data.Datas.length + 1">
          <img style="float: right;" width="20px" src="/static/print-note.png"/>
        </th>
      </tr>
      <tr :data="item" :key="index" v-for="(item, index) in Data.Datas" v-if="index > 8">
        <!-- Col-1,2 -->
        <template v-if="index === 0 || index === 1">
          <td class="element-middle" rowspan="2" v-if="index === 0">{{item.Order}}</td>
          <td class="element-middle" rowspan="2" v-if="index === 0">{{item.Name}}</td>
        </template>
        <template v-else-if="index === 2 || index === 3">
          <td class="element-middle" rowspan="2" v-if="index === 2">{{item.Order}}</td>
          <td class="element-middle" rowspan="2" v-if="index === 2">{{item.Name}}</td>
        </template>
        <template v-else-if="index === 4 || index === 5 || index === 6">
          <td class="element-middle" rowspan="3" v-if="index === 4">{{item.Order}}</td>
          <td class="element-middle" rowspan="3" v-if="index === 4">{{item.Name}}</td>
        </template>
        <template v-else>
          <td class="element-middle">{{item.Order}}</td>
          <td class="element-middle">{{item.Name}}</td>
        </template>
        <!-- Col-3 -->
        <td style="text-align: center; width: 70px">{{item.ViAge}}</td>
        <!-- Col-4,5,6 -->
        <template v-if="index === 0 || index === 1">
          <td class="element-middle" style="width: 155px;" v-if="index === 0">
            {{item.LowerLimit ? item.LowerLimit : ''}} {{item.LowerLimit && item.HigherLimit ? '-' : ''}} {{item.HigherLimit ? item.HigherLimit : ''}}
          </td>
          <td v-if="index === 1"></td>
          <td class="element-middle" rowspan="2" v-if="index === 0">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
          <td class="element-middle" rowspan="2" v-if="index === 0">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td>
        </template>
        <template v-else-if="index === 2 || index === 3">
          <td class="element-middle" style="width: 155px;" v-if="index === 2">
            {{item.LowerLimit ? item.LowerLimit : ''}} {{item.LowerLimit && item.HigherLimit ? '-' : ''}} {{item.HigherLimit ? item.HigherLimit : ''}}
          </td>
          <td v-if="index === 3"></td>
          <td class="element-middle" v-if="index === 2">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
          <td class="element-middle" v-if="index === 2">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td>
          <td class="element-middle" v-if="index === 3">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
          <td class="element-middle" v-if="index === 3">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td>
        </template>
        <template v-else-if="index === 4 || index === 5 || index === 6">
          <td class="element-middle" style="width: 155px;" v-if="index === 4">
            {{item.LowerLimit ? item.LowerLimit : ''}} {{item.LowerLimit && item.HigherLimit ? '-' : ''}} {{item.HigherLimit ? item.HigherLimit : ''}}
          </td>
          <td class="element-middle" v-if="index === 5"></td>
          <td class="element-middle" v-if="index === 6"></td>
          <td class="element-middle">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
          <td class="element-middle">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td>
          <!-- <td class="element-middle" v-if="index === 5">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
          <td class="element-middle" v-if="index === 5">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td>
          <td class="element-middle" v-if="index === 6">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
          <td class="element-middle" v-if="index === 6">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td> -->
        </template>
        <template v-else-if="index === 7">
          <td class="element-middle" style="width: 155px;">
            ({{item.LowerLimit ? (item.LowerLimit) : ''}}) {{item.LowerLimit && item.HigherLimit ? '-' : ''}} ({{item.HigherLimit ? `+${item.HigherLimit}` : ''}})
          </td>
          <td class="element-middle" v-if="index === 7">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
          <td class="element-middle" v-if="index === 7">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td>
        </template>
        <template v-else>
          <td class="element-middle" style="width: 155px;">
            {{item.LowerLimit ? item.LowerLimit : ''}} {{item.LowerLimit && item.HigherLimit ? '-' : ''}} {{item.HigherLimit ? item.HigherLimit : ''}}
          </td>
          <td class="element-middle">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
          <td class="element-middle">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td>
        </template>
        <!-- Col-7 -->
        <td class="element-middle">
          <span>
            {{item.Result}}
          </span>
        </td>
        <template v-if="index === 0 || index === 1">
          <td class="element-middle" rowspan="2" v-if="index === 0"></td>
        </template>
        <template v-else-if="index === 2 || index === 3">
          <td class="element-middle" rowspan="2" v-if="index === 2">{{item.Unit}}</td>
        </template>
        <template v-else-if="index === 4 || index === 5 || index === 6">
          <td class="element-middle" rowspan="3" v-if="index === 4">{{item.Unit}}</td>
        </template>
        <template v-else>
          <td class="element-middle">{{item.Unit}}</td>
        </template>
      </tr>
    </table>
    <table class="table tbl-b tbl-b2" v-if="Version < 11">
      <tr>
        <th rowspan="2">
          <p class="text-center">STT</p>
          <p class="text-center">No.</p>
        </th>
        <th rowspan="2" width="80px">
          <p class="text-center">Thông số/</p>
          <p class="text-center">Parameters</p>
        </th>
        <th rowspan="2" width="80px">
          <p class="text-center">Khoảng tham chiếu/</p>
          <p class="text-center">Reference Interval</p>
        </th>
        <th colspan="2">
          <p class="text-center">Chỉ số báo động/</p>
          <p class="text-center">Critical results</p>
        </th>
        <th colspan="3">
          <p class="text-center">Kết quả/ Results</p>
        </th>
      </tr>
      <tr>
        <th class="nowrap">
          <p class="text-center">Giá trị thấp/ Low</p>
        </th>
        <th class="nowrap">
          <p class="text-center">Giá trị cao/ High</p>
        </th>
        <th class="nowrap">
          <p class="text-center">Kết quả/</p>
          <p class="text-center">Results</p>
        </th>
        <th>
          <p class="text-center">Đơn vị/</p>
          <p class="text-center">Unit</p>
        </th>
        <th class="text-center" width="30px" style="text-align: left" :rowspan="Data.Datas.length + 1">
          <img style="float: right;" width="20px" src="/static/print-note.png"/>
        </th>
      </tr>
      <tr :data="item" :key="index" v-for="(item, index) in Data.Datas">
        <td class="text-center">{{item.Order}}</td>
        <!-- Col-2 -->
        <td><unit :unit="item.Name" /></td>
        <td class="text-center nowrap">
          <template v-if="index === 3">
            ({{item.LowerLimit || 'Không áp dụng'}}) - (+{{item.HigherLimit || 'Không áp dụng'}})
          </template>
          <template v-else-if="index === 4">
            {{item.LowerLimit || 'Không áp dụng'}} - {{item.HigherLimit || 'Không áp dụng'}}
          </template>
          <template v-else>
            {{item.LowerLimit || 'Không áp dụng'}} - {{item.HigherLimit || 'Không áp dụng'}}
          </template>
        </td>
        <template v-if="index === 0">
          <td class="text-center nowrap">≤7.20</td>
          <td class="text-center nowrap">≥7.60</td>
        </template>
        <template v-else>
          <td class="text-center nowrap">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
          <td class="text-center nowrap">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td>
        </template>
        <td class="text-center nowrap">
          {{item.Result}}
        </td>
        <td class="text-center">{{item.Unit}}</td>
      </tr>
    </table>
    <p v-if="Version >= 11"><i>{{__t('Chú ý')}}: Khoảng tham chiếu trên dành cho Xét nghiệm khí máu động mạch cho người trưởng thành. Xét nghiệm khí máu tĩnh mạch và xét nghiệm cho đối tượng khác tham khảo thêm trong <b>Sổ tay khoảng tham chiếu</b></i></p>
    <br/>
    <br/>
    <br/>
    <br/>
    <table class="table">
      <tr>
        <td width="50%" class="text-center">
          <template v-if="Data">
            {{Data.ExecutionTime | viDisplayformatDateTime}}
          </template>
          <template v-else>
            .....giờ......., ngày....... tháng ....... năm ......
          </template>
          <p class="text-center font-bold">Người làm xét nghiệm</p>
          <br/><br/><br/>
          <p class="text-center" v-if="Data.ExecutionUser">{{handleName(Data.ExecutionUser.Fullname)}}</p>
        </td>
        <td class="text-center">
          <!-- <template v-if="Data.AcceptTime"> -->
          <template v-if="Data.DoctorAccept && Data.DoctorAccept.Fullname">
            {{Data.AcceptTime | viDisplayformatDateTime}}
          </template>
          <template v-else>
            .....giờ......., ngày....... tháng ....... năm ......
          </template>
          <p class="text-center font-bold">Bác sĩ chỉ định</p>
          <br/><br/><br/>
          <p v-if="Data.DoctorAccept && Data.DoctorAccept.Fullname" class="text-center">{{handleName(Data.DoctorAccept.Fullname)}}</p>
          <p v-else class="text-center">{{'..............................'}}</p>
        </td>
      </tr>
    </table>
    <template v-if="Data.Upload && Data.Upload.length">
      <div style="page-break-before: always"></div>
      <p>Hình ảnh kết quả xét nghiệm khí máu động mạch</p>
      <div :data="img" :key="index" v-for="(img, index) in Data.Upload">
        <p class="text-center" v-if="img">
          <img style="max-width: 70%" :src="getImg(img)" />
        </p>
      </div>
    </template>
  </div>
</template>
<script>
/*
 * The home index page.
 */
import VueBarcode from 'vue-barcode'
export default {
  /**
   * The name of the page.
   */
  name: 'ArterialBloodGasTestV2',
  components: {
    VueBarcode
  },
  props: ['Data'],
  /**
   * The components that the page can use.
   */
  data () {
    return {
      customer: {},
      Version: null
    }
  },
  mounted () {
    this.customer = this.$store.state.account.CurrentPatientObj
    this.Version = parseFloat(this.Data.Version ? this.Data.Version : this.Data.VerSion)
  },
  computed: {
  },
  methods: {
    getImg (img) {
      let url = ''
      if (img) {
        url = img.split('').reverse().join('').replace('.', '/').split('').reverse().join('')
      }
      return url
    },
    handleName (Fullname) {
      if (Fullname) {
        return Fullname.split('(')[0]
      }
      return ''
    }
  }
}
</script>
<style lang="stylus" scoped>
  .element-middle {
    text-align: center;
    vertical-align: middle;
  }
</style>
