<template>
  <div>
    <modal name="ChargeDraft" transition="pop-out" id="ChargeDraft" height="auto" :clickToClose="false" :width="modalWidth" >
      <div class="box v-model-content-popup" v-if="draft">
        <div class="box-header text-center">
          <h3 class="box-title">{{__t('Nhập thông tin')}}</h3>
        </div>
        <div class="box-body padding-15">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <table class="table v-table-1 no-margin col-1-1">
                  <tr>
                    <th width="1"><div class="w160">{{__t('Tên bản nháp')}}</div></th>
                    <td>
                      <input type="text" class="form-control" :placeholder="__t('Nhập')" v-model="draft.Title"/>
                    </td>
                  </tr>
                  <tr>
                    <th width="1"><div class="w160">{{__t('Ghi chú')}}</div></th>
                    <td>
                      <textarea-autosize class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="draft.Note"/>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="box-footer padding-15">
          <div class="row">
            <div class="col-sm-6 col-md-6"><button type="button" class="btn btn-block" @click="close">{{__t('Hủy')}}</button></div>
            <div class="col-sm-6 col-md-6"><button type="button" :class="{'disabled': noValidate}" class="btn btn-block v-yellow-btn" @click="ok()">{{__t('Lưu')}}</button></div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import DoctorPlaceDiagnosticsOrder from '@/services/DoctorPlaceDiagnosticsOrder'
import { mapGetters } from 'vuex'
const MODAL_WIDTH = 970
export default {
  name: 'ChargeDraft',
  props: ['value'],
  mixins: [],
  data () {
    return {
      modalWidth: MODAL_WIDTH,
      draft: {
        Title: '',
        Note: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      servicesData: 'PlaceDiagnostics/getServices'
    }),
    noValidate: function () {
      return !this.draft.Title
    }
  },
  methods: {
    open (data) {
      if (data) {
        this.draft.Title = data.Title
        this.draft.Note = data.Note
      }
      this.$modal.show('ChargeDraft')
    },
    close () {
      this.$modal.hide('ChargeDraft')
    },
    ok () {
      if (this.value.Draft) {
        this.$modal.show('dialog', {
          clickToClose: false,
          title: this.__t('Thông báo'),
          text: this.__t('Đã tồn tại 1 bản ghi nháp, Bạn có chắc chắn lưu ghi nháp mới này?'),
          class: 'v-dialog v-dialog-warning',
          buttons: [
            {
              title: this.__t('Tôi xác nhận'),
              class: 'btn btn-warning',
              handler: () => {
                this.$modal.hide('dialog')
                this.send()
              }
            },
            {
              title: this.__t('Bỏ qua'),
              class: 'btn',
              handler: () => {
                this.$modal.hide('dialog')
              }
            }
          ]
        })
      } else {
        this.send()
      }
    },
    send () {
      new DoctorPlaceDiagnosticsOrder()
        .draft({
          PID: this.value.PID,
          RawData: JSON.stringify(this.servicesData),
          ...this.draft,
          ...this.value.Visit
        })
        .then((response) => {
          this.close()
          this.$emit('input', {
            ...this.value,
            Draft: response.request
          })
          this.toastedSuccess()
        })
    }
  }
}
</script>
