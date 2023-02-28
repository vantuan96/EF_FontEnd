<template>
 <div class="list row-coll mrb10">
    <div v-if="rowClick" class="box-mini-label rowClick" :class="seamless ? 'seamless' : null"
    :style="vstyle"
    data-toggle="collapse"
    :data-target="`#ed-box-view`+id" aria-expanded="false"
    aria-controls="ed-box">
      <slot name="label" />
    </div>
    <div v-else class="box-mini-label" :class="seamless ? 'seamless' : null" :style="vstyle">
      <slot name="label" />
    </div>
    <a class="collapsed btn-show" :class="pin ? 'none' : ''" data-toggle="collapse" :data-target="`#ed-box-view`+id" aria-expanded="false" aria-controls="ed-box">
      <span class="show-down link-text" :style="`color: ${colorText};`">{{__t('btn.thu_gon')}} <i :class="iconUp"></i></span>
      <span class="hide-up link-text" :style="`color: ${colorText};`">{{__t('btn.mo_rong')}} <i :class="iconDown"></i></span>
    </a>
    <a class="collapsed btn-show" :class="pin ? '' : 'none'">
      <span class="hide-up link-text" :style="`color: ${colorText};`">{{__t('btn.thu_gon')}} <i :class="iconUp"></i></span>
    </a>
    <div class="collapse v-info-box" :id="`ed-box-view`+id">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MDCollapse2',
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    rowClick: {
      type: Boolean,
      default: false
    },
    iconUp: {
      type: String,
      default: 'fa fa-angle-double-up'
    },
    iconDown: {
      type: String,
      default: 'fa fa-angle-double-down'
    },
    seamless: {
      type: Boolean,
      default: false
    },
    vstyle: {
      type: String,
      default: ''
    },
    colorText: {
      type: String
    },
    pin: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
  .list {
    position relative;
    .box-mini-label {
      border-radius: 4px;
      padding: 6px 12px;
      p {
        margin: 0px;
      }
    }
    .seamless {
      border-radius: 4px 4px 0px 0px;
    }
    .rowClick {
      cursor: pointer;
    }
    .btn-show {
      position absolute;
      right: 13px;
      top: 16px;
      cursor: pointer;
      z-index: 99;
    }
  }
  .row-coll {
    .hide-up  {
      display: none
    }
    .collapsed {
      .show-down {
        display: none;
      }
      .hide-up {
        display: block;
      }
    }
  }
</style>
