<template>
  <Triage :VisitId="$route.params.Id" />
</template>
<script>
import Triage from './Triage.vue'
export default {
  name: 'EmergencyTriageRecord',
  components: {
    Triage
  }
}
</script>
