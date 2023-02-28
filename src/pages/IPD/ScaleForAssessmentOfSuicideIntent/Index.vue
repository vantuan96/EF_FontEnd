<template>
  <div>
    <div class="header" style="margin-bottom: 30px;">
      <h2 class="text-center" style ="font-style: bold">{{__t('Thang đánh giá ý tưởng tự sát và mức độ ý tưởng tự sát')}}</h2>
      <!-- <p class="text-center" style="margin-left: 144px; width: 900px; wrap-text:none">{{__t("Thang này được đánh giá trong thời gian 48 giờ cho đến lúc bắt đầu phỏng vấn người bệnh nhằm mục đích đánh giá bệnh nhân có hay không có ý tưởng tự sát và đánh giá mức độ nghiêm trọng của ý tưởng tự sát.")}}</p> -->
    </div>
    <div class="content">
      <div class="table">
        <!-- Table -->
        <div>
          <Item :formId="formId" @hiddenLog="setHiddenLog" :viewOnly="viewOnly" @TimeLog="getTimeLog"></Item>
        </div>
      </div>
      <div>
        <p class="mt-10">A01_221_210121_V</p>
      </div>
      <div v-if="hiddenLog">
        <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="timeLog" :ad="timeLog[1]" /> {{__t('lúc')}} {{ timeLog[0] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import Item from './Item.vue'
export default {
  name: 'IPDScaleForAssessmentOfSuicideIntentIndex',
  props: ['viewOnly', 'VisitId'],
  mixins: [MixinMasterData, MixinForm],
  components: {
    VDateTimePicker,
    Item
  },
  data () {
    return {
      nullContent: false,
      formId: '',
      IsLocked: false,
      timeLog: [],
      hiddenLog: false
    }
  },
  mounted () {
    console.log(this.$route.params, 'param')
  },
  methods: {
    getTimeLog (val1, val2) {
      this.timeLog = [val1, val2]
    },
    setHiddenLog () {
      this.hiddenLog = true
    }
  }
}
</script>

<style lang="stylus" scoped>
.v-checkbox input[type=checkbox] + label:before {
  width: 25px;
  height: 25px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.checkbox-rounded {
  .v-checkbox input[type=checkbox] + label:before {
    border-radius: 50%;
  }
}
.pointer-none {
  pointer-events: none;
}
.disable-text {
  color: #b1b1b1;
  .v-checkbox input[type=checkbox] + label:before {
    border-color: #b1b1b1
  }
}
.isReadOnly {
  .value-checkbox {
    margin-bottom: 5px;
  }
  .displaytbl {
    span {
      transform: translateY(-3px);
    }
  }
}
label [for="radio-OPDGENBRCA36"]{
  color: red;
}
</style>
