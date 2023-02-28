<template>
  <router-link tag="li" v-if="router && router.name" :to="router" active-class="active">
    <a href="#">
      <i :class="icon"></i> <span>{{ name }}</span>
      <span class="pull-right-container" v-show="badge">
        <small class="label pull-right" :class="[badge.type==='String'?'bg-green':'label-primary']">{{ badge.data }}</small>
      </span>
    </a>
  </router-link>
  <li :class="getType()" v-else>
    {{ isHeader ? name : '' }}
    <a href="#" v-if="!isHeader">
      <i :class="icon"></i> <span>{{ name }}</span>
      <span class="pull-right-container" v-if="items.length > 0"  @click="close()">
        <small v-if="badge && badge.data" class="label pull-right" :class="[badge.type==='String'?'bg-green':'label-primary']">{{ badge.data }}</small>
        <i v-else class="fa fa-angle-left pull-right"></i>
      </span>
    </a>
    <ul class="treeview-menu" v-if="items.length > 0">
      <router-link active-class="active" tag="li" v-for="(item,index) in items" :key="index" :to="{ name:item.router.name, query: item.query }" v-if="item.router && item.router.name">
        <a>
          <i :class="item.icon"></i>
          {{ item.name }}
        </a>
      </router-link>
      <li v-else>
        <a>
          <i :class="item.icon"></i>
          {{ item.name }}
        </a>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'va-slide-item',
  props: {
    type: {
      type: String,
      default: 'item'
    },
    isHeader: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    badge: {
      type: Object,
      default () {
        return {}
      }
    },
    query: {
      type: Object,
      default () {
        return {}
      }
    },
    items: {
      type: Array,
      default () {
        return []
      }
    },
    router: {
      type: Object,
      default () {
        return {
          name: ''
        }
      }
    },
    link: {
      type: String,
      default: ''
    }
  },
  created () {},
  methods: {
    getType () {
      if (this.isHeader) {
        return 'header'
      }
      return (this.type === 'item' ? '' : 'treeview') + (this.active ? ' menu-open' : '')
    },
    close () {
    }
  },
  computed: {
    _getType (router) {
      if (this.isHeader) {
        return 'header'
      }
      return (this.type === 'item' ? '' : 'treeview')
    }
  }
}
</script>
