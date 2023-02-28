<template>
 <div class="list row-coll mrb10">
    <div v-if="rowClick" class="box-mini-label rowClick" :class="seamless ? 'seamless' : null"
    :style="`background-color: ${bgTitle};color: ${colorText};`"
    data-toggle="collapse"
    :data-target="`#ed-box-view`+id" aria-expanded="false"
    aria-controls="ed-box">
      <slot name="label" />
    </div>
    <div v-else class="box-mini-label" :class="seamless ? 'seamless' : null" :style="`background-color: ${bgTitle};color: ${colorText};`">
      <slot name="label" />
    </div>
    <a class="collapsed btn-show" data-toggle="collapse" :data-target="`#ed-box-view`+id" aria-expanded="false" aria-controls="ed-box">
      <span class="show-down link-text" :style="`color: ${colorText};`"><i :class="iconUp"></i></span>
      <span class="hide-up link-text" :style="`color: ${colorText};`"><i :class="iconDown"></i></span>
    </a>
    <div class="collapse v-info-box" :id="`ed-box-view`+id">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MDCollapse',
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    bgTitle: {
      type: String,
      default: '#337AB7'
    },
    colorText: {
      type: String,
      default: '#fff'
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
      right: 12px;
      top: 6px;
      cursor: pointer;
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
