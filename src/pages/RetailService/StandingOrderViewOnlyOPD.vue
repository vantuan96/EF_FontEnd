<template>
  <div>
    <div class="box border-box">
      <div class="box-body">
        <div class="row">
          <div class="col-md-2 col-sm-2">
            <label>{{__t('Mạch')}} <span class="unit-label"> {{__t('(nhịp/phút)')}}</span></label>
            <input :placeholder="__t('(nhịp/phút)')" type="text" class="form-control" readonly v-model="DataSubmit.Pulse">
          </div>
          <div class="col-md-2 col-sm-2">
            <label>{{__t('Nhiệt độ')}} <span class="unit-label">  {{__t('(độ C)')}}</span></label>
            <input :placeholder="__t('(độ C)')" type="text" class="form-control" readonly v-model="DataSubmit.Temparature">
          </div>
          <div class="col-md-2 col-sm-2">
            <label>{{__t('Huyết áp')}} <span class="unit-label">  (mmHg)</span></label>
            <input placeholder="mmHg" type="text" class="form-control" readonly v-model="DataSubmit.BloodPressure">
          </div>
          <div class="col-md-2 col-sm-2">
            <label>{{__t('Chiều cao')}} <span class="unit-label"> (cm)</span></label>
            <input placeholder="cm" type="text" class="form-control" readonly v-model="DataSubmit.Height">
          </div>
          <div class="col-md-2 col-sm-2">
            <label>{{__t('Cân nặng')}} <span class="unit-label"> (Kg)</span></label>
            <input placeholder="Kg" type="text" class="form-control" readonly v-model="DataSubmit.Weight">
          </div>
          <div class="col-md-2 col-sm-2">
            <!-- <label class="hidden-text">{{__t('Cân nặng')}} <span class="unit-label"> (Kg)</span></label>
            <button @click="sync" class="btn btn-warning btn-block">{{__t('LẤY DỮ LIỆU')}}</button> -->
          </div>
        </div>
        <br/>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>{{__t('Chẩn đoán')}}</label>
              <p class="fake-input disable">{{DataSubmit.Diagnosis}}</p>
            </div>
          </div>
        </div>
          <div class="row">
          <div class="col-md-5">
            <div class="form-group">
              <label>{{__t('Bác sĩ chỉ định')}}:</label>
              <ad-Info v-if="DataSubmit.Doctor" :ad="DataSubmit.Doctor" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tbldiv">
      <div class="divhead">
        <div class="wdiv400">
          {{__t('Thông tin thuốc')}}
        </div>
        <div class="wlast">
          {{__t('Điều dưỡng xác nhận lượt thực hiện')}}
        </div>
      </div>
      <div class="divcontent" :data="item" :key="index" v-for="(item ,index) in DataSubmit.Datas">
        <div class="wdiv400">
          <div class="form-group">
            <b>{{__t('Tên thuốc')}}: {{item.Drug}}</b>
          </div>
          <div class="row">
            <div class="col-md-7">
              <label>{{__t('Đường dùng')}}: {{item.Route}}</label>
            </div>
            <div class="col-md-5">
              <label>{{__t('Tốc độ (ml/h)')}}: {{item.Speed}}</label>
            </div>
          </div>
        </div>
        <div class="wlast">
          <div class="scroll-parrent">
            <div class="drug-notes" :id="'drug-notes-' + index">
              <div class="drug-note" :key="index + '-' + $i" :data="note" v-for="(note, $i) in item.Note">
                <p><b><i class="fa fa-clock-o" aria-hidden="true"></i> {{note.NoteAt}}</b></p>
                <p>ĐD:  <ad-Info v-if="note.user" :ad="note.user" /></p>
                <p class="w200" v-if="note.Note"><b>Ghi chú: </b>{{note.Note}}</p>
                <div class="hidden-text">xxxxxxxxxxxxxxxxxxxxxxxxx</div>
                <div class="btt-pb">
                  <div><label class="font12">Xác nhận:</label></div>
                  <ad-Info v-if="note.Nurse" :ad="note.Nurse" />
                  <ad-Info v-if="note.Doctor" :ad="note.Doctor" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br/>
    <p><b>{{__t('Trạng thái')}}:</b> {{__label(DataSubmit.Status)}}</p>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */

export default {
  /**
   * The name of the page.
   */
  name: 'StandingOrderViewOnlyOPD',
  props: ['MASTERDATATMP', 'DataSubmit'],
  data () {
    return {
    }
  },
  mixins: [],
  components: {
  },
  mounted () {
  },
  computed: {
  },
  watch: {
  },
  methods: {
  }
}
</script>
