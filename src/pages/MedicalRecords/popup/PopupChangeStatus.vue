<template>
 <basepopup name="ChangeStatus" width="1300px" :isShowFooter="false" :clickToClose="false">
      <div slot="title" class="text-center">
        <h3 class="box-title">Thay đổi trạng thái người bệnh</h3>
      </div>
      <div class="body-content" v-if="DataStatus2.length > 0">
        <div v-if="DataStatus2" class="group-radio">
          <div v-for="(item, index) in DataStatus2" :data="item" :key="index" :class="{'status-disable': !statusCodeAllowChange.includes(item.StatusCode)}">
            <input type="radio" :id="'a' + index" name="status" :value="item" v-model="DataSubmit.Status">
            <label :key="'a' + index" :for="'a' + index">{{item.label}}</label>
          </div>
        </div>
        <br>
        <p><b>Lý do chuyển trạng thái</b></p>
        <textarea-autosize class="form-control mrb20" :class="error ? 'error' : null" rows="2" placeholder="Vui lòng nhập lý do chuyển"  v-model="DataSubmit.Note"/>
        <p class="msg-error" :class="!error ? 'none' : null">Vui lòng nhập lý do chuyển trạng thái</p>
      </div>
      <div slot="footer">
          <div class="row">
            <div class="col-xs-6">
              <button type="button" class="btn btn-block v-white-btn" @click="handleClose()">Huỷ</button>
            </div>
            <div class="col-xs-6">
              <button type="button" class="btn btn-block v-yellow-btn" @click="hamdleSubmit()">{{__t('Xác nhận')}}</button>
            </div>
          </div>
      </div>
    </basepopup>
</template>

<script>
import UpdateStatus from '@/services/UpdateStatus'
export default {
  name: 'PopupChangeStatus',
  props: {
    VisitType: '',
    DataStatus: null,
    PID: ''
  },
  data () {
    return {
      DataSubmit: {
        Note: '',
        Status: {}
      },
      DataStatus2: [],
      error: false,
      statusCodeAllowChange: ['EDIH', 'EDWR', 'OPDIH', 'IPDIH', 'IPDWR', 'OPDWR', 'EDNE', 'EOCIH', 'EOCWR', 'EOCNE', 'IPDNOEX']
    }
  },
  watch: {
    DataStatus (val) {
      if (val.length > 0) {
        this.DataStatus2 = [...val]
        this.DataStatus2.forEach(e => {
          if (e.Value === true) {
            this.DataSubmit.Status = e
          }
        })
      }
    }
  },
  computed: {
  },
  methods: {
    handleResetData () {
      this.DataSubmit = {
        Note: '',
        CheckBox: false,
        Status: {}
      }
      this.error = false
    },
    handleClose () {
      this.handleResetData()
      this.$modal.hide('ChangeStatus')
    },
    validate () {
      if (this.ImSuperAdmin()) this.DataSubmit.Note = 'IT Hỗ trợ chuyển trạng thái để khoa khác tiếp nhận'
      if (!this.DataSubmit.Note) {
        this.error = true
      } else {
        this.error = false
      }
    },
    hamdleSubmit () {
      this.validate()
      if (!this.error) {
        const dataSubmit = {
          StatusId: this.DataSubmit.Status.value,
          VisitType: this.VisitType,
          Note: this.DataSubmit.Note
        }
        new UpdateStatus().update(this.PID, dataSubmit).then(() => {
          this.showForm = false
          this.toastedSuccess()
          this.handleClose()
          this.$emit('handleResetData')
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.box-check-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  .mini-box-radio {
    width: 150px;
  }
}
.error {
  border: 1px solid red!important;
  margin-bottom: 2px!important;
}
.msg-error {
  color: red;
}
</style>
