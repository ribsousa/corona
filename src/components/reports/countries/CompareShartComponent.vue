<template>
  <v-skeleton-loader
    :loading="loading"
    :transition="transition"
    type="card"
    class="mt-5"
  >
    <v-card outlined tile class="mt-5">
      <v-card-title class="overline">
        <v-icon
          left
          color="green accent-4"
          size="25"
        >
          mdi-chart-bell-curve
        </v-icon>
        Comparison chart
        <v-spacer/>
        <v-tooltip bottom color="green lighten-1">
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              color="green"
              :loading="loading"
              @click="chartData()"
              v-on="on"
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </template>
          <span>Refresh</span>
        </v-tooltip>
        <v-tooltip bottom color="indigo lighten-1">
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              color="indigo lighten-2"
              @click="exportImage()"
              v-on="on"
            >
              <v-icon>mdi-file-image-outline</v-icon>
            </v-btn>
          </template>
          <span>Image file</span>
        </v-tooltip>
        <v-tooltip bottom color="orange lighten-1">
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              :loading="downloading"
              color="orange lighten-2"
              @click="exportPdf()"
              v-on="on"
            >
              <v-icon>mdi-file-pdf-outline</v-icon>
            </v-btn>
          </template>
          <span>PDF file</span>
        </v-tooltip>
      </v-card-title>
      <LineChart
        :chartdata="fillData"
        :options="options"
      ></LineChart>
    </v-card>
  </v-skeleton-loader>
</template>

<script>
import LineChart from '../options/LineChart'
import JsPdf from 'jspdf'

export default {
  props: {
    country: {
      type: Array,
      defaul: null
    }
  },

  data () {
    return {
      chartdata: {},
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              callback: value => this.$options.filters.numeralFormat(value)
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const label = data.datasets[tooltipItem.datasetIndex].label
              const value = this.$options.filters.numeralFormat(tooltipItem.yLabel)

              return `${label}: ${value}`
            }
          }
        }
      },
      loading: false,
      downloading: false,
      transition: 'scale-transition',
      mycolor: this.generator()
    }
  },

  computed: {
    fillData () {
      return this.chartData()
    }
  },

  methods: {
    chartData () {
      const dataCollection = {
        labels: ['Cases', 'Confirmed', 'Recovered', 'Deaths'],
        datasets: this.fillCountry()
      }

      return dataCollection
    },

    fillCountry () {
      const datasets = []
      this.country.forEach(country => {
        datasets.push({
          fill: true,
          label: country.country,
          backgroundColor: this.generator(),
          data: [
            country.cases,
            country.confirmed,
            country.recovered,
            country.deaths
          ]
        })
      })

      return datasets
    },

    generator: function () {
      // this.mycolor = '#' + (Math.random() * 0xFFFFFF << 1).toString(16)
      this.mycolor = 'rgba(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ', 0.45)'

      return this.mycolor
    },

    exportPdf () {
      this.downloading = true
      const canvas = document.getElementById('line-chart')
      const dataUrl = canvas.toDataURL('image/png', 1.0)
      const doc = new JsPdf()
      doc.setFontSize(10)
      doc.text(10, 25, ` Comparision Chart between countries (Covid19) - ${this.$options.filters.moment(new Date(), 'YYYY/MM/DD HH:mm:ss')}`)
      doc.addImage(dataUrl, 'png', 60, 40)
      doc.text(10, 280, `Fonte: ${location.href}`)
      doc.save('Comparison Chart')
      this.downloading = false
      this.$snotify.success('Downloaded file', 'Success!')
    },

    exportImage () {
      const canvas = document.getElementById('line-chart')
      const dataUrl = canvas.toDataURL('image/png', 1.0)
      const link = document.createElement('a')
      link.download = 'Comparison Chart'
      link.href = dataUrl
      link.click()
      this.$snotify.success('Downloaded file', 'Success!')
    }
  },

  components: {
    LineChart
  }
}
</script>

<style lang="sass" scoped>
</style>
