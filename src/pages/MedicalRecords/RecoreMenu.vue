<template>
  <div class="mrt20">
    <div>
      <div class="box border-box">
        <div class="box-body">
          <div class="row">
            <div class="col-md-12 col-sm-12">
              <div class="form-group">
                <label>{{__t('Chọn lý do xem hồ sơ')}}</label>
                <div class="group-radio no-flex" v-if="Notes">
                  <template  v-for="(status, index) in Notes">
                    <input :data="status" :key="index" type="checkbox" :id="'a' + index" name="status" v-model="status.selected">
                    <label :key="'a' + index" :for="'a' + index">{{__label(status)}}</label>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-sm-12">
              <div class="form-group">
                <label>{{__t('Mô tả chi tiết lý do nếu có')}}</label>
                <textarea-autosize rows="3" :placeholder="__t('Nhập lý do khác')" class="form-control" v-model="OtherNote"/>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-sm-12">
              <div class="form-group text-center">
                <button class="btn v-yellow-btn" :disabled="!hasSelectNote()" type="button" @click="submitNote">{{__t('Xem danh sách hồ sơ')}}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PatientRecords from './PatientRecords.vue'
import DiagnosticReporting from './DiagnosticReporting.vue'
import MedicationHistory from './MedicationHistory.vue'
import Logs from '@/services/Logs'
import DropFiles from '@/components/DropFiles.vue'
export default {
  name: 'RecordMenu',
  data () {
    return {
      type: 'PatientRecords',
      hasNote: false,
      Notes: [
        {
          id: 1,
          ViName: 'Khám bệnh/ Thực hiện phẫu thuật/thủ thuật tại bệnh viện',
          EnName: 'Khám bệnh/ Thực hiện phẫu thuật/thủ thuật tại bệnh viện',
          selected: false
        },
        {
          id: 2,
          ViName: 'Nhập viện nội trú',
          EnName: 'Nhập viện nội trú',
          selected: false
        },
        {
          id: 3,
          ViName: 'Hội chẩn',
          EnName: 'Hội chẩn',
          selected: false
        },
        {
          id: 4,
          ViName: 'Cấp lại giấy tờ cho bệnh nhân',
          EnName: 'Cấp lại giấy tờ cho bệnh nhân',
          selected: false
        },
        {
          id: 5,
          ViName: 'Giải quyết sự cố hoặc phàn nàn của bệnh nhân',
          EnName: 'Giải quyết sự cố hoặc phàn nàn của bệnh nhân',
          selected: false
        },
        {
          id: 6,
          ViName: 'Đánh giá tuân thủ hồ sơ bệnh án',
          EnName: 'Đánh giá tuân thủ hồ sơ bệnh án',
          selected: false
        },
        {
          id: 7,
          ViName: 'Đánh giá tuân thủ quy trình chuyên môn',
          EnName: 'Đánh giá tuân thủ quy trình chuyên môn',
          selected: false
        },
        {
          id: 8,
          ViName: 'Giải trình cho Bảo hiểm',
          EnName: 'Giải trình cho Bảo hiểm',
          selected: false
        },
        {
          id: 9,
          ViName: 'Kiểm tra định kỳ/đột xuất (JCI, SYT, Bảo hiểm..v.v..)',
          EnName: 'Kiểm tra định kỳ/đột xuất (JCI, SYT, Bảo hiểm..v.v..)',
          selected: false
        },
        {
          id: 10,
          ViName: 'Nghiên cứu khoa học',
          EnName: 'Nghiên cứu khoa học',
          selected: false
        },
        {
          id: 12,
          ViName: 'IT hỗ trợ người dùng',
          EnName: 'IT hỗ trợ người dùng',
          selected: false
        },
        {
          id: 11,
          ViName: 'Khác (Ghi rõ…..)',
          EnName: 'Khác (Ghi rõ…..)',
          selected: false
        }
      ],
      OtherNote: '',
      Id: this.$route.params.Id,
      parameters: {
        status: [],
        recordCode: null,
        visitCode: null,
        visitTypeGroupCode: [],
        specialty: [],
        startExaminationTime: null,
        endExaminationTime: null,
        pageNumber: 1,
        pages: 1,
        PageSize: 99999
      },
      img: null,
      pin: false,
      widthHeader: ''
    }
  },
  components: {
    PatientRecords, DiagnosticReporting, DropFiles, MedicationHistory
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    updateQuery () {
      return Object.assign({}, this.parameters, {
        status: this.parameters.status.map(e => { return e.value }),
        visitCode: this.parameters.visitCode,
        recordCode: this.parameters.recordCode,
        visitTypeGroupCode: this.parameters.visitTypeGroupCode.map(e => { return e.value }),
        specialty: this.parameters.specialty.map(e => { return e.value }),
        startExaminationTime: this.parameters.startExaminationTime,
        endExaminationTime: this.parameters.endExaminationTime
      })
    },
    activeClass (link) {
      return link === this.type ? 'active' : ''
    },
    hasSelectNote () {
      var hasOtherNote = this.Notes.find(e => e.selected && e.id === 11)
      var hasNote = this.Notes.find(e => e.selected && e.id !== 11)
      var OtherNote = this.OtherNote
      return (hasOtherNote && OtherNote) || (!hasOtherNote && hasNote)
    },
    submitNote () {
      var note = this.Notes.filter(e => e.selected).map(e => {
        return e.ViName
      })
      new Logs({})
        .update('', {
          url: window.location.href,
          name: 'Kho HSBA - BN PID ' + this.$route.params.Id,
          reason: note.join(',') + ',' + this.OtherNote
        })
        .then(response => {
          this.hasNote = true
          this.$router.push({name: 'ListRecordsMenuHSBA', params: { Id: this.Id }})
        })
    }
  }
}
</script>
