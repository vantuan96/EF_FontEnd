<template>
  <div class="main-content disable_ccp" id="di0-page-print">
    <!--  -->
    <div class="text-center"><img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></div>
    <div class="text-center">
      <table style="width: 400px;margin: 10px auto;" class="tbl-b">
        <tr>
          <td style="padding-left:5px">
            <p class="text-center"><i>{{__t('(Dán PID người bệnh vào đây)')}}</i></p>
              <div>{{__t('Họ và tên')}}: {{Data.Fullname}}</div>
              <div>{{__t('Số PID')}}:  {{Data.PID}}</div>
              <div>{{__t('Ngày tháng năm sinh')}}: {{Data.DateOfBirth}}</div>
              <div style="margin: 0;">{{__t('Giới tính')}}: {{Data.Gender}}</div>
          </td>
        </tr>
      </table>
    </div>
    <h3 class="text-center mg-bt-0 textUppercase" style="text-align: center">{{__t('Xét nghiệm tại chỗ')}}</h3>
    <div class="text-center font-normal textUppercase"><b>{{__t('Sinh hóa máu/ Chemistry (Catridge CHEM8+)')}}</b></div>
    <div class="text-center font-normal"><b>{{__t('Máy: iSTAT')}}</b></div>
    <p class="text-center textUppercase">{{__t('KHOA: Hồi sức cấp cứu')}}</p>
    <table class="table tbl-b tbl-b2">
      <tr>
        <th rowspan="2" class="text-center">{{__t('Stt')}}</th>
        <th rowspan="2" colspan="2" class="text-center">{{__t('Thông số')}}</th>
        <th rowspan="2" class="text-center">{{__t('Khoảng tham chiếu')}}</th>
        <th colspan="2" class="text-center">{{__t('Chỉ số báo động')}}</th>
        <th colspan="3" class="no-wrap text-center">{{__t('Kết quả')}}</th>
      </tr>
      <tr>
        <th class="no-wrap">{{__t('Giá trị thấp')}}</th>
        <th class="no-wrap">{{__t('Giá trị cao')}}</th>
        <th class="no-wrap text-center">{{__t('Kết quả')}}</th>
        <th>{{__t('Đơn vị')}}</th>
        <th class="text-center" width="30px" style="text-align: left" :rowspan="Data.Datas.length + 1">
          <img style="float: right;" width="20px" src="/static/print-note.png"/>
        </th>
      </tr>
      <tr :data="item" :key="index" v-for="(item, index) in Data.Datas">
        <template v-if="index === 8 || index === 6 || index === 7">
          <td class="align-middle text-center" rowspan="3" v-if="index === 6">{{item.Order}}</td>
          <td class="align-middle text-center" rowspan="3" v-if="index === 6">{{item.Name}}</td>
        </template>
        <template v-else-if="index === 3 || index === 4">
          <td class="align-middle text-center" rowspan="2" v-if="index === 3">{{item.Order}}</td>
          <td class="align-middle text-center" rowspan="2" v-if="index === 3">{{item.Name}}</td>
        </template>
        <template v-else>
          <td class="text-center">{{item.Order}}</td>
          <td class="text-center">{{item.Name}}</td>
        </template>
        <td>{{item.ViAge}}</td>
        <template v-if="index === 8 || index === 6 || index === 7">
          <td class="align-middle" rowspan="3" v-if="index === 6">
            {{item.LowerLimit || 'N/A'}} - {{item.HigherLimit || 'N/A'}}
          </td>
          <td class="align-middle" rowspan="3" v-if="index === 6">{{item.LowerAlert ? '≤' + item.LowerAlert : 'N/A'}}</td>
        </template>
        <template v-else>
          <template v-if="index === 3 || index === 4">
            <td class="align-middle" rowspan="2" v-if="index === 3">{{item.LowerLimit || 'N/A'}} - {{item.HigherLimit || 'N/A'}}</td>
          </template>
          <template v-else>
            <td>
              {{item.LowerLimit || 'N/A'}} - {{item.HigherLimit || 'N/A'}}
            </td>
          </template>
          <td>{{item.LowerAlert ? '≤' + item.LowerAlert : 'N/A'}}</td>
        </template>
        <td>{{item.HigherAlert ? '≥' + item.HigherAlert : 'N/A'}}</td>
        <td>
          {{item.Result}}
        </td>
        <template v-if="index === 8 || index === 6 || index === 7">
          <td class="align-middle" rowspan="3" v-if="index === 6">{{item.Unit}}</td>
        </template>
        <template v-else>
          <td>{{item.Unit}}</td>
        </template>
        <!-- <td width="100px" v-if="index === 0" :rowspan="Data.Datas.length">
        </td> -->
      </tr>
    </table>
    <br/><br/>
    <table class="table">
      <tr>
        <td width="50%" class="text-center">
          <template v-if="Data.ExecutionTime">
            {{Data.ExecutionTime | viDisplayformatDateTime}}
          </template>
          <template v-else>
            {{__t('.....giờ......., ngày....... tháng ....... năm ......')}}
          </template>
          <p class="text-center">{{__t('NGƯỜI LÀM XÉT NGHIỆM')}}</p>
          <br/><br/><br/>
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
          <br/><br/><br/>
          <p class="text-center">{{(Data.DoctorAccept && Data.DoctorAccept.Fullname) || '..............................'}}</p>
        </td>
      </tr>
    </table>
    <template v-if="Data.Upload && Data.Upload.length">
      <div style="page-break-before: always"></div>
      <p>{{__t('Hình ảnh kết quả xét nghiệm sinh hóa máu')}}</p>
      <div :data="img" :key="index" v-for="(img, index) in Data.Upload">
        <p class="text-center">
          <img style="max-width: 70%" :src="getImg(img)" />
        </p>
      </div>
    </template>
  </div>
</template>
<script>
/* ============
 * OS0 Page vi sao đặt tên là OS0 hỏi dungnv53
 * ============
 *
 * The home index page.
 */
export default {
  /**
   * The name of the page.
   */
  name: 'ChemicalBiologyTest',
  props: ['Data'],
  data () {
    return {
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
  },
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
    }
  }
}
</script>
