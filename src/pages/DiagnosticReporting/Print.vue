<template>
  <div id="print-me" hidden>
    <table style="width: 100%">
      <thead>
        <tr>
          <td colspan="2">
            <table style="width: 100%">
              <tr>
                <td>
                  <img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" />
                </td>
                <td>
                  <div class="text-center" style="font-size: 12pt;"><b>{{Site.ViName}}</b></div>
                  <div class="text-center" style="font-size: 11pt;"><b>{{Site.EnName}}</b></div>
                  <div class="text-center no-wrap" style="font-size: 10pt;">Địa chỉ/ Add: {{Site.Address}}</div>
                  <div class="text-center no-wrap" style="font-size: 10pt;">Điện thoại/ Tel: {{Site.PhoneNumber}} Hotline: {{Site.Hotline}} EMERGENCY: {{Site.Emergency}}</div>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div class="text-center" style="font-size: 12pt; text-transform: uppercase;">
                    <div class="text-center"><br/><b>KẾT QUẢ CHẨN ĐOÁN</b><br/></div>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="2"><b>PID:</b> {{Item.PID}}</td>
        </tr>
        <tr>
          <td colspan="2"><b>{{__t('Họ tên bệnh nhân')}}:</b> {{Item.Fullname}}</td>
        </tr>
        <tr>
          <td width="40%"><b>{{__t('Giới tính')}}:</b> {{__t(GENDER[Item.Gender])}}</td>
          <td><b>{{__t('Ngày sinh')}}:</b> {{Item.Dob | formatDate2}}</td>
        </tr>
        <tr>
          <td colspan="2"><b>{{__t('Ngày chỉ định')}}:</b> {{Item.CreatedAt | formatDateWithoutSecon}}</td>
        </tr>
        <tr>
          <td colspan="2"><b>{{__t('Loại khám')}}</b>: {{__t(Item.VisitType === 'VIHC' ? 'VMHC' : Item.VisitType)}}/ {{Item.VisitCode}}</td>
        </tr>
        <tr>
          <td colspan="2"><b>{{__t('Bác sĩ chỉ định')}}</b>: {{Item.ChargeBy}}</td>
        </tr>
        <tr>
          <td colspan="2"><b>{{__t('Tên chỉ định')}}</b>: {{Item.ServiceName}}</td>
        </tr>
        <tr>
          <td colspan="2"><b>{{__t('Ngày hoàn thành chỉ định')}}</b>: {{Item.ExamCompleted}}</td>
        </tr>
        <tr>
          <td colspan="2">
            <p><b>{{__t('Chẩn đoán')}}:</b> {{Item.InitialDiagnosis}}</p>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <p><b>{{__t('Kỹ thuật')}}:</b> {{Item.Technique}}</p>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <p><b>{{__t('Mô tả')}}:</b> {{Item.Findings}}</p>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <p><b>{{__t('Kết luận')}}:</b> {{Item.Impression}}</p>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td>
            <p class="text-center"><b>{{__t('Bác sĩ chuyên khoa')}}</b></p><br/><br/><br/>
            <p class="text-center">{{Item.CompletedBy}}</p><br/><br/><br/>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
import constants from '@/constants'
export default {
  name: 'FORM',
  props: ['Item', 'Site'],
  data () {
    return {
      VisitGroupTypes: {
        IPD: 'Nội trú',
        OPD: 'Khám ngoại trú',
        ED: 'Cấp cứu'
      },
      GENDER: constants.GENDER
    }
  }
}
</script>
