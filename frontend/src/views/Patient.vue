<template>
  <div>
    <div class="header">
    <h1>Patient Management</h1>
    </div>
    <v-data-table
      :headers="headers"
      :items="patientdata"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.patientname }}</td>
        <td class="text-xs-right">{{ props.item.admissiondate }}</td>
        <td class="text-xs-right">{{ props.item.discharge }}</td>
        <td class="text-xs-right">{{ props.item.dischargedate }}</td>
        <td class="text-xs-right">{{ props.item.discharge }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name:'Patient',
  components: {
    
  },
  data() {
    return {
      patientdata: [],
      headers: [
        {
          text: 'Patient Name',
          align: 'left',
          sortable: false,
          value: 'patientname'
        },
        { text: 'ID', value: 'patientid' },
        { text: 'Admission Date', value: 'admissiondate' },
        { text: 'Discharge Date', value: 'dischargedate' },
        { text: 'Status Description', value: 'statusno' },
        // { text: 'Next of Kin', value: 'kin' }
      ],
    }
  },
  created() {
    this.getPatients()
  },
  methods: {
    async getPatients(){
      await axios.get("http://localhost:5000/patient/all")
    .then(response => {
      console.log(response.data)
      this.patientdata = response.data
    })
    .catch(error => {
      this.errorMessage = error.message;
      console.error("There was an error!", error);
    });
    },
    methodOne(){
      console.log(this.test)
    }
  },
}
</script>

<style scoped>
/* .header{
    margin:24px;
} */
</style>