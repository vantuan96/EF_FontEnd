<template>
  <div class="a4-page box" id="printMe" v-if="DataSubmit">
    <table width="100%">
      <tr>
        <td width="20%" valign="top">
          <img src="/static/Logo Vinmec International Hospitall 1.png" />
        </td>
        <td class="text-center">
          <div class="font20 font-bold text-center">
            BIÊN BẢN HỘI CHẨN THÔNG QUA MỔ
          </div>
          <div class="font14 font-bold text-center" style="font-style: italic">
            JOINT-CONSULTATION FOR APPROVAL OF SURGERY
          </div>
        </td>
        <td align="middle"><CustomerBarCode :customer="customer" :height="50"/></td>
      </tr>
      <tr>
        <td width="20%" valign="top"></td>
        <td class="text-left">
          <div class="prBox" style="border: 1px solid black; padding: 15px">
            <div>
              <div class="Name">
                <span>Họ và tên</span>/ <i>Full name</i>: {{$store.state.account.CurrentPatientObj.Fullname}}
              </div>
              <div class="PID">
                <span>Số PID</span>/ <i>PID no</i>: {{$store.state.account.CurrentPatientObj.PID}}
              </div>
              <div class="dateofbirth">
                <span>Ngày tháng năm sinh</span>/ <i>Date of birth</i>: {{$store.state.account.CurrentPatientObj.DateOfBirth}}
              </div>
              <div class="gender">
                <span>Giới tính</span>/ <i>Gender</i>: {{$store.state.account.CurrentPatientObj.Gender === 0 ? 'Nữ' : 'Nam'}}
              </div>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <table width="100%">
      <tr class="text-left">
        <td>
          <div class="prBox" style="padding-top: 15px">
            <div
              class="Name"
              :data="item"
              :key="index"
              v-for="(item, index) in MASTERDATA['EDJCFAOSTOA'].Items"
            >
              <span style="margin: 0">
                {{ item.ViName }}/ <i>{{ item.EnName }} </i>: {{ formatData(item.Value) }}
              </span>
            </div>
          </div>
          <div class="prBox" style="padding-top: 5px">
            <div
              class=""
              :data="item"
              :key="index"
              v-for="(item, index) in MASTERDATA['EDJCFAOSDIA'].Items"
            >
              <span v-if="_VisitType === 'IPD'">
                {{ item.ViName }}/ <i>{{ item.EnName }}</i
                >: {{getChuanDoan($store.state.account.CurrentPatientObj)}}
              </span>
              <span v-else>
                {{ item.ViName }}/ <i>{{ item.EnName }}</i
                >: {{ DataSubmit.Diagnosis || item.Value }}
              </span>
            </div>
          </div>
          <div class="prBox" style="padding-top: 5px">
            <div v-if="MASTERDATA['EDJCFAOSTOJ']">
              <div class="form-group" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['EDJCFAOSTOJ'].Items">
                <p><span>{{item.ViName}}</span>/ <i>{{item.EnName}}</i>: <span>{{ formatDatax(item.Value) }}</span></p>
              </div>
            </div>
          </div>
          <div class="prBox" style="padding-top: 5px">
            <div v-if="MASTERDATA['EDJCFAOSSOP']">
              <div class="form-group">
                {{ MASTERDATA["EDJCFAOSSOP"].ViName }}/ <i>{{ MASTERDATA["EDJCFAOSSOP"].EnName }}</i
                >:
                <!-- <p style="margin: 0;" v-if="MASTERDATA['EDJCFAOSCC0'].ViName">
                  - {{ MASTERDATA["EDJCFAOSCC0"].ViName }}/ <i>{{ MASTERDATA["EDJCFAOSCC0"].EnName }}</i
                  >: {{ MASTERDATA["EDJCFAOSCC0"].Items[0].Value }}
                </p> -->
                <div v-if="MASTERDATA['EDJCFAOSCC0'].ViName">- <b>{{ MASTERDATA["EDJCFAOSCC0"].ViName }}</b>/ <i>{{ MASTERDATA["EDJCFAOSCC0"].EnName }}</i>: {{ MASTERDATA["EDJCFAOSCC0"].Items[0].Value }}</div>
                <div v-if="MASTERDATA['EDJCFAOSPHH'].ViName">- <b>{{ MASTERDATA["EDJCFAOSPHH"].ViName }}</b>/ <i>{{ MASTERDATA["EDJCFAOSPHH"].EnName }}</i>:</div>
                <div class="mrb10" v-if="MASTERDATA['EDJCFAOSPHH'] && MASTERDATA['EDJCFAOSPHH'].Items[0].Value">
                  <p v-html="MASTERDATA['EDJCFAOSPHH'].Items[0].Value"></p>
                </div>
                <div v-else>
                  <template v-if="DataSubmit.PastMedicalHistory">
                    <p style="margin-bottom: 0;">+ Tiền sử sản khoa:</p>
                    <p style="margin-left: 20px;">{{DataSubmit.PastMedicalHistory.TSSK || ''}}</p>
                    <p style="margin-bottom: 0;">+ Tiền sử kinh nguyệt:</p>
                    <p style="margin-left: 20px;">{{DataSubmit.PastMedicalHistory.TSKN || ''}}</p>
                    <p style="margin-bottom: 0;">+ Tiền sử khác:</p>
                    <p style="margin-left: 20px;">{{DataSubmit.PastMedicalHistory.TSK || ''}}</p>
                  </template>
                </div>
                <div v-if="MASTERDATA['EDJCFAOSHIS'].ViName">- <b>{{ MASTERDATA["EDJCFAOSHIS"].ViName }}</b>/ <i>{{ MASTERDATA["EDJCFAOSHIS"].EnName }}</i>:</div>
                <div class="mrb10" v-if="MASTERDATA['EDJCFAOSHIS'] && MASTERDATA['EDJCFAOSHIS'].Items[0].Value">
                  <p v-html="MASTERDATA['EDJCFAOSHIS'].Items[0].Value"></p>
                </div>
                <div v-if="MASTERDATA['EDJCFAOSASS'].ViName">- <b>{{ MASTERDATA["EDJCFAOSASS"].ViName }}</b>/ <i>{{ MASTERDATA["EDJCFAOSASS"].EnName }}</i>:</div>
                <div class="mrb10" v-if="MASTERDATA['EDJCFAOSASS'] && MASTERDATA['EDJCFAOSASS'].Items[0].Value">
                  <p v-html="MASTERDATA['EDJCFAOSASS'].Items[0].Value"></p>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <!-- <b>Bảng xét nghiệm</b>/ <i>Laboratory table</i> -->
    <table class="table header-table v-header-table-2">
      <tr>
        <td
          class="bg-head"
          style="padding: 5px; border: 1px solid #ccc; background: #f5f5f5"
          width="33%"
          v-if="MASTERDATA['EDJCFAOSTOC']"
        >
          <b>{{ MASTERDATA["EDJCFAOSTOC"].ViName }}</b
          ><br /><i>{{ MASTERDATA["EDJCFAOSTOC"].EnName }}</i>
        </td>
        <td
          class="bg-head"
          style="padding: 5px; border: 1px solid #ccc; background: #f5f5f5"
          width="33%"
          v-if="MASTERDATA['EDJCFAOSBIO']"
        >
          <b>{{ MASTERDATA["EDJCFAOSBIO"].ViName }}</b
          ><br /><i>{{ MASTERDATA["EDJCFAOSBIO"].EnName }}</i>
        </td>
        <td
          class="bg-head"
          style="padding: 5px; border: 1px solid #ccc; background: #f5f5f5"
          width="33%"
          v-if="MASTERDATA['EDJCFAOSUA0']"
        >
          <b>{{ MASTERDATA["EDJCFAOSUA0"].ViName }}</b
          ><br /><i>{{ MASTERDATA["EDJCFAOSUA0"].EnName }}</i>
        </td>
      </tr>
      <tr>
        <td style="vertical-align: top; padding: 5px; border: 1px solid #ccc">
          <div v-if="MASTERDATA['EDJCFAOSPRB']">
            <div>
              <label>{{ MASTERDATA["EDJCFAOSPRB"].ViName }}</label
              >/ <i>{{ MASTERDATA["EDJCFAOSPRB"].EnName }}</i
              >:
            </div>
            <div :data="item" :key="index + '-EDJCFAOSTGP'" v-for="(item, index) in MASTERDATA['EDJCFAOSTGP'].Items" > <span>- {{ item.ViName }}:</span> <Hlabel :noStatusLabel="true" v-model="item.Value" /> </div>
            <div :data="item" :key="index + '-EDJCFAOSPTP'" v-for="(item, index) in MASTERDATA['EDJCFAOSPTP'].Items" > <span>- {{ item.ViName }}:</span> <Hlabel :noStatusLabel="true" v-model="item.Value" /> </div>
            <div :data="item" :key="index + '-EDJCFAOSINR'" v-for="(item, index) in MASTERDATA['EDJCFAOSINR'].Items" > <p> <span>- {{ item.ViName }}:</span> <Hlabel :noStatusLabel="true" v-model="item.Value" /> </p> </div>
          </div>
          <div v-if="MASTERDATA['EDJCFAOSFRG'].ViName">
            <p> <b>{{ MASTERDATA["EDJCFAOSFRG"].ViName }}</b >:<Hlabel :noStatusLabel="true" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDJCFAOSFRG'].Items" v-model="item.Value" /> </p>
          </div>
          <div v-if="MASTERDATA['EDJCFAOSAPT'].ViName">
            <div> <b>{{ MASTERDATA["EDJCFAOSAPT"].ViName }}</b >: </div>
            <div :data="item" :key="index + '-EDJCFAOSTTS'" v-for="(item, index) in MASTERDATA['EDJCFAOSTTS'].Items" > <span>- {{ item.ViName }}:</span> <Hlabel :noStatusLabel="true" v-model="item.Value" /> </div>
            <div :data="item" :key="index + '-EDJCFAOSTTC'" v-for="(item, index) in MASTERDATA['EDJCFAOSTTC'].Items" > <span>- {{ item.ViName }}:</span> <Hlabel :noStatusLabel="true" v-model="item.Value" /> </div>
          </div>
        </td>
        <td style="vertical-align: top; padding: 5px; border: 1px solid #ccc">
          <p v-if="MASTERDATA['EDJCFAOSGLU'].ViName"> <label>{{ MASTERDATA["EDJCFAOSGLU"].ViName }}</label >: <Hlabel :noStatusLabel="true" v-model="MASTERDATA['EDJCFAOSGLU'].Items[0].Value" /> </p>
          <p v-if="MASTERDATA['EDJCFAOSURE'].ViName"> <label>{{ MASTERDATA["EDJCFAOSURE"].ViName }}</label >: <Hlabel :noStatusLabel="true" v-model="MASTERDATA['EDJCFAOSURE'].Items[0].Value" /> </p>
          <p v-if="MASTERDATA['EDJCFAOSCTN'].ViName"> <label>{{ MASTERDATA["EDJCFAOSCTN"].ViName }}</label >: <Hlabel :noStatusLabel="true" v-model="MASTERDATA['EDJCFAOSCTN'].Items[0].Value" /> </p>
          <p v-if="MASTERDATA['EDJCFAOSNAP'].ViName"> <label>{{ MASTERDATA["EDJCFAOSNAP"].ViName }}</label >: <Hlabel :noStatusLabel="true" v-model="MASTERDATA['EDJCFAOSNAP'].Items[0].Value" /> </p>
          <p v-if="MASTERDATA['EDJCFAOSKAP'].ViName"> <label>{{ MASTERDATA["EDJCFAOSKAP"].ViName }}</label >: <Hlabel :noStatusLabel="true" v-model="MASTERDATA['EDJCFAOSKAP'].Items[0].Value" /> </p>
          <p v-if="MASTERDATA['EDJCFAOSCLS'].ViName"> <label>{{ MASTERDATA["EDJCFAOSCLS"].ViName }}</label >: <Hlabel :noStatusLabel="true" v-model="MASTERDATA['EDJCFAOSCLS'].Items[0].Value" /> </p>
          <p v-if="MASTERDATA['EDJCFAOSAST'].ViName"> <label>{{ MASTERDATA["EDJCFAOSAST"].ViName }}</label >: <Hlabel :noStatusLabel="true" v-model="MASTERDATA['EDJCFAOSAST'].Items[0].Value" /> </p>
          <p v-if="MASTERDATA['EDJCFAOSALT'].ViName"> <label>{{ MASTERDATA["EDJCFAOSALT"].ViName }}</label >: <Hlabel :noStatusLabel="true" v-model="MASTERDATA['EDJCFAOSALT'].Items[0].Value" /> </p>
        </td>
        <td style="vertical-align: top; padding: 5px; border: 1px solid #ccc">
          <p v-if="MASTERDATA['EDJCFAOSGLC'].ViName"> <label>{{ MASTERDATA["EDJCFAOSGLC"].ViName }}</label >: <Hlabel :noStatusLabel="true" v-model="MASTERDATA['EDJCFAOSGLC'].Items[0].Value" /> </p>
          <p v-if="MASTERDATA['EDJCFAOSPRO'].ViName"> <label>{{ MASTERDATA["EDJCFAOSPRO"].ViName }}</label >: <Hlabel :noStatusLabel="true" v-model="MASTERDATA['EDJCFAOSPRO'].Items[0].Value" /> </p>
          <p v-if="MASTERDATA['EDJCFAOSLEU'].ViName"> <label>{{ MASTERDATA["EDJCFAOSLEU"].ViName }}</label >: <Hlabel :noStatusLabel="true" v-model="MASTERDATA['EDJCFAOSLEU'].Items[0].Value" /> </p>
        </td>
      </tr>
      <tr>
        <td
          class="bg-head"
          style="padding: 5px; border: 1px solid #ccc; background: #f5f5f5"
          v-if="MASTERDATA['EDJCFAOSBCC']"
        >
          <b>{{ MASTERDATA["EDJCFAOSBCC"].ViName }}</b
          ><br /><i>{{ MASTERDATA["EDJCFAOSBCC"].EnName }}</i>
        </td>
        <td
          class="bg-head"
          style="padding: 5px; border: 1px solid #ccc; background: #f5f5f5"
          width="25%"
          v-if="MASTERDATA['EDJCFAOSOT0']"
        >
          <b>{{ MASTERDATA["EDJCFAOSOT0"].ViName }}</b
          ><br /><i>{{ MASTERDATA["EDJCFAOSOT0"].EnName }}</i>
        </td>
        <td
          class="bg-head"
          style="padding: 5px; border: 1px solid #ccc; background: #f5f5f5"
          colspan="1"
          v-if="MASTERDATA['EDJCFAOSRAD']"
        >
          <b>{{ MASTERDATA["EDJCFAOSRAD"].ViName }}</b> <br />
          <i>{{ MASTERDATA["EDJCFAOSRAD"].EnName }}</i>
        </td>
      </tr>
      <tr>
        <td
          rowspan="3"
          style="vertical-align: top; padding: 5px; border: 1px solid #ccc"
        >
          <p v-if="MASTERDATA['EDJCFAOSRBC'].ViName"><label>{{ MASTERDATA["EDJCFAOSRBC"].ViName }}</label>/ {{ MASTERDATA["EDJCFAOSRBC"].EnName }}:<Hlabel :noStatusLabel="true" v-model="MASTERDATA['EDJCFAOSRBC'].Items[0].Value"/></p>
          <p v-if="MASTERDATA['EDJCFAOSWBC'].ViName"><label>{{ MASTERDATA["EDJCFAOSWBC"].ViName }}</label>/ {{ MASTERDATA["EDJCFAOSWBC"].EnName }}:<Hlabel :noStatusLabel="true" v-model="MASTERDATA['EDJCFAOSWBC'].Items[0].Value" /></p>
          <p v-if="MASTERDATA['EDJCFAOSPLT'].ViName"> <label>{{ MASTERDATA["EDJCFAOSPLT"].ViName }}</label >/ {{ MASTERDATA["EDJCFAOSPLT"].EnName }}: <Hlabel :noStatusLabel="true" v-model="MASTERDATA['EDJCFAOSPLT'].Items[0].Value" /> </p>
          <p v-if="MASTERDATA['EDJCFAOSHGB'].ViName"> <label >{{ MASTERDATA["EDJCFAOSHGB"].ViName }}/ {{ MASTERDATA["EDJCFAOSHGB"].EnName }}</label >: <Hlabel :noStatusLabel="true" v-model="MASTERDATA['EDJCFAOSHGB'].Items[0].Value" /> </p>
          <p v-if="MASTERDATA['EDJCFAOSHCT'].ViName"> <label>{{ MASTERDATA["EDJCFAOSHCT"].ViName }}</label >/ {{ MASTERDATA["EDJCFAOSHCT"].EnName }}: <Hlabel :noStatusLabel="true" v-model="MASTERDATA['EDJCFAOSHCT'].Items[0].Value" /> </p>
        </td>
        <td
          rowspan="3"
          style="vertical-align: top; padding: 5px; border: 1px solid #ccc"
        >
          <p v-if="MASTERDATA['EDJCFAOSQT0'].ViName">
            <label>{{ MASTERDATA["EDJCFAOSQT0"].ViName }}</label>
          </p>
          <p v-if="MASTERDATA['EDJCFAOSHIV'].ViName"> <label>{{ MASTERDATA["EDJCFAOSHIV"].ViName }}</label >: <Hlabel :noStatusLabel="true" v-model="MASTERDATA['EDJCFAOSHIV'].Items[0].Value" /> </p>
          <p v-if="MASTERDATA['EDJCFAOSHA0'].ViName"> <label>{{ MASTERDATA["EDJCFAOSHA0"].ViName }}</label >: <Hlabel :noStatusLabel="true" v-model="MASTERDATA['EDJCFAOSHA0'].Items[0].Value" /> </p>
          <p v-if="MASTERDATA['EDJCFAOSHCV'].ViName"> <label>{{ MASTERDATA["EDJCFAOSHCV"].ViName }}</label >: <Hlabel :noStatusLabel="true" v-model="MASTERDATA['EDJCFAOSHCV'].Items[0].Value" /> </p>
        </td>
        <td style="vertical-align: top; padding: 5px; border: 1px solid #ccc">
          <table class="table mini-tablex mini-tablex1" style="border: none;width: 100%">
            <template v-if="CDHA && CDHA.length">
              <!-- <thead>
                <tr>
                  <td width="30%">
                    <b>{{ __t("Dịch vụ") }}</b>
                  </td>
                  <td>
                    <b>{{ __t("Kết luận") }}</b>
                  </td>
                </tr>
              </thead> -->
              <tbody>
                <tr
                  :key="i"
                  v-for="(it, i) in CDHA"
                  v-if="!hasCDHA.includes(it.MaDichVu)"
                >
                  <td style="vertical-align: top;"><p>{{ it.TenDichVu }}: {{ it.KetLuan }}</p></td>
                </tr>
              </tbody>
            </template>
            <!-- <tr v-else>
              <td
                class="text-center"
                style="border: none; padding: 5px"
              >
                <p class="no-result" style="padding: 10px; margin: 0">
                  {{ __t("Không có kết quả") }}
                </p>
              </td>
            </tr> -->
          </table>
        </td>
      </tr>
      <tr>
        <td
          class="bg-head"
          style="padding: 5px; border: 1px solid #ccc"
          v-if="MASTERDATA['EDJCFAOSECG']"
        >
          <b>{{ MASTERDATA["EDJCFAOSECG"].ViName }}</b
          ><br /><i>{{ MASTERDATA["EDJCFAOSECG"].EnName }}</i>
        </td>
      </tr>
      <tr>
        <td
          colspan="1"
          style="vertical-align: top; padding: 5px; border: 1px solid #ccc"
        >
          <p v-if="MASTERDATA['EDJCFAOSECG'].ViName">{{ MASTERDATA["EDJCFAOSECG"].Items[0].Value }}</p>
        </td>
      </tr>
      <tr>
        <td
          style="vertical-align: top; padding: 0; border: 1px solid #ccc"
          v-if="MASTERDATA['EDJCFAOSBG0']"
        >
          <table>
            <tr>
              <td
                style="
                  padding: 5px;
                  border: 1px solid #ccc;
                  background: #f5f5f5;
                  text-align: center;
                "
              >
                <b>{{ MASTERDATA["EDJCFAOSBG0"].ViName }}</b> <br />
                <i>{{ MASTERDATA["EDJCFAOSBG0"].EnName }}:</i>
              </td>
              <td>
                <p style="text-transform: uppercase;"> &nbsp;&nbsp;&nbsp;&nbsp;{{MASTERDATA['EDJCFAOSBG0'].Items[0].Value || 'N/A'}} </p>
              </td>
            </tr>
          </table>
        </td>
        <td
          colspan="2"
          style="padding: 5px; border: 1px solid #ccc"
          v-if="MASTERDATA['EDJCFAOSPT0']"
        >
          <b style="font-weight: 500">{{ MASTERDATA["EDJCFAOSPT0"].ViName }}</b
          >/<i
            >{{ MASTERDATA["EDJCFAOSPT0"].EnName }} ({{
              MASTERDATA["EDJCFAOSPT0"].Items[0].Note
            }}):
          </i>
          <span>{{ MASTERDATA["EDJCFAOSPT0"].Items[0].Value || "N/A" }}</span>
        </td>
      </tr>
    </table>
    <div class="form-group" v-if="MASTERDATA['EDJCFAOSAM0']" style="margin-top: 40px;">
      {{ MASTERDATA["EDJCFAOSAM0"].ViName }}/ <i>{{ MASTERDATA["EDJCFAOSAM0"].EnName }}</i
      >:
      <template v-for="(item, index) in MASTERDATA['EDJCFAOSAM0'].Items">
        <span :data="item" :key="index">{{ item.Value }}</span>
      </template>
    </div>
    <!-- Phương pháp phẫu thuật -->
    <div class="form-group" v-if="MASTERDATA['EDJCFAOSSM0']">
      {{ MASTERDATA["EDJCFAOSSM0"].ViName }}/ <i>{{ MASTERDATA["EDJCFAOSSM0"].EnName }}</i
      >:
      <template v-for="(item, index) in MASTERDATA['EDJCFAOSSM0'].Items">
        <span :data="item" :key="index">{{ item.Value }}</span>
      </template>
    </div>
    <!-- Loại phẫu thuật -->
    <div class="form-group" v-if="MASTERDATA['EDJCFAOSTOS'] && DataSubmit.Version === 3">
      {{ MASTERDATA["EDJCFAOSTOS"].ViName }}/ <i>{{ MASTERDATA["EDJCFAOSTOS"].EnName }}</i>:
      <div class="display-flex">
        <div v-for="(item, index) in MASTERDATA['EDJCFAOSTOS'].Items" :key="index" class="display-flex" style="align-items: center; margin-right: 20px;">
          <div style="margin-right: 5px;">{{MASTERDATA['EDJCFAOSTOS'].Items[index].Value ? '&#9745;' : '&#9744;'}}</div>
          <p>{{MASTERDATA['EDJCFAOSTOS'].Items[index].ViName}}</p>/&nbsp;<i>{{MASTERDATA['EDJCFAOSTOS'].Items[index].EnName}}</i>
        </div>
      </div>
    </div>
    <!-- Các biến chứng, nguy cơ, khó khăn đặc biệt cần lưu ý -->
    <div class="form-group" v-if="MASTERDATA['EDJCFAOSCRD']">
      {{ MASTERDATA["EDJCFAOSCRD"].ViName }}/ <i>{{ MASTERDATA["EDJCFAOSCRD"].EnName }}</i
      >:
      <template v-for="(item, index) in MASTERDATA['EDJCFAOSCRD'].Items">
        <span :data="item" :key="index">{{ item.Value }}</span>
      </template>
    </div>
    <div class="form-group" v-if="MASTERDATA['EDJCFAOSAM1']">
      {{ MASTERDATA["EDJCFAOSAM1"].ViName }}/ <i>{{ MASTERDATA["EDJCFAOSAM1"].EnName }}</i
      >:
      <template v-for="(item, index) in MASTERDATA['EDJCFAOSAM1'].Items">
        <span :data="item" :key="index">{{ item.Value }}</span>
      </template>
    </div>
    <div class="form-group" v-if="MASTERDATA['EDJCFAOSAM1'] && DataSubmit.Version !== 1">
      {{MASTERDATA['EDJCFAOSXNCBCC'].Items[0].Value ? '&#9745;' : '&#9744;'}} Xác nhận chuẩn bị công cụ dụng cụ để tháo/ ghép trước phẫu thuật đầy đủ và phù hợp/ <i>Confirm that the preparation of instruments for removal/implantation is complete and appropriate</i
      >:
    </div>
    <table class="table table-no-border" style="margin-top: 3px">
      <tr v-if="MASTERDATA['EDJCFAOSSUR']">
        <td width="1" class="no-wrap" style="padding-right: 15px">
          {{ MASTERDATA["EDJCFAOSSUR"].ViName }}/ <i>{{ MASTERDATA["EDJCFAOSSUR"].EnName }}</i
          >:
        </td>
        <td v-if="DataSubmit.Version >= 4 && VisitVersion >= 10">
          <GetUsers :listUser="getValueByCode('EDJCFAOSSURANS')"/>
        </td>
        <td v-else>
          <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['EDJCFAOSSUR'].Items"
          >
            <span> {{ item.Value }}</span>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['EDJCFAOSSAS']">
        <td width="1" class="no-wrap" style="padding-right: 15px">
          {{ MASTERDATA["EDJCFAOSSAS"].ViName }}/ <i>{{ MASTERDATA["EDJCFAOSSAS"].EnName }}</i
          >:
        </td>
        <td v-if="DataSubmit.Version >= 4 && VisitVersion >= 10">
          <GetUsers :listUser="getValueByCode('EDJCFAOSSASANS')"/>
        </td>
        <td v-else>
          <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['EDJCFAOSSAS'].Items"
          >
            <span> {{ item.Value }}</span>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['EDJCFAOSSD0']">
        <td width="1" class="no-wrap" style="padding-right: 15px">
          {{ MASTERDATA["EDJCFAOSSD0"].ViName }}/ <i>{{ MASTERDATA["EDJCFAOSSD0"].EnName }}</i
          >:
        </td>
        <td>
          <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['EDJCFAOSSD0'].Items"
          >
            <span>Ngày</span>/ <i>Date</i> {{ item.Value }}
          </div>
        </td>
      </tr>
    </table>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <table v-if="DataSubmit">
      <tr>
        <div class="row">
          <td v-if="DataSubmit.CMO">
            <div class="col-md-3 col-sm-3 text-center">
              <p class="text-center"><b>Lãnh đạo duyệt mổ</b></p>
              <p class="text-center"><i>CMO (or his/her designee)</i></p>
              <br>
              <br>
              <p class="text-center" v-if="DataSubmit.CMO && DataSubmit.CMO.Username">{{DataSubmit.CMO.Fullname}}</p>
              <br v-else>
              <br v-if="DataSubmit.CMO && !DataSubmit.CMO.Username">
            </div>
          </td>
          <td v-if="DataSubmit.HeadOfDept">
            <div class="col-md-3 col-sm-3 text-center">
              <p class="text-center"><b>Trưởng khoa</b></p>
              <p class="text-center"><i>(Head of dept.)</i></p>
              <br v-if="!DataSubmit.HeadOfDept.Username">
              <br>
              <p style="transform: translateY(-3.5px)" class="text-center" :class="{'margin-top': DataSubmit.HeadOfDept.Username} " v-if="DataSubmit.HeadOfDept.Username">
                {{DataSubmit.HeadOfDept.Fullname}}
              </p>
              <br v-else>
              <br v-if="!DataSubmit.HeadOfDept.Username">
            </div>
          </td>
          <td v-if="DataSubmit.Anesthetist">
            <div class="col-md-3 col-sm-3 text-center">
              <p class="text-center"><b>Bác sĩ gây mê</b></p>
              <p class="text-center"><i>(Anesthetist)</i></p>
              <br>
              <br>
              <p class="text-center" v-if="DataSubmit.Anesthetist.Username">{{DataSubmit.Anesthetist.Fullname}}</p>
              <br v-else>
              <br v-if="!DataSubmit.Anesthetist.Username">
            </div>
          </td>
          <td v-if="DataSubmit.Surgeon">
            <div class="col-md-3 col-sm-3 text-center">
              <p class="text-center"><b>Bác sỹ phẫu thuật</b></p>
              <p class="text-center"><i>(Surgeon)</i></p>
              <br>
              <br>
              <p class="text-center" v-if="DataSubmit.Surgeon.Username">{{DataSubmit.Surgeon.Fullname}}</p>
              <br v-else>
              <br v-if="!DataSubmit.Surgeon.Username">
            </div>
          </td>
        </div>
      </tr>
    </table>
  </div>
