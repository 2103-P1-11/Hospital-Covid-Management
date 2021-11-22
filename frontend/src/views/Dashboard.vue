<template>
  <div>
    <div class="header">
      <h1>Dashboard Management</h1>
    </div>
    <div class="overview">
      <v-card class="interface">
        <v-card-title> <div>Available Beds</div>
        <div>
          ALL <v-icon >mdi-bed</v-icon>
        </div>
        
         </v-card-title>
        <v-card-title>{{ availbedcount }}</v-card-title>
        <v-card-text><v-icon >mdi-history</v-icon> Most Recent </v-card-text>
        <v-card-actions>
          <v-btn>Go To</v-btn>
        </v-card-actions>
      </v-card>
      <v-card class="interface">
        <v-card-title> <div>Bed Occupancy</div>
        <div>
          ALL <v-icon>mdi-bed</v-icon>
        </div>
         </v-card-title>
        <v-card-text>
          Capacity Rate:
          {{ Math.round(((totalbedcount - availbedcount) / totalbedcount) * 100) }} %
        </v-card-text>
        <v-card-actions>
          <v-btn>Go To</v-btn>
        </v-card-actions>
      </v-card>
      <v-card class="interface">
        <v-card-title> <div>Available Beds</div>
        <div>
          ICU <v-icon>mdi-alert-box</v-icon>
        </div>
         </v-card-title>
        <v-card-text>
          Beds Available:
          {{ availicubedcount }}
        </v-card-text>
        <v-card-actions>
          <v-btn>Go To</v-btn>
        </v-card-actions>
      </v-card>

      <v-card class="interface">
        <v-card-title> <div>Bed Occupancy</div>
        <div>
          ICU <v-icon>mdi-alert-box</v-icon>
        </div>
         </v-card-title>
        <v-card-text>
          Capacity Rate:
          {{ Math.round(((totalicubedcount - availicubedcount) / totalicubedcount) * 100) }} %
        </v-card-text>
        <v-card-actions>
          <v-btn>Go To</v-btn>
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
      totalicubedcount: null,
      availicubedcount: null,
    };
  },
  mounted() {
    this.getTotalBeds();
    this.getAvailBeds();
    this.getICUtotalBeds();
    this.getICUavailableBeds();
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
    async getICUavailableBeds() {
      await axios
        .get("http://localhost:5000/bed/availicubeds")
        .then((response) => {
          console.log(response.data);
          this.availicubedcount = response.data.length;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    async getICUtotalBeds() {
      await axios
        .get("http://localhost:5000/bed/totalicubeds")
        .then((response) => {
          console.log(response.data);
          this.totalicubedcount = response.data.length;
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

.overview{
  display:flex;
  flex-direction: row;
  
}

.interface{
  margin-left:24px;
  margin-right:24px;
}

.button{
  color:red;
}

/* .button{
  color:orange;
} */
</style>