<template>
  <FormsWrap :FormCode="FormCode" :FormCodeCustom="FormCodeCustom" :FormName="FormName" :IsSingle="IsSingle" :VisitId="VisitId" :VisitType="_VisitType">
    <router-view :VisitType="_VisitType" @onChange="setCurrentItemData" ref="formItem"/>
    <Confirm
      v-if="CurrentItemData && !hideConfirm"
      :FormCode="FormCode + 'CONFIRM'"
      :VisitId="VisitId"
      :VisitType="_VisitType"
      :FormId="CurrentItemData.Id"
    />
    <div class="form-code" v-if="CurrentItemData"><p class="mrt10">{{CurrentItemData.FormCode}}</p></div>
    <div class="form-log" v-if="CurrentItemData"><p class="mrt10">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="CurrentItemData.UpdatedBy" /> {{__t('lúc')}} {{CurrentItemData.UpdatedAt}}</p></div>
    <FloatBlock v-if="!hideFooter">
      <template slot='buttons'>
        <div class="col-md-2 col-sm-2">
          <div class="form-group1">
          </div>
        </div>
        <div class="col-md-2 col-sm-2">
          <div class="form-group1">
          </div>
        </div>
        <div class="col-md-2 col-sm-2">
          <div v-if="hasPrint" @click="print()" v-shortkey="['ctrl', 'p']" class="btn-block btn-in" title="Price"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In ngay')}}</div>
        </div>
        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleSubmit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
          </div>
        </div>
      </template>
    </FloatBlock>
  </FormsWrap>
</template>

<script>
import FormsWrap from '@/components/Form/FormsWrap'
import Confirm from '@/components/Form/Confirm'
import FormApi from '@/services/FormAPI.js'
export default {
  name: 'AExamFormsForm',
  components: {
    FormsWrap, Confirm
  },
  mixins: [],
  props: {
    IsSingle: {
      type: Boolean
    },
    FormCode: {
      type: String,
      required: true
    },
    FormCodeCustom: {
      type: String
    },
    FormName: {
      type: String,
      required: true
    },
    VisitId: {
      type: String
    },
    VisitType: {
      type: String
    },
    hideConfirm: {
      type: Boolean
    },
    hasPrint: {
      type: Boolean,
      default: true
    },
    hideFooter: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      CurrentItemData: null
    }
  },
  mounted () {
    this.APIService = new FormApi({
      VisitType: this._VisitType,
      VisitId: this._VisitId,
      FormCode: this.FormCode,
      hidemsg: true
    })
  },
  computed: {},
  methods: {
    print () {},
    handleSubmit (str) {
      if (this.$refs.formItem) {
        this.$refs.formItem.submit((submitData) => {
          this.APIService.UpdateForm(this.CurrentItemData.Id, submitData).then(res => {
            if (!str || str !== 'confirm') {
              this.toastedSuccess()
              this.reload()
            }
          })
        })
      } else {
        console.log('Refs is not found')
      }
    },
    setCurrentItemData (data) {
      this.CurrentItemData = data
    }
  }
}
</script>
