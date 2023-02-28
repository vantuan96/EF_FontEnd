<template>
  <div class="flex align-center">
    <template v-if="Customer">
      <div class="mrr10">
        <div class="fw600">PID</div>
        <div class="flex align-center">
          <div>
            <VNumberInput v-model="Customer.PID" :maxlength="20" :placeholder="__t('Nhập')" :readonly="readonly"/>
          </div>
          <div v-if="!readonly">
            <button type="button" style="height: 33px;" class="btn btn-info btn-flat" @click="SyncPID()"><span class="glyphicon glyphicon-refresh green-color"></span></button>
          </div>
          <div v-if="!readonly && Customer.PID">
            <button v-if="!hiddenDeleteBtn" type="button" style="height: 33px;background-color: #f39c12;" class="btn btn-flat" @click="confirmPopup()"><i aria-hidden="true" class="fa fa-trash"></i></button>
          </div>
        </div>
      </div>
      <div class="mrr10">
        <div class="fw600">{{__t('Họ và tên')}}</div>
        <div><MDText v-model="Customer.Fullname" :readonly="true" style="min-width: 202px;"/></div>
      </div>
      <div class="mrr10">
        <div class="fw600 text-center">{{__t('Giới tính')}}</div>
        <div class="el-radio-view fw600 disable" v-if="!Customer.Gender && Customer.Gender !== 0">{{__t('N/A')}}</div>
        <div class="el-radio-view fw600" v-else-if="Customer.Gender === 0">{{__t('Nữ')}}</div>
        <div class="el-radio-view fw600" v-else-if="Customer.Gender === 1">{{__t('Nam')}}</div>
        <div class="el-radio-view fw600 disable" v-else>{{__t('Khác')}}</div>
      </div>
      <div class="mrr10">
        <div class="fw600">{{__t('Sinh ngày ')}}</div>
        <div>
          <p class="fake-input disable full-width" style="margin: 0; min-width: 89px;">{{getFTime2(Customer.DateOfBirth) || 'N/A'}}</p>
        </div>
      </div>
    </template>
    <modal v-if="!isGetVisitCode" :name="'syxxxx-modal'" transition="pop-out" height="auto" :scrollable="true" :width="750">
      <div class="sync-ed-box">
        <div v-if="customers && customers.length">
          <p><b>{{__t('Kết quả')}} ({{customers.length}})</b></p>
          <table class="table table-striped table-bordered" id="customer-tbl">
            <tbody>
              <tr :data="customer" :key="index" v-for="(customer,index) in customers">
                <td width="10" align="center">{{index + 1}}</td>
                <td>
                  PID: <b>{{customer.PID}} ({{customer.VisitCode}}) - {{customer.Fullname}}</b> - {{customer.DateOfBirth}}
                  <div>{{customer.Address}}</div>
                </td>
                <td width="10">
                  <button type="button" class="btn" @click="updateInfo(customer)">{{__t('Chọn')}}</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <template v-else-if="customers && customers.length === 0">
          <div class="callout callout-warning">
            <h4>{{__t('Không tìm thấy mã lượt khám của bệnh nhân!')}}</h4>
            <p>{{__t('Vui lòng kiểm tra lại thông tin trên eHos/OH')}}.</p>
          </div>
        </template>
      </div>
    </modal>
    <modal v-else name="visitcode-modal" transition="pop-out" height="auto" :scrollable="true" :width="modalWidth" :clickToClose="false">
      <div class="sync-ed-box">
        <table class="table table-striped table-bordered" id="customer-tbl">
          <thead>
            <tr>
              <td><b>Thông tin bệnh nhân</b></td>
            </tr>
          </thead>
          <tbody>
            <tr :data="customer" :key="index" v-for="(customer,index) in customers">
              <td>
                PID: <b>{{customer.PID}} - {{customer.Fullname}}</b> - {{customer.DateOfBirth}}
                <div>Địa chỉ: {{customer.Address}}</div>
              </td>
              <td v-if="visitCodes.length === 0" width="50" class="v-checkbox" align="center">
                <button class="btn btn-block btn-warning" @click="updateInfo(customer)">Chọn</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="visitCodes && visitCodes.length">
          <table class="table table-striped table-bordered" id="customer-tbl">
            <thead>
              <tr>
                <td colspan="2"><b>Kết quả lượt khám từ OH/Ehos ({{visitCodes.length}})</b></td>
                <td>Chọn</td>
              </tr>
            </thead>
            <tbody>
              <tr :data="visitcode" :key="index" v-for="(visitcode, index) in visitCodes">
                <td width="200px" style="vertical-align: top;">
                  <div class="no-wrap" style="font-size: 16px"><b>Lượt khám: {{visitcode.VisitTypeName}}</b></div>
                  <b>Ngày vào viện: <p class="no-wrap highlighted-text">{{visitcode.NgayVao}}</p></b>
                </td>
                <td>
                  <div>{{visitcode.BenhVien}}</div>
                  <div>Bs: <b>{{visitcode.BacSi}}</b></div>
                  <div>Khoa: {{visitcode.TenKhoa}}</div>
                  <div>Lượt tiếp nhận: {{visitcode.VisitCode}}</div>
                </td>
                <!-- <td width="50" class="v-checkbox" align="center">
                  <input type="checkbox" :id="'ETRIOE-' + index" :name="'ETRIOE-' + index" v-model="visitcode.selected">
                  <label :for="'ETRIOE-' + index"></label>
                </td> -->
                <td width="50" class="v-checkbox" align="center">
                  <button class="btn btn-block btn-warning" @click="updateVisitCode(visitcode.VisitCode)">Chọn</button>
                </td>
              </tr>
              <tr>
                <!-- <td><button type="button" class="btn btn-warning pull-left" @click="go2InitialAssessment()">Đi đến phân loại bệnh nhân</button></td> -->
                <td><button type="button" class="btn btn-white" @click="$modal.hide('visitcode-modal')">Quay lại</button></td>
                <!-- <td colspan="2">
                  <button type="button"  class="btn btn-warning pull-right" @click="SyncInfo()">{{__t('Đồng bộ thông tin')}}</button>
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>
        <template v-else-if="visitCodes && visitCodes.length === 0">
          <div class="callout callout-warning">
            <h4>Không tìm thấy mã lượt khám của bệnh nhân!</h4>
            <p>Vui lòng kiểm tra lại thông tin trên eHos/OH.</p>
          </div>
          <div>
            <!-- <button type="button" v-permissions="'ICIPD1DRAFT'" class="btn btn-warning ICIPD1DRAFT pull-right" @click="SyncInfo()">{{__t('Đồng bộ thông tin')}}</button>{{" "}} -->
            <button type="button" class="btn btn-white pull-lexft" @click="$modal.hide('visitcode-modal')">Quay lại</button>
          </div>
        </template>
      </div>
    </modal>
  </div>
