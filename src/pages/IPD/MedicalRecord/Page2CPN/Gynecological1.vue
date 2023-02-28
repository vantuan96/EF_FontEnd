<template>
  <div class="Gynecological1" v-if="MASTERDATA && DataSubmit && routeType">
    <div v-if="box1">
      <div><label>{{dex['21']}} {{__t2('Khi vào khoa điều trị-mdcGy')}}:</label></div>
      <div class="ml-10">
        <div class="form-group">
          <p v-if="MASTERDATA['IPDMRPTCDBC']" class="fake-input disable">{{MASTERDATA['IPDMRPTCDBC'].Items[0].Value || 'N/A'}}</p>
        </div>
        <div>
          <label>{{__t2('Mã ICD10')}}:</label>
          <Icd10View v-if="MASTERDATA['IPDMRPTICDC']" v-model="MASTERDATA['IPDMRPTICDC'].Items[0].Value"/>
        </div>
      </div>
      <div class="flex align-center mrb10">
        <CheckboxsValue :t2="true" v-if="MASTERDATA['IPDMRPE898']" :data="MASTERDATA['IPDMRPE898'].Items" :showall="true" :DataType="'Radio'" />
      </div>
      <div class="flex align-center mrb10">
        <CheckboxsValue :t2="true" v-if="MASTERDATA['IPDMRPE901']" :showdex="true" :data="MASTERDATA['IPDMRPE901'].Items" :showall="true" :DataType="'Checkbox'" />
      </div>
      <p v-if="MASTERDATA['IPDMRPE896']"><b>{{dex['22']}} {{__t('Tổng số ngày điều trị sau phẫu thuật')}}:</b> {{MASTERDATA['IPDMRPE896'].Items[0].Value}}</p>
      <p v-if="MASTERDATA['IPDMRPE894']"><b>{{dex['23']}} {{__t('Tổng số lần phẫu thuật')}}:</b> {{MASTERDATA['IPDMRPE894'].Items[0].Value}}</p>
      <div><label>{{dex['24']}} {{__t2('Ra Viện-mdcGy')}}:</label></div>
      <div class="ml-10">
        <div><label>{{__t2('Bệnh chính-mdcGy')}}:</label></div>
        <div class="form-group">
          <p v-if="MASTERDATA['IPDMRPECDBC']" class="fake-input disable">{{MASTERDATA['IPDMRPECDBC'].Items[0].Value || 'N/A'}}</p>
        </div>
        <div>
          <label>{{__t2('Mã ICD10')}}:</label>
          <Icd10View v-if="MASTERDATA['IPDMRPEICDC']" v-model="MASTERDATA['IPDMRPEICDC'].Items[0].Value"/>
        </div>
        <hr/>
        <div><label>{{__t2('Bệnh kèm theo-mdcGy')}}:</label></div>
        <div class="form-group">
          <p v-if="MASTERDATA['IPDMRPECDKT']" class="fake-input disable">{{MASTERDATA['IPDMRPECDKT'].Items[0].Value || 'N/A'}}</p>
        </div>
        <div>
          <label>{{__t2('Mã ICD10')}}:</label>
          <Icd10View v-if="MASTERDATA['IPDMRPEICDP']" v-model="MASTERDATA['IPDMRPEICDP'].Items[0].Value"/>
        </div>
        <div class="mrb10">
          <!-- Chuẩn đoán trước phẫu thuật -->
          <p v-if="MASTERDATA['IPDMRPE888']"><b>{{__t2('Chẩn đoán trước phẫu thuật-mdcGy')}}:</b></p>
          <Icd10View2 v-if="MASTERDATA['IPDMRPE888']" :mdCode="'IPDMRPE888'" :single="true" v-model="MASTERDATA['IPDMRPE888'].Items[0].Value"/>
          <FakeInput style="margin-left: 0px" v-if="MASTERDATA['IPDMRPE888']" class="mrt10 mrb10" v-model="MASTERDATA['IPDMRPE888'].Items[1].Value" />
          <!-- Chuẩn đoán sau phẫu thuật -->
          <p v-if="MASTERDATA['IPDMRPE891']"><b>{{__t2('Chẩn đoán sau phẫu thuật-mdcGy')}}:</b></p>
          <Icd10View2 v-if="MASTERDATA['IPDMRPE891']" :mdCode="'IPDMRPE891'" :single="true" v-model="MASTERDATA['IPDMRPE891'].Items[0].Value"/>
          <FakeInput style="margin-left: 0px" v-if="MASTERDATA['IPDMRPE891']" class="mrt10" v-model="MASTERDATA['IPDMRPE891'].Items[1].Value" />
        </div>
        <hr/>
      </div>
    </div>
  </div>
</template>

<script>
// import moment from 'moment'
export default {
  name: 'Gynecological1',
  props: ['box1', 'box2', 'MASTERDATA', 'readonly', 'DataSubmit', 'routeType'],
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    dex () {
      let array = []
      for (let i = 0; i < 50; i++) {
        array.push(i + '.')
      }
      if (this.routeType === 'Eye') {
        for (let i = 21; i <= 24; i++) {
          array[i] = (i + 1) + '.'
        }
      }
      if (this.routeType === 'A01_040_050919_V' || this.routeType === 'A01_039_050919_V') {
        for (let i = 21; i <= 24; i++) {
          array[i] = (i + 1) + '.'
        }
      }
      return array
    }
  },
  mounted () {
    this.changeData()
  },
  methods: {
    changeData () {
    }
  }
}
</script>
