<template>
  <div class="translate-request">
    <b>{{__t('Dịch sang tiếng')}}: </b> <v-select v-model="ToLanguage" :items="ToLanguages"/> <button @click="requestSend" :disabled="!ToLanguage" class="btn v-white-btn">{{__t('Yêu cầu dịch')}}</button>
    <p></p>
    <div><i class="fa fa-exclamation-triangle color-yellow" aria-hidden="true"></i>{{__t(`Đề nghị bác sĩ kiểm tra thông tin, sau khi bác sĩ yêu cầu dịch ${name}, bác sĩ sẽ KHÔNG được phép chỉnh sửa thông tin trên ${name} của người bệnh này`)}}</div>
  </div>
</template>
<script>
import VSelect from '@/components/VSelect.vue'
import Translation from '@/services/Translation'
export default {
  name: 'SEND-TRANSLATION-REQUEST',
  props: ['ViName', 'EnName', 'Translated', 'name', 'FormId', 'FormCode'],
  components: {VSelect},
  data () {
    return {
      ToLanguage: null,
      FromLanguage: null,
      Languages: [
        {
          label: 'Tiếng Việt',
          value: 'VI',
          code: 'vi'
        },
        {
          label: 'English',
          value: 'EN',
          code: 'en'
        }
      ],
      currentlocale: localStorage.getItem('locale') || 'vi',
      ToLanguages: []
    }
  },
  created () {
    var Translated = this.Translated || []
    this.ToLanguages = this.Languages.filter(e => e.code !== this.currentlocale && !Translated.includes(e.code))
    if (this.ToLanguages.length === 1) {
      this.ToLanguage = this.ToLanguages[0].value
    }
    this.FromLanguage = this.Languages.find(e => e.code === this.currentlocale).value
  },
  computed: {
  },
  methods: {
    requestSend () {
      this.$modal.show('dialog', {
        title: this.__t('Yêu cầu dịch!'),
        text: this.__t(`Đề nghị bác sĩ kiểm tra thông tin, sau khi bác sĩ yêu cầu dịch ${this.name}, bác sĩ sẽ KHÔNG được phép chỉnh sửa thông tin trên ${this.name} của người bệnh này`),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn',
            handler: () => {
              this.send()
              this.$modal.hide('dialog')
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn bg-yellow',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    send () {
      var VisitTypeGroupCode = this.$router.currentRoute.matched.find(m => m.meta.VisitTypeGroupCode)
      new Translation().update('TranslationRequest', {
        FormId: this.FormId ? this.FormId : '',
        FormCode: this.FormCode ? this.FormCode : '',
        VisitId: this.$route.params.Id,
        VisitTypeGroupCode: VisitTypeGroupCode.meta.VisitTypeGroupCode,
        ViName: this.ViName,
        EnName: this.EnName,
        FromLanguage: this.FromLanguage,
        ToLanguage: this.ToLanguage
      }).then(response => {
        this.toastedSuccess(this.$t('Yêu cầu dịch thành công!'))
        this.reload()
      })
    }
  }
}
</script>