</template>
<script>
import EIOService from '@/services/IPD/EIOService'
import GetUsers from '@/components/global/GetUsers.vue'
import moment from 'moment'
export default {
  props: ['MASTERDATA', 'DataSubmit', 'CDHA', 'hasCDHA'],
  components: {
    GetUsers
  },
  data () {
    return {
      userData: {},
      customer: this.$store.state.account.CurrentPatientObj,
      VisitVersion: null
    }
  },
  created () {
    this.getVisitVersion()
  },
  methods: {
    getVisitVersion () {
      new EIOService().find('EMRForm/GetVersionByVisit/' + this._VisitId + '/' + this._VisitType).then(response => {
        this.VisitVersion = response.Version
      }).catch((e) => {
        console.log(e)
      })
    },
    getValueByCode (code) {
      var data = (this.DataSubmit.Datas.find(e => e.Code === code) || {}).Value
      if (data) {
        if (code === 'EDJCFAOSSURANS' || code === 'EDJCFAOSSASANS') {
          if (typeof data === 'object' || data.includes('[')) {
            data = JSON.parse(data).map(e => { return e.label ? e.label : e })
            if (data) {
              data = data.join(',').replace(/ *\([^)]*\) */g, '')
            }
          } else if (typeof data === 'string') {
            data = data.replace(/ *\([^)]*\) */g, '')
          }
        }
        data = data.replace(/['"]+/g, '')
      }
      return data
    },
    getIcdInfo () {
      let opd = this.$store.state.account.CurrentPatientObj
      let str = ''
      if (opd) {
        let icd = this.getICD10s(opd.DiagnosisAndICD.ICD, opd.DiagnosisAndICD.ICDOption, true)
        str = [opd.DiagnosisAndICD.Diagnosis, opd.DiagnosisAndICD.DiagnosisOption].filter(e => e).join('/ ') + ' ' + icd
      }
      return str
    },
    formatData (val) {
      if (val !== null && val !== undefined) {
        this.userData.time1 = (val).slice(0, 2)
        this.userData.time2 = (val).slice(3, 5)
        this.userData.date = (val).slice(6, 16)
        let text = this.userData.time1 + ' ' + 'giờ/Hours' + ' ' + this.userData.time2 + ' ' + 'ngày/Date:' + ' ' + this.userData.date
        return text
      } else {
        return 'N/A'
      }
    },
    formatDatax (val) {
      if (!val) return 'N/A'
      if (typeof val === 'string') val = moment(val, 'HH:mm DD/MM/YYYY')
      val = val._i
      if (val !== null && val !== undefined) {
        this.userData.time3 = (val).slice(0, 2)
        this.userData.time4 = (val).slice(3, 5)
        this.userData.date2 = (val).slice(6, 16)
        let text = this.userData.time3 + ' ' + 'giờ/Hours' + ' ' + this.userData.time4 + ' ' + 'ngày/Date:' + ' ' + this.userData.date2
        return text
      } else {
        return 'N/A'
      }
    }
  }
}
</script>
<style scoped>
.margin-top {
  margin-top: -15px;
}
</style>
