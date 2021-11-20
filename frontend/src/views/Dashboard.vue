<template>
  <div>
    <div class="header">
      <h1>Dashboard Management</h1>
    </div>
    <div class="overview">
      <v-card style="width: 50%">
        <v-card-title> Available Beds (ALL) <br /> </v-card-title>
        <v-card-text> Beds Available: {{ availbedcount }} </v-card-text>
        <v-card-actions>
          <!-- <button class="btn">Go to</button> -->
          <v-btn class="button">Go To</v-btn>
        </v-card-actions>
      </v-card>
      <v-card style="width: 50%; margin-top: 24px">
        <v-card-title> Bed Occupancy (ALL) <br /> </v-card-title>
        <v-card-text>
          Capacity Rate:
          {{ Math.round((availbedcount / totalbedcount) * 100) }} %
        </v-card-text>
        <v-card-actions>
          <!-- <button class="btn">Go to</button> -->
          <v-btn class="button">Go To</v-btn>
        </v-card-actions>
      </v-card>
      <v-card style="width: 50%; margin-top: 24px">
        <v-card-title> Available Bed (ICU) <br /> </v-card-title>
        <v-card-text>
          Beds Available:
          {{ icubedcount }}
        </v-card-text>
        <v-card-actions>
          <!-- <button class="btn">Go to</button> -->
          <v-btn class="button">Go To</v-btn>
        </v-card-actions>
      </v-card>
      
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      totalbedcount: null,
      availbedcount: null,
      icubedcount: null,
    };
  },
  mounted() {
    this.getTotalBeds();
    this.getAvailBeds();
  },
  methods: {
    async getTotalBeds() {
      await axios
        .get("http://localhost:5000/bed/all")
        .then((response) => {
          console.log(response.data);

          this.totalbedcount = response.data.length;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    async getAvailBeds() {
      await axios
        .get("http://localhost:5000/bed/allempty")
        .then((response) => {
          console.log(response.data);

          this.availbedcount = response.data.length;
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
.header {
  margin: 24px;
}

/* .button{
  color:orange;
} */
</style>