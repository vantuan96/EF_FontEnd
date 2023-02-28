<script>
import MedicalRecord from '@/services/MedicalRecord.js'
import ViewEd from './View'
export default {
  /**
   * The name of the page.
   */
  name: 'ED-ViewWithId',
  props: ['VisitId'],
  extends: ViewEd,
  methods: {
    getData () {
      new MedicalRecord().find('ED/' + this.VisitId).then(response => {
        this.Forms = response
      })
    }
  }
}
</script>
