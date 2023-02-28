<template>
  <div class="display-inline">
    <button class="btn btn-warning btn-xs" type="button" @click="open"><i class="fa fa-retweet" aria-hidden="true"></i></button>
    <modal :name="'histoyr-modal-' + VisitId" transition="pop-out" height="auto" :scrollable="false" :width="modalWidth">
      <div class="box v-model-content-popup">
        <div class="box-header padding-15 color-white">
          PID: <b><pid :PID="Customer.Customer.PID" :noPidmsg="'Chưa đồng bộ PID'" />
          <i v-if="Customer.VisitCode">({{Customer.VisitCode}})</i>
          - {{Customer.Customer.Fullname}}</b>
          <div>
            {{Customer.Customer.DateOfBirth || 'N/A'}} - {{Customer.Customer.Phone || 'N/A'}}
          </div>
        </div>
        <div class="box-body padding-15">
          <initial-assessment-form
            v-if="DataSubmit.InitialAssessmentForm"
            v-model="DataSubmit.InitialAssessmentForm"
            :showBtn="!true"
            :FormType="'ShortTerm'"
            ref="InitialAssessmentForm"
          />
        </div>
        <div class="box-footer padding-15">
          <div class="row">
            <div class="col-md-12"><button type="button" class="btn btn-block btn-warning" @click="save">{{__t('Lưu')}}</button></div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import InitialAssessment from '@/services/OPD/InitialAssessment'
import InitialAssessmentForm from '@/components/OPD/InitialAssessmentForm.vue'
import EventBus from '@/lib/eventBus'
const MODAL_WIDTH = 880
export default {
  name: 'ChangeDoctorForm',
  props: ['VisitId', 'Customer'],
  components: {InitialAssessmentForm},
  data () {
    return {
      modalWidth: MODAL_WIDTH,
      DataSubmit: {}
    }
  },
  mounted () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
  },
  methods: {
    validateForm () {
      // abc
      var isNoValidate = this.DataSubmit.InitialAssessmentForm.find(form => {
        return !form.Removed && (!(form.PrimaryDoctor && form.PrimaryDoctor.Id) || !(form.Clinic && form.Clinic.Id))
      })
      if (isNoValidate) {
        this.$modal.show('dialog', {
          title: 'Có lỗi xảy ra',
          text: 'Bạn vui lòng nhập đầy đủ thông tin phòng khám và bác sĩ',
          class: 'v-dialog v-dialog-warning',
          buttons: [
            {
              title: 'Đồng ý',
              class: 'btn bg-yellow',
              handler: () => {
                this.$modal.hide('dialog')
              }
            }
          ]
        })
        throw new Error('validate form')
      }
    },
    save () {
      this.validateForm()
      var data = this.DataSubmit.InitialAssessmentForm
        .filter(e => !e.Removed)
        .map(e => {
          if (e.AdmittedDate && typeof e.AdmittedDate === 'object') {
            e.AdmittedDate = this.moment2String(
              e.AdmittedDate,
              'HH:mm:ss DD/MM/YYYY'
            )
          }
          return e
        })
      new InitialAssessment()
        .update('ChoosePrimaryDoctor/' + this.VisitId, {
          InitialAssessmentForm: data,
          FormName: 'ShortTerm'
        })
        .then(response => {
          EventBus.$emit('reloadData')
          this.$modal.hide('histoyr-modal-' + this.VisitId)
        })
    },
    open () {
      new InitialAssessment().find('ForShortTerm/' + 'A02_007_080121_VE/' + this.VisitId).then(response => {
        this.DataSubmit = response
        if (response.ErrorPopup) {
          this.alert('Thông báo', response.ViMessage)
        } else {
          this.$modal.show('histoyr-modal-' + this.VisitId)
        }
      })
    }
  }
}
</script>
