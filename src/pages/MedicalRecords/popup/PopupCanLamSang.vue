<template>
  <div>
    <basepopup name="canLamSang" width="1200px" :isShowFooter="false" :clickToClose="true">
      <div slot="title" class="text-center">
        <h3 class="box-title">{{__t('KẾT QUẢ CHẨN ĐOÁN')}}</h3>
      </div>
      <template v-if="loaded">
        <template v-if="Item && Item.ExamCompleted">
          <div class="body-content">
            <table style="width: 70%;margin: 0 auto;">
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
                  <td colspan="2"><b>{{__t('Loại khám')}}</b>: {{__t(Item.VisitType)}}/ {{Item.VisitCode}}</td>
                </tr>
                <tr>
                  <td colspan="2"><b>{{__t('Bác sĩ chỉ định')}}</b>: {{Item.ChargeBy}}</td>
                </tr>
                <tr>
                  <td colspan="2"><b>{{__t('Tên chỉ định')}}</b>: {{Item.ServiceName}}</td>
                </tr>
                <tr>
                  <td colspan="2"><b>{{__t('Ngày hoàn thành chỉ định')}}</b>: {{Item.ExamCompleted | formatDateWithoutSecon}}</td>
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
        <template v-else>
          <div class="text-center">{{__t('Không có thông tin!')}}</div>
        </template>
      </template>
      <div v-else class="loading-text"><v-loading/></div>
      <div slot="footer">
        <div class="flex align-center space-between" style="padding: 0 143px;" v-if="Item && Item.ExamCompleted">
          <button type="button" class="btn btn-block v-white-btn" style="width: 150px" @click="handleClose()">{{__t('Đóng')}}</button>
          <button type="button" class="btn btn-block v-yellow-btn" style="width: 150px" v-if="hasRole('ShowPrint')" @click="handlePrint()">{{__t('In')}}</button>
        </div>
        <div style="padding: 0 143px;" v-else>
          <button type="button" class="btn btn-block v-white-btn" style="width: 150px;margin: 0px auto;margin-top: 10px!important;" @click="handleClose()">{{__t('Đóng')}}</button>
        </div>
      </div>
    </basepopup>
    <Printer :Item="Item" :Site="Site" v-if="PrintIsOpen"/>
  </div>
</template>

<script>
import Printer from '@/pages/DiagnosticReporting/Print.vue'
import constants from '@/constants'
import DiagnosticReporting from '@/services/DiagnosticReporting'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import SiteService from '@/services/Site'
export default {
  name: 'PopupCanLamSang',
  props: ['id'],
  data () {
    return {
      Site: {
        ViName: 'BỆNH VIỆN ĐA KHOA QUỐC TẾ VINMEC HẢI PHÒNG',
        EnName: 'VINMEC HAI PHONG INTERNATIONAL HOSPITAL',
        Address: 'Địa chỉ/ Add: Tổ 31 - P.Vĩnh Niệm - Q.Lê Chân - TP.Hải Phòng',
        PhoneNumber: '+84 (22) 57309888',
        Hotline: '+84 (22) 57301888 ',
        Emergency: '+84 (22) 57309115'
      },
      Item: null,
      PrintIsOpen: false,
      GENDER: constants.GENDER,
      loaded: false
    }
  },
  watch: {
    id (val) {
      if (val) {
        this.getData()
      }
    }
  },
  components: {
    Printer, VDateTimePicker
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      this.Item = null
      if (this.id) {
        await new DiagnosticReporting({hidemsg: true}).DetailCanLamSang(this.id).then(res => {
          this.Item = res.item
          this.loaded = true
        }).catch(e => {
          this.Item = null
          this.loaded = true
        })
        if (this.Item) {
          await new SiteService().all().then(sites => {
            this.Site = sites.find(e => e.ApiCode === this.Item.SiteCode)
          })
        }
      }
    },
    handleClose () {
      this.$modal.hide('canLamSang')
    },
    handlePrint () {
      this.PrintIsOpen = false
      new SiteService().all().then(sites => {
        this.PrintIsOpen = true
        this.Site = sites.find(e => e.ApiCode === this.Item.SiteCode)
        setTimeout(() => {
          this.$htmlToPaper('print-me', false, '')
        }, 500)
      })
    }
  }
}
</script>

<style scoped>

</style>
