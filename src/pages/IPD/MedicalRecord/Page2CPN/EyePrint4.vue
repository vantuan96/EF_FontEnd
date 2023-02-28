<template>
  <div class="EyePrint4 BreakPage" v-if="check">
    <div class="fw600 fs18 mrb10"><b>File đính kèm</b></div>
    <template v-if="check1">
      <div>Giác mạc phải</div>
      <VUpload2
        code="IPDMRPTR1143"
        :widthImg="'400px'"
        v-if="MASTERDATA['IPDMRPTR1143']"
        planUpdate="Bác sĩ tải hình ảnh tại đây (cho phép tải 1 hoặc nhiều ảnh)"
        :dataFile="MASTERDATA['IPDMRPTR1143'].Items[1]"
        :index="[5, 6]"
        :bgImg="'static/bgrTaiMat.png'"
        :print="true"
        @checkHasFile="checkHasFile1"
        />
    </template>
    <template v-if="check2">
      <div>Giác mạc trái</div>
      <VUpload2
        code="IPDMRPTL1143"
        :widthImg="'400px'"
        v-if="MASTERDATA['IPDMRPTL1143']"
        planUpdate="Bác sĩ tải hình ảnh tại đây (cho phép tải 1 hoặc nhiều ảnh)"
        :dataFile="MASTERDATA['IPDMRPTL1143'].Items[1]"
        :index="[5, 6]"
        :bgImg="'static/bgrTaiMat.png'"
        :print="true"
        @checkHasFile="checkHasFile2"
        :dataDropfile="dataDropfile"
        />
    </template>
    <template v-if="check3">
      <div>Tiền phòng (Góc TP) phải</div>
      <VUpload2
        code="IPDMRPTR1253"
        :widthImg="'400px'"
        v-if="MASTERDATA['IPDMRPTR1253']"
        planUpdate="Bác sĩ tải hình ảnh tại đây (cho phép tải 1 hoặc nhiều ảnh)"
        :dataFile="MASTERDATA['IPDMRPTR1253'].Items[1]"
        :index="[1, 2]"
        :bgImg="'static/bgrTaiMat.png'"
        :print="true"
        @checkHasFile="checkHasFile3"
        :dataDropfile="dataDropfile"
        />
    </template>
    <template v-if="check4">
      <div>Tiền phòng (Góc TP) trái</div>
      <VUpload2
        code="IPDMRPTL1253"
        :widthImg="'400px'"
        v-if="MASTERDATA['IPDMRPTL1253']"
        planUpdate="Bác sĩ tải hình ảnh tại đây (cho phép tải 1 hoặc nhiều ảnh)"
        :dataFile="MASTERDATA['IPDMRPTL1253'].Items[1]"
        :index="[1, 2]"
        :bgImg="'static/bgrTaiMat.png'"
        :print="true"
        @checkHasFile="checkHasFile4"
        :dataDropfile="dataDropfile"
        />
    </template>
  </div>
</template>

<script>
export default {
  name: 'EyePrint4',
  props: ['MASTERDATA', 'Data', 'VisitId', 'VisitIdDrop'],
  components: {
  },
  data () {
    return {
      check: true,
      check1: true,
      check2: true,
      check3: true,
      check4: true,
      checkHasData: false
    }
  },
  mounted () {
  },
  methods: {
    // checkHasFile (data) {
    //   if (data && data.length) {
    //     this.checkHasData = true
    //   }
    //   setTimeout(() => {
    //     this.check = this.checkHasData
    //   }, 200)
    // },
    checkHasFile1 (data) {
      if (data && data.length) {
        this.checkHasData = true
      } else {
        this.check1 = false
      }
      setTimeout(() => {
        this.check = this.checkHasData
      }, 200)
    },
    checkHasFile2 (data) {
      if (data && data.length) {
        this.checkHasData = true
      } else {
        this.check2 = false
      }
      setTimeout(() => {
        this.check = this.checkHasData
      }, 200)
    },
    checkHasFile3 (data) {
      if (data && data.length) {
        this.checkHasData = true
      } else {
        this.check3 = false
      }
      setTimeout(() => {
        this.check = this.checkHasData
      }, 200)
    },
    checkHasFile4 (data) {
      if (data && data.length) {
        this.checkHasData = true
      } else {
        this.check4 = false
      }
      setTimeout(() => {
        this.check = this.checkHasData
      }, 200)
    }
  }
}
</script>
