<template>
  <div class="ad-info" v-if="ad" :class="activeClass" @mouseleave="mouseleave" @mouseover="mouseOver">
    <template v-if="ty === 'confirmed' && info"><span><b v-if="info.Fullname">{{info.Fullname}}</b> ({{ad}}) <i style="color: green">{{__t('(Đã xác nhận)')}}</i> <i class="fa fa-info-circle" aria-hidden="true"></i></span></template>
    <span v-else>{{ad}} <i class="fa fa-info-circle" aria-hidden="true"></i></span>
    <!-- <div class="v-tootip" ref="infoBox" v-if="info && ad">
      <header><i class="fa fa-info-circle" aria-hidden="true"></i> {{__t('Thông tin chi tiết')}}</header>
      <content>
        <template>
        <p><label>Username:</label> {{info.Username || '...'}}</p>
        <p v-if="info.Fullname"><label>{{__t('Họ và tên')}}:</label> {{info.Fullname || '...'}}</p>
        <p v-if="info.Mobile"><label>{{__t('SĐT')}}:</label> {{info.Mobile || '...'}}</p>
        <p v-if="info.Title"><label>{{__t('Chức danh')}}:</label> {{info.Title || '...'}}</p>
        <p v-if="info.Department"><label>{{__t('Phòng ban')}}:</label> {{info.Department || '...'}}</p>
        </template>
      </content>
    </div> -->
  </div>
</template>
<script>
// import $ from 'jquery'
import Account from '@/services/Account'
import EventBus from '@/lib/eventBus'
export default {
  name: 'AdInfo',
  props: ['ad', 'type', 'ty', 'extInfo', 'id'],
  mixins: [],
  data () {
    return {
      info: null,
      adw: 0,
      adh: 0,
      activeClass: '',
      loading: false
    }
  },
  watch: {
    'ad' (a, b) {
      if (a !== b) {
        this.info = null
      }
    }
  },
  mounted () {
    if (this.ty === 'confirmed') this.mouseOver()
  },
  updated () {
    // this.info = null
  },
  methods: {
    mouseleave () {
      this.activeClass = ''
      EventBus.$emit('HideAdTooltip')
    },
    mouseOver ($event) {
      if (this.info === null) {
        new Account({noLoading: true, username: this.ad, hidemsg: true, notRedirect: true, type: this.type, id: this.id}).getInfo().then(res => {
          this.info = res
          setTimeout(() => {
            this.setPosition()
          }, 100)
        }).catch(e => {
          this.info = {
            Username: this.ad,
            ...this.extInfo
          }
          setTimeout(() => {
            this.setPosition()
          }, 100)
        })
      } else {
        setTimeout(() => {
          this.setPosition()
        }, 100)
      }
    },
    setPosition () {
      var boun = this.$el.getBoundingClientRect()
      EventBus.$emit('updateAdTooltip', this.info, boun)
      // $('.v-tootip').css({
      //   'top': boun.top - this.adh - 3,
      //   'left': boun.left - this.adw / 2 + boun.width / 2
      // })
    },
    getPosition (event) {
      let offset = event.target.getBoundingClientRect()
      let menuHeight = this.items.length * this.heightItemLi + this.heightItemLi
      let windowHeight = window.innerHeight
      let bottomY = windowHeight - offset.height - offset.y
      let topY = offset.y
      if (bottomY > menuHeight) {
        this.menuClass = 'v-bottom'
      } else if (topY > menuHeight) {
        this.menuClass = 'v-top'
      } else {
        this.menuClass = 'v-middle'
      }
    }
  }
}
</script>