</template>
<script>
import Customer from '@/services/Customer'
import CustomersIPD from '@/services/IPD/Customer'
const MODAL_WIDTH = 750
export default {
  name: 'GetInfoPid',
  props: ['readonly', 'Customer', 'hiddenDeleteBtn', 'isGetVisitCode'],
  data () {
    return {
      customers: [],
      visitCodes: [],
      customer: null,
      newArr: [],
      modalWidth: MODAL_WIDTH
    }
  },
  computed: {
    // hasSelectVissitCode () {
    //   return this.visitcodes.find(item => {
    //     return item.selected
    //   })
    // }
  },
  methods: {
    SyncPID () {
      new Customer({PID: this.Customer.PID})
        .all()
        .then(response => {
          this.customers = response
          new CustomersIPD().find('SyncVisitCodeByPID/' + this.Customer.PID).then(response => {
            // this.customers = []
            if (response && response.length > 0) {
              this.visitCodes = response
              console.log(this.newArr)
            } else {
              this.visitCodes = []
            }

            if (this.isGetVisitCode) {
              this.$modal.show('visitcode-modal')
            } else {
              this.$modal.show('syxxxx-modal')
            }
            if (!this.Customer.PID) {
              this.alert('Thông báo', 'Vui lòng nhập PID')
              return ''
            }
          })
        })
    },
    updateVisitCode (visitCode) {
      // console.log(this.visitCodes)
      this.customers.forEach(element => {
        this.newArr.push({
          ...element,
          VisitCode: visitCode
        })
      })
      this.updateInfo(this.newArr[0])
    },
    updateInfo (cus) {
      this.$emit('updateInfo', cus)
      this.$modal.hide('visitcode-modal')
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Cảnh báo'),
        text: this.__t('Bạn đồng ý xoá PID?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.clearPID()
              this.$emit('clearGetInfoPID')
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    clearPID () {
      if (this.Customer) {
        this.Customer.PID = ''
      }
      this.$emit('updateInfo')
    }
  }
}
</script>
