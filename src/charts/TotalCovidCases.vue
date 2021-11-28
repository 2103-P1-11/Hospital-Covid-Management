<template>
  <div class="container">
    <line-chart
    v-if="loaded"
      :chartdata="chartdata"
      :options="options"/>
  </div>
</template>

<script>
import LineChart from './LineChart.vue'
import axios from "axios";
const url = "https://hospitaldb1-11.herokuapp.com"

export default {
  name: 'LineChartContainer',
  components: { LineChart },
  data: () => ({
    loaded: false,
    admissiondata: [],
    chartdata: {
      labels: [],
      datasets: [
        {
          label: 'Total Covid Cases',
          backgroundColor: 'Green',
          data: []
        },
        
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  async mounted () {
    this.loaded = false
    let counter = 0
    await axios
        .get(url + "/db/admitweek")
        .then((response) => {
          this.admissiondata = response.data
          for (let i = 0; i < response.data.length; i ++){
            var dateObj = new Date(response.data[i]['admitted_week']);
            var month = dateObj.getUTCMonth() + 1; //months from 1-12
            var day = dateObj.getUTCDate();
            let monthtype = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
            this.chartdata.labels.push(day.toString() + " " + monthtype[month-1])
            counter += parseInt(response.data[i]['number_of_patients'])
            this.chartdata.datasets[0].data.push(counter)
          }
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });

      this.loaded = true

  }
}
</script>