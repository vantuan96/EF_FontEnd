<template>
  <div>
    <!-- Bác sĩ sản khoa -->
    <div
      v-if="MASTERDATA['IPDOAGIANM1']"
      class="flex-box flex-center mb10 mt-10"
    >
      <label class="display-inline ml-5 mr-5 w140" style="font-weight: bold"
        >{{ __label(MASTERDATA['IPDOAGIANM1']) }}:
      </label>
      <div v-if="listDoctor[0]">
        <ad-Info :ad="listDoctor[0].Username" />
      </div>
      <p v-else>{{ 'N/A' }}</p>
    </div>
    <!-- Bác sĩ sơ sinh -->
    <div v-if="MASTERDATA['IPDOAGIANM3']" class="flex-box flex-center mb10">
      <label class="display-inline ml-5 mr-5 w140" style="font-weight: bold"
        >{{ __label(MASTERDATA['IPDOAGIANM3']) }}:</label
      >
      <div v-if="listDoctor[1]">
        <ad-Info :ad="listDoctor[1].Username" />
      </div>
      <p v-else>{{ 'N/A' }}</p>
    </div>
    <!-- Nữ hộ sinh -->
    <div v-if="MASTERDATA['IPDOAGIANM5']" class="flex-box flex-center mb10">
      <label class="display-inline ml-5 mr-5 w140" style="font-weight: bold"
        >{{ __label(MASTERDATA['IPDOAGIANM5']) }}:</label
      >
      <div v-if="listDoctor[2]">
        <ad-Info :ad="listDoctor[2].Username" />
      </div>
      <p v-else>{{ 'N/A' }}</p>
    </div>
    <div v-if="MASTERDATA['IPDOAGIANM7']" class="flex-box flex-center mb10">
      <!-- Thời gian đánh giá -->
      <label class="display-inline ml-5 mr-5 w140" style="font-weight: bold">{{__label(MASTERDATA['IPDOAGIANM7'])}}:</label>
      <!-- <FakeInput v-if="MASTERDATA['IPDOAGIANM215'].Items[0]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM215'].Items[0].Value"  /> -->
      <p style="margin: 0; background-color: #F5F5F5" class="fake-input">{{MASTERDATA['IPDOAGIANM215'].Items[0].Value || CreatedAt}}</p>
      <!-- NVYT tế đánh giá -->
      <div class="flex-box flex-center">
        <label class="display-inline ml-20 mr-5" style="font-weight: bold; margin-bottom: 0">{{__t('NVYT đánh giá')}}:</label>
        <ad-Info :ad="DataSubmit.CreatedBy"/>
      </div>
    </div>
    <table
      style="overflow: hidden; margin-bottom: 0"
      class="table v-table-1 mt-10"
    >
      <tr>
        <th width="5%" class="no-wrap text-center">{{ 'STT' }}</th>
        <th width="20%" class="no-wrap text-center">
          <div>
            <span class="block">{{ __t('Đánh giá chung') }}</span>
            <span class="block">{{'(Tick bình thường)'}}</span>
          </div>
        </th>
        <th width="60%" class="no-wrap text-center">
          {{ __t('Nhận xét') }}
        </th>
      </tr>
      <tr v-for="(item, index) in tableData" :key="index">
        <td class="text-center">{{ index + 1 }}</td>
        <td>
          <div
            style="pointer-events: none"
            class="flex-box flex-center v-checkbox"
          >
            <input
              readonly
              type="checkbox"
              :id="'IPDOAGIANMAA-' + index"
              v-model="MASTERDATA[`${item.Code}`].Items[0].Value"
            />
            <label
              style="display: flex; align-items: center; font-weight: normal"
              :for="'IPDOAGIANMAA-' + index"
              >{{ __label(MASTERDATA[`${item.Code}`]) }}</label
            >
          </div>
        </td>
        <td>
          <div v-if="MASTERDATA[`${item.Code}`].Items[1]">
            <FakeInput v-model="MASTERDATA[`${item.Code}`].Items[1].Value" />
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ViewOnly',
  props: {
    MASTERDATA: {
      type: Object,
      default: () => {}
    },
    DataSubmit: {
      type: Object,
      default: () => {}
    },
    listDoctor: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    CreatedAt: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped>
.v-checkbox input[type='checkbox'] + label:before {
  margin-left: 0;
  margin-right: 5px;
}
</style>
