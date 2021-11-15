<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Hospital Levels</h3>
        </div>
        <div class="col text-right">
          <a href="#!" class="btn btn-sm btn-primary">See all</a>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table thead-classes="thead-light" :data="tableData">
        <template v-slot:columns>
          <th>Hospital</th>
          <th>Overall occupancy</th>
          <th>Regular left</th>
          <th>ICU Left</th>
          <th>Status</th>
        </template>

        <template v-slot:default="row">
          <th scope="row">
            {{ row.item.hospital }}
          </th>
          <td>
            {{ row.item.overall }}
          </td>
          <td>
            {{ row.item.regularLeft }}
          </td>
          <td>
            {{ row.item.icuLeft }}
          </td>
          <td>
            {{ row.item.status }}
            <i
              class="fas fa-check-circle text-success ml-1"
              :class="
                row.item.statusIndicator === 'green'
                  ? 'fa-check-circle text-success'
                  : row.item.statusIndicator === 'orange'
                  ? 'fa-exclamation-circle text-warning'
                  : 'fa-times-circle text-danger'">
            </i>
          </td>
        </template>
      </base-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "page-visits-table",
  data() {
    return {
      tableData: [
        {
          hospital: "Alexandra Hospital",
          overall: "54%",
          regularLeft: "24",
          icuLeft: "5",
          statusIndicator: "green",
          status: "Safe",
        },
        {
          hospital: "Changi Hospital",
          overall: "54%",
          regularLeft: "24",
          icuLeft: "5",
          statusIndicator: "green",
          status: "Safe",
        },
        {
          hospital: "Sengkang Hospital",
          overall: "54%",
          regularLeft: "24",
          icuLeft: "5",
          statusIndicator: "green",
          status: "Safe",
        },
        {
          hospital: "Tan Tock Seng Hospital",
          overall: "54%",
          regularLeft: "24",
          icuLeft: "5",
          statusIndicator: "orange",
          status: "Moderate",
        },
        {
          hospital: "Singapore General Hospital",
          overall: "86%",
          regularLeft: "4",
          icuLeft: "2",
          statusIndicator: "red",
          status: "Danger",
        },
      ],
    };
  },
};
</script>
<style></style>
