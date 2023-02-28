<template>
  <div>
    <modal name="VipUnlockForm" transition="pop-out" id="VipUnlockForm" height="auto" :clickToClose="false" :width="modalWidth" >
      <div class="box v-model-content-popup" v-if="customer">
        <div class="box-header text-center">
          <h3 class="box-title">{{customer.Fullname}} - {{customer.PID}} <VipIcon :data="customer" /></h3>
        </div>
        <div class="box-body padding-15">
          <div class="row">
            <div class="col-sm-12 col-md-12">
              <table class="table v-table-1 no-margin col-1-1 mt-15">
                <tr>
                  <th width="1"><div class="w160">{{__t('Tài khoản được truy cập')}}<span class="required">*</span></div></th>
                  <td colspan="2">
                    <input type="text" class="form-control" :placeholder="__t('Username')" v-model="item.Username">
                  </td>
                </tr>
                <tr>
                  <th colspan="3"><div class="w160">{{__t('Phạm vi truy cập')}}<span class="required">*</span></div></th>
                </tr>
                <tr>
                  <th width="1"><div class="w160">{{__t('Hồ sơ bệnh án')}}<span v-if="item.Types[0]" class="required">*</span></div></th>
                  <td width="1">
                    <div class="v-checkbox v-checkbox-2">
                      <input type="checkbox" :id="'hsba-checkbox'" v-model="item.Types[0]">
                      <label :for="'hsba-checkbox'" ></label>
                    </div>
                  </td>
                  <td>
                    <input type="text" v-if="item.Types[0]" class="form-control" :placeholder="__t('Mã hồ sơ')" v-model="item.RecodeCode">
                  </td>
                </tr>
                <tr>
                  <th width="1"><div class="w160">{{__t('Lịch sử chỉ định')}}</div></th>
                  <td width="1" colspan="2">
                    <div class="v-checkbox v-checkbox-2">
                      <input type="checkbox" :id="'chidinh-checkbox'" v-model="item.Types[1]">
                      <label :for="'chidinh-checkbox'" ></label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th width="1"><div class="w160">{{__t('Đơn thuốc')}}</div></th>
                  <td width="1" colspan="2">
                    <div class="v-checkbox v-checkbox-2">
                      <input type="checkbox" :id="'donthuoc-checkbox'" v-model="item.Types[2]">
                      <label :for="'donthuoc-checkbox'" ></label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th width="1"><div class="w160">{{__t('Y lệnh')}}</div></th>
                  <td width="1" colspan="2">
                    <div class="v-checkbox v-checkbox-2">
                      <input type="checkbox" :id="'ylenh-checkbox'" v-model="item.Types[3]">
                      <label :for="'ylenh-checkbox'" ></label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th width="1"><div class="w160">{{__t('Kết quả XN và CĐHA')}}</div></th>
                  <td width="1" colspan="2">
                    <div class="v-checkbox v-checkbox-2">
                      <input type="checkbox" :id="'kqcdhaxn-checkbox'" v-model="item.Types[4]">
                      <label :for="'kqcdhaxn-checkbox'" ></label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th width="1"><div class="w160">{{__t('Ngày hết hạn')}}<span class="required">*</span></div></th>
                  <td colspan="2">
                    <VDateTimePicker  v-model="item.ExpiredAt" :allday="'allday'" :format="vDateTimeFormat"/>
                  </td>
                </tr>
                <tr>
                  <th width="1"><div class="w160">{{__t('Lý do')}}<span class="required">*</span></div></th>
                  <td colspan="2">
                    <textarea-autosize class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="item.Note"/>
                  </td>
                </tr>
                <tr>
                  <th width="1"><div class="w160">{{__t('Đính kèm')}}</div></th>
                  <td colspan="2">
                    <drop-files id="mini-upload" v-model="item.Files"/>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="box-footer padding-15">
          <div class="row">
            <div class="col-sm-8 col-md-8"><button type="button" :class="{'disabled': isNoValidate}" class="btn btn-block" @click="cancel()">{{__t('Hủy')}}</button></div>
            <div class="col-sm-8 col-md-8"><button type="button" :class="{'disabled': isNoValidate}" class="btn btn-block v-yellow-btn" @click="submit()">{{__t('Đồng ý')}}</button></div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import DropFiles from '@/components/DropFiles.vue'
import UnlockVip from '@/services/UnlockVip'
const MODAL_WIDTH = 970
export default {
  name: 'VipUnlockForm',
  props: ['customer'],
  mixins: [],
  data () {
    return {
      modalWidth: MODAL_WIDTH,
      item: {
        Types: [false, false, false, false, false],
        Files: []
      }
    }
  },
  components: {
    VDateTimePicker, DropFiles
  },
  computed: {
    isNoValidate: function () {
      return !this.item.Username || !this.item.ExpiredAt || !this.item.Note || !this.item.Types || !this.item.Types.find(e => e) || (this.item.Types[0] && !this.item.RecodeCode)
    }
  },
  watch: {
  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    console.log(this.customer)
  },
  beforeDestroy () {
  },
  methods: {
    cancel () {
      this.item = {
        Types: [false, false, false, false, false],
        Files: []
      }
      this.$modal.hide('VipUnlockForm')
    },
    close () {
      this.$modal.hide('VipUnlockForm')
    },
    ok () {
    },
    submit () {
      new UnlockVip().create({
        ...this.item,
        RecodeCode: this.item.Types[0] ? this.item.RecodeCode : '',
        PID: this.customer.PID,
        Type: (this.item.Types.map((e, i) => {
          if (e) return (i + 1) + ''
          return e
        }).filter(e => e)).join(','),
        StringExpiredAt: this.item.ExpiredAt,
        Files: JSON.stringify(this.item.Files || [])
      }).then(() => {
        this.toastedSuccess('Mở khóa hồ sơ thành công')
        this.cancel()
      })
    }
  }
}
</script>
