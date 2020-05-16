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
          color="purple lighten-2"
          size="25"
        >
          mdi-radar
        </v-icon>
        World Reporter
        <v-spacer/>
        <v-tooltip bottom color="orange lighten-1">
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              color="orange"
              :loading="loading"
              @click="loadCountries()"
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
        <v-tooltip bottom color="green lighten-1">
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              :loading="downloading"
              color="green lighten-2"
              @click="exportPdf()"
              v-on="on"
            >
              <v-icon>mdi-file-pdf-outline</v-icon>
            </v-btn>
          </template>
          <span>PDF file</span>
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        <PolarAreaChart
          :chartdata="chartData"
          :options="options"
        ></PolarAreaChart>
      </v-card-text>
      <v-card-actions>
        <v-btn
          icon
          :loading="loading"
          color="green acent-2"
          @click="loadCountries()"
        >
          <v-icon>mdi-timer-outline</v-icon>
        </v-btn>
        <span class="overline">start {{ '20191208' | moment('DD/MM/YYYY') }} ({{ '20191208' | moment("from", "now") }})</span>
      </v-card-actions>
    </v-card>
  </v-skeleton-loader>
</template>

<script>
import PolarAreaChart from './options/PolarAreaChart'
import JsPdf from 'jspdf'

export default {
  data () {
    return {
      chartdata: {},
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          zAxes: [{
            ticks: {
              beginAtZero: true,
              callback: value => this.$options.filters.numeralFormat(value)
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const label = data.labels[tooltipItem.index]
              const value = this.$options.filters.numeralFormat(tooltipItem.value)

              return `${label}: ${value}`
            }
          }
        }
      },
      loading: true,
      downloading: false,
      refreshing: false,
      transition: 'scale-transition'
    }
  },
  created () {
    this.loadCountries()
  },
  computed: {
    countries () {
      return this.$store.state.countries.items.data
    },
    chartData () {
      return this.$store.getters.chartData
    }
  },
  methods: {
    loadCountries () {
      this.refreshing = true
      this.$store.dispatch('loadCoutries')
        .then(() => {
          this.loading = false
        })
        .catch(error => console.log(error))
        .finally(() => { this.refreshing = false })
    },

    exportPdf () {
      this.downloading = true
      const canvas = document.getElementById('polar-chart')
      const dataUrl = canvas.toDataURL('image/png', 1.0)
      const doc = new JsPdf()
      doc.setFontSize(10)
      doc.text(10, 25, `Graphic World Report (Covid19) - ${this.$options.filters.moment(new Date(), 'YYYY/MM/DD HH:mm:ss')}`)
      doc.addImage(dataUrl, 'png', 60, 40)
      doc.text(10, 280, `Fonte: ${location.href}`)
      doc.save('World Report')
      this.downloading = false
      this.$snotify.success('Downloaded file', 'Success!')
    },

    exportImage () {
      const canvas = document.getElementById('polar-chart')
      const dataUrl = canvas.toDataURL('image/png', 1.0)
      const link = document.createElement('a')
      link.download = 'World Report'
      link.href = dataUrl
      link.click()
      this.$snotify.success('Downloaded file', 'Success!')
    }
  },
  components: {
    PolarAreaChart
  }
}
</script>

<style>
</style>
