<template>
  <v-skeleton-loader
    :loading="loading"
    :transition="transition"
    type="card"
  >
    <v-card outlined tile>
      <v-card-title class="overline">
        <v-img
            :src="`${baseUrl}${flagsPath}${state.uf}.png`"
            max-width="28"
            class="mr-2"
        >
        </v-img>
        {{ state.uf }}
        <v-spacer/>
        <v-tooltip bottom color="green lighten-1">
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              color="green"
              :loading="loading"
              @click="getCountry()"
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
      <v-card-text>
        <v-container>
          <v-row justify="space-around">
            <v-col cols="12" xl="4" lg="4" md="4" sm="4">
              <v-sheet
                elevation="1"
                class="mx-auto pa-2"
                color="grey lighten-4"
              >
                <div class="overline">
                  <v-icon left color="orange">mdi-virus-outline</v-icon>
                  Confirmed
                </div>
                <div class="title orange--text">
                  {{state.cases | numeralFormat(state.cases >= 1000 ? 'O.O a' : null)}}
                </div>
              </v-sheet>
            </v-col>
            <v-col cols="12" xl="4" lg="4" md="4" sm="4">
              <v-sheet
                elevation="1"
                class="mx-auto pa-2"
                color="grey lighten-4"
              >
                <v-icon left color="red">mdi-heart-off</v-icon>
                <span class="overline">Deaths</span><br/>
                <span class="title red--text">
                  {{state.deaths | numeralFormat(state.deaths >= 1000 ? 'O.O a' : null)}}
                </span>
              </v-sheet>
            </v-col>
            <v-col cols="12" xl="4" lg="4" md="4" sm="4">
              <v-sheet
                elevation="1"
                class="mx-auto pa-2"
                color="grey lighten-4"
              >
                <v-icon left color="purple">mdi-skull-crossbones</v-icon>
                <span class="overline">Lethality</span><br/>
                <span class="title purple--text">
                  {{percentage(state.deaths, state.cases) | numeralFormat('0.00%')}}
                </span>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-sheet
                elevation="1"
                class="mx-auto pa-2"
                color="grey lighten-4"
              >
                <LineChart
                  :chartdata="chartData"
                  :options="options"
                ></LineChart>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          icon
          :loading="loading"
          color="green acent-2"
          @click="getCountry()"
        >
          <v-icon>mdi-update</v-icon>
        </v-btn>
        <span class="overline">Updated {{ state.datetime | moment("from", "now") }}</span>
      </v-card-actions>
    </v-card>
  </v-skeleton-loader>
</template>

<script>
import JsPdf from 'jspdf'
import { FLAGS_PATH } from '@/config/configs'
import LineChart from '../options/LineChart'

export default {
  data () {
    return {
      flagsPath: FLAGS_PATH,
      baseUrl: process.env.BASE_URL,
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
              const labels = data.datasets[tooltipItem.datasetIndex].label
              let value = null
              if (label === 'Lethality') {
                value = this.$options.filters.numeralFormat(this.percentage(this.state.deaths, this.state.cases), '0.00%')
              } else {
                value = this.$options.filters.numeralFormat(tooltipItem.value)
              }

              return `${labels}: ${value}`
            }
          }
        }
      },
      loading: true,
      downloading: false,
      refreshing: false,
      transition: 'scale-transition',
      country: {}
    }
  },

  props: {
    state: {
      type: Object,
      default: null
    }
  },

  created () {
    this.getCountry()
  },
  computed: {
    states () {
      return this.$store.state.brazil.items.data
    },
    chartData () {
      return this.fillData()
    }
  },
  methods: {
    getCountry (name = null) {
      const country = name ? name.toLowerCase() : 'brazil'
      this.refreshing = true
      this.$store.dispatch('getCountry', country)
        .then((response) => {
          this.loading = false
          this.country = response.data
        })
        .catch(error => console.log(error))
        .finally(() => { this.refreshing = false })
    },

    fillData () {
      const dataCollection = {
        labels: ['Confirmed', 'Suspects', 'Refuses', 'Deaths', 'Lethality'],
        datasets: [
          {
            label: this.state.state,
            data: [
              this.state.cases,
              this.state.suspects,
              this.state.refuses,
              this.state.deaths,
              this.percentage(this.state.deaths, this.state.cases)
            ],
            backgroundColor: [
              'rgba(241, 146, 3, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(255, 99, 132, 0.5)',
              'rgba(37, 2, 82, 0.5)'
            ],
            borderColor: [
              'rgba(241, 146, 3, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(37, 2, 82, 1)'
            ],
            borderWidth: 1
          }
        ]
      }

      return dataCollection
    },

    exportPdf () {
      this.downloading = true
      const canvas = document.getElementById('line-chart')
      const dataUrl = canvas.toDataURL('image/png', 1.0)
      const doc = new JsPdf()
      doc.setFontSize(10)
      doc.text(10, 25, `Graphic State Report (Covid19) - ${this.$options.filters.moment(new Date(), 'YYYY/MM/DD HH:mm:ss')}`)
      doc.addImage(dataUrl, 'png', 10, 40)
      doc.text(10, 280, `Fonte: ${location.href}`)
      doc.save('State Report')
      this.downloading = false
      this.$snotify.success('Downloaded file', 'Success!')
    },

    exportImage () {
      const canvas = document.getElementById('line-chart')
      const dataUrl = canvas.toDataURL('image/png', 1.0)
      const link = document.createElement('a')
      link.download = 'State Report'
      link.href = dataUrl
      link.click()
      this.$snotify.success('Downloaded file', 'Success!')
    },

    percentage: (percentage, valor) => (percentage / (valor * 100)) * 100
  },

  components: {
    LineChart
  }
}
</script>

<style>
</style>
