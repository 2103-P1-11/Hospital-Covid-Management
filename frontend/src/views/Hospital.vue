<template>
  <div>
    <v-container>
      <div class="header">
        <h1>Hospital Management</h1>
      </div>

      <v-row v-if="!hospitalSelected">
      <v-col cols="6">
        <v-select
          :items="items"
          filled
          label="Choose hospital"
          dense
        ></v-select>
      </v-col>

      <select
        name="hospital"
        id="hospital"
        v-model="answer"
        placeholder="Choose Hospital"
      >
        <option
          v-for="hospital in hospitaldata"
          :key="hospital.hospitalid"
          :value="hospital.hospitalid"
        >
          {{ hospital.hospitalname }}
        </option>
      </select>
    </v-row>
    <v-btn @click="methodOne()"> Select hospital </v-btn>

      <div class="cards">
        <v-card class="interface">
          <v-card-title>
            <div>Available Beds</div>
            <div>ALL <v-icon>mdi-bed</v-icon></div>
          </v-card-title>
          <v-card-title>{{ availbedcount }}</v-card-title>
          <v-card-text><v-icon>mdi-history</v-icon> Most Recent </v-card-text>
          <v-card-actions>
            <v-btn>Go To</v-btn>
          </v-card-actions>
        </v-card>
        <v-card class="interface">
          <v-card-title>
            <div>Bed Occupancy</div>
            <div>ALL <v-icon>mdi-bed</v-icon></div>
          </v-card-title>
          <v-card-text>
            Capacity Rate:
            {{
              Math.round(
                ((totalbedcount - availbedcount) / totalbedcount) * 100
              )
            }}
            %
          </v-card-text>
          <v-card-actions>
            <v-btn>Go To</v-btn>
          </v-card-actions>
        </v-card>
        <v-card class="interface">
          <v-card-title>
            <div>Available Beds</div>
            <div>ICU <v-icon>mdi-alert-box</v-icon></div>
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
          <v-card-title>
            <div>Bed Occupancy</div>
            <div>ICU <v-icon>mdi-alert-box</v-icon></div>
          </v-card-title>
          <v-card-text>
            Capacity Rate:
            {{
              Math.round(
                ((totalicubedcount - availicubedcount) / totalicubedcount) * 100
              )
            }}
            %
          </v-card-text>
          <v-card-actions>
            <v-btn>Go To</v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <v-data-table :headers="headers" :items="patientdata" class="elevation-1">
        <template v-slot:items="props">
          <td>{{ props.item.patientname }}</td>
          <td class="text-xs-right">{{ props.item.admissiondate }}</td>
          <td class="text-xs-right">{{ props.item.discharge }}</td>
          <td class="text-xs-right">{{ props.item.dischargedate }}</td>
          <td class="text-xs-right">{{ props.item.discharge }}</td>
        </template>
      </v-data-table>

      <!-- <label for="fname" autocomplete="false">First name:</label>
    <input type="text" v-model="test" name="fname" />
    {{ test }}
    <button @click="methodOne()">Click me</button>
    <div>You selected {{ answer }}</div> -->
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Hospital",
  components: {},
  data() {
    return {
      hospitaldata: [],
      answer: "",
      test: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      await axios
        .get("http://localhost:5000/hos/all")
        .then((response) => {
          console.log(response.data);
          this.hospitaldata = response.data;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    methodOne() {
      console.log(this.test);
    },
  },
};
</script>

<style scoped>
/* .header {
  margin: 24px;
} */

.cards {
  margin: 24px auto 32px auto;
  display: flex;
  flex-direction: row;
}

.interface{
  margin-right:16px;
}
</style>