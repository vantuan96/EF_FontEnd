<template>
  <div class="BreakPage">
    <table style="width: 100%">
      <tr>
        <td>
          <img
            class="top-logo"
            src="/static/Logo Vinmec International Hospitall 1.png"
          />
        </td>
        <td>
          <div v-if="this.$i18n.locale === 'vi'" class="text-center">
            <div class="text-center" style="font-size: 12pt; padding: 5px">
              <b>GIẤY XÁC NHẬN RA VIỆN</b>
            </div>
            <div class="text-center" style="font-size: 11pt; padding: 5px">
              <b>KHÔNG THEO CHỈ ĐỊNH CỦA BÁC SỸ</b>
            </div>
          </div>
          <div v-else class="text-center" style="font-size: 12pt; padding: 5px">
            <b>DISCHARGE AGAINTS MEDICAL ADVICE</b>
          </div>
          <div class="text-center" style="font-size: 10pt; padding: 5px">
            <i>({{ __t("Áp dụng cho người bệnh nội trú") }})</i>
          </div>
          <div class="text-center" style="font-size: 10pt; padding: 5px">
            <b v-if="this.$i18n.locale === 'vi'">{{
              WithSign === true
                ? "TRƯỜNG HỢP NGƯỜI BỆNH/NGƯỜI GIÁM HỘ KÝ XÁC NHẬN"
                : "TRƯỜNG HỢP NGƯỜI BỆNH/NGƯỜI GIÁM HỘ KHÔNG KÝ XÁC NHẬN"
            }}</b>
            <b v-else>
              {{
                WithSign === true
                  ? "WITH CONFIRMATION SIGNATURE OF PATIENT/PATIENT'S FAMILY MEMBER"
                  : "WITHOUT CONFIRMATION SIGNATURE OF PATIENT/PATIENT'S FAMILY MEMBER"
              }}
            </b>
          </div>
        </td>
      </tr>
    </table>
    <table style="width: 100%; margin-top: 20px">
      <tr>
        <td style="width: 70%">
          {{ __t("Người bệnh") }}: {{ DetailData.Customer.Fullname }}
        </td>
        <td style="width: 30%">
          {{ __t("Ngày sinh") }}:
          {{ DetailData.Customer.DateOfBirth | formatDate2 }}
        </td>
      </tr>
    </table>
    <table style="width: 100%">
      <tr>
        <td style="width: 30%">{{ __t("Số phòng") }}: {{ DetailData.Room }}</td>
        <td style="width: 40%">
          {{ __t("Khoa") }}: {{ DetailData.Specialty.ViName }}
        </td>
        <td style="width: 30%">
          {{ __t("Mã PID") }}: {{ DetailData.Customer.PID }}
        </td>
      </tr>
    </table>
    <table>
      <tr>
        <td>{{ __t("Chẩn đoán") }}: {{ getDiagnosis(DetailData.Dianosis) }}</td>
      </tr>
      <tr>
        <td v-if="this.$i18n.locale === 'vi'">
          {{ __t("Vào lúc") }}:
          {{ DetailData.TimeDischarge | viDisplayformatDateTimeWithMomentForDischarge }}
        </td>
        <td v-else>
          {{ __t("Vào lúc") }}:
          {{ DetailData.TimeDischarge | enDisplayformatDateTimeWithMomentForDischarge }}
        </td>
      </tr>
    </table>
    <div v-if="WithSign === true">
      <div style="padding-top: 15px">
        <b>{{ __t("Người bệnh/Người giám hộ người bệnh") }}</b>
      </div>
      <div style="margin-left: 20px">
        <div>
          <p>
            1. {{
              __t(
                "Tôi là người bệnh/người giám hộ, trong tình trạng tinh thần tỉnh táo và bình tĩnh, đã nghe bác sĩ/nhân viên bệnh viện giải thích và đã hiểu về tình trạng bệnh hiện tại của tôi/người nhà của tôi, mục đích, phương pháp điều trị và các rủi ro/ hậu quả có thể xảy ra của việc tự ý ra viện."
              )
            }}
            2. {{
              __t(
                "Tôi xin được ra viện/xin cho người nhà tôi ra viện, và đồng ý rằng bệnh viện không phải chịu bất kì trách nhiệm nào về quyết định này của tôi."
              )
            }}
            3. {{ __t("Lý do ra viện không theo chỉ định của Bác sĩ:") }} {{ DetailData.DischargeType }}
          </p>
        </div>
      </div>
      <table style="margin-top: 20px; width: 100%; margin-left: 20px">
        <tr>
          <td style="width: 70%">
            {{ __t("Họ tên người bệnh/người nhà:") }}
            {{ DetailData.CustomerName }}
          </td>
          <td style="width: 30%">{{ __t("Ký tên:") }}</td>
        </tr>
      </table>
      <div style="padding-top: 15px">
        <div>
          <b>{{ __t("Bác sĩ điều trị/Bác sĩ được ủy quyền") }}</b>
        </div>
        <div style="margin-left: 20px;">
            <p>
              1. {{
                __t(
                  "Tôi xác nhận đã giải thích cho người bệnh/người giám hộ về tình trạng bệnh hiện tại, mục đích điều trị, phương pháp điều trị và các rủi ro/hậu quả có thể xảy ra của việc tự ý xin ra viện."
                )
              }}
              2. {{
                __t(
                  "Tôi xác nhận rằng người bệnh/người giám hộ đang trong tình trạng tỉnh táo và bình tĩnh cũng như có đủ năng lực hành vi trong khi ra quyết định xin cho người bệnh ra viện không theo chỉ định của bác sĩ."
                )
              }}
            </p>
          </div>
      </div>
      <table style="margin-top: 20px; width: 100%; margin-left: 20px">
        <tr>
          <td style="width: 70%">
            {{ __t("Họ và tên bác sĩ") }}: {{ DetailData.DoctorFullName }}
          </td>
          <td style="width: 30%">{{ __t("Ký tên:") }}</td>
        </tr>
      </table>
    </div>
    <div v-else-if="WithSign === false">
      <div style="padding-top: 15px">
        <div>
          <b>{{ __t("Bác sĩ điều trị/Bác sĩ được ủy quyền") }}</b>
        </div>
        <div style="margin-left: 20px;">
          <p>
              1. {{
                __t(
                  "Tôi xác nhận đã giải thích cho người bệnh/người giám hộ về tình trạng bệnh hiện tại, mục đích điều trị, phương pháp điều trị và các rủi ro/hậu quả có thể xảy ra của việc tự ý xin ra viện."
                )
              }}
              2. {{
                __t(
                  "Tôi xác nhận rằng người bệnh/người giám hộ đang trong tình trạng tỉnh táo và bình tĩnh cũng như có đủ năng lực hành vi trong khi ra quyết định xin cho người bệnh ra viện không theo chỉ định của bác sĩ."
                )
              }}
              3. {{
                __t(
                  "Tôi xác nhận về việc người bệnh/người giám hộ của người bệnh từ chối ký cam kết công nhận sự việc và chịu mọi trách nhiệm và hậu quả do việc tự ý ra viện gây ra."
                )
              }}
              4. {{ __t("Lý do ra viện không theo chỉ định của Bác sĩ:") }} {{ DetailData.DischargeType }}
          </p>
        </div>
      </div>
      <table style="margin-top: 20px; width: 100%; margin-left: 20px">
        <tr>
          <td style="width: 70%">
            {{ __t("Họ và tên bác sĩ") }}: {{ DetailData.DoctorFullName }}
          </td>
          <td style="width: 30%">{{ __t("Ký tên:") }}</td>
        </tr>
      </table>
      <table style="margin-top: 20px; width: 100%; margin-left: 20px">
        <tr>
          <td style="width: 70%">
            {{ __t("Họ tên người làm chứng") }}:
            {{ DetailData.FormData.Witness }}
          </td>
          <td style="width: 30%">{{ __t("Ký tên:") }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
// import ConfirmDischargeWithoutDirect from '@/services/IPD/ConfirmDischargeWithoutDirect'

export default {
  name: 'ConfirmDischargeWithoutDirect_Print',
  props: ['DetailData', 'WithSign'],
  methods: {
  }
}
</script>
