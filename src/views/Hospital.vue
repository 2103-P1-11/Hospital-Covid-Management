<template>
  <div>
    <v-container>
      <div class="header">
        <h1>{{ pageTitle }}</h1>
      </div>

      <div class="selectHospital" v-if="!hospitalSelected" fluid>
        <v-row align="center">
          <v-col cols="6">
            <v-select
              v-model="test"
              :items="hospitaldataName"
              dense
              filled
              item-text="test"
              label="Choose hospital"
              color="white"
              return-object
            ></v-select>
          </v-col>
        </v-row>
        <v-btn @click="selectHospital()"> Select hospital </v-btn>
      </div>

      <div class="content" v-if="hospitalSelected">
        <v-btn class="change-btn" @click="selectHospital2()">
          Change hospital
        </v-btn>
        <v-flex class="overview">
          <v-spacer></v-spacer>
          <v-card
            ripple
            shaped
            elevation="4"
            color="rgb(233,30,99)"
            dark
            width="248px"
          >
            <v-card-title background="rgb(205,26,87)">
              <h3>ADMITTED</h3>
              <v-spacer></v-spacer><v-icon>mdi-heart-plus-outline</v-icon>
            </v-card-title>
            <v-card-subtitle>{{ availbedcount }} Patients </v-card-subtitle>
            <v-card-text
              ><v-icon>mdi-arrow-up</v-icon>{{ recentadmitted }} for this
              week</v-card-text
            >
          </v-card>

          <v-spacer></v-spacer>
          <v-card
            ripple
            shaped
            elevation="4"
            color="rgb(139,195,74)"
            dark
            width="248px"
          >
            <v-card-title>
              <h3>DISCHARGED</h3>
              <v-spacer></v-spacer><v-icon>mdi-account-heart</v-icon>
            </v-card-title>
            <v-card-subtitle
              >{{ patientdischargenumthisweek }} Patients
            </v-card-subtitle>

            <v-card-text
              ><v-icon
                v-if="
                  patientdischargenumlastweek - patientdischargenumthisweek > 0
                "
                >mdi-arrow-down</v-icon
              ><v-icon
                v-if="
                  patientdischargenumlastweek - patientdischargenumthisweek < 0
                "
                >mdi-arrow-up</v-icon
              >{{
                Math.abs(
                  patientdischargenumlastweek - patientdischargenumthisweek
                )
              }}
              since last week</v-card-text
            >
          </v-card>

          <v-spacer></v-spacer>
          <v-card
            ripple
            shaped
            elevation="4"
            color="rgb(0,188,212)"
            dark
            width="248px"
          >
            <v-card-title>
              <h3>ALL</h3>
              <v-spacer></v-spacer><v-icon>mdi-bed</v-icon>
            </v-card-title>
            <v-card-subtitle>
              {{
                Math.round(
                  (fullbedcount /
                    (parseInt(availbedcount) + parseInt(fullbedcount))) *
                    100
                )
              }}% Bed Occupied
            </v-card-subtitle>
            <v-card-text
              ><v-icon>mdi-history</v-icon> Updated recently</v-card-text
            >
          </v-card>
          <v-spacer></v-spacer>
          <v-card
            ripple
            shaped
            elevation="4"
            color="rgb(255,152,0)"
            dark
            width="248px"
          >
            <v-card-title>
              <h3>ICU</h3>
              <v-spacer></v-spacer><v-icon>mdi-alert-box</v-icon>
            </v-card-title>
            <v-card-subtitle
              >{{
                Math.round(
                  (fullicubedcount /
                    (parseInt(availicubedcount) + parseInt(fullicubedcount))) *
                    100
                )
              }}% Beds Occupied
            </v-card-subtitle>
            <v-card-text
              ><v-icon>mdi-history</v-icon> Updated recently</v-card-text
            >
          </v-card>
          <v-spacer></v-spacer>
        </v-flex>

        <v-row>
          <v-col cols="6" class="pb-0 mb-0">
              <h3 style="vertical-align:middle">Location</h3>
          </v-col>
          <v-col cols="6">
            <v-row>
              <v-col cols="6" class="pb-0"
                ><h3>Nearest alternative:</h3>
                <p>Singapore General Hospital</p>
              </v-col>
              <v-col cols="6" class="pb-0"
                ><h3>Available Capacity:</h3>
                <p>50%</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <div class="hospitalMap" style="margin: auto">
              <GmapMap
                :center="center"
                :zoom="15"
                map-type-id="hybrid"
                style="width: 500px; height: 300px"
                :options="{
                  zoomControl: true,
                  mapTypeControl: false,
                  scaleControl: false,
                  streetViewControl: false,
                  rotateControl: false,
                  fullscreenControl: true,
                  disableDefaultUI: false,
                }"
              >
                <!-- <GmapMarker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    :clickable="true"
                    :draggable="true"
                    @click="center = m.position"
                  /> -->
              </GmapMap>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="nearestMap" style="margin: auto">
              <GmapMap
                :center="center"
                :zoom="15"
                map-type-id="hybrid"
                style="width: 500px; height: 300px"
                :options="{
                  zoomControl: true,
                  mapTypeControl: false,
                  scaleControl: false,
                  streetViewControl: false,
                  rotateControl: false,
                  fullscreenControl: true,
                  disableDefaultUI: false,
                }"
              >
                <!-- <GmapMarker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    :clickable="true"
                    :draggable="true"
                    @click="center = m.position"
                  /> -->
              </GmapMap>
            </div>
          </v-col>
        </v-row>

        <div class="information mt-2">
          <v-row>
            <hr />
            <h2 class="px-0">Ward Information</h2>
          </v-row>

          <v-row style="border-bottom: 1px solid black">
            <v-col cols="12" class="px-0">
              <div class="wardInfoContainer">
                <h4>Ward 300001</h4>
                <p class="wardInfo">Type of ward: B1</p>
                <p class="wardInfo">Total beds: 6</p>
                <p class="wardInfo">Total occupancy: 4 (80%)</p>
                <p class="wardInfo">
                  Assigned staff: Plato Gordon - Nursing Student, Pandora Bauer
                  - Senior Staff Nurse
                </p>
              </div>
            </v-col>
          </v-row>
          <v-row style="border-bottom: 1px solid black">
            <v-col cols="12" class="px-0">
              <div class="wardInfoContainer">
                <h4>Ward 300001</h4>
                <p class="wardInfo">Type of ward: B1</p>
                <p class="wardInfo">Total beds: 6</p>
                <p class="wardInfo">Total occupancy: 4 (80%)</p>
                <p class="wardInfo">
                  Assigned staff: Plato Gordon - Nursing Student, Pandora Bauer
                  - Senior Staff Nurse
                </p>
              </div>
            </v-col>
          </v-row>
          <v-row style="border-bottom: 1px solid black">
            <v-col cols="12" class="px-0">
              <div class="wardInfoContainer">
                <h4>Ward 300001</h4>
                <p class="wardInfo">Type of ward: B1</p>
                <p class="wardInfo">Total beds: 6</p>
                <p class="wardInfo">Total occupancy: 4 (80%)</p>
                <p class="wardInfo">
                  Assigned staff: Plato Gordon - Nursing Student, Pandora Bauer
                  - Senior Staff Nurse
                </p>
              </div>
            </v-col>
          </v-row>
        </div>
        <!-- <label for="fname" autocomplete="false">First name:</label>
        <input type="text" v-model="test" name="fname" />
        {{ test }}
        <button @click="methodOne()">Click me</button>
        <div>You selected {{ answer }}</div> -->
      </div>
    </v-container>
  </div>
</template>

<script>
const coord = { lat: 1.286716913, lng: 103.8012427 };

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
      center: coord,
    };
  },
  mounted() {
    this.getData();
    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)
    this.$refs.mapRef.$mapPromise.then((map) => {
      map.panTo(coord);
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
    selectHospital() {
      console.log(this.test);
      this.hospitalSelected = true;
      this.pageTitle = this.test;
    },

    selectHospital2() {
      this.hospitalSelected = false;
      this.pageTitle = "Hospital Management";
    },
  },
};
</script>

<style scoped>
/* .header {
  margin: 24px;
} */

.overview {
  margin: 24px auto 32px auto;
  display: flex;
  flex-direction: row;
}

.mapCaption {
  display: flex;
  flex-direction: row;
}

.interface {
  margin-right: 16px;
}

.wardInfo {
  margin: 0;
}

p{
  margin:0;
}
</style>