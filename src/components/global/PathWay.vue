<template>
  <div v-show="checkPathWay.length > 0" class="mb-10 pathway">
    <label class="mb-0">Pathway</label>
    <ul>
      <div v-for="(item, index) in checkPathWay" :key="index">
        <li v-show="item === 'AtopicCode'">
          <a
            class="blink_text"
            target="_blank"
            href="https://app.textografo.com/share/YXV0aDB8NjNhMTE3OGJmZTFlNDkzYjllZmVkYzk5K3IwN2ErZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SmxlSEFpT2pNeU5UQXpOamd3TURBd0xDSjJJam93TENKa0lqcDdJblZwWkNJNkltRjFkR2d3ZkRZellURXhOemhpWm1VeFpUUTVNMkk1WldabFpHTTVPU0lzSW1selUyaGhjbVZrSWpwMGNuVmxmU3dpYVdGMElqb3hOamN4TlRBeE56RTFmUS5lZWNBWVBKTHdjWjNnZnBZYVp0TjM0R3pJNUNZdUNNWTBHVzI1M0xqemVZ"
          >
            Truy cập CP viêm da cơ địa
          </a>
        </li>
        <li v-show="item === 'AllegryCode'">
          <a
            class="blink_text"
            target="_blank"
            href="https://app.textografo.com/share/YXV0aDB8NjNhMTE3OGJmZTFlNDkzYjllZmVkYzk5K3prY2orZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SmxlSEFpT2pNeU5UQXpOamd3TURBd0xDSjJJam93TENKa0lqcDdJblZwWkNJNkltRjFkR2d3ZkRZellURXhOemhpWm1VeFpUUTVNMkk1WldabFpHTTVPU0lzSW1selUyaGhjbVZrSWpwMGNuVmxmU3dpYVdGMElqb3hOamN4TlRBeE56RTFmUS5lZWNBWVBKTHdjWjNnZnBZYVp0TjM0R3pJNUNZdUNNWTBHVzI1M0xqemVZ"
          >
            Truy cập CP dị ứng thuốc
          </a>
        </li>
        <li v-show="item === 'MellitusCode'">
          <a
            class="blink_text"
            target="_blank"
            href="https://app.textografo.com/share/YXV0aDB8NjNhMTE3OGJmZTFlNDkzYjllZmVkYzk5K20yc2krZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SmxlSEFpT2pNeU5UQXpOamd3TURBd0xDSjJJam93TENKa0lqcDdJblZwWkNJNkltRjFkR2d3ZkRZellURXhOemhpWm1VeFpUUTVNMkk1WldabFpHTTVPU0lzSW1selUyaGhjbVZrSWpwMGNuVmxmU3dpYVdGMElqb3hOamN4TlRBeE56RTFmUS5lZWNBWVBKTHdjWjNnZnBZYVp0TjM0R3pJNUNZdUNNWTBHVzI1M0xqemVZ"
          >
            Truy cập CP đái tháo đường type 2
          </a>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
import { uniqBy } from 'lodash'
export default {
  name: 'PathWay',
  props: {
    MainDisease: {
      required: true
    },
    CoMorbidity: {
      required: false
    }
  },
  data () {
    return {
      loaded: false,
      PathWay: [],
      mergeIcd: [],
      AtopicCode: ['L20', 'L20.0', 'L20.8', 'L20.9'],
      AtopicName: ['viêm da cơ địa', 'sẩn ngứa', 'chàm', 'viêm da thần kinh'],
      AllegryCode: ['T78.4', 'T88.7'],
      AllegryName: ['dị ứng', 'tác dụng phụ của thuốc'],
      MellitusCode: ['E11', 'E11.0', 'E11.1', 'E11.2', 'E11.3', 'E11.4', 'E11.2†', 'E11.3†', 'E11.4†', 'E11.5', 'E11.6', 'E11.7', 'E11.8', 'E11.9'],
      MellitusName: ['đái tháo đường type 2', 'ĐTĐ type 2', 'đtd type 2']
    }
  },
  watch: {
    MainDisease: {
      handler (val) {
        if (this.CoMorbidity) {
          this.mergeIcd = [...val, ...this.CoMorbidity]
        } else {
          this.mergeIcd = [...val]
        }
      },
      deep: true
    },
    CoMorbidity: {
      handler (val) {
        this.mergeIcd = [...this.MainDisease, ...val]
      },
      deep: true
    }
  },
  mounted () {
    this.mergeIcd = []
    this.mergeIcd = [...this.MainDisease]
    if (this.CoMorbidity) {
      this.mergeIcd = [...this.MainDisease, ...this.CoMorbidity]
    }
  },
  computed: {
    checkPathWay () {
      let icdSelected = []
      let PathWay = []
      this.mergeIcd && this.mergeIcd.map(item => {
        icdSelected.push(item)
      })

      if (icdSelected.some(item => this.AtopicCode.includes(item.code))) {
        PathWay.push('AtopicCode')
      }
      // Kiem tra chua ten nhom viêm da cơ địa
      this.AtopicName.map(itemName => {
        icdSelected && icdSelected.map(itemIcd => {
          if (itemIcd.ViName && itemIcd.ViName.toLowerCase().includes(itemName)) {
            PathWay.push('AtopicCode')
          }
        })
      })

      if (icdSelected.some(item => this.AllegryCode.includes(item.code))) {
        PathWay.push('AllegryCode')
      }
      // Kiem tra chua ten nhom dị ứng thuốc
      this.AllegryName.map(itemName => {
        icdSelected && icdSelected.map(itemIcd => {
          if (itemIcd.ViName && itemIcd.ViName.toLowerCase().includes(itemName)) {
            PathWay.push('AllegryCode')
          }
        })
      })

      if (icdSelected.some(item => this.MellitusCode.includes(item.code))) {
        PathWay.push('MellitusCode')
      }
      // Kiem tra chua ten nhom đái tháo đường type 2
      this.MellitusName.map(itemName => {
        icdSelected && icdSelected.map(itemIcd => {
          if (itemIcd.ViName && itemIcd.ViName.toLowerCase().includes(itemName)) {
            PathWay.push('MellitusCode')
          }
        })
      })
      return uniqBy(PathWay)
    }
  }
}
</script>

<style lang="stylus" scoped>
.pathway {
  color: #dc3545;
}
.pathway a {
  color: #dc3545;
  font-weight: bold;
  border-bottom: 1px solid #dc3545;
}
.pathway a:hover {
  border-bottom: 1px solid #000;
}
.blink_text {
  animation: blinker 2s infinite;
}
@keyframes blinker {
  from { opacity: 1.0; }
  50% { opacity: 0.5; }
  to { opacity: 1.0; }
}
</style>
