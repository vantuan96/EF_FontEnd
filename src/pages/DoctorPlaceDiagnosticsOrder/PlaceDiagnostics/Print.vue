<template>
  <div v-if="DetailData">
    <modal name="ChargePrint" transition="pop-out" id="ChargePrint" height="auto" :clickToClose="false" :width="modalWidth" >
      <div class="box v-model-content-popup">
        <div class="box-body padding-15 box-modal-auto">
          <div id="print-charge">
            <table style="width: 100%">
              <tr>
                <td>
                  <img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" />
                </td>
                <td>
                  <div class="text-center" style="font-size: 12pt; padding: 5px"><b>{{Site.ViName}}</b></div>
                  <div class="text-center" style="font-size: 11pt; padding: 5px"><b>{{Site.EnName}}</b></div>
                  <div class="text-center" style="font-size: 10pt; padding: 5px">Địa chỉ/ Add: {{Site.Address}}</div>
                  <div class="text-center" style="font-size: 10pt; padding: 5px">Điện thoại/ Tel: {{Site.PhoneNumber}} Hotline: {{Site.Hotline}} EMERGENCY: {{Site.Emergency}}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <VueBarcode v-if="Customer.PID" v-bind:value="Customer.PID" :height="40" :displayValue="false" :textAlign="'left'" :width="1" :marginTop="5" :fontSize="15"/>
                  {{Customer.PID}}
                </td>
                <td>
                  <div class="text-center" style="font-size: 12pt; text-transform: uppercase;">
                    <div class="text-center"><b>PHIẾU CHỈ ĐỊNH/ REQUEST ORDER</b></div>
                  </div>
                </td>
              </tr>
            </table>
            <table width="100%">
              <tr>
                <td>Bệnh nhân/ Patient: <b>{{Customer.Fullname}}</b></td>
                <td>Giới tính/ Sex: {{GENDER[Customer.Gender]}}</td>
              </tr>
              <tr>
              </tr>
              <tr>
                <td>Ngày sinh/ Dob: {{Customer.DateOfBirth | formatDate2}}</td>
                <td colspan="3">Điện thoại: {{Customer.Phone}}</td>
              </tr>
              <tr>
                <td>Bác sĩ ra chỉ định/ Ordering doctor: {{User.Fullname}}</td>
                <td>Ngày chỉ định/ Ordering date: {{data[0].CreatedAt | formatDate2}}</td>
              </tr>
              <tr>
                <td colspan="2">Chẩn đoán: {{data[0].Diagnosis}}</td>
              </tr>
            </table>
            <br/>
            <table width="100%">
              <tr :class="(!item.Selected ? 'only-web-page' : '')" v-for="(item, index) in Items.filter(e => e.Status === 'Placed')" :key="index">
                <td>
                  <div style="border: 1px solid rgb(204, 204, 204);padding:5px 10px;margin-bottom: 10px;">
                    <p><input class="mr-5 only-web-page" type="checkbox" v-model="item.Selected" /><b>{{item.Service.ViName}}</b></p>
                    <!-- <p>Thứ tự ưu tiên/ Priority: {{item.Priority === 'W' ? 'Khẩn cấp/ Urgent' : 'Thường quy'}}</p> -->
                    <!-- <div>Ghi chú/ Doctor's Note: {{item.Comments}}</div> -->
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="box-footer padding-15">
          <div class="row">
            <div class="col-sm-6 col-md-6"><button type="button" class="btn btn-block" @click="close">{{__t('Hủy')}}</button></div>
            <div class="col-sm-6 col-md-6"><button type="button" :class="{'disabled': noValidate}" class="btn btn-block v-yellow-btn" @click="print()">{{__t('In các dịch vụ đã chọn')}}</button></div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import VueBarcode from 'vue-barcode'
import constants from '@/constants'
import _ from 'lodash'
const MODAL_WIDTH = 970
export default {
  name: 'ChargePrint',
  props: ['data', 'Site', 'Customer', 'User'],
  mixins: [],
  data () {
    return {
      modalWidth: MODAL_WIDTH,
      DetailData: null,
      GENDER: constants.GENDER,
      Items: []
    }
  },
  components: {
    VueBarcode
  },
  computed: {
    noValidate: function () {
      return !this.Items.find(e => e.Selected)
    }
  },
  methods: {
    open () {
      this.DetailData = this.cloneObj(this.data)
      this.DetailData.forEach(element => {
        element.Selected = true
        this.Items = _.orderBy(this.Items.concat(element.Items.map(e => {
          e.Selected = true
          return e
        })), ['Priority'], ['desc'])
      })
      setTimeout(() => {
        this.$modal.show('ChargePrint')
      }, 100)
    },
    close () {
      this.$modal.hide('ChargePrint')
      this.DetailData = null
      this.Items = []
    },
    print () {
      this.$htmlToPaper('print-charge', false, '')
      setTimeout(() => {
        this.close()
      }, 1000)
    }
  }
}
</script>
