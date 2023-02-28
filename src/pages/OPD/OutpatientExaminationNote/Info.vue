<template>
  <div>
    <div class="tbl-title">
      1. {{ __t("Đánh giá chung") }}
      <span v-if="DataSubmit.IsTelehealth" class="note-text">{{
        __t("Lưu ý: Các thông số bên dưới là do NB cung cấp")
      }}</span>
    </div>
    <div class="box box-table">
      <div class="box-body">
        <div class="row">
          <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENPUL']">
            <div
              class="form-group"
              :data="item"
              :key="index"
              v-for="(item, index) in MASTERDATA['OPDOENPUL'].Items"
            >
              <label
                >{{ __label(item) }}
                <i class="unit-label">({{ __t(item.Note) }})</i></label
              >
              <input
                :key="index"
                type="text"
                class="form-control"
                :placeholder="__t(item.Note)"
                v-model="item.Value"
                readonly
              />
            </div>
          </div>
          <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENTEM']">
            <div
              class="form-group"
              :data="item"
              :key="index"
              v-for="(item, index) in MASTERDATA['OPDOENTEM'].Items"
            >
              <label
                >{{ __label(item) }}
                <i class="unit-label">({{ __t(item.Note) }})</i></label
              >
              <input
                :key="index"
                type="text"
                class="form-control"
                :placeholder="__t(item.Note)"
                v-model="item.Value"
                readonly
              />
            </div>
          </div>
          <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENBP0']">
            <div
              class="form-group"
              :data="item"
              :key="index"
              v-for="(item, index) in MASTERDATA['OPDOENBP0'].Items"
            >
              <label
                >{{ __label(item) }}
                <i class="unit-label">({{ __t(item.Note) }})</i></label
              >
              <input
                :key="index"
                type="text"
                class="form-control"
                :placeholder="__t(item.Note)"
                v-model="item.Value"
                readonly
              />
            </div>
          </div>
          <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENSPO']">
            <div
              class="form-group"
              :data="item"
              :key="index"
              v-for="(item, index) in MASTERDATA['OPDOENSPO'].Items"
            >
              <label
                >{{ __label(item) }}
                <i class="unit-label">({{ __t(item.Note) }})</i></label
              >
              <input
                :key="index"
                type="text"
                class="form-control"
                :placeholder="__t(item.Note)"
                v-model="item.Value"
                readonly
              />
            </div>
          </div>
          <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENRR0']">
            <div
              class="form-group"
              :data="item"
              :key="index"
              v-for="(item, index) in MASTERDATA['OPDOENRR0'].Items"
            >
              <label
                >{{ __label(item) }}
                <i class="unit-label" v-if="item.Note"
                  >({{ __t(item.Note) }})</i
                ></label
              >
              <input
                :key="index"
                type="text"
                class="form-control"
                :placeholder="__t(item.Note)"
                v-model="item.Value"
                readonly
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENHEI']">
            <div
              class="form-group"
              :data="item"
              :key="index"
              v-for="(item, index) in MASTERDATA['OPDOENHEI'].Items"
            >
              <label
                >{{ __label(item) }}
                <i class="unit-label" v-if="item.Note"
                  >({{ __t(item.Note) }})</i
                ></label
              >
              <input
                :key="index"
                type="text"
                class="form-control"
                :placeholder="__t(item.Note)"
                v-model="item.Value"
                readonly
              />
            </div>
          </div>
          <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENWEI']">
            <div
              class="form-group"
              :data="item"
              :key="index"
              v-for="(item, index) in MASTERDATA['OPDOENWEI'].Items"
            >
              <label
                >{{ __label(item) }}
                <i class="unit-label" v-if="item.Note"
                  >({{ __t(item.Note) }})</i
                ></label
              >
              <input
                :key="index"
                type="text"
                class="form-control"
                :placeholder="__t(item.Note)"
                v-model="item.Value"
                readonly
              />
            </div>
          </div>
          <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENWEI']">
            <div class="form-group">
              <label>BMI <i class="unit-label"></i></label>
              <input
                class="form-control"
                readonly
                :value="bmiCalculation"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label v-if="Version >= 2">{{ __t("Phòng khám") }}</label>
              <label v-else>{{ __t("Dịch vụ") }}</label>
              <input
                type="text"
                class="form-control"
                v-model="DataSubmit.Service"
                readonly
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label>{{ __t("Bác sĩ khám") }}</label>
              <p class="fake-input" v-if="DataSubmit.PrimaryDoctor">
                <ad-Info
                  :ad="DataSubmit.PrimaryDoctor.Username"
                />
              </p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label>{{ __t("Thời gian khám") }}</label>
              <p class="fake-input" v-if="readonly">{{DataSubmit.ExaminationTime | formatDateWithoutSecon}}</p>
              <v-date-time-picker
                v-else
                v-model="DataSubmit.ExaminationTime"
                class="full-w"
                :format="vDateTimeFormat"
                :noclearable="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VDateTimePicker from '@/components/VDateTimePicker.vue'
export default {
  name: 'MedicalConsultationForm',
  props: ['DataSubmit', 'MASTERDATA', 'readonly'],
  components: {
    VDateTimePicker
  },
  computed: {
    bmiCalculation: function () {
      var weight = this.MASTERDATA['OPDOENWEI'].Items[0].Value
        ? parseFloat(this.MASTERDATA['OPDOENWEI'].Items[0].Value)
        : 0
      var height = this.MASTERDATA['OPDOENHEI'].Items[0].Value
        ? parseFloat(this.MASTERDATA['OPDOENHEI'].Items[0].Value) / 100
        : 0
      return (weight / (height * height)).toFixed(2)
    },
    Version: function () {
      return this.DataSubmit.Version || 2
    }
  },
  data () {
    return {
    }
  }
}
</script>
