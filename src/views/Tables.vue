<template>
  <div>
    <v-container>
      <div class="header">
        <h1>Tables</h1>
      </div>
      <p style="color: white">
        Listing of all Tables used in the system. All data presented are
        fictional and generated as a proof of concept.
      </p>
      <v-row>
        <v-col cols="6">
          <v-toolbar dark dense>
            <v-toolbar-title>Patient</v-toolbar-title>
          </v-toolbar>
          <v-data-table
            :headers="patientHeaders"
            :items="patientData"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td class="text-xs-right">{{ props.item.patientid }}</td>
              <td>{{ props.item.patientname }}</td>
              <td class="text-xs-right">{{ props.item.admissiondate }}</td>
              <td class="text-xs-right">{{ props.item.dischargedate }}</td>
              <td class="text-xs-right">{{ props.item.statusno }}</td>
            </template>
          </v-data-table>
        </v-col>
        <v-col cols="6">
          <v-toolbar dark dense>
            <v-toolbar-title>Status</v-toolbar-title>
          </v-toolbar>
          <v-data-table
            :headers="statusHeaders"
            :items="statusData"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td class="text-xs-right">{{ props.item.statusno }}</td>
              <td class="text-xs-right">{{ props.item.condition }}</td>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-toolbar dark dense>
            <v-toolbar-title>NOK (Next-Of-Kin)</v-toolbar-title>
          </v-toolbar>
          <v-data-table
            :headers="NOKHeaders"
            :items="NOKData"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.item.nokid }}</td>
              <td class="text-xs-right">{{ props.item.nokname }}</td>
              <td class="text-xs-right">{{ props.item.nokcontact }}</td>
              <td class="text-xs-right">{{ props.item.nokemail }}</td>
              <td class="text-xs-right">{{ props.item.patientid }}</td>
            </template>
          </v-data-table>
        </v-col>
        <v-col cols="6">
          <v-toolbar dark dense>
            <v-toolbar-title>Staff</v-toolbar-title>
          </v-toolbar>
          <v-data-table
            :headers="staffHeaders"
            :items="staffData"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.item.staffid }}</td>
              <td class="text-xs-right">{{ props.item.staffphone }}</td>
              <td class="text-xs-right">{{ props.item.staffname }}</td>
              <td class="text-xs-right">{{ props.item.staffposition }}</td>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-toolbar dark dense>
            <v-toolbar-title>Swab</v-toolbar-title>
          </v-toolbar>
          <v-data-table
            :headers="swabHeaders"
            :items="swabData"
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
        <v-col cols="6">
          <v-toolbar dark dense>
            <v-toolbar-title>Hospital</v-toolbar-title>
          </v-toolbar>
          <v-data-table
            :headers="hospitalHeaders"
            :items="hospitalData"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.item.hospitalid }}</td>
              <td class="text-xs-right">{{ props.item.hospitalname }}</td>
              <td class="text-xs-right">{{ props.item.address }}</td>
              <td class="text-xs-right">{{ props.item.postalcode }}</td>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-toolbar dark dense>
            <v-toolbar-title>Ward</v-toolbar-title>
          </v-toolbar>
          <v-data-table
            :headers="wardHeaders"
            :items="wardData"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.item.wardid }}</td>
              <td class="text-xs-right">{{ props.item.wardtype }}</td>
              <td class="text-xs-right">{{ props.item.hospitalid }}</td>
              <td class="text-xs-right">{{ props.item.staffid2 }}</td>
              <td class="text-xs-right">{{ props.item.wardno }}</td>
            </template>
          </v-data-table>
        </v-col>
        <v-col cols="6">
          <v-toolbar dark dense>
            <v-toolbar-title>Bed</v-toolbar-title>
          </v-toolbar>
          <v-data-table
            :headers="bedHeaders"
            :items="bedData"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.item.bedid }}</td>
              <td class="text-xs-right">{{ props.item.wardid }}</td>
              <td class="text-xs-right">{{ props.item.patientid }}</td>
              <td class="text-xs-right">{{ props.item.bedstatus }}</td>
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
  name: "Tables",
  components: {},
  data() {
    return {
      // dialog: false,
      // hospital: null,
      // hospitalDetails: [],
      patientData: [],
      statusData: [],
      NOKData: [],
      staffData: [],
      swabData: [],
      hospitalData: [],
      wardData: [],
      bedData: [],

      patientHeaders: [
        { text: "ID", value: "patientid" },
        { text: "Patient Name", value: "patientname" },
        { text: "Admission Date", value: "admissiondate" },
        { text: "Discharged Date", value: "dischargedate" },
        { text: "Status No.", value: "statusno" },
      ],
      statusHeaders: [
        { text: "Status No.", value: "statusno" },
        { text: "Condition", value: "condition" },
      ],
      NOKHeaders: [
        { text: "ID", value: "nokid" },
        { text: "NOK Name", value: "nokname" },
        { text: "NOK Contact", value: "nokcontact" },
        { text: "NOK E-mail", value: "nokemail" },
        { text: "Patient ID", value: "patientid" },
      ],
      staffHeaders: [
        { text: "ID", value: "staffid" },
        { text: "Staff Contact", value: "staffphone" },
        { text: "Staff Name", value: "staffname" },
        { text: "Staff Position", value: "staffposition" },
      ],
      swabHeaders: [
        { text: "ID", value: "swabid" },
        { text: "Swab Result", value: "swabresult" },
        { text: "Administered Time", value: "administertime" },
        { text: "Patient ID", value: "patientid" },
        { text: "Staff ID", value: "staffid" },
      ],
      hospitalHeaders: [
        { text: "ID", value: "hospitalid" },
        { text: "Hospital Name", value: "hospitalname" },
        { text: "Address", value: "address" },
        { text: "Postal Code", value: "postalcode" },
      ],
      wardHeaders: [
        { text: "ID", value: "wardid" },
        { text: "Ward Type", value: "wardtype" },
        { text: "Hospital ID", value: "hospitalid" },
        { text: "Staff ID 1", value: "staffid1" },
        { text: "Staff ID 2", value: "staffid2" },
        { text: "Ward No.", value: "wardno" },
      ],
      bedHeaders: [
        { text: "ID", value: "bedid" },
        { text: "Ward ID", value: "wardid" },
        { text: "Patient ID", value: "patientid" },
        { text: "Bed Status", value: "bedstatus" },
      ],
    };
  },

  created() {
    this.getPatients();
    this.getStatus();
    this.getNOK();
    this.getStaff();
    this.getSwab();
    this.getHospital();
    this.getWards();
    this.getBeds();
  },

  methods: {
    async getPatients() {
      await axios
        .get("http://localhost:5000/patient/all")
        .then((response) => {
          console.log(response.data);
          this.patientData = response.data;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },

    async getStatus() {
      await axios
        .get("http://localhost:5000/patient/statusall")
        .then((response) => {
          console.log(response.data);
          this.statusData = response.data;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },

    async getNOK() {
      await axios
        .get("http://localhost:5000/patient/nokall")
        .then((response) => {
          console.log(response.data);
          this.NOKData = response.data;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },

    async getStaff() {
      await axios
        .get("http://localhost:5000/staff/all")
        .then((response) => {
          console.log(response.data);
          this.staffData = response.data;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },

    async getSwab() {
      await axios
        .get("http://localhost:5000/db/swaball")
        .then((response) => {
          console.log(response.data);
          this.swabData = response.data;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },

    async getHospital() {
      await axios
        .get("http://localhost:5000/hos/all")
        .then((response) => {
          console.log(response.data);
          this.hospitalData = response.data;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },

    async getWards() {
      await axios
        .get("http://localhost:5000/hos/allwards")
        .then((response) => {
          console.log(response.data);
          this.wardData = response.data;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },

    async getBeds() {
      await axios
        .get("http://localhost:5000/hos/allbeds")
        .then((response) => {
          console.log(response.data);
          this.bedData = response.data;
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