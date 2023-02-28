<template>
  <div>
    <table class="table v-table-1 no-margin col-1-1">
      <tr>
        <th width="1" class="no-wrap text-center">{{ __t('Điểm Apgar') }}</th>
        <th width="1" class="no-wrap text-center">{{ __t('Tổng') }}</th>
        <th width="1" class="no-wrap text-center">{{ __t('Mầu da') }}</th>
        <th width="1" class="no-wrap text-center">
          {{ __t('Nhịp thở') }}<br />
        </th>
        <th width="1" class="no-wrap text-center">{{ __t('Phản xạ') }}</th>
        <th width="1" class="no-wrap text-center">
          {{ __t('Trương lực cơ') }}
        </th>
        <th width="1" class="no-wrap text-center">{{ __t('Nhịp tim') }}</th>
        <th v-if="checkV2" class="no-wrap text-center">{{ __t('Ghi chú') }}</th>
      </tr>
      <tr v-for="(item, index) in tableApgar" :key="index">
        <td style="position: relative">
          <button
            v-if="!readonly && !viewonly"
            class="btn-pos-left"
            @click="deleteRowApgar(index)"
          >
            <i aria-hidden="true" class="fa fa-trash"></i>
          </button>
          <FakeInput
            v-if="readonly || viewonly"
            style="margin: 0"
            v-model="item.ApgarScore"
          />
          <textarea-autosize
            v-else
            rows="1"
            class="form-control"
            :placeholder="__t('Nhập')"
            v-model="item.ApgarScore"
          />
        </td>
        <td>
          <p class="text-center mb-0" style="transform: translateY(-10px);">
            {{ (item.Total = calculateScore[index] || 'N/A') }}
          </p>
        </td>
        <td class="text-center">
          <div v-if="readonly || viewonly">
            <FakeInput
              v-if="item.SkinColor"
              style="margin: 0"
              v-model="item.SkinColor"
            />
            <div v-else>
              <p v-if="item.SkinColor === 0" class="fake-input disable">0</p>
              <p v-else>N/A</p>
            </div>
          </div>
          <v-select v-else class='select-full-w' v-model="item.SkinColor" :placeholder="__t('Chọn')" :items="selectOption"/>
        </td>
        <td class="text-center">
          <div v-if="readonly || viewonly">
            <FakeInput
              v-if="item.Respiration"
              style="margin: 0"
              v-model="item.Respiration"
            />
            <div v-else>
              <p v-if="item.Respiration === 0" class="fake-input disable">0</p>
              <p v-else>N/A</p>
            </div>
          </div>
          <v-select v-else class='select-full-w' v-model="item.Respiration" :placeholder="__t('Chọn')" :items="selectOption"/>
        </td>
        <td class="text-center">
          <div v-if="readonly || viewonly">
            <FakeInput
              v-if="item.Reflex"
              style="margin: 0"
              v-model="item.Reflex"
            />
            <div v-else>
              <p v-if="item.Reflex === 0" class="fake-input disable">0</p>
              <p v-else>N/A</p>
            </div>
          </div>
          <v-select v-else class='select-full-w' v-model="item.Reflex" :placeholder="__t('Chọn')" :items="selectOption"/>
        </td>
        <td class="text-center">
          <div v-if="readonly || viewonly">
            <FakeInput
              v-if="item.MuscleTone"
              style="margin: 0"
              v-model="item.MuscleTone"
            />
            <div v-else>
              <p v-if="item.MuscleTone === 0" class="fake-input disable">0</p>
              <p v-else>N/A</p>
            </div>
          </div>
          <v-select v-else class='select-full-w' v-model="item.MuscleTone" :placeholder="__t('Chọn')" :items="selectOption"/>
        </td>
        <td class="text-center">
          <div v-if="readonly || viewonly">
            <FakeInput
              v-if="item.HeartRate"
              style="margin: 0"
              v-model="item.HeartRate"
            />
            <div v-else>
              <p v-if="item.HeartRate === 0" class="fake-input disable">0</p>
              <p v-else>N/A</p>
            </div>
          </div>
          <v-select v-else class='select-full-w' v-model="item.HeartRate" :placeholder="__t('Chọn')" :items="selectOption"/>
        </td>
        <td v-if="checkV2">
          <FakeInput
            v-if="readonly || viewonly"
            style="margin: 0"
            v-model="item.note"
          />
          <textarea-autosize
            v-else
            rows="1"
            class="form-control"
            :placeholder="__t('Nhập')"
            v-model="item.note"
          />
        </td>
      </tr>
    </table>

    <div v-if="!readonly && !viewonly" class="text-center">
      <button @click="addRowApgar()" class="btn v-green-btn v-bottom-btn">
        <i aria-hidden="true" class="fa fa-plus"></i> {{ __t('Thêm mới') }}
      </button>
    </div>
  </div>
</template>

<script>
import VSelect from '@/components/VSelect.vue'
export default {
  components: {
    VSelect
  },
  props: ['MASTERDATA', 'DataSubmit', 'readonly', 'viewonly', 'checkV2', 'ApgarTableData'],
  data () {
    return {
      selectOption: [
        {
          value: 0,
          label: '0'
        },
        {
          value: 1,
          label: '1'
        },
        {
          value: 2,
          label: '2'
        }
      ],
      tableApgar: []
    }
  },
  mounted () {
    this.tableApgar = this.MASTERDATA
  },
  computed: {
    calculateScore () {
      return this.tableApgar.map(item => {
        let num = 0
        let isNum = false
        if (item) {
          if (item.SkinColor !== '' && item.SkinColor !== 0) {
            num += Number(item.SkinColor)
            isNum = true
          }
          if (item.Respiration !== '' && item.Respiration !== 0) {
            num += Number(item.Respiration)
            isNum = true
          }
          if (item.Reflex !== '' && item.Reflex !== 0) {
            num += Number(item.Reflex)
            isNum = true
          }
          if (item.MuscleTone !== '' && item.MuscleTone !== 0) {
            num += Number(item.MuscleTone)
            isNum = true
          }
          if (item.HeartRate !== '' && item.HeartRate !== 0) {
            num += Number(item.HeartRate)
            isNum = true
          }
        }
        if ((item.SkinColor === 0 || item.Respiration === 0 || item.Reflex === 0 || item.MuscleTone === 0 || item.HeartRate === 0) && isNum === false) {
          return '0'
        } else {
          return num
        }
      })
    }
  },
  methods: {
    deleteRowApgar (index) {
      this.tableApgar.splice(index, 1)
    },
    addRowApgar () {
      if (!this.tableApgar) {
        this.tableApgar = []
      } else {
        this.tableApgar = [...this.tableApgar]
      }
      this.tableApgar.push({
        ApgarScore: '',
        Total: '',
        SkinColor: '',
        Respiration: '',
        Reflex: '',
        MuscleTone: '',
        HeartRate: '',
        note: ''
      })
    }
  }
}
</script>
<style scoped>
table {
  width: 98%;
  transform: translateX(2%);
}
p {
  margin: 0;
}
select {
  border-color: #d2d6de;
  padding: 8px 0;
  color: #999;
}
</style>
