import { PolarArea } from 'vue-chartjs'

export default {
  extends: PolarArea,
  props: {
    chartdata: {
      type: Object,
      defaul: null
    },
    options: {
      type: Object,
      defaul: null
    }
  },

  mounted () {
    this.chartShow()
  },

  watch: {
    chartdata: function () {
      this.chartShow()
    }
  },

  methods: {
    chartShow () {
      this.renderChart(this.chartdata, this.options)
    }
  }
}
