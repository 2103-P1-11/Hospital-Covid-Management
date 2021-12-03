<template>
  <div>
    <v-container>
      <div class="header">
        <h1>Swab Results Management</h1>
      </div>
      <v-row>
        <v-col cols="12">
          <v-card-title style="background-color:white;">
        Swab Results Management
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
          </v-card-title>
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
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Swabs",
  components: {},
  data() {
    return {
      // dialog: false,
      // hospital: null,
      // hospitalDetails: [],
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