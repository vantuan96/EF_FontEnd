<template>
  <div>
    <Form
      :FormCode="FormCode"
      :FormName="FormName"
      :IsSingle="IsSingle"
      :VisitId="$route.params.Id"
      :VisitType="VisitType"
    />
  </div>
</template>

<script>
import Form from '@/components/Form/Form'
export default {
  name: 'AExamFormsIndex',
  components: {
    Form
  },
  mixins: [],
  props: [
  ],
  data () {
    return {
      FormCode: 'EFORMDEMO',
      FormName: 'Xét nghiệm tại chỗ - Sinh hóa máu Catridge CHEM8+ test',
      IsSingle: true,
      VisitType: 'OPD'
    }
  },
  mounted () {
  },
  computed: {},
  methods: {
  }
}
</script>
