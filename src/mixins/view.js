export default {
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
    window.onbeforeunload = () => {
      return null
    }
  }
}
