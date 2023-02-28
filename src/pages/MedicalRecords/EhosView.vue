<template>
  <div class="box form-content">
    <div class="">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>{{__t('Bác sĩ khám')}}</label>
            <p class="fake-input disable">{{Data.ViName}}</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>{{__t('Thời gian khám')}}</label>
            <p class="fake-input disable">{{Data.ExaminationTime | formatDateTime}}</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>{{__t('Lý do khám')}}</label>
            <p class="fake-input disable">{{Data.ChiefComplain}}</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>{{__t('Tiền sử bệnh')}}</label>
            <p class="fake-input disable">{{Data.PastMedicalHistory}}</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>{{__t('Tiền sử dị ứng')}}</label>
            <p class="fake-input disable">{{Data.HistoryOfAllergies}}</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>{{__t('Bệnh sử')}}</label>
            <p class="fake-input disable">{{Data.HistoryOfPresentIllness}}</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>{{__t('Triệu chứng LS')}}</label>
            <p class="fake-input disable">{{Data.ClinicalSymptoms}}</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>{{__t('Chẩn đoán sơ bộ')}}</label>
            <p class="fake-input disable">{{Data.InitialDiagnosis}}</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>{{__t('Xét nghiệm thăm dò chính')}}</label>
            <p class="fake-input disable">{{Data.Tests}}</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>{{__t('Chẩn đoán')}}</label>
            <p class="fake-input disable">{{Data.Diagnosis}}</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>{{__t('Mã ICD')}}</label>
            <p class="fake-input disable" v-if="Data.ICD">{{Data.ICD}}{{Data.ICDName ? (' - ' + Data.ICDName) : ''}}</p>
            <p class="fake-input disable" v-else></p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>{{__t('Mã ICD phụ')}}</label>
            <p class="fake-input disable" v-if="Data.ICDOption">{{Data.ICDOption}}{{Data.ICDOptionName ? (' - ' + Data.ICDOptionName) : ''}}</p>
            <p class="fake-input disable" v-else></p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>{{__t('Hướng điều trị')}}</label>
            <p class="fake-input disable">{{Data.TreatmentPlans}}</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>{{__t('Lời dặn và theo dõi')}}</label>
            <p class="fake-input disable">{{Data.DoctorRecommendations}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EhosView',
  props: ['Data']
}
</script>
