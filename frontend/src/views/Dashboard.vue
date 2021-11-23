<template>
<v-flex>
  <div class="overview">
    <v-spacer></v-spacer>
    <v-card ripple tile raised color="rgb(233,30,99)" dark>
      <v-card-title>
        ADMITTED <v-spacer></v-spacer><v-icon>mdi-heart-plus-outline</v-icon>
      </v-card-title>
      <v-card-title>{{ availbedcount }} Patients </v-card-title>
      <v-card-text>Since last week</v-card-text>
    </v-card>
    
    <v-spacer></v-spacer>
    <v-card ripple tile raised color="rgb(139,195,74)" dark>
      <v-card-title>
        HEALED <v-spacer></v-spacer><v-icon>mdi-account-heart</v-icon>
      </v-card-title>
      <v-card-title>{{ availicubedcount }} Patients </v-card-title>
      <v-card-text>Since last week</v-card-text>
    </v-card>

    <v-spacer></v-spacer>
    <v-card ripple tile raised color="rgb(0,188,212)" dark>
      <v-card-title>
        ALL <v-spacer></v-spacer><v-icon>mdi-bed</v-icon>
      </v-card-title>
      <v-card-title
        >
        {{
          Math.round(fullbedcount / totalbedcount * 100)
        }}% Bed Occupied
      </v-card-title>
      <v-card-text>Since last week</v-card-text>
    </v-card>
    <v-spacer></v-spacer>
    <v-card ripple tile raised color="rgb(255,152,0)" dark>
      <v-card-title>
        ICU <v-spacer></v-spacer><v-icon>mdi-alert-box</v-icon>
      </v-card-title>
      <v-card-title
        >{{
          Math.round(
            ((totalicubedcount - availicubedcount) / totalicubedcount) * 100
          )
        }}% Beds Occupied
      </v-card-title>
      <v-card-text>Since last week</v-card-text>
    </v-card>
    <v-spacer></v-spacer>
  </div>
  <div class="hospitaltable">
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="text-xs-right">{{ props.item.iron }}</td>
      </template>
    </v-data-table>
  </div>
  <div class="patientstatus">
    
  </div>
  </v-flex>
</template>

<script>
import axios from "axios";

export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      availbedcount: null,
      totalicubedcount: null,
      availicubedcount: null,
    };
  },
  mounted() {
    this.getBeds();
    this.getICUBeds();
  },
  computed:{
  },
  methods: {
    toggle (index) {
      const i = this.selected.indexOf(index)

      if (i > -1) {
        this.selected.splice(i, 1)
      } else {
        this.selected.push(index)
      }
    },
    async getBeds() {
      await axios
        .get("http://localhost:5000/db/bedstatus")
        .then((response) => {
          console.log(response.data);
          this.availbedcount = response.data[0]['total'];
          this.fullbedcount = response.data[1]['total'];
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    async getICUBeds() {
      await axios
        .get("http://localhost:5000/db/icubedstatus")
        .then((response) => {
          console.log(response.data);
          this.availicubedcount = response.data[0]['total'];
          this.totalicubedcount = response.data[0]['total'];
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

.overview {
  display: flex;
  flex-direction: row;
  margin: 24px;
}

</style>