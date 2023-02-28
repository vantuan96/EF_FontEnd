<template>
  <div id="HumanResourceAssessment-page">
    <div class="calendar-control padding-15">
      <b>{{__t('Tháng')}}: <date-picker :clearable="false" :editable="false" :format="'MM/YYYY'" v-model="month" type="month" :placeholder="___t('Chọn tháng')"></date-picker></b>
    </div>
    <FullHraCalendar v-if="!changeLocal" ref="HumanResourceAssessmentFullCalendar" :options="calendarOptions"/>
    <!-- <template v-slot:eventContent='arg'>{{arg}}</template> -->
    <HumanResourceAssessmentTable @closed="initEvent()" @edited="setEdited" ref="HumanResourceAssessmentTable" />
  </div>
</template>
<script>
import FullHraCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import DatePicker from 'vue2-datepicker'
import viLocale from '@fullcalendar/core/locales/vi'
import HumanResourceAssessment from '@/services/ED/HumanResourceAssessment'
import HumanResourceAssessmentTable from './PopupTable.vue'
import moment from 'moment'
import MixinForm from '@/mixins/form.js'
export default {
  name: 'HumanResourceAssessment',
  mixins: [MixinForm],
  components: {
    FullHraCalendar, DatePicker, HumanResourceAssessmentTable
  },
  data () {
    return {
      formId: null,
      month: new Date(),
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin
        ],
        height: 500,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        events: [],
        dayHeaderFormat: {
          weekday: 'long'
        },
        locale: viLocale,
        initialView: 'dayGridMonth',
        weekends: true,
        eventContent: function (arg) {
          let italicEl = document.createElement('span')
          italicEl.innerHTML = arg.event.title
          let arrayOfDomNodes = [ italicEl ]
          return { domNodes: arrayOfDomNodes }
        },
        eventClick: this.handleEventClick
      },
      currentData: null,
      viLocale: viLocale,
      changeLocal: false
    }
  },
  watch: {
    month (a, b) {
      this.monthChange()
    },
    '$i18n.locale' () {
      this.changeLocal = true
      setTimeout(() => {
        this.changeLocal = false
      }, 100)
    }
  },
  computed: {
  },
  mounted () {
    this.initEvent()
  },
  methods: {
    getLocal () {
      return this.$i18n.locale === 'vi' ? this.viLocale : null
    },
    setEdited (edited) {
      this.edited = edited
    },
    open (data) {
      this.$refs.HumanResourceAssessmentTable.open(data)
    },
    handleEventClick (event) {
      this.open({
        dateStr: moment(event.event.start).format('DD/MM/YYYY'),
        isNew: !event.event.extendedProps.isEvent,
        readOnly: event.event.extendedProps.readOnly
      })
    },
    monthChange () {
      if (this.$refs.HumanResourceAssessmentFullCalendar) {
        this.$refs.HumanResourceAssessmentFullCalendar.getApi().gotoDate(this.month)
        this.initEvent()
      }
    },
    getStartEndActiveView () {
      return [
        moment(this.$refs.HumanResourceAssessmentFullCalendar.getApi().view.activeStart).startOf('day'),
        moment(this.$refs.HumanResourceAssessmentFullCalendar.getApi().view.activeEnd).add(-1, 'days').endOf('day')
      ]
    },
    initDate () {
      var rangeTime = this.getStartEndActiveView()
      var start = rangeTime[0]
      var end = rangeTime[1]
      var now = moment().startOf('day')
      while (start < end) {
        var eventDate = moment(start).format('YYYY-MM-DD')
        if (!this.calendarOptions.events.find(e => e.date === eventDate) && start >= now) {
          this.calendarOptions.events.push({
            title: '<i class="fa fa-plus" aria-hidden="true"></i>' + this.$t('Phân công'),
            date: eventDate,
            isEvent: false,
            id: this.makeid() + '-new-event',
            classNames: ['no-data', 'v-event'],
            editable: false
          })
        }
        start = start.add(1, 'days')
      }
    },
    initEvent () {
      this.calendarOptions.events = []
      var rangeTime = this.getStartEndActiveView()
      var now = moment().startOf('day')
      new HumanResourceAssessment({
        StartDate: rangeTime[0].format(this.vDateFormat),
        EndDate: rangeTime[1].format(this.vDateFormat)
      }).find('list')
        .then(response => {
          response.forEach(e => {
            var eventDate = moment(e.Date, this.vDateFormat).format('YYYY-MM-DD')
            if (!this.calendarOptions.events.find(e => e.date === eventDate)) {
              this.calendarOptions.events.push({
                title: '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>' + this.$t('Chi tiết'),
                date: eventDate,
                isEvent: true,
                id: e.Id,
                classNames: ['has-data', 'v-event'],
                editable: false,
                readOnly: moment(e.Date, this.vDateFormat) < now
              })
            }
          })
          this.initDate()
        })
    }
  }
}
</script>
