<template>
  <div class="main-content disable_ccp" id="di0-page-print">
    <table class="table" style="width: 100%">
      <tr>
        <td width="30%"  style="vertical-align: top;" align="top">
          <img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" />
          <div class="textUppercase" style="margin-top: 10px">{{__t('KHOA: Hồi sức cấp cứu')}}</div>
        </td>
        <th class="text-center" style="text-align: center;vertical-align: top;" align="top">
          <h3 class="text-center mg-bt-0 textUppercase" style="text-align: center">{{__t('Xét nghiệm tại chỗ')}}</h3>
          <!-- <div class="text-center font-normal textUppercase"><b>{{__t('Xét nghiệm khí máu động mạch')}}</b></div> -->
          <div class="text-center font-normal textUppercase"><b>{{__t('Khí máu (Cartridge CG4+)')}}</b></div>
          <div class="text-center font-normal"><b>{{__t('Máy: iSTAT')}}</b></div>
        </th>
      </tr>
    </table>
    <br/>
    <table class="table" style="width: 100%">
      <tr>
        <td>
          <table style="width: 100%" class="tbl-b">
            <tr>
              <td colspan="2">
                <p><b>{{__t('Thông số bệnh nhân')}}</b> {{__t('Thở máy')}} () {{Data.UseBreathingMachine === true ? '&#9745; Có' : '&#9744; Có'}}   {{!(Data.UseBreathingMachine === true) ? '&#9745; Không' : '&#9744; Không'}}</p>
              </td>
            </tr>
            <tr>
              <td width="50%"><p>{{__t('Mode thở')}}: {{Data.BreathingMode || '.........................'}}</p></td>
              <td width="50%"><p>{{__t('Huyết áp')}}: {{Data.BP || '...............'}} mmHg</p></td>
            </tr>
            <tr>
              <td width="50%"><p>{{__t('Vt')}}: {{Data.Vt || '..............'}} f: {{Data.F || '............'}}</p></td>
              <td width="50%"><p>{{__t('Nhịp thở')}}: {{Data.RR || '........................'}}</p></td>
            </tr>
            <tr>
              <td width="50%"><p>{{__t('FIO2')}}: {{Data.FIO2 || '.......................'}} %</p></td>
              <td width="50%"><p>{{__t('Nhiệt độ')}}: {{Data.T || '.......................'}}</p></td>
            </tr>
          </table>
        </td>
        <td width="40%" style="padding-left:5px">
          <table style="width: 100%;" class="tbl-b">
            <tr>
              <td style="padding-left:5px">
                <p class="text-center"><i>{{__t('Dán PID người bệnh vào đây')}} </i></p>
                <p>{{__t('Họ và tên')}}: {{Data.Fullname}}</p>
                <p>{{__t('Số PID')}}:  {{Data.PID}}</p>
                <p>{{__t('Ngày tháng năm sinh')}}: {{Data.DateOfBirth}}</p>
                <p style="margin: 0;">{{__t('Giới tính')}}: {{Data.Gender}}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <br/>
    <table class="table tbl-b tbl-b2">
      <tr>
        <th rowspan="2" class="text-center">{{__t('Stt')}}</th>
        <th rowspan="2" colspan="2" class="text-center">{{__t('Thông số')}}</th>
        <th rowspan="2" class="text-center" width="80px">{{__t('Khoảng tham chiếu')}}</th>
        <th colspan="2" class="text-center">{{__t('Chỉ số báo động')}}</th>
        <th colspan="3" class="text-center">{{__t('Kết quả')}}</th>
      </tr>
      <tr>
        <th class="nowrap">{{__t('Giá trị thấp')}}</th>
        <th class="nowrap">{{__t('Giá trị cao')}}</th>
        <th class="text-center nowrap">{{__t('Kết quả')}}</th>
        <th>{{__t('Đơn vị')}}</th>
        <th class="text-center" width="30px" style="text-align: left" :rowspan="Data.Datas.length + 1">
          <img style="float: right;" width="20px" src="/static/print-note.png"/>
        </th>
      </tr>
      <tr :data="item" :key="index" v-for="(item, index) in Data.Datas">
        <td class="text-center">{{item.Order}}</td>
        <td><unit :unit="item.Name" /></td>
        <td class="text-center w100">{{item.ViAge}}</td>
        <td class="text-center nowrap">
          <template v-if="index === 4">
            ({{item.LowerLimit || 'N/A'}}) - (+{{item.HigherLimit || 'N/A'}})
          </template>
          <template v-else>
            {{item.LowerLimit || 'N/A'}} - {{item.HigherLimit || 'N/A'}}
          </template>
        </td>
        <td class="text-center nowrap">{{item.LowerAlert ? '≤' + item.LowerAlert : 'N/A'}}</td>
        <td class="text-center nowrap">{{item.HigherAlert ? '≥' + item.HigherAlert : 'N/A'}}</td>
        <td class="text-center nowrap">
          {{item.Result}}
        </td>
        <td class="text-center">{{item.Unit}}</td>
      </tr>
    </table>
    <br/>
    <table class="table">
      <tr>
        <td width="50%" class="text-center">
          <template v-if="Data.UpdatedForPrint">
            {{Data.UpdatedForPrint | viDisplayformatDateTime}}
          </template>
          <template v-else>
            {{__t('.....giờ......., ngày....... tháng ....... năm ......')}}
          </template>
          <p class="text-center">{{__t('NGƯỜI LÀM XÉT NGHIỆM')}}</p>
          <br/><br/><br/><br/>
          <p class="text-center" v-if="Data.ExecutionUser">{{Data.ExecutionUser.Fullname}}</p>
        </td>
        <td class="text-center">
          <template v-if="Data.AcceptTime">
            {{Data.AcceptTime | viDisplayformatDateTime}}
          </template>
          <template v-else>
            {{__t('.....giờ......., ngày....... tháng ....... năm ......')}}
          </template>
          <p class="text-center">{{__t('BÁC SĨ CHỈ ĐỊNH')}}</p>
          <br/><br/><br/><br/>
          <p class="text-center">{{(Data.DoctorAccept && Data.DoctorAccept.Fullname) || '..............................'}}</p>
        </td>
      </tr>
    </table>
    <template v-if="Data.Upload && Data.Upload.length">
      <div style="page-break-before: always"></div>
      <p>{{__t('Hình ảnh kết quả xét nghiệm khí máu động mạch')}}</p>
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
import Account from '@/services/Account'
export default {
  /**
   * The name of the page.
   */
  name: 'ArterialBloodGasTest',
  props: ['Data'],
  data () {
    return {
      FullName: ''
    }
  },
  /**
   * The components that the page can use.
   */
  mounted () {
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
    getFullName (confirmName) {
      new Account({noLoading: true, username: confirmName, hidemsg: true}).getInfo().then(res => {
        return res.Fullname.split('(')[0]
      })
    }
  }
}
</script>
