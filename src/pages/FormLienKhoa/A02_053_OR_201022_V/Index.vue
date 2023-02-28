<template>
  <div>
    <Form
      :FormCode="'A02_053_OR_201022_V'"
      :FormCodeCustom="'A02_053_OR_201022_V_TAB11'"
      :FormName="FormName"
      :IsSingle="IsSingle"
      :VisitId="$route.params.Id"
      :VisitType="_VisitType"
      :hideConfirm="true"
      :hasPrint="false"
      :hideFooter="true"
    />
  </div>
</template>

<script>
import Form from '@/components/Form/Form'
export default {
  name: 'A02_053_OR_201022_V_TAB1',
  components: {
    Form
  },
  mixins: [],
  props: [
    'VisitType'
  ],
  data () {
    return {
      FormCode: 'A02_053_OR_201022_V',
      FormName: this.__t('Bảng kiểm an toàn Phẫu thuật/ Thủ thuật trong phòng Mổ và phòng Can thiệp tim mạch'),
      IsSingle: true
    }
  },
  mounted () {
  },
  computed: {},
  methods: {
  }
}
</script>
