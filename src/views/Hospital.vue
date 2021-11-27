<template>
  <div>
    <v-container>
      <div class="header">
        <h1>{{ pageTitle }}</h1>
      </div>
      <div class="selectHospital" fluid>
        <v-row align="center">
          <v-col cols="6">
            <v-select
              v-model="selectedanswer"
              :items="hospitaldataName"
              dense
              @change="selectHospital()"
              filled
              item-text="selectedanswer"
              label="Choose hospital"
              color="white"
              return-object
            ></v-select>
          </v-col>
        </v-row>
      </div>

      <div class="content">
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
              <h3>{{ availbed }}</h3>
              <v-spacer></v-spacer><v-icon>mdi-heart-plus-outline</v-icon>
            </v-card-title>
            <v-card-subtitle>Beds Available </v-card-subtitle>
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
              <h3>{{ availicu }}</h3>
              <v-spacer></v-spacer><v-icon>mdi-account-heart</v-icon>
            </v-card-title>
            <v-card-subtitle
              >ICU Beds Available
            </v-card-subtitle>

          
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
              <h3>{{
                availbedrate
              }} %</h3>
              <v-spacer></v-spacer><v-icon>mdi-bed</v-icon>
            </v-card-title>
            <v-card-subtitle>
              Total Bed Occupied
            </v-card-subtitle>
            
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
              <h3>{{
                availicurate
              }} %</h3>
              <v-spacer></v-spacer><v-icon>mdi-alert-box</v-icon>
            </v-card-title>
            <v-card-subtitle
              >ICU Beds Occupied
            </v-card-subtitle>
            
          </v-card>
          <v-spacer></v-spacer>
        </v-flex>

        <v-row>
          <v-col cols="6" class="pb-0 mb-0">
            <h3 style="vertical-align: middle">Location</h3>
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

        
        <!-- <label for="fname" autocomplete="false">First name:</label>
        <input type="text" v-model="test" name="fname" />
        {{ test }}
        <button @click="methodOne()">Click me</button>
        <div>You selected {{ answer }}</div> -->
      </div>
      
    </v-container>
    <v-card>
          <v-toolbar dark>
            <v-toolbar-title>
              Ward Information
            </v-toolbar-title>
          </v-toolbar>
          <v-expansion-panels focusable>
      <v-expansion-panel
        v-for="(item,i) in wardinfo"
        :key="i"
      >
        <v-expansion-panel-header><h4>Ward {{item.wardid}} - Available : {{item.availablebed}} [{{item.wardtype}}]</h4></v-expansion-panel-header>
        <v-expansion-panel-content>
          
                <p class="wardInfo">Type of ward: {{item.wardtype}}</p>
                <p class="wardInfo">Available beds: {{item.availablebed}} </p>
                <p class="wardInfo">Total beds: {{item.totalbed}}</p>
                <p class="wardInfo">Total occupancy: {{item.occupancy}} %</p>
                <p class="wardInfo">
                  Assigned staff: {{item.staffid1}}, {{item.staffid2}}
                </p>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
          
        </v-card>
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
      selectedanswer: "",
      hospitalSelected: false,
      pageTitle: "",
      center: { lat: 1.286716913, lng: 103.8012427 },
      availbed: null,
      availicu:null,
      availbedrate:null,
      availicurate:null,
      wardinfo:[],
      totalbedcapacity: [],
    };
  },
  mounted() {
    this.getData();

    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)
    // this.$refs.mapRef.$mapPromise.then((map) => {
    //   map.panTo(coord);
    // });
  },
  methods: {
    async getData() {
      await axios
        .get("http://localhost:5000/hos/all")
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            this.hospitaldataName.push(response.data[i]["hospitalname"]);
          }
          this.pageTitle = response.data[0]['hospitalname'];
          this.selectedanswer = response.data[0]['hospitalname'];
          this.hospitaldata = response.data;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
        this.getBeds();
        this.getICUBeds();
        this.getWardInfo();
    },
    selectHospital() {
        this.getBeds();
        this.getICUBeds();
        this.getWardInfo();
        this.pageTitle = this.selectedanswer;
      
    },
    async getWardInfo() {
      this.wardinfo = []
      await axios
        .post("http://localhost:5000/hos/getwardinfo", {
          hospitalname: this.selectedanswer.replaceAll("'", "''"),
        })
        .then((response) => {
          // this.wardinfo = response.data
          // console.log(this.wardinfo)
          let entered = ''
          let counter = -1
          for(let i = 0; i < response.data.length; i ++){
            if(entered != response.data[i]['wardid']){
              entered = response.data[i]['wardid']
              if(response.data[i]['bedstatus']==0){
              this.wardinfo.push({
                hospitalname: response.data[i]['hospitalname'],
                'staffid1': response.data[i]['staffid1'],
                'staffid2': response.data[i]['staffid2'],
                'availablebed': response.data[i]['amount'],
                'totalbed': response.data[i]['amount'],
                'wardtype': response.data[i]['wardtype'],
                'wardid': response.data[i]['wardid'],
              })
              }else{
                this.wardinfo.push({
                hospitalname: response.data[i]['hospitalname'],
                'staffid1': response.data[i]['staffid1'],
                'staffid2': response.data[i]['staffid2'],
                'availablebed': 0,
                'totalbed': response.data[i]['amount'],
                'wardtype': response.data[i]['wardtype'],
                'wardid': response.data[i]['wardid'],
              })
              }
              
              counter ++
            }else{
              // this.wardinfo[counter].availablebed = parseInt(this.wardinfo[counter].availablebed) + parseInt(response.data[i]['amount'])
              this.wardinfo[counter].totalbed = parseInt(this.wardinfo[counter].totalbed) + parseInt(response.data[i]['amount'])
            }
            this.wardinfo[counter].occupancy = 100 - Math.round((this.wardinfo[counter].availablebed/this.wardinfo[counter].totalbed)*100)
          }
          console.log(this.wardinfo)
          // this.wardinfo[i].occupancy = Math.round((this.wardinfo[i].availablebed/this.wardinfo[i].totalbed)*100)
        })
        .catch(function (error) {
          console.log(error);
        }); 
    },
    async getBedInfo(){
      await axios
        .get("http://localhost:5000/hos/bedinfo",{
          hospitalname: this.selectedanswer.replaceAll("'", "''"),
        })
        .then((response) => {
          this.totalbedcapacity = response.data
          console.log(this.totalbedcapacity)
          for (let i = 0; i < this.wardinfo.length; i ++){
          this.wardinfo[i].totalbed = this.totalbedcapacity[i]['total']
            if(this.wardinfo[i].totalbed>0){
            this.wardinfo[i].occupancy = Math.round((this.wardinfo[i].availablebed/this.wardinfo[i].totalbed)*100)
            }else{
              this.wardinfo[i].occupancy = 0
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        }); 
    },
    async getBeds() {
      await axios
        .post("http://localhost:5000/hos/getavailbed", {
          hospitalname: this.selectedanswer.replaceAll("'", "''"),
        })
        .then((response) => {
          let bedcount = 0;
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i]["bedstatus"] == 0) {
              bedcount++;
            }
          }
          this.availbed = bedcount.toString() + " / " + response.data.length.toString()
          this.availbedrate = Math.round(bedcount/response.data.length * 100)
        })
        .catch(function (error) {
          console.log(error);
        }); 
    },

    async getICUBeds() {
      await axios
        .post("http://localhost:5000/hos/icubedstatus", {
          hospitalname: this.selectedanswer.replaceAll("'", "''"),
        })
        .then((response) => {
          let icucount = 0;
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i]["bedstatus"] == 0) {
              icucount++;
            }
          }
          this.availicu = icucount.toString() + " / " + response.data.length.toString()
          if (icucount){
            this.availicurate = Math.round(icucount/response.data.length * 100)
          }else{
            this.availicurate = 'N.A'
          }
          
        })
        .catch(function (error) {
          console.log(error);
        }); 
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

p {
  margin: 0;
}
</style>