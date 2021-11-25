<template>
  <div>
    <v-container>
      <div class="header">
        <h1>Swab Results Management</h1>
      </div>
      <v-row>
        <v-col cols="8">
          <v-toolbar dark dense>
            <v-toolbar-title>Swab Records</v-toolbar-title>
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="swabdata"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.item.swabid }}</td>
              <td class="text-xs-right">{{ props.item.swabresult }}</td>
              <td class="text-xs-right">{{ props.item.administertime }}</td>
              <td class="text-xs-right">{{ props.item.patientid }}</td>
              <td class="text-xs-right">{{ props.item.staffid }}</td>
            </template>
          </v-data-table>
        </v-col>
        <v-col cols="4">
          <v-card>
            <v-toolbar dark dense>
              <v-toolbar-title>Health Risk Warning</v-toolbar-title>
            </v-toolbar>
            <v-card-title> List of Wards </v-card-title>
            <v-card-subtitle
              >Wards with >1 staff tested COVID positive</v-card-subtitle
            >
            <v-card-text>
              <v-data-table
                :headers="hrwheaders"
                :items="hrwdata"
                class="elevation-1"
              >
                <template v-slot:items="props">
                  <td>{{ props.item.hospitalid }}</td>
                  <td class="text-xs-right">{{ props.item.wardid }}</td>
                  <td class="text-xs-right">{{ props.item.positiveno }}</td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Patient",
  components: {},
  data() {
    return {
      dialog: false,
      hospital: null,
      hospitalDetails: [],
      swabdata: [],
      hrwdata:[],
      headers: [
        { text: "ID", value: "swabid" },
        { text: "Swab Result", value: "swabresult" },
        { text: "Administered Time", value: "administertime" },
        { text: "Patient ID", value: "patientid" },
        { text: "Staff ID", value: "staffid" },
      ],
      hrwheaders: [
        { text: "Hospital ID", value: "hospitalid" },
        { text: "Ward ID", value: "swabresult" },
        { text: "No. of Positive Cases", value: "positiveno" },
      ],
    };
  },
  created() {
    this.getSwab();
  },
  methods: {
    async getSwab() {
      await axios
        .get("http://localhost:5000/db/swaball")
        .then((response) => {
          console.log(response.data);
          this.swabdata = response.data;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
  },
};
</script>

<style scoped>

</style>