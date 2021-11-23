<template>
  <div>
    <v-container>
      <div class="header">
        <h1>{{ pageTitle }}</h1>
      </div>

      <v-container v-if="!hospitalSelected" fluid>
        <v-row align="center">
          <v-col cols="6">
            <v-select
              v-model="test"
              :items="hospitaldataName"
              dense
              filled
              item-text="test"
              label="Choose hospital"
              return-object
            ></v-select>
          </v-col>
        </v-row>
      </v-container>

      <!-- <select
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
      </select> -->
      <!-- </v-row> -->
      <v-btn @click="methodOne()"> Select hospital </v-btn>
      <div class="cards" v-for >
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
      </div> -->
      <!-- <v-row>
        
        <v-col cols="6">
          <div class="nearestHosp">
            <div class="caption">
              <h3>Nearest alternative:</h3>
              <p>Singapore General Hospital</p>
            </div>
            <div class="nearestHospStatus">
              <h4>Available Capacity: 50%</h4>
            </div>
            <div class="nearestMap">
              <GmapMap ref="mapRef"
                :center="{ lat: 10, lng: 10 }"
                :zoom="15"
                map-type-id="hybrid"
                style="width: 500px; height: 300px"
              >
                <GmapMarker
                  :key="index"
                  v-for="(m, index) in markers"
                  :position="m.position"
                  :clickable="false"
                  :draggable="false"
                  @click="center = m.position"
                />
              </GmapMap>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-col cols="6"> </v-col>

      <v-data-table :headers="headers" :items="patientdata" class="elevation-1">
        <template v-slot:items="props">
          <td>{{ props.item.patientname }}</td>
          <td class="text-xs-right">{{ props.item.admissiondate }}</td>
          <td class="text-xs-right">{{ props.item.discharge }}</td>
          <td class="text-xs-right">{{ props.item.dischargedate }}</td>
          <td class="text-xs-right">{{ props.item.discharge }}</td>
        </template>
      </v-data-table> -->

      <!-- <label for="fname" autocomplete="false">First name:</label>
    <input type="text" v-model="test" name="fname" />
    {{ test }}
    <button @click="methodOne()">Click me</button>
    <div>You selected {{ answer }}</div> 
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
      hospitaldata: null,
      hospitaldataName: [],
      answer: "",
      test: "",
      hospitalSelected: false,
      pageTitle: "Hospital Management",
    };
  },
  mounted() {
    this.getData();
    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)

    this.$refs.mapRef.$mapPromise.then((map) => {
      map.panTo({ lat: 1.2798700699395875, lng: 103.83599472592941 });
    });
  },
  methods: {
    async getData() {
      await axios
        .get("http://localhost:5000/hos/all")
        .then((response) => {
          console.log(response.data);

          for (let i = 0; i < response.data.length; i++) {
            this.hospitaldataName.push(response.data[i]["hospitalname"]);
          }
          this.hospitaldata = response.data;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    methodOne() {
      console.log(this.test);
      this.hospitalSelected = true;
      this.pageTitle = this.test;
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

.interface {
  margin-right: 16px;
}
</style>