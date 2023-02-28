<template>
  <div id="printMePhysicianNoteED">
    <table class="tbl-b tbl-c mrt10" style="width: 100%">
      <thead>
        <tr>
          <td colspan="4">
            <table style="width: 100%">
              <tr>
                <td width="25%"  style="vertical-align: top;" align="top">
                    <div class="text-center" style="text-align: center"><img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></div>
                </td>
                <th class="text-center" style="text-align: center;vertical-align: top;position: relative;top: 10px;" align="top">
                  <h1 class="title-page" style="text-align: center">PHIẾU ĐIỀU TRỊ</h1>
                  <h1 class="title-page" style="text-align: center;font-style: italic;margin-top: 5px;">PHYSICIAN'S NOTE</h1>
                </th>
                <td width="20%" style="vertical-align: top;" align="top">
                  <CustomerBarCode v-if="customer" :customer="customer"/>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td width="70px" bgcolor="#dedede" style="font-weight: normal;border: 1px solid black;text-align: center;height: 30px;">Ngày/ Date</td>
          <td width="225px" bgcolor="#dedede" style="font-weight: normal;border: 1px solid black;text-align: center;height: 30px;" >Khám/  Examination</td>
          <td width="225px" bgcolor="#dedede" style="font-weight: normal;border: 1px solid black;text-align: center;height: 30px;" >Điều trị/ Treatment</td>
          <td bgcolor="#dedede" style="font-weight: normal;border: 1px solid black;text-align: center;height: 30px;" >Ký tên/ Sign</td>
        </tr>
        <template v-if="this.datasubmit && this.datasubmit.length">
          <tr v-for="(item, index) in this.datasubmit" :key="index" style="height: 56px;">
            <td width="70px" class="text-center" style="padding: 5px;">{{getFTime(item.NoteTime)}}</td>
            <td width="225px" style="padding: 5px;word-break: break-word!important;white-space: pre-line;">{{item.Examination}}</td>
            <td width="225px" style="padding: 5px;word-break: break-word!important;white-space: pre-line;">{{item.Treatment}}</td>
            <td style="vertical-align: bottom!important;padding: 5px;word-break: break-word!important;">
              <img src="static/bg-white.png" style="width: 50%;" />
              <div class="text-center">{{item.FullName}}</div>
            </td>
          </tr>
        </template>
        <template v-else>
            <tr style="height: 56px;">
                <td width="70px" style="padding: 5px;color: #white;"></td>
                <td width="225px"></td>
                <td width="225px"></td>
                <td></td>
            </tr>
            <tr style="height: 56px;">
                <td width="70px" style="padding: 5px;color: #white;"></td>
                <td width="225px"></td>
                <td width="225px"></td>
                <td></td>
            </tr>
            <tr style="height: 56px;">
                <td width="70px" style="padding: 5px;color: #white;"></td>
                <td width="225px"></td>
                <td width="225px"></td>
                <td></td>
            </tr>
            <tr style="height: 56px;">
                <td width="70px" style="padding: 5px;color: #white;"></td>
                <td width="225px"></td>
                <td width="225px"></td>
                <td></td>
            </tr>
            <tr style="height: 56px;">
                <td width="70px" style="padding: 5px;color: #white;"></td>
                <td width="225px"></td>
                <td width="225px"></td>
                <td></td>
            </tr>
            <tr style="height: 56px;">
                <td width="70px" style="padding: 5px;color: #white;"></td>
                <td width="225px"></td>
                <td width="225px"></td>
                <td></td>
            </tr>
            <tr style="height: 56px;">
                <td width="70px" style="padding: 5px;color: #white;"></td>
                <td width="225px"></td>
                <td width="225px"></td>
                <td></td>
            </tr>
            <tr style="height: 56px;">
                <td width="70px" style="padding: 5px;color: #white;"></td>
                <td width="225px"></td>
                <td width="225px"></td>
                <td></td>
            </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script>
import DischargeCertificate from '@/services/ED/DischargeCertificate'
export default {
  /**
   * The name of the page.
   */
  props: ['datasubmit', 'customer'],
  name: 'PhysicianNotePrint',
  data () {
    return {
      data: {}
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
  },
  mounted () {
    this.getData()
  },
  computed: {
  },
  methods: {
    print () {
      this.$htmlToPaper('printMePhysicianNoteED', false, 'A01_066_050919_VE')
    },
    getData () {
      new DischargeCertificate().find(this.$route.params.Id).then(response => {
        this.data = response
      })
    }
  }
}
</script>
