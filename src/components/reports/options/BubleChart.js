import { Bubble } from 'vue-chartjs'

export default {
  extends: Bubble,
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
      console.log(this.chartdata)
      this.renderChart(this.chartdata, this.options)
    }
  }
}
