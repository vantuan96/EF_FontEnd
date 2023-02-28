<template>
  <div>
    <table class="table v-table-1 no-margin">
      <thead>
        <tr>
          <th class="text-left">{{__t('Phòng khám')}}</th>
          <th class="text-left">{{__t('Bác sĩ')}}</th>
          <th class="text-left">{{__t('Thời gian khám')}}</th>
        </tr>
      </thead>
      <tr :data="item" :key="index" v-for="(item,index) in forms" v-if="!item.Removed">
        <template v-if="readonly || item.HasOENDData">
          <td>
            <template v-if="item.Clinic"><div class="fake-input disable">{{__label(item.Clinic)}}</div></template>
          </td>
          <td><div class="fake-input disable">{{item.PrimaryDoctor.Fullname || item.PrimaryDoctor.Username}}</div></td>
          <td><div class="fake-input disable">{{item.AdmittedDate}}</div></td>
        </template>
        <template v-else>
          <td width="30%" style="position: relative;">
            <button v-if="!item.Id" @click="remove(item)" class="btn-pos-left">
              <i aria-hidden="true" class="fa fa-trash"></i>
            </button>
            <v-select :options="Clinics" v-model="item.Clinic" />
          </td>
          <td>
            <div class="input-group input-group-sm">
              <input
                type="text"
                readonly
                class="form-control"
                :value="item.PrimaryDoctor.Fullname || item.PrimaryDoctor.Username"
              />
              <span class="input-group-btn">
                <button type="button" class="btn btn-info btn-flat" @click="syncHisDoctor(item)">
                  <span class="glyphicon glyphicon-refresh green-color"></span>
                </button>
              </span>
            </div>
          </td>
          <td width="20%">
            <v-date-time-picker
              v-model="item.AdmittedDate"
              class="full-w"
              :format="'HH:mm:ss DD/MM/YYYY'"
            />
          </td>
        </template>
      </tr>
      <tr v-if="!readonly">
        <td colspan="4" class="text-center">
          <button class="btn btn-info" @click="add()">{{__t('Thêm mới')}}</button>
          <!-- <button v-if="showBtn" class="btn btn-warning" @click="save()">{{__t('Lưu')}}</button> -->
        </td>
      </tr>
    </table>
    <his-doctor :OpdId="this.$route.params.Id" ref="HisDoctor" @close="selectDoctor" />
  </div>
</template>
<script>
import HisDoctor from '@/components/OPD/HisDoctor.vue'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import InitialAssessment from '@/services/OPD/InitialAssessment'
import NProgress from 'nprogress'
export default {
  name: 'InitialAssessmentForm',
  props: ['value', 'readonly', 'showBtn', 'FormType', 'FormId'],
  components: { HisDoctor, VDateTimePicker },
  data () {
    return {
      forms: [],
      selected: null
    }
  },
  computed: {},
  watch: {
    forms: function (val) {
      this.emitData()
    }
  },
  mounted () {},
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getClinics()
      this.forms = this.cloneObj(this.value)
      this.forms.forEach(e => {
        if (e.Clinic) {
          e.Clinic.value = e.Clinic.Id
          e.Clinic.label = e.Clinic.ViName
          e.Clinic.EnLabel = e.Clinic.EnName || e.Clinic.ViName + '.'
        }
        e.Removed = false
      })
    },
    add () {
      NProgress.start()
      this.forms.push({
        PrimaryDoctor: {},
        AdmittedDate: new Date(),
        Clinic: '',
        Removed: false
      })
      setTimeout(() => {
        NProgress.done()
      }, 1000)
    },
    syncHisDoctor (item) {
      this.selected = item
      this.$refs.HisDoctor.open(item.PrimaryDoctor)
    },
    selectDoctor (item) {
      this.selected.PrimaryDoctor = item
    },
    remove (item) {
      item.Removed = true
      this.emitData()
    },
    save (hidemsg, confirm) {
      var data = this.forms
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
      var query = { noLoading: true }
      if (hidemsg) {
        query.hidemsg = true
      }
      console.log('ChoosePrimaryDoctor', this.FormId)
      new InitialAssessment(query)
        .update('ChoosePrimaryDoctor/' + this.$route.params.Id + `/${this.FormId}`, {
          InitialAssessmentForm: data,
          FormName: this.FormType
        })
        .then(async response => {
          if (confirm === 'confirm') {
            console.log('Init running!')
            // await this.init()
          } else {
            setTimeout(() => {
              this.reload()
            }, 1000)
          }
        })
        .catch(e => {
          this.isNew = true
          this.toastedError(e.data.ViMessage)
        })
    },
    emitData () {
      var data = this.forms
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
      this.$emit('input', data)
    }
  }
}
</script>
