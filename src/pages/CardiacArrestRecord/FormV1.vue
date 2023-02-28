<template>
  <div class="tab-form-content">
    <div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label v-if="MASTERDATA['EIOCAARRETIM']">{{__label(MASTERDATA['EIOCAARRETIM'])}}: <v-date-time-picker v-model="MASTERDATA['EIOCAARRETIM'].Items[0].Value" class="select-boox" :format="vDateTimeFormat"/></label>
            <label style="margin-left: 10px" v-if="MASTERDATA['EIOCAARREWEI']">{{__label(MASTERDATA['EIOCAARREWEI'])}}: <input v-model="MASTERDATA['EIOCAARREWEI'].Items[0].Value" class="form-control input-md"/></label> kg
            <label style="margin-left: 10px" v-if="MASTERDATA['EIOCAARREHEI']">{{__label(MASTERDATA['EIOCAARREHEI'])}}: <input v-model="MASTERDATA['EIOCAARREHEI'].Items[0].Value" class="form-control input-md"/></label> cm
            <height-and-weight  @copy="push2Wh"/>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12" v-if="MASTERDATA['EIOCAARREDIA']">
          <div class="form-group">
            <label>{{__label(MASTERDATA['EIOCAARREDIA'])}}<i class="unit-label" v-if="MASTERDATA['EIOCAARREDIA'].Note"> {{MASTERDATA['EIOCAARREDIA'].Note}}</i>:</label>
            <div :value="item" :key="index + '-' + item.Code"  v-for="(item, index) in MASTERDATA['EIOCAARREDIA'].Items">
              <textarea-autosize :data-code="item.Code" :id="item.Code" :value="item" class="form-control" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
            </div>
          </div>
        </div>
      </div>
      <table class="table v-table-1">
        <tr v-if="MASTERDATA['EIOCAARRELOA']">
          <th rowspan="2" style="width: 150px">
            {{__label(MASTERDATA['EIOCAARRELOA'])}}
          </th>
          <td>
            <div class="flex-box">
              <label class="flex-box-label">{{__label(MASTERDATA['EIOCAARRELOA'].Items[0])}}: </label>
              <div class="group-radio no-flex" style="flex-grow: 1;">
                <span v-if="index > 0 && index < 4" :data="item" :key="'EIOSOSCSIPNDB-' + index" v-for="(item, index) in MASTERDATA['EIOCAARRELOA'].Items">
                  <input type="checkbox" :id="'EIOCAARRELOAradio-' + index" v-model="item.Value">
                  <label :for="'EIOCAARRELOAradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOCAARRELOA'].Items, item)">{{__label(item)}}</label>
                </span>
                <input v-if="MASTERDATA['EIOCAARRELOA'].Items[3].Value" style="flex-grow: 1;" class="form-control" v-model="MASTERDATA['EIOCAARRELOA'].Items[4].Value" />
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['EIOCAARRELOA']">
          <td>
            <div class="flex-box">
              <label class="flex-box-label">{{__label(MASTERDATA['EIOCAARRELOA'].Items[5])}}: </label>
              <div class="group-radio no-flex" style="flex-grow: 1;">
                <span  v-if="index >= 6 && index < 11" :data="item" :key="'EIOSOSCSIPNDB2-' + index" v-for="(item,index) in MASTERDATA['EIOCAARRELOA'].Items">
                  <input type="checkbox" :id="'EIOCAARRELOAradio-' + index" v-model="item.Value">
                  <label :for="'EIOCAARRELOAradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOCAARRELOA'].Items, item)">{{__label(item)}}</label>
                </span>
                <input v-if="MASTERDATA['EIOCAARRELOA'].Items[10].Value" class="form-control" v-model="MASTERDATA['EIOCAARRELOA'].Items[11].Value" />
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['EIOCAARRECCA']">
          <th style="width: 200px">
            {{__label(MASTERDATA['EIOCAARRECCA'])}}
          </th>
          <td>
            <div class="rows">
              <div class="col-md-6 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EIOCAARRECCA'].Items" v-if="index !== 1">
                <div class="flex-box flex-center">
                  <div class="v-checkbox">
                    <input type="checkbox" :id="'PHCSCFradio-' + index" v-model="item.Value">
                    <label @click="checkbox2Radio(MASTERDATA['EIOCAARRECCA'].Items, item)" :for="'PHCSCFradio-' + index"></label>
                  </div>
                  <span class="displaytbl" :class="{'no-wrap': index === 0}"><span>{{__label(item)}}</span></span>
                  <input v-if="MASTERDATA['EIOCAARRECCA'].Items[0].Value && index === 0" class="form-control" v-model="MASTERDATA['EIOCAARRECCA'].Items[1].Value" />
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['EIOCAARREMR0']">
          <th style="width: 150px">
            {{__label(MASTERDATA['EIOCAARREMR0'])}}
          </th>
          <td>
            <div class="group-radio" style="flex-grow: 1;">
              <span :data="item" :key="'EIOSOSCSIPNDB-' + index" v-for="(item,index) in MASTERDATA['EIOCAARREMR0'].Items">
                <input type="checkbox" :id="'EIOCAARREMR0radio-' + index" v-model="item.Value">
                <label :for="'EIOCAARREMR0radio-' + index" @click="checkbox2Radio(MASTERDATA['EIOCAARREMR0'].Items, item)">{{__label(item)}}</label>
              </span>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['EIOCAARREVEN']">
          <th style="width: 150px">
            {{__label(MASTERDATA['EIOCAARREVEN'])}}
          </th>
          <td>
            <div class="flex-box">
              <div class="">
                <div class="group-radio no-nowrap">
                  <span>
                    <input type="checkbox" :id="'EIOCAARREVENradio-' + 0" v-model="MASTERDATA['EIOCAARREVEN'].Items[0].Value">
                    <label :for="'EIOCAARREVENradio-' + 0" @click="checkbox2Radio(MASTERDATA['EIOCAARREVEN'].Items, MASTERDATA['EIOCAARREVEN'].Items[0])">{{__label(MASTERDATA['EIOCAARREVEN'].Items[0])}}</label>
                  </span>
                </div>
              </div>
              <div class="">
                <div class="group-radio no-nowrap">
                  <span>
                    <input type="checkbox" :id="'EIOCAARREVENradio-' + 1" v-model="MASTERDATA['EIOCAARREVEN'].Items[1].Value">
                    <label :for="'EIOCAARREVENradio-' + 1" @click="checkbox2Radio(MASTERDATA['EIOCAARREVEN'].Items, MASTERDATA['EIOCAARREVEN'].Items[1])">{{__label(MASTERDATA['EIOCAARREVEN'].Items[1])}}</label>
                  </span>
                  <input style="flex-grow: 1;" v-if="MASTERDATA['EIOCAARREVEN'].Items[1].Value" class="form-control" v-model="MASTERDATA['EIOCAARREVEN'].Items[2].Value" />
                </div>
              </div>
              <div class="">
                <div class="group-radio no-nowrap">
                  <span>
                    <input type="checkbox" :id="'EIOCAARREVENradio-' + 3" v-model="MASTERDATA['EIOCAARREVEN'].Items[3].Value">
                    <label :for="'EIOCAARREVENradio-' + 3" @click="checkbox2Radio(MASTERDATA['EIOCAARREVEN'].Items, MASTERDATA['EIOCAARREVEN'].Items[3])">{{__label(MASTERDATA['EIOCAARREVEN'].Items[3])}}</label>
                  </span>
                  <input style="flex-grow: 1;" v-if="MASTERDATA['EIOCAARREVEN'].Items[3].Value" class="form-control" v-model="MASTERDATA['EIOCAARREVEN'].Items[4].Value" />
                </div>
              </div>
            </div>
            <br/>
            <div class="flex-box">
              <div class="">
                <div class="group-radio no-nowrap">
                  <span>
                    <input type="checkbox" :id="'EIOCAARREVENradio-' + 5" v-model="MASTERDATA['EIOCAARREVEN'].Items[5].Value">
                    <label :for="'EIOCAARREVENradio-' + 5" @click="checkbox2Radio(MASTERDATA['EIOCAARREVEN'].Items, MASTERDATA['EIOCAARREVEN'].Items[5])">{{__label(MASTERDATA['EIOCAARREVEN'].Items[5])}}</label>
                  </span>
                  <input style="flex-grow: 1;" v-if="MASTERDATA['EIOCAARREVEN'].Items[5].Value" class="form-control" v-model="MASTERDATA['EIOCAARREVEN'].Items[6].Value" />
                </div>
              </div>
              <div class="">
                <div class="group-radio no-nowrap">
                  <span>
                    <input type="checkbox" :id="'EIOCAARREVENradio-' + 7" v-model="MASTERDATA['EIOCAARREVEN'].Items[7].Value">
                    <label :for="'EIOCAARREVENradio-' + 7" @click="checkbox2Radio(MASTERDATA['EIOCAARREVEN'].Items, MASTERDATA['EIOCAARREVEN'].Items[7])">{{__label(MASTERDATA['EIOCAARREVEN'].Items[7])}}</label>
                  </span>
                </div>
              </div>
              <div class="">
                <div class="group-radio no-nowrap">
                  <span>
                    <input type="checkbox" :id="'EIOCAARREVENradio-' + 8" v-model="MASTERDATA['EIOCAARREVEN'].Items[8].Value">
                    <label :for="'EIOCAARREVENradio-' + 8" @click="checkbox2Radio(MASTERDATA['EIOCAARREVEN'].Items, MASTERDATA['EIOCAARREVEN'].Items[8])">{{__label(MASTERDATA['EIOCAARREVEN'].Items[8])}}</label>
                  </span>
                  <input style="flex-grow: 1;" v-if="MASTERDATA['EIOCAARREVEN'].Items[9] && MASTERDATA['EIOCAARREVEN'].Items[8].Value" class="form-control" v-model="MASTERDATA['EIOCAARREVEN'].Items[9].Value" />
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th style="width: 150px">
            {{__label(MASTERDATA['EIOCAARRENOT'])}}
          </th>
          <td>
            <div :data="item" :key="'EIOCAARRENOT-' + index" v-for="(item,index) in MASTERDATA['EIOCAARRENOT'].Items">
              <textarea-autosize :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)"  v-model="item.Value"/>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import VDateTimePicker from '@/components/VDateTimePicker.vue'
export default {
  name: 'CardiacArrestRecordFormV1',
  props: ['MASTERDATA'],
  components: {
    VDateTimePicker
  },
  methods: {
    push2Wh (data) {
      if (data.Weight) this.MASTERDATA['EIOCAARREWEI'].Items[0].Value = data.Weight
      if (data.Height) this.MASTERDATA['EIOCAARREHEI'].Items[0].Value = data.Height
    }
  }
}
</script>
